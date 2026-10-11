import { Badge } from '@/shared/ui/badge';
import { AccountStatus } from '@/domains/account';
import { cn } from '@/shared/lib';

export interface AccountStatusBadgeWidgetProps {
  status: AccountStatus | string;
  className?: string;
}

export function AccountStatusBadgeWidget({
  status,
  className,
}: AccountStatusBadgeWidgetProps) {
  const normalized = String(status).toUpperCase();

  let variantStyles = 'bg-muted text-muted-foreground border-border';

  if (normalized === AccountStatus.ACTIVE || normalized === 'ACTIVE') {
    variantStyles =
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  } else if (normalized === AccountStatus.PENDING || normalized === 'PENDING') {
    variantStyles =
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
  } else if (
    normalized === AccountStatus.SUSPENDED ||
    normalized === AccountStatus.FROZEN ||
    normalized === AccountStatus.CLOSED ||
    normalized === 'SUSPENDED' ||
    normalized === 'FROZEN' ||
    normalized === 'CLOSED'
  ) {
    variantStyles =
      'bg-destructive/10 text-destructive border-destructive/20';
  }

  return (
    <Badge
      variant="outline"
      className={cn('capitalize font-medium text-xs px-2.5 py-0.5', variantStyles, className)}
    >
      {normalized.toLowerCase()}
    </Badge>
  );
}
