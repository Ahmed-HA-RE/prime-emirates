import ProductCard from '~/components/ProductCard';
import type { Route } from './+types';
import MainLayout from '~/components/layouts/MainLayout';
import { Grid } from '@radix-ui/themes';
import products from '../../products.json';
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'PrimeEmirates | Home' },
    {
      name: 'description',
      content: 'Your trusted online marketplace across the UAE.',
    },
  ];
}

const HomePage = () => {
  return (
    <MainLayout>
      <h1 className='text-black text-3xl font-bold md:text-4xl tracking-wide mb-10'>
        Latest Products
      </h1>
      <Grid
        columns={{ initial: '1', sm: '2', md: '3' }}
        gap={'7'}
        width={'auto'}
        align={'center'}
        justify={'center'}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </MainLayout>
  );
};

export default HomePage;
