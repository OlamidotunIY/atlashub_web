import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type ChartConfig,
} from "@/shared/ui"
import { TrendUpIcon } from "@phosphor-icons/react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/shared/ui/card"

const cashFlowChartConfig = {
  inflow: { label: "Inflow", color: "var(--primary)" },
  outflow: { label: "Outflow", color: "var(--muted-foreground)" },
} satisfies ChartConfig

export const CASH_FLOW_PERIODS = [
  {
    value: "this-month",
    label: "This month",
    total: "₦1,248,500",
    change: "12.4% from last month",
    points: [
      { date: "01", inflow: 86, outflow: 44 },
      { date: "05", inflow: 122, outflow: 69 },
      { date: "09", inflow: 112, outflow: 55 },
      { date: "13", inflow: 158, outflow: 84 },
      { date: "17", inflow: 134, outflow: 97 },
      { date: "21", inflow: 171, outflow: 118 },
      { date: "25", inflow: 144, outflow: 76 },
      { date: "Today", inflow: 162, outflow: 101 },
    ],
  },
  {
    value: "last-30-days",
    label: "Last 30 days",
    total: "₦1,106,300",
    change: "8.1% from the preceding 30 days",
    points: [
      { date: "Day 1", inflow: 76, outflow: 46 },
      { date: "Day 5", inflow: 94, outflow: 61 },
      { date: "Day 9", inflow: 126, outflow: 81 },
      { date: "Day 13", inflow: 108, outflow: 72 },
      { date: "Day 17", inflow: 141, outflow: 83 },
      { date: "Day 21", inflow: 131, outflow: 91 },
      { date: "Day 25", inflow: 151, outflow: 96 },
      { date: "Today", inflow: 137, outflow: 78 },
    ],
  },
  {
    value: "last-quarter",
    label: "Last 3 months",
    total: "₦3,584,900",
    change: "16.8% from the previous quarter",
    points: [
      { date: "Jul", inflow: 644, outflow: 412 },
      { date: "Aug", inflow: 711, outflow: 468 },
      { date: "Sep", inflow: 802, outflow: 515 },
      { date: "Oct", inflow: 746, outflow: 439 },
      { date: "Nov", inflow: 835, outflow: 564 },
      { date: "Dec", inflow: 902, outflow: 618 },
    ],
  },
] as const

export type CashFlowPeriod = (typeof CASH_FLOW_PERIODS)[number]["value"]

interface CashFlowCardProps {
  period: CashFlowPeriod
  onPeriodChange: (period: CashFlowPeriod) => void
}

export function CashFlowCard({ period, onPeriodChange }: CashFlowCardProps) {
  const selectedPeriod =
    CASH_FLOW_PERIODS.find((item) => item.value === period) ??
    CASH_FLOW_PERIODS[0]

  return (
    <Card className="h-full max-h-[420px] w-full rounded-3xl py-5 shadow-xs">
      <CardContent className="flex h-full flex-col px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Financial performance</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Cash movement across all business accounts
            </p>
          </div>
          <Select
            value={period}
            onValueChange={(value) => onPeriodChange(value as CashFlowPeriod)}
          >
            <SelectTrigger size="sm" className="rounded-xl text-xs">
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

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              {selectedPeriod.total}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
              <TrendUpIcon className="size-3.5" weight="bold" />
              {selectedPeriod.change}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <i className="size-2 rounded-full bg-primary" />
              Inflow
            </span>
            <span className="flex items-center gap-1.5">
              <i className="size-2 rounded-full bg-muted-foreground/60" />
              Outflow
            </span>
          </div>
        </div>

        <ChartContainer
          config={cashFlowChartConfig}
          className="mt-4 aspect-auto h-[200px] w-full flex-1"
        >
          <BarChart
            accessibilityLayer
            data={selectedPeriod.points}
            margin={{ top: 4, right: 4, left: -22, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `₦${value}k`}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)" }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="inflow"
              fill="var(--color-inflow)"
              radius={[5, 5, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="outflow"
              fill="var(--color-outflow)"
              fillOpacity={0.45}
              radius={[5, 5, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
