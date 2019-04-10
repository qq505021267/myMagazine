// components/tag/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tag: String,
        typeId: Number
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
        onTap() {
            const typeId = this.properties.typeId;
            if (typeId == 3) {
                wx.navigateTo({
                    url: `/pages/type/type?typeId=${typeId}`
                })
            } else {
                wx.showToast({
                    title: `暂只支持读书标签`,
                    icon: `none`,
                    duration: 1000,
                    mask: true
                })
            }

        }
    }
})