type ApiResponse<T> = {
  success: boolean;
  count?: number;
  data: T;
};

export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type getProductsList = ApiResponse<Product[]>;
export type getProductList = ApiResponse<Product>;
