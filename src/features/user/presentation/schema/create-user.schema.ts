import type { RegisterRequest } from "@/shared/api/generated"
import { z } from "zod"

const REGISTRATION_TYPES = [
  "SOLE_PROPRIETORSHIP",
  "PRIVATE_LIMITED_COMPANY",
] as const satisfies readonly RegisterRequest["registrationType"][]

const INDUSTRIES = [
  "PHYSICAL_GOODS",
  "DIGITAL_SERVICES",
  "PHYSICAL_SERVICES",
  "PROFESSIONAL_SERVICES",
  "HOTELS",
  "RESTAURANTS",
  "COURIER_SERVICES",
  "FREIGHT_SERVICES",
  "RETAIL",
  "WHOLESALE",
] as const satisfies readonly RegisterRequest["industry"][]

export const REGISTRATION_TYPE_OPTIONS = [
  { value: "SOLE_PROPRIETORSHIP", label: "Sole proprietorship" },
  { value: "PRIVATE_LIMITED_COMPANY", label: "Private limited company" },
] as const satisfies ReadonlyArray<{ value: RegisterRequest["registrationType"]; label: string }>

export const INDUSTRY_OPTIONS = [
  { value: "PHYSICAL_GOODS", label: "Physical goods" },
  { value: "DIGITAL_SERVICES", label: "Digital services" },
  { value: "PHYSICAL_SERVICES", label: "Physical services" },
  { value: "PROFESSIONAL_SERVICES", label: "Professional services" },
  { value: "HOTELS", label: "Hotels and accommodation" },
  { value: "RESTAURANTS", label: "Restaurants and food service" },
  { value: "COURIER_SERVICES", label: "Courier services" },
  { value: "FREIGHT_SERVICES", label: "Freight and logistics" },
  { value: "RETAIL", label: "Retail" },
  { value: "WHOLESALE", label: "Wholesale" },
] as const satisfies ReadonlyArray<{ value: RegisterRequest["industry"]; label: string }>

export const SignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  country: z.string().min(1, "Country is required"),
  businessName: z.string().min(1, "Business name is required"),
  registrationType: z.enum(REGISTRATION_TYPES, "Select a registration type"),
  industry: z.enum(INDUSTRIES, "Select an industry"),
  description: z.string().optional(),
  logoUrl: z.string().url("Please enter a valid URL").optional(),
  websiteUrl: z.string().url("Please enter a valid URL").optional(),
})

export type SignupFormValues = Omit<RegisterRequest, "registrationType" | "industry"> & {
  registrationType: RegisterRequest["registrationType"] | ""
  industry: RegisterRequest["industry"] | ""
  inviteToken?: string
}
