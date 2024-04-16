export const AppEnv = {
  STG: "STG",
  PROD: "PROD",
};

export const domain = process.env.BASE_URL_DOMAIN;
const appEnv = AppEnv.STG;

const ConfigurationProd = {
  // BASE_URL: "http://43.205.53.146/api/",
  BASE_URL: `${domain}/api/`,
  // BASE_URL: "http://3.6.205.109:4000/api/",
};

const ConfigurationStaging = {
  // BASE_URL: "http://43.205.53.146/api/",
  BASE_URL: `${domain}/api/`,
  // BASE_URL: "http://3.6.205.109:4000/api/",
};

const Config =
  appEnv === AppEnv.PROD ? ConfigurationProd : ConfigurationStaging;

export const AppConfig = {
  appEnv,
  Config,
};

export const cityUrl = "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";

// export const razorpayKeyOwn = "rzp_test_8xqfCdTnoga4Yi";

export const razorpayKeyOwn = process.env.RAZOR_PAY_KEY;
export const razorpayKey = process.env.RAZOR_PAY_KEY;

export const RazorpayThemeColor = "#3E688E";

// export const productImageBaseUrl =
//   "https://d3juy0zp6vqec8.cloudfront.net/images/product/thumb/";

// export const categoryImageBaseUrl =
//   "https://d3juy0zp6vqec8.cloudfront.net/images/category/";
export const BASEURL = `${domain}/api/`;
