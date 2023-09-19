// cryptoUtils.js
const CryptoJS = require("crypto-js");

// Replace 'YOUR_SECRET_KEY' with your secret key (keep it secure!).
// const secretKey = crypto.randomBytes(32).toString("hex");
const secretKey =
  "43e7526318bdf0ab6678e6715ff47bcbd5c52d573ef23afe256eaf860e707085";

// Function to encrypt data
function encrypt(data) {
  if (data) {
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    // let encryptedData = cipher?.update(data, "utf-8", "hex");
    // encryptedData += cipher?.final("hex");
    return encryptedData;
  }
}

// Function to decrypt data
function decrypt(encryptedData) {
  if (encryptedData) {
    //   const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
    //   let decryptedData = decipher?.update(encryptedData, "hex", "utf-8");
    //   if (decryptedData) {
    //     console.log("iffff");

    //     decryptedData += decipher?.final("utf-8");
    //   }
    //   console.log(decryptedData, "asdsdasdasd", decipher);
    //   return decryptedData;
    // }
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    // console.log(bytes, "asdasdsadasdasdasdasd");
    let decryptedData = "";
    try {
      if (bytes) decryptedData = JSON.parse(bytes?.toString(CryptoJS.enc.Utf8));
    } catch (err) {
      console.warn(err, "err");
    }
    return decryptedData;
  }
}

module.exports = {encrypt, decrypt};
