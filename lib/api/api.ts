import axios from "axios";

const API_URL = process.env.API_URL;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const backendServer = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

const nextServer = axios.create({
  baseURL: `${NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

export { backendServer, nextServer };
