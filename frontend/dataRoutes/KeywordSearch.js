import http from "../http-common";

class KeywordSearch {
    get() {
        console.log("triggering keyword search");
        return http.get("/keywordSearch");
    }
}

export default new KeywordSearch();