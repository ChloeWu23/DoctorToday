import http from "../http-common";

class DataSubService {
    get(cat_id) {
        return http.get(`/service/${cat_id}`);
    }

    create(cat_id, data) {
        return http.post(`/admin/sub-service/${cat_id}`, data);
    }

    update(cat_id, data) {
        return http.patch(`/admin/sub-service/${cat_id}`, data);
    }

    delete(cat_id, data) {
        return http.post(`/admin/sub-service/${cat_id}/delete`, data);
    }

    swap(cat_id, data) {
        return http.patch(`/admin/sub-service/${cat_id}/swap`, data);
    }
    
}

export default new DataSubService();