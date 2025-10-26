import ProductCard from '~/components/ProductCard';
import type { Route } from './+types';
import MainLayout from '~/components/layouts/MainLayout';
import { Grid } from '@radix-ui/themes';
import { getProducts } from '~/api/products';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router';
import PaginationResource from '~/components/Pagination';
import { Spinner } from '~/components/ScreenSpinner';

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
  let [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(page),
  });

  return (
    <MainLayout>
      <h1 className='text-black text-3xl font-bold md:text-4xl tracking-wide mb-10'>
        Latest Products
      </h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <Grid
          columns={{ initial: '1', sm: '2', md: '3' }}
          gap={'7'}
          width={'auto'}
          justify={'center'}
        >
          {data?.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      )}

      {data && data?.totalPages > 1 ? (
        <PaginationResource totalPages={data?.totalPages!} currentPage={page} />
      ) : null}
    </MainLayout>
  );
};

export default HomePage;
