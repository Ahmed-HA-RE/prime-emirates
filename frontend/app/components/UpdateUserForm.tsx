import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import type { UserForAdmin } from 'type';
import type { UseFormReturn } from 'react-hook-form';

type UpdateUserFormProps = {
  form: UseFormReturn<
    Partial<Omit<UserForAdmin, '_id'>>,
    any,
    Partial<Omit<UserForAdmin, '_id'>>
  >;
};

const UpdateUserForm = ({ form }: UpdateUserFormProps) => {
  return (
    <>
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
      {/* Checkbox for admin role */}
      <FormField
        control={form.control}
        name='role'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className='flex flex-row items-center gap-2'>
                <Checkbox
                  className='data-[state=checked]:bg-destructive! data-[state=checked]:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:text-white'
                  aria-label='Color destructive'
                  id='admin-role'
                  checked={field.value === 'admin'}
                  onCheckedChange={(checked) => {
                    field.onChange(checked ? 'admin' : 'user');
                  }}
                />
                <Label htmlFor='admin-role'>Is Admin</Label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default UpdateUserForm;
