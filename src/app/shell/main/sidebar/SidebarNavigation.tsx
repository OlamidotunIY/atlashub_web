import { MERCHANT_ROUTES } from "@/constants"
import {
  BuildingsIcon,
  CalculatorIcon,
  CreditCardIcon,
  HouseIcon,
  TruckIcon,
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

const mainNavigationItems: SidebarNavigationItemDefinition[] = [
  { label: "Overview", to: MERCHANT_ROUTES.DASHBOARD, icon: HouseIcon },
  { label: "Accounts", to: MERCHANT_ROUTES.ACCOUNTS, icon: WalletIcon },
]

const productNavigationItems: SidebarNavigationItemDefinition[] = [
  {
    label: "Finance",
    to: MERCHANT_ROUTES.FINANCE,
    icon: CreditCardIcon,
    items: [
      { label: "Overview", to: MERCHANT_ROUTES.FINANCE },
      { label: "Accounts", to: MERCHANT_ROUTES.FINANCE_ACCOUNTS },
      { label: "Transactions", to: MERCHANT_ROUTES.FINANCE_TRANSACTIONS },
      { label: "Charges", to: MERCHANT_ROUTES.FINANCE_CHARGES },
      { label: "Transfers", to: MERCHANT_ROUTES.FINANCE_TRANSFERS },
      { label: "Splits", to: MERCHANT_ROUTES.FINANCE_SPLITS },
      { label: "Settlements", to: MERCHANT_ROUTES.FINANCE_SETTLEMENTS },
      { label: "Billing", to: MERCHANT_ROUTES.FINANCE_BILLING },
    ],
  },
  {
    label: "Commerce",
    to: MERCHANT_ROUTES.COMMERCE,
    icon: BuildingsIcon,
    items: [
      { label: "Overview", to: MERCHANT_ROUTES.COMMERCE },
      { label: "Products", to: MERCHANT_ROUTES.COMMERCE_PRODUCTS },
      { label: "Orders", to: MERCHANT_ROUTES.COMMERCE_ORDERS },
      { label: "Customers", to: MERCHANT_ROUTES.COMMERCE_CUSTOMERS },
      { label: "Point of sale", to: MERCHANT_ROUTES.COMMERCE_POS },
      { label: "Inventory", to: MERCHANT_ROUTES.COMMERCE_INVENTORY },
    ],
  },
  {
    label: "People",
    to: MERCHANT_ROUTES.HR,
    icon: UsersThreeIcon,
    items: [
      { label: "Overview", to: MERCHANT_ROUTES.HR },
      { label: "Employees", to: MERCHANT_ROUTES.HR_EMPLOYEES },
      { label: "Payroll", to: MERCHANT_ROUTES.HR_PAYROLL },
      { label: "Attendance", to: MERCHANT_ROUTES.HR_ATTENDANCE },
      { label: "Leave", to: MERCHANT_ROUTES.HR_LEAVE },
    ],
  },
  {
    label: "Insights & accounting",
    to: MERCHANT_ROUTES.INSIGHTS,
    icon: CalculatorIcon,
    items: [
      { label: "Overview", to: MERCHANT_ROUTES.INSIGHTS },
      { label: "Analytics", to: MERCHANT_ROUTES.ANALYTICS },
      { label: "Reports", to: MERCHANT_ROUTES.REPORTS },
      { label: "Accounting", to: MERCHANT_ROUTES.ACCOUNTING },
      { label: "Invoices", to: MERCHANT_ROUTES.ACCOUNTING_INVOICES },
      { label: "Expenses", to: MERCHANT_ROUTES.ACCOUNTING_EXPENSES },
      {
        label: "Chart of Accounts",
        to: MERCHANT_ROUTES.ACCOUNTING_CHART_OF_ACCOUNTS,
      },
    ],
  },
  {
    label: "Logistics",
    to: MERCHANT_ROUTES.LOGISTICS,
    icon: TruckIcon,
    items: [
      { label: "Overview", to: MERCHANT_ROUTES.LOGISTICS },
      { label: "Shipments", to: MERCHANT_ROUTES.LOGISTICS_SHIPMENTS },
      { label: "Fleet", to: MERCHANT_ROUTES.LOGISTICS_FLEET },
      { label: "Returns", to: MERCHANT_ROUTES.LOGISTICS_RETURNS },
    ],
  },
]

const financeNavigationItems = productNavigationItems.filter(
  (item) => item.label === "Finance"
)
const operationsNavigationItems = productNavigationItems.filter((item) =>
  ["Commerce", "People", "Logistics"].includes(item.label)
)
const insightsNavigationItems = productNavigationItems.filter(
  (item) => item.label === "Insights & accounting"
)

function NavigationGroup({
  label,
  items,
}: {
  label: string
  items: SidebarNavigationItemDefinition[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarNavigationItem key={item.to} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function SidebarNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {mainNavigationItems.map((item) => (
            <SidebarNavigationItem key={item.to} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function SidebarProductNavigation() {
  return (
    <>
      <NavigationGroup label="Finance" items={financeNavigationItems} />
      <NavigationGroup label="Operations" items={operationsNavigationItems} />
      <NavigationGroup label="Insights" items={insightsNavigationItems} />
    </>
  )
}
