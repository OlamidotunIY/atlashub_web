import { z } from 'zod';

export const CompleteVerificationSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
  code: z.string().min(1, 'Code is required'),
  type: z.enum(['EMAIL_VERIFICATION']), // Update this based on backend VerificationType enum if there are more
});

export type CompleteVerificationInput = z.infer<typeof CompleteVerificationSchema>;

export const VerifyMfaSchema = z.object({
  preAuthToken: z.string().min(1, 'Pre-auth token is missing'),
  code: z.string().min(1, 'MFA code is required'), // e.g., Totp code
});

export type VerifyMfaInput = z.infer<typeof VerifyMfaSchema>;
