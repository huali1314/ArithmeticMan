"use strict";
cc._RF.push(module, '6656fM2ClRDN6zp2ouL8ysx', 'rain');
// scripts/rain.js

"use strict";

//彩虹初始完成度随机值填入，彩虹颜色会随玩家选择的色彩混合变化，彩虹完成时间记录，彩虹完成结果比较，彩虹色条闪烁为当前需要填入的颜色，彩虹色彩着色后可回退与不可回退（广告加入点），色块产生速度与行进速度虽时间或手机完成度增加，彩虹色条闪烁时长切换随完成度增加而增加
var global = require("./global");
cc.Class({
    extends: cc.Component,
    start: function start() {
        this.color = 1;
        this.randColor();
        this.costTime = cc.random0To1() * 2 + 4;
        this.screen_sz = cc.director.getWinSize();
        this.runAction();
    },

    runAction: function runAction() {
        var moveBy = cc.moveBy(this.costTime, 0, -1000);
        this.node.runAction(moveBy);
    },
    randColor: function randColor() {
        var rand = Math.floor(cc.random0To1() * 6) + 1;
        this.color = rand;
        switch (rand) {
            case 1:
                this.node.color = cc.Color.RED;
                break;
            case 2:
                this.node.color = cc.Color.ORANGE;
                break;
            case 3:
                this.node.color = cc.Color.YELLOW;
                break;
            case 4:
                this.node.color = cc.Color.GREEN;
                break;
            case 5:
                this.node.color = cc.Color.BLUE;
                break;
            case 6:
                this.node.color = cc.Color.CYAN;
                break;
            case 7:
                this.node.color = cc.Color.GRAY;
                break;
        }
    },
    onClickRain: function onClickRain() {
        global.eventlistener.fire("judgeTouchedColor");
        this.node.destroy();
    },
    update: function update(dt) {
        if (this.node.y < -this.screen_sz.height / 2) {
            this.node.destroy();
        }
    }
});

cc._RF.pop();