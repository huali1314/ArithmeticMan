var EventListener = require("./event-listener");
var global = require("./global");
cc.Class({
    extends: cc.Component,
    onLoad(){
        cc.game.addPersistRootNode(this.node);
        global.eventlistener = EventListener({});
    },
    onClickTrain:function(){
        global.playerData.curMode = global.playerData.TRAINMODE
        this.loadScene("room")
    },
    onClickTest:function(){
        global.playerData.curMode = global.playerData.TESTMODE
        this.loadScene("room")
    },
    onClickGame:function(){
        this.loadScene("game")
    },
    onClickReturn:function(){
        this.loadScene("main")
    },
    loadScene: function (url) {
        this._isLoadingScene = true;
        this.currentSceneUrl = url;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },

    onLoadSceneFinish: function () {
        this._isLoadingScene = false;
        //这里处理场景加载完后的代码逻辑
    },
});
