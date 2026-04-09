import axios from "axios";
import {
  API_REQUEST_TIMEOUT_MS,
  APP_BASE_URL,
  BACKEND_API_BASE_URL,
} from "./config";

export const nextServer = axios.create({
  baseURL: typeof window !== "undefined" ? undefined : APP_BASE_URL || undefined,
  withCredentials: true,
  timeout: API_REQUEST_TIMEOUT_MS,
});

export const api = axios.create({
  baseURL: typeof window !== "undefined" ? "/api" : BACKEND_API_BASE_URL || undefined,
  withCredentials: true,
  timeout: API_REQUEST_TIMEOUT_MS,
});
