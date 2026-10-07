
import { MERCHANT_ROUTES } from '@/constants';
import {
  BuildingsIcon,
  HouseIcon,
  TruckIcon,
  WalletIcon,
} from '@phosphor-icons/react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/ui';
import { SidebarNavigationItem, type SidebarNavigationItemDefinition } from './SidebarNavigationItem';

const workspaceNavigationItems: SidebarNavigationItemDefinition[] = [
  { label: 'Overview', to: MERCHANT_ROUTES.DASHBOARD, icon: HouseIcon },
];

const productNavigationItems: SidebarNavigationItemDefinition[] = [
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
];

export function SidebarNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {workspaceNavigationItems.map((item) => <SidebarNavigationItem key={item.to} item={item} />)}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function SidebarProductNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Products</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {productNavigationItems.map((item) => <SidebarNavigationItem key={item.to} item={item} />)}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
