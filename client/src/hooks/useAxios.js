import { useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

const useAxios = () => {
  useEffect(() => {
    api.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        // prettier-ignore
        if (error.response && (error.response.status === 401)) {
          // letter on implement that
        }

        return Promise.reject(error);
      }
    );
  }, [api]);

  return [api];
};

export default useAxios;
