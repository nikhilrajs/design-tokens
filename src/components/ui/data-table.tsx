import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize?: number
}

const SortIcon = ({ direction }: { direction: "asc" | "desc" | false }) => {
  const activeClass = "shrink-0 size-[var(--pcs-table-head-sort-icon-size)] text-[color:var(--pcs-table-head-sort-icon-color-active)]"
  const idleClass   = "shrink-0 size-[var(--pcs-table-head-sort-icon-size)] text-[color:var(--pcs-table-head-sort-icon-color)]"

  if (direction === "asc")  return <ChevronUpIcon   className={activeClass} />
  if (direction === "desc") return <ChevronDownIcon  className={activeClass} />
  return                           <ChevronsUpDownIcon className={idleClass} />
}

export const DataTable = <TData, TValue>({
  columns: userColumns,
  data,
  pageSize = 5,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const selectionColumn: ColumnDef<TData, TValue> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={!table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()}
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
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
  }

  const columns = [selectionColumn, ...userColumns]

  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize } },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount = table.getFilteredRowModel().rows.length

  return (
    <div className="space-y-3">
      {/* Table */}
      <div
        className="overflow-hidden border rounded-[var(--pcs-table-border-radius)] border-[color:var(--pcs-table-border-color)] border-[length:var(--pcs-table-border-width)]"
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(header.id === "select" && "w-12")}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-[var(--pcs-table-head-sort-gap)] cursor-pointer select-none w-full hover:text-[color:var(--pcs-table-head-color-hover)]"
                          aria-label={`Sort by ${header.column.id}`}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <SortIcon direction={sorted} />
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center px-[var(--pcs-table-empty-padding)] py-[var(--pcs-table-empty-padding)] text-[color:var(--pcs-table-empty-color)] text-[length:var(--pcs-table-empty-font-size)]"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between">
        <p className="type-body-sm text-[color:var(--pcs-table-footer-color)]">
          {selectedCount > 0
            ? `${selectedCount} of ${totalCount} row(s) selected`
            : `${totalCount} row(s) total`}
        </p>
        <div className="flex items-center gap-2">
          <p className="type-body-sm text-[color:var(--pcs-table-footer-color)]">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
