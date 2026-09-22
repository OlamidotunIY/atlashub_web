import { MERCHANT_ROUTES } from '@/constants';
import { AuthStep } from '@/domains/auth';
import { AuthFormHeader, SetupPasswordFormSchema, useAuthFlow } from '@/features/authentication';
import
  {
    Button,
    Input,
    FieldGroup,
    Field,
    FieldLabel
  } from '@/shared/ui';
import { useForm } from '@tanstack/react-form';
import { useSearchParams, useNavigate } from 'react-router-dom';

export function SetupPasswordPage()
{
  const [searchParams] = useSearchParams();
  const { submitPasswordSetup, step, error, authData } = useAuthFlow();

  // Use token from URL (if clicked from email) or from authData (if redirected from verification)
  const token = searchParams.get('token') || authData.setupToken;
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validators: {
      onChange: SetupPasswordFormSchema,
    },
    onSubmit: async ({ value }) =>
    {
      if (!token) return;
      const targetRoute = await submitPasswordSetup(
        { setupToken: token, newPassword: value.newPassword },
        MERCHANT_ROUTES.LOGIN
      );
      if (targetRoute)
      {
        navigate(targetRoute, { replace: true });
      }
    },
  });

  if (!token)
  {
    return (
      <div className="flex flex-col gap-6 w-full max-w-md mx-auto items-center text-center">
        <AuthFormHeader
          title="Invalid Link"
          subtitle="The password setup link is missing or invalid. Please check your email and try again."
        />
        <Button onClick={() => navigate(MERCHANT_ROUTES.LOGIN)}>Go to Login</Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) =>
      {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6 w-full max-w-md mx-auto"
    >
      <FieldGroup>
        <AuthFormHeader
          title="Setup your password"
          subtitle="Create a secure password for your account"
        />

        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {error.message || 'Failed to setup password. Please try again.'}
          </div>
        )}

        <form.Field
          name="newPassword"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="********"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={step === AuthStep.LOADING}
              />
              {field.state.meta.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {field.state.meta.errors.map((err) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                </p>
              ) : null}
            </Field>
          )}
        />

        <form.Field
          name="confirmPassword"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="********"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={step === AuthStep.LOADING}
              />
              {field.state.meta.errors ? (
                <p className="text-[0.8rem] font-medium text-destructive">
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
              <Button type="submit" disabled={!canSubmit || step === AuthStep.LOADING}>
                {step === AuthStep.LOADING ? 'Saving...' : 'Set Password'}
              </Button>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
