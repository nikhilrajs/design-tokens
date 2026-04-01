import * as React from "react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-[var(--pcs-pagination-gap)]", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(
        "border-[length:var(--pcs-pagination-item-border-width)] border-[color:var(--pcs-pagination-item-border-color)]",
        "text-[length:var(--pcs-pagination-font-size)] font-[number:var(--pcs-pagination-font-weight)] text-[color:var(--pcs-pagination-item-text)]",
        "hover:bg-[var(--pcs-pagination-item-bg-hover)] hover:border-[color:var(--pcs-pagination-item-border-color-hover)] hover:text-[color:var(--pcs-pagination-item-text-hover)]",
        // aria-current="page" is the semantic active-page marker — use it for styling
        "aria-[current=page]:bg-[var(--pcs-pagination-item-bg-active)] aria-[current=page]:border-[color:var(--pcs-pagination-item-border-color-active)] aria-[current=page]:text-[color:var(--pcs-pagination-item-text-active)] aria-[current=page]:hover:bg-[var(--pcs-pagination-item-bg-active)]",
        "focus-visible:ring-3 focus-visible:ring-[var(--pcs-pagination-focus-ring-color)]/50",
        className
      )}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "bg-[var(--pcs-pagination-control-bg)] border-[color:var(--pcs-pagination-control-border-color)] text-[color:var(--pcs-pagination-control-text)]",
        "hover:bg-[var(--pcs-pagination-control-bg-hover)] hover:border-[color:var(--pcs-pagination-control-border-color-hover)] hover:text-[color:var(--pcs-pagination-control-text-hover)]",
        "disabled:opacity-100 disabled:border-[color:var(--pcs-pagination-control-border-color-disabled)] disabled:text-[color:var(--pcs-pagination-control-text-disabled)]",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        "bg-[var(--pcs-pagination-control-bg)] border-[color:var(--pcs-pagination-control-border-color)] text-[color:var(--pcs-pagination-control-text)]",
        "hover:bg-[var(--pcs-pagination-control-bg-hover)] hover:border-[color:var(--pcs-pagination-control-border-color-hover)] hover:text-[color:var(--pcs-pagination-control-text-hover)]",
        "disabled:opacity-100 disabled:border-[color:var(--pcs-pagination-control-border-color-disabled)] disabled:text-[color:var(--pcs-pagination-control-text-disabled)]",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-[var(--pcs-pagination-ellipsis-size)] items-center justify-center text-[color:var(--pcs-pagination-ellipsis-color)] [&_svg:not([class*='size-'])]:size-[var(--pcs-pagination-icon-size)]",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
