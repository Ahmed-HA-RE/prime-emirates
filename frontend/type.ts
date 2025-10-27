export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  countInStock: number;
  reviews: {
    name: string;
    rating: number;
    comment: string;
    user: string;
    createdAt: string;
  }[];
  numReviews: number;
};

export type CreateProduct = Omit<
  Product,
  '_id' | 'reviews' | 'numReviews' | 'reviews' | 'image' | 'rating'
>;

export type UpdateProduct = Partial<CreateProduct>;

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

export type UserForAdmin = {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
};

export type UpdateUserAsAdmin = Partial<Omit<UserForAdmin, '_id'>>;

export type UserRegisterForm = Omit<
  User['user'],
  'role' | '_id' | 'accessToken'
> & {
  password: string;
  confirmPassword: string;
};

export type UserLoginForm = Omit<
  User['user'],
  'role' | '_id' | 'accessToken' | 'name'
> & {
  password: string;
};

export type UserUpdateForm = {
  email?: string;
  name?: string;
  password?: string;
};

export type Shipping = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Order = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: {
    name: string;
    price: number;
    qty: number;
    image: string;
    product: string;
  }[];

  shipping: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };

  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: string;
  createdAt?: string;
};

export type PlaceOrder = Omit<
  Order,
  | 'paymentResult'
  | 'isPaid'
  | 'isDelivered'
  | 'deliveredAt'
  | 'user'
  | '_id'
  | 'itemsPrice'
  | 'taxPrice'
  | 'shippingPrice'
  | 'totalPrice'
>;

export type PayPalDetailsRes = {
  id?: string;
  email_address?: string;
  status?: string;
  update_time?: string;
};

export type ProductReview = {
  name: string;
  user: string;
  rating: number;
  comment: string;
};

export type CreateProductReviewForm = Pick<ProductReview, 'rating' | 'comment'>;
