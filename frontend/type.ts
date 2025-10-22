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

export type Shipping = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Order = {
  user: string;
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
  paymentResults: {
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
};

export type PlaceOrder = Omit<
  Order,
  'paymentResults' | 'isPaid' | 'isDelivered' | 'deliveredAt' | 'user'
>;
