import z from 'zod';

export const userBaseSchema = z.object({
  name: z.string().nonempty().trim(),
  email: z.email(),
  pasword: z
    .string()
    .nonempty()
    .regex(/^(?=.*[A-Z]).*$/, {
      error: 'Password must have at least one Uppercase Character.',
    })
    .regex(/^(?=.*[a-z]).*$/, {
      error: 'Password must have at least one lowercase character.',
    }),
  role: z.enum(['user', 'admin']),
});
