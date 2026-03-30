import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 border-[length:var(--pcs-empty-border-width)] border-[color:var(--pcs-empty-border-color)] border-dashed rounded-[var(--pcs-empty-border-radius)] bg-[var(--pcs-empty-bg)] p-[var(--pcs-empty-padding)] text-center text-balance",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-[var(--pcs-empty-media-icon-size)] rounded-[var(--pcs-empty-media-icon-border-radius)] bg-[var(--pcs-empty-media-icon-bg)] text-[color:var(--pcs-empty-media-icon-color)] [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "text-[length:var(--pcs-empty-title-font-size)] font-[number:var(--pcs-empty-title-font-weight)] text-[color:var(--pcs-empty-title-color)] tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-[length:var(--pcs-empty-description-font-size)] leading-relaxed text-[color:var(--pcs-empty-description-color)] [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-[color:var(--pcs-empty-description-link-color)] [&>a:hover]:text-[color:var(--pcs-empty-description-link-color-hover)]",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
