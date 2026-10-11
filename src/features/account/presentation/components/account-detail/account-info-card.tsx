import type { Account } from '@/domains/account';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Skeleton } from '@/shared/ui/skeleton';
import { BankIcon, CopyIcon, CheckIcon } from '@phosphor-icons/react';
import { AccountStatusBadgeWidget } from '../../widgets/account-status-badge.widget';
import { CurrencyAmountWidget } from '../../widgets/currency-amount.widget';
import { useState } from 'react';
import { cn } from '@/shared/lib';

export interface AccountInfoCardProps {
  account?: Account | null;
  isLoading?: boolean;
  className?: string;
}

export function AccountInfoCard({
  account,
  isLoading = false,
  className,
}: AccountInfoCardProps) {
  const [copied, setCopied] = useState(false);

  if (isLoading || !account) {
    return (
      <Card className={cn('p-6 rounded-2xl border', className)}>
        <CardContent className="p-0 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-10 w-40 rounded" />
        </CardContent>
      </Card>
    );
  }

  const handleCopyNumber = () => {
    if (account.accountNumber) {
      navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className={cn('p-6 rounded-2xl border bg-card shadow-xs', className)}>
      <CardContent className="p-0 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <BankIcon className="size-6" weight="duotone" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold tracking-tight">{account.name}</h2>
                <AccountStatusBadgeWidget status={account.status} />
                {account.isFrozen && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-semibold uppercase px-1.5 py-0 bg-blue-500/10 text-blue-500 border-blue-500/20"
                  >
                    Frozen
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                {account.businessName ? `${account.businessName} • ` : ''}
                {account.formattedType} Account • {account.currency}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {account.accountNumber && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyNumber}
                className="rounded-lg text-xs"
              >
                {copied ? (
                  <>
                    <CheckIcon className="size-3.5 mr-1.5 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon className="size-3.5 mr-1.5" />
                    Copy Account No.
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <span className="text-xs text-muted-foreground font-medium block">
              Available Balance
            </span>
            <div className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">
              <CurrencyAmountWidget
                amount={account.availableBalance || account.balance}
                currency={account.currency}
              />
            </div>
          </div>

          <div>
            <span className="text-xs text-muted-foreground font-medium block">
              Ledger Balance
            </span>
            <div className="text-xl font-semibold mt-1 text-foreground">
              <CurrencyAmountWidget
                amount={account.ledgerBalance}
                currency={account.currency}
              />
            </div>
          </div>

          <div>
            <span className="text-xs text-muted-foreground font-medium block">
              Pending Settlement
            </span>
            <div className="text-xl font-semibold mt-1 text-muted-foreground font-mono">
              <CurrencyAmountWidget
                amount={account.pendingSettlementBalance}
                currency={account.currency}
              />
            </div>
          </div>

          <div>
            <span className="text-xs text-muted-foreground font-medium block">
              {account.bankName ? 'Bank Partner' : 'Account Type'}
            </span>
            <span className="text-sm font-semibold text-foreground block mt-1">
              {account.bankName || account.formattedType}
            </span>
            <span className="text-xs text-muted-foreground font-mono mt-0.5 block">
              {account.accountNumber || `ID: ${account.id}`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
