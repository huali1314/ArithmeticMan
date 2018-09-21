"use strict";
cc._RF.push(module, '1115cf0KxtHVaTpeUMyk1Xg', 'screenadapt');
// scripts/screenadapt.js

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
cc.Class({
    extends: cc.Component,
    properties: {
        left: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true // optional, default is true
        },
        right: {
            // ATTRIBUTES:
            default: null, // The default value will be used only when the component attaching
            // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true // optional, default is true
        }
    },
    onLoad: function onLoad() {
        this.setLandscape();
    },

    setLandscape: function setLandscape() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "changeOrientation", "(I)V", 0); //0横1竖
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("IOSHelper", "changeOrientation:", 0);
        } else {
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        }
        var screenSize = cc.view.getFrameSize();
        var winSize = cc.director.getWinSize();

        console.log(screenSize, "+============screenSize=====");
        console.log(winSize, "+============winSize=====");
        if (screenSize.width / screenSize.height > 2 || screenSize.width / screenSize.height < 0.5) {
            if (this.left && this.right) {
                var leftWidget = this.left.getComponent(cc.Widget);
                var rightWidget = this.right.getComponent(cc.Widget);
                leftWidget.left = 60;
                rightWidget.right = 60;
            }
            cc.view.setDesignResolutionSize(1620, 750, 2);
        }
        //横屏模式修改为逆时针旋转90度
        var __initFrameSize__ = cc.view._initFrameSize;
        cc.view._initFrameSize = function () {
            __initFrameSize__.apply(cc.view, arguments);

            if (cc.view._isRotated && !cc.sys.isNative) {
                cc.container.style['-webkit-transform'] = 'rotate(-90deg)';
                cc.container.style.transform = 'rotate(-90deg)';
                setTimeout(function () {
                    cc.container.style['margin'] = cc.view._frameSize.width + 'px 0px 0px';
                });
                cc.view.convertToLocationInView = function (tx, ty, relatedPos) {
                    var x = this._devicePixelRatio * (tx - relatedPos.left);
                    var y = this._devicePixelRatio * (relatedPos.top + relatedPos.height - ty);
                    return this._isRotated ? { x: y, y: cc.view._viewPortRect.height - x } : { x: x, y: y };
                };
            } else if (!cc.view._isRotated && !cc.sys.isNative) {
                cc.view.convertToLocationInView = function (tx, ty, relatedPos) {
                    var x = this._devicePixelRatio * (tx - relatedPos.left);
                    var y = this._devicePixelRatio * (relatedPos.top + relatedPos.height - ty);
                    return this._isRotated ? { x: this._viewPortRect.width - y, y: x } : { x: x, y: y };
                };
            }
        };
        // this.windowRatio = this.node.width / 1280
        // if (this.node.width < 1280) {
        //   this.node.scale = this.windowRatio
        // }
    }
    // update (dt) {

    // },
});

cc._RF.pop();