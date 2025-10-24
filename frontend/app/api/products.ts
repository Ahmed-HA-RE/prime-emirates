import { api } from '~/lib/axios';
import type { CreateProduct, Product } from 'type';
import axios from 'axios';

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
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
export const getProduct = async (productId: string): Promise<Product> => {
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

// Create product
export const createProduct = async (productData: FormData) => {
  try {
    const { data } = await api.post('/products', productData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
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
