import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lifebridge-2-0.onrender.com/hospital/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Please log in again.");
      window.location.href = "LifeBridgeHospital/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
