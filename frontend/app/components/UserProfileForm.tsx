import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserProfile } from '~/api/users';
import type { UserUpdateForm } from 'type';
import { userUpdateInfoSchema } from '../schema/users';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from '~/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon, User, X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Spinner } from '~/components/ScreenSpinner';
import useUserStore from '~/store/user';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (credentials: UserUpdateForm) => updateUserProfile(credentials),
    onSuccess: (data) => {
      setUser({
        _id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });

      toast.success('Info updated successfully!', {
        style: {
          '--normal-bg':
            'light-dark(var(--color-green-600), var(--color-green-500))',
          '--normal-text': 'var(--color-white)',
          '--normal-border':
            'light-dark(var(--color-green-600), var(--color-green-500))',
        } as React.CSSProperties,
      });
    },
  });

  const form = useForm<UserUpdateForm>({
    resolver: zodResolver(userUpdateInfoSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name,
      email: user?.email,
    });
  }, [user]);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const onSubmit: SubmitHandler<UserUpdateForm> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
    await mutateAsync(data);
  };

  const onError: SubmitErrorHandler<UserUpdateForm> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <div className='flex-1/4 w-full'>
      <h2 className='mb-8 font-bold tracking-wide text-3xl md:text-4xl'>
        User Profile
      </h2>
      {isPending && <Spinner />}
      <Form {...form}>
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
                  <FormLabel className='origin-start group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                    <span
                      className={`inline-flex px-1 ${form.formState.errors.name ? 'text-red-500' : 'text-black'} `}
                    >
                      Full Name
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder=' '
                      className='bg-transparent border-black focus-visible:ring-blue-400 focus-visible:border-blue-400'
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
                      className={`inline-flex px-1 ${form.formState.errors.email ? 'text-red-500' : 'text-black'} `}
                    >
                      Email
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder=' '
                      className='bg-transparent border-black focus-visible:ring-blue-400 focus-visible:border-blue-400'
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
                      className={`bg-transparent focus-visible:ring-blue-400 focus-visible:border-blue-400 pe-9 text-black placeholder:text-black
                        ${form.formState.errors.password ? 'border-red-500 placeholder:text-red-500' : 'border-black placeholder:text-black'}`}
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
                        <EyeOffIcon
                          size={16}
                          aria-hidden='true'
                          color='black'
                        />
                      ) : (
                        <EyeIcon size={16} aria-hidden='true' color='black' />
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
            className='text-lg bg-black text-white'
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
