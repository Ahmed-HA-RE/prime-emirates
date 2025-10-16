import type { Product } from 'type';
import { Separator } from '~/components/ui/separator';
import { Button } from './ui/button';
import { useMediaQuery } from '~/hooks/use-media-query';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';

type PurchasePanelProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
};

const PurchasePanel = ({ product, open, setOpen }: PurchasePanelProps) => {
  const isMatched = useMediaQuery('(min-width:768px)');

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
        <div className='py-6 w-full'>
          <div className='flex flex-row items-center justify-between px-4'>
            <span className=' font-medium text-lg text-black'>Price:</span>
            <span className='text-base font-semibold dirham-symbol text-black'>
              &#xea; {'  '}
              <h3 className='font-sans inline-block text-black'>
                {product.price}
              </h3>
            </span>
          </div>
          <Separator className='bg-gray-300 my-5' />
          <div className='flex flex-row items-center justify-between px-4'>
            <span className=' font-medium text-lg text-black'>Status:</span>
            <h3 className='text-base font-semibold text-black'>
              {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
            </h3>
          </div>
        </div>
        <Separator className='bg-gray-300' />

        <DrawerFooter className='pt-5'>
          <Button
            className='bg-black text-white cursor-pointer inline-block '
            disabled={product.countInStock === 0}
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
