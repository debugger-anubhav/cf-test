export const AppEnv = {
  STG: "STG",
  PROD: "PROD",
};

const appEnv = AppEnv.STG;

const ConfigurationProd = {
  BASE_URL: "http://3.109.156.217:4000/api/",
  // BASE_URL: "http://3.6.205.109:4000/api/",
};

const ConfigurationStaging = {
  BASE_URL: "http://3.109.156.217:4000/api/",
  // BASE_URL: "http://3.6.205.109:4000/api/",
};

const Config =
  appEnv === AppEnv.PROD ? ConfigurationProd : ConfigurationStaging;

export const AppConfig = {
  appEnv,
  Config,
};

export const cityUrl = "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";

// export const productImageBaseUrl =
//   "https://d3juy0zp6vqec8.cloudfront.net/images/product/thumb/";

// export const categoryImageBaseUrl =
//   "https://d3juy0zp6vqec8.cloudfront.net/images/category/";
