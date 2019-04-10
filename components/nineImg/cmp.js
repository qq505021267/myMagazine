// components/nineImg/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        mainTitle: String,
        srcArr: Array,
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onImgTap(e) {
            const arr = this.data.srcArr;
            let index = e.currentTarget.dataset.index;
            wx.previewImage({
                urls: arr,
                current: arr[index]
            })
        },
        onLastImgTap() {
            const arr = this.data.srcArr;
            wx.previewImage({
                urls: arr,
                current: arr[8]
            })
        }
    }
})