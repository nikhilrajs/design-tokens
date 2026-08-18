import * as React from "react"

import { cn } from "../../lib/utils"

const Table = ({ className, ...props }: React.ComponentProps<"table">) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-[var(--pcs-table-border-radius)]"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom bg-[var(--pcs-table-bg)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child>td]:border-b-0", className)}
      {...props}
    />
  )
}

const TableFooter = ({ className, ...props }: React.ComponentProps<"tfoot">) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-[color:var(--pcs-table-footer-border-top-color)]",
        "bg-[var(--pcs-table-footer-bg)]",
        "text-[length:var(--pcs-table-footer-font-size)] text-[color:var(--pcs-table-footer-color)]",
        "font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        // Border lives on the cells (below), not the row: a border set directly on
        // <tr> only renders under border-collapse:collapse. AdvancedDataTable uses
        // border-separate (needed for sticky pinned-column borders), which would
        // silently drop a tr-level border — td/th borders render in both modes.
        // group: lets a pinned cell mirror row hover via group-hover — its own
        // background is set from JS state (selected/highlighted/default) to stay
        // opaque while sticky, which a plain CSS :hover on this row can't reach.
        "group transition-colors",
        "hover:bg-[var(--pcs-table-row-bg-hover)]",
        "data-[state=selected]:bg-[var(--pcs-table-row-bg-selected)]",
        "data-[variant=highlighted]:bg-[var(--pcs-table-row-bg-highlighted)]",
        // Set --row-accent on the tr so it cascades into td:first-child.
        // The accent is drawn there via box-shadow, not here, so it always
        // aligns flush with the cell edge regardless of first-column content.
        "data-[variant=highlighted]:[--row-accent:var(--pcs-table-row-border-highlighted-color)]",
        className
      )}
      {...props}
    />
  )
}

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentProps<"th">
>(function TableHead({ className, ...props }, ref) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "text-left align-middle whitespace-nowrap",
        "bg-[var(--pcs-table-head-bg)]",
        "px-[var(--pcs-table-head-padding-x-default)] py-[var(--pcs-table-head-padding-y-default)]",
        "text-[length:var(--pcs-table-head-font-size)] text-[color:var(--pcs-table-head-color)]",
        "font-[var(--pcs-table-head-font-weight)] leading-[var(--pcs-table-head-line-height)]",
        "[text-transform:var(--pcs-table-head-text-transform)] tracking-[var(--pcs-table-head-letter-spacing)]",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
})

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentProps<"td">
>(function TableCell({ className, ...props }, ref) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        "align-middle whitespace-nowrap",
        "border-b border-[color:var(--pcs-table-row-border-bottom-color)]",
        "px-[var(--pcs-table-cell-padding-x-default)] py-[var(--pcs-table-cell-padding-y-default)]",
        "text-[length:var(--pcs-table-cell-font-size)] text-[color:var(--pcs-table-cell-color)]",
        "font-[var(--pcs-table-cell-font-weight)] leading-[var(--pcs-table-cell-line-height)]",
        "[&:has([role=checkbox])]:pr-0",
        // Consumes --row-accent set by the parent tr when data-variant="highlighted".
        // Fallback transparent means no shadow on normal rows.
        "first:[box-shadow:inset_3px_0_0_var(--row-accent,transparent)]",
        className
      )}
      {...props}
    />
  )
})

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-4",
        "px-[var(--pcs-table-caption-padding)] py-[var(--pcs-table-caption-padding)]",
        "text-[length:var(--pcs-table-caption-font-size)] text-[color:var(--pcs-table-caption-color)]",
        "font-[var(--pcs-table-caption-font-weight)]",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
