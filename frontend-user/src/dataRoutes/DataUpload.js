import http from "../http-common";

class DataUpload {
    upload(data) {
        return http.post("/upload", data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
}

export default new DataUpload();