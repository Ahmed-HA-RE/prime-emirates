import { Link, redirect } from 'react-router';
import type { Route } from './+types/users';
import axios from 'axios';
import type { User } from 'type';
import MainLayout from '~/components/layouts/MainLayout';
import { Spinner } from '~/components/ScreenSpinner';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '~/api/users';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import {
  Check,
  Edit,
  PencilIcon,
  Trash,
  Trash2Icon,
  TriangleAlertIcon,
  X,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const refreshToken = request.headers.get('Cookie');
  if (!refreshToken) return redirect('/login');

  const token = refreshToken.split('=')[1];

  const { data } = await axios.get<User>(
    `${import.meta.env.VITE_BACKEND_URL_DEV}/users/my-profile`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (data.user.role !== 'admin') return redirect('/');
};

const UsersPage = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: getUsers,
    staleTime: 5000,
  });
  const items = [
    {
      id: '1',
      name: 'Philip George',
      src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
      fallback: 'PG',
      email: 'philipgeorge20@gmail.com',
      location: 'Mumbai, India',
      status: 'Active',
      balance: '$10,696.00',
    },
    {
      id: '2',
      name: 'Tiana Curtis',
      src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
      fallback: 'TC',
      email: 'tiana12@yahoo.com',
      location: 'New York, US',
      status: 'applied',
      balance: '$0.00',
    },
    {
      id: '3',
      name: 'Jaylon Donin',
      src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
      fallback: 'JD',
      email: 'jaylon23d.@outlook.com',
      location: 'Washington, US',
      status: 'Active',
      balance: '$569.00',
    },
    {
      id: '4',
      name: 'Kim Yim',
      src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
      fallback: 'KY',
      email: 'kim96@gmail.com',
      location: 'Busan, South Korea',
      status: 'Inactive',
      balance: '-$506.90',
    },
  ];

  return (
    <MainLayout>
      <h1 className='text-3xl md:text-4xl font-bold tracking-wide mb-8'>
        Users
      </h1>
      {error ? (
        <Alert className='bg-destructive dark:bg-destructive/60 border-none text-white'>
          <TriangleAlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription className='text-white/80'>
            Please try again or reload the page.
          </AlertDescription>
        </Alert>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <div className='w-full '>
          <div className='[&>div]:rounded-sm  [&>div]:border-black  [&>div]:border'>
            <Table>
              <TableHeader>
                <TableRow className='border-black'>
                  <TableHead className='font-bold'>ID</TableHead>
                  <TableHead className='font-bold'>Name</TableHead>
                  <TableHead className='font-bold'>Email</TableHead>
                  <TableHead className='font-bold'>ADMIN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow className='border-black hover:bg-0' key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <Avatar>
                          <AvatarFallback className='text-sm uppercase font-bold'>
                            {user.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className='font-medium'>{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.role === 'admin' ? (
                        <Check className='text-green-500' size={'30px'} />
                      ) : (
                        <X className='text-red-500' size={'30px'} />
                      )}
                    </TableCell>
                    <TableCell className='p-0'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'
                        aria-label={`user-${user._id}-edit`}
                        asChild
                      >
                        <Link to={`/admin/users/${user._id}/edit`}>
                          <PencilIcon />
                        </Link>
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'
                        aria-label={`user-${user._id}-delete`}
                      >
                        <Trash2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default UsersPage;
