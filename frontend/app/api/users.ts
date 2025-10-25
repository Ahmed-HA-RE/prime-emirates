import { api } from '~/lib/axios';
import type {
  UserRegisterForm,
  UserLoginForm,
  User,
  UserUpdateForm,
  Users,
} from 'type';
import axios from 'axios';

// Register user
export const registerUser = async (
  credentials: UserRegisterForm
): Promise<User> => {
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
export const loginUser = async (credentials: UserLoginForm): Promise<User> => {
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

// Refresh accessToken
export const refreshToken = async (): Promise<User> => {
  try {
    const { data } = await api.post(
      '/users/refresh',
      {},
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message;
    }

    throw new Error(message);
  }
};

// Get user's profile data
export const getUserProfile = async (): Promise<User> => {
  try {
    const { data } = await api.get('/users/my-profile', {
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

// Update user's profile data
export const updateUserProfile = async (
  credentials: UserUpdateForm
): Promise<User> => {
  try {
    const { data } = await api.put('/users/my-profile', credentials, {
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

// Get all users data
export const getUsers = async (): Promise<Users[]> => {
  try {
    const { data } = await api.get('/users', {
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
