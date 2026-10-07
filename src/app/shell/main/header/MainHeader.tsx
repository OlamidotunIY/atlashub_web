import { MERCHANT_ROUTES } from '@/constants';
import { useMe, useSwitchEnvironment } from '@/features/authentication';
import { Badge, Button, Separator, SidebarTrigger } from '@/shared/ui';
import { GearIcon } from '@phosphor-icons/react';
import { useLocation, useNavigate } from 'react-router-dom';

const PAGE_TITLES: Record<string, string> = {
  [MERCHANT_ROUTES.DASHBOARD]: 'Overview',
  [MERCHANT_ROUTES.ATLAS_PAY]: 'AtlasPay',
  [MERCHANT_ROUTES.ATLAS_PAY_TRANSACTIONS]: 'Transactions',
  [MERCHANT_ROUTES.ATLAS_PAY_ACCOUNTS]: 'Accounts',
  [MERCHANT_ROUTES.COMMERCE]: 'Commerce',
  [MERCHANT_ROUTES.COMMERCE_PRODUCTS]: 'Products',
  [MERCHANT_ROUTES.COMMERCE_ORDERS]: 'Orders',
  [MERCHANT_ROUTES.COMMERCE_INVENTORY]: 'Inventory',
  [MERCHANT_ROUTES.LOGISTICS]: 'Logistics',
  [MERCHANT_ROUTES.LOGISTICS_SHIPMENTS]: 'Shipments',
  [MERCHANT_ROUTES.LOGISTICS_FLEET]: 'Fleet',
  [MERCHANT_ROUTES.TEAM]: 'Team',
  [MERCHANT_ROUTES.SETTINGS]: 'Settings',
  [MERCHANT_ROUTES.MARKETPLACE]: 'Marketplace',
};

export function MainHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: user } = useMe();
  const { mutate: switchEnvironment, isPending } = useSwitchEnvironment();
  const title = PAGE_TITLES[pathname] ?? 'AtlasHub';
  const isTestMode = user?.activeEnvironment !== 'LIVE';
  const canSwitchEnvironment = user?.complianceApproved === true;

  const toggleEnvironment = () => {
    switchEnvironment({ environment: isTestMode ? 'LIVE' : 'TEST' });
  };

  return (
    <header className="flex h-16 shrink-0 items-center border-b px-4 md:px-6">
      <div className="flex min-w-0 items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-3 h-4" />
        <h1 className="truncate text-sm font-medium">{title}</h1>
      </div>

      <div className="mx-auto hidden lg:block">
        {isTestMode ? (
          <Badge className="h-7 rounded-md border-0 bg-orange-600 px-3 text-xs text-white hover:bg-orange-600">
            You&apos;re in test mode. No real transactions will be processed.
          </Badge>
        ) : (
          <Badge className="h-7 rounded-md border-0 bg-emerald-600 px-3 text-xs text-white hover:bg-emerald-600">
            You&apos;re in live mode. Real transactions may be processed.
          </Badge>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={isTestMode}
          aria-label={isTestMode ? 'Switch to live mode' : 'Switch to test mode'}
          disabled={!canSwitchEnvironment || isPending}
          onClick={toggleEnvironment}
          className="flex items-center gap-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isTestMode ? 'Test mode' : 'Live mode'}</span>
          <span className="relative h-5 w-9 rounded-full bg-muted-foreground/30 transition-colors data-[checked=true]:bg-primary" data-checked={isTestMode}>
            <span className="absolute top-0.5 size-4 rounded-full bg-background shadow-sm transition-transform data-[checked=true]:translate-x-4" data-checked={isTestMode} />
          </span>
        </button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Open settings"
          onClick={() => navigate(MERCHANT_ROUTES.SETTINGS)}
        >
          <GearIcon />
        </Button>
      </div>
    </header>
  );
}
