// pages/mark/mark.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: {},
        likeList: []
    },

    getMyLike() {
        const likeList = wx.getStorageSync('like') || [];

        this.setData({
            likeList
        })
    },

    onGetUserInfo(e) {
        const userInfo = e.detail.userInfo;
        if (userInfo) {
            this.setData({
                userInfo: e.detail.userInfo,
                authorized: true
            })
            this.getMyLike();
        }
    },

    userAuthorized() {
        wx.getSetting({
            success: res => {
                if (res.authSetting["scope.userInfo"]) {
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                userInfo: res.userInfo,
                                authorized: true
                            })
                            this.getMyLike();
                        }
                    })

                }
            }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        this.userAuthorized();
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