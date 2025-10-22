import type { PlaceOrder, Order } from 'type';
import { api } from '~/lib/axios';
import axios from 'axios';

export const createOrders = async (
  orderItems: PlaceOrder
): Promise<Order[]> => {
  try {
    const { data } = await api.post('/orders', orderItems, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (error instanceof axios.AxiosError) {
      message = error.response?.data?.message;
    }

    throw new Error(message);
  }
};
