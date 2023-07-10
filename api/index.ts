import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { COMPANY_URL } from "@env";
import { HOME_URL } from "@env";

//会社or自宅ののIPアドレス
const localUrl = HOME_URL;

//デバッグ用にexportしている
export const getToken = async () => {
  let token: string | null;
  try {
    token = await SecureStore.getItemAsync("token");
  } catch (error) {
    //tokenが存在しない時同様にエラー発生時もnullを格納する
    token = null;
  }
  if (token) {
    return token;
  } else {
    return null;
  }
};

export const api = axios.create({
  baseURL: localUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiWithFile = axios.create({
  baseURL: localUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  console.log(token);

  token && (config.headers["Authorization"] = `bearer ${token}`);
  config.headers["Content-Type"] = "application/json";
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiWithFile.interceptors.request.use(async (config) => {
  const token = await getToken();
  console.log(token);
  token && (config.headers["Authorization"] = `bearer ${token}`);
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});

apiWithFile.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
