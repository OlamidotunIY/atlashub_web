import type { ComponentType } from "react"
import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react"
import { Card, CardContent } from "@/shared/ui/card"
import { cn } from "@/shared/lib"

interface DashboardMetricCardProps {
  label: string
  value: string
  comparison: string
  trend: "up" | "down" | "neutral"
  icon: ComponentType<{
    className?: string
    weight?: "bold" | "fill" | "regular"
  }>
  className?: string
}

export function DashboardMetricCard({
  label,
  value,
  comparison,
  trend,
  icon: Icon,
  className,
}: DashboardMetricCardProps) {
  const TrendIcon = trend === "down" ? TrendDownIcon : TrendUpIcon
  const isPositive = trend === "up"

  return (
    <Card className={cn("rounded-3xl py-5 shadow-xs", className)}>
      <CardContent className="space-y-5 px-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-4" weight="bold" />
          </span>
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs">
            {trend === "neutral" ? null : (
              <TrendIcon
                className={cn(
                  "size-3.5",
                  isPositive ? "text-emerald-600" : "text-destructive"
                )}
                weight="bold"
              />
            )}
            <span
              className={cn(
                trend === "up" && "text-emerald-600",
                trend === "down" && "text-destructive",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {comparison}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
