import { useNavigate } from "react-router-dom"
import { DashboardOverview } from "@/features/dashboard"
import { MERCHANT_ROUTES } from "@/constants"

export function OverviewPage() {
  const navigate = useNavigate()
  return (
    <DashboardOverview
      onCreateTransaction={() => navigate(MERCHANT_ROUTES.FINANCE_TRANSACTIONS)}
      onViewTransactions={() => navigate(MERCHANT_ROUTES.FINANCE_TRANSACTIONS)}
      onViewApprovals={() => navigate(MERCHANT_ROUTES.APPROVALS)}
      onViewCommerce={() => navigate(MERCHANT_ROUTES.COMMERCE)}
      onViewLogistics={() => navigate(MERCHANT_ROUTES.LOGISTICS)}
      onViewPeople={() => navigate(MERCHANT_ROUTES.HR)}
      onViewAccounting={() => navigate(MERCHANT_ROUTES.ACCOUNTING)}
      onViewCompliance={() => navigate(MERCHANT_ROUTES.COMPLIANCE)}
    />
  )
}
