import { api } from '~/lib/axios';
import type { UserRegisterForm, UserLoginForm, getUser } from 'type';
import axios from 'axios';

// Register user
export const registerUser = async (
  credentials: UserRegisterForm
): Promise<getUser> => {
  try {
    const { data } = await api.post('/users', credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message;
    }

    throw new Error(message);
  }
};

// Login user
export const LoginUser = async (
  credentials: UserLoginForm
): Promise<getUser> => {
  try {
    const { data } = await api.post('/users/login', credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message;
    }

    throw new Error(message);
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.post(
      '/users/logout',
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    let message = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message;
    }

    throw new Error(message);
  }
};
