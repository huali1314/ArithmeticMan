//彩虹初始完成度随机值填入，彩虹颜色会随玩家选择的色彩混合变化，彩虹完成时间记录，彩虹完成结果比较，彩虹色条闪烁为当前需要填入的颜色，彩虹色彩着色后可回退与不可回退（广告加入点），色块产生速度与行进速度虽时间或手机完成度增加，彩虹色条闪烁时长切换随完成度增加而增加

var global = require("./global");
cc.Class({
    extends: cc.Component,
    start () {
        this.color = 1
        this.randColor()
        this.costTime = cc.random0To1() * 2 + 4
        this.screen_sz = cc.director.getWinSize()
        this.runAction()
    },
    runAction:function(){
        var moveBy = cc.moveBy(this.costTime,0,-1000).easing(cc.easeIn(this.costTime - 1))
        this.node.runAction(moveBy)
    },
    randColor:function(){
        var rand = Math.floor(cc.random0To1() * 6) + 1
        // this.color = rand

    },
    onClickRain:function(){
        global.eventlistener.fire("collectRain",this.color)
        this.node.destroy()
    },
    update (dt) {
        if (this.node.y < -this.screen_sz.height/2){
            this.node.destroy()
        }
    },
});