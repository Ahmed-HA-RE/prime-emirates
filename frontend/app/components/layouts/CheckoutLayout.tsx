import React from 'react';

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='p-6 mt-4 min-h-[72vh]'>
      <div className='max-w-xl mx-auto w-full space-y-5'>{children}</div>
    </main>
  );
};

export default CheckoutLayout;
