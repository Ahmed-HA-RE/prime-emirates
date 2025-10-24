import { PackageSearch, LogOutIcon, User, Truck, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { getUserProfile, logout } from '~/api/users';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '../ui/spinner';

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
import useCartStore from '~/store/cart';
import { useQuery } from '@tanstack/react-query';
import useShippingStore from '~/store/shipping';

export default function UserMenu() {
  const setLogout = useUserStore((state) => state.setLogout);
  const clearCart = useCartStore((state) => state.clearCart);
  const setClearAddress = useShippingStore((state) => state.setClearAddress);
  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['user', user],
    queryFn: getUserProfile,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/login');
    },
  });

  const links = [
    {
      role: 'admin',
      href: '/products',
      label: 'Products',
      icon: (
        <PackageSearch size={16} className='opacity-85' aria-hidden='true' />
      ),
    },
    {
      role: 'admin',
      href: '/orders',
      label: 'Orders',
      icon: <Truck size={16} className='opacity-85' aria-hidden='true' />,
    },
    {
      role: 'admin',
      href: '/users',
      label: 'Users',
      icon: <Users size={16} className='opacity-85' aria-hidden='true' />,
    },
    {
      href: '/profile',
      label: 'Profile',
      role: 'user',
      icon: <User size={16} />,
    },
  ];

  const handleLogout = async () => {
    await mutateAsync();
    setLogout();
    clearCart();
    setClearAddress();
  };

  if (isPending) {
    return <Spinner className='text-cyan-700 size-9 mx-auto' />;
  }

  if (!accessToken) {
    return (
      <Button
        asChild
        className='from-primary via-primary/60 to-primary bg-transparent bg-gradient-to-r [background-size:200%_auto] hover:bg-transparent hover:bg-[99%_center]'
      >
        <Link to='/register'>Get Started</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-auto p-0 hover:bg-black/50 '>
          <Avatar>
            <AvatarImage src='' alt='Profile image' />
            <AvatarFallback className='text-base bg-black/40 text-white'>
              {data?.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-64 bg-gray-700' align='end'>
        <DropdownMenuLabel className='flex min-w-0 flex-col'>
          <span className='truncate text-sm font-medium text-white'>
            {data?.user.name}
          </span>
          <span className='truncate text-xs font-normal text-white'>
            {data?.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-white' />
        <DropdownMenuGroup>
          {links
            .filter((link) => link.role === user?.role)
            .map((link) => (
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
        <DropdownMenuItem
          onClick={handleLogout}
          className='cursor-pointer text-white hover:text-black'
        >
          <LogOutIcon size={16} className='opacity-85' aria-hidden='true' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
