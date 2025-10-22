import { Link, redirect, useParams } from 'react-router';
import type { Route } from './+types';
import { Spinner } from '~/components/ScreenSpinner';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '~/api/orders';
import { Button, Flex } from '@radix-ui/themes';
import MainLayout from '~/components/layouts/MainLayout';
import { Alert, AlertTitle } from '~/components/ui/alert';
import { Truck, X } from 'lucide-react';
import { FaMoneyCheck } from 'react-icons/fa6';
import { Separator } from '~/components/ui/separator';

export const loader = ({ request }: Route.LoaderArgs) => {
  const refreshToken = request.headers.get('Cookie');
  if (!refreshToken) return redirect('/login');
};

const OrderPage = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order'],
    queryFn: () => getOrder(id),
    staleTime: 1000,
  });

  return (
    <MainLayout>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='text-3xl md:text-4xl font-bold mb-10'>
            Order: {order?._id}
          </h1>
          <Flex className='flex-col-reverse md:flex-row items-start gap-8'>
            {/* Left Col */}
            <div className='flex-1/2 w-full'>
              {/* Shipping */}
              <div>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                  Shipping
                </h2>
                <div className='space-y-4'>
                  <strong className='capitalize tracking-wide block'>
                    Name:{' '}
                    <p className='font-light inline-block'>
                      {order?.user.name}
                    </p>
                  </strong>
                  <strong className='tracking-wide block'>
                    Email:{' '}
                    <p className='font-light inline-block'>
                      {order?.user.email}
                    </p>
                  </strong>
                  <strong className='tracking-wide block'>
                    Address:{' '}
                    <p className='font-light inline-block'>
                      {order?.shipping.address}, {order?.shipping.city}{' '}
                      {order?.shipping.postalCode}, {order?.shipping.country}
                    </p>
                  </strong>
                  {order?.isDelivered ? (
                    <Alert className='rounded-md border-l-6 border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400 max-w-lg'>
                      <Truck />
                      <AlertTitle>Delivered</AlertTitle>
                    </Alert>
                  ) : (
                    <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-lg'>
                      <X />
                      <AlertTitle>Not Delivered</AlertTitle>
                    </Alert>
                  )}
                </div>
              </div>
              <Separator className='my-6 bg-gray-400' />
              {/* Payment */}
              <div className='w-full'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                  Payment Method
                </h2>
                <div className='space-y-4'>
                  <strong className='capitalize tracking-wide block'>
                    Method:{' '}
                    <p className='font-light inline-block'>
                      {order?.paymentMethod}
                    </p>
                  </strong>

                  {order?.isPaid ? (
                    <Alert className='rounded-md border-l-6 border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400 max-w-lg'>
                      <FaMoneyCheck />
                      <AlertTitle>Paid</AlertTitle>
                    </Alert>
                  ) : (
                    <Alert className='border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-6 max-w-lg'>
                      <X />
                      <AlertTitle>Not Paid</AlertTitle>
                    </Alert>
                  )}
                </div>
              </div>
              <Separator className='my-6 bg-gray-400' />
              {/* Orders */}
              <div>
                <h2 className='text-3xl md:text-4xl font-bold mb-10'>
                  Order Items
                </h2>
                <Flex className='flex-col'>
                  {order?.orderItems.map((item, index) => (
                    <div key={item.product}>
                      <Flex className='flex flex-row md:flex-row items-center'>
                        {/* img */}
                        <Link to={`/product/${item.product}`}>
                          <img
                            className='w-32 rounded-xl hover:scale-105 transition inline-block mr-4'
                            src={item.image}
                            alt={item.name}
                          />
                        </Link>
                        {/* name + total */}
                        <div className='flex flex-col gap-2'>
                          <Link
                            to={`/product/${item.product}`}
                            className='font-bold underline underline-offset-2 decoration-orange-500 inline-block'
                          >
                            {item.name}
                          </Link>
                          <div>
                            {item.qty} x {'  '}
                            <span className='dirham-symbol inline-block'>
                              &#xea;
                              <h4 className='font-sans inline-block'>
                                {item.price.toFixed(2)}
                              </h4>
                            </span>{' '}
                            ={' '}
                            <span className='dirham-symbol inline-block'>
                              &#xea;
                              <h4 className='font-sans inline-block'>
                                {(item.price * item.qty).toFixed(2)}
                              </h4>
                            </span>
                          </div>
                        </div>
                      </Flex>
                      {index === order?.orderItems.length - 1 ? null : (
                        <Separator className='my-6 bg-gray-400 ' />
                      )}
                    </div>
                  ))}
                </Flex>
              </div>
            </div>

            {/* Right Col */}
            <div className='flex-1/5 shadow border border-gray-300 rounded p-6 w-full'>
              <h2 className='text-2xl md:text-3xl font-bold'>Order Summary</h2>
              <Separator className='my-6  bg-gray-400' />
              {/* Total items  */}
              <div className='flex flex-row justify-between items-center '>
                <h4>Items: </h4>
                <span className='dirham-symbol inline-block'>
                  &#xea;
                  <h4 className='font-sans inline-block'>
                    {order?.itemsPrice}
                  </h4>
                </span>
              </div>

              {/* Shipping */}
              <div className='flex flex-row justify-between items-center'>
                <h4>Shipping: </h4>
                <span className='dirham-symbol inline-block'>
                  &#xea;
                  <h4 className='font-sans inline-block'>
                    {order?.shippingPrice.toFixed(2)}
                  </h4>
                </span>
              </div>

              {/* Tax */}
              <div className='flex flex-row justify-between items-center'>
                <h4>Tax: </h4>
                <span className='dirham-symbol inline-block'>
                  &#xea;
                  <h4 className='font-sans inline-block'>
                    {order?.taxPrice.toFixed(2)}
                  </h4>
                </span>
              </div>

              {/* Total */}
              <div className='flex flex-row justify-between items-center'>
                <h4>Total: </h4>
                <span className='dirham-symbol inline-block'>
                  &#xea;
                  <h4 className='font-sans inline-block'>
                    {order?.totalPrice.toFixed(2)}
                  </h4>
                </span>
              </div>

              {/* Pay btn */}
            </div>
          </Flex>
        </>
      )}
    </MainLayout>
  );
};

export default OrderPage;
