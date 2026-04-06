import axios from 'axios';

export const nextServer = axios.create({
  baseURL: 'https://relax-map-back.onrender.com/api',
  withCredentials: true,
});
