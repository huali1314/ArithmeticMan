"use strict";
cc._RF.push(module, '2e412NWWatPZ4MS+zRBEAwY', 'global');
// scripts/global.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playerData = require('./data/player-data');

var _playerData2 = _interopRequireDefault(_playerData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = {}; /**
                  * Created by chu on 2017/8/16 0016.
                  */

global.playerData = (0, _playerData2.default)();
module.exports = global;
exports.default = global;
module.exports = exports['default'];

cc._RF.pop();