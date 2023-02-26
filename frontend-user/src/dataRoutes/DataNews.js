import http from "../http-common";

class DataNews {
    get() {
        return http.get("/news");
    }

    create(data) {
        return http.post("/news", data);
    }

    update(data) {
        return http.patch("/news", data);
    }

    delete(data) {
        return http.post("/news/delete", data);
    }

    swap(data) {
        return http.patch("/news/swap", data);
    }
}

export default new DataNews();