import { MERCHANT_ROUTES } from '@/constants';
import { Separator, SidebarTrigger } from '@/shared/ui';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES: Record<string, string> = {
  [MERCHANT_ROUTES.DASHBOARD]: 'Overview',
  [MERCHANT_ROUTES.ATLAS_PAY]: 'AtlasPay',
  [MERCHANT_ROUTES.ATLAS_PAY_TRANSACTIONS]: 'Transactions',
  [MERCHANT_ROUTES.ATLAS_PAY_ACCOUNTS]: 'Accounts',
  [MERCHANT_ROUTES.COMMERCE]: 'Commerce',
  [MERCHANT_ROUTES.LOGISTICS]: 'Logistics',
  [MERCHANT_ROUTES.TEAM]: 'Team',
  [MERCHANT_ROUTES.SETTINGS]: 'Settings',
  [MERCHANT_ROUTES.MARKETPLACE]: 'Marketplace',
};

export function MainHeader() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? 'AtlasHub';

  return (
    <header className="flex h-16 shrink-0 items-center border-b px-4 md:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-3 h-4" />
      <h1 className="text-sm font-medium">{title}</h1>
    </header>
  );
}
