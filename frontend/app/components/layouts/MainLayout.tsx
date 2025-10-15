const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='p-6 mt-4'>
      <div className='max-w-7xl mx-auto'>{children}</div>
    </main>
  );
};

export default MainLayout;
