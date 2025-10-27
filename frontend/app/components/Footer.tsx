const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='w-full  py-8 text-black'>
      <p className='text-center text-sm mt-4 tracking-wide'>
        © {currentYear} PrimEmirates. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
