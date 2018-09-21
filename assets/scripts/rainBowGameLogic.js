var global = require("./global");
var EventListener = require("./event-listener");
var COLORPOINTS = [100,120,140,160,180,200,250]
cc.Class({
    extends: cc.Component,

    properties: {
        rainPrefab: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
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

    onLoad () {
        this.winSize = cc.director.getWinSize()
        this.curFillingRainBow = 1
        this.touchedColor = ""
        this.fillProgress = 0
        this.lastTime = 0
    },
    start () {
        this.world = cc.find("Canvas")
        var self = this
        global.eventlistener.on("collectRain",function(colorId){
            self.fillRainBow(colorId)
        })
    },
    fillRainBow:function(colorId){
        if (colorId == this.curFillingRainBow){
            this.fillProgress += 1/COLORPOINTS[this.curFillingRainBow - 1]
            this.updateProgress(colorId,this.fillProgress)
            if(this.fillProgress >=1){
                if (this.curFillingRainBow != 7){
                    this.curFillingRainBow +=1
                }else{
                    //game Over
                }
            }
        }else{

        }
    },
    updateProgress:function(colorId,fillProgress){
        var progress = this.world.getChildByName("rainbow" + colorId)
        var bar = progress.getComponent(cc.ProgressBar)
        bar.progress = fillProgress
    },
    generatorRain:function(){
        var randXOffset = cc.random0To1() * (this.winSize.width - 50) - this.winSize.width/2
        var yOffset = this.winSize.height/2 + 200
        var rain = cc.instantiate(this.rainPrefab)
        rain.setPosition(randXOffset,yOffset)
        this.world.addChild(rain)
    },
    update (dt) {
        var date = new Date()
        var sec = date.getTime()
        if (sec - this.lastTime > 300){
            this.lastTime = sec
            this.generatorRain()
        }
    },
});
