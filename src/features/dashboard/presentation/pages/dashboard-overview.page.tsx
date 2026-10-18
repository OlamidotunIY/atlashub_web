import {
  BankIcon,
  CalendarBlankIcon,
  ChartLineUpIcon,
  ReceiptIcon,
  TruckIcon,
  WalletIcon,
} from "@phosphor-icons/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MERCHANT_ROUTES } from "@/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"
import { DashboardMetricCard } from "../widgets/dashboard-metric-card.widget"
import {
  CASH_FLOW_PERIODS,
  CashFlowCard,
  type CashFlowPeriod,
} from "../widgets/cash-flow.widget"
import { AttentionCard } from "../widgets/attention.widget"
import { CommercePerformanceCard } from "../widgets/commerce-performance.widget"
import { LogisticsPerformanceCard } from "../widgets/logistics-performance.widget"
import { ActivityTableCard } from "../widgets/activity-table"
import { OrganizationStatisticsCard } from "../widgets/organization-statistics.widget"
import { InventoryUrgencyCard } from "../widgets/inventory-urgency"

export function DashboardOverviewPage() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState<CashFlowPeriod>("this-month")
  return (
    <div className="flex w-full flex-col gap-6 pb-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium text-primary">Friday, 18 October</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Good morning, AtlasHub
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here is how your business is performing today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={period}
            onValueChange={(value) => setPeriod(value as CashFlowPeriod)}
          >
            <SelectTrigger size="sm" className="rounded-xl text-xs">
              <CalendarBlankIcon className="size-4" weight="bold" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {CASH_FLOW_PERIODS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <section
        aria-label="Business summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
      >
        <DashboardMetricCard
          label="Available balance"
          value="₦2,485,620"
          comparison="Across 3 active accounts"
          trend="neutral"
          icon={WalletIcon}
        />
        <DashboardMetricCard
          label="Money in"
          value="₦1,248,500"
          comparison="12.4% from last month"
          trend="up"
          icon={ChartLineUpIcon}
        />
        <DashboardMetricCard
          label="Money out"
          value="₦684,300"
          comparison="4.2% from last month"
          trend="down"
          icon={BankIcon}
        />
        <DashboardMetricCard
          label="Pending settlements"
          value="₦215,000"
          comparison="3 settlements awaiting payout"
          trend="neutral"
          icon={CalendarBlankIcon}
        />
        <DashboardMetricCard
          label="Orders this month"
          value="248"
          comparison="18 awaiting fulfilment"
          trend="up"
          icon={ReceiptIcon}
        />
        <DashboardMetricCard
          label="Shipments in transit"
          value="14"
          comparison="2 stock transfers en route"
          trend="neutral"
          icon={TruckIcon}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:auto-rows-fr xl:grid-cols-5">
        <div className="flex xl:col-span-3">
          <CashFlowCard period={period} onPeriodChange={setPeriod} />
        </div>
        <div className="flex xl:col-span-2">
          <AttentionCard
            onViewAll={() => navigate(MERCHANT_ROUTES.APPROVALS)}
          />
        </div>
      </section>

      <section aria-label="Inventory urgency">
        <InventoryUrgencyCard
          onViewInventory={() => navigate(MERCHANT_ROUTES.COMMERCE_INVENTORY)}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:auto-rows-fr xl:grid-cols-5">
        <div className="flex xl:col-span-3">
          <CommercePerformanceCard
            onViewCommerce={() => navigate(MERCHANT_ROUTES.COMMERCE_ORDERS)}
          />
        </div>
        <div className="flex xl:col-span-2">
          <LogisticsPerformanceCard
            onViewLogistics={() => navigate(MERCHANT_ROUTES.LOGISTICS_SHIPMENTS)}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:auto-rows-fr xl:grid-cols-5">
        <div className="flex xl:col-span-3">
          <ActivityTableCard
            onViewAll={() => navigate(MERCHANT_ROUTES.FINANCE_TRANSACTIONS)}
          />
        </div>
        <div className="flex xl:col-span-2">
          <OrganizationStatisticsCard
            onViewPeople={() => navigate(MERCHANT_ROUTES.HR_EMPLOYEES)}
            onViewAccounting={() =>
              navigate(MERCHANT_ROUTES.ACCOUNTING_REPORTS)
            }
            onViewCompliance={() => navigate(MERCHANT_ROUTES.COMPLIANCE)}
          />
        </div>
      </section>
    </div>
  )
}
