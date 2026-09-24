import { useState } from 'react';
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui';
import { useForm } from '@tanstack/react-form';
import { ShoppingCart, Landmark, GraduationCap, HeartPulse, Utensils, Truck, Building, Briefcase, Eye, EyeOff, Camera } from 'lucide-react';
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
  const createUser = useCreateUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: state?.invitedEmail || '',
      country: '',
      password: '',
      inviteToken: state?.invitationToken,
      businessName: "",
      businessSize: undefined as any,
      businessType: undefined as any,
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
      className="flex flex-col gap-6 w-full max-w-lg mx-auto"
    >
      <FieldGroup className='gap-y-5'>
        <AuthFormHeader
          title="Create an account"
          subtitle="Enter your details below to get started"
        />

        <div className="flex w-full gap-x-5 items-center mt-5">
          <form.Field
            name="logoUrl"
            children={(field) =>
            {
              const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
              {
                const file = e.target.files?.[0];
                if (file)
                {
                  const previewUrl = URL.createObjectURL(file);
                  field.handleChange(previewUrl);
                }
              };

              return (
                <Field className="size-14">
                  <label htmlFor="logo-upload" className="cursor-pointer group block" title="Upload Logo">
                    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/50 group-hover:bg-muted transition-colors">
                      {field.state.value ? (
                        <img src={field.state.value} alt="Logo preview" className="size-full object-cover" />
                      ) : (
                        <Camera className="size-5 text-muted-foreground" />
                      )}
                    </div>
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-[0.8rem] font-medium text-destructive mt-1">
                      {field.state.meta.errors.map((err) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                    </p>
                  ) : null}
                </Field>
              );
            }}
          />

          <form.Field
            name="businessName"
            children={(field) => (
              <Field className="flex-1">
                <FieldLabel htmlFor={field.name}>Business Name<span className="text-destructive"> *</span></FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Arcn."
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
        </div>

        <div className='flex w-full gap-x-5'>
          <form.Field
            name="firstName"
            children={(field) => (
              <Field className="flex-1">
                <FieldLabel htmlFor={field.name}>First Name<span className="text-destructive"> *</span></FieldLabel>
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
              <Field className="flex-1">
                <FieldLabel htmlFor={field.name}>Last Name<span className="text-destructive"> *</span></FieldLabel>
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
        </div>

        <form.Field
          name="email"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email<span className="text-destructive"> *</span></FieldLabel>
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

        <div className='flex w-full gap-x-5'>
          <form.Field
            name="businessType"
            children={(field) => (
              <Field className="flex-1">
                <FieldLabel htmlFor={field.name}>Business Type<span className="text-destructive"> *</span></FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val as string)}
                >
                  <SelectTrigger id={field.name} className="w-full">
                    {field.state.value ? (
                      <span data-slot="select-value" className="flex flex-1 text-left items-center gap-2">
                        {BUSINESS_TYPE_ICONS[field.state.value]}
                        <span>{BUSINESS_TYPES[field.state.value as keyof typeof BUSINESS_TYPES]}</span>
                      </span>
                    ) : (
                      <SelectValue placeholder="Select business type" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BUSINESS_TYPES).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {BUSINESS_TYPE_ICONS[key]}
                          <span>{label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors ? (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {field.state.meta.errors.map((err) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                  </p>
                ) : null}
              </Field>
            )}
          />

          <form.Field
            name="businessSize"
            children={(field) => (
              <Field className="flex-1">
                <FieldLabel htmlFor={field.name}>Business Size<span className="text-destructive"> *</span></FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val as string)}
                >
                  <SelectTrigger id={field.name} className="w-full">
                    {field.state.value ? (
                      <span data-slot="select-value" className="flex flex-1 text-left items-center gap-2">
                        <span>{BUSINESS_SIZE[field.state.value as keyof typeof BUSINESS_SIZE]}</span>
                      </span>
                    ) : (
                      <SelectValue placeholder="Select business size" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BUSINESS_SIZE).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.errors ? (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {field.state.meta.errors.map((err) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                  </p>
                ) : null}
              </Field>
            )}
          />
        </div>

        <div className='flex w-full gap-x-5'>
          <form.Field
            name="country"
            children={(field) => (
              <Field className="flex-1">
                <FieldLabel htmlFor={field.name}>Country<span className="text-destructive"> *</span></FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val as string)}
                >
                  <SelectTrigger id={field.name} className="w-full">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NG">Nigeria (NG)</SelectItem>
                  </SelectContent>
                </Select>
                {field.state.meta.errors ? (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {field.state.meta.errors.map((err) => typeof err === 'string' ? err : err?.message || JSON.stringify(err)).join(', ')}
                  </p>
                ) : null}
              </Field>
            )}
          />

          <form.Field
            name="industry"
            children={(field) => (
              <Field className="flex-1">
                <FieldLabel htmlFor={field.name}>Industry</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="e.g. Technology"
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
        </div>

        <form.Field
          name="description"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <textarea
                id={field.name}
                name={field.name}
                placeholder="Briefly describe your business..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="flex min-h-[80px] w-full min-w-0 rounded-3xl border border-transparent bg-input/50 px-3 py-2 text-base transition-[color,box-shadow,background-color] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-none"
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
          name="websiteUrl"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Website URL</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="url"
                placeholder="https://yourwebsite.com"
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
          name="password"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Password<span className="text-destructive"> *</span></FieldLabel>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? 'text' : 'password'}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
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
