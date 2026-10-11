import { useEffect } from 'react';
import { create } from 'zustand';
import { MERCHANT_ROUTES } from '@/constants';

export interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface BreadcrumbsState {
  customBreadcrumbs: BreadcrumbItemData[] | null;
  setCustomBreadcrumbs: (crumbs: BreadcrumbItemData[] | null) => void;
}

export const useBreadcrumbsStore = create<BreadcrumbsState>((set) => ({
  customBreadcrumbs: null,
  setCustomBreadcrumbs: (crumbs) => set({ customBreadcrumbs: crumbs }),
}));

/**
 * Hook for pages to customize the header breadcrumbs dynamically
 * (e.g., displaying specific entity names or custom paths).
 * Automatically cleans up when the component unmounts.
 */
export function useSetBreadcrumbs(crumbs: BreadcrumbItemData[] | undefined) {
  const setCustomBreadcrumbs = useBreadcrumbsStore((s) => s.setCustomBreadcrumbs);
  const crumbsKey = JSON.stringify(crumbs);

  useEffect(() => {
    if (crumbs && crumbs.length > 0) {
      setCustomBreadcrumbs(crumbs);
      return () => {
        setCustomBreadcrumbs(null);
      };
    }
  }, [crumbsKey, setCustomBreadcrumbs]);
}

/** Predefined breadcrumbs mapping for explicit routes */
const KNOWN_ROUTE_BREADCRUMBS: Record<string, BreadcrumbItemData[]> = {
  [MERCHANT_ROUTES.DASHBOARD]: [{ label: 'Overview' }],
  [MERCHANT_ROUTES.ACCOUNTS]: [{ label: 'My accounts' }],
  [MERCHANT_ROUTES.PAYMENT]: [{ label: 'Payment' }],
  [MERCHANT_ROUTES.PAYMENT_ACCOUNTS]: [
    { label: 'Payment', href: MERCHANT_ROUTES.PAYMENT },
    { label: 'Accounts' },
  ],
  [MERCHANT_ROUTES.PAYMENT_CHARGES]: [
    { label: 'Payment', href: MERCHANT_ROUTES.PAYMENT },
    { label: 'Charges' },
  ],
  [MERCHANT_ROUTES.PAYMENT_SPLITS]: [
    { label: 'Payment', href: MERCHANT_ROUTES.PAYMENT },
    { label: 'Splits' },
  ],
  [MERCHANT_ROUTES.PAYMENT_SETTLEMENTS]: [
    { label: 'Payment', href: MERCHANT_ROUTES.PAYMENT },
    { label: 'Settlements' },
  ],
  [MERCHANT_ROUTES.COMMERCE]: [{ label: 'Commerce' }],
  [MERCHANT_ROUTES.COMMERCE_PRODUCTS]: [
    { label: 'Commerce', href: MERCHANT_ROUTES.COMMERCE },
    { label: 'Products' },
  ],
  [MERCHANT_ROUTES.COMMERCE_ORDERS]: [
    { label: 'Commerce', href: MERCHANT_ROUTES.COMMERCE },
    { label: 'Orders' },
  ],
  [MERCHANT_ROUTES.COMMERCE_INVENTORY]: [
    { label: 'Commerce', href: MERCHANT_ROUTES.COMMERCE },
    { label: 'Inventory' },
  ],
  [MERCHANT_ROUTES.HR]: [{ label: 'HR' }],
  [MERCHANT_ROUTES.HR_EMPLOYEES]: [
    { label: 'HR', href: MERCHANT_ROUTES.HR },
    { label: 'Employees' },
  ],
  [MERCHANT_ROUTES.HR_PAYROLL]: [
    { label: 'HR', href: MERCHANT_ROUTES.HR },
    { label: 'Payroll' },
  ],
  [MERCHANT_ROUTES.HR_ATTENDANCE]: [
    { label: 'HR', href: MERCHANT_ROUTES.HR },
    { label: 'Attendance' },
  ],
  [MERCHANT_ROUTES.ACCOUNTING]: [{ label: 'Accounting' }],
  [MERCHANT_ROUTES.ACCOUNTING_INVOICES]: [
    { label: 'Accounting', href: MERCHANT_ROUTES.ACCOUNTING },
    { label: 'Invoices' },
  ],
  [MERCHANT_ROUTES.ACCOUNTING_EXPENSES]: [
    { label: 'Accounting', href: MERCHANT_ROUTES.ACCOUNTING },
    { label: 'Expenses' },
  ],
  [MERCHANT_ROUTES.ACCOUNTING_CHART_OF_ACCOUNTS]: [
    { label: 'Accounting', href: MERCHANT_ROUTES.ACCOUNTING },
    { label: 'Chart of Accounts' },
  ],
  [MERCHANT_ROUTES.ACCOUNTING_REPORTS]: [
    { label: 'Accounting', href: MERCHANT_ROUTES.ACCOUNTING },
    { label: 'Accounting Reports' },
  ],
  [MERCHANT_ROUTES.LOGISTICS]: [{ label: 'Logistics' }],
  [MERCHANT_ROUTES.LOGISTICS_SHIPMENTS]: [
    { label: 'Logistics', href: MERCHANT_ROUTES.LOGISTICS },
    { label: 'Shipments' },
  ],
  [MERCHANT_ROUTES.LOGISTICS_FLEET]: [
    { label: 'Logistics', href: MERCHANT_ROUTES.LOGISTICS },
    { label: 'Fleet' },
  ],
  [MERCHANT_ROUTES.TEAM]: [{ label: 'Team' }],
  [MERCHANT_ROUTES.SETTINGS]: [{ label: 'Settings' }],
  [MERCHANT_ROUTES.AUDIT_LOGS]: [{ label: 'Audit logs' }],
  [MERCHANT_ROUTES.DEVELOPERS]: [{ label: 'Developers' }],
  [MERCHANT_ROUTES.MARKETPLACE]: [{ label: 'Marketplace' }],
};

function formatSegment(segment: string): string {
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Resolves a list of breadcrumb items from a given pathname.
 */
export function resolveBreadcrumbs(pathname: string): BreadcrumbItemData[] {
  // Strip trailing slashes
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (KNOWN_ROUTE_BREADCRUMBS[normalized]) {
    return KNOWN_ROUTE_BREADCRUMBS[normalized];
  }

  // Account details pattern
  if (normalized.startsWith('/accounts/')) {
    const id = normalized.split('/')[2];
    return [
      { label: 'My accounts', href: MERCHANT_ROUTES.ACCOUNTS },
      { label: id ? `Account #${id}` : 'Account details' },
    ];
  }

  // Fallback: split segments and build hierarchy
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length === 0) {
    return [{ label: 'Overview' }];
  }

  const crumbs: BreadcrumbItemData[] = [];
  let currentPath = '';

  segments.forEach((seg, index) => {
    currentPath += `/${seg}`;
    const isLast = index === segments.length - 1;
    crumbs.push({
      label: formatSegment(seg),
      href: isLast ? undefined : currentPath,
    });
  });

  return crumbs;
}
