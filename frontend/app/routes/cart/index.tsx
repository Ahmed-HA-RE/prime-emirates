import AlertError from '~/components/AlertError';
import { Link, useNavigate } from 'react-router';
import useCartStore from '~/store/cart';
import MainLayout from '~/components/layouts/MainLayout';
import { Store, TrashIcon } from 'lucide-react';
import { Flex } from '@radix-ui/themes';
import { SelectNative } from '~/components/ui/select-native';
import { Button } from '~/components/ui/button';
import type { CartItem } from 'type';
import { Separator } from '~/components/ui/separator';

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const itemsPrice = useCartStore((state) => state.itemsPrice());

  const handleAddToCart = (value: number, item: CartItem) => {
    addToCart({ ...item, quantity: value });
  };

  return (
    <MainLayout>
      {cartItems.length === 0 ? (
        <AlertError
          icon={<Store />}
          message={
            <span>
              No products found in your cart.{' '}
              <Link className='underline underline-offset-2' to='/'>
                Go back to shop
              </Link>
            </span>
          }
        />
      ) : (
        <>
          <h1 className='text-3xl md:text-4xl font-bold tracking-wide mb-10'>
            Shopping Cart
          </h1>

          {/* Products + Order Summary */}
          <Flex className='flex-col-reverse md:flex-row md:items-start gap-6'>
            {/* Products */}
            <div className='space-y-5 flex-1/2'>
              {cartItems.map((item) => (
                <div>
                  <div className='flex flex-row gap-4' key={item._id}>
                    {/* img */}
                    <img
                      className='w-32 object-cover'
                      src={item.image}
                      alt={item.name}
                    />
                    {/* info + delete */}
                    <div className='flex flex-col items-start md:flex-row space-y-4 md:space-y-0 md:justify-between w-full'>
                      {/* product name */}
                      <Link
                        to={`/product/${item._id}`}
                        className='font-extrabold w-full underline underline-offset-4 decoration-orange-500 max-w-xs'
                      >
                        {item.name}
                      </Link>
                      {/* product price */}
                      <div className='flex flex-row items-center gap-1'>
                        <span className='text-lg dirham-symbol'>
                          &#xea; {'  '}
                        </span>
                        <p className='font-sans inline-block'>{item.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row items-center justify-end gap-3'>
                    {/* qty */}
                    <div className='*:not-first:mt-2'>
                      <SelectNative
                        className='space-y-2 rounded-md  bg-white w-28 text-black focus-visible:ring-1'
                        value={item.quantity}
                        onChange={(e) => handleAddToCart(+e.target.value, item)}
                      >
                        <option value='' disabled>
                          Please select a quantity
                        </option>
                        {[...Array(item.countInStock).keys()].map((qty) => (
                          <option key={qty + 1} value={qty + 1}>
                            {qty + 1}
                          </option>
                        ))}
                      </SelectNative>
                    </div>
                    {/* Delete Button */}
                    <Button className='from-destructive via-destructive/60 to-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 bg-transparent bg-gradient-to-r [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center]'>
                      <TrashIcon />
                      Delete
                    </Button>
                  </div>
                  <Separator className='my-5' />
                </div>
              ))}
            </div>
            {/* Subtotal Card */}
            <div className='p-4 shadow border border-gray-200 rounded flex-1/5'>
              <h1 className='text-3xl lg:text-3xl  font-semibold mb-4'>
                Subtotal (
                {cartItems.reduce((acc, currVal) => acc + currVal.quantity, 0)})
                items
              </h1>
              <div className='flex flex-row items-center gap-1'>
                <span className='text-lg dirham-symbol'>&#xea; {'  '}</span>
                <p className='font-sans inline-block'>
                  {itemsPrice.toFixed(2)}
                </p>
              </div>
              <Separator className='my-5 bg-gray-300' />
              <Button className='py-6 text-base cursor-pointer hover:opacity-95'>
                Procced To Checkout
              </Button>
            </div>
          </Flex>
        </>
      )}
    </MainLayout>
  );
};

export default CartPage;
