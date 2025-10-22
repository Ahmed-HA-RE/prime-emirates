import type { Product } from 'type';
import { Separator } from '~/components/ui/separator';
import { Button } from './ui/button';
import { useMediaQuery } from '~/hooks/use-media-query';
import { toast } from 'sonner';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { SelectNative } from './ui/select-native';
import { useState } from 'react';
import useCartStore from '~/store/cart';
import { useNavigate } from 'react-router';

type PurchasePanelProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
};

const PurchasePanel = ({ product, open, setOpen }: PurchasePanelProps) => {
  const isMatched = useMediaQuery('(min-width:768px)');
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });

    toast.success('Added to cart! Redirecting...', {
      style: {
        '--normal-bg':
          'light-dark(var(--color-green-600), var(--color-green-400))',
        '--normal-text': 'var(--color-white)',
        '--normal-border':
          'light-dark(var(--color-green-600), var(--color-green-400))',
      } as React.CSSProperties,
      position: 'top-center',
    });
    setTimeout(() => navigate('/cart'), 2000);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMatched ? 'right' : 'bottom'}
    >
      <DrawerContent className='h-auto bg-white'>
        <DrawerHeader className=''>
          {!isMatched && (
            <div className='mx-auto w-30 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-3'></div>
          )}
          <DrawerTitle className='text-black text-center'>
            View & Buy
          </DrawerTitle>
          <DrawerDescription className='text-black text-center'>
            Select quantity and add to your cart
          </DrawerDescription>
        </DrawerHeader>
        <div className='w-full'>
          {/* Price */}
          <div className='flex flex-row items-center justify-between px-4'>
            <span className=' font-medium text-lg text-black'>Price:</span>
            <span className='text-base font-semibold dirham-symbol text-black'>
              &#xea;
              <h3 className='font-sans inline-block text-black'>
                {product.price}
              </h3>
            </span>
          </div>
          <Separator className='bg-gray-300 my-5' />
          {/* Status */}
          <div className='flex flex-row items-center justify-between px-4'>
            <span className=' font-medium text-lg text-black'>Status:</span>
            <h3 className='text-base font-semibold text-black'>
              {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
            </h3>
          </div>
          <Separator className='bg-gray-300 my-5' />

          {/* Qty */}
          {product.countInStock > 0 && (
            <>
              <div className='flex flex-row items-center justify-between px-4'>
                <span className=' font-medium text-lg text-black'>Qty:</span>
                <div className='*:not-first:mt-2'>
                  <SelectNative
                    className='w-[150px] space-y-2 rounded-md bg-white text-black focus-visible:ring-1'
                    disabled={product.countInStock === 0}
                    value={product.countInStock === 0 ? 0 : quantity}
                    onChange={(e) => setQuantity(+e.target.value)}
                  >
                    <option value='' disabled>
                      Please select a quantity
                    </option>
                    {[...Array(product.countInStock).keys()].map((qty) => (
                      <option key={qty + 1} value={qty + 1}>
                        {qty + 1}
                      </option>
                    ))}
                  </SelectNative>
                </div>
              </div>
              <Separator className='bg-gray-300 mt-5' />
            </>
          )}
        </div>

        <DrawerFooter className='pt-5'>
          <Button
            className='bg-black text-white cursor-pointer inline-block '
            disabled={product.countInStock === 0}
            onClick={handleAddToCart}
          >
            {product.countInStock > 0 ? 'Add To Cart' : 'Out of stock'}
          </Button>
          <DrawerClose asChild>
            <Button
              variant='outline'
              className='bg-black text-white w-full border-0 cursor-pointer'
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PurchasePanel;
