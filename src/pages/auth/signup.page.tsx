import { MERCHANT_ROUTES } from '@/constants';
import { AuthButtonWidget, AuthFieldWidget, AuthFormHeader, AuthLogoWidget, AuthSelectWidget, AuthTextareaWidget } from '@/features/authentication';
import { BUSINESS_SIZE, BUSINESS_TYPES, SignupSchema, useCreateUser, type SignupFormValues } from '@/features/user';
import { toast } from '@/shared/hooks';
import
{
  Field,
  FieldDescription,
  FieldGroup,
} from '@/shared/ui';
import { useForm } from '@tanstack/react-form';
import { ShoppingCart, Landmark, GraduationCap, HeartPulse, Utensils, Truck, Building, Briefcase } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BUSINESS_TYPE_ICONS: Record<string, React.ReactNode> = {
  RETAIL: <ShoppingCart className="size-4 text-muted-foreground" />,
  FINANCE: <Landmark className="size-4 text-muted-foreground" />,
  EDUCATION: <GraduationCap className="size-4 text-muted-foreground" />,
  HEALTHCARE: <HeartPulse className="size-4 text-muted-foreground" />,
  HOSPITALITY: <Utensils className="size-4 text-muted-foreground" />,
  LOGISTICS: <Truck className="size-4 text-muted-foreground" />,
  REAL_ESTATE: <Building className="size-4 text-muted-foreground" />,
  OTHER: <Briefcase className="size-4 text-muted-foreground" />,
};

export function SignupPage()
{
  const location = useLocation();
  const state = location.state as { invitedEmail?: string; invitationToken?: string } | null;
  const { error, isError, mutateAsync: createUser } = useCreateUser()
  const navigate = useNavigate();

  useEffect(() =>
  {
    if (isError)
    {
      toast.add({
        title: error.name,
        description: error.message,
        type: 'error',
        priority: "high"
      })
    }
  }, [isError, error])

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: state?.invitedEmail || '',
      country: '',
      password: '',
      inviteToken: state?.invitationToken,
      businessName: "",
      businessSize: undefined as unknown as string,
      businessType: undefined as unknown as string,
      description: "",
      industry: "",
      logoUrl: "",
      websiteUrl: ""
    } as SignupFormValues,
    validators: {
      onSubmit: SignupSchema,
    },
    onSubmit: async ({ value }) =>
    {
      await createUser(value).then((data) =>
      {
        if (data.status)
        {
          navigate(MERCHANT_ROUTES.VERIFY_EMAIL, {
            state: { identifier: value.email },
            replace: true
          });
        }

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
      className="flex flex-col gap-6 w-full max-w-lg mx-auto"
    >
      <FieldGroup className='gap-y-5'>
        <AuthFormHeader
          title="Create an account"
          subtitle="Enter your details below to get started"
        />

        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 items-center mt-5">
          <div className="flex justify-center sm:justify-start">
            <form.Field
              name="logoUrl"
              children={(field) => (
                <AuthLogoWidget
                  id={field.name}
                  value={field.state.value}
                  onChange={(val) => field.handleChange(val)}
                  errors={field.state.meta.errors}
                  className="size-14"
                />
              )}
            />
          </div>

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
              disabled={!!state?.invitedEmail}
              required
            />
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <form.Field
            name="businessType"
            children={(field) => (
              <AuthSelectWidget
                id={field.name}
                label="Business Type"
                placeholder="Select business type"
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                errors={field.state.meta.errors}
                required
                className="w-full"
                options={Object.entries(BUSINESS_TYPES).map(([key, label]) => ({
                  value: key,
                  label,
                  icon: BUSINESS_TYPE_ICONS[key],
                }))}
              />
            )}
          />

          <form.Field
            name="businessSize"
            children={(field) => (
              <AuthSelectWidget
                id={field.name}
                label="Business Size"
                placeholder="Select business size"
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                errors={field.state.meta.errors}
                required
                className="w-full"
                options={Object.entries(BUSINESS_SIZE).map(([key, label]) => ({
                  value: key,
                  label,
                }))}
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
                required
                className="w-full"
                options={[{ value: 'NG', label: 'Nigeria (NG)' }]}
              />
            )}
          />

          <form.Field
            name="industry"
            children={(field) => (
              <AuthFieldWidget
                id={field.name}
                label="Industry"
                placeholder="e.g. Technology"
                value={field.state.value}
                onChange={(val) => field.handleChange(val)}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                className="w-full"
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
              required
            />
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <AuthButtonWidget
              text="Create account"
              loadingText="Creating account..."
              isLoading={isSubmitting}
              disabled={!canSubmit}
            />
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
