import { useEffect } from "react"
import { MERCHANT_ROUTES } from "@/constants"

export const APP_NAME = "AtlasHub"

export const ROUTE_PAGE_TITLES: Record<string, string> = {
  // Auth
  [MERCHANT_ROUTES.LOGIN]: "Log In",
  [MERCHANT_ROUTES.REGISTRATION]: "Create Account",
  [MERCHANT_ROUTES.VERIFY_EMAIL]: "Verify Email",

  // Onboarding
  [MERCHANT_ROUTES.ONBOARDING]: "Onboarding",
  [MERCHANT_ROUTES.ONBOARDING_PRODUCTS]: "Select Products",
  [MERCHANT_ROUTES.ONBOARDING_TEAM]: "Invite Team",
  [MERCHANT_ROUTES.ONBOARDING_COMPLETE]: "Setup Complete",

  // Workspace & Navigation
  [MERCHANT_ROUTES.DASHBOARD]: "Overview",
  [MERCHANT_ROUTES.ACCOUNTS]: "My Accounts",
  [MERCHANT_ROUTES.PAYMENT]: "Payments",
  [MERCHANT_ROUTES.PAYMENT_ACCOUNTS]: "Payment Accounts",
  [MERCHANT_ROUTES.PAYMENT_CHARGES]: "Charges",
  [MERCHANT_ROUTES.PAYMENT_SPLITS]: "Splits",
  [MERCHANT_ROUTES.PAYMENT_SETTLEMENTS]: "Settlements",
  [MERCHANT_ROUTES.COMMERCE]: "Commerce",
  [MERCHANT_ROUTES.COMMERCE_PRODUCTS]: "Products",
  [MERCHANT_ROUTES.COMMERCE_ORDERS]: "Orders",
  [MERCHANT_ROUTES.COMMERCE_INVENTORY]: "Inventory",
  [MERCHANT_ROUTES.HR]: "HR",
  [MERCHANT_ROUTES.HR_EMPLOYEES]: "Employees",
  [MERCHANT_ROUTES.HR_PAYROLL]: "Payroll",
  [MERCHANT_ROUTES.HR_ATTENDANCE]: "Attendance",
  [MERCHANT_ROUTES.ACCOUNTING]: "Accounting",
  [MERCHANT_ROUTES.ACCOUNTING_INVOICES]: "Invoices",
  [MERCHANT_ROUTES.ACCOUNTING_EXPENSES]: "Expenses",
  [MERCHANT_ROUTES.ACCOUNTING_CHART_OF_ACCOUNTS]: "Chart of Accounts",
  [MERCHANT_ROUTES.ACCOUNTING_REPORTS]: "Accounting Reports",
  [MERCHANT_ROUTES.LOGISTICS]: "Logistics",
  [MERCHANT_ROUTES.LOGISTICS_SHIPMENTS]: "Shipments",
  [MERCHANT_ROUTES.LOGISTICS_FLEET]: "Fleet",
  [MERCHANT_ROUTES.SETTINGS_TEAM]: "Team",
  [MERCHANT_ROUTES.SETTINGS]: "Settings",
  [MERCHANT_ROUTES.SETTINGS_AUDIT_LOGS]: "Audit Logs",
  [MERCHANT_ROUTES.DEVELOPERS]: "Developers",
  [MERCHANT_ROUTES.MARKETPLACE]: "Marketplace",
}

/**
 * Resolves a human-friendly page title for a given pathname.
 */
export function resolvePageTitle(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, "") || "/"

  if (ROUTE_PAGE_TITLES[normalized]) {
    return ROUTE_PAGE_TITLES[normalized]
  }

  if (normalized.startsWith("/accounts/")) {
    const id = normalized.split("/")[2]
    return id ? `Account #${id}` : "Account Details"
  }

  if (normalized.startsWith("/invite/")) {
    return "Accept Invitation"
  }

  const lastSegment = normalized.split("/").filter(Boolean).pop()
  if (lastSegment) {
    return lastSegment
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return APP_NAME
}

/**
 * Formats full document title.
 */
export function formatDocumentTitle(title?: string): string {
  if (!title || title === APP_NAME) {
    return `${APP_NAME} | Business Infrastructure`
  }
  return `${title} | ${APP_NAME}`
}

/**
 * Hook to set the document title for a component with automatic cleanup.
 */
export function useDocumentTitle(title?: string, exact = false) {
  useEffect(() => {
    if (!title) return
    const previous = document.title
    document.title = exact ? title : formatDocumentTitle(title)
    return () => {
      document.title = previous
    }
  }, [title, exact])
}
