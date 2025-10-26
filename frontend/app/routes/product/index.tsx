import type { Route } from './+types';
import { Link } from 'react-router';
import MainLayout from '~/components/layouts/MainLayout';
import { Flex } from '@radix-ui/themes/components/flex';
import { Separator } from '~/components/ui/separator';
import Rating from '~/components/Rating';
import { Button } from '~/components/ui/button';
import { createProductReview, getProduct } from '~/api/products';
import SliderCart from '~/components/SliderCart';
import { useState } from 'react';
import { Alert, AlertTitle } from '~/components/ui/alert';
import { CircleAlertIcon } from 'lucide-react';
import useUserStore from '~/store/user';
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { createReviewSchema } from '../../../../schema/products';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { SelectNative } from '~/components/ui/select-native';
import { Textarea } from '~/components/ui/textarea';
import type { CreateProductReviewForm } from 'type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '~/components/ScreenSpinner';
import { toast } from 'sonner';

export function meta() {
  return [
    { title: 'PrimeEmirates' },
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
  const product = loaderData;
  const [open, setOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const form = useForm<CreateProductReviewForm>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 1,
      comment: '',
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (reviewData: CreateProductReviewForm) =>
      createProductReview(product._id, reviewData),
    onSuccess: (data) => {
      toast.success('Review added successfully', {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-500))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-500))',
        } as React.CSSProperties,
      });
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
          '--normal-bg':
            'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
          '--normal-text': 'var(--color-white)',
          '--normal-border': 'transparent',
        } as React.CSSProperties,
      });
    },
  });

  const onSubmit: SubmitHandler<CreateProductReviewForm> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    await mutateAsync(data);
  };

  const onError: SubmitErrorHandler<CreateProductReviewForm> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

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
          <div className='flex flex-row items-center gap-3'>
            <Rating value={product.rating} />
            <h3>{product.numReviews} reviews</h3>
          </div>
          <Separator className='bg-gray-300 my-6' />
          <p className='text-gray-500 md:pr-2'>
            Description: {product.description}
          </p>
        </div>
      </Flex>
      <SliderCart product={product} open={open} setOpen={setOpen} />

      <div className='grid grid-cols-1 md:grid-cols-2 items-start justify-between mt-10 gap-y-8'>
        {/* Reviews List */}
        <div className='max-w-xl w-full'>
          <h2 className='p-4 w-full bg-gray-100 text-black tracking-wide text-2xl md:text-3xl font-semibold mb-6 '>
            Reviews
          </h2>

          {product.reviews.length === 0 ? (
            <Alert className='border-none bg-sky-600 text-white dark:bg-sky-400'>
              <CircleAlertIcon />
              <AlertTitle>No Reviews For This Product</AlertTitle>
            </Alert>
          ) : (
            <div className='space-y-4'>
              {product.reviews.map((review) => (
                <Flex
                  key={review.user}
                  className='flex-col space-y-2 justify-center bg-gray-50 border border-gray-200 px-3 py-2 rounded'
                >
                  <h3 className='font-semibold'>{review.name}</h3>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.split('T')[0]}</p>
                  <p>{review.comment}</p>
                </Flex>
              ))}
            </div>
          )}
        </div>
        <div className='max-w-xl w-full'>
          <h2 className='p-4 w-full bg-gray-100 text-black tracking-wide text-2xl md:text-3xl font-semibold mb-6 '>
            Write Customer Review
          </h2>
          {!user ? (
            <Alert className='border-none bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400'>
              <CircleAlertIcon />
              <AlertTitle>
                Please{' '}
                <Link
                  to={`/login?redirect=/product/${product._id}`}
                  className='underline underline-offset-1 text-black font-bold'
                >
                  login
                </Link>{' '}
                to write a review
              </AlertTitle>
            </Alert>
          ) : isPending ? (
            <Spinner />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className='space-y-2'
              >
                <FormField
                  control={form.control}
                  name='rating'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <SelectNative
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value='1'>1- Poor</option>
                          <option value='2'>2- Fair</option>
                          <option value='3'>3- Good</option>
                          <option value='4'>4- Very Good</option>
                          <option value='5'>5- Excellent</option>
                        </SelectNative>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='comment'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='w-full space-y-2'>
                          <FormLabel htmlFor={'comment'}>Comment</FormLabel>
                          <Textarea
                            placeholder='Type your comment here'
                            className='resize-none min-h-50'
                            id={'comment'}
                            {...field}
                          />
                          <p className='text-muted-foreground text-end text-xs'>
                            Share your thoughts about this product.
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  size={'lg'}
                  className='inline-block text-lg mt-14'
                  type='submit'
                >
                  Submit
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailsPage;
