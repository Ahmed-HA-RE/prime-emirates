import { PackageSearch, LogOutIcon, User, Truck, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { logout } from '~/api/users';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import useUserStore from '~/store/user';

type User = {
  role: string;
};

export default function UserMenu() {
  const user = useUserStore((state) => state.user);
  const setLogout = useUserStore((state) => state.setLogout);
  const navigate = useNavigate();

  const isAdmin =
    user && user.role == 'admin'
      ? [
          {
            href: '/products',
            label: 'Products',
            icon: (
              <PackageSearch
                size={16}
                className='opacity-85'
                aria-hidden='true'
              />
            ),
          },
          {
            href: '/orders',
            label: 'Orders',
            icon: <Truck size={16} className='opacity-85' aria-hidden='true' />,
          },
          {
            href: '/users',
            label: 'Users',
            icon: <Users size={16} className='opacity-85' aria-hidden='true' />,
          },
        ]
      : [];

  const userMenuLinks = [
    {
      href: '/profile',
      label: 'Profile',
      icon: <User size={16} className='opacity-85' aria-hidden='true' />,
    },
    ...isAdmin,
  ];

  const handleLogout = async () => {
    await logout();
    setLogout();
    navigate('/');
  };

  return !user ? (
    <Button
      asChild
      className='from-primary via-primary/60 to-primary bg-transparent bg-gradient-to-r [background-size:200%_auto] hover:bg-transparent hover:bg-[99%_center]'
    >
      <Link to='/register'>Get Started</Link>
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-auto p-0 hover:bg-black/50 '>
          <Avatar>
            <AvatarImage src='' alt='Profile image' />
            <AvatarFallback className='text-base bg-black/40 text-white'>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-64 bg-gray-700' align='end'>
        <DropdownMenuLabel className='flex min-w-0 flex-col'>
          <span className='truncate text-sm font-medium text-white'>
            {user.name}
          </span>
          <span className='truncate text-xs font-normal text-white'>
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-white' />
        <DropdownMenuGroup>
          {userMenuLinks.map((link) => (
            <DropdownMenuItem asChild key={link.label}>
              <Link
                className='flex items-center gap-2 text-white hover:text-black cursor-pointer'
                to={link.href}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='bg-white' />

        {/* Logout */}
        <DropdownMenuItem className='cursor-pointer text-white hover:text-black'>
          <LogOutIcon size={16} className='opacity-85' aria-hidden='true' />
          <span onClick={handleLogout}>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
