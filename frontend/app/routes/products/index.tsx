import type { Route } from './+types';
import { Link } from 'react-router';
import MainLayout from '~/components/layouts/MainLayout';
import { Flex } from '@radix-ui/themes/components/flex';
import { Separator } from '~/components/ui/separator';
import Rating from '~/components/Rating';
import { Button } from '~/components/ui/button';
import { getProduct } from '~/api/products';
import SliderCart from '~/components/SliderCart';
import { useState } from 'react';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `PrimeEmirates | ${params.productId.slice(1, 8)} Details` },
    {
      name: 'description',
      content: 'Your trusted online marketplace across the UAE.',
    },
  ];
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  try {
    const { productId } = params;
    const data = await getProduct(productId);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const ProductDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const product = loaderData.data;
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <Flex className='mb-6' align={'center'} justify={'between'}>
        <Link
          className='bg-gray-200 p-3 py-2 font-semibold rounded hover:bg-gray-300 transition duration inline-block'
          to='/'
        >
          Go Back
        </Link>
        <Button
          className='bg-black text-white hover:opacity-85 transition duration-200 font-bold cursor-pointer'
          onClick={() => setOpen(!open)}
        >
          Purchase Options
        </Button>
      </Flex>

      {/* Product content */}
      <Flex className='flex-col md:flex-row md:border rounded-l-lg border-gray-300 space-y-4 md:space-y-0 gap-5 items-center mb-8 '>
        {/* Image */}
        <div className='overflow-hidden flex-1/2 max-w-lg mx-auto'>
          <img
            src={product.image}
            alt={product.name}
            className=' w-full rounded-l-lg'
          />
        </div>
        {/* Info */}
        <div className='w-full flex-1/2'>
          <h2 className='text-2xl lg:text-3xl font-semibold tracking-wide'>
            {product.name}
          </h2>
          <Separator className='bg-gray-300 my-6' />
          <Rating text={product.numReviews} value={product.rating} />
          <Separator className='bg-gray-300 my-6' />
          <p className='text-gray-500 md:pr-2'>
            Description: {product.description}
          </p>
        </div>
      </Flex>
      <SliderCart product={product} open={open} setOpen={setOpen} />
    </MainLayout>
  );
};

export default ProductDetailsPage;
