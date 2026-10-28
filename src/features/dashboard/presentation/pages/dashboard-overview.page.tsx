import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MERCHANT_ROUTES } from "@/constants"
import { useMe } from "@/features/authentication"
import {
  BankIcon,
  CalendarBlankIcon,
  ChartLineUpIcon,
  ReceiptIcon,
  TruckIcon,
  WalletIcon,
} from "@phosphor-icons/react"
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
import { InventoryUrgencyCard } from "../widgets/inventory-urgency"
import { CommandCenterWidget } from "../widgets/command-center.widget"
import { QuickActionsWidget } from "../widgets/quick-actions.widget"
import { SuggestedTemplatesWidget } from "../widgets/suggested-templates.widget"
import { ProductsSpotlightWidget } from "../widgets/products-spotlight.widget"

export function DashboardOverviewPage() {
  const navigate = useNavigate()
  const { data: user } = useMe()
  const [period, setPeriod] = useState<CashFlowPeriod>("this-month")

  return (
    <div className="flex w-full flex-col gap-7 pb-10">
      {/* 1. Intelligence Command Center (The first thing users see on Overview) */}
      <section aria-label="AI Command Center">
        <CommandCenterWidget
          userName={user?.firstName}
          organizationName={user?.activeOrganization?.businessName}
        />
      </section>

      {/* 2. Direct Route Quick Action Cards */}
      <section aria-label="Quick Navigation">
        <QuickActionsWidget />
      </section>

      {/* 3. Products Spotlight & Storefront Templates */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ProductsSpotlightWidget />
        <SuggestedTemplatesWidget />
      </section>

      {/* 4. Financial & Operational Summary Section */}
      <div className="border-t border-border/60 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold tracking-tight text-foreground">
              Business Performance & Cash Flow
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live operational metrics across active accounts and channels
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={period}
              onValueChange={(value) => setPeriod(value as CashFlowPeriod)}
            >
              <SelectTrigger size="sm" className="rounded-xl text-xs h-8">
                <CalendarBlankIcon className="size-3.5" weight="bold" />
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
        </div>

        <section
          aria-label="Business summary"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
        >
          <DashboardMetricCard
            label="Available balance"
            value="₦2,485,620"
            comparison="Across connected accounts"
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
            comparison="Awaiting provider payout"
            trend="neutral"
            icon={CalendarBlankIcon}
          />
          <DashboardMetricCard
            label="Orders this month"
            value="248"
            comparison="18 awaiting fulfillment"
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
      </div>

      {/* 5. Cash Flow & Operational Attention */}
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

      {/* 6. Inventory Urgency Card */}
      <section aria-label="Inventory urgency">
        <InventoryUrgencyCard
          onViewInventory={() => navigate(MERCHANT_ROUTES.COMMERCE_INVENTORY)}
        />
      </section>

      {/* 7. Commerce & Logistics Performance */}
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

      {/* 8. Recent Activity Table */}
      <section className="w-full">
        <ActivityTableCard
          onViewAll={() => navigate(MERCHANT_ROUTES.FINANCE_TRANSACTIONS)}
        />
      </section>
    </div>
  )
}
