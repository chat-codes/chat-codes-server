webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "img.logo {\n    height: 40px;\n}\n\n.container-fluid {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    height: 100%;\n}\n\n#content_row {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n#input_row,#list_row,.navbar {\n    -webkit-box-flex: 0;\n        -ms-flex-positive: 0;\n            flex-grow: 0;\n}\n#list_row {\n    min-height: 42px;\n    margin-top: 15px;\n}\n.navbar { min-height: 42px; }\n#input_row {\n    height: 70px;\n    min-height: 48px;\n    margin-bottom: 15px;\n}\n\nchat-messages,code-editor,terminal {\n    height: 100%;\n}\n\n\n.modifiedFlag.modified {\n    border-radius: 5px;\n    height: 10px;\n    width: 10px;\n    display: inline-block;\n    background-color: #AAA;\n}\n\nul.members {\n    list-style: none;\n    padding: 0px;\n    display: inline-block;\n}\nli.member {\n    display: inline-block;\n    margin-left: 5px;\n    margin-right: 5px;\n}\n.message {\n    color: #333;\n}\n.message p {\n    margin: 0px;\n    line-height: normal;\n}\n/*\nli.messageGroup > .header {\n    border-bottom: 1px solid #AAA;\n    background-color: #EEE;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px;\n    padding: 5px;\n}\n\nul.messageGroups ul.messages {\n    list-style: none;\n    padding: 0px;\n}\n\nul.messageGroups ul.messages > li {\n    border-top: 1px solid #EEE;\n    padding-left: 5px;\n    padding-right: 5px;\n    padding-top: 2px;\n    padding-bottom: 2px;\n}\nul.messageGroups ul.messages > li:first-child {\n    border-top: none;\n}\n*/\n.header .time {\n    color: #888;\n}\n.header .sender {\n    /*color: #333;*/\n    /*font-weight: bold;*/\n}\n\n\n.user-1 { color: #007bff; } /* blue */\n.user-2 { color: #dc3545; } /* red */\n.user-3 { color: #fd7e14; } /* orange */\n.user-4 { color: #ffc107; } /* yellow */\n.user-5 { color: #28a745; } /* green */\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<name-entry *ngIf=\"!hasName\" (onEnter)=\"setName($event)\"></name-entry>\n\n<div class=\"container\" *ngIf=\"hasName && !connected\">\n    <div class=\"row\">\n        <div class=\"col\">Connecting...</div>\n    </div>\n</div>\n<div class=\"container-fluid\" *ngIf=\"hasName && connected\">\n    <!-- <nav class=\"navbar\">\n        <span class=\"navbar-brand\">\n            <img src=\"assets/images/cc_icon.svg\" class=\"logo\" />\n            <input type=\"text\" [value]=\"getChatURL()\" readonly />\n        </span>\n    </nav> -->\n    <div class=\"row\" id=\"list_row\">\n        <div class=\"col-8\">\n            <ul class='files nav nav-tabs'>\n                <li class='nav-item' *ngFor=\"let editorState of getActiveEditors()\">\n                    <a [ngClass]=\"{'active': editorState.selected}\" class='nav-link' href='javascript:void(0);' (click)=\"codeEditor.selectFile(editorState)\">\n                        {{editorState.getTitle()}}\n                        <span class='modifiedFlag' [ngClass]=\"{'modified':editorState.getIsModified()}\"></span>\n                    </a>\n                </li>\n                <li class='nav-item'>\n                    <a class='nav-link' href='javascript:void(0);' (click)=\"createNewFile()\">\n                        +\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <!-- <div class=\"col-1\"></div> -->\n        <div class=\"col-4\">\n            Here now:\n            <ul class='members'>\n                <li class='member' *ngFor=\"let user of channelCommLayer.getUserList().getActiveUsers()\">\n                    <user-display [user]='user'></user-display>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"row\" id=\"content_row\">\n        <div class=\"col-8\">\n            <code-editor [commLayer]='channelCommLayer' (cursorSelectionChanged)='editorCursorSelectionChanged($event)' #codeEditor></code-editor>\n        </div>\n        <!-- <div class=\"col-1\">\n            <timeline-display></timeline-display>\n        </div> -->\n        <div class=\"col-4\">\n            <chat-messages [editorStateTracker]='editorStateTracker' [commLayer]='channelCommLayer' [editor]='codeEditor'></chat-messages>\n        </div>\n    </div>\n    <div class=\"row\" id=\"input_row\">\n        <div class=\"col-8\">\n            <!-- <terminal [commLayer]='channelCommLayer'></terminal> -->\n            <python-output [commLayer]='channelCommLayer' [editor]='codeEditor'></python-output>\n        </div>\n        <!-- <div class=\"col-1\"></div> -->\n        <div class=\"col-4\">\n            <chat-input (send)='sendTextMessage($event)'\n            (typing)='updateTypingStatus($event)' #chatinput></chat-input>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_communication_service__ = __webpack_require__("../../../../chat-codes-services/src/communication-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__editor_ace_editor_wrapper__ = __webpack_require__("../../../../../src/app/editor/ace-editor-wrapper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent() {
        this.at_bottom = false;
        this.name = '';
        this.hasName = false;
        this.connected = false;
        var paths = location.pathname.substring(1).split('/');
        if (paths.length > 0) {
            this.channelName = __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */].stripTrailingSlash(paths[0]);
        }
        if (paths.length > 1) {
            this.channelID = __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */].stripTrailingSlash(paths[1]);
        }
        // this.setName('remote');
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent.prototype.editorCursorSelectionChanged = function (data) {
        this.chatinput.onEditorCursorSelectionChanged(data);
    };
    ;
    AppComponent.prototype.setName = function (name) {
        var _this = this;
        this.name = name;
        this.hasName = true;
        this.commLayer = new __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_communication_service__["b" /* CommunicationService */]({
            username: this.name,
            host: window.location.host
            // host: 'localhost:8080',
        }, __WEBPACK_IMPORTED_MODULE_3__editor_ace_editor_wrapper__["a" /* AceEditorWrapper */]);
        this.channelCommLayer = this.commLayer.createChannelWithName(this.channelName, this.channelID);
        this.editorStateTracker = this.channelCommLayer.getEditorStateTracker();
        this.channelCommLayer.ready().then(function (channel) {
            _this.connected = true;
        });
    };
    ;
    AppComponent.prototype.getChatURL = function () {
        return 'chat.codes/' + this.channelName;
    };
    ;
    AppComponent.prototype.sendTextMessage = function (message) {
        this.channelCommLayer.sendTextMessage(message);
    };
    ;
    AppComponent.prototype.updateTypingStatus = function (status) {
        this.channelCommLayer.sendTypingStatus(status);
    };
    ;
    AppComponent.prototype.getActiveEditors = function () {
        return this.channelCommLayer.getActiveEditors();
    };
    ;
    AppComponent.prototype.createNewFile = function () {
        var _this = this;
        return this.channelCommLayer.ready().then(function () {
            return _this.channelCommLayer.getShareDBEditors();
        }).then(function (editorsDoc) {
            var id = guid();
            var title = 'file-' + (editorsDoc.data.length + 1);
            return _this.editorStateTracker.createEditor(id, title, '', 'Python', false);
        }).then(function (es) {
            _this.codeEditor.selectFile(es);
            return es;
        });
    };
    ;
    return AppComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chatinput'),
    __metadata("design:type", Object)
], AppComponent.prototype, "chatinput", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('codeEditor'),
    __metadata("design:type", Object)
], AppComponent.prototype, "codeEditor", void 0);
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css"), __webpack_require__("../../../../bootstrap/dist/css/bootstrap.css"), __webpack_require__("../../../../xterm/dist/xterm.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__name_entry_name_entry_component__ = __webpack_require__("../../../../../src/app/name-entry/name-entry.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_input_chat_input_component__ = __webpack_require__("../../../../../src/app/chat-input/chat-input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__editor_editor_component__ = __webpack_require__("../../../../../src/app/editor/editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_user_display_component__ = __webpack_require__("../../../../../src/app/user/user-display.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_ace_editor__ = __webpack_require__("../../../../ng2-ace-editor/ng2-ace-editor.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_ace_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_ace_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__terminal_terminal_component__ = __webpack_require__("../../../../../src/app/terminal/terminal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__timestamp_timestamp_component__ = __webpack_require__("../../../../../src/app/timestamp/timestamp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chat_messages_chat_messages_component__ = __webpack_require__("../../../../../src/app/chat-messages/chat-messages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__chat_messages_single_message_component__ = __webpack_require__("../../../../../src/app/chat-messages/single-message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__chat_messages_edit_message_component__ = __webpack_require__("../../../../../src/app/chat-messages/edit-message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__chat_messages_connection_message_component__ = __webpack_require__("../../../../../src/app/chat-messages/connection-message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__python_out_python_out_component__ = __webpack_require__("../../../../../src/app/python_out/python_out.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_moment__ = __webpack_require__("../../../../angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_angular2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__chat_input_chat_input_component__["a" /* ChatInput */],
            __WEBPACK_IMPORTED_MODULE_2__name_entry_name_entry_component__["a" /* NameEntry */],
            __WEBPACK_IMPORTED_MODULE_5__user_user_display_component__["a" /* UserDisplay */],
            __WEBPACK_IMPORTED_MODULE_4__editor_editor_component__["a" /* EditorDisplay */],
            __WEBPACK_IMPORTED_MODULE_7__terminal_terminal_component__["a" /* TerminalDisplay */],
            __WEBPACK_IMPORTED_MODULE_9__chat_messages_chat_messages_component__["a" /* ChatMessagesDisplay */],
            __WEBPACK_IMPORTED_MODULE_11__chat_messages_edit_message_component__["a" /* EditMessageDisplay */],
            __WEBPACK_IMPORTED_MODULE_8__timestamp_timestamp_component__["a" /* TimestampDisplay */],
            __WEBPACK_IMPORTED_MODULE_10__chat_messages_single_message_component__["a" /* ChatMessageDisplay */],
            __WEBPACK_IMPORTED_MODULE_12__chat_messages_connection_message_component__["a" /* ConnectionMessageDisplay */],
            __WEBPACK_IMPORTED_MODULE_13__python_out_python_out_component__["a" /* PythonOutputDisplay */]
        ],
        imports: [
            // BrowserModule,
            // FormsModule,
            __WEBPACK_IMPORTED_MODULE_14_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_6_ng2_ace_editor__["AceEditorModule"]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/chat-input/chat-input.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "textarea {\n    width: 100%;\n}\nace-editor {\n    height: 100%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/chat-input/chat-input.component.html":
/***/ (function(module, exports) {

module.exports = "<ace-editor [theme]=\"'chrome'\"\n\t\t\t\tid='chat-input-editor'\n\t\t\t\tclass='form-control'\n\t\t\t\t(keydown)='onTextareaKeydown($event)'\n\t            (textChanged)=\"onTextareaChange($event)\"\n\t            placeholder=\"Say something\"\n\t\t\t\t#editor></ace-editor>\n"

/***/ }),

/***/ "../../../../../src/app/chat-input/chat-input.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var chatInputSoftWrapNumber = 35;
var STATUS = {
    IDLE: 'IDLE',
    ACTIVE_TYPING: 'ACTIVE_TYPING',
    IDLE_TYPED: 'IDLE_TYPED'
};
function trimString(str, size) {
    return str.length > size ? str.substring(0, size - 3) + '...' : str;
}
var ChatInput = (function () {
    function ChatInput() {
        this.messageChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.send = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.typing = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.typingTimeout = 3000;
        this.typingStatus = STATUS.IDLE;
        this.activeTypingTimeout = -1;
    }
    ChatInput.prototype.ngOnInit = function () {
        var editor = this.editor.getEditor();
        var session = editor.getSession();
        editor.$blockScrolling = Infinity;
        editor.setHighlightActiveLine(false);
        editor.renderer.setShowGutter(false);
        session.setUseWrapMode(true);
        session.setWrapLimitRange(chatInputSoftWrapNumber, chatInputSoftWrapNumber);
        session.setOption("indentedSoftWrap", false);
        session.setMode('markdown');
        setTimeout(function () {
            editor.focus();
        }, 100);
    };
    ChatInput.prototype.onTextareaChange = function (val) {
        if (val === '') {
            this.setTypingStatus(STATUS.IDLE);
            this.clearActiveTypingTimeout();
        }
        else {
            this.setTypingStatus(STATUS.ACTIVE_TYPING);
            this.resetActiveTypingTimeout();
        }
        this.messageChanged.emit(val);
    };
    ;
    ChatInput.prototype.onTextareaKeydown = function (event) {
        if (event.keyCode === 13) {
            var chatEditor = this.editor.getEditor();
            var toSend = chatEditor.getValue();
            event.preventDefault();
            event.stopPropagation();
            this.setTypingStatus(STATUS.IDLE);
            this.clearActiveTypingTimeout();
            if (toSend) {
                chatEditor.setValue('');
                this.send.emit(toSend);
            }
        }
    };
    ;
    ChatInput.prototype.rangeFromStartAndEnd = function (start, end) {
        var Range = ace.require('ace/range').Range;
        var startRow = __WEBPACK_IMPORTED_MODULE_1_underscore__["has"](start, 'row') ? start.row : start[0];
        var startCol = __WEBPACK_IMPORTED_MODULE_1_underscore__["has"](start, 'column') ? start.column : start[1];
        var endRow = __WEBPACK_IMPORTED_MODULE_1_underscore__["has"](end, 'row') ? end.row : end[0];
        var endCol = __WEBPACK_IMPORTED_MODULE_1_underscore__["has"](end, 'column') ? end.column : end[1];
        return new Range(startRow, startCol, endRow, endCol);
    };
    ;
    ChatInput.prototype.onEditorCursorSelectionChanged = function (data) {
        var _this = this;
        var Search = ace.require('ace/search').Search;
        var Range = ace.require('ace/range').Range;
        var chatEditor = this.editor.getEditor();
        var chatSession = chatEditor.getSession();
        var chatDocument = chatSession.getDocument();
        var chatSelection = chatSession.getSelection();
        var codeEditor = data.editor;
        var codeSession = codeEditor.getSession();
        var codeDocument = codeSession.getDocument();
        var range = this.rangeFromStartAndEnd(data.newRange.start, data.newRange.end);
        var locationString;
        if (range.isEmpty()) {
            locationString = false;
        }
        else {
            var start = range.start, end = range.end;
            var openFileTitle = data.fileName;
            if (range.start.column === 0 && range.end.column === 0) {
                if (range.start.row === range.end.row - 1) {
                    locationString = openFileTitle + ":L" + start.row;
                }
                else {
                    locationString = openFileTitle + ":L" + start.row + "-L" + (end.row - 1);
                }
            }
            else {
                locationString = openFileTitle + ":L" + start.row + "," + start.column + "-L" + end.row + "," + end.column;
            }
        }
        // const currentMessage = session.getText();
        // // const chatEditorBuffer = this.editor.getBuffer();
        // const chatInputSelectionRange = chatEditor.getSelectedBufferRange();
        var chatInputSelectionRange = chatSession.getSelection().getRange();
        var messageRegex = new RegExp('\\[(.*)\\]\s*\\((.*)\\)');
        // const messageMatch = currentMessage.match(messageRegex);
        var found = false;
        var searchQuery = new Search();
        searchQuery.set({
            regExp: true,
            needle: messageRegex
        });
        var matchRanges = searchQuery.findAll(chatSession);
        __WEBPACK_IMPORTED_MODULE_1_underscore__["each"](matchRanges, function (matchRange) {
            if (matchRange.intersects(chatInputSelectionRange)) {
                if (matchRange.isEqual(chatInputSelectionRange)) {
                    if (locationString) {
                        var textInRange = trimString(codeSession.getTextRange(range).replace(new RegExp('\n', 'g'), ' '), 10);
                        var newEnd = chatSession.replace(matchRange, "[`" + textInRange + "`](" + locationString + ")");
                        chatSelection.setSelectionRange(_this.rangeFromStartAndEnd(matchRange.start, newEnd));
                    }
                    else {
                        var newEnd = chatSession.replace(matchRange, '');
                        chatSelection.setSelectionRange(_this.rangeFromStartAndEnd(matchRange.start, newEnd));
                    }
                }
                else {
                    var match = chatSession.getTextRange(matchRange).match(messageRegex);
                    var textStr = match[1];
                    var previousLinkStr = match[2];
                    if (locationString) {
                        var previousLinkSearchQuery = new Search();
                        previousLinkSearchQuery.set({
                            regExp: false,
                            needle: "(" + previousLinkStr + ")",
                            backwards: true,
                            range: matchRange
                        });
                        var previousLinkRange = previousLinkSearchQuery.find(chatSession);
                        if (previousLinkRange) {
                            chatSession.replace(previousLinkRange, "(" + locationString + ")");
                        }
                        var previousTextSearchQuery = new Search();
                        previousTextSearchQuery.set({
                            regExp: false,
                            needle: "" + textStr,
                            range: matchRange
                        });
                        var previousTextRange = previousTextSearchQuery.find(chatSession);
                        if (previousTextRange) {
                            chatSelection.setSelectionRange(previousTextRange);
                        }
                    }
                    else {
                        var newEnd = chatSession.replace(matchRange, "" + textStr);
                        chatSelection.setSelectionRange(_this.rangeFromStartAndEnd(matchRange.start, newEnd));
                    }
                }
                found = true;
            }
        });
        if (locationString && !found) {
            if (chatInputSelectionRange.isEmpty()) {
                var textInRange = trimString(codeSession.getTextRange(range).replace(new RegExp('\n', 'g'), ' '), 10);
                var newEnd = chatSession.replace(chatInputSelectionRange, "[`" + textInRange + "`](" + locationString + ")");
                chatSelection.setSelectionRange(this.rangeFromStartAndEnd(chatInputSelectionRange.start, newEnd));
            }
            else {
                var newOpenBracketEnd = chatSession.insert(chatInputSelectionRange.start, "[");
                var newEnd = __WEBPACK_IMPORTED_MODULE_1_underscore__["extend"]({}, chatInputSelectionRange.end, { column: chatInputSelectionRange.end.column + 1 });
                var endReplacementRange = chatSession.insert(newEnd, "](" + locationString + ")");
                chatSelection.setSelectionRange(this.rangeFromStartAndEnd(newOpenBracketEnd, newEnd));
            }
        }
    };
    ChatInput.prototype.setTypingStatus = function (newStatus) {
        if (this.typingStatus != newStatus) {
            this.typingStatus = newStatus;
            this.typing.emit(this.typingStatus);
        }
        return this.typingStatus;
    };
    ;
    ChatInput.prototype.resetActiveTypingTimeout = function () {
        this.clearActiveTypingTimeout();
        this.setActiveTypingTimeout();
    };
    ChatInput.prototype.setActiveTypingTimeout = function () {
        var _this = this;
        this.activeTypingTimeout = window.setTimeout(function () {
            _this.setTypingStatus(STATUS.IDLE_TYPED);
        }, this.typingTimeout);
    };
    ChatInput.prototype.clearActiveTypingTimeout = function () {
        if (this.hasActiveTypingTimeout()) {
            window.clearTimeout(this.activeTypingTimeout);
            this.activeTypingTimeout = -1;
        }
    };
    ChatInput.prototype.hasActiveTypingTimeout = function () {
        return this.activeTypingTimeout >= 0;
    };
    return ChatInput;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('editor'),
    __metadata("design:type", Object)
], ChatInput.prototype, "editor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ChatInput.prototype, "messageChanged", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], ChatInput.prototype, "send", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], ChatInput.prototype, "typing", void 0);
ChatInput = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chat-input',
        template: __webpack_require__("../../../../../src/app/chat-input/chat-input.component.html"),
        styles: [__webpack_require__("../../../../../src/app/chat-input/chat-input.component.css")],
    })
], ChatInput);

var _a, _b;
//# sourceMappingURL=chat-input.component.js.map

/***/ }),

/***/ "../../../../../src/app/chat-messages/chat-messages.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".no-messages {\n    text-align: center;\n    vertical-align: middle;\n    font-size: 2em;\n    color: #AAA;\n    font-weight: lighter;\n}\n\n.message-display {\n    overflow-y: auto;\n    height: 100%;\n    border-top: 1px solid #DDD;\n    padding-right: 5px;\n}\n\n.typing {\n    color: #AAA;\n}\n\nul.messageGroups {\n    list-style: none;\n    padding: 0px;\n}\nul.messageGroups > li.messageGroup {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\nli.messageGroup  .header {\n    background-color: #EEE;\n}\n\n.revert {\n    position: absolute;\n    right: 5px;\n}\n\n.cameAfterTimestamp .text-messages {\n    opacity: 0.5;\n}\nli.messageGroup .isCurrentTimestamp {\n    border: 1px solid #0275d8;\n    border-radius: 5px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/chat-messages/chat-messages.component.html":
/***/ (function(module, exports) {

module.exports = "<div #messageDisplay class=\"message-display\">\n    <div class=\"no-messages\" *ngIf='commLayer.messageGroups.isEmpty()'>\n        (no messages)\n    </div>\n    <ul class='messageGroups'>\n        <li class='messageGroup' *ngFor=\"let messageGroup of commLayer.messageGroups.getMessageGroups()\" [ngClass]='{cameAfterTimestamp: (!editorStateTracker.isAtLatest() && isChatMessage(messageGroup) && messageGroup.getEditorVersion() > editorStateTracker.getCurrentVersion())}'>\n            <ul *ngIf=\"isChatMessage(messageGroup)\" class='text-messages list-group'  [ngClass]='\"user-\"+messageGroup.getSender().getColorIndex() + ((editorStateTracker.getCurrentVersion() === messageGroup.getEditorVersion()) ? \" isCurrentTimestamp\":\"\")' (click)=\"revert(messageGroup)\">\n                <li class='header list-group-item'>\n                    <span class=\"sender\">{{messageGroup.getSender().getName()}}</span>&nbsp;<timestamp [t]='messageGroup.getLatestTimestamp()' [parens]='true'></timestamp>\n                    <!-- <button *ngIf='this.currentTimestamp!==messageGroup.getTimestamp()' class=\"btn btn-default btn-sm revert\" (click)=\"revert(messageGroup)\">Look</button> -->\n                    <!-- <button *ngIf='this.currentTimestamp===messageGroup.getTimestamp()' class=\"btn btn-primary btn-sm revert\" (click)=\"toLatest($event)\">Latest</button> -->\n                </li>\n                <li *ngFor=\"let message of messageGroup.getItems()\" class='message list-group-item'>\n                    <chat-message [message]='message' [editorStateTracker]='commLayer.getEditorStateTracker()' [editor]='editor' ></chat-message>\n                </li>\n            </ul>\n            <ul *ngIf=\"isEditMessage(messageGroup)\" class='edit-messages list-group'>\n                <edit-message-group (willExpand)='this.willChangeSize.emit($event)' (expanded)='this.changedSize.emit($event)' [messageGroup]='messageGroup' [editor]='editor' [editorStateTracker]='commLayer.getEditorStateTracker()'></edit-message-group>\n            </ul>\n            <ul *ngIf=\"isConnectMessage(messageGroup)\" class='connect-messages list-group'>\n                <connection-message-group [messageGroup]='messageGroup'></connection-message-group>\n            </ul>\n        </li>\n        <!-- <li [style.visibility]='this.currentTimestamp >= 0 ? \"visible\" : \"hidden\"'>\n            <button class='btn btn-primary btn-sm btn-block' (click)=\"toLatest($event)\">Show current</button>\n        </li> -->\n    </ul>\n    <div class='typing'>\n        <div *ngFor='let user of commLayer.userList.activeUsers'>\n            <div *ngIf='user.typingStatus==\"ACTIVE_TYPING\" && !user.isMe'>\n                {{user.name}} is typing...\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/chat-messages/chat-messages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMessagesDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_messages__ = __webpack_require__("../../../../chat-codes-services/src/chat-messages.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_editor_state_tracker__ = __webpack_require__("../../../../chat-codes-services/src/editor-state-tracker.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_communication_service__ = __webpack_require__("../../../../chat-codes-services/src/communication-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__editor_editor_component__ = __webpack_require__("../../../../../src/app/editor/editor.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatMessagesDisplay = (function () {
    // private currentTimestamp:number=-1;
    function ChatMessagesDisplay() {
        this.willChangeSize = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.changedSize = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        // this.editorStateTracker = this.commLayer.getEditorStateTracker();
    }
    ChatMessagesDisplay.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.scrollToBottom(); }, 0);
        var at_bottom = false;
        var messageGroups = this.commLayer.getMessageGroups();
        messageGroups.on('group-will-be-added', function (event) {
            at_bottom = _this.atBottom();
        });
        messageGroups.on('item-will-be-added', function (event) {
            at_bottom = _this.atBottom();
        });
        this.willChangeSize.subscribe(function () {
            at_bottom = _this.atBottom();
        });
        messageGroups.on('group-added', function (event) {
            setTimeout(function () { if (at_bottom) {
                _this.scrollToBottom();
            } }, 0);
        });
        messageGroups.on('item-added', function (event) {
            setTimeout(function () { if (at_bottom) {
                _this.scrollToBottom();
            } }, 0);
        });
        this.editorStateTracker.on('timestampChanged', function (event) {
            _this.updateCurrentTimestamp();
        });
        this.changedSize.subscribe(function () {
            setTimeout(function () { if (at_bottom) {
                _this.scrollToBottom();
            } }, 0);
        });
    };
    ChatMessagesDisplay.prototype.scrollToBottom = function () {
        var element = this.messageDisplay.nativeElement;
        try {
            element.scrollTop = element.scrollHeight;
        }
        catch (err) {
            console.error(err);
        }
    };
    ChatMessagesDisplay.prototype.atBottom = function () {
        var element = this.messageDisplay.nativeElement;
        return Math.abs(element.scrollTop + element.clientHeight - element.scrollHeight) < 100;
    };
    ChatMessagesDisplay.prototype.revert = function (messageGroup) {
        return this.editorStateTracker.setVersion(messageGroup.getEditorVersion(), messageGroup.getLatestTimestamp(), { editor: this.editor.getEditorInstance() });
    };
    ChatMessagesDisplay.prototype.isChatMessage = function (message) {
        return message instanceof __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_messages__["e" /* TextMessageGroup */];
    };
    ;
    ChatMessagesDisplay.prototype.isEditMessage = function (message) {
        return message instanceof __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_messages__["b" /* EditGroup */];
    };
    ;
    ChatMessagesDisplay.prototype.isConnectMessage = function (message) {
        return message instanceof __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_messages__["a" /* ConnectionMessageGroup */];
    };
    ;
    ChatMessagesDisplay.prototype.updateCurrentTimestamp = function () {
        // this.currentTimestamp = this.editorStateTracker.getCurrentTimestamp();
    };
    ChatMessagesDisplay.prototype.toLatest = function (event) {
        event.stopPropagation();
        return this.editorStateTracker.toLatestVersion({ editor: this.editor.getEditorInstance() });
    };
    return ChatMessagesDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_communication_service__["a" /* ChannelCommunicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_communication_service__["a" /* ChannelCommunicationService */]) === "function" && _a || Object)
], ChatMessagesDisplay.prototype, "commLayer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_editor_state_tracker__["a" /* EditorStateTracker */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_editor_state_tracker__["a" /* EditorStateTracker */]) === "function" && _b || Object)
], ChatMessagesDisplay.prototype, "editorStateTracker", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__editor_editor_component__["a" /* EditorDisplay */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__editor_editor_component__["a" /* EditorDisplay */]) === "function" && _c || Object)
], ChatMessagesDisplay.prototype, "editor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('messageDisplay'),
    __metadata("design:type", Object)
], ChatMessagesDisplay.prototype, "messageDisplay", void 0);
ChatMessagesDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chat-messages',
        template: __webpack_require__("../../../../../src/app/chat-messages/chat-messages.component.html"),
        styles: [__webpack_require__("../../../../../src/app/chat-messages/chat-messages.component.css")],
    }),
    __metadata("design:paramtypes", [])
], ChatMessagesDisplay);

var _a, _b, _c;
//# sourceMappingURL=chat-messages.component.js.map

/***/ }),

/***/ "../../../../../src/app/chat-messages/connection-message.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".full_connection_message {\n    font-size: 0.8em;\n    margin-top: 5px;\n    margin-bottom: 5px;\n}\n.connection_message .action {\n    opacity: 0.7;\n}\ntimestamp {\n    opacity: 0.7;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/chat-messages/connection-message.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"full_connection_message\">\n\t<div class=\"connection_message\">\n\t\t<span class=\"users\" *ngFor=\"let user of users; let i = index\">\n\t\t\t<span [ngClass]='\"user-\"+user.getColorIndex()'>{{user.getName()}}</span><span *ngIf=\"numUsers>2 && i<numUsers-2\">, </span><span *ngIf=\"numUsers>2 && i===numUsers-2\">, and</span><span *ngIf=\"numUsers==2 && i==0\"> and</span>\n\t\t</span>\n\t\t<span class=\"action\">\n\t\t\t{{action}}\n\t\t</span>\n\t\t<timestamp [t]='messageGroup.getLatestTimestamp()' [parens]='true'></timestamp>\n\t</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/chat-messages/connection-message.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionMessageDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_messages__ = __webpack_require__("../../../../chat-codes-services/src/chat-messages.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConnectionMessageDisplay = (function () {
    function ConnectionMessageDisplay() {
        this.users = [];
        this.numUsers = 0;
        this.action = '';
    }
    ConnectionMessageDisplay.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.updateVariables(); }, 0);
        this.messageGroup.on('item-added', function () {
            _this.updateVariables();
        });
        this.messageGroup.on('delta-added', function () {
            _this.updateVariables();
        });
    };
    ConnectionMessageDisplay.prototype.updateVariables = function () {
        this.users = this.messageGroup.getUsers();
        this.numUsers = this.users.length;
        this.action = this.messageGroup.isConnect() ? 'connected' : 'disconnected';
    };
    return ConnectionMessageDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_messages__["a" /* ConnectionMessageGroup */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_messages__["a" /* ConnectionMessageGroup */]) === "function" && _a || Object)
], ConnectionMessageDisplay.prototype, "messageGroup", void 0);
ConnectionMessageDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'connection-message-group',
        template: __webpack_require__("../../../../../src/app/chat-messages/connection-message.component.html"),
        styles: [__webpack_require__("../../../../../src/app/chat-messages/connection-message.component.css")],
    })
], ConnectionMessageDisplay);

var _a;
//# sourceMappingURL=connection-message.component.js.map

/***/ }),

/***/ "../../../../../src/app/chat-messages/edit-message.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".full_edit_message {\n    font-size: 0.8em;\n    margin-top: 5px;\n    margin-bottom: 5px;\n    /*padding-top: 8px;\n    padding-bottom: 10px;*/\n    /*border-top: 1px solid #EEE;*/\n    /*border-bottom: 1px solid #EEE;*/\n}\n.edit_message .action {\n    opacity: 0.7;\n}\n\n.btn-group {\n    margin-right: 5px;\n}\n\ntimestamp {\n    opacity: 0.7;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/chat-messages/edit-message.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"full_edit_message\">\n\t<!-- <div class=\"btn-toolbar\" role=\"toolbar\">\n\t\t<div class=\"btn-group\" role=\"group\">\n\t\t\t<button type='button' class='btn btn-secondary btn-sm' [ngClass]='{\"active\": isShowingCodeBefore()}' (click)='showCodeBefore()'>Show code before</button> -->\n\t\t\t<!-- <button *ngIf='isShowingCodeBefore()' type='button' class='btn btn-primary btn-sm' (click)='showLatestCode()'>Show current code</button> -->\n\t\t<!-- </div>\n\t</div> -->\n\t<div class=\"edit_message\">\n\t\t<span class=\"authors\" *ngFor=\"let author of authors; let i = index\">\n\t\t\t<span [ngClass]='\"user-\"+author.getColorIndex()'>{{author.getName()}}</span><span *ngIf=\"numAuthors>2 && i<numAuthors-2\">, </span><span *ngIf=\"numAuthors>2 && i===numAuthors-2\">, and</span><span *ngIf=\"numAuthors==2 && i==0\"> and</span>\n\t\t</span>\n\t\t<span class=\"action\">edited</span>\n\t\t<span *ngFor=\"let editorState of editorStates; let i = index\">\n\t\t\t<span><a (click)='openFile(editorState)' href=\"javascript:void(0)\">{{editorState.getTitle()}}</a></span><span *ngIf=\"numEditorStates>2 && i<numEditorStates-2\">, </span><span *ngIf=\"numEditorStates>2 && i===numEditorStates-2\">, and</span><span *ngIf=\"numEditorStates==2 && i==0\"> and</span>\n\t\t</span>\n\t\t<timestamp [t]='messageGroup.getLatestTimestamp()' [parens]='true'></timestamp>\n\t\t<a (click)='toggleDetails()' href=\"javascript:void(0)\">{{showingDetails ? \"(less)\" : \"(more)\"}}</a>\n\t</div>\n\t<!-- <div *ngIf='showingDetails' class=\"btn-toolbar\" role=\"toolbar\">\n\t\t<div class=\"btn-group\" role=\"group\">\n\t\t\t<button type='button' class='btn btn-secondary btn-sm' [ngClass]='{\"active\": isShowingCodeBefore()}' (click)='showCodeBefore()'>Show before</button>\n\t\t\t<button type='button' class='btn btn-secondary btn-sm' [ngClass]='{\"active\": isShowingCodeAfter()}' (click)='showCodeAfter()'>Show after</button>\n\t\t\t<button *ngIf='isShowingCodeAfter()' type='button' class='btn btn-primary btn-sm' (click)='showLatestCode()'>Show current</button>\n\t\t</div>\n\t\t<div class=\"btn-group\" role=\"group\">\n\t\t    <button class='btn btn-secondary btn-sm' [ngClass]=\"{'active': showingChanges}\" (click)=\"toggleShowingChanges()\">\n\t\t        {{showingChanges ? \"Hide diff\" : \"Show diff\"}}\n\t\t    </button>\n\t\t</div>\n\t</div> -->\n\t<div *ngIf=\"showingChanges && showingDetails\" class=\"diff\">\n\t\t<div *ngFor=\"let dhtml of diffHTMLs\" class=\"file_diff\">\n\t\t\t<div [innerHTML]=\"dhtml\">\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/chat-messages/edit-message.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditMessageDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_chat_messages__ = __webpack_require__("../../../../chat-codes-services/src/chat-messages.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_editor_state_tracker__ = __webpack_require__("../../../../chat-codes-services/src/editor-state-tracker.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_diff2html__ = __webpack_require__("../../../../diff2html/src/diff2html.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_diff2html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_diff2html__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditMessageDisplay = (function () {
    function EditMessageDisplay() {
        this.willExpand = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.expanded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.showingDetails = false;
        this.authors = [];
        this.numAuthors = 0;
        this.editorStates = [];
        this.numEditorStates = 0;
        this.showingChanges = true;
        this.diffSummaries = [];
        this.diffHTMLs = [];
    }
    EditMessageDisplay.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.updateVariables(); }, 0);
        var throttledUpdateVariables = __WEBPACK_IMPORTED_MODULE_1_underscore__["throttle"](__WEBPACK_IMPORTED_MODULE_1_underscore__["bind"](this.updateVariables, this), 1000, { leading: false });
        this.messageGroup.on('item-added', function () {
            throttledUpdateVariables();
        });
    };
    EditMessageDisplay.prototype.toggleDetails = function () {
        this.showingDetails = !this.showingDetails;
        this.willExpand.emit(this.showingDetails);
        if (this.showingDetails) {
            this.updateDiffHTMLs();
        }
        else {
            this.showLatestCode();
        }
        this.expanded.emit(this.showingDetails);
    };
    EditMessageDisplay.prototype.updateVariables = function () {
        this.authors = this.messageGroup.getAuthors();
        this.numAuthors = this.authors.length;
        this.editorStates = this.messageGroup.getEditorStates();
        this.numEditorStates = this.editorStates.length;
        if (this.showingChanges && this.showingDetails) {
            this.updateDiffHTMLs();
        }
    };
    EditMessageDisplay.prototype.openFile = function (editorState) {
        this.editor.selectFile(editorState);
    };
    EditMessageDisplay.prototype.toggleShowingChanges = function () {
        if (this.showingChanges) {
            this.showingChanges = false;
        }
        else {
            this.updateDiffHTMLs();
            this.showingChanges = true;
        }
    };
    EditMessageDisplay.prototype.updateDiffHTMLs = function () {
        this.diffSummaries = this.messageGroup.getDiffSummary();
        this.diffHTMLs = __WEBPACK_IMPORTED_MODULE_1_underscore__["map"](this.diffSummaries, function (ds) {
            var html = __WEBPACK_IMPORTED_MODULE_4_diff2html__["Diff2Html"].getPrettyHtml(ds.diff);
            return html;
        });
    };
    EditMessageDisplay.prototype.showCodeBefore = function () {
        // 		return this.editorStateTracker.goBeforeDelta(this.messageGroup.getEarliestItem(), {editor: this.editor.getEditorInstance()});
    };
    EditMessageDisplay.prototype.showCodeAfter = function () {
        // 		return this.editorStateTracker.goAfterDelta(this.messageGroup.getLatestItem(), {editor: this.editor.getEditorInstance()});
    };
    EditMessageDisplay.prototype.isShowingCodeBefore = function () {
        return false;
        // 		return this.editorStateTracker.isShowingCodeBefore(this.messageGroup.getEarliestItem());
    };
    EditMessageDisplay.prototype.isShowingCodeAfter = function () {
        return false;
        // 		return this.editorStateTracker.isShowingCodeAfter(this.messageGroup.getLatestItem());
    };
    EditMessageDisplay.prototype.showLatestCode = function () {
        // this.editorStateTracker.toLatestTimestamp({editor: this.editor.getEditorInstance() });
    };
    return EditMessageDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_editor_state_tracker__["a" /* EditorStateTracker */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_editor_state_tracker__["a" /* EditorStateTracker */]) === "function" && _a || Object)
], EditMessageDisplay.prototype, "editorStateTracker", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_chat_messages__["b" /* EditGroup */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_chat_messages__["b" /* EditGroup */]) === "function" && _b || Object)
], EditMessageDisplay.prototype, "messageGroup", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], EditMessageDisplay.prototype, "editor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('elem'),
    __metadata("design:type", Object)
], EditMessageDisplay.prototype, "elem", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _c || Object)
], EditMessageDisplay.prototype, "willExpand", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _d || Object)
], EditMessageDisplay.prototype, "expanded", void 0);
EditMessageDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'edit-message-group',
        template: __webpack_require__("../../../../../src/app/chat-messages/edit-message.component.html"),
        styles: [__webpack_require__("../../../../../src/app/chat-messages/edit-message.component.css")],
    })
], EditMessageDisplay);

var _a, _b, _c, _d;
//# sourceMappingURL=edit-message.component.js.map

/***/ }),

/***/ "../../../../../src/app/chat-messages/single-message.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/chat-messages/single-message.component.html":
/***/ (function(module, exports) {

module.exports = "<div #elem>{{message.getMessage()}}</div>"

/***/ }),

/***/ "../../../../../src/app/chat-messages/single-message.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMessageDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_chat_messages__ = __webpack_require__("../../../../chat-codes-services/src/chat-messages.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chat_codes_services_src_editor_state_tracker__ = __webpack_require__("../../../../chat-codes-services/src/editor-state-tracker.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatMessageDisplay = (function () {
    function ChatMessageDisplay() {
    }
    ChatMessageDisplay.prototype.ngOnInit = function () {
        var _this = this;
        var $elem = __WEBPACK_IMPORTED_MODULE_2_jquery__(this.elem.nativeElement);
        $elem.html(this.message.getHTML());
        var startingVersion = -10;
        var startingTimestamp = -10;
        __WEBPACK_IMPORTED_MODULE_2_jquery__('a.line_ref', $elem).on('mouseenter', function (me_event) {
            startingTimestamp = _this.editorStateTracker.getCurrentTimestamp();
            startingVersion = _this.editorStateTracker.getCurrentVersion();
            var _a = _this.getHighlightInfo(me_event.currentTarget), file = _a.file, range = _a.range;
            var highlightID = _this.addHighlight(file, range, _this.message.getEditorVersion(), _this.message.getTimestamp());
            __WEBPACK_IMPORTED_MODULE_2_jquery__(me_event.target).on('mouseleave.removeHighlight', function (ml_event) {
                if (startingVersion !== -10) {
                    _this.editorStateTracker.setVersion(startingVersion, startingTimestamp, { editor: _this.editor.getEditorInstance() });
                }
                _this.removeHighlight(file, highlightID);
                __WEBPACK_IMPORTED_MODULE_2_jquery__(me_event.target).off('mouseleave.removeHighlight');
            });
        }).on('click', function (c_event) {
            var _a = _this.getHighlightInfo(c_event.currentTarget), file = _a.file, range = _a.range;
            _this.focusRange(file, range, _this.message.getEditorVersion(), _this.message.getTimestamp());
            startingVersion = -10;
            startingTimestamp = -10;
        });
    };
    ChatMessageDisplay.prototype.getHighlightInfo = function (elem) {
        var $elem = __WEBPACK_IMPORTED_MODULE_2_jquery__(elem);
        var start = $elem.attr('data-start');
        var end = $elem.attr('data-end');
        return {
            file: $elem.attr('data-file'),
            range: {
                start: __WEBPACK_IMPORTED_MODULE_1_underscore__["map"](start.split(','), function (x) { return parseInt(x); }),
                end: __WEBPACK_IMPORTED_MODULE_1_underscore__["map"](end.split(','), function (x) { return parseInt(x); })
            }
        };
    };
    ChatMessageDisplay.prototype.addHighlight = function (editorID, range, version, timestamp) {
        return this.editorStateTracker.addHighlight(editorID, range, version, timestamp, {
            editor: this.editor.getEditorInstance()
        });
    };
    ChatMessageDisplay.prototype.removeHighlight = function (editorID, highlightID) {
        this.editorStateTracker.removeHighlight(editorID, highlightID, {
            editor: this.editor.getEditorInstance()
        });
    };
    ChatMessageDisplay.prototype.focusRange = function (editorID, range, version, timestamp) {
        var editorState = this.editorStateTracker.getEditorState(editorID);
        this.editor.selectFile(editorState);
        return this.editorStateTracker.focus(editorID, range, version, timestamp, { editor: this.editor.getEditorInstance() });
    };
    return ChatMessageDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_chat_codes_services_src_editor_state_tracker__["a" /* EditorStateTracker */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_chat_codes_services_src_editor_state_tracker__["a" /* EditorStateTracker */]) === "function" && _a || Object)
], ChatMessageDisplay.prototype, "editorStateTracker", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_chat_messages__["d" /* TextMessage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_chat_codes_services_src_chat_messages__["d" /* TextMessage */]) === "function" && _b || Object)
], ChatMessageDisplay.prototype, "message", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChatMessageDisplay.prototype, "editor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('elem'),
    __metadata("design:type", Object)
], ChatMessageDisplay.prototype, "elem", void 0);
ChatMessageDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chat-message',
        template: __webpack_require__("../../../../../src/app/chat-messages/single-message.component.html"),
        styles: [__webpack_require__("../../../../../src/app/chat-messages/single-message.component.css")],
    })
], ChatMessageDisplay);

var _a, _b;
//# sourceMappingURL=single-message.component.js.map

/***/ }),

/***/ "../../../../../src/app/editor/ace-editor-wrapper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AceEditorWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sharedb_ace_binding__ = __webpack_require__("../../../../../src/app/editor/sharedb-ace-binding.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);


var AceEditorWrapper = (function () {
    function AceEditorWrapper(state, channelCommunicationService) {
        var _this = this;
        this.channelCommunicationService = channelCommunicationService;
        this.showingRemoteCursors = true;
        this.session = new (ace.require('ace/edit_session').EditSession)('');
        this.cursorMarkers = {};
        this.clazz = 'remoteCursor';
        var id = state.id;
        this.channelCommunicationService.getShareDBEditors().then(function (doc) {
            var i = 0;
            for (; i < doc.data.length; i++) {
                if (doc.data[i].id === id) {
                    break;
                }
            }
            var path = [i, 'contents'];
            _this.sdbBinding = new __WEBPACK_IMPORTED_MODULE_0__sharedb_ace_binding__["a" /* SharedbAceBinding */]({
                doc: doc, path: path, session: _this.session
            });
        });
        this.session.forEditorID = id;
        this.session.addDynamicMarker(this);
        var selection = this.session.getSelection();
        selection.on('changeCursor', function (event) {
            var cursor = selection.getCursor();
            channelCommunicationService.onCursorPositionChanged({
                editorID: state.id,
                type: 'change-position',
                newBufferPosition: [cursor.row, cursor.column]
            });
        });
        selection.on('changeSelection', function (event) {
            var serializedRanges = __WEBPACK_IMPORTED_MODULE_1_underscore__["map"](selection.getAllRanges(), function (range) {
                return {
                    start: [range.start.row, range.start.column],
                    end: [range.end.row, range.end.column]
                };
            });
            channelCommunicationService.onCursorSelectionChanged({
                editorID: state.id,
                newRange: serializedRanges[0],
                type: 'change-selection'
            });
        });
    }
    AceEditorWrapper.prototype.suspendEditorBinding = function () {
        this.sdbBinding.unlisten();
    };
    AceEditorWrapper.prototype.resumeEditorBinding = function () {
        this.sdbBinding.setInitialValue();
        this.sdbBinding.listen();
    };
    AceEditorWrapper.prototype.setEditorState = function (editorState) {
        this.editorState = editorState;
    };
    AceEditorWrapper.prototype.setGrammar = function (grammarName) {
        this.session.setMode(this.getAceGrammarName(grammarName));
    };
    AceEditorWrapper.prototype.replaceText = function (serializedRange, value) {
        var range = this.getRangeFromSerializedRange(serializedRange);
        var oldText = this.session.getTextRange(range);
        var newRange = { start: serializedRange.start, end: serializedRange.end };
        var newEnd = this.session.replace(range, value);
        newRange.end = [newEnd.row, newEnd.column];
        return {
            oldText: oldText,
            newRange: newRange
        };
        // const this.session.replace(range, value));
        // console.log(this.session.replace(range, value));
    };
    AceEditorWrapper.prototype.setText = function (value) {
        this.session.setValue(value);
    };
    AceEditorWrapper.prototype.getAnchor = function (range) {
        var doc = this.session.getDocument();
        return {
            start: this.getAnchorFromLocation(doc, range.start),
            end: this.getAnchorFromLocation(doc, range.end)
        };
    };
    AceEditorWrapper.prototype.getCurrentAnchorPosition = function (anchor) {
        return {
            start: [anchor.start.row, anchor.start.column],
            end: [anchor.end.row, anchor.end.column]
        };
    };
    AceEditorWrapper.prototype.getRangeFromSerializedRange = function (serializedRange) {
        var Range = ace.require('ace/range').Range;
        var startRow = serializedRange.start[0];
        var startColumn = serializedRange.start[1];
        var endRow = serializedRange.end[0];
        var endColumn = serializedRange.end[1];
        if (startColumn < 0) {
            startColumn = 0;
        }
        if (endColumn < 0) {
            endRow = endRow + 1;
            endColumn = 0;
        }
        return new Range(startRow, startColumn, endRow, endColumn);
    };
    AceEditorWrapper.prototype.getAnchorFromLocation = function (doc, loc) {
        var Anchor = ace.require('ace/anchor').Anchor;
        return new Anchor(doc, loc[0], loc[1]);
    };
    AceEditorWrapper.prototype.getAceGrammarName = function (grammarName) {
        if (grammarName === 'TypeScript') {
            return 'ace/mode/typescript';
        }
        else if (grammarName === 'Null Grammar') {
            return '';
        }
        else if (grammarName === 'JavaScript') {
            return 'ace/mode/javascript';
        }
        else if (grammarName === 'HTML') {
            return 'ace/mode/html';
        }
        else if (grammarName === 'CSS') {
            return 'ace/mode/css';
        }
        else if (grammarName === 'JSON') {
            return 'ace/mode/json';
        }
        else if (grammarName === 'PHP') {
            return 'ace/mode/php';
        }
        else if (grammarName === 'Python') {
            return 'ace/mode/python';
        }
        else if (grammarName === 'Markdown') {
            return 'ace/mode/markdown';
        }
        else {
            return '';
        }
    };
    AceEditorWrapper.prototype.getSession = function () { return this.session; };
    AceEditorWrapper.prototype.addRemoteCursor = function (cursor, remoteCursorMarker) { };
    AceEditorWrapper.prototype.addRemoteCursorSelection = function (cursor, remoteCursorMarker) { };
    AceEditorWrapper.prototype.addRemoteCursorPosition = function (cursor, remoteCursorMarker) {
        this.session._signal("changeBackMarker");
    };
    AceEditorWrapper.prototype.updateRemoteCursorPosition = function (cursor, remoteCursorMarker) {
        this.session._signal("changeBackMarker");
    };
    AceEditorWrapper.prototype.removeRemoteCursor = function (cursor, remoteCursorMarker) {
        var id = cursor.id, range = cursor.range, user = cursor.user;
        var oldMarkerID = this.cursorMarkers[id];
        if (oldMarkerID) {
            this.session.removeMarker(oldMarkerID);
            delete this.cursorMarkers[id];
        }
    };
    AceEditorWrapper.prototype.updateRemoteCursorSelection = function (cursor, remoteCursorMarker) {
        if (this.showingRemoteCursors) {
            var id = cursor.id, range = cursor.range, user = cursor.user;
            var oldMarkerID = this.cursorMarkers[id];
            if (oldMarkerID) {
                this.session.removeMarker(oldMarkerID);
                delete this.cursorMarkers[id];
            }
            var aceRange = this.getRangeFromSerializedRange(range);
            var markerID = this.session.addMarker(aceRange, this.clazz + (user ? ' user-' + user.colorIndex : ''), false);
            this.cursorMarkers[id] = markerID;
        }
    };
    AceEditorWrapper.prototype.saveFile = function () { };
    ;
    AceEditorWrapper.prototype.setReadOnly = function (isReadOnly, extraInfo) {
        var editor = extraInfo.editor;
        editor.setReadOnly(isReadOnly);
    };
    AceEditorWrapper.prototype.addHighlight = function (range) {
        var aceRange = this.getRangeFromSerializedRange(range);
        var markerID = this.session.addMarker(aceRange, this.clazz + ' user-1', false);
        return markerID;
    };
    AceEditorWrapper.prototype.removeHighlight = function (id) {
        this.session.removeMarker(id);
    };
    AceEditorWrapper.prototype.focus = function (range, extraInfo) {
        var _this = this;
        // scrollToRow(range.start[0]);
        var editor = extraInfo.editor;
        var aceRange = this.getRangeFromSerializedRange(range);
        var markerID = this.session.addMarker(aceRange, this.clazz + ' user-1', false);
        var averageRow = Math.round((aceRange.start.row + aceRange.end.row) / 2);
        editor.scrollToLine(averageRow, true, true, function () { });
        setTimeout(function () {
            _this.session.removeMarker(markerID);
        }, 2000);
    };
    AceEditorWrapper.prototype.hideRemoteCursors = function () {
        var _this = this;
        this.showingRemoteCursors = false;
        this.session._signal("changeBackMarker");
        __WEBPACK_IMPORTED_MODULE_1_underscore__["each"](this.cursorMarkers, function (markerID, id) {
            _this.session.removeMarker(markerID);
            delete _this.cursorMarkers[id];
        });
    };
    AceEditorWrapper.prototype.showRemoteCursors = function (cursorTracker) {
        var _this = this;
        this.showingRemoteCursors = true;
        this.session._signal("changeBackMarker");
        if (cursorTracker) {
            var serializedCursors = cursorTracker.getCursors();
            __WEBPACK_IMPORTED_MODULE_1_underscore__["each"](serializedCursors, function (serializedCursor) {
                var range = serializedCursor.range;
                _this.addRemoteCursorSelection(serializedCursor, cursorTracker);
                _this.updateRemoteCursorSelection(serializedCursor, cursorTracker);
            });
        }
    };
    AceEditorWrapper.prototype.update = function (html, markerLayer, session, config) {
        var _this = this;
        if (this.showingRemoteCursors) {
            var start = config.firstRow, end = config.lastRow;
            var remoteCursors = this.editorState.getRemoteCursors();
            var cursors = remoteCursors.getCursors();
            cursors.forEach(function (cursorInfo) {
                var pos = cursorInfo.pos;
                if (!pos || pos.row < start || pos.row > end) {
                    return;
                }
                else {
                    // compute cursor position on screen
                    // this code is based on ace/layer/marker.js
                    var screenPos = session.documentToScreenPosition.apply(session, pos);
                    var height = config.lineHeight;
                    var width = config.characterWidth;
                    var top = markerLayer.$getTop(screenPos.row, config);
                    var left = markerLayer.$padding + screenPos.column * width;
                    // can add any html here
                    var user = cursorInfo.user;
                    html.push("<div class='carret " + _this.clazz + (user ? ' user-' + user.getColorIndex() : '') + "' style='", "height:", height, "px;", "top:", top, "px;", "left:", left, "px;", width, "px'></div>");
                }
            });
        }
    };
    return AceEditorWrapper;
}());

//# sourceMappingURL=ace-editor-wrapper.js.map

/***/ }),

/***/ "../../../../../src/app/editor/editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ace-editor {\n    height: 100%;\n    border-right: 1px solid #EEE;\n    border-bottom: 1px solid #EEE;\n}\n\nace-editor.locked {\n    background: url(" + __webpack_require__("../../../../../src/assets/images/lock_icon.svg") + ") center center;\n    background-size: 20%;\n    background-repeat: no-repeat;\n}\n\n.message {\n    position: absolute;\n    right: 15px;\n    top: -40px;\n    font-size: 0.8em;\n    z-index: 99;\n    background-color: #EEE;\n    padding: 5px;\n    border: 1px solid #CCC;\n    opacity: 0.8;\n    color: #999;\n}\n\n.no-editor-open {\n    text-align: center;\n    vertical-align: middle;\n    font-size: 2em;\n    color: #AAA;\n    font-weight: lighter;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/editor/editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf='!editorStateTracker.isAtLatest()' class=\"message\">Showing code from <timestamp [t]='editorStateTracker.getCurrentTimestamp()'></timestamp><button class='btn btn-sm btn-primary' (click)='toLatest()'>Show current code</button></div>\n<ace-editor [hidden]='selectedEditor==false' [ngClass]='{locked: !this.editorStateTracker.isAtLatest() }' [theme]=\"'chrome'\" #editor></ace-editor>\n<div class='no-editor-open' *ngIf='selectedEditor===false'>\n    (no file is open)\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/editor/editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_communication_service__ = __webpack_require__("../../../../chat-codes-services/src/communication-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditorDisplay = (function () {
    function EditorDisplay() {
        this.atomIDToEditSessionMap = {};
        this.files = [];
        this.selectedEditor = false;
        //@Input() chatInput: ChatInput;
        this.editorChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cursorPositionChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cursorSelectionChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    EditorDisplay.prototype.updatePositionsFromAnchor = function (delta) {
        var oldRangeStart = delta.oldRangeStartAnchor.getPosition();
        var oldRangeEnd = delta.oldRangeEndAnchor.getPosition();
        var newRangeStart = delta.newRangeStartAnchor.getPosition();
        var newRangeEnd = delta.newRangeEndAnchor.getPosition();
        delta.oldRange.start = [oldRangeStart.row, oldRangeStart.column];
        delta.oldRange.end = [oldRangeEnd.row, oldRangeEnd.column];
        delta.newRange.start = [newRangeStart.row, newRangeStart.column];
        delta.newRange.end = [newRangeEnd.row, newRangeEnd.column];
        return delta;
    };
    EditorDisplay.prototype.getChange = function (changeEvent) {
        var action = changeEvent.action, lines = changeEvent.lines, start = changeEvent.start, end = changeEvent.end;
        var oldRange, newRange, oldText, newText;
        if (action === 'insert') {
            oldRange = {
                start: [start.row, start.column],
                end: [start.row, start.column]
            };
            newRange = {
                start: [start.row, start.column],
                end: [end.row, end.column]
            };
            oldText = '';
            newText = lines.join('\n');
        }
        else {
            newRange = {
                start: [start.row, start.column],
                end: [start.row, start.column]
            };
            oldRange = {
                start: [start.row, start.column],
                end: [end.row, end.column]
            };
            newText = '';
            oldText = lines.join('\n');
        }
        return {
            oldRange: oldRange,
            newRange: newRange,
            oldText: oldText,
            newText: newText,
        };
    };
    EditorDisplay.prototype.ngOnInit = function () {
        var _this = this;
        this.editorStateTracker = this.commLayer.getEditorStateTracker();
        var editor = this.editor.getEditor();
        editor.$blockScrolling = Infinity;
        editor.commands.addCommand({
            name: 'saveContents',
            bindKey: {
                win: 'Ctrl-s',
                mac: 'Command-s'
            },
            exec: function (editor) {
                var session = editor.getSession();
                var editorID = session.forEditorID;
                // this.pusher.emitSave({
                // 	id: session.forEditorID,
                // 	type: 'save',
                // });
            }
        });
        editor.on('change', function (event) {
            var curOpp = editor.curOp;
            if (curOpp && curOpp.command && curOpp.command.name) {
                var session = editor.getSession();
                var change = _this.getChange(event);
                _this.commLayer.emitEditorChanged({
                    id: session.forEditorID,
                    type: 'edit',
                    changes: [change]
                });
            }
        });
        var activeEditors = this.editorStateTracker.getActiveEditors();
        if (activeEditors.length > 0) {
            this.selectFile(activeEditors[0]);
        }
    };
    EditorDisplay.prototype.getTimestamp = function () {
        return (new Date()).getTime();
    };
    EditorDisplay.prototype.getEditorInstance = function () {
        return this.editor.getEditor();
    };
    EditorDisplay.prototype.selectFile = function (editorState) {
        var _this = this;
        if (this.selectedEditor) {
            this.selectedEditor.selected = false;
        }
        var aceWrapper = editorState.getEditorWrapper();
        var session = aceWrapper.getSession();
        editorState.selected = true;
        var editor = this.getEditorInstance();
        editor.setSession(session);
        this.selectedEditor = editorState;
        var selection = session.getSelection();
        selection.on('changeSelection', function (event) {
            var serializedRanges = __WEBPACK_IMPORTED_MODULE_2_underscore__["map"](selection.getAllRanges(), function (range) {
                return {
                    start: [range.start.row, range.start.column],
                    end: [range.end.row, range.end.column]
                };
            });
            _this.cursorSelectionChanged.emit({
                editor: editor,
                session: session,
                fileName: editorState.title,
                newRange: serializedRanges[0],
                type: 'change-selection'
            });
        });
    };
    EditorDisplay.prototype.getRangeFromSerializedRange = function (serializedRange) {
        var Range = ace.require('ace/range').Range;
        return new Range(serializedRange.start[0], serializedRange.start[1], serializedRange.end[0], serializedRange.end[1]);
    };
    EditorDisplay.prototype.toLatest = function () {
        this.editorStateTracker.toLatestVersion({ editor: this.editor.getEditor() });
    };
    return EditorDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('editor'),
    __metadata("design:type", Object)
], EditorDisplay.prototype, "editor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_communication_service__["a" /* ChannelCommunicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_communication_service__["a" /* ChannelCommunicationService */]) === "function" && _a || Object)
], EditorDisplay.prototype, "commLayer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], EditorDisplay.prototype, "editorChanged", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _c || Object)
], EditorDisplay.prototype, "cursorPositionChanged", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _d || Object)
], EditorDisplay.prototype, "cursorSelectionChanged", void 0);
EditorDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'code-editor',
        template: __webpack_require__("../../../../../src/app/editor/editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/editor/editor.component.css")],
    }),
    __metadata("design:paramtypes", [])
], EditorDisplay);

var _a, _b, _c, _d;
//# sourceMappingURL=editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/editor/sharedb-ace-binding.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedbAceBinding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_logdown__ = __webpack_require__("../../../../logdown/dist/logdown.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_logdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_logdown__);
/**
 * @fileOverview
 * @name sharedb-ace-binding.js
 * @author Jethro Kuan <jethrokuan95@gmail.com>
 * @license MIT
 */
/* global process.env */

var SharedbAceBinding = (function () {
    /**
     * Constructs the binding object.
     *
     * Initializes the Ace document initial value to that of the
     * ShareDB document. Also , sets up the local and remote event
     * listeners, and begins listening to local and remote change events
     *
     * @param {Object} options - contains all parameters
     * @param {Object} options.ace - ace editor instance
     * @param {Object} options.doc - ShareDB document
     * @param {Object} options.pluginWS - WebSocket connection for
     * sharedb-ace plugins
     * @param {string[]} options.path - A lens, describing the nesting
     * to the JSON document. It should point to a string.
     * @param {Object[]} options.plugins - array of sharedb-ace plugins
     * @example
     * const binding = new SharedbAceBinding({
     *   ace: aceInstance,
     *   doc: sharedbDoc,
     *   path: ["path"],
     *   plugins: [ SharedbAceMultipleCursors ],
     *   pluginWS: "http://localhost:3108/ws",
     * })
     */
    function SharedbAceBinding(options) {
        var _this = this;
        // When ops are applied to sharedb, ace emits edit events.
        // This events need to be suppressed to prevent infinite looping
        this.suppress = false;
        this.listening = false;
        // this.editor = options.ace;
        // this.editor.id = `${options.id}-${options.path}`;
        // this.editor.$blockScrolling = Infinity;
        // this.session = this.editor.getSession();
        this.session = options.session;
        this.newline = this.session.getDocument().getNewLineCharacter();
        this.path = options.path;
        this.doc = options.doc;
        this.pluginWS = options.pluginWS;
        this.plugins = options.plugins || [];
        this.logger = new __WEBPACK_IMPORTED_MODULE_0_logdown___default.a('shareace');
        // Initialize plugins
        this.plugins.forEach(function (plugin) {
            plugin(_this.pluginWS, _this.editor);
        });
        // Set value of ace document to ShareDB document value
        this.setInitialValue();
        // Event Listeners
        this.$onLocalChange = this.onLocalChange.bind(this);
        this.$onRemoteChange = this.onRemoteChange.bind(this);
        this.listen();
    }
    /**
     * Sets the ace document value to the ShareDB document value
     */
    SharedbAceBinding.prototype.setInitialValue = function () {
        this.suppress = true;
        var data = this.doc.data;
        for (var i = 0; i < this.path.length; i++) {
            data = data[this.path[i]];
        }
        this.session.setValue(data);
        this.suppress = false;
    };
    /**
     * Listens to the changes
     */
    SharedbAceBinding.prototype.listen = function () {
        if (!this.listening) {
            this.listening = true;
            this.session.on('change', this.$onLocalChange);
            this.doc.on('op', this.$onRemoteChange);
        }
    };
    /**
     * Stop listening to changes
     */
    SharedbAceBinding.prototype.unlisten = function () {
        if (this.listening) {
            this.listening = false;
            this.session.removeListener('change', this.$onLocalChange);
            this.doc.removeListener('op', this.$onRemoteChange);
        }
    };
    /**
     * Delta (Ace Editor) -> Op (ShareDB)
     *
     * @param {Object} delta - delta created by ace editor
     * @returns {Object}  op - op compliant with ShareDB
     * @throws {Error} throws error if delta is malformed
     */
    SharedbAceBinding.prototype.deltaTransform = function (delta) {
        var aceDoc = this.session.getDocument();
        var op = {};
        var start = aceDoc.positionToIndex(delta.start);
        var end = aceDoc.positionToIndex(delta.end);
        op['p'] = this.path.concat(start);
        this.logger.log("start: " + start + " end: " + end);
        var action;
        if (delta.action === 'insert') {
            action = 'si';
        }
        else if (delta.action === 'remove') {
            action = 'sd';
        }
        else {
            throw new Error("action " + action + " not supported");
        }
        var str = delta.lines.join('\n');
        op[action] = str;
        return op;
    };
    /**
     *
     * @param {Object[]} ops - array of ShareDB ops
     * @returns {Object[]} deltas - array of Ace Editor compliant deltas
     * @throws {Error} throws error on malformed op
     */
    SharedbAceBinding.prototype.opTransform = function (ops) {
        var self = this;
        function opToDelta(op) {
            var index = op.p[op.p.length - 1];
            var pos = self.session.doc.indexToPosition(index, 0);
            var start = pos;
            var action;
            var lines;
            var end;
            if ('sd' in op) {
                action = 'remove';
                lines = op.sd.split('\n');
                var count = lines.reduce(function (total, line) { return total + line.length; }, lines.length - 1);
                end = self.session.doc.indexToPosition(index + count, 0);
            }
            else if ('si' in op) {
                action = 'insert';
                lines = op.si.split('\n');
                if (lines.length === 1) {
                    end = {
                        row: start.row,
                        column: start.column + op.si.length,
                    };
                }
                else {
                    end = {
                        row: start.row + (lines.length - 1),
                        column: lines[lines.length - 1].length,
                    };
                }
            }
            else {
                throw new Error("Invalid Operation: " + JSON.stringify(op));
            }
            var delta = {
                start: start,
                end: end,
                action: action,
                lines: lines,
            };
            return delta;
        }
        var deltas = ops.map(opToDelta);
        return deltas;
    };
    /**
     * Event listener for local changes (ace editor)
     *
     * transforms delta into ShareDB op and sends it to the server.
     *
     * @param {} delta - ace editor op (compliant with
     * ace editor event listener spec)
     */
    SharedbAceBinding.prototype.onLocalChange = function (delta) {
        var _this = this;
        this.logger.log("*local*: fired " + Date.now());
        this.logger.log("*local*: delta received: " + JSON.stringify(delta));
        if (this.suppress) {
            this.logger.log('*local*: local delta, _skipping_');
            return;
        }
        var op = this.deltaTransform(delta);
        this.logger.log("*local*: transformed op: " + JSON.stringify(op));
        var docSubmitted = function (err) {
            if (err)
                throw err;
            _this.logger.log('*local*: op submitted');
        };
        this.doc.submitOp(op, { source: this }, docSubmitted);
    };
    /**
     * Event Listener for remote events (ShareDB)
     *
     * @param {Object[]} ops - array of ShareDB ops
     * @param {Object} source - which sharedb-ace-binding instance
     * created the op. If self, don't apply the op.
     */
    SharedbAceBinding.prototype.onRemoteChange = function (ops, source) {
        this.logger.log("*remote*: fired " + Date.now());
        var self = this;
        var opsPath = ops[0].p.slice(0, ops[0].p.length - 1).toString();
        this.logger.log(opsPath);
        if (source === self) {
            this.logger.log('*remote*: op origin is self; _skipping_');
            return;
        }
        else if (opsPath !== this.path.toString()) {
            this.logger.log('*remote*: not from my path; _skipping_');
            return;
        }
        var deltas = this.opTransform(ops);
        this.logger.log("*remote*: op received: " + JSON.stringify(ops));
        this.logger.log("*remote*: transformed delta: " + JSON.stringify(deltas));
        self.suppress = true;
        self.session.getDocument().applyDeltas(deltas);
        self.suppress = false;
        this.logger.log('*remote*: session value');
        this.logger.log(JSON.stringify(this.session.getValue()));
        this.logger.log('*remote*: delta applied');
    };
    return SharedbAceBinding;
}());

//# sourceMappingURL=sharedb-ace-binding.js.map

/***/ }),

/***/ "../../../../../src/app/name-entry/name-entry.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".name-entry {\n    /*height: 100%;\n    padding-top: 20%;\n    margin: auto;\n    padding-left: 20%;*/\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/name-entry/name-entry.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"name-label row\">\n        <div class=\"col-12\">\n            <label for=\"uname\">Username:</label>\n        </div>\n    </div>\n    <div class=\"name-entry row\">\n        <div class=\"col-12\">\n            <div class=\"input-group input-group-lg\">\n                <input #inp id='uname' class='form-control' [class]=\"feedbackClass\" placeholder=\"Your name\" type='text' (ngModelChange)=\"valueChange($event)\" [(ngModel)]=\"value\" (keydown)=\"onKeydown($event)\"/>\n                <span class=\"input-group-btn\">\n                    <button class=\"btn btn-primary\" type=\"button\" (click)='doSubmit()'>Go</button>\n                </span>\n            </div>\n        </div>\n    </div>\n    <div class=\"feedback row\">\n        <div class=\"col-12\">\n            {{feedback}}\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/name-entry/name-entry.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NameEntry; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NameEntry = (function () {
    function NameEntry() {
        this.onEnter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.value = localStorage.getItem('default-username') || '';
        this.feedback = '';
        this.feedbackClass = '';
        this.MAX_LENGTH = 20;
    }
    NameEntry.prototype.ngOnInit = function () {
        var inpElem = this.inp.nativeElement;
        setTimeout(function () {
            inpElem.focus();
            inpElem.select();
        }, 100);
    };
    NameEntry.prototype.valueChange = function (name) {
        var value = name.trim();
        if (value.length === 0) {
            this.feedback = 'Must be more than 0 characters';
            this.feedbackClass = 'error';
        }
        else if (value.length > this.MAX_LENGTH) {
            this.feedback = 'Must be ' + this.MAX_LENGTH + ' characters or fewer';
            this.feedbackClass = 'error';
        }
        else {
            this.feedback = '';
            this.feedbackClass = '';
        }
    };
    NameEntry.prototype.onKeydown = function (event) {
        if (event.keyCode === 13) {
            this.doSubmit();
        }
    };
    NameEntry.prototype.doSubmit = function () {
        var value = this.value.trim();
        if (value.length > 0 && value.length < this.MAX_LENGTH) {
            localStorage.setItem('default-username', value);
            this.onEnter.emit(value);
        }
    };
    return NameEntry;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], NameEntry.prototype, "onEnter", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('inp'),
    __metadata("design:type", Object)
], NameEntry.prototype, "inp", void 0);
NameEntry = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'name-entry',
        template: __webpack_require__("../../../../../src/app/name-entry/name-entry.component.html"),
        styles: [__webpack_require__("../../../../../src/app/name-entry/name-entry.component.css")],
    })
], NameEntry);

var _a;
//# sourceMappingURL=name-entry.component.js.map

/***/ }),

/***/ "../../../../../src/app/python_out/python_out.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".terminalContainer {\n    height: 100%;\n    background-color: #333;\n}\n\n.run {\n    position: absolute;\n    right: 30px;\n    z-index: 5;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/python_out/python_out.component.html":
/***/ (function(module, exports) {

module.exports = "<button class='run btn-sm btn btn-success' (click)='run()'>Run</button>\n<div #terminal class='terminalContainer'></div>\n"

/***/ }),

/***/ "../../../../../src/app/python_out/python_out.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PythonOutputDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xterm__ = __webpack_require__("../../../../xterm/lib/xterm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xterm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_xterm__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_skulpt__ = __webpack_require__("../../../../skulpt/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_skulpt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_skulpt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__editor_editor_component__ = __webpack_require__("../../../../../src/app/editor/editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chat_codes_services_src_communication_service__ = __webpack_require__("../../../../chat-codes-services/src/communication-service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PythonOutputDisplay = (function () {
    function PythonOutputDisplay() {
    }
    PythonOutputDisplay.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_1_xterm__["loadAddon"]('fit'); // Load the `fit` addon
        this.term = new __WEBPACK_IMPORTED_MODULE_1_xterm__();
        this.term.open(this.terminalElement.nativeElement, false);
        this.term.fit(); // Make the terminal's size and geometry fit the size of #terminal-container
        // this.term.write('$ ');
    };
    PythonOutputDisplay.prototype.run = function () {
        var _this = this;
        var editorStateTracker = this.commLayer.getEditorStateTracker();
        function builtinRead(x) {
            if (__WEBPACK_IMPORTED_MODULE_2_skulpt__["builtinFiles"] === undefined || __WEBPACK_IMPORTED_MODULE_2_skulpt__["builtinFiles"]["files"][x] === undefined) {
                throw "File not found: '" + x + "'";
            }
            return __WEBPACK_IMPORTED_MODULE_2_skulpt__["builtinFiles"]["files"][x];
        }
        __WEBPACK_IMPORTED_MODULE_2_skulpt__["python3"] = true;
        __WEBPACK_IMPORTED_MODULE_2_skulpt__["configure"]({ output: function (text) {
                _this.term.write(text);
            }, read: builtinRead });
        var editorInstance = this.editor.getEditorInstance();
        var editorValue = editorInstance.getValue();
        this.term.clear();
        this.term.reset();
        var myPromise = __WEBPACK_IMPORTED_MODULE_2_skulpt__["misceval"].asyncToPromise(function () {
            return __WEBPACK_IMPORTED_MODULE_2_skulpt__["importMainWithBody"]("<stdin>", false, editorValue, true);
        });
        myPromise.then(function (mod) {
        }, function (err) {
            _this.term.writeln(err.toString());
        });
    };
    return PythonOutputDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_chat_codes_services_src_communication_service__["a" /* ChannelCommunicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_chat_codes_services_src_communication_service__["a" /* ChannelCommunicationService */]) === "function" && _a || Object)
], PythonOutputDisplay.prototype, "commLayer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__editor_editor_component__["a" /* EditorDisplay */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__editor_editor_component__["a" /* EditorDisplay */]) === "function" && _b || Object)
], PythonOutputDisplay.prototype, "editor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('terminal'),
    __metadata("design:type", Object)
], PythonOutputDisplay.prototype, "terminalElement", void 0);
PythonOutputDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'python-output',
        template: __webpack_require__("../../../../../src/app/python_out/python_out.component.html"),
        styles: [__webpack_require__("../../../../../src/app/python_out/python_out.component.css")],
    }),
    __metadata("design:paramtypes", [])
], PythonOutputDisplay);

var _a, _b;
//# sourceMappingURL=python_out.component.js.map

/***/ }),

/***/ "../../../../../src/app/terminal/terminal.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".terminalContainer {\n    height: 100%;\n    background-color: black;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/terminal/terminal.component.html":
/***/ (function(module, exports) {

module.exports = "<div #terminal class='terminalContainer'></div>"

/***/ }),

/***/ "../../../../../src/app/terminal/terminal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminalDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xterm__ = __webpack_require__("../../../../xterm/lib/xterm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xterm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_xterm__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_communication_service__ = __webpack_require__("../../../../chat-codes-services/src/communication-service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TerminalDisplay = (function () {
    function TerminalDisplay() {
    }
    TerminalDisplay.prototype.ngOnInit = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_xterm__["loadAddon"]('fit'); // Load the `fit` addon
        var term = new __WEBPACK_IMPORTED_MODULE_1_xterm__();
        term.open(this.terminalElement.nativeElement, false);
        term.fit(); // Make the terminal's size and geometry fit the size of #terminal-container
        term.write('$ ');
        term.on('data', function (key) {
            _this.commLayer.writeToTerminal(key);
        });
        this.commLayer.on('terminal-data', function (event) {
            term.write(event.data);
        });
    };
    return TerminalDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_communication_service__["a" /* ChannelCommunicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_chat_codes_services_src_communication_service__["a" /* ChannelCommunicationService */]) === "function" && _a || Object)
], TerminalDisplay.prototype, "commLayer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('terminal'),
    __metadata("design:type", Object)
], TerminalDisplay.prototype, "terminalElement", void 0);
TerminalDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'terminal',
        template: __webpack_require__("../../../../../src/app/terminal/terminal.component.html"),
        styles: [__webpack_require__("../../../../../src/app/terminal/terminal.component.css")],
    }),
    __metadata("design:paramtypes", [])
], TerminalDisplay);

var _a;
//# sourceMappingURL=terminal.component.js.map

/***/ }),

/***/ "../../../../../src/app/timestamp/timestamp.component.html":
/***/ (function(module, exports) {

module.exports = "<span class=\"time\">{{parens ? '(':''}}{{t | amTimeAgo}}{{parens ? ')':''}}</span>\n"

/***/ }),

/***/ "../../../../../src/app/timestamp/timestamp.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimestampDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TimestampDisplay = (function () {
    function TimestampDisplay() {
        this.parens = false;
    }
    return TimestampDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TimestampDisplay.prototype, "t", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TimestampDisplay.prototype, "parens", void 0);
TimestampDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'timestamp',
        template: __webpack_require__("../../../../../src/app/timestamp/timestamp.component.html"),
        styleUrls: [],
    }),
    __metadata("design:paramtypes", [])
], TimestampDisplay);

//# sourceMappingURL=timestamp.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/user-display.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".user {\n    font-size: 1em;\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    background-color: #EEE;\n}\n\n.user.typing {\n    -webkit-animation: jiggle 0.2s infinite;\n    -moz-animation-duration: 0.2s;\n    -moz-animation-name: jiggle;\n    -moz-animation-iteration-count: infinite;\n    -webkit-transform: rotate(-3deg);\n    -moz-transform: rotate(-3deg);\n}\n\n.user.typing::after {\n    content: '...';\n}\n.user.typed::after {\n    content: '...'\n}\n\n@-webkit-keyframes jiggle {\n    0% {\n        -webkit-transform: rotate(-1deg);\n    }\n    50% {\n        -webkit-transform: rotate(1deg);\n    }\n}\n\n.user.isme.user-1 { border: 1px solid #007bff; }\n.user.isme.user-2 { border: 1px solid #dc3545; }\n.user.isme.user-3 { border: 1px solid #fd7e14; }\n.user.isme.user-4 { border: 1px solid #ffc107; }\n.user.isme.user-5 { border: 1px solid #28a745; }\n\n.user-1 { color: #007bff; } /* blue */\n.user-2 { color: #dc3545; } /* red */\n.user-3 { color: #fd7e14; } /* orange */\n.user-4 { color: #ffc107; } /* yellow */\n.user-5 { color: #28a745; } /* green */\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/user/user-display.component.html":
/***/ (function(module, exports) {

module.exports = "<span class='user badge badge-default' [class.typing]=\"typingStatus=='ACTIVE_TYPING'\" [class.typed]=\"typingStatus=='IDLE_TYPED'\" [class.isme]=\"user.getIsMe()\" [ngClass]=\"'user-'+user.getColorIndex()\">\n    {{user.getName()}}\n</span>"

/***/ }),

/***/ "../../../../../src/app/user/user-display.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDisplay; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_user__ = __webpack_require__("../../../../chat-codes-services/src/chat-user.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserDisplay = (function () {
    function UserDisplay() {
        this.typingStatus = 'IDLE';
    }
    UserDisplay.prototype.ngOnInit = function () {
        var _this = this;
        this.typingStatus = this.user.getTypingStatus();
        this.user.on('typingStatus', function (status) {
            setTimeout(function () {
                _this.typingStatus = _this.user.getTypingStatus();
            }, 0);
        });
    };
    return UserDisplay;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_user__["a" /* ChatUser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_chat_codes_services_src_chat_user__["a" /* ChatUser */]) === "function" && _a || Object)
], UserDisplay.prototype, "user", void 0);
UserDisplay = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'user-display',
        template: __webpack_require__("../../../../../src/app/user/user-display.component.html"),
        styles: [__webpack_require__("../../../../../src/app/user/user-display.component.css")],
    })
], UserDisplay);

var _a;
//# sourceMappingURL=user-display.component.js.map

/***/ }),

/***/ "../../../../../src/assets/images/lock_icon.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "lock_icon.39bdb0d99bcb31086006.svg";

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ "../../../../xterm/lib/addons recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./attach/attach": "../../../../xterm/lib/addons/attach/attach.js",
	"./attach/attach.js": "../../../../xterm/lib/addons/attach/attach.js",
	"./attach/package.json": "../../../../xterm/lib/addons/attach/package.json",
	"./fit/fit": "../../../../xterm/lib/addons/fit/fit.js",
	"./fit/fit.js": "../../../../xterm/lib/addons/fit/fit.js",
	"./fit/package.json": "../../../../xterm/lib/addons/fit/package.json",
	"./fullscreen/fullscreen": "../../../../xterm/lib/addons/fullscreen/fullscreen.js",
	"./fullscreen/fullscreen.css": "../../../../xterm/lib/addons/fullscreen/fullscreen.css",
	"./fullscreen/fullscreen.js": "../../../../xterm/lib/addons/fullscreen/fullscreen.js",
	"./fullscreen/package.json": "../../../../xterm/lib/addons/fullscreen/package.json",
	"./search/SearchHelper": "../../../../xterm/lib/addons/search/SearchHelper.js",
	"./search/SearchHelper.js": "../../../../xterm/lib/addons/search/SearchHelper.js",
	"./search/SearchHelper.js.map": "../../../../xterm/lib/addons/search/SearchHelper.js.map",
	"./search/search": "../../../../xterm/lib/addons/search/search.js",
	"./search/search.js": "../../../../xterm/lib/addons/search/search.js",
	"./search/search.js.map": "../../../../xterm/lib/addons/search/search.js.map",
	"./terminado/package.json": "../../../../xterm/lib/addons/terminado/package.json",
	"./terminado/terminado": "../../../../xterm/lib/addons/terminado/terminado.js",
	"./terminado/terminado.js": "../../../../xterm/lib/addons/terminado/terminado.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../xterm/lib/addons recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map