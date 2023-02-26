import http from "../http-common";

class DataOtherInfo {
    get(data) {
        return http.get("/other-info", data);
    }

    login(data) {
        return http.post("/other-info/login", data);
    }

}

export default new DataOtherInfo();