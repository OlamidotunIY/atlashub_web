import { AuthGuard } from '@/app/guard';
import { MainLayout } from '@/app/shell';
import { MERCHANT_ROUTES } from '@/constants';
import { OverviewPage, AccountsPage, AccountDetailPage } from '@/pages/main';
import { PlaceholderPage } from '@/pages/placeholder';
import type { RouteObject } from 'react-router-dom';

export const merchantRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard fallback={MERCHANT_ROUTES.LOGIN}>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      { path: MERCHANT_ROUTES.DASHBOARD, element: <OverviewPage /> },
      { path: MERCHANT_ROUTES.ACCOUNTS, element: <AccountsPage /> },
      { path: MERCHANT_ROUTES.ACCOUNT_DETAIL, element: <AccountDetailPage /> },
      { path: MERCHANT_ROUTES.PAYMENT, element: <PlaceholderPage title="Payment Overview" /> },
      { path: MERCHANT_ROUTES.PAYMENT_ACCOUNTS, element: <PlaceholderPage title="Payment Accounts" /> },
      { path: MERCHANT_ROUTES.PAYMENT_CHARGES, element: <PlaceholderPage title="Payment Charges" /> },
      { path: MERCHANT_ROUTES.PAYMENT_SPLITS, element: <PlaceholderPage title="Payment Splits" /> },
      { path: MERCHANT_ROUTES.PAYMENT_SETTLEMENTS, element: <PlaceholderPage title="Payment Settlements" /> },
      { path: MERCHANT_ROUTES.COMMERCE, element: <PlaceholderPage title="Commerce Overview" /> },
      { path: MERCHANT_ROUTES.COMMERCE_PRODUCTS, element: <PlaceholderPage title="Products" /> },
      { path: MERCHANT_ROUTES.COMMERCE_ORDERS, element: <PlaceholderPage title="Orders" /> },
      { path: MERCHANT_ROUTES.COMMERCE_INVENTORY, element: <PlaceholderPage title="Inventory" /> },
      { path: MERCHANT_ROUTES.HR, element: <PlaceholderPage title="HR Overview" /> },
      { path: MERCHANT_ROUTES.HR_EMPLOYEES, element: <PlaceholderPage title="Employees" /> },
      { path: MERCHANT_ROUTES.HR_PAYROLL, element: <PlaceholderPage title="Payroll" /> },
      { path: MERCHANT_ROUTES.HR_ATTENDANCE, element: <PlaceholderPage title="Attendance" /> },
      { path: MERCHANT_ROUTES.ACCOUNTING, element: <PlaceholderPage title="Accounting Overview" /> },
      { path: MERCHANT_ROUTES.ACCOUNTING_INVOICES, element: <PlaceholderPage title="Invoices" /> },
      { path: MERCHANT_ROUTES.ACCOUNTING_EXPENSES, element: <PlaceholderPage title="Expenses" /> },
      { path: MERCHANT_ROUTES.ACCOUNTING_CHART_OF_ACCOUNTS, element: <PlaceholderPage title="Chart of Accounts" /> },
      { path: MERCHANT_ROUTES.ACCOUNTING_REPORTS, element: <PlaceholderPage title="Accounting Reports" /> },
      { path: MERCHANT_ROUTES.LOGISTICS, element: <PlaceholderPage title="Logistics Overview" /> },
      { path: MERCHANT_ROUTES.LOGISTICS_SHIPMENTS, element: <PlaceholderPage title="Shipments" /> },
      { path: MERCHANT_ROUTES.LOGISTICS_FLEET, element: <PlaceholderPage title="Fleet" /> },
      { path: MERCHANT_ROUTES.TEAM, element: <PlaceholderPage title="Team" /> },
      { path: MERCHANT_ROUTES.SETTINGS, element: <PlaceholderPage title="Settings" /> },
      { path: MERCHANT_ROUTES.AUDIT_LOGS, element: <PlaceholderPage title="Audit logs" /> },
      { path: MERCHANT_ROUTES.DEVELOPERS, element: <PlaceholderPage title="Developers" /> },
      { path: MERCHANT_ROUTES.MARKETPLACE, element: <PlaceholderPage title="Marketplace" /> },
    ],
  },
];
