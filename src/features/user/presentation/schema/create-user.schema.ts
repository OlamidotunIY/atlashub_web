import type { RegisterRequest } from '@/shared/api/generated';
import { z } from 'zod';

export const BUSINESS_TYPES = {
  RETAIL: "Retail & E-commerce",
  FINANCE: "Finance & Fintech",
  EDUCATION: "Education",
  HEALTHCARE: "Healthcare",
  HOSPITALITY: "Hospitality",
  LOGISTICS: "Logistics & Transportation",
  REAL_ESTATE: "Real Estate",
  OTHER: "Other",
}

export const BUSINESS_SIZE = {
  REGISTERED: "Registered",
  STARTER: "Starter",
}

export const SignupSchema : z.ZodType<RegisterRequest, RegisterRequest> = z.object({
  firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    country: z.string().min(1, "Country is required"),
    businessName: z.string().min(1, "Business name is required"),
    businessType: z.enum(
      BUSINESS_TYPES,
      "Business type must be from the listed eneum types"
    ),
    businessSize: z.enum(BUSINESS_SIZE),
    industry: z.string().optional(),
    description: z.string().optional(),
    logoUrl: z.string().url("Please enter a valid URL").optional(),
    websiteUrl: z.string().url("Please enter a valid URL").optional(),
});

export type SignupFormValues = z.infer<typeof SignupSchema>;
