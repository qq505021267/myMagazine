class SubscribeModel {

    setMyTagList(value) {
        wx.setStorageSync('markTagList', value);
    }

    getMyTagList() {
        return wx.getStorageSync('markTagList') || [];
    }

    removeMyTagList(tagId) {
        const myTagList = this.getMyTagList();
        myTagList.forEach((item, index) => {
            if (item.tagId == tagId) {
                myTagList.splice(index, 1)
            }
        })
        this.setMyTagList(myTagList);
    }
}

export { SubscribeModel }