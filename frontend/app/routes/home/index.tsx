import ProductCard from '~/components/ProductCard';
import type { Route } from './+types';
import MainLayout from '~/components/layouts/MainLayout';
import { Grid } from '@radix-ui/themes';
import { getProducts, getTopRatedProducts } from '~/api/products';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router';
import PaginationResource from '~/components/Pagination';
import { Spinner } from '~/components/ScreenSpinner';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import ProductsCarousel from '~/components/ProductsCarousel';

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: 'Welcome to PrimeEmirates' },
    {
      name: 'description',
      content: 'Your trusted online marketplace across the UAE.',
    },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const topRatedProducts = await getTopRatedProducts();
    return topRatedProducts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const topRatedProducts = loaderData;
  let [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, search],
    queryFn: () => getProducts(page, search),
  });

  return (
    <MainLayout>
      {!search && <ProductsCarousel topRatedProducts={topRatedProducts} />}
      <div className='flex flex-row justify-between items-center mb-10'>
        <h1 className='text-black text-3xl font-bold md:text-4xl tracking-wide'>
          Latest Products
        </h1>

        {search && (
          <Button asChild>
            <Link to='/'>Go Back</Link>
          </Button>
        )}
      </div>

      {isError && (
        <Alert className='bg-destructive/10 text-destructive border-none max-w-md mx-auto'>
          <TriangleAlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription className='text-destructive/80'>
            Please try again or refresh the page.
          </AlertDescription>
        </Alert>
      )}

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
        <PaginationResource
          totalPages={data?.totalPages}
          currentPage={page}
          search={search}
        />
      ) : null}
    </MainLayout>
  );
};

export default HomePage;
