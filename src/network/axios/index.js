import axios from "axios";
import {AppConfig} from "../../../appConfig";

export const baseURL = AppConfig.Config.BASE_URL;

const staticHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
});

const baseInstance = axios.create({
  baseURL,
});
// const fetchedToken = localStorage.getItem("token");
const fetchedToken = "abcdjdyhsi";
const token = fetchedToken || null;

baseInstance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export {baseInstance, staticHeaders};
