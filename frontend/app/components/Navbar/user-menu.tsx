import {
  BoltIcon,
  PackageSearch,
  LogOutIcon,
  User,
  Truck,
  Users,
} from 'lucide-react';
import { useState } from 'react';

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

type User = {
  role: string;
};

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-auto p-0 hover:bg-black/50 bg-black/40 text-white rounded-full transition cursor-pointer duration-300 font-bold'
        >
          <Avatar>
            <AvatarImage src='' alt='Profile image' />
            <AvatarFallback className='text-base'>AH</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-64 bg-gray-700' align='end'>
        <DropdownMenuLabel className='flex min-w-0 flex-col'>
          <span className='truncate text-sm font-medium text-foreground'>
            Keith Kennedy
          </span>
          <span className='truncate text-xs font-normal text-muted-foreground'>
            k.kennedy@coss.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-white' />
        <DropdownMenuGroup>
          {userMenuLinks.map((link) => (
            <DropdownMenuItem>
              {link.icon}
              <span>{link.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='bg-white' />

        {/* Logout */}
        <DropdownMenuItem>
          <LogOutIcon size={16} className='opacity-60' aria-hidden='true' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
