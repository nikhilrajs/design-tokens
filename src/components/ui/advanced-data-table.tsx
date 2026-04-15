import * as React from "react"
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type Header,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronsUpDownIcon,
  GripHorizontalIcon,
  PinIcon,
  PinOffIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getColId = <TData, TValue>(col: ColumnDef<TData, TValue>): string => {
  if (col.id) return col.id
  const key = (col as { accessorKey?: unknown }).accessorKey
  return typeof key === "string" ? key : ""
}

// ─── SortIcon ─────────────────────────────────────────────────────────────────

const SortIcon = ({ direction }: { direction: "asc" | "desc" | false }) => {
  const active = "shrink-0 size-[var(--pcs-table-head-sort-icon-size)] text-[color:var(--pcs-table-head-sort-icon-color-active)]"
  const idle   = "shrink-0 size-[var(--pcs-table-head-sort-icon-size)] text-[color:var(--pcs-table-head-sort-icon-color)]"
  if (direction === "asc")  return <ChevronUpIcon    className={active} />
  if (direction === "desc") return <ChevronDownIcon   className={active} />
  return                           <ChevronsUpDownIcon className={idle} />
}

// ─── ColumnFilter ─────────────────────────────────────────────────────────────

const ColumnFilter = ({ column }: { column: Column<unknown, unknown> }) => {
  const value = (column.getFilterValue() ?? "") as string
  return (
    <Input
      size="sm"
      placeholder="Search…"
      value={value}
      onChange={e => column.setFilterValue(e.target.value || undefined)}
      onClick={e => e.stopPropagation()}
      // Reset inherited th styles (uppercase, letter-spacing, font-weight)
      className="normal-case font-normal tracking-normal"
    />
  )
}

// ─── DraggableTableHead ───────────────────────────────────────────────────────

const DraggableTableHead = <TData,>({
  header,
}: {
  header: Header<TData, unknown>
}) => {
  const { column } = header
  const isPinned = column.getIsPinned()
  const isSelect = column.id === "select"

  const { attributes, isDragging, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
      // Pinned columns and the selection column are not draggable
      disabled: !!isPinned || isSelect,
    })

  const style: React.CSSProperties = {
    width: column.getSize(),
    // Sticky positioning for pinned columns — left/right values are dynamic pixel
    // offsets from TanStack Table. Inline style is required here (not Tailwind)
    // because the values change at runtime based on neighbour column widths.
    ...(isPinned === "left"  && { position: "sticky", left:  column.getStart("left"),  zIndex: 3 }),
    ...(isPinned === "right" && { position: "sticky", right: column.getAfter("right"), zIndex: 3 }),
    // DnD transform only applies to non-pinned columns
    ...(!isPinned && {
      transform: CSS.Transform.toString(transform),
      transition: transition ?? undefined,
    }),
    opacity: isDragging ? 0.5 : undefined,
  }

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      className={cn(
        isSelect && "w-12",
        isPinned === "left"  && "[box-shadow:var(--pcs-table-col-pin-shadow-left)]",
        isPinned === "right" && "[box-shadow:var(--pcs-table-col-pin-shadow-right)]",
      )}
      {...attributes}
    >
      {header.isPlaceholder ? null : isSelect ? (
        // Selection column — checkbox only, no controls
        flexRender(column.columnDef.header, header.getContext())
      ) : (
        <div className="flex flex-col gap-1.5">

          {/* ── Label row: drag handle + sort label + pin button ── */}
          <div className="flex items-center gap-1 min-w-0">

            {/* Drag handle — hidden for pinned columns */}
            {!isPinned && (
              <button
                {...(listeners ?? {})}
                className="shrink-0 p-0.5 cursor-grab active:cursor-grabbing touch-none text-[color:var(--pcs-color-icon-muted)] hover:text-[color:var(--pcs-color-icon-default)]"
                aria-label="Drag to reorder column"
                tabIndex={-1}
              >
                <GripHorizontalIcon className="size-3" />
              </button>
            )}

            {/* Sort button or plain label */}
            {column.getCanSort() ? (
              <button
                onClick={column.getToggleSortingHandler()}
                className="flex flex-1 items-center gap-[var(--pcs-table-head-sort-gap)] cursor-pointer select-none hover:text-[color:var(--pcs-table-head-color-hover)] min-w-0"
              >
                <span className="truncate">
                  {flexRender(column.columnDef.header, header.getContext())}
                </span>
                <SortIcon direction={column.getIsSorted()} />
              </button>
            ) : (
              <span className="flex-1 truncate">
                {flexRender(column.columnDef.header, header.getContext())}
              </span>
            )}

            {/* Pin / unpin button */}
            <button
              onClick={() => column.pin(isPinned ? false : "left")}
              className={cn(
                "shrink-0 p-0.5 rounded cursor-pointer transition-colors",
                isPinned
                  ? "text-[color:var(--pcs-color-primary-emphasis)]"
                  : "text-[color:var(--pcs-color-icon-muted)] hover:text-[color:var(--pcs-color-icon-default)]"
              )}
              title={isPinned ? "Unpin column" : "Pin column left"}
              aria-label={isPinned ? "Unpin column" : "Pin column left"}
            >
              {isPinned
                ? <PinOffIcon className="size-3" />
                : <PinIcon    className="size-3" />
              }
            </button>
          </div>

          {/* ── Filter row ── */}
          {column.getCanFilter() && (
            <ColumnFilter column={column as Column<unknown, unknown>} />
          )}

        </div>
      )}
    </TableHead>
  )
}

// ─── AdvancedDataTable ────────────────────────────────────────────────────────

interface AdvancedDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize?: number
}

export const AdvancedDataTable = <TData, TValue>({
  columns: userColumns,
  data,
  pageSize = 5,
}: AdvancedDataTableProps<TData, TValue>) => {
  const [sorting,          setSorting]          = React.useState<SortingState>([])
  const [columnFilters,    setColumnFilters]    = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection,     setRowSelection]     = React.useState({})
  const [columnPinning,    setColumnPinning]    = React.useState<ColumnPinningState>({})

  // Selection column — prepended internally, not part of the user-supplied columns
  const selectionColumn: ColumnDef<TData, TValue> = {
    id: "select",
    size: 48,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={!table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()}
        onCheckedChange={checked => table.toggleAllPageRowsSelected(!!checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={checked => row.toggleSelected(!!checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  }

  const columns = [selectionColumn, ...userColumns]

  // Column order drives both display order and DnD reordering.
  // Initialised from the column definitions; kept in sync via onColumnOrderChange.
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    () => columns.map(getColId).filter(Boolean)
  )

  const table = useReactTable({
    data,
    columns,
    defaultColumn: { size: 150, minSize: 80 },
    initialState: { pagination: { pageSize } },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
      columnPinning,
    },
    onSortingChange:          setSorting,
    onColumnFiltersChange:    setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange:     setRowSelection,
    onColumnOrderChange:      setColumnOrder,
    onColumnPinningChange:    setColumnPinning,
    getCoreRowModel:          getCoreRowModel(),
    getSortedRowModel:        getSortedRowModel(),
    getFilteredRowModel:      getFilteredRowModel(),
    getPaginationRowModel:    getPaginationRowModel(),
    enableColumnPinning: true,
  })

  // DnD sensors — mouse, touch, and keyboard
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  // When a drag ends, reorder the column in the full columnOrder array
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setColumnOrder(order => {
        const from = order.indexOf(active.id as string)
        const to   = order.indexOf(over.id   as string)
        return arrayMove(order, from, to)
      })
    }
  }

  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount    = table.getFilteredRowModel().rows.length
  const hidableColumns = table.getAllLeafColumns().filter(col => col.getCanHide())

  return (
    <div className="space-y-3">

      {/* ── Toolbar ── */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm">
                <SlidersHorizontalIcon />
                Columns
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-auto min-w-[180px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {hidableColumns.map(col => {
                const label =
                  typeof col.columnDef.header === "string" ? col.columnDef.header : col.id
                return (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={checked => col.toggleVisibility(!!checked)}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Table ── */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
      >
        <div
          className="overflow-hidden border rounded-[var(--pcs-table-border-radius)] border-[color:var(--pcs-table-border-color)] border-[length:var(--pcs-table-border-width)]"
        >
          {/*
            Table renders its own overflow-x-auto scroll container.
            min-w-max forces the table to be at least as wide as its content,
            triggering horizontal scroll when columns exceed the container width.
          */}
          <Table className="min-w-max">
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <SortableContext
                  key={headerGroup.id}
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <TableRow>
                    {headerGroup.headers.map(header => (
                      <DraggableTableHead
                        key={header.id}
                        header={header as Header<TData, unknown>}
                      />
                    ))}
                  </TableRow>
                </SortableContext>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                  >
                    {row.getVisibleCells().map(cell => {
                      const pinned = cell.column.getIsPinned()

                      // Dynamic pixel offsets for sticky cells — must be inline style
                      const pinStyle: React.CSSProperties = pinned === "left"
                        ? { position: "sticky", left:  cell.column.getStart("left"),  zIndex: 1 }
                        : pinned === "right"
                        ? { position: "sticky", right: cell.column.getAfter("right"), zIndex: 1 }
                        : {}

                      return (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize(), ...pinStyle }}
                          className={cn(
                            // Pinned cells need an opaque background for sticky to cover scrolling content.
                            // Mirrors the row selection state so pinned cells aren't visually detached.
                            pinned && !row.getIsSelected() && "bg-[var(--pcs-table-bg)]",
                            pinned && row.getIsSelected()  && "bg-[var(--pcs-table-row-bg-selected)]",
                            pinned === "left"  && "[box-shadow:var(--pcs-table-col-pin-shadow-left)]",
                            pinned === "right" && "[box-shadow:var(--pcs-table-col-pin-shadow-right)]",
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
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
      </DndContext>

      {/* ── Pagination footer ── */}
      <div className="flex items-center justify-between">
        <p className="type-body-sm text-[color:var(--pcs-table-footer-color)]">
          {selectedCount > 0
            ? `${selectedCount} of ${totalCount} row(s) selected`
            : `${totalCount} row(s) total`}
        </p>
        <div className="flex items-center gap-2">
          <p className="type-body-sm text-[color:var(--pcs-table-footer-color)]">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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
