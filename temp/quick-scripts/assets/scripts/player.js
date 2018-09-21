(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4b7e6g7CwNL0ILcQKzxzKf2', 'player', __filename);
// scripts/player.js

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
        // player: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type:cc.Prefab, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
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
        var world = cc.find("Canvas");
        var bg = world.getChildByName("bg");
        this.question1 = bg.getChildByName("question1");
        this.question2 = bg.getChildByName("question2");
        this.winSize = cc.director.getWinSize();
        this.animation = this.node.getComponent(cc.Animation);
        this.node.setLocalZOrder(9999);
    },
    start: function start() {
        var self = this;
        this.initPlayerPos();
        global.eventlistener.on("prepare", function () {
            self.runPrepareAction();
        });
        global.eventlistener.on("runForwardOrBackAction", function (forward) {
            self.runForwardOrBackAction(forward);
        });
        global.eventlistener.on("runLeftOrRightAction", function (right) {
            self.runLeftOrRightAction(right);
        });
    },

    initPlayerPos: function initPlayerPos() {
        this.node.setPosition(-this.winSize.width / 2 - 100, 60 - this.winSize.height / 2);
    },
    runPrepareAction: function runPrepareAction() {
        var self = this;
        var player_x = this.question1.x;
        var anim1 = cc.moveTo(1, player_x, -this.winSize.height / 2 + 60);
        var spawn = cc.spawn(anim1, cc.callFunc(function () {
            self.animation.play("runRight");
        }));
        var sequence = cc.sequence(spawn, cc.callFunc(function () {
            self.animation.play("idle");
            global.eventlistener.fire("ready");
        }));
        this.node.runAction(sequence);
    },
    runForwardOrBackAction: function runForwardOrBackAction(forward) {
        global.eventlistener.fire("enableOrUnenableBtn", false);
        var x_offset = this.question2.x - this.question1.x;
        var y_offset = this.question1.y + this.winSize.height / 2;
        var direction_x_offset = x_offset;
        var self = this;
        var action = cc.moveBy(2, 0, y_offset - 200);
        var scaleAction = cc.scaleBy(2, 0.7);
        var sequence;
        if (forward) {
            //向前跑
            var spawn = cc.spawn(action, scaleAction, cc.callFunc(function () {
                self.animation.play("runForward");
            }));
            sequence = cc.sequence(spawn, cc.callFunc(function () {
                self.animation.play("idle");
                global.eventlistener.fire("runForwardEnd");
            }));
        } else {
            //向后跑
            var spawn = cc.spawn(action.reverse(), scaleAction.reverse(), cc.callFunc(function () {
                self.animation.play("runBack");
            }));

            sequence = cc.sequence(spawn, cc.callFunc(function () {
                self.runLeftOrRightAction(false);
            }));
        }
        this.node.runAction(sequence);
    },
    runLeftOrRightAction: function runLeftOrRightAction(right) {
        global.eventlistener.fire("enableOrUnenableBtn", false);
        var x_offset = this.question2.x - this.question1.x;
        var y_offset = this.question1.y + this.winSize.height / 2;
        var direction_x_offset = x_offset;
        var self = this;
        //右跑
        var action1 = cc.moveBy(0.7, direction_x_offset, 0);
        var spawn1 = cc.spawn(action1, cc.callFunc(function () {
            self.animation.play("runRight");
        }));
        if (!right) {
            self.node.scaleX = -1;
        }
        var action2 = cc.moveBy(3.5, 5 * -direction_x_offset, 0);
        var spawn2 = cc.spawn(action2, cc.callFunc(function () {
            self.animation.play("runRight");
        }));
        //序列动画（右跑）
        var sequence = cc.sequence(spawn1, cc.callFunc(function () {
            self.animation.play("idle");
            global.eventlistener.fire("runRightEnd");
            global.eventlistener.fire("enableOrUnenableBtn", true);
        }));
        //序列动画（回到原点）
        var sequence1 = cc.sequence(spawn2, cc.callFunc(function () {
            global.eventlistener.fire("runLeftEnd");
            self.node.scaleX = 1;
            self.animation.play("idle");
            // global.eventlistener.fire("enableOrUnenableBtn",true)
        }));
        if (right) {
            this.node.runAction(sequence);
        } else {
            this.node.runAction(sequence1);
        }
    }
    // update (dt) {

    // },
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
        //# sourceMappingURL=player.js.map
        