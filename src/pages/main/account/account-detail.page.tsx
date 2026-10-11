import { useNavigate, useParams } from 'react-router-dom';
import { useAccount, useAccountTransactions, AccountInfoCard, AccountTransactionsTable } from '@/features/account';
import { MERCHANT_ROUTES } from '@/constants';
import { Button } from '@/shared/ui/button';
import { ArrowLeftIcon } from '@phosphor-icons/react';

export function AccountDetailPage() {
  const navigate = useNavigate();
  const { accountId } = useParams<{ accountId: string }>();
  const parsedId = Number(accountId);

  const { data: account, isLoading: isAccountLoading } = useAccount(parsedId);
  const { data: txData, isLoading: isTxLoading, refetch } = useAccountTransactions(parsedId);

  return (
    <div className="flex-1 flex flex-col w-full space-y-6">
      <div className="shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(MERCHANT_ROUTES.ACCOUNTS)}
          className="gap-2 -ml-2 text-muted-foreground hover:text-foreground mb-3 text-xs h-8"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back to Accounts
        </Button>

        <AccountInfoCard account={account} isLoading={isAccountLoading} />
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-3">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-sm font-semibold tracking-tight">Account Transactions</h3>
            <p className="text-xs text-muted-foreground">
              History of all credits, debits, and transfers on this account.
            </p>
          </div>
        </div>

        <AccountTransactionsTable
          transactions={txData?.items ?? []}
          isLoading={isTxLoading}
          onReload={refetch}
          className="flex-1 flex flex-col min-h-0"
        />
      </div>
    </div>
  );
}
