"use strict";
cc._RF.push(module, '7262eKE3RVB8I7522Xd8mQg', 'gameController');
// scripts/gameController.js

"use strict";

var EventListener = require("./event-listener");
var global = require("./global");
cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        global.eventlistener = EventListener({});
    },

    onClickTrain: function onClickTrain() {
        global.playerData.curMode = global.playerData.TRAINMODE;
        this.loadScene("room");
    },
    onClickTest: function onClickTest() {
        global.playerData.curMode = global.playerData.TESTMODE;
        this.loadScene("room");
    },
    onClickGame: function onClickGame() {
        this.loadScene("game");
    },
    onClickReturn: function onClickReturn() {
        this.loadScene("main");
    },
    loadScene: function loadScene(url) {
        this._isLoadingScene = true;
        this.currentSceneUrl = url;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },

    onLoadSceneFinish: function onLoadSceneFinish() {
        this._isLoadingScene = false;
        //这里处理场景加载完后的代码逻辑
    }
});

cc._RF.pop();