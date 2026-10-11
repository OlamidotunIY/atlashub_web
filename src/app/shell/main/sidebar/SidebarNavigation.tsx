
import { MERCHANT_ROUTES } from '@/constants';
import {
  BuildingsIcon,
  CalculatorIcon,
  CreditCardIcon,
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

const mainNavigationItems: SidebarNavigationItemDefinition[] = [
  { label: 'Overview', to: MERCHANT_ROUTES.DASHBOARD, icon: HouseIcon },
  { label: 'My accounts', to: MERCHANT_ROUTES.ACCOUNTS, icon: WalletIcon },
];

const productNavigationItems: SidebarNavigationItemDefinition[] = [
  {
    label: 'Payment',
    to: MERCHANT_ROUTES.PAYMENT,
    icon: CreditCardIcon,
    items: [
      { label: 'Overview', to: MERCHANT_ROUTES.PAYMENT },
      { label: 'Charges', to: MERCHANT_ROUTES.PAYMENT_CHARGES },
      { label: 'Splits', to: MERCHANT_ROUTES.PAYMENT_SPLITS },
      { label: 'Settlements', to: MERCHANT_ROUTES.PAYMENT_SETTLEMENTS },
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
    label: 'HR',
    to: MERCHANT_ROUTES.HR,
    icon: UsersThreeIcon,
    items: [
      { label: 'Overview', to: MERCHANT_ROUTES.HR },
      { label: 'Employees', to: MERCHANT_ROUTES.HR_EMPLOYEES },
      { label: 'Payroll', to: MERCHANT_ROUTES.HR_PAYROLL },
      { label: 'Attendance', to: MERCHANT_ROUTES.HR_ATTENDANCE },
    ],
  },
  {
    label: 'Accounting',
    to: MERCHANT_ROUTES.ACCOUNTING,
    icon: CalculatorIcon,
    items: [
      { label: 'Overview', to: MERCHANT_ROUTES.ACCOUNTING },
      { label: 'Invoices', to: MERCHANT_ROUTES.ACCOUNTING_INVOICES },
      { label: 'Expenses', to: MERCHANT_ROUTES.ACCOUNTING_EXPENSES },
      { label: 'Chart of Accounts', to: MERCHANT_ROUTES.ACCOUNTING_CHART_OF_ACCOUNTS },
      { label: 'Reports', to: MERCHANT_ROUTES.ACCOUNTING_REPORTS },
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
      <SidebarGroupContent>
        <SidebarMenu>
          {mainNavigationItems.map((item) => <SidebarNavigationItem key={item.to} item={item} />)}
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
