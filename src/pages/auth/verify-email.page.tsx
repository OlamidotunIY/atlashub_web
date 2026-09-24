import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import
{
  Button,
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/ui';
import { AuthFormHeader, useVerifyEmail } from '@/features/authentication';
import { MERCHANT_ROUTES } from '@/constants';
import { toast } from '@/shared/hooks';

export function VerifyEmailPage()
{
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { identifier?: string; } | null;
  const identifier = state?.identifier;
  const { mutateAsync, error, isPending } = useVerifyEmail()

  const form = useForm({
    defaultValues: {
      code: '',
    },
    validators: {
      onChange: ({ value }) =>
      {
        if (!value.code || value.code.length < 6)
        {
          return 'Please enter a valid 6-digit code';
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) =>
    {
      if (!identifier) return;

      const verificationPromise = mutateAsync({
        email: identifier,
        otp: value.code
      })

      toast.promise(
        verificationPromise,
        {
          loading: 'Verifying your email...',
          success: 'Email verified! A setup link has been sent to your email to configure your account.',
          error: 'Failed to verify email. Please check the code and try again.'
        }
      );

      setTimeout(() =>
      {
        navigate(MERCHANT_ROUTES.DASHBOARD, { replace: true });
      }, 3500);
    },
  });

  if (!identifier)
  {
    return <Navigate to={MERCHANT_ROUTES.LOGIN} replace />;
  }

  return (
    <form
      onSubmit={(e) =>
      {
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

        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {error.message || 'Verification failed. Please try again.'}
          </div>
        )}

        <form.Field
          name="code"
          children={(field) => (
            <Field className="items-center">
              <FieldLabel htmlFor={field.name} className="sr-only">Verification Code</FieldLabel>
              <InputOTP
                maxLength={6}
                value={field.state.value}
                onChange={(val: string) => field.handleChange(val)}
                disabled={isPending}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {field.state.meta.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive mt-2 text-center">
                  {field.state.meta.errors.map((err) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                </p>
              ) : null}
            </Field>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit]) => (
            <Field>
              <Button type="submit" disabled={!canSubmit || isPending}>
                {isPending ? 'Verifying...' : 'Verify Email'}
              </Button>
            </Field>
          )}
        />

        <Field>
          <FieldDescription className="text-center mt-2">
            Didn't receive a code?{" "}
            <button
              type="button"
              className="underline underline-offset-4 hover:text-primary"
              onClick={() =>
              {
                // You can wire up resend functionality here if needed
              }}
            >
              Resend
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
