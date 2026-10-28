import { z } from 'zod';

export const LoginSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'), // Email or employee code
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
