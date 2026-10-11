import { Account } from '@/domains/account';
import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { WalletIcon } from '@phosphor-icons/react';
import { CurrencyAmountWidget } from '../../widgets/currency-amount.widget';
import { cn } from '@/shared/lib';

export interface CurrencySummaryCardsProps {
  accounts: Account[];
  isLoading?: boolean;
  selectedCurrency?: string | null;
  onSelectCurrency?: (currency: string | null) => void;
  className?: string;
}

export function CurrencySummaryCards({
  accounts,
  isLoading = false,
  selectedCurrency,
  onSelectCurrency,
  className,
}: CurrencySummaryCardsProps) {
  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={`currency-card-skeleton-${index}`} className="p-5 rounded-2xl">
            <CardContent className="p-0 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="size-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-32 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const summaries = Account.groupCurrencies(accounts);

  if (summaries.length === 0) {
    return null;
  }

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {summaries.map((summary) => {
        const isSelected = selectedCurrency === summary.currency;
        const isInteractive = Boolean(onSelectCurrency);

        return (
          <Card
            key={summary.currency}
            onClick={() => {
              if (onSelectCurrency) {
                onSelectCurrency(isSelected ? null : summary.currency);
              }
            }}
            className={cn(
              'p-5 rounded-2xl border transition-all',
              isInteractive && 'cursor-pointer hover:border-primary/50 hover:shadow-sm',
              isSelected && 'border-primary ring-2 ring-primary/20 bg-primary/[0.02]',
            )}
          >
            <CardContent className="p-0 flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm tracking-wide text-muted-foreground uppercase">
                    {summary.currency} Account{summary.accountCount > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <WalletIcon className="size-4" weight="bold" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold tracking-tight">
                  <CurrencyAmountWidget
                    amount={summary.totalBalance}
                    currency={summary.currency}
                  />
                </div>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  {summary.accountCount} {summary.accountCount === 1 ? 'account' : 'accounts'} attached
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
