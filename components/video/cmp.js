// components/video/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        videoSrc: String,
        poster: String,
        mainTitle: String,
        duration: String,
        videoId: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        showPoster: true
    },

    attached() {
        this._getVideoInfo();
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onVideoPlayTap() {
            this._toggileVideoPoster();
            this.video.play();
        },
        onMaskTap() {
            this._toggileVideoPoster();
            this.video.stop();
        },
        onVideoEnded() {
            this._toggileVideoPoster();
        },
        _toggileVideoPoster() {
            this.setData({
                showPoster: !this.data.showPoster
            });
        },

        _getVideoInfo() {
            const id = this.properties.videoId;
            this.video = wx.createVideoContext(id, this);
        },

    }
})