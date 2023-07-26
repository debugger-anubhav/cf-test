export const AppEnv = {
  STG: "STG",
  PROD: "PROD",
};

const appEnv = AppEnv.STG;

const ConfigurationProd = {
  BASE_URL: "http://3.6.205.109:4000/api/",
};

const ConfigurationStaging = {
  BASE_URL: "http://3.6.205.109:4000/api/",
};

const Config =
  appEnv === AppEnv.PROD ? ConfigurationProd : ConfigurationStaging;

export const AppConfig = {
  appEnv,
  Config,
};
