// pages/search/search.js
import { SearchModel } from "../../models/search.js"
import { random } from "../../utils/randomStr.js"

const searchModel = new SearchModel;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchWord: '',
        more: '',
        loading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const searchWord = options.searchWord;
        this.setData({
            searchWord
        })
        this.getData();
    },

    getData() {
        const searchWord = this.data.searchWord;
        const getArticleList = searchModel.getSearchArticleList(searchWord);
        const getMarkList = searchModel.getSearchArticleRecommend(searchWord);

        Promise.all([getArticleList, getMarkList]).then(res => {

            this.setData({
                articleList: res[0],
                recommend: res[1].recommend,
                tag: res[1].tag,
                tagId: res[1].tagId,
                loading: false
            })
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
        this.setData({
            more: random(20)
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})