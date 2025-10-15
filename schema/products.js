import z from 'zod';

export const productsBaseSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty().trim().min(3),
  image: z.string(),
  description: z.string().nonempty(),
  brand: z.string().nonempty().trim(),
  category: z.string().trim().nonempty(),
  price: z.coerce.number().nonnegative(),
  countInStock: z.coerce.number().min(0),
  rating: z.coerce.number().min(0).max(5),
  numReviews: z.coerce.number().min(0),
});
