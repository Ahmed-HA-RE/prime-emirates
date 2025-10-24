import { Link, redirect } from 'react-router';
import type { Route } from '../order/+types';
import axios from 'axios';
import type { User } from 'type';
import { Spinner } from '~/components/ScreenSpinner';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '~/components/layouts/MainLayout';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { getOrders } from '~/api/orders';
import { PencilIcon, Trash2Icon, TriangleAlertIcon, X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { FaCheck } from 'react-icons/fa6';

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

  if (data.user.role === 'user') return redirect('/');
};

const OrdersPage = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', 'admin'],
    queryFn: getOrders,
    staleTime: 5000,
  });

  return (
    <MainLayout>
      <h1 className='font-bold text-3xl md:text-4xl tracking-wide mb-9'>
        Orders
      </h1>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Alert className='bg-destructive dark:bg-destructive/60 border-none text-white'>
          <TriangleAlertIcon />
          <AlertTitle>{error?.message}</AlertTitle>
          <AlertDescription className='text-white/80'>
            Please try again or reload the page.
          </AlertDescription>
        </Alert>
      ) : (
        <Table className=''>
          <TableHeader>
            <TableRow className='border-black'>
              <TableHead className='w-25 font-bold'>ID</TableHead>
              <TableHead className='font-bold'>USER</TableHead>
              <TableHead className='font-bold'>DATE</TableHead>
              <TableHead className='font-bold'>TOTAL</TableHead>
              <TableHead className='font-bold'>PAID</TableHead>
              <TableHead className='font-bold'>DELIVERED</TableHead>
              <TableHead className='font-bold'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order._id} className='border-black'>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order.createdAt?.split('T')[0]}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    <FaCheck className='text-green-500' />
                  ) : (
                    <X color='red' />
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered ? (
                    order.deliveredAt.split('T')[0]
                  ) : (
                    <X color='red' />
                  )}
                </TableCell>
                <TableCell>
                  <span className='dirham-symbol inline-block'>
                    &#xea;{' '}
                    <h4 className='font-sans inline-block'>
                      {order.totalPrice}
                    </h4>
                  </span>
                </TableCell>
                <TableCell>
                  <Button size='sm' asChild>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </MainLayout>
  );
};

export default OrdersPage;
