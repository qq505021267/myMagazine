class LikeModel {
    getLikeList() {
        return wx.getStorageSync("like") || [];
    }

    setLikeList(value) {
        wx.setStorageSync("like", value);
    }

    addLikeList(articleDetail) {
        const likeList = this.getLikeList();

        likeList.unshift(articleDetail);

        this.setLikeList(likeList);
    }

    romoveLikeList(artId) {
        const likeList = this.getLikeList();
        let myIndex = 0

        likeList.forEach((item, index) => {
            if (item.artId == artId) {
                likeList.splice(index, 1);
            }
        })

        this.setLikeList(likeList);
    }

    getLikeStatus(artId) {
        const likeList = this.getLikeList();
        let likeStatus = false;

        likeList.forEach((item, index) => {
            if (item.artId == artId) {
                likeStatus = true
            }
        })
        return likeStatus
    }

}

export { LikeModel }