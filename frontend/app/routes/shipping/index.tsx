import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useNavigate } from 'react-router';
import type { Shipping } from 'type';
import useShippingStore from '~/store/shipping';
import { useEffect } from 'react';

const ShippingPage = () => {
  const navigate = useNavigate();
  const shipping = useShippingStore((state) => state.shipping);
  const setShipping = useShippingStore((state) => state.setShipping);

  const form = useForm<Shipping>({
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

  const onSubmit: SubmitHandler<Shipping> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    setShipping(data);
    navigate('/checkout');
  };

  const onError: SubmitErrorHandler<Shipping> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <main className='p-6 mt-4 flex items-center min-h-[72vh]'>
      <div className='max-w-xl mx-auto w-full'>
        <Form {...form}>
          <div className='space-y-3'>
            <h1 className='font-bold text-4xl md:text-5xl'>Shipping</h1>
            <p className='opacity-85 mb-5 text-base md:text-lg '>
              Provide your shipping info to proceed with your order.
            </p>
          </div>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit(onSubmit, onError)}
          >
            {/* Address */}
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <div className='group relative w-full'>
                    <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                      <span className='inline-flex px-1 text-black'>
                        Address
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
                      <span className='inline-flex px-1 text-black'>
                        Country
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
                </FormItem>
              )}
            />

            <Button size='default' className=' bg-blue-500 hover:bg-blue-600'>
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default ShippingPage;
