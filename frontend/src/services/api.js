import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-crop-advisory-backend-uf4r.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
