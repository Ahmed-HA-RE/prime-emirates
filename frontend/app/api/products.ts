import { api } from '~/lib/axios';
import type { CreateProductReviewForm, Product } from 'type';
import axios from 'axios';

type GetProductsResponse = {
  count: number;
  totalPages: number;
  pageNumber: number;
  products: Product[];
};

// Fetch all products
export const getProducts = async (
  currentPage: number = 1
): Promise<GetProductsResponse> => {
  try {
    const { data } = await api.get(`/products?page=${currentPage}`);
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

// Update product
export const updateProduct = async (
  productData: FormData,
  productId: string
) => {
  try {
    const { data } = await api.put(`/products/${productId}`, productData, {
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

// Delete product
export const deleteProduct = async (productId: string) => {
  try {
    const { data } = await api.delete(`/products/${productId}`, {
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

// Create review for a product
export const createProductReview = async (
  productId: string,
  reviewData: CreateProductReviewForm
) => {
  try {
    const { data } = await api.post(
      `/products/${productId}/reviews`,
      reviewData,
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
