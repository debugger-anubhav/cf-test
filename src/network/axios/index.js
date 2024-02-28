import axios from "axios";
import {AppConfig} from "../../../appConfig";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

export const baseURL = AppConfig.Config.BASE_URL;
const cookies = new Cookies();
export const authToken = cookies.get("authToken");

const createEncryptedHash = (text, secretKey) => {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encrypted;
};

const staticHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
});

const baseInstance = axios.create({
  baseURL,
});

console.log("env", process.env.NOODE_ENV);

dotenv.config({
  path: `../../../.env.${process.env.NODE_ENV}`,
});

const mySecretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

console.log("secret key", mySecretKey);

baseInstance.interceptors.request.use(config => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = authToken;
  }
  const plaintext = `${Date.now()}/Cityfurnish@India@123!/${Date.now()}`;
  const apiKey = createEncryptedHash(plaintext, mySecretKey);
  config.headers.Apikey = apiKey;
  return config;
});

export {baseInstance, staticHeaders};
