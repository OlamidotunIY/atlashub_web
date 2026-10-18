import * as React from 'react';
import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowData,
  type SortingState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import {
  MagnifyingGlassIcon,
  GearSixIcon,
  FunnelIcon,
  ArrowsClockwiseIcon,
} from '@phosphor-icons/react';
import { cn } from '@/shared/lib';
import { features, type DataTableFeatures } from './data-table-features';
import { DataTablePagination } from './data-table-pagination';
import { DataTableEmptyState } from './data-table-empty-state';

export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  isLoading?: boolean;
  emptyHeading?: string;
  emptyDescription?: string;
  emptyIcon?: React.ComponentType<{ className?: string; weight?: any }> | React.ReactNode;
  emptyAction?: React.ReactNode;
  emptyState?: React.ReactNode;
  emptyMessage?: string;
  searchKey?: string;
  searchPlaceholder?: string;
  onRowClick?: (row: TData) => void;
  className?: string;

  // Toolbar actions
  onReload?: () => void;
  isReloading?: boolean;
  filterContent?: React.ReactNode;
  onFilterClick?: () => void;
  isFiltered?: boolean;
  enableColumnVisibility?: boolean;
  columnLabels?: Record<string, string>;
  toolbarActions?: React.ReactNode;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  isLoading = false,
  emptyHeading,
  emptyDescription,
  emptyIcon,
  emptyAction,
  emptyState,
  emptyMessage,
  searchKey,
  searchPlaceholder = 'Search...',
  onRowClick,
  className,
  onReload,
  isReloading = false,
  filterContent,
  onFilterClick,
  isFiltered = false,
  enableColumnVisibility = true,
  columnLabels,
  toolbarActions,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({});

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const resolvedEmptyHeading = emptyHeading ?? emptyMessage ?? 'No records found';
  const resolvedEmptyDescription =
    emptyDescription ?? 'There is no data available to display at this moment.';

  const isTableEmpty = !isLoading && table.getRowModel().rows.length === 0;

  return (
    <div className={cn('w-full flex-1 flex flex-col min-h-0 space-y-3', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        {/* Left: Filter button on the side where search was + optional searchKey */}
        <div className="flex items-center gap-2">
          {filterContent ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'h-8 px-2.5 rounded-lg gap-2 text-xs font-medium cursor-pointer border-0 shadow-none text-muted-foreground hover:text-foreground hover:bg-muted/60',
                      isFiltered && 'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-semibold',
                    )}
                  >
                    <FunnelIcon className="size-3.5" weight={isFiltered ? 'fill' : 'bold'} />
                    <span>Filter</span>
                    {isFiltered && (
                      <span className="size-1.5 rounded-full bg-primary" />
                    )}
                  </Button>
                }
              />
              <DropdownMenuContent align="start" className="w-64 p-3">
                {filterContent}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : onFilterClick ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterClick}
              className={cn(
                'h-8 px-2.5 rounded-lg gap-2 text-xs font-medium cursor-pointer border-0 shadow-none text-muted-foreground hover:text-foreground hover:bg-muted/60',
                isFiltered && 'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-semibold',
              )}
            >
              <FunnelIcon className="size-3.5" weight={isFiltered ? 'fill' : 'bold'} />
              <span>Filter</span>
              {isFiltered && (
                <span className="size-1.5 rounded-full bg-primary" />
              )}
            </Button>
          ) : null}

          {searchKey ? (
            <div className="relative w-full max-w-xs">
              <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
              <Input
                placeholder={searchPlaceholder}
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="pl-8 h-8 rounded-lg text-xs"
              />
            </div>
          ) : null}
        </div>

        {/* Right: Reload, Settings without borders */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onReload && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onReload}
              disabled={isLoading || isReloading}
              className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 cursor-pointer border-0 shadow-none"
              title="Reload data"
            >
              <ArrowsClockwiseIcon
                className={cn('size-3.5', (isLoading || isReloading) && 'animate-spin')}
                weight="bold"
              />
              <span className="sr-only">Reload</span>
            </Button>
          )}

          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2.5 rounded-lg gap-2 text-xs font-medium cursor-pointer border-0 shadow-none text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  >
                    <GearSixIcon className="size-3.5" weight="bold" />
                    <span>Settings</span>
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground">
                    Toggle Columns
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {table
                    .getAllLeafColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      const label = columnLabels?.[column.id] ?? column.id;
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          checked={column.getIsVisible()}
                          onCheckedChange={(checked) => column.toggleVisibility(checked)}
                          className="text-xs cursor-pointer capitalize"
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {toolbarActions}
        </div>
      </div>

      {/* Only the empty state reserves vertical space; populated tables size to their rows. */}
      <div className="overflow-auto border-t border-b">
        {isTableEmpty ? (
          <div className="flex flex-col min-h-[300px]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <table.FlexRender header={header} />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            </Table>

            <div className="flex-1 flex flex-col items-center justify-center p-8 w-full min-h-[220px]">
              {emptyState ?? (
                <DataTableEmptyState
                  icon={emptyIcon}
                  heading={resolvedEmptyHeading}
                  description={resolvedEmptyDescription}
                  action={emptyAction}
                />
              )}
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <TableRow key={`loading-row-${index}`}>
                    {columns.map((_, colIndex) => (
                      <TableCell key={`loading-cell-${colIndex}`}>
                        <Skeleton className="h-4 w-full rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(onRowClick && 'cursor-pointer')}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {!isLoading && table.getFilteredRowModel().rows.length > 0 ? (
        <DataTablePagination table={table} className="shrink-0 pt-1" />
      ) : null}
    </div>
  );
}
