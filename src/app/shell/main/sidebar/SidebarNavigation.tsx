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
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui';
import { NavLink, useLocation } from 'react-router-dom';

const navigationItems = [
  { label: 'Overview', to: MERCHANT_ROUTES.DASHBOARD, icon: HouseIcon },
  { label: 'AtlasPay', to: MERCHANT_ROUTES.ATLAS_PAY, icon: WalletIcon },
  { label: 'Commerce', to: MERCHANT_ROUTES.COMMERCE, icon: BuildingsIcon },
  { label: 'Logistics', to: MERCHANT_ROUTES.LOGISTICS, icon: TruckIcon },
  { label: 'Team', to: MERCHANT_ROUTES.TEAM, icon: UsersThreeIcon },
  { label: 'Settings', to: MERCHANT_ROUTES.SETTINGS, icon: GearIcon },
];

export function SidebarNavigation() {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigationItems.map(({ label, to, icon: Icon }) => (
            <SidebarMenuItem key={to}>
              <SidebarMenuButton
                render={<NavLink to={to} />}
                isActive={pathname === to || pathname.startsWith(`${to}/`)}
                tooltip={label}
              >
                <Icon />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
