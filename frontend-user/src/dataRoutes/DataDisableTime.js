import http from "../http-common";

class DataDisableTime {
    get() {
        return http.get("/disable-time-slot");
    }

    create(data) {
        return http.post("/disable-time-slot", data);
    }

    delete(data) {
        return http.delete("/disable-time-slot", data);
    }
}

export default new DataDisableTime();