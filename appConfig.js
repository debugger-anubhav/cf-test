export const AppEnv = {
  STG: "STG",
  PROD: "PROD",
};

const appEnv = AppEnv.STG;

const ConfigurationProd = {
  BASE_URL: "https://test.rentofurniture.com/api/",
  // BASE_URL: "http://3.6.205.109:4000/api/",
};

const ConfigurationStaging = {
  BASE_URL: "https://test.rentofurniture.com/api/",
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
export const razorpayKeyOwn = "rzp_test_kWnrtCXOsb1s57";
export const razorpayKey = "rzp_test_kWnrtCXOsb1s57";

export const RazorpayThemeColor = "#3E688E";

// export const productImageBaseUrl =
//   "https://d3juy0zp6vqec8.cloudfront.net/images/product/thumb/";

// export const categoryImageBaseUrl =
//   "https://d3juy0zp6vqec8.cloudfront.net/images/category/";
