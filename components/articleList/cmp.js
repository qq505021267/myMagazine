// components/articleList/cmp.js
import { IndexModel } from "../../models/index.js"
import { SearchModel } from "../../models/search.js"
const searchModel = new SearchModel
const indexModel = new IndexModel

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        articleList: Array,
        more: {
            type: String,
            value: '',
            observer: "loadMore"
        },

        magazineId: {
            type: Number,
            value: 0,
            observer: "refresh"
        },

        searchWord: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        noMoreData: false
    },


    attached() {
        const curPages = getCurrentPages();
        const index = curPages.length - 1;
        let type = '';

        if (curPages[index].route === 'pages/search/search') {
            type = 'search';
        } else {
            type = 'index';
        }

        this.setData({
            type
        })

    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore() {

            if (this._isLoadLock() || this.data.noMoreData) {
                return
            };

            this._loadLock();

            this._getMoreData();
        },

        _getMoreData() {
            const start = this.data.articleList.length;
            let getMore = null;

            if (this.data.type == 'search') {
                const searchWord = this.data.searchWord;

                getMore = searchModel.getSearchArticleList(searchWord, start)
            } else {
                const magazineId = this.data.magazineId;

                getMore = indexModel.getArticleList(magazineId, start)
            }
            getMore.then(res => {
                this._setMoreData(res);
                this._unLoadLock();
                console.log(res);
            })
        },

        _isLoadLock() {
            return this.data.loading
        },

        _loadLock() {
            this.setData({
                loading: true
            })
        },

        _unLoadLock() {
            this.setData({
                loading: false
            })
        },

        _setMoreData(list) {
            const articleList = this.data.articleList;
            const combineList = articleList.concat(list);
            if (combineList.length == articleList.length) {
                this.setData({
                    noMoreData: true
                })
                return
            }
            this.setData({
                articleList: combineList
            })
        },

        refresh() {
            this.setData({
                noMoreData: false
            });

            wx.pageScrollTo({
                scrollTop: 0
            })

        }
    }
})