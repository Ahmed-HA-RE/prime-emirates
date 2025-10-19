import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  route('/product/:productId', 'routes/products/index.tsx'),
  route('/cart', 'routes/cart/index.tsx'),
  route('/register', 'routes/auth/register.tsx'),
] satisfies RouteConfig;
