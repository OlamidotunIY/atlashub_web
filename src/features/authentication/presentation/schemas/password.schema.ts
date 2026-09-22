import { z } from 'zod';

export const ChangeTemporaryPasswordSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export type ChangeTemporaryPasswordInput = z.infer<typeof ChangeTemporaryPasswordSchema>;

export const SetupPasswordSchema = z.object({
  setupToken: z.string().min(1, 'Token is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export type SetupPasswordInput = z.infer<typeof SetupPasswordSchema>;

export const SetupPasswordFormSchema = z.object({
  newPassword: SetupPasswordSchema.shape.newPassword,
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SetupPasswordFormInput = z.infer<typeof SetupPasswordFormSchema>;
