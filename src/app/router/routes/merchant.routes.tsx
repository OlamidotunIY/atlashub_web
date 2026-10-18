import { AuthGuard } from "@/app/guard"
import { MainLayout } from "@/app/shell"
import { MERCHANT_ROUTES } from "@/constants"
import { OverviewPage, AccountsPage, AccountDetailPage } from "@/pages/main"
import { PlaceholderPage } from "@/pages/placeholder"
import type { RouteObject } from "react-router-dom"

const placeholderRouteDefinitions: ReadonlyArray<readonly [string, string]> = [
  [MERCHANT_ROUTES.NOTIFICATIONS, "Notifications"],
  [MERCHANT_ROUTES.APPROVALS, "Approvals"],
  [MERCHANT_ROUTES.FINANCE, "Finance overview"],
  [MERCHANT_ROUTES.FINANCE_ACCOUNTS, "Finance accounts"],
  [MERCHANT_ROUTES.FINANCE_ACCOUNT_DETAIL, "Account detail"],
  [MERCHANT_ROUTES.FINANCE_TRANSACTIONS, "Transactions"],
  [MERCHANT_ROUTES.FINANCE_TRANSACTION_DETAIL, "Transaction detail"],
  [MERCHANT_ROUTES.FINANCE_CHARGES, "Charges"],
  [MERCHANT_ROUTES.FINANCE_TRANSFERS, "Transfers"],
  [MERCHANT_ROUTES.FINANCE_SPLITS, "Split payments"],
  [MERCHANT_ROUTES.FINANCE_SETTLEMENTS, "Settlements"],
  [MERCHANT_ROUTES.FINANCE_INVOICES, "Invoices"],
  [MERCHANT_ROUTES.FINANCE_CASH_FLOW, "Cash flow"],
  [MERCHANT_ROUTES.FINANCE_BILLING, "Billing"],
  [MERCHANT_ROUTES.OPERATIONS, "Operations overview"],
  [MERCHANT_ROUTES.COMMERCE_CUSTOMERS, "Customers"],
  [MERCHANT_ROUTES.COMMERCE_POS, "Point of sale"],
  [MERCHANT_ROUTES.INVENTORY_MOVEMENTS, "Stock movements"],
  [MERCHANT_ROUTES.INVENTORY_PURCHASE_ORDERS, "Purchase orders"],
  [MERCHANT_ROUTES.INVENTORY_SUPPLIERS, "Suppliers"],
  [MERCHANT_ROUTES.HR_LEAVE, "Leave"],
  [MERCHANT_ROUTES.HR_LOANS, "Loans and advances"],
  [MERCHANT_ROUTES.HR_PAYSLIPS, "Payslips"],
  [MERCHANT_ROUTES.LOGISTICS_RETURNS, "Returns"],
  [MERCHANT_ROUTES.LOGISTICS_WAREHOUSES, "Warehouses"],
  [MERCHANT_ROUTES.LOGISTICS_STOCK_TRANSFERS, "Stock transfers"],
  [MERCHANT_ROUTES.LOGISTICS_INCENTIVES, "Shipping incentives"],
  [MERCHANT_ROUTES.INSIGHTS, "Insights overview"],
  [MERCHANT_ROUTES.ANALYTICS, "Analytics"],
  [MERCHANT_ROUTES.REPORTS, "Reports"],
  [MERCHANT_ROUTES.ACCOUNTING_LEDGER, "General ledger"],
  [MERCHANT_ROUTES.ACCOUNTING_JOURNALS, "Journal entries"],
  [MERCHANT_ROUTES.ACCOUNTING_RECEIVABLES, "Receivables"],
  [MERCHANT_ROUTES.ACCOUNTING_PAYABLES, "Payables"],
  [MERCHANT_ROUTES.ACCOUNTING_BUDGETS, "Budgets"],
  [MERCHANT_ROUTES.ACCOUNTING_ASSETS, "Fixed assets"],
  [MERCHANT_ROUTES.SUPPORT, "Support"],
  [MERCHANT_ROUTES.SETTINGS_ORGANIZATION, "Organization settings"],
  [MERCHANT_ROUTES.SETTINGS_OUTLETS, "Outlets"],
  [MERCHANT_ROUTES.SETTINGS_TEAM, "Team settings"],
  [MERCHANT_ROUTES.SETTINGS_ROLES, "Roles and permissions"],
  [MERCHANT_ROUTES.SETTINGS_INTEGRATIONS, "Integrations"],
  [MERCHANT_ROUTES.SETTINGS_NOTIFICATIONS, "Notification preferences"],
  [MERCHANT_ROUTES.SETTINGS_AUDIT_LOGS, "Audit logs"],
  [MERCHANT_ROUTES.SETTINGS_DEVELOPER, "Developer settings"],
  [MERCHANT_ROUTES.SETTINGS_API_KEYS, "API keys"],
  [MERCHANT_ROUTES.SETTINGS_WEBHOOKS, "Webhooks"],
  [MERCHANT_ROUTES.SETTINGS_SECURITY, "Security"],
]

export const merchantRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard fallback={MERCHANT_ROUTES.LOGIN}>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      ...placeholderRouteDefinitions.map(([path, title]) => ({
        path,
        element: <PlaceholderPage title={title} />,
      })),
      { path: MERCHANT_ROUTES.DASHBOARD, element: <OverviewPage /> },
      { path: MERCHANT_ROUTES.ACCOUNTS, element: <AccountsPage /> },
      { path: MERCHANT_ROUTES.ACCOUNT_DETAIL, element: <AccountDetailPage /> },
      {
        path: MERCHANT_ROUTES.PAYMENT,
        element: <PlaceholderPage title="Payment Overview" />,
      },
      {
        path: MERCHANT_ROUTES.PAYMENT_ACCOUNTS,
        element: <PlaceholderPage title="Payment Accounts" />,
      },
      {
        path: MERCHANT_ROUTES.PAYMENT_CHARGES,
        element: <PlaceholderPage title="Payment Charges" />,
      },
      {
        path: MERCHANT_ROUTES.PAYMENT_SPLITS,
        element: <PlaceholderPage title="Payment Splits" />,
      },
      {
        path: MERCHANT_ROUTES.PAYMENT_SETTLEMENTS,
        element: <PlaceholderPage title="Payment Settlements" />,
      },
      {
        path: MERCHANT_ROUTES.COMMERCE,
        element: <PlaceholderPage title="Commerce Overview" />,
      },
      {
        path: MERCHANT_ROUTES.COMMERCE_PRODUCTS,
        element: <PlaceholderPage title="Products" />,
      },
      {
        path: MERCHANT_ROUTES.COMMERCE_ORDERS,
        element: <PlaceholderPage title="Orders" />,
      },
      {
        path: MERCHANT_ROUTES.COMMERCE_INVENTORY,
        element: <PlaceholderPage title="Inventory" />,
      },
      {
        path: MERCHANT_ROUTES.HR,
        element: <PlaceholderPage title="HR Overview" />,
      },
      {
        path: MERCHANT_ROUTES.HR_EMPLOYEES,
        element: <PlaceholderPage title="Employees" />,
      },
      {
        path: MERCHANT_ROUTES.HR_PAYROLL,
        element: <PlaceholderPage title="Payroll" />,
      },
      {
        path: MERCHANT_ROUTES.HR_ATTENDANCE,
        element: <PlaceholderPage title="Attendance" />,
      },
      {
        path: MERCHANT_ROUTES.ACCOUNTING,
        element: <PlaceholderPage title="Accounting Overview" />,
      },
      {
        path: MERCHANT_ROUTES.ACCOUNTING_INVOICES,
        element: <PlaceholderPage title="Invoices" />,
      },
      {
        path: MERCHANT_ROUTES.ACCOUNTING_EXPENSES,
        element: <PlaceholderPage title="Expenses" />,
      },
      {
        path: MERCHANT_ROUTES.ACCOUNTING_CHART_OF_ACCOUNTS,
        element: <PlaceholderPage title="Chart of Accounts" />,
      },
      {
        path: MERCHANT_ROUTES.ACCOUNTING_REPORTS,
        element: <PlaceholderPage title="Accounting Reports" />,
      },
      {
        path: MERCHANT_ROUTES.LOGISTICS,
        element: <PlaceholderPage title="Logistics Overview" />,
      },
      {
        path: MERCHANT_ROUTES.LOGISTICS_SHIPMENTS,
        element: <PlaceholderPage title="Shipments" />,
      },
      {
        path: MERCHANT_ROUTES.SETTINGS,
        element: <PlaceholderPage title="Settings" />,
      },
      {
        path: MERCHANT_ROUTES.COMPLIANCE,
        element: <PlaceholderPage title="Compliance" />,
      },
      {
        path: MERCHANT_ROUTES.DEVELOPERS,
        element: <PlaceholderPage title="Developers" />,
      },
      {
        path: MERCHANT_ROUTES.MARKETPLACE,
        element: <PlaceholderPage title="Marketplace" />,
      },
    ],
  },
]
