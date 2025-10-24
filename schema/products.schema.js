import z from 'zod';

export const productsBaseSchema = z.object({
  name: z.string().nonempty().trim().min(3),
  image: z.string(),
  description: z.string().nonempty(),
  brand: z.string().nonempty().trim(),
  category: z.string().trim().nonempty(),
  price: z.coerce.number().nonnegative(),
  countInStock: z.coerce.number().min(0),
  reviews: z.array(
    z.object({
      name: z.string(),
      rating: z.coerce.number(),
      comment: z.string(),
    })
  ),
  numReviews: z.coerce.number().min(0),
});

export const createProductSchema = productsBaseSchema.omit({
  image: true,
  reviews: true,
  numReviews: true,
});
