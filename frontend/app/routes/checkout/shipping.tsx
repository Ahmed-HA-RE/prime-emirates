import type { Route } from './+types/shipping';
import { redirect, useNavigate } from 'react-router';
import useShippingStore from '~/store/shipping';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Form } from '~/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import CheckoutLayout from '~/components/layouts/CheckoutLayout';
import { Input } from '~/components/ui/input';
import z from 'zod';
import type { Shipping } from 'type';
import { Button } from '~/components/ui/button';
import { useEffect, useState } from 'react';
import { Spinner } from '~/components/ScreenSpinner';

export const loader = ({ request }: Route.LoaderArgs) => {
  const isUser = request.headers.get('Cookie');
  if (!isUser) {
    throw redirect('/login');
  }
};

const shippingSchema = z.object({
  address: z
    .string()
    .nonempty({ message: 'Address is required' })
    .max(200, { message: 'Address is too long' }),
  city: z
    .string()
    .nonempty({ message: 'City is required' })
    .max(50, { message: 'City name is too long' }),
  postalCode: z
    .string()
    .nonempty({ message: 'Postal code is required' })
    .regex(/^[0-9A-Za-z\- ]+$/, { message: 'Invalid postal code' }),
  country: z
    .string()
    .nonempty({ message: 'Country is required' })
    .max(50, { message: 'Country name is too long' }),
});

const ShippingPage = () => {
  const [loading, setLoading] = useState(false);
  const shipping = useShippingStore((state) => state.shipping);
  const setShipping = useShippingStore((state) => state.setShipping);
  const navigate = useNavigate();

  const form = useForm<Shipping>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      address: '',
      city: '',
      country: '',
      postalCode: '',
    },
  });

  useEffect(() => {
    form.reset(shipping);
  }, [shipping]);

  const onSubmit: SubmitHandler<Shipping> = (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    setShipping(data);
    setLoading(true);

    setTimeout(() => {
      navigate('/checkout/payment');
      setLoading(false);
    }, 500);
  };

  const onError: SubmitErrorHandler<Shipping> = (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <CheckoutLayout>
      {loading && <Spinner />}
      <div className='space-y-3 '>
        <h1 className='font-bold text-4xl md:text-5xl'>Shipping</h1>
        <p className='opacity-85 mb-5 text-base md:text-lg '>
          Provide your shipping info to proceed with your order.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className='space-y-7 h-full'
        >
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <div className='group relative w-full'>
                  <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                    <span className='inline-flex px-1 text-black'>Address</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder=' '
                      className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* City */}
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <div className='group relative w-full'>
                  <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                    <span className='inline-flex px-1 text-black'>City</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder=' '
                      className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Postal Code */}
          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem>
                <div className='group relative w-full'>
                  <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                    <span className='inline-flex px-1 text-black'>
                      Postal Code
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder=' '
                      className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Country */}
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <div className='group relative w-full'>
                  <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                    <span className='inline-flex px-1 text-black'>Country</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder=' '
                      className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size={'lg'}
            className='w-28 inline-block'
            type='submit'
            disabled={loading}
          >
            Next
          </Button>
        </form>
      </Form>
    </CheckoutLayout>
  );
};

export default ShippingPage;
