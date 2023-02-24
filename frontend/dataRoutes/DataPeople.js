import http from "../http-common";

class DataPeople {
    get() {
        return http.get("/people");
    }

    create(data) {
        return http.post("/people", data);
    }

    update(data) {
        return http.patch("/people", data);
    }

    delete(data) {
        return http.post("/people/delete", data);
    }

    swap(data) {
        return http.patch("/people/swap", data);
    }
}

export default new DataPeople();