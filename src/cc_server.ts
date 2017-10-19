import * as _ from 'underscore';
import * as commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as path from 'path';
import * as ShareDB from 'sharedb';
import * as ShareDBPostgres from 'sharedb-postgres';
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as WebSocketJSONStream from 'websocket-json-stream';
import * as Logger from 'js-logger';
import {ChatCodesChannelServer} from './cc_channel';

Logger.useDefaults();

export class ChatCodesServer {
	private db;
	private sharedb;
	private app = express();
	private server:http.Server;
	private wss:WebSocket.Server;
	private channels:Map<string, ChatCodesChannelServer> = new Map();
	private channelsDoc:Promise<ShareDB.Doc>;
	constructor(private shareDBPort:number, private shareDBURL:string) {
		this.app.use('/channels', (req, res, next) => {
			next();
		}, express.static(path.join(__dirname, '..', 'channel_pages')));
		this.app.use('/:channelName', (req, res, next) => {
			const channelName:string = req.params.channelName;
			if(channelName==='favicon.ico') {
				return;
			}
			this.isValidChannelName(channelName).then((valid) => {
				if(valid) {
					next();
				} else {
					res.redirect('/');
				}
			});
		}, express.static(path.join(__dirname, '..', 'cc_web')));
		this.app.use('/:channelName/:convo', (req, res, next) => {
			next();
		}, express.static(path.join(__dirname, '..', 'cc_web')));

		this.app.use('/', (req, res, next) => {
			const code = req.query.code;
			const topic = req.query.topic;
			let channelName:string;
			this.createChannelName().then((ch:string) => {
				channelName = ch;
				return this.createNamespace(channelName, null, topic||null);
			}).then((ns) => {
				if(code) {
					return ns.addCodeFile(code||'', 'code', 'Python');
				} else {
					return false;
				}
			}).then(() => {
				res.redirect(`/${channelName}`);
			});
		});
		this.server = http.createServer(this.app);
		this.wss = new WebSocket.Server( { server: this.server });
		this.setupShareDB();
	}
	private setupShareDB() {
		if(this.shareDBURL) {
			this.db = ShareDBPostgres(this.shareDBURL);
		} else {
			this.db = new ShareDB.MemoryDB();
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
							const channelID:string = payload['channelID'];
							let cs:ChatCodesChannelServer;
							if( channelID && this.channels.has(channel)  && this.channels.get(channel).getChannelID() === channelID) {
								cs = this.channels.get(channel);
								ws.send(JSON.stringify({
									channel,
									messageID,
									cc: 2,
									payload: {
										id: cs.getChannelID(),
										ns: cs.getShareDBNamespace()
									}
								}));
							} else {
								cs = this.createNamespace(channel, channelID);
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
							}
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

		this.channelsDoc = this.getShareDBChannels();

		this.server.listen(this.shareDBPort);
		Logger.info(`Created ShareDB server on port ${this.shareDBPort}`)
	}
	private createNamespace(channelName:string, channelID:string=null, topic:string=null):ChatCodesChannelServer {
		if(this.channels.has(channelName)) {
			const channelServer = this.channels.get(channelName);
			return channelServer;
		} else {
			let channelServer;
			if(channelID) { // is archived
				channelServer = new ChatCodesChannelServer(this.sharedb, this.wss, channelName, channelID, true);
			} else {
				channelServer = new ChatCodesChannelServer(this.sharedb, this.wss, channelName);
				this.channels.set(channelName, channelServer);

				this.channelsDoc.then((doc) => {
					const li = {
						channelName: channelName,
						channelID: channelServer.getChannelID(),
						created: (new Date()).getTime(),
						topic: topic,
						archived: false
					};
					const index = doc.data['channels'].length;
					const p = ['channels', index];
					doc.submitOp({ p, li });

					channelServer.on('self-destruct', (cs) => {
						const od = doc.data['channels'][index]['archived'];
						const oi = (new Date()).getTime();
						const p = ['channels', index, 'archived'];
						doc.submitOp({ p, oi, od });
					});
				});
			}

			channelServer.on('self-destruct', (cs) => {
				this.destructNamespace(channelServer);
			});
			return channelServer;
		}
	}
	private destructNamespace(channelServer:ChatCodesChannelServer) {
		if(!channelServer.isArchive()) {
			const channelName = channelServer.getChannelName();
			this.channels.delete(channelName);
		}
		channelServer.destroy();
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
	private getShareDBChannels():Promise<ShareDB.Doc> {
		return new Promise((resolve, reject) => {
			const connection = this.sharedb.connect();
			const doc = connection.get('chatcodes', 'channels');
			doc.fetch((err) => {
				if(err) {
					reject(err);
				} else if(doc.type === null) {
					doc.create({'channels': []}, 'json0', () => {
						Logger.debug(`Created channels doc`);
						resolve(doc);
					});
				} else {
					resolve(doc);
				}
			});
		});
	}
	private isValidChannelName(channelName:string):Promise<boolean> {
		const WORD_FILE_NAME:string = 'channel_names.txt'
		return readFile(path.join(__dirname, '..', WORD_FILE_NAME)).then((words:string) => {
			return words.indexOf(channelName)>=0 && channelName.indexOf('\n')<0;
		});
	}
	private createChannelName():Promise<string> {
		const WORD_FILE_NAME:string = 'channel_names.txt'
		return readFile(path.join(__dirname, '..', WORD_FILE_NAME)).then((words:string) => {
			// Put the list of opened words in a random order
			return _.shuffle(words.split(/\n/));
		}).then((wordList:Array<string>) => {
			function* getNextWord():Iterable<string> {
				for(let i = 0; i<wordList.length; i++) {
					yield wordList[i];
				}
				// If we couldn't find anything, start adding numbers to the end of words
				let j = 0;
				while(true) {
					yield wordList[j%wordList.length]+j+'';
					j++;
				}
			}
			const getNextAvailableName = (iterator) => {
				const {value} = iterator.next();
				return this.nobodyThere(value).then((available) => {
					return available ? value : getNextAvailableName(iterator);
				});
			}
            return getNextAvailableName(getNextWord());
		})
	}
}

const optionDefinitions = [
	{ name: 'memdb', alias: 'm', type: Boolean, defaultValue: false },
	{ name: 'postgrescreds', alias: 'c', type: String, defaultValue: path.join(__dirname, '..', 'db_creds.json')},
	{ name: 'port', alias: 'p', type: Number, defaultValue: 8080 },
];
const options = commandLineArgs(optionDefinitions);

function readFile(filename:string):Promise<string> {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf-8', (err, contents) => {
			if(err) { reject(err); }
			resolve(contents);
		});
	});
}
function getCredentials(filename):Promise<any> {
	return readFile(filename).then((contents:string) => {
		return JSON.parse(contents);
	});
}

getCredentials(options['postgrescreds']).then((info) => {
	const postgresDBURL:string = options['memdb'] ? null: info['url'];
	return new ChatCodesServer(options.port, postgresDBURL);
});
