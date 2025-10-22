const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=' min-h-screen w-full flex items-center  bg-[url(/auth-bg.jpg)] bg-cover bg-center bg-no-repeat relative'>
      <div className='w-full max-w-2xl mx-auto rounded-2xl text-white p-8 z-2'>
        {children}
      </div>
      <div className='absolute inset-0 bg-black/65 z-1'></div>
    </main>
  );
};

export default AuthLayout;
