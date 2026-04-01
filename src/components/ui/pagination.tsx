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
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(
        "font-[number:var(--pcs-pagination-font-weight)]",
        // Inactive items use muted text; ghost variant defaults to the full default text color
        !isActive && "text-[color:var(--pcs-pagination-item-text)]",
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
  size,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  // When no text label is shown, use icon size so the button stays square
  const resolvedSize = size ?? (text ? "default" : "icon")
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={resolvedSize}
      className={cn(className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      {text && <span className="hidden sm:block">{text}</span>}
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  size,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  // When no text label is shown, use icon size so the button stays square
  const resolvedSize = size ?? (text ? "default" : "icon")
  return (
    <PaginationLink
      aria-label="Go to next page"
      size={resolvedSize}
      className={cn(className)}
      {...props}
    >
      {text && <span className="hidden sm:block">{text}</span>}
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
