import { useQuery } from '@tanstack/react-query';
import { Spinner } from './ScreenSpinner';
import { getUserOrders } from '~/api/orders';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { FaCheck } from 'react-icons/fa6';
import { TriangleAlertIcon, X } from 'lucide-react';
import { Link } from 'react-router';

const DisplayOrders = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrders,
    staleTime: 3000,
  });

  return (
    <div className='flex-1/2'>
      {isLoading && <Spinner />}
      <h2 className='mb-8 font-bold tracking-wide text-3xl md:text-4xl'>
        My Orders
      </h2>

      {!orders ? (
        <Alert className='bg-destructive dark:bg-destructive/60 border-none text-white'>
          <TriangleAlertIcon />
          <AlertTitle>{error?.message}</AlertTitle>
          <AlertDescription className='text-white/80'>
            Please try again or reload the page.
          </AlertDescription>
        </Alert>
      ) : (
        <div className='w-full'>
          <div className='overflow-hidden rounded-md border border-gray-400'>
            <Table>
              <TableHeader>
                <TableRow className='border-gray-400'>
                  <TableHead className='w-25 font-bold'>ID</TableHead>
                  <TableHead className='font-bold'>DATE</TableHead>
                  <TableHead className='font-bold'>PAYMENT</TableHead>
                  <TableHead className='font-bold'>DELIVERED</TableHead>
                  <TableHead className='font-bold'>PAID</TableHead>
                  <TableHead className='text-right font-bold'>TOTAL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    className='border-gray-400 hover:bg-transparent'
                    key={order._id}
                  >
                    <TableCell className='font-medium'>{order._id}</TableCell>
                    <TableCell>{order.createdAt?.split('T')[0]}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      {order.isDelivered ? (
                        <FaCheck className='text-green-500' />
                      ) : (
                        <X color='red' />
                      )}
                    </TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        <FaCheck className='text-green-500' />
                      ) : (
                        <X color='red' />
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      <span className='dirham-symbol inline-block'>
                        &#xea;{' '}
                        <h4 className='font-sans inline-block'>
                          {order.totalPrice}
                        </h4>
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        className='bg-gray-200 hover:opacity-85 p-1 text-xs rounded'
                        to={`/order/${order._id}`}
                      >
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOrders;
