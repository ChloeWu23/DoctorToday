import http from "../http-common";

class DataTraval {
    get() {
        return http.get("/travel");
    }
}

export default new DataTraval();