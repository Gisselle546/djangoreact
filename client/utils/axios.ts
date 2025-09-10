import axios from "axios";
import { removeSessionValue, getSessionValue } from "./storage";
import { toast } from "react-toastify";

export const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

const customFetch = axios.create({
  baseURL: isProduction()
    ? "https://djangoreact-production.up.railway.app/"
    : "http://127.0.0.1:8000",
});

customFetch.interceptors.request.use((config: any) => {
  const user = getSessionValue("token");
  if (user) {
    config.headers["Authorization"] = `Bearer ${user}`;
  }

  return config;
});

customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeSessionValue("token"); // or whatever function you use to remove the token from storage
      toast.warning("Session timed out, please sign back in");
      window.location.replace("/signin");
    }
    return Promise.reject(error);
  }
);

export default customFetch;
