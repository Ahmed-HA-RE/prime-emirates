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

export const userRegisterFormSchema = z
  .object({
    name: userBaseSchema.shape.name,
    email: userBaseSchema.shape.email,
    password: userBaseSchema.shape.password,
    confirmPassword: z
      .string({ error: 'Invalid Password' })
      .nonempty({ error: 'Password is required' })
      .regex(/^(?=.*[A-Z]).*$/, {
        error: 'Password must have at least one Uppercase Character.',
      })
      .regex(/^(?=.*[a-z]).*$/, {
        error: 'Password must have at least one lowercase character.',
      }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    error: "Passowrd don't match ",
  });

export const userLoginFormSchema = userBaseSchema.omit({
  role: true,
  name: true,
});
