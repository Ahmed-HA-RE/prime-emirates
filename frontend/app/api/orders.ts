import type { PlaceOrder, Order } from 'type';
import { api } from '~/lib/axios';
import axios from 'axios';

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
