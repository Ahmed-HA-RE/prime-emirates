import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '~/api/users';
import type { UserLoginForm } from 'type';
import { userLoginFormSchema } from '../../../../schema/users';
import { cn } from '~/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '~/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import AuthLayout from '~/components/layouts/AuthLayout';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon, User, UserX, X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Spinner } from '~/components/ui/spinner';
import { Alert, AlertTitle } from '~/components/ui/alert';
import { Link, useNavigate } from 'react-router';
import useUserStore from '~/store/user';
import AlertError from '~/components/AlertError';
import { useLocation } from 'react-router';

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  // Reading the query param
  const sp = useLocation().search;
  const redirect = new URLSearchParams(sp).get('redirect') || '/';

  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: (credentials: UserLoginForm) => loginUser(credentials),
    onSuccess: (data) => {
      setUser({
        _id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });
      setAccessToken(data.accessToken);

      setTimeout(() => navigate(`${redirect}`), 700);
    },
  });

  const form = useForm<UserLoginForm>({
    resolver: zodResolver(userLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const onSubmit: SubmitHandler<UserLoginForm> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    await mutateAsync(data);
  };

  const onError: SubmitErrorHandler<UserLoginForm> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <AuthLayout>
      <Form {...form}>
        <div className='space-y-3'>
          <h2 className='font-bold text-4xl md:text-5xl text-center'>Log In</h2>
          <p className='opacity-85 mb-5 text-base md:text-lg text-center'>
            Log in to view your cart and complete your orders.
          </p>
          {isSuccess ? (
            <Alert className='rounded-md border-l-6 border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400  mx-auto mb-4'>
              <User />
              <AlertTitle>You’re all set!</AlertTitle>
            </Alert>
          ) : (
            isError && <AlertError icon={<X />} message={error.message} />
          )}
        </div>
        <form
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <div className='group relative w-full'>
                  <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                    <span
                      className={cn(
                        'inline-flex',
                        'px-1',
                        form.formState.errors.email
                          ? 'text-red-500'
                          : 'text-white'
                      )}
                    >
                      Email
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder=' '
                      className='bg-transparent border-white focus-visible:ring-blue-300 focus-visible:border-blue-300'
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={isVisible ? 'text' : 'password'}
                      placeholder='Password'
                      className={cn(
                        'bg-transparent',
                        'border-white',
                        'focus-visible:ring-blue-300',
                        'focus-visible:border-blue-300',
                        'pe-9',
                        'text-white',
                        'placeholder:text-white',
                        form.formState.errors.password
                          ? 'border-red-500 placeholder:text-red-500 focus-visible:ring-red-500 focus-visible:border-red-500'
                          : 'border-white placeholder:text-white'
                      )}
                      {...field}
                    />
                    <button
                      className={cn(
                        'absolute',
                        'inset-y-0',
                        'end-0',
                        'flex',
                        'h-full',
                        'w-9',
                        'items-center',
                        'justify-center',
                        'rounded-e-md',

                        'transition-[color,box-shadow]',
                        'outline-none',
                        'hover:text-foreground',
                        'focus:z-10',
                        'focus-visible:border-ring',
                        'focus-visible:ring-[3px]',
                        'focus-visible:ring-ring/50',
                        'disabled:pointer-events-none',
                        'disabled:cursor-not-allowed',
                        'disabled:opacity-50'
                      )}
                      type='button'
                      onClick={toggleVisibility}
                      aria-label={isVisible ? 'Hide password' : 'Show password'}
                      aria-pressed={isVisible}
                      aria-controls='password'
                    >
                      {isVisible ? (
                        <EyeOffIcon
                          size={16}
                          aria-hidden='true'
                          className={cn(
                            form.formState.errors.password && 'text-red-500'
                          )}
                        />
                      ) : (
                        <EyeIcon
                          size={16}
                          aria-hidden='true'
                          className={cn(
                            form.formState.errors.password && 'text-red-500'
                          )}
                        />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size='lg'
            className='w-full text-lg bg-blue-500 hover:bg-blue-600'
            disabled={isPending}
          >
            {isPending ? <Spinner className='size-8' /> : 'Log In'}
          </Button>
          <span className='flex flex-row items-center gap-2'>
            New customer?
            <Link
              className='text-blue-500 inline-block'
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </span>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
