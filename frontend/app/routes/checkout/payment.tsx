import type { Route } from './+types/shipping';
import { redirect, useNavigate } from 'react-router';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/ui/form';
import { Form } from '~/components/ui/form';
import { Spinner } from '~/components/ScreenSpinner';
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import CheckoutLayout from '~/components/layouts/CheckoutLayout';
import { Button } from '~/components/ui/button';
import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { FaPaypal } from 'react-icons/fa6';
import usePaymentStore from '~/store/payment';
import useShippingStore from '~/store/shipping';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import useCartStore from '~/store/cart';

export const loader = ({ request }: Route.LoaderArgs) => {
  const isUser = request.headers.get('Cookie');
  if (!isUser) {
    throw redirect('/login');
  }
};

type Payment = {
  payment: string;
};

const paymentBaseSchema = z.object({
  payment: z.string().nonempty({ error: 'Please choose the payment method' }),
});

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const setPayment = usePaymentStore((state) => state.setPayment);
  const shipping = useShippingStore((state) => state.shipping);

  const navigate = useNavigate();

  const form = useForm<Payment>({
    resolver: zodResolver(paymentBaseSchema),
    defaultValues: {
      payment: '',
    },
  });

  useEffect(() => {
    const { postalCode, city, country, address } = shipping;

    if (postalCode === '' || city === '' || country === '' || address === '') {
      navigate('/checkout/shipping');
    }
  }, [shipping, navigate]);

  const onSubmit: SubmitHandler<Payment> = (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    setPayment(data.payment);
    setLoading(true);

    setTimeout(() => {
      navigate('/checkout/placeOrder');
      setLoading(false);
    }, 500);
  };

  const onError: SubmitErrorHandler<Payment> = (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <CheckoutLayout>
      {loading && <Spinner />}
      <div className='space-y-3'>
        <h1 className='font-bold text-4xl md:text-5xl'>Payment</h1>
        <p className='opacity-85 mb-5 text-base md:text-lg '>
          Proceed with PayPal Payment
        </p>
      </div>
      <Form {...form}>
        <form
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          {/* PayPal */}
          <FormField
            control={form.control}
            name='payment'
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className='relative flex cursor-pointer flex-col items-center gap-3 rounded-md border border-input px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 has-data-[state=checked]:border-primary/50'>
                      <RadioGroupItem
                        id={'paypal'}
                        className='sr-only'
                        value='PayPal'
                      />
                      <FaPaypal
                        className='opacity-60'
                        size={20}
                        aria-hidden='true'
                      />
                      <label
                        htmlFor={'paypal'}
                        className='cursor-pointer text-xs leading-none font-medium text-foreground after:absolute after:inset-0'
                      >
                        PayPal
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <div className='space-x-3 mt-8'>
            <Button
              size={'lg'}
              className='w-28 text-base'
              type='button'
              disabled={loading}
              onClick={() => navigate('/checkout/shipping')}
            >
              Prev
            </Button>
            <Button
              size={'lg'}
              className='w-28 text-base'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Saving..' : 'Next'}
            </Button>
          </div>
        </form>
      </Form>
    </CheckoutLayout>
  );
};

export default PaymentPage;
