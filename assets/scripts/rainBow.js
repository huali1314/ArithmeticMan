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
        id:1,
    },
    // onLoad () {},

    start () {
        this.scheduler = cc.director.getScheduler()
        this.curFillingRainBow = 1
        var self = this
        this.world = cc.find("Canvas")
        var rainbow = this.world.getChildByName("rainbow"+ this.id)
        this.animation = rainbow.getComponent(cc.Animation)
        global.eventlistener.on("runFadeAction",function(id){
            self.curFillingRainBow = id
            self.runFadeAction()
        })
        global.eventlistener.on("fillProgress",function(){
            self.fillRainBow()
        })
        this.initProgress()
    },
    initProgress:function(){
        var randProgress = (cc.random0To1() * 30).toFixed(2)
        this.filledProgress = 0
        this.updateProgress()
    },
    runFadeAction:function(){
        if (this.id != this.curFillingRainBow){
           return 
        }
        var randTime = Math.floor(cc.random0To1() * 10) + 5
        var self = this
        this.animation.play()
        this.scheduler.schedule(function(){
            self.animation.stop()
        },this,randTime,0,0,false)
    },
    fillRainBow:function(){
        this.filledProgress += 0.01
        this.updateProgress()
    },
    updateProgress:function(){
        cc.log(this.id,"============id======")
        var progress = this.world.getChildByName("rainbow" + this.id)
        var bar = progress.getComponent(cc.ProgressBar)
        bar.progress = this.filledProgress
    },
    // update (dt) {},
});
