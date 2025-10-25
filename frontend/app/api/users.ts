import { api } from '~/lib/axios';
import type {
  UserRegisterForm,
  UserLoginForm,
  User,
  UserUpdateForm,
  UserForAdmin,
  UpdateUserAsAdmin,
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

// Get all users data (Admin)
export const getUsers = async (): Promise<UserForAdmin[]> => {
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

// Get single user data (Admin)
export const getUser = async (userId: string): Promise<UserForAdmin> => {
  try {
    const { data } = await api.get(`/users/${userId}`, {
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

// Update user's data (Admin)
export const updateUserAsAdmin = async (
  userId: string,
  updateUserAsAdminData: UpdateUserAsAdmin
): Promise<UserForAdmin> => {
  try {
    const { data } = await api.put(`/users/${userId}`, updateUserAsAdminData, {
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

// Delete user (Admin)
export const deleteUserAsAdmin = async (userId: string) => {
  try {
    const { data } = await api.delete(`/users/${userId}`, {
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
