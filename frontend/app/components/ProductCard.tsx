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
import Rating from './Rating';
import useCartStore from '~/store/cart';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCartBtn = useCartStore((state) => state.addToCartBtn);

  return (
    <div className='relative max-w-md rounded-xl pt-0 shadow-lg overflow-hidden bg-white'>
      <div className='flex h-60 items-center justify-center overflow-hidden '>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className='hover:scale-105 tranisiton duration-200'
          />
        </Link>
      </div>
      <Card className='border-none bg-white rounded-t-none text-black'>
        <CardHeader>
          <CardTitle className='line-clamp-1 text-lg'>{product.name}</CardTitle>
          <CardDescription className='gap-2 mt-3'>
            <Rating
              value={product.reviews[0]?.rating}
              text={product.numReviews}
            />
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
              &#xea; <h3 className='font-sans inline-block'>{product.price}</h3>
            </span>
          </div>
          <Button
            className='cursor-pointer bg-white border border-purple-300 text-black hover:bg-purple-300 hover:text-white transition'
            size='lg'
            disabled={product.countInStock === 0}
            onClick={() => addToCartBtn({ ...product, quantity: 1 })}
          >
            {product.countInStock > 0 ? 'Add To Cart' : 'Out of stock'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
