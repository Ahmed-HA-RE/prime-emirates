import type { Route } from './+types/createProduct';
import FormLayout from '~/components/layouts/FormLayout';
import { useMutation } from '@tanstack/react-query';
import { createProductSchema } from '../../../../schema/products';
import type { CreateProduct, User } from 'type';
import { Spinner } from '~/components/ScreenSpinner';
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createProduct } from '~/api/products';
import type { FileMetadata } from '~/hooks/use-file-upload';
import { useState } from 'react';
import { Form } from '~/components/ui/form';
import CreateProductForm from '~/components/CreateProductForm';
import { redirect } from 'react-router';
import axios from 'axios';

export const meta = () => [
  { title: 'Create Product | Admin - PrimeEmirates' },
  {
    name: 'description',
    content:
      'Admin panel to create new products for the PrimeEmirates marketplace.',
  },
];

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

const CreateProductPage = () => {
  const [image, setImage] = useState<File | FileMetadata>();
  const form = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      price: 0,
      countInStock: 0,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (productsData: FormData) => createProduct(productsData),
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
      form.reset();
      window.location.reload();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

  const onSubmit: SubmitHandler<CreateProduct> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);

    if (image) {
      formData.append('image', image as File);
    }
    formData.append('description', data.description);
    formData.append('brand', data.brand);
    formData.append('category', data.category);
    formData.append('price', data.price.toString());
    formData.append('countInStock', data.countInStock.toString());

    await mutateAsync(formData);
  };

  const onError: SubmitErrorHandler<CreateProduct> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <FormLayout adminLinks='products'>
      <h1 className='text-3xl md:text-4xl tracking-wide font-bold mb-6'>
        Create Product
      </h1>

      {isPending && <Spinner />}
      <Form {...form}>
        <form
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          <CreateProductForm form={form} setImage={setImage} />
        </form>
      </Form>
    </FormLayout>
  );
};

export default CreateProductPage;
