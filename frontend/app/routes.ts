import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  route('/product/:productId', 'routes/product/index.tsx'),
  route('/cart', 'routes/cart/index.tsx'),
  route('/checkout/shipping', 'routes/checkout/shipping.tsx'),
  route('/checkout/payment', 'routes/checkout/payment.tsx'),
  route('/checkout/placeOrder', 'routes/checkout/placeOrder.tsx'),
  route('/order/:id', 'routes/order/index.tsx'),
  route('/register', 'routes/auth/register.tsx'),
  route('/login', 'routes/auth/login.tsx'),
  route('/profile', 'routes/user/index.tsx'),
] satisfies RouteConfig;
