"use strict";
cc._RF.push(module, '69af2dre25Lq5wbDSet5TVT', 'addExample');
// scripts/addExample.js

"use strict";

var global = require("./global");
cc.Class({
    extends: cc.Component,
    properties: {
        carryPrefab: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true // optional, default is true
        },
        playVecloity: 5
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    //训练模式 和测试模式
    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        this.scheduler = cc.director.getScheduler();
        global.eventlistener.on("addExample", function (param1, param2) {
            self.playExample(param1, param2);
        });
    },
    start: function start() {
        this.init();
    },

    init: function init() {
        this.arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.arr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.idx = 1;
        this.costTime = 0;
        this.arrIdx = 0;
        //进位值
        this.carryBit = 0;
        var costTime = this.node.getChildByName("costTime");
        this.costTimeLabel = costTime.getComponent(cc.Label);
        this.playExample(78723, 189983);
    },
    playExample: function playExample(param1, param2) {
        this.formatNumber(param1, 1);
        this.num1 = this.arrIdx;
        this.arrIdx = 0;
        this.formatNumber(param2, 2);
        this.num2 = this.arrIdx;
        this.maxNum = this.num1 > this.num2 ? this.num1 : this.num2;
        this.initNum();
        this.scheduleAction();
    },
    formatNumber: function formatNumber(param, idx) {
        var temp = (param / 10).toString();
        var integer = Math.floor(temp);
        var decimal = temp.split(".")[1] || 0;
        if (decimal != 0 || integer != 0) {
            if (idx == 1) {
                this.arr1[this.arrIdx] = decimal;
            } else {
                this.arr2[this.arrIdx] = decimal;
            }
            this.arrIdx += 1;
            this.formatNumber(integer, idx);
        }
    },
    initNum: function initNum() {
        for (var i = 1; i <= 9; i++) {
            var add = this.node.getChildByName("add" + i);
            var ad = this.node.getChildByName("ad" + i);
            var addLabel = add.getComponent(cc.Label);
            var adLabel = ad.getComponent(cc.Label);
            if (i <= this.maxNum) {
                if (this.arr1[i - 1]) {
                    addLabel.string = this.arr1[i - 1];
                } else {
                    addLabel.string = 0;
                }
                if (this.arr2[i - 1]) {
                    adLabel.string = this.arr2[i - 1];
                } else {
                    adLabel.string = 0;
                }
            } else {
                add.opacity = 0;
                ad.opacity = 0;
                adLabel.string = 0;
                addLabel.string = 0;
            }
        }
    },
    createAction: function createAction() {
        var fadeIn = cc.fadeIn(0.05);
        var fadeOut = cc.fadeOut(0.05);
        var sequence = cc.sequence(fadeOut, fadeIn);
        return sequence;
    },
    changeSumColor: function changeSumColor() {
        for (var i = 1; i <= 10; i++) {
            var s = this.node.getChildByName("s" + i);
            var slabel = s.getComponent(cc.Label);
            if (slabel.string != "" || slabel.string == 0) {
                s.color = cc.Color.RED;
                var scaleAction1 = cc.scaleTo(0.3, 1.5).easing(cc.easeOut(0.3));
                var scaleAction2 = cc.scaleTo(0.3, 1).easing(cc.easeOut(0.3));
                var sequence = cc.sequence(scaleAction1, scaleAction2);
                s.runAction(sequence);
            }
        }
    },
    //加数1动画
    scheduleAction: function scheduleAction() {
        var self = this;
        var sign = this.node.getChildByName("sign");
        this.scheduler.schedule(function () {
            if (self.startCaluTime == null) {
                self.startCaluTime = true;
            }
            //加数动画1
            var add = self.node.getChildByName("add" + self.idx);
            var label = add.getComponent(cc.Label);
            var sequence = self.createAction();
            var sequence1 = cc.sequence(cc.repeat(sequence, self.playVecloity), cc.callFunc(function () {
                //加号动画
                var sequence = self.createAction();
                var repeat = cc.repeat(sequence, self.playVecloity);
                sign.runAction(repeat);
            }), cc.delayTime(0.1 * self.playVecloity), cc.callFunc(function () {
                //加数动画2
                var ad = self.node.getChildByName("ad" + self.idx);
                var label = ad.getComponent(cc.Label);
                var sequence = self.createAction();
                var sequence1 = cc.sequence(cc.repeat(sequence, self.playVecloity), cc.callFunc(function () {
                    var carry = self.node.getChildByName("carry" + (self.idx - 1));
                    if (carry != null) {
                        //进位动画
                        var sequence = self.createAction();
                        var sequence1 = cc.repeat(sequence, self.playVecloity);
                        carry.runAction(sequence1);
                    }
                }), cc.delayTime(0.1 * self.playVecloity), cc.callFunc(function () {
                    //对应位数和动画
                    var s = self.node.getChildByName("s" + self.idx);
                    var sLabel = s.getComponent(cc.Label);
                    var add1 = parseInt(self.arr1[self.idx - 1]) || 0;
                    var add2 = parseInt(self.arr2[self.idx - 1]) || 0;
                    var sum = add1 + add2 + self.carryBit;
                    if (sum >= 10) {
                        s.color = cc.Color.RED;
                    }
                    sLabel.string = sum;
                    var sequence = self.createAction();
                    s.runAction(cc.sequence(cc.repeat(sequence, self.playVecloity), cc.callFunc(function () {
                        if (sum >= 10) {
                            s.color = cc.Color.WHITE;
                            //满十进一
                            self.carryBit = 1;
                            sLabel.string = sum % 10;
                            var carryPrefab = cc.instantiate(self.carryPrefab);
                            carryPrefab.setPosition(s.getPosition());
                            carryPrefab.setName("carry" + self.idx);
                            self.node.addChild(carryPrefab, 1, self.idx);
                            carryPrefab.runAction(cc.sequence(cc.moveBy(0.5, -36, 45), cc.callFunc(function () {
                                self.idx += 1;
                                self.scheduleAction();
                            })));
                        } else {
                            //进位值归零
                            self.carryBit = 0;
                            if (self.arr2[self.idx - 1] != null && self.arr1[self.idx - 1] != null && self.idx < self.maxNum) {
                                self.idx += 1;
                                self.scheduleAction();
                            } else {
                                self.startCaluTime = false;
                                self.changeSumColor();
                            }
                        }
                    })));
                }));
                ad.runAction(sequence1);
            }));
            add.runAction(sequence1);
        }, this, this.playVecloity * 0.05 * 5, 0, 0, false);
    },
    update: function update(dt) {
        if (this.startCaluTime == true) {
            this.costTime += dt;
            this.costTime = Math.floor(this.costTime * 100000) / 100000;
            this.costTimeLabel.string = this.costTime + "秒";
        }
    }
});

cc._RF.pop();