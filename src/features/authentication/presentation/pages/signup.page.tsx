import { MERCHANT_ROUTES } from '@/constants';
import {
  authFlowStore,
  AuthButtonWidget,
  AuthErrorBanner,
  AuthFieldWidget,
  AuthFormHeader,
  AuthSelectWidget,
  AuthTextareaWidget,
} from '@/features/authentication';
import {
  INDUSTRY_OPTIONS,
  REGISTRATION_TYPE_OPTIONS,
  SignupSchema,
  useCreateUser,
  type SignupFormValues,
} from '@/features/user';
import { toast } from '@/shared/hooks';
import { Field, FieldDescription, FieldGroup } from '@/shared/ui';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { invitedEmail?: string; invitationToken?: string } | null;
  const { isPending, mutateAsync: createUser } = useCreateUser();
  const [formError, setFormError] = useState<string | null>(null);

  const defaultValues: SignupFormValues = {
    firstName: '',
    lastName: '',
    email: state?.invitedEmail || '',
    country: 'NG',
    password: '',
    inviteToken: state?.invitationToken,
    businessName: '',
    description: '',
    industry: '',
    websiteUrl: '',
    registrationType: '',
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: SignupSchema,
    },
    onSubmit: async ({ value }) => {
      setFormError(null);
      try {
        const cleaned = {
          firstName: value.firstName.trim(),
          lastName: value.lastName.trim(),
          email: value.email.trim(),
          password: value.password,
          country: value.country.trim() || 'NG',
          businessName: value.businessName.trim(),
          registrationType: value.registrationType as SignupFormValues['registrationType'],
          industry: value.industry as SignupFormValues['industry'],
          description: value.description?.trim() || undefined,
          websiteUrl: value.websiteUrl?.trim() || undefined,
          logoUrl: (value as any).logoUrl?.trim() || undefined,
          inviteToken: value.inviteToken?.trim() || undefined,
        };

        await createUser(cleaned as any);
        authFlowStore.getState().beginEmailVerification(cleaned.email);
        toast.add({
          title: 'Account created successfully',
          description: 'Please check your email to verify your account.',
          type: 'success',
        });
        navigate(MERCHANT_ROUTES.VERIFY_EMAIL);
      } catch (err: any) {
        const message = err?.message || 'Could not register user. Please try again.';
        setFormError(message);
        toast.add({
          title: 'Registration failed',
          description: message,
          type: 'error',
          priority: 'high',
        });
      }
    },
    onSubmitInvalid: ({ formApi }) => {
      const errorMap = formApi.state.errorMap?.onSubmit;
      let firstMsg = 'Please fill in all required fields properly.';
      if (typeof errorMap === 'string') {
        firstMsg = errorMap;
      }
      setFormError(firstMsg);
      toast.add({
        title: 'Validation Error',
        description: firstMsg,
        type: 'error',
        priority: 'high',
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6 w-full max-w-lg mx-auto"
    >
      <FieldGroup className="gap-y-5">
        <AuthFormHeader
          title="Create an account"
          subtitle="Enter your details below to get started"
        />

        {formError && (
          <AuthErrorBanner error={new Error(formError)} />
        )}

        <div className="mt-5">
          <form.Field
            name="businessName"
            children={(field) => (
              <AuthFieldWidget
                id={field.name}
                label="Business Name"
                placeholder="Arcn."
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                disabled={isPending}
                required
                className="w-full"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <form.Field
            name="firstName"
            children={(field) => (
              <AuthFieldWidget
                id={field.name}
                label="First Name"
                placeholder="John"
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                disabled={isPending}
                required
                className="w-full"
              />
            )}
          />

          <form.Field
            name="lastName"
            children={(field) => (
              <AuthFieldWidget
                id={field.name}
                label="Last Name"
                placeholder="Doe"
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                disabled={isPending}
                required
                className="w-full"
              />
            )}
          />
        </div>

        <form.Field
          name="email"
          children={(field) => (
            <AuthFieldWidget
              id={field.name}
              label="Email"
              type="email"
              placeholder="m@example.com"
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
              disabled={!!state?.invitedEmail || isPending}
              required
            />
          )}
        />

        <div className="gap-5 w-full">
          <form.Field
            name="registrationType"
            children={(field) => (
              <AuthSelectWidget
                id={field.name}
                label="Registration Type"
                placeholder="Select registration type"
                value={field.state.value}
                onChange={(val) => field.handleChange(val as SignupFormValues['registrationType'])}
                errors={field.state.meta.errors}
                disabled={isPending}
                required
                className="w-full"
                options={[...REGISTRATION_TYPE_OPTIONS]}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <form.Field
            name="country"
            children={(field) => (
              <AuthSelectWidget
                id={field.name}
                label="Country"
                placeholder="Select Country"
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                errors={field.state.meta.errors}
                disabled={isPending}
                required
                className="w-full"
                options={[{ value: 'NG', label: 'Nigeria (NG)' }]}
              />
            )}
          />

          <form.Field
            name="industry"
            children={(field) => (
              <AuthSelectWidget
                id={field.name}
                label="Industry"
                placeholder="Select industry"
                value={field.state.value}
                onChange={(val) => field.handleChange(val as SignupFormValues['industry'])}
                errors={field.state.meta.errors}
                disabled={isPending}
                required
                className="w-full"
                options={[...INDUSTRY_OPTIONS]}
              />
            )}
          />
        </div>

        <form.Field
          name="description"
          children={(field) => (
            <AuthTextareaWidget
              id={field.name}
              label="Description"
              placeholder="Briefly describe your business..."
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
              disabled={isPending}
            />
          )}
        />

        <form.Field
          name="websiteUrl"
          children={(field) => (
            <AuthFieldWidget
              id={field.name}
              label="Website URL"
              type="url"
              placeholder="https://yourwebsite.com"
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
              required
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <AuthButtonWidget
              text="Create account"
              loadingText="Creating account..."
              isLoading={isSubmitting || isPending}
              disabled={isSubmitting || isPending}
            />
          )}
        />

        <Field>
          <FieldDescription className="text-center mt-2">
            Already have an account?{' '}
            <Link to={MERCHANT_ROUTES.LOGIN} className="underline underline-offset-4 hover:text-primary">
              Log in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
