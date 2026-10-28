import { MERCHANT_ROUTES } from "@/constants"
import {
  ArchiveIcon,
  CalculatorIcon,
  HouseIcon,
  PackageIcon,
  ReceiptIcon,
  StorefrontIcon,
  TruckIcon,
  UserListIcon,
  UsersThreeIcon,
  WalletIcon,
} from "@phosphor-icons/react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/shared/ui"
import {
  SidebarNavigationItem,
  type SidebarNavigationItemDefinition,
} from "./SidebarNavigationItem"

// Core top-level operations navigation
const primaryNavigationItems: SidebarNavigationItemDefinition[] = [
  { label: "Overview", to: MERCHANT_ROUTES.DASHBOARD, icon: HouseIcon },
  { label: "Products", to: MERCHANT_ROUTES.COMMERCE_PRODUCTS, icon: PackageIcon },
  { label: "Inventory", to: MERCHANT_ROUTES.COMMERCE_INVENTORY, icon: ArchiveIcon },
  { label: "Point of Sale", to: MERCHANT_ROUTES.COMMERCE_POS, icon: StorefrontIcon },
  { label: "Orders", to: MERCHANT_ROUTES.COMMERCE_ORDERS, icon: ReceiptIcon },
  { label: "Customers", to: MERCHANT_ROUTES.COMMERCE_CUSTOMERS, icon: UserListIcon },
  { label: "Accounts", to: MERCHANT_ROUTES.ACCOUNTS, icon: WalletIcon },
]

// Operations & Management
const operationsNavigationItems: SidebarNavigationItemDefinition[] = [
  {
    label: "Logistics",
    to: MERCHANT_ROUTES.LOGISTICS_SHIPMENTS,
    icon: TruckIcon,
    items: [
      { label: "Shipments", to: MERCHANT_ROUTES.LOGISTICS_SHIPMENTS },
      { label: "Warehouses", to: MERCHANT_ROUTES.LOGISTICS_WAREHOUSES },
      { label: "Stock transfers", to: MERCHANT_ROUTES.LOGISTICS_STOCK_TRANSFERS },
      { label: "Returns", to: MERCHANT_ROUTES.LOGISTICS_RETURNS },
    ],
  },
  {
    label: "People & HR",
    to: MERCHANT_ROUTES.HR_EMPLOYEES,
    icon: UsersThreeIcon,
    items: [
      { label: "Employees", to: MERCHANT_ROUTES.HR_EMPLOYEES },
      { label: "Payroll", to: MERCHANT_ROUTES.HR_PAYROLL },
      { label: "Attendance", to: MERCHANT_ROUTES.HR_ATTENDANCE },
      { label: "Leave", to: MERCHANT_ROUTES.HR_LEAVE },
    ],
  },
  {
    label: "Accounting",
    to: MERCHANT_ROUTES.ACCOUNTING,
    icon: CalculatorIcon,
    items: [
      { label: "Overview", to: MERCHANT_ROUTES.ACCOUNTING },
      { label: "Invoices", to: MERCHANT_ROUTES.ACCOUNTING_INVOICES },
      { label: "Expenses", to: MERCHANT_ROUTES.ACCOUNTING_EXPENSES },
      { label: "Chart of Accounts", to: MERCHANT_ROUTES.ACCOUNTING_CHART_OF_ACCOUNTS },
      { label: "Reports", to: MERCHANT_ROUTES.ACCOUNTING_REPORTS },
    ],
  },
]

export function SidebarNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {primaryNavigationItems.map((item) => (
            <SidebarNavigationItem key={item.to} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function SidebarProductNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Operations</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {operationsNavigationItems.map((item) => (
            <SidebarNavigationItem key={item.to} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
