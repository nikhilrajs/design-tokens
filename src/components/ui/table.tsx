import * as React from "react"

import { cn } from "../../lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
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

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
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

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-[color:var(--pcs-table-row-border-bottom-color)] transition-colors",
        "hover:bg-[var(--pcs-table-row-bg-hover)]",
        "data-[state=selected]:bg-[var(--pcs-table-row-bg-selected)]",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-left align-middle whitespace-nowrap",
        "bg-[var(--pcs-table-head-bg)]",
        "px-[var(--pcs-table-head-padding-x-default)] py-[var(--pcs-table-head-padding-y-default)]",
        "text-[length:var(--pcs-table-head-font-size)] text-[color:var(--pcs-table-head-color)]",
        "font-[var(--pcs-table-head-font-weight)] leading-[var(--pcs-table-head-line-height)]",
        "uppercase tracking-[var(--pcs-table-head-letter-spacing)]",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "align-middle whitespace-nowrap",
        "px-[var(--pcs-table-cell-padding-x-default)] py-[var(--pcs-table-cell-padding-y-default)]",
        "text-[length:var(--pcs-table-cell-font-size)] text-[color:var(--pcs-table-cell-color)]",
        "font-[var(--pcs-table-cell-font-weight)] leading-[var(--pcs-table-cell-line-height)]",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
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
