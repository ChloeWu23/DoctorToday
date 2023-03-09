import http from "../http-common";

class DataPeople {
    get() {
        return http.get("/people");
    }

    create(data) {
        return http.post("/people", data);
    }

    // , {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    // }

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