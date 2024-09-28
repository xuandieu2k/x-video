import axios from "axios";
import { ApiBaseConfig } from "./ApiConfig";

const axiosClient = axios.create({
  baseURL: ApiBaseConfig.API_URL,
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
  timeout: 30000
});

axiosClient.interceptors.request.use(
  (config) => {
    if (config.headers.ProjectId) {
      config.headers.ProjectId = config.headers.ProjectId;
    }
    if (config.headers.Authorization) {
      config.headers.Authorization = config.headers.Authorization;
    }
    return config;
  },
  function error() {
    return Promise.reject(error);
  }
);

export default axiosClient;