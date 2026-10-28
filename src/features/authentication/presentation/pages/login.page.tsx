import { MERCHANT_ROUTES } from '@/constants';
import { AuthButtonWidget, AuthFieldWidget, authFlowStore, AuthFormHeader, LoginSchema, useLogin } from '@/features/authentication';
import { getDeviceFingerprint } from '@/shared/lib';
import { Field, FieldDescription, FieldGroup } from '@/shared/ui';
import { useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function LoginPage()
{
  const location = useLocation();
  const state = location.state as { invitedEmail?: string; from?: string } | null;
  const login = useLogin()
  const { error, isPending } = login

  const form = useForm({
    defaultValues: {
      identifier: state?.invitedEmail || '',
      password: '',
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) =>
    {
      await login.mutateAsync({
        email: value.identifier,
        password: value.password,
        deviceFingerprint: getDeviceFingerprint()
      });
    },
  });

  useEffect(() =>
  {
    if (error)
    {
      if (error.message === "Email verification is required to login")
      {
        authFlowStore.getState().beginEmailVerification(form.getFieldValue("identifier"));
      }
    }
  }, [error, form]);

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
            <AuthFieldWidget
              id={field.name}
              label="Email"
              placeholder="m@example.com"
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
              disabled={isPending}
            />
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <AuthFieldWidget
              id={field.name}
              label="Password"
              type="password"
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
              disabled={isPending}
              labelAction={
                <Link
                  to="#"
                  className="text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              }
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit]) => (
            <AuthButtonWidget
              text="Login"
              loadingText="Logging in..."
              isLoading={isPending}
              disabled={!canSubmit}
            />
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
