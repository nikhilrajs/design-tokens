import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  [
    "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm",
    "has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18",
    "has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        // Neutral / default
        default:
          "bg-[var(--pcs-alert-neutral-bg)] border-[color:var(--pcs-alert-neutral-border)] text-[color:var(--pcs-alert-neutral-title)] *:data-[slot=alert-description]:text-[color:var(--pcs-alert-neutral-description)] *:[svg]:text-[color:var(--pcs-alert-neutral-icon)]",

        // Info
        info:
          "bg-[var(--pcs-alert-info-bg)] border-[color:var(--pcs-alert-info-border)] text-[color:var(--pcs-alert-info-title)] *:data-[slot=alert-description]:text-[color:var(--pcs-alert-info-description)] *:[svg]:text-[color:var(--pcs-alert-info-icon)]",

        // Success
        success:
          "bg-[var(--pcs-alert-success-bg)] border-[color:var(--pcs-alert-success-border)] text-[color:var(--pcs-alert-success-title)] *:data-[slot=alert-description]:text-[color:var(--pcs-alert-success-description)] *:[svg]:text-[color:var(--pcs-alert-success-icon)]",

        // Warning
        warning:
          "bg-[var(--pcs-alert-warning-bg)] border-[color:var(--pcs-alert-warning-border)] text-[color:var(--pcs-alert-warning-title)] *:data-[slot=alert-description]:text-[color:var(--pcs-alert-warning-description)] *:[svg]:text-[color:var(--pcs-alert-warning-icon)]",

        // Error / Destructive
        error:
          "bg-[var(--pcs-alert-error-bg)] border-[color:var(--pcs-alert-error-border)] text-[color:var(--pcs-alert-error-title)] *:data-[slot=alert-description]:text-[color:var(--pcs-alert-error-description)] *:[svg]:text-[color:var(--pcs-alert-error-icon)]",

        // Kept for shadcn API compat — maps to error tokens
        destructive:
          "bg-[var(--pcs-alert-error-bg)] border-[color:var(--pcs-alert-error-border)] text-[color:var(--pcs-alert-error-title)] *:data-[slot=alert-description]:text-[color:var(--pcs-alert-error-description)] *:[svg]:text-[color:var(--pcs-alert-error-icon)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance group-has-[>svg]/alert:col-start-2 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
