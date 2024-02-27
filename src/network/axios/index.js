import axios from "axios";
import {AppConfig} from "../../../appConfig";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";

export const baseURL = AppConfig.Config.BASE_URL;
const cookies = new Cookies();
export const authToken = cookies.get("authToken");

const createEncryptedHash = (text, secretKey) => {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encrypted;
};
const secretKey = "b3ad5950f7c555c664f19c9ec77bbfb943";

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
  if (!config.headers.Authorization) {
    config.headers.Authorization = authToken;
  }
  const plaintext = `${Date.now()}/Cityfurnish@India@123!/${Date.now()}`;
  const apiKey = createEncryptedHash(plaintext, secretKey);
  config.headers.api_key = apiKey;
  return config;
});

export {baseInstance, staticHeaders};
