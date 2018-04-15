import * as Logger from 'js-logger';
import * as _ from 'underscore';
import {EventEmitter} from 'events';
import * as ShareDB from 'sharedb';
import * as WebSocket from 'ws';
import * as otText from 'ot-text';

ShareDB.types.map['json0'].registerSubtype(otText.type);

export class ChatCodesChannelServer extends EventEmitter {
	private static NUM_COLORS:number = 4;

	private members:Set<any> = new Set<any>();
	private chatPromise:Promise<ShareDB.Doc> = this.getShareDBChat();
	private editorsPromise:Promise<ShareDB.Doc> = this.getShareDBEditors();
	private cursorsPromise:Promise<ShareDB.Doc> = this.getShareDBCursors();
	private selfDestructTimeout = null;
	private selfDestructDelay:number = 0.1 * 60 * 60 * 1000; // 0.1 hours
	constructor(private sharedb, private wss, private channelName:string, private channelID:string=s4Times(4), private archived:boolean=false) {
		super();
		if(!this.isArchive()) {
			this.addEditorListeners();
		}
		this.wss.on('connection', (ws) => {
			ws.on('message', (str:string) => {
				try {
					const data = JSON.parse(str);
					const {ns} = data;
					if(data.cc === 1 && ns === this.getShareDBNamespace()) {
						const {type} = data;
						if(type === 'get-editors-values') {
							const {payload, messageID} = data;
							const version = payload;
							this.getEditorValues(version).then((result) => {
								ws.send(JSON.stringify({
									messageID,
									ns,
									cc: 2,
									payload: Array.from(result.values())
								}));
							});
						}
					}
				} catch(e) {
					console.error(e);
				}
			});
		});
	}
	public isArchive():boolean {
		return this.archived;
	}
	private addEditorListeners() {
		Promise.all([this.subscribePromise(this.chatPromise), this.subscribePromise(this.editorsPromise)]).then((info) => {
			const chatDoc:ShareDB.Doc = info[0];
			const editorsDoc:ShareDB.Doc = info[1];

			let editedFiles:Set<string> = new Set();
			let editingUsers:Set<string> = new Set();
			let lastEvent:string = null;

			let editGroup = {};

			function createNewEditGroup() {
				editedFiles = new Set();
				editingUsers = new Set();
				editGroup = {
					type: 'edit',
					fromVersion: editorsDoc.version,
					toVersion: editorsDoc.version,
					files: [],
					users: [],
					fileContents: {},
					startTimestamp: this.getTimestamp(),
					endTimestamp: this.getTimestamp()
				};
				this.submitOp(chatDoc, {p: ['messages', chatDoc.data.messages.length], li: editGroup }, {source: true});
			}

			this.on('editor-event', (info) => {
				if(lastEvent !== 'edit') {
					createNewEditGroup.call(this);
				}

				const {id} = info;
				if(!editingUsers.has(id)) {
					editingUsers.add(id);
					editGroup['users'].push(id);
				}

				lastEvent = 'edit';
			});

			chatDoc.on('before op', (ops) => {
				ops.forEach((op, source) => {
					const {p, li} = op;
					if(p.length === 2 && p[0] === 'messages' && li && li.type !== 'edit' && !source) {
						lastEvent = 'chat';
					}
				});
			});
			editorsDoc.on('before op', (ops) => {
				ops.forEach((op, source) => {
					const {p, li} = op;
					if(p.length === 3 && p[1] === 'contents') {
						const editorIndex = p[0];
						const editorID = editorsDoc.data[editorIndex].id;
						const editorContents:string = editorsDoc.data[editorIndex].contents;

						if(lastEvent !== 'edit') {
							createNewEditGroup.call(this);
						}

						if(!editedFiles.has(editorID)) {
							editedFiles.add(editorID);
							editGroup['files'].push(editorID);
							editGroup['fileContents'][editorID] = {
								valueBefore: editorContents,
								valueAfter: editorContents
							};
						}
					}
				});
			});
			editorsDoc.on('op', (ops) => {
				ops.forEach((op, source) => {
					const {p, li} = op;
					if(p.length === 3 && p[1] === 'contents') {
						const editorIndex = p[0];
						const editorID = editorsDoc.data[editorIndex].id;
						const editorContents:string = editorsDoc.data[editorIndex].contents;

						editGroup['fileContents'][editorID]['valueAfter'] = editorContents;

						if(lastEvent === 'edit') {
							editGroup['toVersion'] = editorsDoc.version;
							editGroup['endTimestamp'] = this.getTimestamp();
							this.submitOp(chatDoc, {p: ['messages', chatDoc.data.messages.length-1], li: editGroup, ld: _.last(chatDoc.data.messages) }, {source: true});
						}
						lastEvent = 'edit';
					}
				});
			});
		}).catch((e) => {
			console.error(e.stack);
		});
	}
	private subscribePromise(docPromise:Promise<ShareDB.Doc>):Promise<ShareDB.Doc> {
		return docPromise.then((doc) => {
			return new Promise((resolve, reject) => {
				doc.subscribe((err) => {
					if(err) { reject(err); }
					else { resolve(doc); }
				});
			});
		});
	}
	private submitOp(doc:ShareDB.Doc, data, options?):Promise<ShareDB.Doc> {
		return new Promise<ShareDB.Doc>((resolve, reject) => {
			doc.submitOp(data, options, (err) => {
				if(err) { reject(err); }
				else { resolve(doc); }
			})
		});
	}
	private colorIndex:number = 0;
	public fetchDocFromPromise(docPromise:Promise<ShareDB.Doc>):Promise<ShareDB.Doc> {
		return docPromise.then((doc) => {
			return new Promise<ShareDB.Doc>((resolve, reject) => {
				doc.fetch((err) => {
					if(err) { reject(err); }
					else { resolve(doc); }
				});
			});
		});
	};

	public addCodeFile(contents:string, title:string, grammarName:string):Promise<ShareDB.Doc> {
		return this.editorsPromise.then((editorDoc) => {
			const id = guid();
			const modified = false;
			const li = { title, id, contents, grammarName, modified, userCursors:{}, userSelections:{} };
			const p = [editorDoc.data.length];
			return this.submitOp(editorDoc, {p, li});
		});
	}
	public stringify():Promise<string> {
		return Promise.all([this.chatPromise, this.editorsPromise]).then((result) => {
			const chatDoc:ShareDB.Doc = result[0];
			const editorsDoc:ShareDB.Doc = result[1];

			return Promise.all([ chatDoc, editorsDoc, this.getEditorOps(0, editorsDoc.version) ]);
		}).then((result) => {
			const chatDoc:ShareDB.Doc = result[0];
			const editorsDoc:ShareDB.Doc = result[1];
			const editorOps:Array<any> = result[2];

			const data = {
				chatDoc: chatDoc.data,
				editorsDoc: editorsDoc.data,
				editorOps: editorOps
			};
			return JSON.stringify(data);
		});
	}

	private getTimestamp():number { return (new Date()).getTime(); };
	public addMember(memberInfo:any, ws:WebSocket):Promise<any> {
		let preliminaryPromise;
		if(this.isArchive()) {
			preliminaryPromise = Promise.resolve(this);
		} else {
			const {username, id} = memberInfo
			const member = {
				id: id,
				joined: this.getTimestamp(),
				left: -1,
				info: {
					typingStatus: 'IDLE',
					name: username,
					colorIndex: this.colorIndex+1
				}
			};
			this.colorIndex = (this.colorIndex+1)%ChatCodesChannelServer.NUM_COLORS;
			this.members.add(member);
			this.stopSelfDestructTimer();
			ws.on('message', (str:string) => {
				try {
					const data = JSON.parse(str);
					const {ns} = data;
					if(data.cc === 1 && ns === this.getShareDBNamespace()) {
						const {type} = data;
						if(type === 'editor-event') {
							this.emit('editor-event', member);
						} else if(type === 'get-editors-values') {
							const {payload, messageID} = data;
							const version = payload;
							this.getEditorValues(version).then((result) => {
								ws.send(JSON.stringify({
									messageID,
									ns,
									cc: 2,
									payload: Array.from(result.values())
								}));
							});
						}
					}
				} catch(e) {
					console.error(e);
				}
			});

			ws.on('close', () => {
				const timestamp = this.getTimestamp();
				Promise.all([this.chatPromise]).then(([chatDoc]) => {
					const userLeft = {
						uid: id,
						type: 'left',
						timestamp: timestamp
					};
					return this.submitOp(chatDoc, [{p: ['messages', chatDoc.data.messages.length], li: userLeft}]);
				}).then((chatDoc:ShareDB.Doc) => {
					member.left = this.getTimestamp();
					return this.submitOp(chatDoc, [{p: ['activeUsers', id], od: member}]);
				}).then(() => {
					return this.fetchDocFromPromise(this.cursorsPromise);
				}).then((cursorsDoc:ShareDB.Doc) => {
					const removeCursorsPromises = _.chain(cursorsDoc.data)
													.map((ed, i) => {
														const ucd = ed['userCursors'][id];
														const usd = ed['userSelections'][id];
														return Promise.all([this.submitOp(cursorsDoc, [{p: [i, 'userCursors', id], od: ucd}]), this.submitOp(cursorsDoc, [{p: [i, 'userSelections', id], od: ucd}])]);
													})
													.flatten(true)
													.value();
					return Promise.all(removeCursorsPromises);
				}).then(() => {
					this.members.delete(member);
					if(this.isEmpty()) {
						this.startSelfDestructTimer();
					}
				});
				Logger.info(`Client (${id} in ${this.getChannelName()}) disconnected`);
			});

			Logger.info(`Client (${id}:${username} in ${this.getChannelName()}) joined`);
			preliminaryPromise = Promise.all([this.chatPromise]).then((result) => {
				const chatDoc:ShareDB.Doc = result[0];
				return this.submitOp(chatDoc, [{p: ['activeUsers', id], oi: member}]);
			}).then((chatDoc:ShareDB.Doc) => {
				return this.submitOp(chatDoc, [{p: ['allUsers', id], oi: member}]);
			}).then((chatDoc:ShareDB.Doc) => {
				const userJoin = {
					uid: id,
					type: 'join',
					timestamp: this.getTimestamp()
				};
				return this.submitOp(chatDoc, [{p: ['messages', chatDoc.data['messages']['length']], li: userJoin}]);
			});
		}
		return preliminaryPromise.then(() => {
			return Promise.all([this.chatPromise, this.editorsPromise, this.cursorsPromise]);
		}).then(() => {
			return this;
		}, (err) => {
			console.error(err);
		});
	}
	public getChannelName():string { return this.channelName; };
	public getChannelID():string { return this.channelID; };
	public getShareDBNamespace():string { return this.getChannelName() + this.getChannelID(); }
	private getShareDBObject(docName:string, type:string, defaultContents:any):Promise<ShareDB.Doc> {
		return new Promise((resolve, reject) => {
			const connection = this.sharedb.connect();
			const doc = connection.get('chatcodes', `${this.getShareDBNamespace()}-${docName}`);
			doc.fetch((err) => {
				if(err) {
					reject(err);
				} else if(doc.type === null) {
					doc.create(defaultContents, type, () => {
						Logger.debug(`Created doc ${docName}`);
						resolve(doc);
					});
				} else {
					resolve(doc);
				}
			});
		});
	}
	private getShareDBChat():Promise<ShareDB.Doc> { return this.getShareDBObject('chat', 'json0', { 'activeUsers': {}, 'allUsers': {}, 'messages': [], 'actions':[]}); };
	private getShareDBEditors():Promise<ShareDB.Doc> { return this.getShareDBObject('editors', 'json0', []); };
	private getShareDBCursors():Promise<ShareDB.Doc> { return this.getShareDBObject('cursors', 'json0', {}); };
	private getEditorValues(version:number):Promise<Map<string, any>> {
		let content = [];
		let editorValues:Map<string, any> = new Map<string, any>();
		const jsonType = ShareDB.types.map['json0'];

		return this.getEditorOps(0, version).then((ops) => {
			_.each(ops, (op, i) => {
				if(op['create']) {
					// content = _.clone(op['data']);
				} else {
					content = jsonType.apply(content, op.op);
				}
			});
			_.each(content, (editorInfo) => {
				editorValues.set(editorInfo.id, editorInfo);
			});
			return editorValues;
		});
	}
	private getEditorOps(fromVersion:number, toVersion:number, opts={}):Promise<Array<any>> {
		return new Promise<Array<any>>((resolve, reject) => {
			this.sharedb.db.getOps('chatcodes', `${this.getShareDBNamespace()}-editors`, fromVersion, toVersion, opts, (err, data) => {
				if(err) { reject(err); }
				else { resolve(data); }
			});
		});
	};
	private selfDestruct() {
		this.emit('self-destruct', this);
	};
	private startSelfDestructTimer() {
		if(this.selfDestructTimeout === null) {
			this.selfDestructTimeout = setTimeout(() => {
				this.selfDestruct();
			}, this.selfDestructDelay);
		}
	};
	private stopSelfDestructTimer() {
		clearTimeout(this.selfDestructTimeout);
		this.selfDestructTimeout = null;
	}
	private isEmpty():boolean {
		return this.members.size === 0;
	}
	private deleteDoc(doc:ShareDB.Doc, options?) {
		return new Promise<boolean>((resolve, reject) => {
			doc.del(options, (err) => {
				if(err) { reject(err); }
				else { resolve(true); }
			});
		});
	}
	private deleteDocPromise(docPromise:Promise<ShareDB.Doc>):Promise<boolean> {
		return docPromise.then(this.deleteDoc);
	}
	public destroy():Promise<boolean> {
		return Promise.all([
			this.deleteDocPromise(this.cursorsPromise)
		]).then(() => {
			return true;
		})
	}
}
function s4Times(n:number):string {
	let rv:string = '';
	for(let i = 0; i<n; i++) {
		rv += s4();
	}
	return rv;
}
function s4():string {
    return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
}
function guid():string {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
}
