import ProductCard from '~/components/ProductCard';
import type { Route } from './+types';
import MainLayout from '~/components/layouts/MainLayout';
import { Grid } from '@radix-ui/themes';
import { getProducts } from '~/api/products';
import { useQuery } from '@tanstack/react-query';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'PrimeEmirates | Home' },
    {
      name: 'description',
      content: 'Your trusted online marketplace across the UAE.',
    },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const data = await getProducts();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const data = loaderData;
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: data,
  });

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
        {products.data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </MainLayout>
  );
};

export default HomePage;
