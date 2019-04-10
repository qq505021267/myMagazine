// components/subscribe/cmp.js

import { SubscribeModel } from "../../models/subscribe.js"

const subscribeModel = new SubscribeModel;

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tag: String,
        tagId: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        subscribed: false
    },

    attached() {
        this.judgeTag();
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onTap() {

            const mark = {
                tag: this.data.tag,
                tagId: this.data.tagId
            };

            this._traggerSubscribed();
            if (this.data.subscribed) {
                // 存

                const markTagList = subscribeModel.getMyTagList();
                markTagList.push(mark);

                subscribeModel.setMyTagList(markTagList);

            } else {
                // 删
                subscribeModel.removeMyTagList(mark.tagId);
            }

            this.triggerEvent('tap')
        },

        _traggerSubscribed() {
            const subscribed = !this.data.subscribed;

            this.setData({
                subscribed
            })
        },

        judgeTag() {
            const MyTagList = subscribeModel.getMyTagList();
            const tagId = this.data.tagId;
            MyTagList.forEach((item, index) => {
                if (item.tagId == tagId) {
                    this.setData({
                        subscribed: true
                    })
                }
            })
        }
    }
})