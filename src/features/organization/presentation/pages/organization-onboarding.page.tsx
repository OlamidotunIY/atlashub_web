import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MERCHANT_ROUTES } from '@/constants';
import {
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  INDUSTRY_OPTIONS,
  REGISTRATION_TYPE_OPTIONS,
  CreateOrganizationSchema,
  type CreateOrganizationFormValues,
} from '../../domain/schemas/create-organization.schema';
import { useCreateOrganization } from '../../application/mutations/use-create-organization.mutation';
import { Button, Input, Label } from '@/shared/ui';
import { toast } from '@/shared/hooks';
import { Buildings, Check, Globe, Image, ShieldCheck } from '@phosphor-icons/react';

export function OrganizationOnboardingPage() {
  const navigate = useNavigate();
  const { mutateAsync: createOrg, isPending } = useCreateOrganization();

  const [form, setForm] = useState<CreateOrganizationFormValues>({
    businessName: '',
    registrationType: 'PRIVATE_LIMITED_COMPANY',
    industry: 'PHYSICAL_GOODS',
    country: 'NG',
    baseCurrency: 'NGN',
    description: '',
    websiteUrl: '',
    logoUrl: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateOrganizationFormValues, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Derive currency automatically if country changes, unless explicitly chosen
  const handleCountryChange = (countryCode: string) => {
    const selected = COUNTRY_OPTIONS.find((c) => c.value === countryCode);
    setForm((prev) => ({
      ...prev,
      country: countryCode,
      baseCurrency: selected ? selected.currency : prev.baseCurrency,
    }));
    if (errors.country) setErrors((e) => ({ ...e, country: undefined }));
  };

  const handleChange = (field: keyof CreateOrganizationFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  // Determine if all required fields are filled
  const isRequiredFilled =
    form.businessName.trim().length > 0 &&
    Boolean(form.registrationType) &&
    Boolean(form.industry) &&
    Boolean(form.country) &&
    Boolean(form.baseCurrency);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = CreateOrganizationSchema.safeParse(form);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof CreateOrganizationFormValues, string>> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as keyof CreateOrganizationFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      toast.add({
        title: 'Incomplete Information',
        description: 'Please provide all required fields highlighted with an asterisk (*).',
        type: 'error',
      });
      return;
    }

    try {
      await createOrg(validation.data);
      toast.add({
        title: 'Organization profile saved',
        description: 'Your business profile has been initialized successfully.',
        type: 'success',
      });
      navigate(MERCHANT_ROUTES.ONBOARDING_TEAM);
    } catch (err: any) {
      const msg = err?.message || 'Failed to save organization profile. Please try again.';
      setServerError(msg);
      toast.add({
        title: 'Save failed',
        description: msg,
        type: 'error',
      });
    }
  };

  const initialLetter = form.businessName.trim()
    ? form.businessName.trim().charAt(0).toUpperCase()
    : 'A';

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Organization Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review and complete your organization profile. You can update these details anytime in Settings.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {serverError}
        </div>
      )}

      {/* Organization Profile Card */}
      <form onSubmit={handleSave} className="bg-card border border-border/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Cover / Profile Header Banner */}
        <div className="h-32 sm:h-36 bg-linear-to-r from-primary/15 via-primary/5 to-muted relative border-b border-border/60">
          <div className="absolute -bottom-8 left-6 sm:left-8 flex items-end gap-4">
            <div className="relative group">
              {form.logoUrl ? (
                <img
                  src={form.logoUrl}
                  alt={form.businessName || 'Organization logo'}
                  className="size-20 sm:size-24 rounded-2xl border-4 border-card object-cover bg-card shadow-md"
                />
              ) : (
                <div className="size-20 sm:size-24 rounded-2xl border-4 border-card bg-primary text-primary-foreground font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md">
                  {initialLetter}
                </div>
              )}
            </div>
            <div className="pb-1">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 w-fit">
                <ShieldCheck className="size-3.5" weight="bold" />
                Active Organization
              </span>
            </div>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="pt-12 p-6 sm:p-8 flex flex-col gap-8">
          {/* Section 1: Business Identity */}
          <div>
            <div className="border-b border-border/60 pb-3 mb-5">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Buildings className="size-4 text-primary" weight="bold" />
                General Information
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Core identity and operational categorization for your company.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="businessName" className="text-xs font-medium text-foreground">
                  Business Name <span className="text-destructive font-bold">*</span>
                </Label>
                <Input
                  id="businessName"
                  placeholder="e.g. Acme Corporation"
                  value={form.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  disabled={isPending}
                  className="h-10 text-sm"
                />
                {errors.businessName && (
                  <span className="text-xs text-destructive">{errors.businessName}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="registrationType" className="text-xs font-medium text-foreground">
                  Registration Type <span className="text-destructive font-bold">*</span>
                </Label>
                <select
                  id="registrationType"
                  value={form.registrationType}
                  onChange={(e) => handleChange('registrationType', e.target.value as any)}
                  disabled={isPending}
                  className="h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {REGISTRATION_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.registrationType && (
                  <span className="text-xs text-destructive">{errors.registrationType}</span>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="industry" className="text-xs font-medium text-foreground">
                  Industry & Primary Sector <span className="text-destructive font-bold">*</span>
                </Label>
                <select
                  id="industry"
                  value={form.industry}
                  onChange={(e) => handleChange('industry', e.target.value as any)}
                  disabled={isPending}
                  className="h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <span className="text-xs text-destructive">{errors.industry}</span>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="description" className="text-xs font-medium text-foreground">
                  Business Description
                </Label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Provide a brief overview of your business activities, products, or services..."
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  disabled={isPending}
                  className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Jurisdiction & Financial Reporting */}
          <div>
            <div className="border-b border-border/60 pb-3 mb-5">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Globe className="size-4 text-primary" weight="bold" />
                Jurisdiction & Financial Reporting
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Primary jurisdiction and functional ledger currency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="country" className="text-xs font-medium text-foreground">
                  Country of Incorporation <span className="text-destructive font-bold">*</span>
                </Label>
                <select
                  id="country"
                  value={form.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  disabled={isPending}
                  className="h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {COUNTRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="text-xs text-destructive">{errors.country}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="baseCurrency" className="text-xs font-medium text-foreground">
                  Base Reporting Currency <span className="text-destructive font-bold">*</span>
                </Label>
                <select
                  id="baseCurrency"
                  value={form.baseCurrency}
                  onChange={(e) => handleChange('baseCurrency', e.target.value)}
                  disabled={isPending}
                  className="h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {CURRENCY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.baseCurrency && (
                  <span className="text-xs text-destructive">{errors.baseCurrency}</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Web & Branding */}
          <div>
            <div className="border-b border-border/60 pb-3 mb-5">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Image className="size-4 text-primary" weight="bold" />
                Web & Brand Assets
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Optional links to your online store, logo, and external web presence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="websiteUrl" className="text-xs font-medium text-foreground">
                  Website URL
                </Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://example.com"
                  value={form.websiteUrl}
                  onChange={(e) => handleChange('websiteUrl', e.target.value)}
                  disabled={isPending}
                  className="h-10 text-sm"
                />
                {errors.websiteUrl && (
                  <span className="text-xs text-destructive">{errors.websiteUrl}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="logoUrl" className="text-xs font-medium text-foreground">
                  Logo Image URL
                </Label>
                <Input
                  id="logoUrl"
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={form.logoUrl}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  disabled={isPending}
                  className="h-10 text-sm"
                />
                {errors.logoUrl && (
                  <span className="text-xs text-destructive">{errors.logoUrl}</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Fields marked with an asterisk (<span className="text-destructive font-bold">*</span>) must be completed to save your profile.
            </p>

            <Button
              type="submit"
              disabled={!isRequiredFilled || isPending}
              className="w-full sm:w-auto px-8 h-11 text-sm font-semibold rounded-lg shadow-sm"
            >
              {isPending ? (
                'Saving profile...'
              ) : (
                <>
                  <Check className="mr-2 size-4" weight="bold" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
