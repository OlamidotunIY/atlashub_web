
import { MERCHANT_ROUTES } from '@/constants';
import {
  BuildingsIcon,
  GearIcon,
  HouseIcon,
  TruckIcon,
  UsersThreeIcon,
  WalletIcon,
} from '@phosphor-icons/react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/ui';
import { SidebarNavigationItem, type SidebarNavigationItemDefinition } from './SidebarNavigationItem';

const navigationItems: SidebarNavigationItemDefinition[] = [
  { label: 'Overview', to: MERCHANT_ROUTES.DASHBOARD, icon: HouseIcon },
  {
    label: 'AtlasPay',
    to: MERCHANT_ROUTES.ATLAS_PAY,
    icon: WalletIcon,
    items: [
      { label: 'Overview', to: MERCHANT_ROUTES.ATLAS_PAY },
      { label: 'Transactions', to: MERCHANT_ROUTES.ATLAS_PAY_TRANSACTIONS },
      { label: 'Accounts', to: MERCHANT_ROUTES.ATLAS_PAY_ACCOUNTS },
    ],
  },
  {
    label: 'Commerce',
    to: MERCHANT_ROUTES.COMMERCE,
    icon: BuildingsIcon,
    items: [
      { label: 'Overview', to: MERCHANT_ROUTES.COMMERCE },
      { label: 'Products', to: MERCHANT_ROUTES.COMMERCE_PRODUCTS },
      { label: 'Orders', to: MERCHANT_ROUTES.COMMERCE_ORDERS },
      { label: 'Inventory', to: MERCHANT_ROUTES.COMMERCE_INVENTORY },
    ],
  },
  {
    label: 'Logistics',
    to: MERCHANT_ROUTES.LOGISTICS,
    icon: TruckIcon,
    items: [
      { label: 'Overview', to: MERCHANT_ROUTES.LOGISTICS },
      { label: 'Shipments', to: MERCHANT_ROUTES.LOGISTICS_SHIPMENTS },
      { label: 'Fleet', to: MERCHANT_ROUTES.LOGISTICS_FLEET },
    ],
  },
  { label: 'Team', to: MERCHANT_ROUTES.TEAM, icon: UsersThreeIcon },
  { label: 'Settings', to: MERCHANT_ROUTES.SETTINGS, icon: GearIcon },
];

export function SidebarNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigationItems.map((item) => <SidebarNavigationItem key={item.to} item={item} />)}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
