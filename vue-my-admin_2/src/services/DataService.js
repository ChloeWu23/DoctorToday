import http from "../http-common";

class DataService {
    get() {
        return http.get("/test");
    }

    creaete(data) {
        return http.post("/admin", data);
    }
}

export default new DataService();