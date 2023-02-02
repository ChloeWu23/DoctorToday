import http from "../http-common";

class DataOtherInfo {
    get(data) {
        return http.get("/other-info", data);
    }

}

export default new DataOtherInfo();