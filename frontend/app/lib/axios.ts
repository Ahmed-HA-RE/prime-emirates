import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL_DEV;

export const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});
