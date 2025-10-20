import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { FaPaypal } from 'react-icons/fa6';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import usePaymentStore from '~/store/payment';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Button } from '@radix-ui/themes';

type Payment = {
  payment: string;
};

const PaymentForm = () => {
  const setPayment = usePaymentStore((state) => state.setPayment);
  const payment = usePaymentStore((state) => state.payment);

  const form = useForm<Payment>({
    defaultValues: {
      payment: '',
    },
  });

  const onSubmit: SubmitHandler<Payment> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    setPayment(data.payment);
  };

  const onError: SubmitErrorHandler<Payment> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <Form {...form}>
      <div className='space-y-3'>
        <h1 className='font-bold text-4xl md:text-5xl'>Payment</h1>
        <p className='opacity-85 mb-5 text-base md:text-lg '>
          Proceed with PayPal Payment
        </p>
      </div>
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
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <div className='relative flex cursor-pointer flex-col items-center gap-3 rounded-md border border-input px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 has-data-[state=checked]:border-primary/50'>
                    <RadioGroupItem
                      id={'paypal'}
                      className='sr-only'
                      value='Paypal'
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
      </form>
    </Form>
  );
};

export default PaymentForm;
