import { z } from 'zod';

export const REGISTRATION_TYPES = [
  'SOLE_PROPRIETORSHIP',
  'PRIVATE_LIMITED_COMPANY',
] as const;

export const INDUSTRIES = [
  'PHYSICAL_GOODS',
  'DIGITAL_SERVICES',
  'PHYSICAL_SERVICES',
  'PROFESSIONAL_SERVICES',
  'HOTELS',
  'RESTAURANTS',
  'COURIER_SERVICES',
  'FREIGHT_SERVICES',
  'RETAIL',
  'WHOLESALE',
] as const;

export const REGISTRATION_TYPE_OPTIONS = [
  { value: 'SOLE_PROPRIETORSHIP', label: 'Sole Proprietorship' },
  { value: 'PRIVATE_LIMITED_COMPANY', label: 'Private Limited Company' },
] as const;

export const INDUSTRY_OPTIONS = [
  { value: 'PHYSICAL_GOODS', label: 'Physical Goods & E-Commerce' },
  { value: 'DIGITAL_SERVICES', label: 'Digital Services & SaaS' },
  { value: 'PHYSICAL_SERVICES', label: 'Physical Services' },
  { value: 'PROFESSIONAL_SERVICES', label: 'Professional Services & Agency' },
  { value: 'HOTELS', label: 'Hotels & Accommodation' },
  { value: 'RESTAURANTS', label: 'Restaurants & Food Service' },
  { value: 'COURIER_SERVICES', label: 'Courier & Last-Mile Services' },
  { value: 'FREIGHT_SERVICES', label: 'Freight & Logistics' },
  { value: 'RETAIL', label: 'Retail Storefront' },
  { value: 'WHOLESALE', label: 'Wholesale & B2B Distribution' },
] as const;

export const CURRENCY_OPTIONS = [
  { value: 'NGN', label: 'NGN (Nigerian Naira)' },
  { value: 'USD', label: 'USD (US Dollar)' },
  { value: 'GBP', label: 'GBP (British Pound)' },
  { value: 'EUR', label: 'EUR (Euro)' },
  { value: 'GHS', label: 'GHS (Ghanaian Cedi)' },
  { value: 'KES', label: 'KES (Kenyan Shilling)' },
  { value: 'ZAR', label: 'ZAR (South African Rand)' },
] as const;

export const COUNTRY_OPTIONS = [
  { value: 'NG', label: 'Nigeria (NG)', currency: 'NGN' },
  { value: 'GH', label: 'Ghana (GH)', currency: 'GHS' },
  { value: 'KE', label: 'Kenya (KE)', currency: 'KES' },
  { value: 'ZA', label: 'South Africa (ZA)', currency: 'ZAR' },
  { value: 'GB', label: 'United Kingdom (GB)', currency: 'GBP' },
  { value: 'US', label: 'United States (US)', currency: 'USD' },
] as const;

export const CreateOrganizationSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100),
  registrationType: z.enum(REGISTRATION_TYPES, {
    message: 'Select a registration type',
  }),
  industry: z.enum(INDUSTRIES, {
    message: 'Select an industry',
  }),
  country: z.string().min(1, 'Country is required'),
  baseCurrency: z.string().min(1, 'Base reporting currency is required'),
  description: z.string().optional(),
  websiteUrl: z.union([z.string().url('Please enter a valid website URL'), z.literal('')]).optional(),
  logoUrl: z.union([z.string().url('Please enter a valid logo URL'), z.literal('')]).optional(),
});

export type CreateOrganizationFormValues = z.infer<typeof CreateOrganizationSchema>;
