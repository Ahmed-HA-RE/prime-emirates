import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  route('/product/:id', 'routes/products/index.tsx'),
] satisfies RouteConfig;
