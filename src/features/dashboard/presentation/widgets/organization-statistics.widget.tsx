import {
  ArrowRightIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"

interface OrganizationStatisticsCardProps {
  onViewPeople: () => void
  onViewAccounting: () => void
  onViewCompliance: () => void
}

export function OrganizationStatisticsCard({
  onViewPeople,
  onViewAccounting,
  onViewCompliance,
}: OrganizationStatisticsCardProps) {
  return (
    <Card className="h-full max-h-[340px] w-full rounded-3xl py-5 shadow-xs">
      <CardContent className="px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Organization performance</p>
            <p className="mt-1 text-xs text-muted-foreground">
              People, accounting, and compliance
            </p>
          </div>
        </div>
        <div className="mt-4 divide-y divide-border/70">
          <button
            type="button"
            onClick={onViewPeople}
            className="flex w-full items-center gap-3 py-3 text-left first:pt-0"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
              <UsersThreeIcon className="size-4" weight="bold" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex justify-between gap-2 text-xs">
                <span className="font-medium">People</span>
                <span className="font-semibold">91% attendance</span>
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                38 employees · ₦642,000 payroll due in 6 days
              </span>
            </span>
            <ArrowRightIcon
              className="size-3.5 text-muted-foreground"
              weight="bold"
            />
          </button>
          <button
            type="button"
            onClick={onViewAccounting}
            className="flex w-full items-center gap-3 py-3 text-left"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <CalculatorIcon className="size-4" weight="bold" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex justify-between gap-2 text-xs">
                <span className="font-medium">Accounting</span>
                <span className="font-semibold">₦82,400 receivable</span>
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                ₦684,300 expenses · Books are current
              </span>
            </span>
            <ArrowRightIcon
              className="size-3.5 text-muted-foreground"
              weight="bold"
            />
          </button>
          <button
            type="button"
            onClick={onViewCompliance}
            className="flex w-full items-center gap-3 py-3 text-left last:pb-0"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <ShieldCheckIcon className="size-4" weight="bold" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex justify-between gap-2 text-xs">
                <span className="font-medium">Compliance</span>
                <span className="font-semibold text-emerald-600">Verified</span>
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                0 reviews pending · Last reviewed 12 Oct
              </span>
            </span>
            <ArrowRightIcon
              className="size-3.5 text-muted-foreground"
              weight="bold"
            />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
