(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/data/player-data.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8e0caFcWIlP7bzHzGNFpo7C', 'player-data', __filename);
// scripts/data/player-data.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by chu on 2017/8/18 0018.
 */
var PlayerData = function PlayerData() {
    var that = {};
    that.uid = 0;
    that.finishQuestiontotalNum = 0; //回答问题总数
    that.rightQuestionTotalNum = 0;
    that.wrongQuestionTotalNum = 0;
    return that;
};
exports.default = PlayerData;
module.exports = exports["default"];

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
        //# sourceMappingURL=player-data.js.map
        