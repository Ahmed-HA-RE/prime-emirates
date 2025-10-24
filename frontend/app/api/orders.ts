import type { PlaceOrder, Order } from 'type';
import { api } from '~/lib/axios';
import axios from 'axios';
import type { PayPalDetailsRes } from 'type';

export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await api.get('/orders', {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (error instanceof axios.AxiosError) {
      message = error.response?.data?.message;
    }

    throw new Error(message);
  }
};

export const getOrder = async (id: string | undefined): Promise<Order> => {
  try {
    const { data } = await api.get(`/orders/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (error instanceof axios.AxiosError) {
      message = error.response?.data?.message;
    }

    throw new Error(message);
  }
};

export const createOrders = async (orderItems: PlaceOrder): Promise<Order> => {
  try {
    const { data } = await api.post('/orders', orderItems, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (error instanceof axios.AxiosError) {
      message = error.response?.data?.message;
    }

    throw new Error(message);
  }
};

export const updateOrderToPaid = async (
  id: string,
  paymentResults: PayPalDetailsRes
): Promise<Order> => {
  try {
    const { data } = await api.put(`/orders/${id}/pay`, paymentResults, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (error instanceof axios.AxiosError) {
      message = error.response?.data?.message;
    }

    throw new Error(message);
  }
};

export const getUserOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await api.get('/orders/my-orders', {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (error instanceof axios.AxiosError) {
      message = error.response?.data?.message;
    }

    throw new Error(message);
  }
};

export const updateOrderToDelivered = async (id: string): Promise<Order> => {
  try {
    const { data } = await api.put(`/orders/${id}/deliver`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (error instanceof axios.AxiosError) {
      message = error.response?.data?.message;
    }

    throw new Error(message);
  }
};
