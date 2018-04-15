"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const commandLineArgs = require("command-line-args");
const fs = require("fs");
const path = require("path");
const ShareDB = require("sharedb");
const ShareDBMongo = require("sharedb-mongo");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const WebSocketJSONStream = require("websocket-json-stream");
const Logger = require("js-logger");
const cc_channel_1 = require("./cc_channel");
Logger.useDefaults();
class ChatCodesServer {
    constructor(shareDBPort, shareDBURL = null) {
        this.shareDBPort = shareDBPort;
        this.shareDBURL = shareDBURL;
        this.app = express();
        this.channels = new Map();
        /*
        Routes:
        chat.codes/{valid_channel_name} -> redirect to cc_web
         */
        this.app.use('/channels', express.static(path.join(__dirname, '..', 'channel_pages')));
        this.app.use('/new', (req, res, next) => {
            const { lang, code, topic } = req.query;
            let channelName;
            this.createChannelName().then((ch) => {
                channelName = ch;
                return this.createNamespace(channelName, null, topic || null);
            }).then((ns) => {
                if (code) {
                    return ns.addCodeFile(code || '', 'code', lang || '');
                }
                else {
                    return false;
                }
            }).then(() => {
                res.redirect(`/${channelName}`);
            });
        });
        this.app.use([
            '/:channelName([a-zA-Z]+)/:convo([a-zA-Z0-9]+)',
            '/:channelName([a-zA-Z]+)'
        ], (req, res, next) => {
            const channelName = req.params.channelName;
            const convo = req.params.convo;
            if (req.path === '/') {
                this.isValidChannelName(channelName).then((valid) => {
                    if (valid) {
                        next();
                    }
                    else {
                        res.redirect('/new');
                    }
                });
            }
            else {
                next();
            }
        }, express.static(path.join(__dirname, '..', 'cc_web')), express.static(path.join(__dirname, '..', 'cc_web', 'node_modules', 'ace-builds', 'src-min')));
        this.app.use('/', express.static(path.join(__dirname, '..', 'homepage')));
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });
        this.setupShareDB();
    }
    setupShareDB() {
        if (this.shareDBURL) {
            this.db = ShareDBMongo(this.shareDBURL);
        }
        else {
            this.db = new ShareDB.MemoryDB();
            // this.db = new ShareDBMingo();
        }
        this.sharedb = new ShareDB({ db: this.db });
        this.wss.on('connection', (ws, req) => {
            const stream = new WebSocketJSONStream(ws);
            this.sharedb.listen(stream);
            ws.on('message', (str) => {
                try {
                    const data = JSON.parse(str);
                    if (data.cc === 1) {
                        const { type } = data;
                        if (type === 'request-join-room') {
                            const { payload, messageID } = data;
                            const channel = payload['channel'];
                            const channelID = payload['channelID'];
                            let cs;
                            if (channelID && this.channels.has(channel) && this.channels.get(channel).getChannelID() === channelID) {
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
                            }
                            else {
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
                        }
                        else if (type === 'channel-available') {
                            const { payload, channel, messageID } = data;
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
                }
                catch (e) {
                    console.error(e);
                }
            });
        });
        this.channelsDoc = this.getShareDBChannels();
        this.server.listen(this.shareDBPort);
        Logger.info(`Created ShareDB server on port ${this.shareDBPort}`);
    }
    createNamespace(channelName, channelID = null, topic = null) {
        if (this.channels.has(channelName)) {
            const channelServer = this.channels.get(channelName);
            return channelServer;
        }
        else {
            let channelServer;
            if (channelID) {
                channelServer = new cc_channel_1.ChatCodesChannelServer(this.sharedb, this.wss, channelName, channelID, true);
            }
            else {
                channelServer = new cc_channel_1.ChatCodesChannelServer(this.sharedb, this.wss, channelName);
                this.channels.set(channelName, channelServer);
                Logger.debug(`Created channel ${channelServer.getChannelName()} (${channelServer.getChannelID()})`);
                this.pushChannel({
                    channelName: channelName,
                    channelID: channelServer.getChannelID(),
                    created: (new Date()).getTime(),
                    topic: topic,
                    archived: false
                    // ,data: false
                });
            }
            channelServer.on('self-destruct', (cs) => {
                this.destructNamespace(channelServer);
            });
            return channelServer;
        }
    }
    pushChannel(li) {
        return this.channelsDoc.then((doc) => {
            const index = doc.data['channels'].length;
            const p = ['channels', doc.data['channels'].length];
            return this.submitChannelsOp({ p, li });
        });
    }
    submitOp(doc, data, options) {
        return new Promise((resolve, reject) => {
            doc.submitOp(data, options, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(doc);
                }
            });
        });
    }
    submitChannelsOp(data, options) {
        return this.channelsDoc.then((doc) => {
            return this.submitOp(doc, data, options);
        });
    }
    getChannelIndex(channelID) {
        return this.channelsDoc.then((doc) => {
            const channels = doc.data['channels'];
            for (let i = 0; i < channels.length; i++) {
                if (channels[i].channelID === channelID) {
                    return i;
                }
            }
            return -1;
        });
    }
    destructNamespace(channelServer) {
        if (!channelServer.isArchive()) {
            const channelName = channelServer.getChannelName();
            this.channels.delete(channelName);
        }
        let index;
        let channelDoc;
        this.getChannelIndex(channelServer.getChannelID()).then((channelIndex) => {
            index = channelIndex;
            return this.channelsDoc;
        }).then((doc) => {
            channelDoc = doc;
            const od = channelDoc.data['channels'][index]['archived'];
            const oi = (new Date()).getTime();
            const p = ['channels', index, 'archived'];
            return this.submitChannelsOp({ p, oi, od });
            // }).then((doc) => {
            // 	return channelServer.stringify();
            // }).then((stringifiedChannel:string) => {
            // 	const od = channelDoc.data['channels'][index]['data'];
            // 	const oi = stringifiedChannel;
            // 	const p = ['channels', index, 'data'];
            // 	return this.submitChannelsOp({ p, oi, od });
        }).then((doc) => {
            return channelServer.destroy();
        }).then(() => {
            Logger.info(`Channel ${channelServer.getChannelName()} (${channelServer.getChannelID()}) was destroyed`);
        });
    }
    nobodyThere(channelName) {
        return new Promise((resolve, reject) => {
            if (this.channels.has(channelName)) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    ;
    getShareDBChannels() {
        return new Promise((resolve, reject) => {
            const connection = this.sharedb.connect();
            const doc = connection.get('chatcodes', 'channels');
            doc.fetch((err) => {
                if (err) {
                    reject(err);
                }
                else if (doc.type === null) {
                    doc.create({ 'channels': [] }, 'json0', () => {
                        Logger.debug(`Created channels doc`);
                        resolve(doc);
                    });
                }
                else {
                    resolve(doc);
                }
            });
        });
    }
    isValidChannelName(channelName) {
        const WORD_FILE_NAME = 'channel_names.txt';
        return readFile(path.join(__dirname, '..', WORD_FILE_NAME)).then((words) => {
            return words.indexOf(channelName) >= 0 && channelName.indexOf('\n') < 0;
        });
    }
    createChannelName() {
        const WORD_FILE_NAME = 'channel_names.txt';
        return readFile(path.join(__dirname, '..', WORD_FILE_NAME)).then((words) => {
            // Put the list of opened words in a random order
            return _.shuffle(words.split(/\n/));
        }).then((wordList) => {
            function* getNextWord() {
                for (let i = 0; i < wordList.length; i++) {
                    yield wordList[i];
                }
                // If we couldn't find anything, start adding numbers to the end of words
                let j = 0;
                while (true) {
                    yield wordList[j % wordList.length] + j + '';
                    j++;
                }
            }
            const getNextAvailableName = (iterator) => {
                const { value } = iterator.next();
                return this.nobodyThere(value).then((available) => {
                    return available ? value : getNextAvailableName(iterator);
                });
            };
            return getNextAvailableName(getNextWord());
        });
    }
}
exports.ChatCodesServer = ChatCodesServer;
const optionDefinitions = [
    { name: 'memdb', alias: 'm', type: Boolean, defaultValue: false },
    { name: 'mongocreds', alias: 'c', type: String, defaultValue: path.join(__dirname, '..', 'db_creds.json') },
    { name: 'port', alias: 'p', type: Number, defaultValue: 8080 },
];
const options = commandLineArgs(optionDefinitions);
function readFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, contents) => {
            if (err) {
                reject(err);
            }
            resolve(contents);
        });
    });
}
function getCredentials(filename) {
    return readFile(filename).then((contents) => {
        return JSON.parse(contents);
    });
}
if (options['memdb']) {
    const server = new ChatCodesServer(options.port);
}
else {
    getCredentials(options['mongocreds']).then((info) => {
        const mongoDBURL = options['memdb'] ? null : info['url'];
        return new ChatCodesServer(options.port, mongoDBURL);
    });
}
//# sourceMappingURL=cc_server.js.map