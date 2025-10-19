type ApiResponse<T> = {
  success: boolean;
  count?: number;
} & T;

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

export type CartItem = Pick<
  Product,
  '_id' | 'image' | 'name' | 'price' | 'countInStock'
> & {
  quantity: number;
};

export type User = {
  accessToken: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
  };
};

export type getUser = ApiResponse<User>;

export type UserRegisterForm = Omit<
  User['user'],
  'role' | '_id' | 'accessToken'
> & {
  password: string;
};

export type UserLoginForm = Omit<
  User['user'],
  'role' | '_id' | 'accessToken' | 'name'
> & {
  password: string;
};
