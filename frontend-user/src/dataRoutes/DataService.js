import http from "../http-common";

class DataService {
    get() {
        return http.get("/service");
    }

    create(data) {
        // data.serviceName, description_1, description_2, description_3
        return http.post("/admin/service", data);
    }

    update(data) {
        // data.service_cat_id, 
        // serviceName, description_1, description_2, description_3
        return http.patch("/admin/service", data);
    }

    delete(data) {
        // data.service_cat_id
        return http.delete("/admin/service", data);
    }

    swap(data) {
        // data.id_1, id_2
        return http.patch("/admin/service/swap", data)
    }

    sendEmail(data) {
        return http.post("/sendEmail", data);
    }

    // deleteService(data){
    //     return http.delete("/admin/service",data);
    // }
}

export default new DataService();