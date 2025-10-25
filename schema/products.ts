import z from 'zod';

export const productsBaseSchema = z.object({
  name: z
    .string({ error: 'Invalid Name' })
    .nonempty({ error: 'Product name is required' })
    .trim()
    .min(3),
  image: z
    .string({ error: 'Invalid image' })
    .nonempty({ error: 'Product image is required' }),
  description: z
    .string({ error: 'Invalid description' })
    .nonempty({ error: 'Product description is required' }),
  brand: z
    .string({ error: 'Invalid brand' })
    .nonempty({ error: 'Product brand is required' })
    .trim(),
  category: z
    .string({ error: 'Invalid category' })
    .trim()
    .nonempty({ error: 'Product category is required' }),
  price: z.coerce
    .number<number>({ error: 'Invalid price' })
    .nonnegative({ error: 'Product price can not be negative' }),
  countInStock: z.coerce
    .number<number>({ error: 'Invalid count' })
    .min(0, { error: 'Product stock can not be negative' }),
  numReviews: z.number().min(0),
});

export const createProductSchema = z.object({
  name: productsBaseSchema.shape.name,
  price: productsBaseSchema.shape.price,
  countInStock: productsBaseSchema.shape.countInStock,
  category: productsBaseSchema.shape.category,
  brand: productsBaseSchema.shape.brand,
  description: productsBaseSchema.shape.description,
});

export const updateProductSchema = createProductSchema.partial();
