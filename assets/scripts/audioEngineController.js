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
        },
    },

    onLoad: function () {
        this.audios = {
            0:this.zero,
            1:this.one,
            2:this.two,
            3:this.three,
            4:this.four,
            5:this.five,
            6:this.six,
            7:this.seven,
            8:this.eight,
            9:this.nine,
            }

    },
    start:function(){
        var self = this
        global.eventlistener.on("playAudio",function(name){
            self.play(name)
        })
    },
    play: function (name) {
        if (!this.audios[name]) return;
        cc.audioEngine.play(this.audios[name], false, 1);
    },
    
    stopAll: function () {
        if (!this.audio) return;
        cc.audioEngine.stopAll();
    },
    
    pauseAll: function () {
        if (!this.audio) return;
        cc.audioEngine.pauseAll();
    },
    
    resumeAll: function () {
        if (!this.audio) return;
        cc.audioEngine.resumeAll();
    },
    getVolume:function(){
        cc.audioEngine.getVolume()
    },
    setVolume:function(volume){
        cc.audioEngine.setVolume(volume)
    },
});
