import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7139/api/"
})

export default api;
