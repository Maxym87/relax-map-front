import axios from "axios";

const isServer = typeof window === "undefined";
const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://relax-map-back.onrender.com";
const INTERNAL_API_URL = isServer ? EXTERNAL_API_URL : "";

export const nextServer = axios.create({
  baseURL: INTERNAL_API_URL,
  withCredentials: true,
});

export const api = axios.create({
  baseURL: EXTERNAL_API_URL,
  withCredentials: true,
});
