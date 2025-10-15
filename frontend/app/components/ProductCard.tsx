import type { Product } from 'type';

import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from './ui/card';
import { Link } from 'react-router';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className='relative max-w-md rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg overflow-hidden'>
        <div className='flex h-60 items-center justify-center overflow-hidden '>
          <img
            src={product.image}
            alt={product.name}
            className='hover:scale-105 tranisiton duration-200'
          />
        </div>
        <Card className='border-none bg-black/70 rounded-t-none text-white'>
          <CardHeader>
            <CardTitle className='line-clamp-1 text-lg'>
              {product.name}
            </CardTitle>
            <CardDescription className='flex items-center gap-2'>
              {/* stars */}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='line-clamp-2 text-base opacity-85'>
              {product.description}
            </p>
          </CardContent>
          <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
            <div className='flex flex-col'>
              <span className='text-sm font-medium uppercase'>Price</span>
              <span className='text-xl font-semibold dirham-symbol'>
                &#xea; {'  '}
                <h3 className='font-sans inline-block'>{product.price}</h3>
              </span>
            </div>
            <Button
              className='cursor-pointer bg-gray-100 text-black hover:opacity-90 transition'
              size='lg'
            >
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
};

export default ProductCard;
