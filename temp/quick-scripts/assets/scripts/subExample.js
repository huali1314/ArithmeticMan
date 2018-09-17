(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/subExample.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '43bd9t8JXhMVIOOokC+e7H4', 'subExample', __filename);
// scripts/subExample.js

// var global = require("./global");
// cc.Class({
//     extends: cc.Component,
//     properties: {
//         borrowPrefab: {
//             // ATTRIBUTES:
//             default: null,        // The default value will be used only when the component attaching
//                                   // to a node for the first time
//             type:cc.Prefab, // optional, default is typeof default
//             serializable: true,   // optional, default is true
//         },
//         playVecloity:5,
//         // bar: {
//         //     get () {
//         //         return this._bar;
//         //     },
//         //     set (value) {
//         //         this._bar = value;
//         //     }
//         // },
//     },
//     //训练模式 和测试模式
//     // LIFE-CYCLE CALLBACKS:
//     onLoad () {
//         this.scheduler = cc.director.getScheduler()
//         var self = this
//         global.eventlistener.on("subExample",function(param1,param2){
//             self.playExample(param1,param2)
//         });
//         global.eventlistener.on("normalCaluAction",function(){
//             self.normalCaluAction()
//         })
//         global.eventlistener.on("borrowCaluAction",function(){

//         })
//         global.eventlistener.on("caluBitResult",function(){

//         })
//     },

//     start () {
//         this.init()
//     },
//     init:function(){
//         this.arr1 = [0,0,0,0,0,0,0,0,0]
//         this.arr2 = [0,0,0,0,0,0,0,0,0]
//         this.idx = 1
//         this.borrowIdx = 1
//         this.costTime = 0
//         this.arrIdx = 0
//         //借位值
//         this.borrowBit = 0
//         var costTime = this.node.getChildByName("costTime")
//         this.costTimeLabel = costTime.getComponent(cc.Label)
//         this.playExample(78723,189983)
//     },
//     playExample:function(param1,param2){
//         this.formatNumber(param1,1)
//         this.num1 = this.arrIdx
//         this.arrIdx = 0
//         this.formatNumber(param2,2)
//         this.num2 = this.arrIdx
//         this.maxNum = this.num1 >this.num2?this.num1:this.num2
//         this.initNum()

//     },
//     formatNumber:function(param,idx){
//         var temp = (param/10).toString()
//         var integer = Math.floor(temp)
//         var decimal = temp.split(".")[1] || 0
//         if(decimal != 0||integer != 0){
//             if (idx == 1){
//                 this.arr1[this.arrIdx] = decimal 
//             }else{
//                 this.arr2[this.arrIdx] = decimal 
//             }
//             this.arrIdx += 1
//             this.formatNumber(integer,idx)
//         }
//     },
//     initNum:function(){
//         for(var i = 1;i <=9;i++){
//             var sub = this.node.getChildByName("sub"+i)
//             var subb = this.node.getChildByName("subb"+i)
//             var subLabel = sub.getComponent(cc.Label)
//             var subbLabel = subb.getComponent(cc.Label)
//             if (i <= this.maxNum){
//                 if(this.arr1[i - 1]){
//                     subLabel.string = this.arr1[i - 1]
//                 }else{
//                     subLabel.string = 0
//                 }
//                 if(this.arr2[i - 1]){
//                     subbLabel.string = this.arr2[i - 1]
//                 }else{
//                     subbLabel.string = 0
//                 }
//             }else{
//                 sub.opacity = 0
//                 subb.opacity = 0
//                 subbLabel.string = 0
//                 subLabel.string = 0
//             }
//         }
//     },
//     createAction:function(){
//         var fadeIn = cc.fadeIn(0.05)
//         var fadeOut = cc.fadeOut(0.05)
//         var sequence = cc.sequence(fadeOut,fadeIn)
//         return sequence
//     },
//     normalCaluAction:function(){
//         var sub = self.node.getChildByName("sub" + self.idx)
//         var label = sub.getComponent(cc.Label)
//         var sequence = self.createAction()
//         var sequence1 = cc.sequence(cc.repeat(sequence,self.playVecloity),cc.callFunc(function(){
//             //减号动画
//             var sign = self.node.getChildByName("sign")
//             var sequence = self.createAction()
//             var repeat = cc.repeat(sequence,self.playVecloity)
//             sign.runAction(repeat)
//         }),cc.delayTime(0.1 * self.playVecloity),cc.callFunc(function(){
//                 //减数动画2
//                 var subb = self.node.getChildByName("subb" + self.idx)
//                 var label = subb.getComponent(cc.Label)
//                 var sequence = self.createAction()
//                 var sequence1 = cc.sequence(cc.repeat(sequence,self.playVecloity),cc.callFunc(function(){
//                     var sub1 = parseInt(self.arr1[self.idx - 1]) || 0
//                     var sub2 = parseInt(self.arr2[self.idx - 1]) || 0
//                     if (sub1 < sub2){
//                         //减数小于被减数，借位
//                         global.eventlistener.fire("borrowCaluAction")
//                     }else{
//                         global.eventlistener.fire("caluBitResult")
//                     }
//                 }))
//         sub.runAction(sequence1)
//     },
//     //借位动画
//     borrowCaluAction:function(){
//         if(this.arr1[this.borrowIdx] != 0){
//             this.arr1[this.borrowIdx] = this.arr1[this.borrowIdx] - 1
//             //可以借位
//             var sub = this.node.getChildByName("sub" + this.borrowIdx)
//             subLabel = sub.getComponent(cc.Label)
//             subLabel.string = this.arr1[this.borrowIdx]
//             if (this.borrowIdx - 1 != this.idx){
//                 this.borrowIdx -= 1

//                 this.borrowCaluAction()
//             }
//         }else{
//             //当前位不可以借位，向下一位请求借位
//             this.borrowIdx +=1
//             this.borrowCaluAction()
//         }
//     },
//     changeSumColor:function(){
//         for(var i = 1;i <= 10;i++){
//             var s = this.node.getChildByName("d" + i)
//             var slabel = s.getComponent(cc.Label)
//             if (slabel.string != "" || slabel.string == 0){
//                 s.color = cc.Color.RED
//                 var scaleAction1 = cc.scaleTo(0.3, 1.5).easing(cc.easeOut(0.3));
//                 var scaleAction2 = cc.scaleTo(0.3, 1).easing(cc.easeOut(0.3));
//                 var sequence = cc.sequence(scaleAction1,scaleAction2)
//                 s.runAction(sequence)
//             }
//         }
//     },
//     update (dt) {
//         if(this.startCaluTime == true){
//             this.costTime += dt
//             this.costTime = Math.floor(this.costTime * 100000)/100000
//             this.costTimeLabel.string = this.costTime + "秒"
//         }
//     },
// });
"use strict";

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
        //# sourceMappingURL=subExample.js.map
        