import type { Route } from './+types/editProduct';
import ProductFormLayout from '~/components/layouts/ProductFormLayout';
import { useMutation } from '@tanstack/react-query';
import { updateProductSchema } from '../../../../schema/products';
import type { UpdateProduct, User } from 'type';
import { Spinner } from '~/components/ScreenSpinner';
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getProduct, updateProduct } from '~/api/products';
import type { FileMetadata } from '~/hooks/use-file-upload';
import { useEffect, useState } from 'react';
import { Form } from '~/components/ui/form';
import UpdateProductForm from '~/components/UpdateProductForm';
import { redirect, useNavigate } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { productId } = params;

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

  return productId;
};

const UpdateProductPage = ({ loaderData }: Route.ComponentProps) => {
  const productId = loaderData;
  const navigate = useNavigate();

  const [image, setImage] = useState<File | FileMetadata>();
  const form = useForm<UpdateProduct>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      price: 0,
      countInStock: 0,
    },
  });

  const { data: product, isLoading } = useQuery({
    queryKey: ['admin', 'product'],
    queryFn: () => getProduct(productId),
    staleTime: 5000,
  });

  useEffect(() => {
    form.reset({
      name: product?.name,
      description: product?.description,
      brand: product?.brand,
      category: product?.category,
      price: product?.price,
      countInStock: product?.countInStock,
    });
  }, [product]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (productsData: FormData) =>
      updateProduct(productsData, productId),
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
      navigate('/admin/products');
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

  const onSubmit: SubmitHandler<UpdateProduct> = async (data) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);

    if (image) formData.append('image', image as File);

    if (data.description) formData.append('description', data.description);
    if (data.brand) formData.append('brand', data.brand);
    if (data.category) formData.append('category', data.category);
    if (data.countInStock)
      formData.append('countInStock', data.countInStock.toString());
    if (data.price) formData.append('price', data.price.toString());

    await mutateAsync(formData);
  };

  const onError: SubmitErrorHandler<UpdateProduct> = async (data) => {
    import.meta.env.DEV ? console.log(data) : null;
  };

  return (
    <ProductFormLayout>
      <h1 className='text-3xl md:text-4xl tracking-wide font-bold mb-6'>
        Edit Product
      </h1>

      {isLoading && <Spinner />}
      {isPending && <Spinner />}
      <Form {...form}>
        <form
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          <UpdateProductForm form={form} setImage={setImage} />
        </form>
      </Form>
    </ProductFormLayout>
  );
};

export default UpdateProductPage;
