import { Link, redirect } from 'react-router';
import type { Route } from './+types/users';
import axios from 'axios';
import type { User } from 'type';
import MainLayout from '~/components/layouts/MainLayout';
import { Spinner } from '~/components/ScreenSpinner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteUserAsAdmin, getUsers } from '~/api/users';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import {
  Check,
  PencilIcon,
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
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { useState } from 'react';
import { toast } from 'sonner';

export const meta = () => [
  { title: 'All Users | Admin - PrimEmirates' },
  {
    name: 'description',
    content:
      'Admin panel to view and manage all registered users on PrimEmirates.',
  },
];

const UsersPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState('');

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: getUsers,
    staleTime: 5000,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteUserAsAdmin(userId),
    onSuccess: () => {
      toast.success('User deleted successfully', {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-500))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-500))',
        } as React.CSSProperties,
      });
      refetch();
    },

    onError: (error) => {
      toast.error(error.message, {
        style: {
          '--normal-bg':
            'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
          '--normal-text': 'var(--color-white)',
          '--normal-border': 'transparent',
        } as React.CSSProperties,
      });
    },
  });

  const handleDeleteUser = async () => {
    await mutateAsync();
    setOpenModal(false);
  };

  return (
    <MainLayout>
      <h1 className='text-3xl md:text-4xl font-bold tracking-wide mb-8'>
        Users
      </h1>
      {error ? (
        <Alert className='bg-destructive dark:bg-destructive/60 border-none text-white max-w-md'>
          <TriangleAlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription className='text-white/80'>
            Please try again or reload the page.
          </AlertDescription>
        </Alert>
      ) : isLoading ? (
        <Spinner />
      ) : isPending ? (
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
                    {user?.role !== 'admin' ? (
                      <TableCell className='p-0'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='rounded-full'
                          aria-label={`user-${user._id}-edit`}
                          asChild
                        >
                          <Link to={`/admin/user/${user._id}/edit`}>
                            <PencilIcon />
                          </Link>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='rounded-full'
                          aria-label={`user-${user._id}-delete`}
                          onClick={() => {
                            setUserId(user._id);
                            setOpenModal(true);
                          }}
                        >
                          <Trash2Icon />
                        </Button>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      <AlertDialog open={openModal}>
        <AlertDialogContent>
          <AlertDialogHeader className='items-center'>
            <div className='bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
              <TriangleAlertIcon className='text-destructive size-6' />
            </div>
            <AlertDialogTitle>
              Are you absolutely sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center'>
              This action cannot be undone. This will permanently delete your
              product and remove it from our database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className='bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white'
              onClick={handleDeleteUser}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default UsersPage;
