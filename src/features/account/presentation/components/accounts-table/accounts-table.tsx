import { useState, useMemo } from 'react';
import type { Account } from '@/domains/account';
import { DataTable } from '@/shared/composites/data-table';
import { accountColumns } from './columns';
import { Button } from '@/shared/ui/button';
import { WalletIcon } from '@phosphor-icons/react';
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';

export const accountColumnLabels: Record<string, string> = {
  name: 'Account Name',
  type: 'Account Type',
  currency: 'Currency',
  availableBalance: 'Available Balance',
  ledgerBalance: 'Ledger Balance',
  pendingSettlementBalance: 'Pending Settlement',
  status: 'Status',
  createdAt: 'Created At',
};

export interface AccountsTableProps {
  accounts: Account[];
  isLoading?: boolean;
  isReloading?: boolean;
  onReload?: () => void;
  onAccountSelect: (account: Account) => void;
  className?: string;
}

export function AccountsTable({
  accounts,
  isLoading = false,
  isReloading = false,
  onReload,
  onAccountSelect,
  className,
}: AccountsTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const isFiltered = statusFilter !== 'ALL' || typeFilter !== 'ALL';

  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      if (statusFilter === 'FROZEN' && !acc.isFrozen) return false;
      if (statusFilter !== 'ALL' && statusFilter !== 'FROZEN') {
        if (String(acc.status).toUpperCase() !== statusFilter) return false;
      }
      if (typeFilter !== 'ALL') {
        if (String(acc.type).toUpperCase() !== typeFilter) return false;
      }
      return true;
    });
  }, [accounts, statusFilter, typeFilter]);

  const handleResetFilters = () => {
    setStatusFilter('ALL');
    setTypeFilter('ALL');
  };

  const filterContent = (
    <div className="space-y-3">
      <DropdownMenuGroup>
        <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground uppercase px-2 py-1">
          Account Status
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
          <DropdownMenuRadioItem value="ALL" className="text-xs cursor-pointer">
            All Statuses
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ACTIVE" className="text-xs cursor-pointer">
            Active
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="FROZEN" className="text-xs cursor-pointer">
            Frozen
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="SUSPENDED" className="text-xs cursor-pointer">
            Suspended
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground uppercase px-2 py-1">
          Account Type
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={typeFilter} onValueChange={setTypeFilter}>
          <DropdownMenuRadioItem value="ALL" className="text-xs cursor-pointer">
            All Types
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="OPERATING" className="text-xs cursor-pointer">
            Operating
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="PROVIDER_CLEARING" className="text-xs cursor-pointer">
            Provider Clearing
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="SUSPENSE" className="text-xs cursor-pointer">
            Suspense
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>

      {isFiltered && (
        <>
          <DropdownMenuSeparator />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="w-full text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Reset Filters
          </Button>
        </>
      )}
    </div>
  );

  return (
    <DataTable
      columns={accountColumns}
      data={filteredAccounts}
      isLoading={isLoading}
      isReloading={isReloading}
      onReload={onReload}
      filterContent={filterContent}
      isFiltered={isFiltered}
      columnLabels={accountColumnLabels}
      emptyIcon={WalletIcon}
      emptyHeading="No business accounts found"
      emptyDescription="Multi-currency business accounts created or allocated to your business will appear here."
      onRowClick={onAccountSelect}
      className={className}
    />
  );
}
