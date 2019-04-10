import { Request } from "../utils/request.js";


class SearchModel extends Request {
    getSearchArticleList(value, start = 0) {
        return this.getData({
            url: `/searchArticleList/${value}/${start}`
        })
    }

    getSearchArticleRecommend(value) {
        return this.getData({
            url: `/searchArticleRecommend/${value}`
        })
    }
}

export { SearchModel }