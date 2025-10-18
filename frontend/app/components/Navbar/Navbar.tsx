import { useId } from 'react';
import { SearchIcon, ShoppingCartIcon } from 'lucide-react';

import UserMenu from '~/components/Navbar/user-menu';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Link } from 'react-router';
import useCartStore from '~/store/cart';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

export default function Navbar() {
  const cartItems = useCartStore((state) => state.cartItems);
  const id = useId();

  return (
    <header className=' px-4 md:px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400'>
      <div className='flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto'>
        {/* Left side */}
        <Link to={'/'} className='flex flex-row md:flex-1/2 items-center gap-1'>
          <img src='/assests/logo.png' alt='logo' />
          <span className='text-white font-semibold tracking-wide hidden md:block'>
            PrimeEmirates
          </span>
        </Link>
        {/* Search form */}
        <div className='relative md:flex-1/2'>
          <Input
            id={id}
            className='peer h-8 ps-8 pe-2 text-white placeholder:text-white focus-visible:ring-1 ring-white border'
            placeholder='Search...'
            type='search'
          />
          <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-white peer-disabled:opacity-50'>
            <SearchIcon size={16} />
          </div>
        </div>

        {/* Right side */}
        <div className='flex md:flex-1/2 items-center justify-end gap-4'>
          {/* Cart */}
          <div className='relative w-fit'>
            <Link to='/cart'>
              <Avatar>
                <AvatarFallback className='rounded-sm bg-black/40 hover:bg-black/50 transition duration-200 text-white'>
                  <ShoppingCartIcon className='size-5' />
                </AvatarFallback>
              </Avatar>
            </Link>
            {cartItems.length > 0 && (
              <Badge className='absolute -top-2.5 -right-2.5 h-5 min-w-5 rounded-full px-1 tabular-nums bg-white text-black'>
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </div>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
