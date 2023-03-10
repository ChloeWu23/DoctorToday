import http from "../http-common";

class DataService {
    get() {
        return http.get("/service");
    }

    create(data) {
        // data.serviceName, description_1, description_2, description_3

        // create new page-index of service category
        const data_pageIndex = {
            "page_title": data.get("serviceName"),
            "url": "/services/" + data.get("serviceName").replace(/ /g,"-").toLowerCase()
        }
        http.post("/page-index", data_pageIndex);

        return http.post("/admin/service", data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    update(data) {
        // data.service_cat_id, 
        // serviceName, description_1, description_2, description_3
        return http.patch("/admin/service", data);
    }

    updateAws(data){
        return http.post("/admin/service/updateAws", data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    delete(data) {
        // data.service_cat_id
        http.get(`/service/getOne/${data.service_cat_id}`)
            .then(res => {
                const service = res.data;
                console.log(service["bind_id"])

                // delete sub-service in this category (by bind_id)
                http.post(`/admin/sub-service/${service["bind_id"]}/deleteAll`)
                    .then(() => {
                        console.log("delete sub-service with cat " + service["bind_id"] + "successfully!")
                    });
        
                // delete page-index
                const data_pageIndex = {
                    "page_title": service["serviceName"]
                }
                http.post("/page-index/deleteService", data_pageIndex)
                    .then(() => {
                        console.log("delete page index with name " + service["serviceName"] + "successfully!")
                    });
            })
            .catch(err => {
                console.log(err)
            });

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