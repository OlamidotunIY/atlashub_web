import { MERCHANT_ROUTES } from '@/constants';
import { AuthFormHeader } from '@/features/authentication';
import { BUSINESS_SIZE, BUSINESS_TYPES, SignupSchema, useCreateUser, type SignupFormValues } from '@/features/user';
import
{
  Button,
  Input,
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
} from '@/shared/ui';
import { useForm } from '@tanstack/react-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function SignupPage()
{
  const location = useLocation();
  const state = location.state as { invitedEmail?: string; invitationToken?: string } | null;
  const createUser = useCreateUser();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: state?.invitedEmail || '',
      country: '',
      password: '',
      inviteToken: state?.invitationToken,
      businessName: "",
      businessSize: BUSINESS_SIZE.STARTER,
      businessType: BUSINESS_TYPES.EDUCATION,
      description: "",
      industry: "",
      logoUrl: "",
      websiteUrl: ""
    } as SignupFormValues,
    validators: {
      onChange: SignupSchema,
    },
    onSubmit: async ({ value }) =>
    {
      await createUser.mutateAsync(value).then(() =>
      {
        // after successful creation, navigate to email verification
        navigate(MERCHANT_ROUTES.VERIFY_EMAIL, {
          state: { identifier: value.email },
          replace: true
        });
      });
    }
  },
  );


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
          title="Create an account"
          subtitle="Enter your details below to get started"
        />

        <form.Field
          name="firstName"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="John"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
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
          name="lastName"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Doe"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
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
          name="country"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Country</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="NG"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
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
          name="email"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="m@example.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={!!state?.invitedEmail}
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
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
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
          children={([canSubmit, isSubmitting]) => (
            <Field>
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </Field>
          )}
        />

        <Field>
          <FieldDescription className="text-center mt-2">
            Already have an account?{" "}
            <Link to={MERCHANT_ROUTES.LOGIN} className="underline underline-offset-4 hover:text-primary">
              Log in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
