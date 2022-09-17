import queryString from "query-string";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //Handle Error

    if (error.response.status === "unauthorise") {
      return (window.location = "/logout");
    }

    if (error.response.data.error.name === "TokenExpiredError") {
      return (window.location = "/logout");
    }

    return Promise.reject(error.response || error.message);
  }
);

export default axiosClient;
