import { useState } from 'react';
import type { Route } from './+types';
import { redirect } from 'react-router';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '~/components/ui/stepper';
import { Button } from '~/components/ui/button';
import ShippingForm from '~/components/ShippingForm';
import { cn } from '~/lib/utils';
import PaymentForm from '~/components/PaymentForm';

const steps = [
  {
    step: 1,
    title: 'Shipping',
  },
  {
    step: 2,
    title: 'Payment',
  },
  {
    step: 3,
    title: 'Place Order',
  },
];

export const loader = ({ request }: Route.LoaderArgs) => {
  const isUser = request.headers.get('Cookie');
  if (!isUser) {
    throw redirect('/login');
  }
};

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <main className='p-6 mt-4  min-h-[72vh]'>
      <div className='max-w-xl mx-auto w-full space-y-10'>
        <div className='mx-auto max-w-xl space-y-8 text-center'>
          <Stepper value={currentStep} onValueChange={setCurrentStep}>
            {steps.map(({ step, title }) => (
              <StepperItem
                key={step}
                step={step}
                className='not-last:flex-1 max-md:items-start'
              >
                <StepperTrigger className='rounded max-md:flex-col'>
                  <StepperIndicator />
                  <div className='text-center md:text-left'>
                    <StepperTitle>{title}</StepperTitle>
                  </div>
                </StepperTrigger>
                {step < steps.length && (
                  <StepperSeparator className='max-md:mt-3.5 md:mx-4' />
                )}
              </StepperItem>
            ))}
          </Stepper>
        </div>

        {currentStep === 1 && <ShippingForm />}
        {currentStep === 2 && <PaymentForm />}

        <div className='flex  space-x-4'>
          <Button
            variant='outline'
            className={cn(
              'w-32',
              'text-white',
              'hover:text-white',
              currentStep === 1
                ? 'bg-transparent text-black'
                : 'bg-blue-500 hover:bg-blue-600'
            )}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
          >
            Prev step
          </Button>

          {currentStep > steps.length - 1 ? null : (
            <Button
              variant='outline'
              className='w-32 text-white hover:text-white bg-blue-500 hover:bg-blue-600'
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Next Step
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
