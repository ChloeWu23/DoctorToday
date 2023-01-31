import http from "../http-common";

class DataService {
    get() {
        return http.get("/service");
    }

    creaete(data) {
        return http.post("/admin/service", data);
    }

    sendEmail(data) {
        return http.post("/sendEmail", data);
    }

    // deleteService(data){
    //     return http.delete("/admin/service",data);
    // }
}

export default new DataService();