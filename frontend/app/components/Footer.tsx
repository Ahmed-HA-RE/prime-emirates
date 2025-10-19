import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='w-full bg-black py-8 text-white'>
      <div className='max-w-6xl mx-auto flex flex-wrap justify-center gap-8'>
        <Link
          to='/'
          className='relative group text-lg transition-colors duration-300'
        >
          Home
          <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-lime-600 transition-all duration-300 group-hover:w-full'></span>
        </Link>
      </div>
      <p className='text-center text-sm mt-4 tracking-wide'>
        © {currentYear} PrimeEmirates. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
