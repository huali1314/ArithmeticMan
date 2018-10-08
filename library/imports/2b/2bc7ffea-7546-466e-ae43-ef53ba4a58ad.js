"use strict";
cc._RF.push(module, '2bc7f/qdUZGbq5D71O6Slit', 'rainBowGameLogic');
// scripts/rainBowGameLogic.js

"use strict";

var global = require("./global");
var EventListener = require("./event-listener");
var POINTS = [-2, -1, 1, 2];
cc.Class({
    extends: cc.Component,

    properties: {
        rainPrefab: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true // optional, default is true
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.winSize = cc.director.getWinSize();
        this.actionManager = cc.director.getActionManager();
        this.curFillingRainBow = 1;
        this.actionGroup = null;
        this.touchedColor = "";
        this.fillProgress = 0;
        this.lastTime = 0;
        this.isPause = false;
    },
    start: function start() {
        var self = this;
        this.world = cc.find("Canvas");
        this.scheduler = cc.director.getScheduler();
        global.eventlistener.on("judgeTouchedColor", function (id) {
            self.judgeTouchedColor(id);
        });
        this.scheduleRainBow();
    },

    generatorRain: function generatorRain() {
        if (this.isPause == false) {
            var idx = Math.floor(cc.random0To1() * 3.5);
            var randXOffset = POINTS[idx] * this.winSize.width / 6;
            var yOffset = this.winSize.height / 2 + 200;
            var rain = cc.instantiate(this.rainPrefab);
            rain.setPosition(randXOffset, yOffset);
            this.world.addChild(rain);
        }
    },
    judgeTouchedColor: function judgeTouchedColor(id) {
        if (this.curFillingRainBow == id) {
            global.eventlistener.fire("fillProgress");
        } else {
            this.isPause = true;
            this.actionGroup = this.actionManager.pauseAllRunningActions();
        }
    },
    isFillCompleted: function isFillCompleted(id) {
        var rainBow = this.world.getChildByName("rainbow" + id);
        var progressBar = rainBow.getComponent(cc.ProgressBar);
        if (progressBar.progress >= 1) {
            return true;
        }
        return false;
    },
    resumeAllAction: function resumeAllAction() {
        if (this.actionGroup) {
            cc.ActionManager.resumeTargets(this.actionGroup);
        }
    },
    scheduleRainBow: function scheduleRainBow() {
        var self = this;
        this.scheduler.schedule(function () {
            var rand = Math.floor(cc.random0To1() * 6.9) + 1;
            if (self.isFillCompleted(rand)) {
                self.scheduleRainBow();
                return;
            }
            self.curFillingRainBow = rand;
            global.eventlistener.fire("runFadeAction", rand);
            self.scheduleRainBow();
        }, this, 15, 0, 0, false);
    },
    update: function update(dt) {
        var date = new Date();
        var sec = date.getTime();
        if (sec - this.lastTime > 1000) {
            this.lastTime = sec;
            this.generatorRain();
        }
    }
});

cc._RF.pop();