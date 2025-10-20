import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  route('/product/:productId', 'routes/product/index.tsx'),
  route('/cart', 'routes/cart/index.tsx'),
  route('/shipping', 'routes/shipping/index.tsx'),
  route('/register', 'routes/auth/register.tsx'),
  route('/login', 'routes/auth/login.tsx'),
] satisfies RouteConfig;
