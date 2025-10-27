import z from 'zod';

const reviewsSchema = z.object({
  name: z.string(),
  rating: z.coerce
    .number<number>({
      error: 'Choose the rating for the product',
    })
    .max(5, { error: 'Rating must be between 0-5' }),
  comment: z
    .string({ error: 'Invalid comment' })
    .min(4, { error: 'Comment must be at least 4 characters long' })
    .max(150, { error: 'Comment cannot exceed 50 characters' }),
  user: z.string(),
});

export const productsBaseSchema = z.object({
  name: z
    .string({ error: 'Invalid name' })
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
  rating: z.coerce.number<number>(),
  reviews: z.array(reviewsSchema),
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

export const createReviewSchema = reviewsSchema.pick({
  rating: true,
  comment: true,
});
