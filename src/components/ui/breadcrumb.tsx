import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "../../lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center wrap-break-word",
        "gap-[var(--pcs-breadcrumb-gap)]",
        "font-[family-name:var(--pcs-breadcrumb-font-family)]",
        "text-[length:var(--pcs-breadcrumb-font-size)]",
        "font-[number:var(--pcs-breadcrumb-font-weight)]",
        "text-[color:var(--pcs-breadcrumb-item-color)]",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(
        "inline-flex items-center",
        "gap-[var(--pcs-breadcrumb-separator-gap)]",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "transition-colors",
          "rounded-[var(--pcs-breadcrumb-item-border-radius)]",
          "hover:text-[color:var(--pcs-breadcrumb-item-color-hover)] hover:underline",
          "focus-visible:outline-none",
          "focus-visible:ring-[length:var(--pcs-focus-ring-width)]",
          "focus-visible:ring-[var(--pcs-color-focus-ring)]/50",
          "focus-visible:ring-offset-[var(--pcs-breadcrumb-focus-ring-offset)]",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "cursor-default",
        "font-[number:var(--pcs-breadcrumb-font-weight-current)]",
        "text-[color:var(--pcs-breadcrumb-item-color-current)]",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "text-[color:var(--pcs-breadcrumb-separator-color)]",
        "[&>svg]:size-[var(--pcs-breadcrumb-separator-size)]",
        className
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center",
        "text-[color:var(--pcs-breadcrumb-ellipsis-color)]",
        "[&>svg]:size-[var(--pcs-breadcrumb-icon-size)]",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
