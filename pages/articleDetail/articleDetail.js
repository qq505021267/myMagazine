// pages/articleDetail/articleDetail.js

let request = require('../../tools/request');

let audio = wx.getBackgroundAudioManager();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        progressWidth: 520,
        play: false,
        audioPlay: false,
        currentTime: 0,
        // circleLeft: 0,
        percent: 0,
        getAudioCircleStartLeft: false
    },

    audioPlay: function() {
        audio.title = this.data.articleDetail.audio.audioTitle;
        audio.src = this.data.articleDetail.audio.src;

        this.listenAudioPlay();
        this.upDateAudioData();

    },

    onAudioPlayTap: function() {
        let audioPlay = this.data.audioPlay;

        if (audioPlay) {
            audio.pause();
        } else {
            this.audioPlay();
        };


    },

    listenAudioPlay: function() {
        let _this = this;
        audio.onPlay(function() {
            _this.setData({
                audioPlay: true
            })
        });

        audio.onPause(function() {
            _this.setData({
                audioPlay: false
            })
        });

        audio.onStop(function() {
            _this.setData({
                audioPlay: false
            })
        });

        audio.onEnded(function() {
            _this.setData({
                audioPlay: false
            })
        })
    },

    upDateAudioData: function() {
        let _this = this;
        let duration = this.data.articleDetail.audio.duration;
        let progressWidth = this.data.progressWidth;
        audio.onTimeUpdate(function() {
            let currentTime = audio.currentTime.toFixed();
            let percent = currentTime / duration * 100;
            // let circleLeft = percent * progressWidth;
            _this.setData({
                currentTime: currentTime,
                percent: percent,
                // circleLeft: circleLeft
            });
        });
    },

    onPlayTap: function() {
        this.setData({
            play: true
        });
        let myVideo = wx.createVideoContext('myVideo')
        myVideo.play();
    },

    circleStart: function(e) {
        let left = e.touches[0].clientX * this.data.switchRpx;

        if (!this.data.getAudioCircleStartLeft) {
            this.setData({
                circleStartLeft: left,
                getAudioCircleStartLeft: true
            })
        }


    },

    circleMove: function(e) {
        let progressWidth = this.data.progressWidth;
        let switchRpx = this.data.switchRpx;
        let startLeft = this.data.circleStartLeft;
        let lastLeft = e.changedTouches[0].clientX * switchRpx;
        let percent = (lastLeft - startLeft) / progressWidth * 100;

        if (percent <= 0) {
            percent = 0
        } else if (percent >= 100) {
            percent = 100
        }

        let audioCurrentTime = (percent / 100 * this.data.articleDetail.audio.duration).toFixed();

        this.audioPlay();

        audio.seek(Number(audioCurrentTime));


        this.setData({
            percent: percent,
            currentTime: audioCurrentTime
        })

        // let left = lastLeft - startLeft;
        // if (left <= 0) {
        //     left = 0
        // } else if (left >= progressWidth) {
        //     left = progressWidth
        // }

        // this.setData({
        //     circleLeft: left
        // })


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getHomeData(options.titleId);
        this.getPhoneWidth();

    },

    getPhoneWidth: function() {
        let _this = this
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    switchRpx: 750 / res.screenWidth
                })
            },
        });
    },

    getHomeData: function(titleId) {
        let _this = this;
        request({
            url: `/getArticleDetail/${titleId}`,
            success: function(res) {
                _this.setData({
                    articleDetail: res
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})