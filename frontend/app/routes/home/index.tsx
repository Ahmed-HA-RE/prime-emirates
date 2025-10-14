import Footer from '~/components/Footer';
import type { Route } from './+types';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Shop-Emirates | Home' },
    {
      name: 'description',
      content: 'Your trusted online marketplace across the UAE.',
    },
  ];
}

const HomePage = () => {
  return (
    <>
      <main className='p-6'>
        <div className='max-w-7xl mx-auto'>
          <h1>Welcome To PrimeEmirates </h1>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
