import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Columns3,
  Plus,
  RotateCcw,
} from 'lucide-react';

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { ColumnHeaderSearch } from "./column-header-search"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  getRowVariant?: (row: TData) => string | undefined;
  handleClick?: (row: TData) => void;
  // Controlled server-side state — enables manualSorting/manualFiltering when provided
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  // Infinite scroll — scroll detection is internal; call this when the bottom sentinel is reached
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  // Initial / search / sort loading — replaces all rows with skeleton
  isLoading?: boolean;
  hasMultiSelection?: boolean;
  onReset?: () => void;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  maxHeight?: boolean;
}

const SkeletonRows = ({ columnCount }: { columnCount: number }) =>
  Array.from({ length: 6 }).map((_, i) => (
    <TableRow key={`skeleton-${i}`}>
      {Array.from({ length: columnCount }).map((_, j) => (
        <TableCell key={j}>
          <div
            className="h-4 rounded bg-muted animate-pulse"
            style={{ width: `${55 + ((i * 3 + j * 7) % 40)}%` }}
          />
        </TableCell>
      ))}
    </TableRow>
  ));

const DataTableInner = <TData, TValue>(
  {
    columns: userColumns,
    data,
    pageSize = 5,
    getRowVariant,
    handleClick,
    sorting: controlledSorting,
    onSortingChange,
    columnFilters: controlledColumnFilters,
    onColumnFiltersChange,
    onLoadMore,
    hasMore,
    isLoadingMore,
    isLoading,
    hasMultiSelection = true,
    onReset,
    emptyActionLabel,
    onEmptyAction,
    maxHeight, // Restricts the table height so long tables scroll internally, instead of increasing the page height.
  }: DataTableProps<TData, TValue>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) => {
  // Presence of controlledSorting signals server-side mode; enables manualSorting + manualFiltering
  const isServerSide = controlledSorting !== undefined;

  // Fallback state used when the parent does not control sorting/filtering
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    []
  );
  const [internalColumnFilters, setInternalColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const hasInternalScroll = Boolean(onLoadMore) || Boolean(maxHeight);

  // 50 px threshold fires onLoadMore just before the user hits the very bottom
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!onLoadMore || !hasMore || isLoadingMore) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      onLoadMore();
    }
  };

  const selectionColumn: ColumnDef<TData, TValue> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(!!checked)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  };

  const columns = hasMultiSelection
    ? [selectionColumn, ...userColumns]
    : [...userColumns];

  const table = useReactTable({
    data,
    columns,
    manualSorting: isServerSide,
    manualFiltering: isServerSide,
    // Pagination model is only registered for non-infinite-scroll mode;
    // including it with infinite scroll would page-slice the already-fetched rows
    ...(hasInternalScroll
      ? {}
      : {
          getPaginationRowModel: getPaginationRowModel(),
          initialState: { pagination: { pageSize } },
        }),
    // Controlled when parent owns state; falls back to internal state otherwise
    onSortingChange: onSortingChange ?? setInternalSorting,
    onColumnFiltersChange: onColumnFiltersChange ?? setInternalColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: controlledSorting ?? internalSorting,
      columnFilters: controlledColumnFilters ?? internalColumnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  return (
    <div className={cn('space-y-3', onLoadMore && 'h-full flex flex-col')}>
      {/* Scroll container — ref and overflow only applied in infinite-scroll mode */}
      <div
        ref={onLoadMore ? forwardedRef : undefined}
        onScroll={handleScroll}
        className={cn(
          'border rounded-[var(--pcs-table-border-radius)] border-[color:var(--pcs-table-border-color)] border-[length:var(--pcs-table-border-width)]',
          hasInternalScroll && 'overflow-auto',
          onLoadMore && 'flex-1 min-h-0',
          maxHeight && 'max-h-96'
        )}
      >
        <Table>
          {/* Header sticks to top only inside the scroll container */}
          <TableHeader className="sticky top-0 bg-background z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const canFilter = header.column.getCanFilter();
                  const sorted = header.column.getIsSorted();
                  const isSelect = header.id === 'select';
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(isSelect && 'w-12')}
                    >
                      {header.isPlaceholder ? null : isSelect ? (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      ) : (
                        <ColumnHeaderSearch
                          label={
                            typeof header.column.columnDef.header === 'string'
                              ? header.column.columnDef.header
                              : header.column.id
                          }
                          canSort={canSort}
                          sorted={sorted}
                          onSortToggle={header.column.getToggleSortingHandler()}
                          canFilter={canFilter}
                          filterValue={(header.column.getFilterValue() ?? '') as string}
                          onFilterChange={(value) =>
                            header.column.setFilterValue(value || undefined)
                          }
                        />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Priority: loading skeleton → data rows → filter-active empty → no-data empty */}
            {isLoading ? (
              <SkeletonRows columnCount={columns.length} />
            ) : table.getRowModel().rows.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    data-variant={getRowVariant?.(row.original)}
                    onDoubleClick={
                      handleClick ? () => handleClick(row.original) : undefined
                    }
                    className={handleClick ? 'cursor-pointer' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {/* Append skeleton rows at the bottom while fetching the next page */}
                {isLoadingMore && <SkeletonRows columnCount={columns.length} />}
              </>
            ) : table.getState().columnFilters.length > 0 ? (
              // Filters are active but returned no rows — guide user to adjust or reset
              <TableRow>
                <TableCell colSpan={columns.length} className="py-12">
                  <Empty className="flex flex-col items-center justify-center border-none">
                    <EmptyHeader>
                      <EmptyMedia>
                        <Columns3 className="size-10 text-[color:var(--pcs-color-icon-muted)]" />
                      </EmptyMedia>
                      <EmptyTitle>No matching records found</EmptyTitle>
                      <EmptyDescription>
                        Try adjusting your filters or reset the table to view
                        all records.
                      </EmptyDescription>
                    </EmptyHeader>
                    {onReset && (
                      <EmptyContent>
                        <Button size="sm" variant="outline" onClick={onReset}>
                          <RotateCcw size={14} className="mr-1" />
                          Reset filters
                        </Button>
                      </EmptyContent>
                    )}
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              // No filters active and no data — optionally offer an action to create the first record
              <TableRow>
                <TableCell colSpan={columns.length} className="py-12">
                  <Empty className="flex flex-col items-center justify-center border-none">
                    <EmptyHeader>
                      <EmptyMedia>
                        <Columns3 className="size-10 text-[color:var(--pcs-color-icon-muted)]" />
                      </EmptyMedia>
                      <EmptyTitle>No records found</EmptyTitle>
                      <EmptyDescription>
                        There are no records available yet.
                      </EmptyDescription>
                    </EmptyHeader>
                    {emptyActionLabel && onEmptyAction && (
                      <EmptyContent>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onEmptyAction}
                        >
                          <Plus size={14} className="mr-1" />
                          {emptyActionLabel}
                        </Button>
                      </EmptyContent>
                    )}
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// forwardRef with generic type preservation via cast
export const DataTable = React.forwardRef(DataTableInner) as <TData, TValue>(
  props: DataTableProps<TData, TValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement | null;
