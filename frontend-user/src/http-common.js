import axios from "axios";
export default axios.create({
    baseURL: "https://doctor-today-back.herokuapp.com/",
    header: {
        "Content-type": "application/json"
    }
});