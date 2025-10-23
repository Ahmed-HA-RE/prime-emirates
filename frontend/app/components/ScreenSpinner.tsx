import { LoaderCircle } from 'lucide-react';

import { cn } from '~/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <div className='bg-white/30 backdrop-blur-md fixed inset-0 h-full flex items-center justify-center z-20'>
      <LoaderCircle
        role='status'
        strokeWidth={0.75}
        aria-label='Loading'
        className={cn('size-30 text-cyan-400 animate-spin', className)}
        {...props}
      />
    </div>
  );
}

export { Spinner };
