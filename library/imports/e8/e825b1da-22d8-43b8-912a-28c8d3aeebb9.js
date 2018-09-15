"use strict";
cc._RF.push(module, 'e825bHaIthDuJEqKMjTruu5', 'audioEngineController');
// scripts/audioEngineController.js

"use strict";

var global = require("./global");
cc.Class({
    extends: cc.Component,

    properties: {
        zero: {
            url: cc.AudioClip,
            default: null
        },
        one: {
            url: cc.AudioClip,
            default: null
        },
        two: {
            url: cc.AudioClip,
            default: null
        },
        three: {
            url: cc.AudioClip,
            default: null
        },
        four: {
            url: cc.AudioClip,
            default: null
        },
        five: {
            url: cc.AudioClip,
            default: null
        },
        six: {
            url: cc.AudioClip,
            default: null
        },
        seven: {
            url: cc.AudioClip,
            default: null
        },
        eight: {
            url: cc.AudioClip,
            default: null
        },
        nine: {
            url: cc.AudioClip,
            default: null
        }
    },

    onLoad: function onLoad() {
        this.audios = {
            0: this.zero,
            1: this.one,
            2: this.two,
            3: this.three,
            4: this.four,
            5: this.five,
            6: this.six,
            7: this.seven,
            8: this.eight,
            9: this.nine
        };
    },
    start: function start() {
        var self = this;
        global.eventlistener.on("playAudio", function (name) {
            self.play(name);
        });
    },
    play: function play(name) {
        if (!this.audios[name]) return;
        cc.audioEngine.play(this.audios[name], false, 1);
    },

    stopAll: function stopAll() {
        if (!this.audio) return;
        cc.audioEngine.stopAll();
    },

    pauseAll: function pauseAll() {
        if (!this.audio) return;
        cc.audioEngine.pauseAll();
    },

    resumeAll: function resumeAll() {
        if (!this.audio) return;
        cc.audioEngine.resumeAll();
    },
    getVolume: function getVolume() {
        cc.audioEngine.getVolume();
    },
    setVolume: function setVolume(volume) {
        cc.audioEngine.setVolume(volume);
    }
});

cc._RF.pop();