import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '~/api/users';
import type { UserRegisterForm } from 'type';
import { userRegisterFormSchema } from '../../../../schema/users';
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

export const meta = () => [
  {
    title: 'Register | PrimeEmirates',
  },
  {
    name: 'description',
    content:
      'Create a new PrimeEmirates account to start shopping and track your orders easily.',
  },
];

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  // Reading the query param
  const sp = useLocation().search;
  const redirect = new URLSearchParams(sp).get('redirect') || '/';

  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: (credentials: UserRegisterForm) => registerUser(credentials),
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

  const form = useForm<UserRegisterForm>({
    resolver: zodResolver(userRegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const onSubmit: SubmitHandler<UserRegisterForm> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    await mutateAsync(data);
  };

  const onError: SubmitErrorHandler<UserRegisterForm> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <AuthLayout>
      <Form {...form}>
        <div className='space-y-3'>
          <h2 className='font-bold text-4xl md:text-5xl text-center'>
            Sign Up{' '}
          </h2>
          <p className='opacity-85 mb-5 text-base md:text-lg text-center'>
            {' '}
            Create your account to access all features and start your journey
            with us.
          </p>
          {isSuccess ? (
            <Alert className='rounded-md border-l-6 border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400  mx-auto mb-4'>
              <User />
              <AlertTitle>
                {redirect
                  ? 'Redirecting back to your cart..'
                  : 'You’re all set!.'}
              </AlertTitle>
            </Alert>
          ) : (
            isError && <AlertError icon={<X />} message={error.message} />
          )}
        </div>
        <form
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <div className='group relative w-full'>
                  <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                    <span
                      className={`inline-flex px-1 ${form.formState.errors.name ? 'text-red-500' : 'text-white'} `}
                    >
                      Full Name
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
          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <div className='group relative w-full'>
                  <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                    <span
                      className={`inline-flex px-1 ${form.formState.errors.email ? 'text-red-500' : 'text-white'} `}
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
                      className={`bg-transparent border-white focus-visible:ring-blue-300 focus-visible:border-blue-300 pe-9 text-white placeholder:text-white
                        ${form.formState.errors.password ? 'border-red-500 placeholder:text-red-500' : 'border-white placeholder:text-white'}`}
                      {...field}
                    />
                    <button
                      className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                      type='button'
                      onClick={toggleVisibility}
                      aria-label={isVisible ? 'Hide password' : 'Show password'}
                      aria-pressed={isVisible}
                      aria-controls='password'
                    >
                      {isVisible ? (
                        <EyeOffIcon size={16} aria-hidden='true' color='#fff' />
                      ) : (
                        <EyeIcon size={16} aria-hidden='true' color='#fff' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={isVisible ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      className={`bg-transparent border-white focus-visible:ring-blue-300 focus-visible:border-blue-300 pe-9 text-white placeholder:text-white
                        ${form.formState.errors.confirmPassword ? 'border-red-500 placeholder:text-red-500' : 'border-white placeholder:text-white'}`}
                      {...field}
                    />
                    <button
                      className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                      type='button'
                      onClick={toggleVisibility}
                      aria-label={isVisible ? 'Hide password' : 'Show password'}
                      aria-pressed={isVisible}
                      aria-controls='password'
                    >
                      {isVisible ? (
                        <EyeOffIcon size={16} aria-hidden='true' color='#fff' />
                      ) : (
                        <EyeIcon size={16} aria-hidden='true' color='#fff' />
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
            {isPending ? <Spinner className='size-8' /> : 'Sign Up'}
          </Button>
          <span className='flex flex-row items-center gap-2'>
            Already have an account?
            <Link
              className=' text-blue-500  inline-block'
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
            >
              Login
            </Link>
          </span>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default RegisterPage;
