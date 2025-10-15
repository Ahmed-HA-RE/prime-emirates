import type { Route } from './+types';
import products from '../../products.json';
import { Link, useParams } from 'react-router';
import MainLayout from '~/components/layouts/MainLayout';
import { Flex } from '@radix-ui/themes/components/flex';
import { Separator } from '~/components/ui/separator';
import Rating from '~/components/Rating';
import { Button } from '~/components/ui/button';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `PrimeEmirates | ${params.id.slice(4)} Details` },
    {
      name: 'description',
      content: 'Your trusted online marketplace across the UAE.',
    },
  ];
}

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const product = products.find((product) => product._id === productId);

  return (
    <MainLayout>
      <Link
        className='bg-gray-200 p-3 py-2 font-semibold rounded hover:bg-gray-300 transition duration mb-6 inline-block'
        to='/'
      >
        Go Back
      </Link>

      {/* Product content */}
      <Flex className='flex-col lg:flex-row lg:border rounded-l-lg border-gray-300 space-y-4 lg:space-y-0 gap-5 items-center mb-8 '>
        {/* Image */}
        <div className='overflow-hidden flex-1/2 max-w-lg mx-auto'>
          <img
            src={product?.image}
            alt={product?.name}
            className=' w-full rounded-l-lg'
          />
        </div>
        {/* Info */}
        <div className='w-full  flex-1/2 '>
          <h2 className='text-2xl lg:text-3xl font-semibold tracking-wide'>
            {product?.name}
          </h2>
          <Separator className='bg-gray-300 my-6' />
          <Rating text={product?.numReviews!} value={product?.rating!} />
          <Separator className='bg-gray-300 my-6' />
          <p className='text-gray-500 lg:pr-2 '>
            Description: {product?.description}
          </p>
        </div>
      </Flex>

      {/* Cart Info */}
      <div className='shadow border border-gray-300 bg-white rounded py-6 w-full md:max-w-xs ml-auto'>
        <div className='flex flex-row items-center justify-between px-4'>
          <span className=' font-medium text-lg'>Price:</span>
          <span className='text-base font-semibold dirham-symbol'>
            &#xea; {'  '}
            <h3 className='font-sans inline-block'>{product?.price}</h3>
          </span>
        </div>
        <Separator className='bg-gray-300 my-5' />
        <div className='flex flex-row items-center justify-between px-4'>
          <span className=' font-medium text-lg'>Status:</span>
          <h3 className='text-base font-semibold'>
            {product && product?.countInStock > 0 ? 'In Stock' : 'Out of stock'}
          </h3>
        </div>
        <Separator className='bg-gray-300 my-5' />
        <div className='px-4'>
          <Button
            className='bg-black text-white cursor-pointer inline-block'
            disabled={product && product?.countInStock === 0}
          >
            {product && product?.countInStock > 0
              ? 'Add To Cart'
              : 'Out of stock'}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailsPage;
