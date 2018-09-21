var global = require("./global");
var tips = ["广告阻碍了你的求知欲？却阻止不了对游戏,电视剧的狂热？",
            "求知一下怎么了，说不定这次不用看广告呢",
            "猜拳决定要不要看广告吧，说不定你今天运气爆棚呢！",]
            //算术达人之火柴人
            //测一测你的心算能力，或许没有你认为的那么好，也没有你想象的那么差，经常用脑，提高记忆力和计算能力，妈妈再也不用担心我的数学成绩了
var prompt = ["好好学习，天天向上！！！",
                "学习是一件快乐的事情！！！",
                "知识是智慧的火炬"]
cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        value: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        leftBtns: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        rightBtns: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        leftTimeLabel: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Label, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        teacher: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        truePrefab: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        falsePrefab: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        maxCostTime:10,
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
        //玩家的本题答案
        this.playerAnswer = "";
        //是否已经主动答题
        this.playerHasActiveAnswer = false
        //是否已经准备好
        this.ready = false
        //向右跑
        this.isRight = true
        //是否正在计算本轮答题结果
        this.isCaluingRoundResult = false
        //中间变量，用来计算每道题剩余时间
        this.left_time = 0
        //本道题的花费时间
        this.costTime = 0
        this.lastCostTime = 0
        //当前正在计算的题目编号
        this.curAnswerringIdx = 1
        this.world = cc.find("Canvas")
        this.bg = this.world.getChildByName("bg")
        this.mask = this.bg.getChildByName("mask")
        this.prompt = this.bg.getChildByName("blackboard").getChildByName("prompt")
        this.pause_btn = this.bg.getChildByName("pause")
        this.pause_label = this.pause_btn.getChildByName("Label").getComponent(cc.Label)
        this.scheduler = cc.director.getScheduler()
        
        // cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    start () {
        var self = this
        global.eventlistener.on("enableOrUnenableBtn",function(enable){
            self.enableOrUnenableBtn(enable)
        })
        global.eventlistener.on("judgeResult",function(){
            self.judgeResult()
        })
        global.eventlistener.on("runForwardEnd",function(){
            global.eventlistener.fire("runLeftOrRightAction",true)
        })
        global.eventlistener.on("runRightEnd",function(){
            self.curAnswerringIdx += 1
            self.costTime = 0
            self.isRunning = false
            self.playerHasActiveAnswer = false
            self.playerAnswer = ""
            self.visibleQuestion(true)
        })
        global.eventlistener.on("runLeftEnd",function(){
            self.curAnswerringIdx = 1
            self.playerHasActiveAnswer = false
            self.playerAnswer = ""
            self.judgeResult()
        })
        //进场后准备完毕（到达指定位置）
        global.eventlistener.on("ready",function(){
            self.costTime = 0
            self.ready = true
            self.isRunning = false
            //点亮答题按钮
            self.enableOrUnenableBtn(true)
            //随机出6道算术题
            self.generatorCurRoundQuestions()
            //显示当前正在回答的试题
            self.visibleQuestion()
        })
        //本轮所有题目缓存
        this.questions = []
        //本轮正确答案缓存
        this.rightResult = []
        //玩家本轮答案缓存
        this.playerAnswers = []
        this.updateValue()
        this.enableOrUnenableBtn(false)
        // this.scheduler.schedule(this.beginPrepare,this,1,0,0,false);
    },
    pauseOrResumeGame:function(){
        if (cc.director.isPaused()){
            this.pause_label.string = "暂停"
            cc.director.resume()
        }else{
            this.pause_label.string = "继续"
            cc.director.pause()
        }
    },
    beginPrepare:function(){
        this.mask.active = false
        this.prompt.active = false
        this.isRunning = true
        global.eventlistener.fire("prepare");
    },
    enableOrUnenableBtn:function(enable){
        var leftBtns = this.leftBtns.children
        for (var idx in leftBtns){
            var btn = leftBtns[idx].getComponent(cc.Button)
            btn.enableAutoGrayEffect = true
            btn.interactable = enable
        }
        var rightBtns = this.rightBtns.children
         for (var idx in rightBtns){
            var btn = rightBtns[idx].getComponent(cc.Button)
            btn.enableAutoGrayEffect = true
            btn.interactable =enable
        }
    },
    onClickNumber:function(event, customEventData){
        this.playerAnswer += customEventData
        global.eventlistener.fire("playAudio",customEventData);
        this.updateValue()
        this.updatePreQuestionAnswer()
    },
    //计算已完成的题目数量（答对和答错的都算）
    caluFinishQuestionNum:function(){
        global.playerData.finishQuestiontotalNum += 1
        return global.playerData.finishQuestiontotalNum
    },
    onClickSure:function(){
        this.playerHasActiveAnswer = true
        this.costTime = 0
        this.lastCostTime = 0
        this.updatePlayerAnswer()
        this.updateValue()
        this.runPlayerAction()
        this.updateQuestionAnswer()
        if (!cc.sys.isNative){
            var sysInfo = wx.getStorageInfo()
            console.log(sysInfo,"============sss=====")
        }
    },
    updateQuestionAnswer:function(){
        var question = this.bg.getChildByName("question" + this.curAnswerringIdx)
        var questionLabel = question.getComponent(cc.Label)
        questionLabel.string += this.playerAnswers[this.curAnswerringIdx -1]
    },
    updatePreQuestionAnswer:function(){

    },
    updatePlayerAnswer:function(){
        this.playerAnswers[this.playerAnswers.length] = this.playerAnswer || "?"
    },
    judgeQuestions:function(){
        var self = this
        var idx = 0
        this.scheduler.schedule(function(){
            var question = this.bg.getChildByName("question" + (idx + 1))
            if (self.playerAnswers[idx] == self.rightResult[idx]){
                var truePrefab = cc.instantiate(self.truePrefab)
                truePrefab.setPosition(30,0)
                question.addChild(truePrefab)
            }else{
                var falsePrefab = cc.instantiate(self.falsePrefab)
                falsePrefab.setPosition(30,0)
                question.addChild(falsePrefab)
            }
            idx +=1;
        },this,1.5,5,1,false);
    },
    removeQuestionChildren:function(){
        for(var i = 1;i<=6;i++){
            var question = this.bg.getChildByName("question" + i)
            question.removeAllChildren()
        }
    },
    judgeResult:function(){
        this.isCaluingRoundResult = true
        this.enableOrUnenableBtn(false)
        this.judgeQuestions()
        var self = this
        // cc.log("judgeResult=====")
        var sequence = cc.sequence(cc.delayTime(13),cc.callFunc(function(){
            self.enableOrUnenableBtn(true)
            self.generatorCurRoundQuestions()
            self.costTime = 0
            self.initCostTime()
            self.onClickClean()
            self.isCaluingRoundResult = false
            global.eventlistener.fire("ready")
            // cc.log("==============judgeResult===aa==")
        }))
        this.teacher.runAction(sequence)
        // this.scheduler.schedule(this.caluResult,this,10,6,0,false)
    },
    onClickClean:function(){
        this.playerAnswer = ""
        this.updateValue()
    },
    updateValue:function(){
        this.value.string = this.playerAnswer
    },

    //==============================试题出题逻辑及人物行走动画控制============================
    runPlayerAction:function(){
        this.isRunning = true
        var num = this.caluFinishQuestionNum()
        if (this.curAnswerringIdx == 1){
            global.eventlistener.fire("runForwardOrBackAction",true)
            return
        }else if(this.curAnswerringIdx == 6){
            global.eventlistener.fire("runForwardOrBackAction",false)
            return
        }
        global.eventlistener.fire("runLeftOrRightAction",true)
    },
    generatorAddQuestion:function(){
        var rand1 = Math.floor(cc.random0To1() * 9)
        var rand2 = Math.floor(cc.random0To1() * 9)
        this.rightResult[this.rightResult.length] = rand1 + rand2
        this.questions[this.questions.length] = (rand1 + "+" + rand2 + "=")
    },
    generatorSubQuestion:function(){
        var rand1 = Math.floor(cc.random0To1() * 9)
        var rand2 = Math.floor(cc.random0To1() * 9)
        var sub1 = rand1 > rand2?rand1:rand2
        var sub2 = rand1 < rand2?rand1:rand2
        this.rightResult[this.rightResult.length] = sub1 - sub2
        this.questions[this.questions.length] = (sub1 + "-" + sub2 + "=")
    },
    generatorMulQuestion:function(){
        var rand1 = Math.floor(cc.random0To1() * 9)
        var rand2 = Math.floor(cc.random0To1() * 9)
        this.rightResult[this.rightResult.length] = rand1 * rand2
        this.questions[this.questions.length] = (rand1 + "X" + rand2 + "=")
    },
    generatorDivideQuestion:function(){
        var rand1 = Math.floor(cc.random0To1() * 8) + 1
        var rand2 = Math.floor(cc.random0To1() * 9)
        var amass = rand1 * rand2
        this.rightResult[this.rightResult.length] = rand2
        this.questions[this.questions.length] = (amass + "/" + rand1 + "=")
    },
    generatorCurRoundQuestions:function(){
        this.removeQuestionChildren()
        this.curAnswerringIdx = 1
        this.rightResult = []
        this.questions = []
        this.playerAnswers = []
        for (var i = 1;i<7;i++){
            var rand = Math.floor(cc.random0To1() * 99) + 1
            if (rand <=25){
                this.generatorAddQuestion()
            }else if(rand > 25 && rand <= 50){
                this.generatorSubQuestion()
            }else if(rand > 50 && rand <= 75){
                this.generatorMulQuestion()
            }else{
                this.generatorDivideQuestion()
            }
        }
       this.updateQuestionUI()
    },
    updateQuestionUI:function(){
        for (var i = 0;i<6;i++){
            var question = this.bg.getChildByName("question" + (i + 1))
            if (i != 0){
                question.opacity = 0
            }
            var label = question.getComponent(cc.Label)
            question.setLocalZOrder(9998)
            label.string = this.questions[i]
        }
    },
    visibleQuestion:function(){
        var question = this.bg.getChildByName("question" + this.curAnswerringIdx)
        var action = cc.fadeIn(0.5)
        question.runAction(action)
    },
    updateLeftTime:function(leftTime){
        this.leftTimeLabel.string = Math.ceil(leftTime)
    },
    updateCostTime:function(){
        cc.log(this.curAnswerringIdx,"========curAnswerringIdx===")
       var costTime = this.bg.getChildByName("costTime" + this.curAnswerringIdx)
       costTime.getComponent(cc.Label).string = this.costTime.toFixed(2) + "s"
    },
    initCostTime:function(){
        for (var i = 1;i<=6;i++){
            var costTime = this.bg.getChildByName("costTime" + i)
            costTime.getComponent(cc.Label).string = ""
        }
    },
    caluLeftTime:function(dt){
        this.costTime += dt
        if (global.playerData.curMode == global.playerData.TESTMODE){
            this.left_time = (this.maxCostTime - this.costTime < 0)?0:(this.maxCostTime - this.costTime)
            this.updateLeftTime(this.left_time)
            if (this.costTime >= this.maxCostTime){
                if (this.playerHasActiveAnswer == false){
                    this.onClickSure()
                    this.onClickClean()
                }
            }
        }else{
            if (this.costTime - this.lastCostTime >=0.1){
                this.lastCostTime = this.costTime
                this.updateCostTime()
            }
        }
    },
    update (dt) {
        if (this.isCaluingRoundResult == false && this.isRunning == false && this.ready == true){
            this.caluLeftTime(dt)    
        }   
    },
});
