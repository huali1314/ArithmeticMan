(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/rainBow.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a560dQLTO1EW5qy3yHfIjtH', 'rainBow', __filename);
// scripts/rainBow.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var global = require("./global");
cc.Class({
    extends: cc.Component,

    properties: {
        id: 1
    },
    // onLoad () {},

    start: function start() {
        this.scheduler = cc.director.getScheduler();
        this.curFillingRainBow = 1;
        var self = this;
        this.world = cc.find("Canvas");
        var rainbow = this.world.getChildByName("rainbow" + this.id);
        this.animation = rainbow.getComponent(cc.Animation);
        global.eventlistener.on("runFadeAction", function (id) {
            self.curFillingRainBow = id;
            self.runFadeAction();
        });
        global.eventlistener.on("fillProgress", function () {
            self.fillRainBow();
        });
        this.initProgress();
    },

    initProgress: function initProgress() {
        var randProgress = (cc.random0To1() * 30).toFixed(2);
        this.filledProgress = 0;
        this.updateProgress();
    },
    runFadeAction: function runFadeAction() {
        if (this.id != this.curFillingRainBow) {
            return;
        }
        var randTime = Math.floor(cc.random0To1() * 10) + 5;
        var self = this;
        this.animation.play();
        this.scheduler.schedule(function () {
            self.animation.stop();
        }, this, randTime, 0, 0, false);
    },
    fillRainBow: function fillRainBow() {
        this.filledProgress += 0.01;
        this.updateProgress();
    },
    updateProgress: function updateProgress() {
        cc.log(this.id, "============id======");
        var progress = this.world.getChildByName("rainbow" + this.id);
        var bar = progress.getComponent(cc.ProgressBar);
        bar.progress = this.filledProgress;
    }
    // update (dt) {},
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=rainBow.js.map
        