// import * as sio from 'socket.io';
import * as _ from 'underscore';
import * as commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as path from 'path';
import * as ShareDB from 'sharedb';
import * as ShareDBMongo from 'sharedb-mongo';
import * as ShareDBMingo from 'sharedb-mingo-memory';
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as WebSocketJSONStream from 'websocket-json-stream';
import * as otText from 'ot-text';
import * as Logger from 'js-logger';
import {EventEmitter} from 'events';

Logger.useDefaults();

ShareDB.types.map['json0'].registerSubtype(otText.type);

export class ChatCodesChannelServer extends EventEmitter {
	private channelID:string = s4() + s4() + s4() + s4() + s4();
	private members:Set<any> = new Set<any>();
	private chatPromise:Promise<ShareDB.Doc> = this.getShareDBChat();
	private editorsPromise:Promise<ShareDB.Doc> = this.getShareDBEditors();
	private cursorsPromise:Promise<ShareDB.Doc> = this.getShareDBCursors();
	private selfDestructTimeout = null;
	private selfDestructDelay:number = 5 * 60 * 60 * 1000; // 5 hours
	constructor(private sharedb, private wss, private channelName:string) {
		super();
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
	private submitOp(doc, data, options?):Promise<ShareDB.Doc> {
		return new Promise<ShareDB.Doc>((resolve, reject) => {
			doc.submitOp(data, options, (err) => {
				if(err) { reject(err); }
				else { resolve(doc); }
			})
		});
	}
	private static NUM_COLORS:number = 4;
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

	private getTimestamp():number { return (new Date()).getTime(); };
	public addMember(memberInfo:any, ws:WebSocket):Promise<any> {
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
		return Promise.all([this.chatPromise]).then((result) => {
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
		}).catch((err) => {
			console.error(err);
		});
	}
	public getChannelName():string { return this.channelName; };
	public getChannelID():string { return this.channelID; };
	public getShareDBNamespace():string { return this.getChannelName() + this.getChannelID(); }
	private getShareDBObject(docName:string, type:string, defaultContents:any):Promise<ShareDB.Doc> {
		return new Promise((resolve, reject) => {
			const connection = this.sharedb.connect();
			const doc = connection.get(this.getShareDBNamespace(), docName);
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
	private getShareDBChat():Promise<ShareDB.Doc> { return this.getShareDBObject('chat', 'json0', { 'activeUsers': {}, 'allUsers': {}, 'messages': [], }); };
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
			this.sharedb.db.getOps(this.getShareDBNamespace(), 'editors', fromVersion, toVersion, opts, (err, data) => {
				if(err) { reject(err); }
				else { resolve(data); }
			});
		});
	};
	private selfDestruct() {
		this.emit('self-destruct');
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
	public destroy() {
		Logger.info(`Channel ${this.getChannelName()} (${this.getChannelID()}) was destroyed`);
	}
}

export class ChatCodesServer {
	private db;
	private sharedb;
	private members:{[id:string]:any} = {};
	private app = express();
	private server:http.Server;
	private wss:WebSocket.Server;
	private channels:Map<string, ChatCodesChannelServer> = new Map();
	constructor(private shareDBPort:number, private shareDBURL:string) {
		this.app.use('/:channelName', (req, res, next) => {
			next();
		}, express.static(path.join(__dirname, '..', 'cc_web')));
		this.app.use(express.static(path.join(__dirname, '..', 'cc_web')));
		// this.app.get('*', (req, res) => {
		// 	console.log(req);
		// })
		this.server = http.createServer(this.app);
		this.wss = new WebSocket.Server( { server: this.server });
		this.setupShareDB();
	}
	private setupShareDB() {
		if(this.shareDBURL) {
			this.db = ShareDBMongo(this.shareDBURL);
		} else {
			this.db = new ShareDBMingo();
		}
		this.sharedb = new ShareDB({ db: this.db });

		this.wss.on('connection', (ws, req) => {
			const stream = new WebSocketJSONStream(ws);
			this.sharedb.listen(stream);
			ws.on('message', (str:string) => {
				try {
					const data = JSON.parse(str);
					if(data.cc === 1) {
						const {type} = data;
						if(type === 'request-join-room') {
							const {payload, messageID} = data;
							const channel:string = payload['channel'];
							const cs:ChatCodesChannelServer = this.createNamespace(channel);
							cs.addMember(payload, ws).then(() => {
								ws.send(JSON.stringify({
									channel,
									messageID,
									cc: 2,
									payload: {
										id: cs.getChannelID(),
										ns: cs.getShareDBNamespace()
									}
								}));
							});
						} else if(type === 'channel-available') {
							const {payload, channel, messageID} = data;
							this.nobodyThere(channel).then((isEmpty) => {
								ws.send(JSON.stringify({
									channel,
									messageID,
									cc: 2,
									payload: isEmpty
								}));
							});
						}
					}
				} catch(e) {
					console.error(e);
				}
			});
		});

		this.server.listen(this.shareDBPort);
		Logger.info(`Created ShareDB server on port ${this.shareDBPort}`)
	}
	private createNamespace(channelName:string):ChatCodesChannelServer {
		if(!this.channels.has(channelName)) {
			const channelServer = new ChatCodesChannelServer(this.sharedb, this.wss, channelName);
			channelServer.on('self-destruct', () => {
				this.destructNamespace(channelName);
			});
			this.channels.set(channelName, channelServer);
		}

		const channelServer = this.channels.get(channelName);
		return channelServer;
	}
	private destructNamespace(channelName:string) {
		if(this.channels.has(channelName)) {
			const channelServer = this.channels.get(channelName);
			this.channels.delete(channelName);
			channelServer.destroy();
		}
	}
	private nobodyThere(channelName:string):Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			if(this.channels.has(channelName)) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	};
}

const optionDefinitions = [
	{ name: 'usemongo', alias: 'u', type: Boolean, defaultValue: true },
	{ name: 'mongocreds', alias: 'm', type: String, defaultValue: path.join(__dirname, '..', 'db_creds.json')},
	{ name: 'wsport', alias: 'w', type: Number, defaultValue: 8000 },
];
const options = commandLineArgs(optionDefinitions);

function getCredentials(filename:string):Promise<string> {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf-8', (err, contents) => {
			if(err) { reject(err); }
			resolve(contents);
		});
	}).then((contents:string) => {
		return JSON.parse(contents);
	});
}

getCredentials(options['mongocreds']).then((info) => {
	const mongoDBURL:string = options['usemongo'] ? info['url'] : null;
	return new ChatCodesServer(options.wsport, mongoDBURL);
});
function s4():string {
    return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
}
