import { z } from 'zod';

export const userBaseSchema = z.object({
  name: z.string().nonempty().trim(),
  email: z.email(),
  password: z
    .string()
    .nonempty()
    .regex(/^(?=.*[A-Z]).*$/, {
      error: 'Password must have at least one Uppercase Character.',
    })
    .regex(/^(?=.*[a-z]).*$/, {
      error: 'Password must have at least one lowercase character.',
    }),
  role: z.enum(['user', 'admin']).prefault('user'),
});

export const userLoginSchema = userBaseSchema.pick({
  email: true,
  password: true,
});
