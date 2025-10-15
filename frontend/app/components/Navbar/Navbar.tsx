import { useId } from 'react';
import {
  HashIcon,
  HouseIcon,
  SearchIcon,
  ShoppingCart,
  UsersRound,
} from 'lucide-react';

import UserMenu from '~/components/Navbar/user-menu';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Link } from 'react-router';

export default function Navbar() {
  const id = useId();

  return (
    <header className='border-b px-4 md:px-6 py-2 bg-gray-600'>
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
          <div className='flex items-center gap-2'>
            {/* Cart */}
            <Button
              size='icon'
              variant='ghost'
              className='relative size-8 rounded-full text-muted-foreground shadow-none mt-1 md:mt-0 cursor-pointer'
              aria-label='Open notifications'
            >
              <ShoppingCart
                size={16}
                aria-hidden='true'
                className='text-white'
              />
              <span
                aria-hidden='true'
                className='absolute -top-1 right-2 text-lime-400 size-1 text-xs rounded-full bg-primary'
              >
                10
              </span>
            </Button>
          </div>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
