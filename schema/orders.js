import z from 'zod';

export const ordersBaseSchema = z.object({
  orderItems: z.array(
    z.object({
      name: z.string(),
      price: z.coerce.number(),
      qty: z.coerce.number(),
      image: z.string(),
      product: z.string(),
    })
  ),
  shipping: z.object({
    address: z
      .string({ error: 'Invalid Address' })
      .nonempty({ error: 'Address is required' }),
    city: z
      .string({ error: 'Invalid City' })
      .nonempty({ error: 'City is required' }),
    postalCode: z
      .string({ error: 'Invalid Postal code' })
      .nonempty({ error: 'Postal code is required' }),
    country: z
      .string({ error: 'Invalid Country' })
      .nonempty({ error: 'Country is required' }),
  }),
  paymentMethod: z.string(),

  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      update_time: z.string(),
      email_address: z.string(),
    })
    .optional(),

  itemsPrice: z.coerce.number().prefault(0.0),
  taxPrice: z.coerce.number().prefault(0.0),
  shippingPrice: z.coerce.number().prefault(0.0),
  totalPrice: z.coerce.number().prefault(0.0),
  isPaid: z.boolean().prefault(false),
  paitAt: z.string().optional(),
  isDelivered: z.boolean().prefault(false),
  deliveredAt: z.string().optional(),
});
