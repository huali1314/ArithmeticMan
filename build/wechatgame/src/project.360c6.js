require=function r(s,o,a){function l(t,e){if(!o[t]){if(!s[t]){var i="function"==typeof require&&require;if(!e&&i)return i(t,!0);if(u)return u(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var c=o[t]={exports:{}};s[t][0].call(c.exports,function(e){return l(s[t][1][e]||e)},c,c.exports,r,s,o,a)}return o[t].exports}for(var u="function"==typeof require&&require,e=0;e<a.length;e++)l(a[e]);return l}({addExample:[function(e,t,i){"use strict";cc._RF.push(t,"69af2dre25Lq5wbDSet5TVT","addExample");var n=e("./global");cc.Class({extends:cc.Component,properties:{carryPrefab:{default:null,type:cc.Prefab,serializable:!0},playVecloity:5},onLoad:function(){this.scheduler=cc.director.getScheduler(),n.eventlistener.on("addExample",function(e,t){self.playExample(e,t)})},start:function(){this.init()},init:function(){this.arr1=[0,0,0,0,0,0,0,0,0],this.arr2=[0,0,0,0,0,0,0,0,0],this.idx=1,this.costTime=0,this.arrIdx=0,this.carryBit=0;var e=this.node.getChildByName("costTime");this.costTimeLabel=e.getComponent(cc.Label),this.playExample(78723,189983)},playExample:function(e,t){this.formatNumber(e,1),this.num1=this.arrIdx,this.arrIdx=0,this.formatNumber(t,2),this.num2=this.arrIdx,this.maxNum=this.num1>this.num2?this.num1:this.num2,this.initNum(),this.scheduleAction()},formatNumber:function(e,t){var i=(e/10).toString(),n=Math.floor(i),c=i.split(".")[1]||0;0==c&&0==n||(1==t?this.arr1[this.arrIdx]=c:this.arr2[this.arrIdx]=c,this.arrIdx+=1,this.formatNumber(n,t))},initNum:function(){for(var e=1;e<=9;e++){var t=this.node.getChildByName("add"+e),i=this.node.getChildByName("ad"+e),n=t.getComponent(cc.Label),c=i.getComponent(cc.Label);e<=this.maxNum?(this.arr1[e-1]?n.string=this.arr1[e-1]:n.string=0,this.arr2[e-1]?c.string=this.arr2[e-1]:c.string=0):(t.opacity=0,i.opacity=0,c.string=0,n.string=0)}},createAction:function(){var e=cc.fadeIn(.05),t=cc.fadeOut(.05);return cc.sequence(t,e)},changeSumColor:function(){for(var e=1;e<=10;e++){var t=this.node.getChildByName("s"+e),i=t.getComponent(cc.Label);if(""!=i.string||0==i.string){t.color=cc.Color.RED;var n=cc.scaleTo(.3,1.5).easing(cc.easeOut(.3)),c=cc.scaleTo(.3,1).easing(cc.easeOut(.3)),r=cc.sequence(n,c);t.runAction(r)}}},scheduleAction:function(){var c=this,n=this.node.getChildByName("sign");this.scheduler.schedule(function(){null==c.startCaluTime&&(c.startCaluTime=!0);var e=c.node.getChildByName("add"+c.idx),t=(e.getComponent(cc.Label),c.createAction()),i=cc.sequence(cc.repeat(t,c.playVecloity),cc.callFunc(function(){var e=c.createAction(),t=cc.repeat(e,c.playVecloity);n.runAction(t)}),cc.delayTime(.1*c.playVecloity),cc.callFunc(function(){var e=c.node.getChildByName("ad"+c.idx),t=(e.getComponent(cc.Label),c.createAction()),i=cc.sequence(cc.repeat(t,c.playVecloity),cc.callFunc(function(){var e=c.node.getChildByName("carry"+(c.idx-1));if(null!=e){var t=c.createAction(),i=cc.repeat(t,c.playVecloity);e.runAction(i)}}),cc.delayTime(.1*c.playVecloity),cc.callFunc(function(){var t=c.node.getChildByName("s"+c.idx),i=t.getComponent(cc.Label),n=(parseInt(c.arr1[c.idx-1])||0)+(parseInt(c.arr2[c.idx-1])||0)+c.carryBit;10<=n&&(t.color=cc.Color.RED),i.string=n;var e=c.createAction();t.runAction(cc.sequence(cc.repeat(e,c.playVecloity),cc.callFunc(function(){if(10<=n){t.color=cc.Color.WHITE,c.carryBit=1,i.string=n%10;var e=cc.instantiate(c.carryPrefab);e.setPosition(t.getPosition()),e.setName("carry"+c.idx),c.node.addChild(e,1,c.idx),e.runAction(cc.sequence(cc.moveBy(.5,-36,45),cc.callFunc(function(){c.idx+=1,c.scheduleAction()})))}else c.carryBit=0,null!=c.arr2[c.idx-1]&&null!=c.arr1[c.idx-1]&&c.idx<c.maxNum?(c.idx+=1,c.scheduleAction()):(c.startCaluTime=!1,c.changeSumColor())})))}));e.runAction(i)}));e.runAction(i)},this,.05*this.playVecloity*5,0,0,!1)},update:function(e){1==this.startCaluTime&&(this.costTime+=e,this.costTime=Math.floor(1e5*this.costTime)/1e5,this.costTimeLabel.string=this.costTime+"秒")}}),cc._RF.pop()},{"./global":"global"}],audioEngineController:[function(e,t,i){"use strict";cc._RF.push(t,"e825bHaIthDuJEqKMjTruu5","audioEngineController");var n=e("./global");cc.Class({extends:cc.Component,properties:{zero:{url:cc.AudioClip,default:null},one:{url:cc.AudioClip,default:null},two:{url:cc.AudioClip,default:null},three:{url:cc.AudioClip,default:null},four:{url:cc.AudioClip,default:null},five:{url:cc.AudioClip,default:null},six:{url:cc.AudioClip,default:null},seven:{url:cc.AudioClip,default:null},eight:{url:cc.AudioClip,default:null},nine:{url:cc.AudioClip,default:null}},onLoad:function(){this.audios={0:this.zero,1:this.one,2:this.two,3:this.three,4:this.four,5:this.five,6:this.six,7:this.seven,8:this.eight,9:this.nine}},start:function(){var t=this;n.eventlistener.on("playAudio",function(e){t.play(e)})},play:function(e){this.audios[e]&&cc.audioEngine.play(this.audios[e],!1,1)},stopAll:function(){this.audio&&cc.audioEngine.stopAll()},pauseAll:function(){this.audio&&cc.audioEngine.pauseAll()},resumeAll:function(){this.audio&&cc.audioEngine.resumeAll()},getVolume:function(){cc.audioEngine.getVolume()},setVolume:function(e){cc.audioEngine.setVolume(e)}}),cc._RF.pop()},{"./global":"global"}],"event-listener":[function(e,t,i){"use strict";cc._RF.push(t,"9fdf7fv4SlFe6xfqIv+iB7n","event-listener");t.exports=function(e){var s={};return e.on=function(e,t){s.hasOwnProperty(e)||(s[e]=[]),s[e].push(t)},e.fire=function(e){if(console.log("fire "+e),s.hasOwnProperty(e)){console.log("has own "+e);for(var t=s[e],i=0;i<t.length;i++){for(var n=t[i],c=[],r=1;r<arguments.length;r++)c.push(arguments[r]);n.apply(this,c)}}},e.off=function(e,t){if(console.log("off handler name = "+e),s.hasOwnProperty(e))for(var i=s[e],n=0;n<i.length;n++)i[n]===t&&i.splice(n,1)},e.destroy=function(){s={}},e},cc._RF.pop()},{}],gameController:[function(e,t,i){"use strict";cc._RF.push(t,"7124de7w4ZJNLwQ1gxgtfDH","gameController");var n=e("./event-listener"),c=e("./global");cc.Class({extends:cc.Component,properties:{score:{default:null,type:cc.Label,serializable:!0},value:{default:null,type:cc.Label,serializable:!0},leftBtns:{default:null,type:cc.Node,serializable:!0},rightBtns:{default:null,type:cc.Node,serializable:!0},leftTimeLabel:{default:null,type:cc.Label,serializable:!0},teacher:{default:null,type:cc.Node,serializable:!0},truePrefab:{default:null,type:cc.Prefab,serializable:!0},falsePrefab:{default:null,type:cc.Prefab,serializable:!0},maxCostTime:10},onLoad:function(){var t=this;this.playerAnswer="",this.playerHasActiveAnswer=!1,this.ready=!1,this.isRight=!0,this.isCaluingRoundResult=!1,this.left_time=0,this.costTime=0,this.curAnswerringIdx=1,this.world=cc.find("Canvas"),this.bg=this.world.getChildByName("bg"),this.scheduler=cc.director.getScheduler(),c.eventlistener=n({}),c.eventlistener.on("enableOrUnenableBtn",function(e){t.enableOrUnenableBtn(e)}),c.eventlistener.on("judgeResult",function(){t.judgeResult()}),c.eventlistener.on("runForwardEnd",function(){c.eventlistener.fire("runLeftOrRightAction",!0)}),c.eventlistener.on("runRightEnd",function(){t.curAnswerringIdx+=1,t.costTime=0,t.isRunning=!1,t.playerHasActiveAnswer=!1,t.playerAnswer="",t.visibleQuestion(!0)}),c.eventlistener.on("runLeftEnd",function(){t.curAnswerringIdx=1,t.playerHasActiveAnswer=!1,t.playerAnswer="",t.judgeResult()}),c.eventlistener.on("ready",function(){t.costTime=0,t.ready=!0,t.isRunning=!1,t.enableOrUnenableBtn(!0),t.generatorCurRoundQuestions(),t.visibleQuestion()})},start:function(){this.questions=[],this.rightResult=[],this.playerAnswers=[],this.updateValue(),this.enableOrUnenableBtn(!1),this.scheduler.schedule(this.beginPrepare,this,1,0,0,!1)},pauseOrResumeGame:function(){cc.director.isPaused()?cc.director.resume():cc.director.pause()},beginPrepare:function(){this.isRunning=!0,c.eventlistener.fire("prepare")},enableOrUnenableBtn:function(e){var t=this.leftBtns.children;for(var i in t){(c=t[i].getComponent(cc.Button)).enableAutoGrayEffect=!0,c.interactable=e}var n=this.rightBtns.children;for(var i in n){var c;(c=n[i].getComponent(cc.Button)).enableAutoGrayEffect=!0,c.interactable=e}},onClickNumber:function(e,t){this.playerAnswer+=t,c.eventlistener.fire("playAudio",t),this.updateValue(),this.updatePreQuestionAnswer()},caluFinishQuestionNum:function(){return c.playerData.finishQuestiontotalNum+=1,c.playerData.finishQuestiontotalNum},onClickSure:function(){this.playerHasActiveAnswer=!0,this.updatePlayerAnswer(),this.updateValue(),this.runPlayerAction(),this.updateQuestionAnswer();var e=wx.getStorageInfo();console.log(e,"============sss=====")},updateQuestionAnswer:function(){this.bg.getChildByName("question"+this.curAnswerringIdx).getComponent(cc.Label).string+=this.playerAnswers[this.curAnswerringIdx-1]},updatePreQuestionAnswer:function(){},updatePlayerAnswer:function(){this.playerAnswers[this.playerAnswers.length]=this.playerAnswer||"?"},judgeQuestions:function(){var n=this,c=0;this.scheduler.schedule(function(){var e=this.bg.getChildByName("question"+(c+1));if(n.playerAnswers[c]==n.rightResult[c]){var t=cc.instantiate(n.truePrefab);t.setPosition(30,0),e.addChild(t)}else{var i=cc.instantiate(n.falsePrefab);i.setPosition(30,0),e.addChild(i)}c+=1},this,1.5,5,1,!1)},removeQuestionChildren:function(){for(var e=1;e<=6;e++){this.bg.getChildByName("question"+e).removeAllChildren()}},judgeResult:function(){this.isCaluingRoundResult=!0,this.enableOrUnenableBtn(!1),this.judgeQuestions();var e=this,t=cc.sequence(cc.delayTime(13),cc.callFunc(function(){e.enableOrUnenableBtn(!0),e.generatorCurRoundQuestions(),e.costTime=0,e.onClickClean(),e.isCaluingRoundResult=!1,c.eventlistener.fire("ready")}));this.teacher.runAction(t)},onClickClean:function(){this.playerAnswer="",this.updateValue()},updateValue:function(){this.value.string=this.playerAnswer},runPlayerAction:function(){this.isRunning=!0;this.caluFinishQuestionNum();1!=this.curAnswerringIdx?6!=this.curAnswerringIdx?c.eventlistener.fire("runLeftOrRightAction",!0):c.eventlistener.fire("runForwardOrBackAction",!1):c.eventlistener.fire("runForwardOrBackAction",!0)},generatorAddQuestion:function(){var e=Math.floor(9*cc.random0To1()),t=Math.floor(9*cc.random0To1());this.rightResult[this.rightResult.length]=e+t,this.questions[this.questions.length]=e+"+"+t+"="},generatorSubQuestion:function(){var e=Math.floor(9*cc.random0To1()),t=Math.floor(9*cc.random0To1()),i=t<e?e:t,n=e<t?e:t;this.rightResult[this.rightResult.length]=i-n,this.questions[this.questions.length]=i+"-"+n+"="},generatorMulQuestion:function(){var e=Math.floor(9*cc.random0To1()),t=Math.floor(9*cc.random0To1());this.rightResult[this.rightResult.length]=e*t,this.questions[this.questions.length]=e+"X"+t+"="},generatorDivideQuestion:function(){var e=Math.floor(8*cc.random0To1())+1,t=Math.floor(9*cc.random0To1()),i=e*t;this.rightResult[this.rightResult.length]=t,this.questions[this.questions.length]=i+"/"+e+"="},generatorCurRoundQuestions:function(){this.removeQuestionChildren(),this.curAnswerringIdx=1,this.rightResult=[],this.questions=[],this.playerAnswers=[];for(var e=1;e<7;e++){var t=Math.floor(99*cc.random0To1())+1;t<=25?this.generatorAddQuestion():25<t&&t<=50?this.generatorSubQuestion():50<t&&t<=75?this.generatorMulQuestion():this.generatorDivideQuestion()}this.updateQuestionUI()},updateQuestionUI:function(){for(var e=0;e<6;e++){var t=this.bg.getChildByName("question"+(e+1));0!=e&&(t.opacity=0);var i=t.getComponent(cc.Label);t.setLocalZOrder(9998),i.string=this.questions[e]}},visibleQuestion:function(){var e=this.bg.getChildByName("question"+this.curAnswerringIdx),t=cc.fadeIn(.5);e.runAction(t)},updateLeftTime:function(e){this.leftTimeLabel.string=Math.ceil(e)},caluLeftTime:function(e){this.costTime+=e,this.left_time=this.maxCostTime-this.costTime<0?0:this.maxCostTime-this.costTime,this.updateLeftTime(this.left_time),this.costTime>=this.maxCostTime&&0==this.playerHasActiveAnswer&&(this.onClickSure(),this.onClickClean())},update:function(e){0==this.isCaluingRoundResult&&0==this.isRunning&&1==this.ready&&this.caluLeftTime(e)}}),cc._RF.pop()},{"./event-listener":"event-listener","./global":"global"}],global:[function(e,t,i){"use strict";cc._RF.push(t,"2e412NWWatPZ4MS+zRBEAwY","global"),Object.defineProperty(i,"__esModule",{value:!0});var n,c=e("./data/player-data"),r=(n=c)&&n.__esModule?n:{default:n};var s={};s.playerData=(0,r.default)(),t.exports=s,i.default=s,t.exports=i.default,cc._RF.pop()},{"./data/player-data":"player-data"}],"player-data":[function(e,t,i){"use strict";cc._RF.push(t,"8e0caFcWIlP7bzHzGNFpo7C","player-data"),Object.defineProperty(i,"__esModule",{value:!0});i.default=function(){var e={uid:0,finishQuestiontotalNum:0,rightQuestionTotalNum:0,wrongQuestionTotalNum:0};return e},t.exports=i.default,cc._RF.pop()},{}],player:[function(e,t,i){"use strict";cc._RF.push(t,"4b7e6g7CwNL0ILcQKzxzKf2","player");var u=e("./global");cc.Class({extends:cc.Component,properties:{},onLoad:function(){var e=cc.find("Canvas").getChildByName("bg");this.question1=e.getChildByName("question1"),this.question2=e.getChildByName("question2"),this.winSize=cc.director.getWinSize(),this.animation=this.node.getComponent(cc.Animation),this.node.setLocalZOrder(9999)},start:function(){var t=this;this.initPlayerPos(),u.eventlistener.on("runWalkAction",function(e){t.runWalkAction(e)}),u.eventlistener.on("prepare",function(){t.runPrepareAction()}),u.eventlistener.on("runForwardOrBackAction",function(e){t.runForwardOrBackAction(e)}),u.eventlistener.on("runLeftOrRightAction",function(e){t.runLeftOrRightAction(e)})},initPlayerPos:function(){this.node.setPosition(-this.winSize.width/2-100,60-this.winSize.height/2)},runPrepareAction:function(){var e=this,t=this.question1.x,i=cc.moveTo(1,t,-this.winSize.height/2+60),n=cc.spawn(i,cc.callFunc(function(){e.animation.play("runRight")})),c=cc.sequence(n,cc.callFunc(function(){e.animation.play("idle"),u.eventlistener.fire("ready")}));this.node.runAction(c)},runForwardOrBackAction:function(e){u.eventlistener.fire("enableOrUnenableBtn",!1);this.question2.x,this.question1.x;var t,i=this.question1.y+this.winSize.height/2,n=this,c=cc.moveBy(2,0,i-200),r=cc.scaleBy(2,.7);if(e){var s=cc.spawn(c,r,cc.callFunc(function(){n.animation.play("runForward")}));t=cc.sequence(s,cc.callFunc(function(){n.animation.play("idle"),u.eventlistener.fire("runForwardEnd")}))}else{s=cc.spawn(c.reverse(),r.reverse(),cc.callFunc(function(){n.animation.play("runBack")}));t=cc.sequence(s,cc.callFunc(function(){n.runLeftOrRightAction(!1)}))}this.node.runAction(t)},runLeftOrRightAction:function(e){u.eventlistener.fire("enableOrUnenableBtn",!1);var t=this.question2.x-this.question1.x,i=(this.question1.y,this.winSize.height,t),n=this,c=cc.moveBy(.7,i,0),r=cc.spawn(c,cc.callFunc(function(){n.animation.play("runRight")}));e||(n.node.scaleX=-1);var s=cc.moveBy(3.5,5*-i,0),o=cc.spawn(s,cc.callFunc(function(){n.animation.play("runRight")})),a=cc.sequence(r,cc.callFunc(function(){n.animation.play("idle"),u.eventlistener.fire("runRightEnd"),u.eventlistener.fire("enableOrUnenableBtn",!0)})),l=cc.sequence(o,cc.callFunc(function(){u.eventlistener.fire("runLeftEnd"),n.node.scaleX=1,n.animation.play("idle")}));e?this.node.runAction(a):this.node.runAction(l)}}),cc._RF.pop()},{"./global":"global"}],screenadapt:[function(e,t,i){"use strict";cc._RF.push(t,"1115cf0KxtHVaTpeUMyk1Xg","screenadapt"),cc.Class({extends:cc.Component,properties:{left:{default:null,type:cc.Node,serializable:!0},right:{default:null,type:cc.Node,serializable:!0}},onLoad:function(){this.setLandscape()},setLandscape:function(){cc.sys.isNative&&cc.sys.os===cc.sys.OS_ANDROID?jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","changeOrientation","(I)V",0):cc.sys.isNative&&cc.sys.os===cc.sys.OS_IOS?jsb.reflection.callStaticMethod("IOSHelper","changeOrientation:",0):cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);var e=cc.view.getFrameSize(),t=cc.director.getWinSize();if(console.log(e,"+============screenSize====="),console.log(t,"+============winSize====="),2<e.width/e.height||e.width/e.height<.5){var i=this.left.getComponent(cc.Widget),n=this.right.getComponent(cc.Widget);i.left=60,n.right=60,cc.view.setDesignResolutionSize(1620,750,2)}var c=cc.view._initFrameSize;cc.view._initFrameSize=function(){c.apply(cc.view,arguments),cc.view._isRotated&&!cc.sys.isNative?(cc.container.style["-webkit-transform"]="rotate(-90deg)",cc.container.style.transform="rotate(-90deg)",setTimeout(function(){cc.container.style.margin=cc.view._frameSize.width+"px 0px 0px"}),cc.view.convertToLocationInView=function(e,t,i){var n=this._devicePixelRatio*(e-i.left),c=this._devicePixelRatio*(i.top+i.height-t);return this._isRotated?{x:c,y:cc.view._viewPortRect.height-n}:{x:n,y:c}}):cc.view._isRotated||cc.sys.isNative||(cc.view.convertToLocationInView=function(e,t,i){var n=this._devicePixelRatio*(e-i.left),c=this._devicePixelRatio*(i.top+i.height-t);return this._isRotated?{x:this._viewPortRect.width-c,y:n}:{x:n,y:c}})}}}),cc._RF.pop()},{}]},{},["addExample","audioEngineController","player-data","event-listener","gameController","global","player","screenadapt"]);