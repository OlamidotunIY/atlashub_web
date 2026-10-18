import {
  ArrowRightIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"

const attentionItems = [
  {
    title: "3 settlements are pending",
    detail: "Expected by tomorrow",
    tone: "warning",
  },
  {
    title: "2 invoices are overdue",
    detail: "₦82,400 outstanding",
    tone: "warning",
  },
  {
    title: "Compliance is up to date",
    detail: "No action needed",
    tone: "success",
  },
] as const

export function AttentionCard({ onViewAll }: { onViewAll: () => void }) {
  return (
    <Card className="h-full max-h-[420px] w-full rounded-3xl py-5 shadow-xs">
      <CardContent className="px-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Needs attention</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="h-7 rounded-lg px-1.5 text-xs text-primary"
          >
            View all <ArrowRightIcon className="size-3.5" weight="bold" />
          </Button>
        </div>
        <ul className="mt-4 divide-y divide-border/70">
          {attentionItems.map((item) => {
            const isWarning = item.tone === "warning"
            const Icon = isWarning ? WarningCircleIcon : CheckCircleIcon
            return (
              <li
                key={item.title}
                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span
                  className={
                    isWarning
                      ? "mt-0.5 text-amber-600"
                      : "mt-0.5 text-emerald-600"
                  }
                >
                  <Icon
                    className="size-4"
                    weight={isWarning ? "fill" : "bold"}
                  />
                </span>
                <div>
                  <p className="text-xs font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
