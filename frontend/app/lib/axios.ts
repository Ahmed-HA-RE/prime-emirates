import axios from 'axios';
import useUserStore from '~/store/user';
import { refreshToken } from '~/api/users';

const backendURL = import.meta.env.VITE_BACKEND_URL_PROD;

export const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = useUserStore.getState().accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const setUser = useUserStore.getState().setUser;
    const setAccessToken = useUserStore.getState().setAccessToken;
    if (
      error.response.status === 401 &&
      error.response.data.message ===
        'Your session has expired. Please log in again to continue.' &&
      !config._retry
    ) {
      config._retry = true;
      const newToken = await refreshToken();
      setUser(newToken.user);
      setAccessToken(newToken.accessToken);
      config.headers.Authorization = `Bearer ${newToken.accessToken}`;
      return api(config);
    }
    return Promise.reject(error);
  }
);
