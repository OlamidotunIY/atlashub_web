import { MERCHANT_ROUTES } from '@/constants';
import { AuthFormHeader, LoginSchema, useLogin } from '@/features/authentication';
import { Button, Field, FieldDescription, FieldGroup, FieldLabel, Input } from '@/shared/ui';
import { useForm } from '@tanstack/react-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function LoginPage()
{
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { invitedEmail?: string; from?: string } | null;
  const login = useLogin()
  const {error, isPending} = login

  const form = useForm({
    defaultValues: {
      identifier: state?.invitedEmail || '',
      password: '',
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) =>
    {
      await login.mutateAsync({
        email: value.identifier,
        password: value.password,
        deviceFingerprint: ""
      }).then(() =>
      {
        navigate(MERCHANT_ROUTES.DASHBOARD)
      })
    },
  });

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
          title="Login to your account"
          subtitle="Enter your email below to login to your account"
        />

        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {error.message || 'Login failed. Please try again.'}
          </div>
        )}

        <form.Field
          name="identifier"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="m@example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={isPending}
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
          name="password"
          children={(field) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={isPending}
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
              <Button type="submit" disabled={!canSubmit ||isPending}>
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
            </Field>
          )}
        />

        <Field>
          <FieldDescription className="text-center">
            Don't have an account?{" "}
            <Link to={MERCHANT_ROUTES.REGISTRATION} className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
