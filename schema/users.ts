import z from 'zod';

export const userBaseSchema = z.object({
  name: z
    .string({ error: 'Invalid Name' })
    .nonempty({ error: 'Name is required' })
    .trim(),
  email: z
    .email({ error: 'Invalid Email' })
    .nonempty({ error: 'Email is required' }),
  password: z
    .string({ error: 'Invalid Password' })
    .nonempty({ error: 'Password is required' })
    .regex(/^(?=.*[A-Z]).*$/, {
      error: 'Password must have at least one Uppercase Character.',
    })
    .regex(/^(?=.*[a-z]).*$/, {
      error: 'Password must have at least one lowercase character.',
    }),
  role: z.enum(['user', 'admin']),
});
