import http from "../http-common";

class DataFAQ {
    get() {
        return http.get("/faq");
    }

    create(data) {
        return http.post("/faq", data);
    }

    update(data) {
        return http.patch("/faq", data);
    }

    delete(data) {
        return http.delete("/faq", data);
    }

    swap(data) {
        return http.patch("/faq/swap", data);
    }
}

export default new DataFAQ();