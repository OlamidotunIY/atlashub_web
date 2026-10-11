import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccounts, CurrencySummaryCards, AccountsTable } from '@/features/account';
import { MERCHANT_ROUTES } from '@/constants';
import type { Account } from '@/domains/account';
import { Button } from '@/shared/ui/button';
import { PlusIcon } from '@phosphor-icons/react';

export function AccountsPage() {
  const navigate = useNavigate();
  const { data: accounts = [], isLoading, isFetching, refetch } = useAccounts();
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const filteredAccounts = selectedCurrency
    ? accounts.filter(
        (acc) => acc.currency.toUpperCase() === selectedCurrency.toUpperCase(),
      )
    : accounts;

  const handleAccountSelect = (account: Account) => {
    navigate(`${MERCHANT_ROUTES.ACCOUNTS}/${account.id}`);
  };

  return (
    <div className="flex-1 flex flex-col w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Business Accounts</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Overview of your multi-currency operational accounts, balances, and account details.
          </p>
        </div>

        <Button className="rounded-xl self-start sm:self-auto gap-2">
          <PlusIcon className="size-4" weight="bold" />
          Add Account
        </Button>
      </div>

      {(accounts.length > 0 || isLoading) && (
        <div className="space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Available Currencies
            </h2>
            {selectedCurrency && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCurrency(null)}
                className="text-xs h-7 text-primary hover:text-primary"
              >
                Show all ({accounts.length})
              </Button>
            )}
          </div>

          <CurrencySummaryCards
            accounts={accounts}
            isLoading={isLoading}
            selectedCurrency={selectedCurrency}
            onSelectCurrency={setSelectedCurrency}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-0 space-y-3">
        <div className="flex items-center justify-between shrink-0">
          <h2 className="text-sm font-semibold tracking-tight">
            All Accounts {selectedCurrency ? `(${selectedCurrency})` : ''}
          </h2>
        </div>

        <AccountsTable
          accounts={filteredAccounts}
          isLoading={isLoading}
          isReloading={isFetching && !isLoading}
          onReload={refetch}
          onAccountSelect={handleAccountSelect}
          className="flex-1 flex flex-col min-h-0"
        />
      </div>
    </div>
  );
}
