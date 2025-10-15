import { api } from '~/lib/axios';
import type { getProductList, getProductsList } from 'type';
import axios from 'axios';

// Fetch all products
export const getProducts = async (): Promise<getProductsList> => {
  try {
    const { data } = await api.get('/products');
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message;
    }

    throw new Error(message);
  }
};

// Fetch single product
export const getProduct = async (
  productId: string
): Promise<getProductList> => {
  try {
    const { data } = await api.get(`/products/${productId}`);
    return data;
  } catch (error) {
    let message = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message;
    }

    throw new Error(message);
  }
};
