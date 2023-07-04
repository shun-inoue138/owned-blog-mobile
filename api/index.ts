import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const localUrl = "http://localhost:3005/";

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return "";
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
  config.headers["Authorization"] = `bearer ${await getToken()}`;
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
  config.headers["Authorization"] = `bearer ${await getToken()}`;
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
