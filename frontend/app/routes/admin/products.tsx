import { redirect } from 'react-router';
import type { Route } from './+types/products';
import axios from 'axios';
import type { User } from 'type';
import { Alert, AlertTitle, AlertDescription } from '~/components/ui/alert';
import { Spinner } from '../../components/ScreenSpinner';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getProducts } from '~/api/products';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {
  PencilIcon,
  Trash2Icon,
  PackagePlus,
  TriangleAlertIcon,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from 'react-router';
import MainLayout from '~/components/layouts/MainLayout';
import { Flex } from '@radix-ui/themes';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const refreshToken = request.headers.get('Cookie');
  if (!refreshToken) return redirect('/login');

  const token = refreshToken.split('=')[1];

  const { data } = await axios.get<User>(
    `${import.meta.env.VITE_BACKEND_URL_DEV}/users/my-profile`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (data.user.role !== 'admin') return redirect('/');
};

const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products', 'admin'],
    queryFn: getProducts,
    staleTime: 5000,
  });

  const handleDeleteProduct = async () => {
    console.log('deleted');
    refetch();
  };

  return (
    <MainLayout>
      <Flex justify={'between'} align={'center'} mb={'7'}>
        <h1 className='text-3xl md:text-4xl font-bold tracking-wide'>
          Products
        </h1>
        <Button asChild>
          <Link to={'/admin/product/new'}>
            <PackagePlus color='#fff' />
            Create Product
          </Link>
        </Button>
      </Flex>

      {/* Products */}
      {error ? (
        <Alert className='bg-destructive dark:bg-destructive/60 border-none text-white'>
          <TriangleAlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription className='text-white/80'>
            Please try again or reload the page.
          </AlertDescription>
        </Alert>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <div className='w-full'>
          <div>
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-transparent border-black'>
                  <TableHead>ID</TableHead>
                  <TableHead>PRODUCT</TableHead>
                  <TableHead>PRICE</TableHead>
                  <TableHead>CATEGORY</TableHead>
                  <TableHead>BRAND</TableHead>
                  <TableHead className='w-0'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow
                    key={product._id}
                    className='has-data-[state=checked]:bg-muted/50 border-black'
                  >
                    <TableCell>{product._id}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <Avatar className='rounded-sm'>
                          <AvatarImage
                            className='object-cover'
                            src={product.image}
                            alt={product.name}
                          />
                          <AvatarFallback className='text-xs'>
                            {product.name}
                          </AvatarFallback>
                        </Avatar>
                        <div className='font-medium'>{product.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className='dirham-symbol inline-block'>
                        &#xea;{' '}
                        <h4 className='font-sans inline-block'>
                          {product.price}
                        </h4>
                      </span>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell className='flex items-center gap-1'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'
                        aria-label={`product-${product._id}-edit`}
                        asChild
                      >
                        <Link to={`product/${product._id}/edit`}>
                          <PencilIcon />
                        </Link>
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'
                        aria-label={`product-${product._id}-remove`}
                        onClick={handleDeleteProduct}
                      >
                        <Trash2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProductsPage;
