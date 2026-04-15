import * as React from "react"

import { cn } from "../../lib/utils"

const Card = ({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) => {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden",
        "rounded-[var(--pcs-card-border-radius)]",
        "bg-[var(--pcs-card-bg)]",
        "ring-[length:var(--pcs-card-border-width)] ring-[var(--pcs-card-border-color)]",
        "text-sm text-[color:var(--pcs-color-text-default)]",
        "py-[var(--pcs-card-header-padding)]",
        "has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0",
        "data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        "*:[img:first-child]:rounded-t-[var(--pcs-card-border-radius)]",
        "*:[img:last-child]:rounded-b-[var(--pcs-card-border-radius)]",
        className
      )}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start",
        "gap-[var(--pcs-card-header-gap)]",
        "rounded-t-[var(--pcs-card-border-radius)]",
        "px-[var(--pcs-card-header-padding)]",
        "group-data-[size=sm]/card:px-3",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        "[.border-b]:pb-[var(--pcs-card-header-padding)]",
        "group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "type-title-sm",
        "text-[color:var(--pcs-card-title-color)]",
        "group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "type-body-md",
        "text-[color:var(--pcs-card-description-color)]",
        className
      )}
      {...props}
    />
  )
}

const CardAction = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-[var(--pcs-card-content-padding)]",
        "group-data-[size=sm]/card:px-3",
        className
      )}
      {...props}
    />
  )
}

const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center",
        "rounded-b-[var(--pcs-card-border-radius)]",
        "border-t border-[color:var(--pcs-card-separator-color)]",
        "bg-[var(--pcs-color-surface-muted)]/50",
        "p-[var(--pcs-card-footer-padding)]",
        "group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
