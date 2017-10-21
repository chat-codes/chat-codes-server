"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("js-logger");
const _ = require("underscore");
const events_1 = require("events");
const ShareDB = require("sharedb");
const otText = require("ot-text");
ShareDB.types.map['json0'].registerSubtype(otText.type);
class ChatCodesChannelServer extends events_1.EventEmitter {
    constructor(sharedb, wss, channelName, channelID = s4Times(4), archived = false) {
        super();
        this.sharedb = sharedb;
        this.wss = wss;
        this.channelName = channelName;
        this.channelID = channelID;
        this.archived = archived;
        this.members = new Set();
        this.chatPromise = this.getShareDBChat();
        this.editorsPromise = this.getShareDBEditors();
        this.cursorsPromise = this.getShareDBCursors();
        this.selfDestructTimeout = null;
        this.selfDestructDelay = 0.0 * 60 * 60 * 1000; // 0.2 hours
        this.colorIndex = 0;
        if (!this.isArchive()) {
            this.addEditorListeners();
        }
    }
    isArchive() {
        return this.archived;
    }
    addEditorListeners() {
        Promise.all([this.subscribePromise(this.chatPromise), this.subscribePromise(this.editorsPromise)]).then((info) => {
            const chatDoc = info[0];
            const editorsDoc = info[1];
            let editedFiles = new Set();
            let editingUsers = new Set();
            let lastEvent = null;
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
                this.submitOp(chatDoc, { p: ['messages', chatDoc.data.messages.length], li: editGroup }, { source: true });
            }
            this.on('editor-event', (info) => {
                if (lastEvent !== 'edit') {
                    createNewEditGroup.call(this);
                }
                const { id } = info;
                if (!editingUsers.has(id)) {
                    editingUsers.add(id);
                    editGroup['users'].push(id);
                }
                lastEvent = 'edit';
            });
            chatDoc.on('before op', (ops) => {
                ops.forEach((op, source) => {
                    const { p, li } = op;
                    if (p.length === 2 && p[0] === 'messages' && li && li.type !== 'edit' && !source) {
                        lastEvent = 'chat';
                    }
                });
            });
            editorsDoc.on('before op', (ops) => {
                ops.forEach((op, source) => {
                    const { p, li } = op;
                    if (p.length === 3 && p[1] === 'contents') {
                        const editorIndex = p[0];
                        const editorID = editorsDoc.data[editorIndex].id;
                        const editorContents = editorsDoc.data[editorIndex].contents;
                        if (lastEvent !== 'edit') {
                            createNewEditGroup.call(this);
                        }
                        if (!editedFiles.has(editorID)) {
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
                    const { p, li } = op;
                    if (p.length === 3 && p[1] === 'contents') {
                        const editorIndex = p[0];
                        const editorID = editorsDoc.data[editorIndex].id;
                        const editorContents = editorsDoc.data[editorIndex].contents;
                        editGroup['fileContents'][editorID]['valueAfter'] = editorContents;
                        if (lastEvent === 'edit') {
                            editGroup['toVersion'] = editorsDoc.version;
                            editGroup['endTimestamp'] = this.getTimestamp();
                            this.submitOp(chatDoc, { p: ['messages', chatDoc.data.messages.length - 1], li: editGroup, ld: _.last(chatDoc.data.messages) }, { source: true });
                        }
                        lastEvent = 'edit';
                    }
                });
            });
        }).catch((e) => {
            console.error(e.stack);
        });
    }
    subscribePromise(docPromise) {
        return docPromise.then((doc) => {
            return new Promise((resolve, reject) => {
                doc.subscribe((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(doc);
                    }
                });
            });
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
    fetchDocFromPromise(docPromise) {
        return docPromise.then((doc) => {
            return new Promise((resolve, reject) => {
                doc.fetch((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(doc);
                    }
                });
            });
        });
    }
    ;
    addCodeFile(contents, title, grammarName) {
        return this.editorsPromise.then((editorDoc) => {
            const id = guid();
            const modified = false;
            const li = { title, id, contents, grammarName, modified, userCursors: {}, userSelections: {} };
            const p = [editorDoc.data.length];
            return this.submitOp(editorDoc, { p, li });
        });
    }
    stringify() {
        return Promise.all([this.chatPromise, this.editorsPromise]).then((result) => {
            const chatDoc = result[0];
            const editorsDoc = result[1];
            return Promise.all([chatDoc, editorsDoc, this.getEditorOps(0, editorsDoc.version)]);
        }).then((result) => {
            const chatDoc = result[0];
            const editorsDoc = result[1];
            const editorOps = result[2];
            const data = {
                chatDoc: chatDoc.data,
                editorsDoc: editorsDoc.data,
                editorOps: editorOps
            };
            return JSON.stringify(data);
        });
    }
    getTimestamp() { return (new Date()).getTime(); }
    ;
    addMember(memberInfo, ws) {
        let preliminaryPromise;
        if (this.isArchive()) {
            preliminaryPromise = Promise.resolve(this);
        }
        else {
            const { username, id } = memberInfo;
            const member = {
                id: id,
                joined: this.getTimestamp(),
                left: -1,
                info: {
                    typingStatus: 'IDLE',
                    name: username,
                    colorIndex: this.colorIndex + 1
                }
            };
            this.colorIndex = (this.colorIndex + 1) % ChatCodesChannelServer.NUM_COLORS;
            this.members.add(member);
            this.stopSelfDestructTimer();
            ws.on('message', (str) => {
                try {
                    const data = JSON.parse(str);
                    const { ns } = data;
                    if (data.cc === 1 && ns === this.getShareDBNamespace()) {
                        const { type } = data;
                        if (type === 'editor-event') {
                            this.emit('editor-event', member);
                        }
                        else if (type === 'get-editors-values') {
                            const { payload, messageID } = data;
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
                }
                catch (e) {
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
                    return this.submitOp(chatDoc, [{ p: ['messages', chatDoc.data.messages.length], li: userLeft }]);
                }).then((chatDoc) => {
                    member.left = this.getTimestamp();
                    return this.submitOp(chatDoc, [{ p: ['activeUsers', id], od: member }]);
                }).then(() => {
                    return this.fetchDocFromPromise(this.cursorsPromise);
                }).then((cursorsDoc) => {
                    const removeCursorsPromises = _.chain(cursorsDoc.data)
                        .map((ed, i) => {
                        const ucd = ed['userCursors'][id];
                        const usd = ed['userSelections'][id];
                        return Promise.all([this.submitOp(cursorsDoc, [{ p: [i, 'userCursors', id], od: ucd }]), this.submitOp(cursorsDoc, [{ p: [i, 'userSelections', id], od: ucd }])]);
                    })
                        .flatten(true)
                        .value();
                    return Promise.all(removeCursorsPromises);
                }).then(() => {
                    this.members.delete(member);
                    if (this.isEmpty()) {
                        this.startSelfDestructTimer();
                    }
                });
                Logger.info(`Client (${id} in ${this.getChannelName()}) disconnected`);
            });
            Logger.info(`Client (${id}:${username} in ${this.getChannelName()}) joined`);
            preliminaryPromise = Promise.all([this.chatPromise]).then((result) => {
                const chatDoc = result[0];
                return this.submitOp(chatDoc, [{ p: ['activeUsers', id], oi: member }]);
            }).then((chatDoc) => {
                return this.submitOp(chatDoc, [{ p: ['allUsers', id], oi: member }]);
            }).then((chatDoc) => {
                const userJoin = {
                    uid: id,
                    type: 'join',
                    timestamp: this.getTimestamp()
                };
                return this.submitOp(chatDoc, [{ p: ['messages', chatDoc.data['messages']['length']], li: userJoin }]);
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
    getChannelName() { return this.channelName; }
    ;
    getChannelID() { return this.channelID; }
    ;
    getShareDBNamespace() { return this.getChannelName() + this.getChannelID(); }
    getShareDBObject(docName, type, defaultContents) {
        return new Promise((resolve, reject) => {
            const connection = this.sharedb.connect();
            const doc = connection.get('chatcodes', `${this.getShareDBNamespace()}-${docName}`);
            doc.fetch((err) => {
                if (err) {
                    reject(err);
                }
                else if (doc.type === null) {
                    doc.create(defaultContents, type, () => {
                        Logger.debug(`Created doc ${docName}`);
                        resolve(doc);
                    });
                }
                else {
                    resolve(doc);
                }
            });
        });
    }
    getShareDBChat() { return this.getShareDBObject('chat', 'json0', { 'activeUsers': {}, 'allUsers': {}, 'messages': [], }); }
    ;
    getShareDBEditors() { return this.getShareDBObject('editors', 'json0', []); }
    ;
    getShareDBCursors() { return this.getShareDBObject('cursors', 'json0', {}); }
    ;
    getEditorValues(version) {
        let content = [];
        let editorValues = new Map();
        const jsonType = ShareDB.types.map['json0'];
        return this.getEditorOps(0, version).then((ops) => {
            _.each(ops, (op, i) => {
                if (op['create']) {
                    // content = _.clone(op['data']);
                }
                else {
                    content = jsonType.apply(content, op.op);
                }
            });
            _.each(content, (editorInfo) => {
                editorValues.set(editorInfo.id, editorInfo);
            });
            return editorValues;
        });
    }
    getEditorOps(fromVersion, toVersion, opts = {}) {
        return new Promise((resolve, reject) => {
            this.sharedb.db.getOps(this.getShareDBNamespace(), 'editors', fromVersion, toVersion, opts, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    ;
    selfDestruct() {
        this.emit('self-destruct', this);
    }
    ;
    startSelfDestructTimer() {
        if (this.selfDestructTimeout === null) {
            this.selfDestructTimeout = setTimeout(() => {
                this.selfDestruct();
            }, this.selfDestructDelay);
        }
    }
    ;
    stopSelfDestructTimer() {
        clearTimeout(this.selfDestructTimeout);
        this.selfDestructTimeout = null;
    }
    isEmpty() {
        return this.members.size === 0;
    }
    deleteDoc(doc, options) {
        return new Promise((resolve, reject) => {
            doc.del(options, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    deleteDocPromise(docPromise) {
        return docPromise.then(this.deleteDoc);
    }
    destroy() {
        return Promise.all([
            this.deleteDocPromise(this.chatPromise),
            this.deleteDocPromise(this.editorsPromise),
            this.deleteDocPromise(this.cursorsPromise)
        ]).then((result) => {
            return true;
        });
    }
}
ChatCodesChannelServer.NUM_COLORS = 4;
exports.ChatCodesChannelServer = ChatCodesChannelServer;
function s4Times(n) {
    let rv = '';
    for (let i = 0; i < n; i++) {
        rv += s4();
    }
    return rv;
}
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
//# sourceMappingURL=cc_channel.js.map