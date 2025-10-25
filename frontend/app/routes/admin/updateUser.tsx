import { redirect, useNavigate } from 'react-router';
import type { Route } from './+types/updateUser';
import type { User, UpdateUserAsAdmin } from 'type';
import axios from 'axios';
import FormLayout from '~/components/layouts/FormLayout';
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';
import { getUser, updateUserAsAdmin } from '~/api/users';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/ScreenSpinner';
import { Form } from '~/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { userForAdminUpdateSchema } from '../../../../schema/users';
import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner';
import UpdateUserForm from '~/components/UpdateUserForm';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { userId } = params;
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
  return userId;
};

const UpdateUserPage = ({ loaderData }: Route.ComponentProps) => {
  const userId = loaderData;
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'user'],
    queryFn: () => getUser(userId),
  });

  const form = useForm<UpdateUserAsAdmin>({
    resolver: zodResolver(userForAdminUpdateSchema),
    defaultValues: {
      email: '',
      name: '',
      role: 'user',
    },
  });

  useEffect(() => {
    form.reset(user);
  }, [user]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (updateUserAsAdminData: UpdateUserAsAdmin) =>
      updateUserAsAdmin(userId, updateUserAsAdminData),
    onSuccess: (data) => {
      toast.success('Product created successfully', {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-500))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-500))',
        } as React.CSSProperties,
      });
      refetch;
      navigate('/admin/users');
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

  const onSubmit: SubmitHandler<UpdateUserAsAdmin> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    await mutateAsync(data);
  };

  const onError: SubmitErrorHandler<UpdateUserAsAdmin> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <FormLayout adminLinks='users'>
      <h1 className='font-bold tracking-wide text-3xl md:text-4xl mb-8'>
        Edit User
      </h1>

      {isLoading ? (
        <Spinner />
      ) : isPending ? (
        <Spinner />
      ) : error ? (
        <Alert className='bg-destructive dark:bg-destructive/60 border-none text-white max-w-md'>
          <TriangleAlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription className='text-white/80'>
            Please try again or reload the page.
          </AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className='space-y-6'
          >
            <UpdateUserForm form={form} />

            <Button size='lg' className='text-lg bg-black text-white'>
              Update
            </Button>
          </form>
        </Form>
      )}
    </FormLayout>
  );
};

export default UpdateUserPage;
