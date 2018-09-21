(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/rainBowGameLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2bc7f/qdUZGbq5D71O6Slit', 'rainBowGameLogic', __filename);
// scripts/rainBowGameLogic.js

"use strict";

var global = require("./global");
var EventListener = require("./event-listener");
var COLORPOINTS = [100, 120, 140, 160, 180, 200, 250];
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
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.winSize = cc.director.getWinSize();
        this.curFillingRainBow = 1;
        this.touchedColor = "";
        this.fillProgress = 0;
        this.lastTime = 0;
    },
    start: function start() {
        this.world = cc.find("Canvas");
        var self = this;
        global.eventlistener.on("collectRain", function (colorId) {
            self.fillRainBow(colorId);
        });
    },

    fillRainBow: function fillRainBow(colorId) {
        if (colorId == this.curFillingRainBow) {
            this.fillProgress += 1 / COLORPOINTS[this.curFillingRainBow - 1];
            this.updateProgress(colorId, this.fillProgress);
            if (this.fillProgress >= 1) {
                if (this.curFillingRainBow != 7) {
                    this.curFillingRainBow += 1;
                } else {
                    //game Over
                }
            }
        } else {}
    },
    updateProgress: function updateProgress(colorId, fillProgress) {
        var progress = this.world.getChildByName("rainbow" + colorId);
        var bar = progress.getComponent(cc.ProgressBar);
        bar.progress = fillProgress;
    },
    generatorRain: function generatorRain() {
        var randXOffset = cc.random0To1() * (this.winSize.width - 50) - this.winSize.width / 2;
        var yOffset = this.winSize.height / 2 + 200;
        var rain = cc.instantiate(this.rainPrefab);
        rain.setPosition(randXOffset, yOffset);
        this.world.addChild(rain);
    },
    update: function update(dt) {
        var date = new Date();
        var sec = date.getTime();
        if (sec - this.lastTime > 300) {
            this.lastTime = sec;
            this.generatorRain();
        }
    }
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
        //# sourceMappingURL=rainBowGameLogic.js.map
        