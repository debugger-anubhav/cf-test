// cryptoUtils.js
// const CryptoJS = require("crypto-js");
"use client";
import CryptoJS from "crypto-js";
const secretKey =
  "43e7526318bdf0ab6678e6715ff47bcbd5c52d573ef23afe256eaf860e707085";

// Function to encrypt data
export function encrypt(data) {
  if (data) {
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
  }
}

// Function to decrypt data
export function decrypt(encryptedData) {
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    let decryptedData = "";
    try {
      if (bytes) decryptedData = bytes?.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.warn(err, "err");
    }
    return decryptedData;
  }
}
