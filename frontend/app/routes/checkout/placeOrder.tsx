import type { Route } from './+types/placeOrder';
import { Flex } from '@radix-ui/themes';
import MainLayout from '~/components/layouts/MainLayout';
import { Spinner } from '~/components/ScreenSpinner';
import { useMutation } from '@tanstack/react-query';
import { createOrders } from '~/api/orders';
import type { PlaceOrder } from 'type';
import useShippingStore from '~/store/shipping';
import { Separator } from '~/components/ui/separator';
import usePaymentStore from '~/store/payment';
import useCartStore from '~/store/cart';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import { Link, redirect, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { calculateOrderSummary } from '~/utils/calcOrderSummary';
import { toast } from 'sonner';

export const meta = () => [
  {
    title: 'Place Order | PrimeEmirates',
  },
  {
    name: 'description',
    content:
      'Review your order details and confirm your purchase on PrimeEmirates.',
  },
];

export const loader = ({ request }: Route.LoaderArgs) => {
  const refreshToken = request.headers.get('Cookie');

  if (!refreshToken) return redirect('/login');
};

const PlaceOrderPage = () => {
  const shipping = useShippingStore((state) => state.shipping);
  const payment = usePaymentStore((state) => state.payment);
  const cartItems = useCartStore((state) => state.cartItems);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateOrderSummary(cartItems);
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (orderItems: PlaceOrder) => createOrders(orderItems),
    onSuccess: (data) => {
      toast.success('Order Placed!', {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-400))',
        } as React.CSSProperties,
        position: 'top-center',
      });
      navigate(`/order/${data._id}`);
    },
  });

  const handlePlaceOrder = async () => {
    const orderItems: PlaceOrder = {
      shipping,
      orderItems: cartItems.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        product: item._id,
        qty: item.quantity,
      })),
      paymentMethod: payment,
    };

    await mutateAsync(orderItems);
  };

  return (
    <MainLayout>
      {isPending && <Spinner />}
      <Flex className='flex-col-reverse md:flex-row items-start gap-y-15 md:gap-x-10'>
        {/* Left Col */}
        <div className='flex-1/2 w-full'>
          {/* Shipping */}
          <div>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Shipping</h2>
            <span className='font-bold'>
              Address: {'  '}
              <p className='font-light inline-block'>
                {shipping.address}, {shipping.city} {shipping.postalCode},{' '}
                {shipping.country}
              </p>
            </span>
          </div>

          <Separator className='my-6 bg-gray-400' />

          {/* Payment */}
          <div>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Payment Method
            </h2>
            <span className='font-bold'>
              Method: {'  '}
              <p className='font-light inline-block'>{payment}</p>
            </span>
          </div>

          <Separator className='my-6 bg-gray-400 ' />

          {cartItems.length === 0 ? (
            <Alert className='bg-destructive dark:bg-destructive/60 border-none text-white max-w-lg'>
              <TriangleAlertIcon />
              <AlertTitle>Your cart is empty</AlertTitle>
              <AlertDescription className='text-white/80'>
                Add some products before continuing to checkout.
              </AlertDescription>
            </Alert>
          ) : (
            <div>
              <h2 className='text-3xl md:text-4xl font-bold mb-10'>
                Order Items
              </h2>
              <Flex className='flex-col'>
                {cartItems.map((item, index) => (
                  <div key={item._id}>
                    <Flex className='flex flex-row md:flex-row items-center'>
                      {/* img */}
                      <Link to={`/product/${item._id}`}>
                        <img
                          className='w-32 rounded-xl hover:scale-105 transition inline-block mr-4'
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>
                      {/* name + total */}
                      <div className='flex flex-col gap-2'>
                        <Link
                          to={`/product/${item._id}`}
                          className='font-bold underline underline-offset-2 decoration-orange-500 inline-block'
                        >
                          {item.name}
                        </Link>
                        <div>
                          {item.quantity} x {'  '}
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
                              {(item.price * item.quantity).toFixed(2)}
                            </h4>
                          </span>
                        </div>
                      </div>
                    </Flex>
                    {index === cartItems.length - 1 ? null : (
                      <Separator className='my-6 bg-gray-400 ' />
                    )}
                  </div>
                ))}
              </Flex>
            </div>
          )}
        </div>
        {/* Right Col */}
        <div className='flex-1/5 shadow border border-gray-300 rounded p-6 w-full'>
          <h2 className='text-2xl md:text-3xl font-bold'>Order Summary</h2>
          <Separator className='my-6  bg-gray-400' />
          {/* Total items  */}
          <div className='flex flex-row justify-between items-center'>
            <h4>Items: </h4>
            <span className='dirham-symbol inline-block'>
              &#xea;
              <h4 className='font-sans inline-block'>{itemsPrice}</h4>
            </span>
          </div>
          <Separator className='my-5 bg-gray-400' />
          {/* Shipping */}
          <div className='flex flex-row justify-between items-center'>
            <h4>Shipping: </h4>
            <span className='dirham-symbol inline-block'>
              &#xea;
              <h4 className='font-sans inline-block'>
                {shippingPrice.toFixed(2)}
              </h4>
            </span>
          </div>
          <Separator className='my-5 bg-gray-400' />

          {/* Tax */}
          <div className='flex flex-row justify-between items-center'>
            <h4>Tax: </h4>
            <span className='dirham-symbol inline-block'>
              &#xea;
              <h4 className='font-sans inline-block'>{taxPrice.toFixed(2)}</h4>
            </span>
          </div>

          <Separator className='my-5 bg-gray-400' />

          {/* Total */}
          <div className='flex flex-row justify-between items-center'>
            <h4>Total: </h4>
            <span className='dirham-symbol inline-block'>
              &#xea;
              <h4 className='font-sans inline-block'>
                {totalPrice.toFixed(2)}
              </h4>
            </span>
          </div>

          <Separator className='my-5 bg-gray-400' />

          {/* Place order btn */}
          <Button onClick={handlePlaceOrder} className='py-5'>
            Place Order
          </Button>
        </div>
      </Flex>
    </MainLayout>
  );
};

export default PlaceOrderPage;
