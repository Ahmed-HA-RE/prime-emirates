import { redirect } from 'react-router';
import type { Route } from './+types/products';
import axios from 'axios';
import type { User } from 'type';
import { Alert, AlertTitle, AlertDescription } from '~/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import { Spinner } from '../../components/ScreenSpinner';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct, getProducts } from '~/api/products';
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
import { useState } from 'react';
import { toast } from 'sonner';

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
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState('');

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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      toast.success('Product deleted successfully', {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-500))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-500))',
        } as React.CSSProperties,
      });
      refetch();
    },

    onError: (error) => {
      toast.error(error.message, {
        style: {
          '--normal-bg':
            'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
          '--normal-text': 'var(--color-white)',
          '--normal-border': 'transparent',
        } as React.CSSProperties,
      });
    },
  });

  const handleDeleteProduct = async (productId: string) => {
    await mutateAsync(productId);
    setOpenModal(false);
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
      ) : isPending ? (
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
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <PencilIcon />
                        </Link>
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'
                        aria-label={`product-${product._id}-remove`}
                        onClick={() => {
                          setOpenModal(true);
                          setProductId(product._id);
                        }}
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
      <AlertDialog open={openModal}>
        <AlertDialogContent>
          <AlertDialogHeader className='items-center'>
            <div className='bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
              <TriangleAlertIcon className='text-destructive size-6' />
            </div>
            <AlertDialogTitle>
              Are you absolutely sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center'>
              This action cannot be undone. This will permanently delete your
              product and remove it from our database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteProduct(productId)}
              className='bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default ProductsPage;
