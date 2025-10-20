import axios from 'axios';
import useUserStore from '~/store/user';

const backendURL = import.meta.env.VITE_BACKEND_URL_DEV;

export const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = useUserStore.getState().accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
