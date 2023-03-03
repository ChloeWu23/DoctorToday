import axios from "axios";
export default axios.create({
    //baseURL: "https://doctor-today-back.herokuapp.com/",
    baseURL: "http://localhost:3005/",
    header: {
        "Content-type": "application/json"
    }
});