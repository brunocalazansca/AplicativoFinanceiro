import axios from "axios";
import Constants from "expo-constants";
import { getToken, clearToken } from "./authToken";

const API_URL =
    (Constants.expoConfig?.extra?.API_URL as string | undefined) ??
    (Constants.manifest2 as any)?.extra?.API_URL ??
    "http://10.0.2.2:8081/api";

export const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;

        if (status === 401) {
            await clearToken();
        }

        return Promise.reject(error);
    },
);
