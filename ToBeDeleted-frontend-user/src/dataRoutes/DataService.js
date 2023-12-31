import http from "../http-common";

class DataService {
    get() {
        return http.get("/service");
    }

    create(data) {
        // data.serviceName, description_1, description_2, description_3
        return http.post("/admin/service", data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    update(data) {
        // data.service_cat_id, 
        // serviceName, description_1, description_2, description_3
        return http.patch("/admin/service", data);
    }

    delete(data) {
        // data.service_cat_id
        return http.post("/admin/service/deleteService", data);
    }

    swap(data) {
        // data.id_1, id_2
        return http.patch("/admin/service/swap", data)
    }

    sendEmail(data) {
        return http.post("/sendEmail", data);
    }

    sendRegisterEmail(data) {
        return http.post("/sendRegisterEmail", data);
    }
    // deleteService(data){
    //     return http.delete("/admin/service",data);
    // }
}

export default new DataService();