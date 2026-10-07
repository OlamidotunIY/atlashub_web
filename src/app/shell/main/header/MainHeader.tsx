import { MERCHANT_ROUTES } from '@/constants';
import { useMe, useSwitchEnvironment } from '@/features/authentication';
import { Badge, Button, Separator, SidebarTrigger, Switch } from '@/shared/ui';
import { GearSixIcon } from '@phosphor-icons/react';
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
    <header className="relative flex h-16 shrink-0 items-center border-b px-4 md:px-6">
      <div className="z-10 flex min-w-0 items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-3 h-4" />
        <h1 className="truncate text-sm font-medium">{title}</h1>
      </div>

      <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
        {isTestMode ? (
          <Badge className="h-7 rounded-md border-0 bg-orange-600 px-3 text-xs text-white hover:bg-orange-600">
            You&apos;re in test mode. No real transactions will be processed. <span className="underline">Learn more ↗</span>
          </Badge>
        ) : (
          <Badge className="h-7 rounded-md border-0 bg-emerald-600 px-3 text-xs text-white hover:bg-emerald-600">
            You&apos;re in live mode. Real transactions may be processed.
          </Badge>
        )}
      </div>

      <div className="z-10 ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{isTestMode ? 'Test mode' : 'Live mode'}</span>
          <Switch
            checked={isTestMode}
            aria-label={isTestMode ? 'Switch to live mode' : 'Switch to test mode'}
            size="sm"
            disabled={!canSwitchEnvironment || isPending}
            onCheckedChange={toggleEnvironment}
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open settings"
          onClick={() => navigate(MERCHANT_ROUTES.SETTINGS)}
        >
          <GearSixIcon className="size-5" weight="bold" />
        </Button>
      </div>
    </header>
  );
}
