import type { FileMetadata } from '~/hooks/use-file-upload';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import UploadProductImage from './UploadProductImage';
import { Textarea } from './ui/textarea';
import { cn } from '~/lib/utils';
import type { CreateProduct } from 'type';
import type { UseFormReturn } from 'react-hook-form';

type CreateProductFormProps = {
  form: UseFormReturn<Partial<CreateProduct>, any, Partial<CreateProduct>>;
  setImage: React.Dispatch<
    React.SetStateAction<File | FileMetadata | undefined>
  >;
};

const UpdateProductForm = ({ form, setImage }: CreateProductFormProps) => {
  return (
    <>
      {/* Name */}
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <div className='group relative w-full'>
              <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                <span
                  className={cn(
                    'inline-flex',
                    'px-1',
                    form.formState.errors.name ? 'text-red-500' : 'text-black'
                  )}
                >
                  Name
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder=' '
                  className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Price */}
      <FormField
        control={form.control}
        name='price'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type='number'
                step={0.01}
                placeholder=' '
                className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                {...field}
                min={0}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Count In Stock */}
      <FormField
        control={form.control}
        name='countInStock'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Count In Stock</FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder=' '
                className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                {...field}
                min={0}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Brand */}
      <FormField
        control={form.control}
        name='brand'
        render={({ field }) => (
          <FormItem>
            <div className='group relative w-full'>
              <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                <span
                  className={cn(
                    'inline-flex',
                    'px-1',
                    form.formState.errors.brand ? 'text-red-500' : 'text-black'
                  )}
                >
                  Brand
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder=' '
                  className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Category */}
      <FormField
        control={form.control}
        name='category'
        render={({ field }) => (
          <FormItem>
            <div className='group relative w-full'>
              <FormLabel className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium'>
                <span
                  className={cn(
                    'inline-flex',
                    'px-1',
                    form.formState.errors.category
                      ? 'text-red-500'
                      : 'text-black'
                  )}
                >
                  Category
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder=' '
                  className='bg-transparent border-black focus-visible:ring-blue-300 focus-visible:border-blue-300'
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Description */}
      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className='w-full space-y-2'>
                <Textarea
                  placeholder='Type your product description here'
                  className={cn(
                    'resize-none',
                    'bg-transparent',
                    'border-black',
                    'focus-visible:ring-blue-300',
                    'focus-visible:border-blue-300',
                    form.formState.errors.description &&
                      'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500'
                  )}
                  id={'description'}
                  {...field}
                />
                <p className='text-muted-foreground text-end text-xs'>
                  Provide a detailed and accurate description for the product.
                </p>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <UploadProductImage setImage={setImage} />
      <Button className='mt-5' size={'lg'}>
        Create
      </Button>
    </>
  );
};

export default UpdateProductForm;
