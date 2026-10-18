import {
  BankIcon,
  CalendarBlankIcon,
  ChartLineUpIcon,
  PlusIcon,
  WalletIcon,
} from "@phosphor-icons/react"
import { useState } from "react"
import { Button } from "@/shared/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"
import { DashboardMetricCard } from "./dashboard-metric-card"
import {
  CASH_FLOW_PERIODS,
  CashFlowCard,
  type CashFlowPeriod,
} from "./cash-flow-card"
import { AttentionCard } from "./attention-card"
import { RecentActivityCard } from "./recent-activity-card"
import {
  BusinessSnapshotCard,
  type BusinessModule,
} from "./business-snapshot-card"

interface DashboardOverviewProps {
  onCreateTransaction: () => void
  onViewTransactions: () => void
  onViewApprovals: () => void
  onModuleSelect: (module: BusinessModule) => void
}

export function DashboardOverview({
  onCreateTransaction,
  onViewTransactions,
  onViewApprovals,
  onModuleSelect,
}: DashboardOverviewProps) {
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
          <Button onClick={onCreateTransaction} className="rounded-xl">
            <PlusIcon className="size-4" weight="bold" />
            New transaction
          </Button>
        </div>
      </header>

      <section
        aria-label="Business summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
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
      </section>

      <section className="grid grid-cols-1 gap-6 xl:auto-rows-fr xl:grid-cols-5">
        <div className="flex xl:col-span-3">
          <CashFlowCard period={period} onPeriodChange={setPeriod} />
        </div>
        <div className="flex xl:col-span-2">
          <AttentionCard onViewAll={onViewApprovals} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:auto-rows-fr xl:grid-cols-5">
        <div className="flex xl:col-span-3">
          <RecentActivityCard onViewAll={onViewTransactions} />
        </div>
        <div className="flex xl:col-span-2">
          <BusinessSnapshotCard onModuleSelect={onModuleSelect} />
        </div>
      </section>
    </div>
  )
}
