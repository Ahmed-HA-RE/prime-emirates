import { Link, redirect, useParams } from 'react-router';
import type { Route } from './+types';
import { Spinner } from '~/components/ScreenSpinner';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '~/api/orders';
import { Flex } from '@radix-ui/themes';
import MainLayout from '~/components/layouts/MainLayout';
import { Alert, AlertTitle } from '~/components/ui/alert';
import { Truck, X } from 'lucide-react';
import { FaMoneyCheck } from 'react-icons/fa6';
import { Separator } from '~/components/ui/separator';
import {
  PayPalButtons,
  type PayPalButtonsComponentProps,
} from '@paypal/react-paypal-js';
import { useMutation } from '@tanstack/react-query';
import { updateOrderToPaid } from '~/api/orders';
import type { Order, PayPalDetailsRes, User } from 'type';
import { toast } from 'sonner';
import useCartStore from '~/store/cart';
import axios from 'axios';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const id = params.id;
  const refreshToken = request.headers.get('Cookie');
  if (!refreshToken) return redirect('/login');

  const token = refreshToken.split('=')[1];

  const ordersData = await axios.get<Order[]>(
    `${import.meta.env.VITE_BACKEND_URL_DEV}/orders/my-orders`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const order = ordersData.data.find((order) => order._id === id);

  if (!order) {
    return redirect('/');
  }

  return id;
};

const OrderPage = ({ loaderData }: Route.ComponentProps) => {
  const id = loaderData;
  const setClearCart = useCartStore((state) => state.clearCart);

  const { data: order, isLoading } = useQuery({
    queryKey: ['order'],
    queryFn: () => getOrder(id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (details: PayPalDetailsRes) =>
      updateOrderToPaid(order?._id, details),

    onSuccess: () => {
      toast.success('Order paid successfully!', {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-400))',
        } as React.CSSProperties,
        position: 'top-center',
      });
      setClearCart();
    },

    onError: (err) => {
      toast.error(err.message, {
        style: {
          '--normal-bg':
            'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
          '--normal-text': 'var(--color-white)',
          '--normal-border': 'transparent',
        } as React.CSSProperties,
      });
    },
  });

  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (
    data,
    actions
  ) => {
    if (!actions) {
      return;
    }
    const details = await actions.order?.capture();
    if (!details) {
      return;
    }
    await mutateAsync({
      email_address:
        details.payment_source?.paypal?.email_address || 'no-email',
      id: details.id,
      status: details.status,
      update_time: details.update_time,
    });
  };

  const createOrder: PayPalButtonsComponentProps['createOrder'] = async (
    data,
    actions
  ) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: order?.totalPrice.toFixed(2)!,
          },
        },
      ],
    });
  };

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
                      <AlertTitle>
                        {order?.paymentResult?.update_time}
                      </AlertTitle>
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
                    {order?.itemsPrice.toFixed(2)}
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
              <Separator className='my-6  bg-gray-400' />

              {/* Pay btn */}
              {!order?.isPaid &&
                (isPending ? (
                  <Spinner />
                ) : (
                  <PayPalButtons
                    onApprove={onApprove}
                    createOrder={createOrder}
                    style={{
                      layout: 'vertical',
                      color: 'gold',
                      shape: 'pill',
                      tagline: false,
                    }}
                  />
                ))}
            </div>
          </Flex>
        </>
      )}
    </MainLayout>
  );
};

export default OrderPage;
