import axios, { AxiosError } from 'axios';
import { API_REQUEST_TIMEOUT_MS, BACKEND_API_BASE_URL } from '@/lib/api/config';

export type ApiError = AxiosError<{ error?: string; message?: string }>

export const backendApiBaseUrl = BACKEND_API_BASE_URL;

export const api = axios.create({
  baseURL: backendApiBaseUrl || undefined,
  withCredentials: true,
  timeout: API_REQUEST_TIMEOUT_MS,
});
