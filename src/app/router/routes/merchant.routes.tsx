import { AuthGuard } from '@/app/guard';
import { MainLayout } from '@/app/shell';
import { MERCHANT_ROUTES } from '@/constants';
import { OverviewPage } from '@/pages/main';
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
      { path: MERCHANT_ROUTES.ATLAS_PAY, element: <PlaceholderPage title="AtlasPay Overview" /> },
      { path: MERCHANT_ROUTES.ATLAS_PAY_TRANSACTIONS, element: <PlaceholderPage title="AtlasPay Transactions" /> },
      { path: MERCHANT_ROUTES.ATLAS_PAY_ACCOUNTS, element: <PlaceholderPage title="AtlasPay Accounts" /> },
      { path: MERCHANT_ROUTES.TEAM, element: <PlaceholderPage title="Team" /> },
      { path: MERCHANT_ROUTES.SETTINGS, element: <PlaceholderPage title="Settings" /> },
      { path: MERCHANT_ROUTES.COMMERCE, element: <PlaceholderPage title="Commerce" /> },
      { path: MERCHANT_ROUTES.COMMERCE_PRODUCTS, element: <PlaceholderPage title="Products" /> },
      { path: MERCHANT_ROUTES.COMMERCE_ORDERS, element: <PlaceholderPage title="Orders" /> },
      { path: MERCHANT_ROUTES.COMMERCE_INVENTORY, element: <PlaceholderPage title="Inventory" /> },
      { path: MERCHANT_ROUTES.LOGISTICS, element: <PlaceholderPage title="Logistics" /> },
      { path: MERCHANT_ROUTES.LOGISTICS_SHIPMENTS, element: <PlaceholderPage title="Shipments" /> },
      { path: MERCHANT_ROUTES.LOGISTICS_FLEET, element: <PlaceholderPage title="Fleet" /> },
      { path: MERCHANT_ROUTES.MARKETPLACE, element: <PlaceholderPage title="Marketplace" /> },
    ],
  },
];
