import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router';

type FormLayoutProps = {
  children: React.ReactNode;
  adminLinks: string;
};

const FormLayout = ({ children, adminLinks }: FormLayoutProps) => {
  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <Button className='mb-10' size={'lg'} asChild>
          <Link to={`/admin/${adminLinks}`}>Go Back</Link>
        </Button>
        <div className='w-full max-w-2xl mx-auto'>{children}</div>
      </div>
    </main>
  );
};

export default FormLayout;
