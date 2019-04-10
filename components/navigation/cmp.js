// components/navigation/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        magazineTypeArr: ["轻芒", "兴趣", "物质", "世界", "新事", "灵魂"],
        magazineActive: 0,
        magazineId: "magazine0"
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(e) {
            const index = e.currentTarget.dataset.index;
            this.setData({
                magazineActive: index,
                magazineId: `magazine${index == 0 ? '0' : index - 1}`
            });

            this.triggerEvent('navigation', {
                index
            })
        }
    }
})