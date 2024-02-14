import axios from "axios";
import {AppConfig} from "../../../appConfig";
import Cookies from "universal-cookie";

export const baseURL = AppConfig.Config.BASE_URL;
const cookies = new Cookies();
export const authToken = cookies.get("authToken");

const staticHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
});

const baseInstance = axios.create({
  baseURL,
});
// const fetchedToken = "abcdjdyhsi";
// const token = fetchedToken || null;

baseInstance.interceptors.request.use(config => {
  config.headers.Authorization = authToken;
  return config;
});

export {baseInstance, staticHeaders};
