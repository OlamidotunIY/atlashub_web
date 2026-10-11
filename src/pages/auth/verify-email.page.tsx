import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import {
  Button,
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/shared/ui';
import {
  authFlowStore,
  AuthFormHeader,
  AuthErrorBanner,
  useVerifyEmail,
  useResendVerification,
} from '@/features/authentication';
import { MERCHANT_ROUTES } from '@/constants';
import { toast } from '@/shared/hooks';

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { identifier?: string } | null;
  const verificationEmail = authFlowStore((state) => state.verificationEmail);
  const clearEmailVerification = authFlowStore((state) => state.clearEmailVerification);
  const identifier = verificationEmail ?? state?.identifier;

  const { mutateAsync: verifyEmail, error: verifyError, isPending: isVerifying } = useVerifyEmail();
  const { mutateAsync: resendCode, error: resendError, isPending: isResending } = useResendVerification();

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!identifier || isResending || countdown > 0) return;
    try {
      await resendCode(identifier);
      setCountdown(60);
      toast.add({
        title: 'Verification code resent',
        description: `We've sent a new 6-digit verification code to ${identifier}.`,
        type: 'success',
      });
    } catch (err: any) {
      toast.add({
        title: 'Failed to resend code',
        description: err?.message || 'Could not resend verification code. Please try again.',
        type: 'error',
        priority: 'high',
      });
    }
  };

  const handleBackToLogin = () => {
    clearEmailVerification();
    navigate(MERCHANT_ROUTES.LOGIN);
  };

  const form = useForm({
    defaultValues: {
      code: '',
    },
    validators: {
      onChange: ({ value }) => {
        if (!value.code || value.code.length < 6) {
          return 'Please enter a valid 6-digit code';
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      if (!identifier) return;

      try {
        await verifyEmail({
          email: identifier,
          otp: value.code,
        });
        clearEmailVerification();
        toast.add({
          title: 'Email verified successfully',
          description: 'Your account has been verified. You can now log in.',
          type: 'success',
        });
        navigate(MERCHANT_ROUTES.LOGIN);
      } catch (err: any) {
        toast.add({
          title: 'Verification failed',
          description: err?.message || 'Failed to verify email. Please check the code and try again.',
          type: 'error',
          priority: 'high',
        });
      }
    },
  });

  if (!identifier) {
    return <Navigate to={MERCHANT_ROUTES.LOGIN} replace />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6 w-full max-w-sm mx-auto"
    >
      <FieldGroup>
        <AuthFormHeader
          title="Verify your email"
          subtitle={`We sent a 6-digit code to ${identifier}`}
        />

        <AuthErrorBanner error={verifyError || resendError} />

        <form.Field
          name="code"
          children={(field) => (
            <Field className="items-center w-full">
              <FieldLabel htmlFor={field.name} className="sr-only">
                Verification Code
              </FieldLabel>
              <div className="flex w-full justify-center">
                <InputOTP
                  maxLength={6}
                  value={field.state.value}
                  onChange={(val: string) => field.handleChange(val)}
                  disabled={isVerifying}
                >
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="mx-2" />
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator className="mx-2" />
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {field.state.meta.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive mt-2 text-center">
                  {field.state.meta.errors.join(', ')}
                </p>
              ) : null}
            </Field>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Field>
              <Button type="submit" disabled={!canSubmit || isVerifying || isSubmitting}>
                {isVerifying || isSubmitting ? 'Verifying...' : 'Verify Email'}
              </Button>
            </Field>
          )}
        />

        <Field>
          <FieldDescription className="text-center mt-2">
            Didn't receive a code?{' '}
            <button
              type="button"
              disabled={isResending || countdown > 0}
              className="underline underline-offset-4 hover:text-primary font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
              onClick={handleResend}
            >
              {isResending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend'}
            </button>
          </FieldDescription>
          <FieldDescription className="text-center mt-1">
            <button
              type="button"
              className="underline underline-offset-4 hover:text-primary text-xs"
              onClick={handleBackToLogin}
            >
              Back to login
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
