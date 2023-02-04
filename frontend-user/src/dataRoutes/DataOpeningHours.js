import http from "../http-common";

class DataOpeningHours {
    get() {
        return http.get("/opening-hours");
    }

    getDay(day) {
        return http.get(`/opening-hours/${day}`)
    }

    create(data) {
        return http.post("/opening-hours", data);
    }

    update(data) {
        return http.patch("/opening-hours", data);
    }
}

export default new DataOpeningHours();