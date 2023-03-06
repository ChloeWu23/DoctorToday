import http from "../http-common";

class DataPageIndex {
    getAll() {
        return http.get("/page-index");
    }

    getOne(id) {
        return http.get(`/page-index/${id}`);
    }

    create(data) {
        return http.post("/page-index", data); 
    }
    
    delete(data) {
        return http.post("/page-index/delete", data);
    }

}

export default new DataPageIndex();