import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const inputVariants = cva(
  [
    "w-full min-w-0 outline-none transition-colors",
    "font-[family-name:var(--pcs-input-font-family)]",
    "text-[length:var(--pcs-input-font-size)]",
    "font-[var(--pcs-input-font-weight)]",
    "rounded-[var(--pcs-input-border-radius)]",
    "border-[length:var(--pcs-input-border-width)] border-solid",
    "border-[color:var(--pcs-input-border-color)]",
    "bg-[var(--pcs-input-bg)]",
    "text-[color:var(--pcs-input-text)]",
    "shadow-[var(--pcs-input-shadow)]",
    "placeholder:text-[color:var(--pcs-input-placeholder)]",
    // Hover
    "hover:border-[color:var(--pcs-input-border-color-hover)]",
    "hover:bg-[var(--pcs-input-bg-hover)]",
    "hover:shadow-[var(--pcs-input-shadow-hover)]",
    // Focus
    "focus-visible:border-[color:var(--pcs-input-border-color-focus)]",
    "focus-visible:ring-[length:var(--pcs-input-focus-ring-width)]",
    "focus-visible:ring-offset-[length:var(--pcs-input-focus-ring-offset)]",
    "focus-visible:ring-[color:var(--pcs-input-focus-ring-color)]",
    "focus-visible:bg-[var(--pcs-input-bg-focus)]",
    // Error (aria-invalid)
    "aria-invalid:border-[color:var(--pcs-input-border-color-error)]",
    "aria-invalid:focus-visible:ring-[color:var(--pcs-color-error-border)]",
    // Disabled
    "disabled:pointer-events-none",
    "disabled:cursor-[var(--pcs-input-cursor-disabled)]",
    "disabled:bg-[var(--pcs-input-bg-disabled)]",
    "disabled:border-[color:var(--pcs-input-border-color-disabled)]",
    "disabled:text-[color:var(--pcs-input-text-disabled)]",
    // Read-only
    "read-only:bg-[var(--pcs-input-bg-readonly)]",
    "read-only:border-[color:var(--pcs-input-border-color-readonly)]",
    "read-only:border-dashed",
    "read-only:focus-visible:ring-0",
    // File input slots — no tokens, keep as-is
    "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      size: {
        sm: [
          "h-[var(--pcs-input-size-sm-height)]",
          "px-[var(--pcs-input-size-sm-padding-x)]",
          "py-[var(--pcs-input-size-sm-padding-y)]",
        ],
        md: [
          "h-[var(--pcs-input-size-md-height)]",
          "px-[var(--pcs-input-size-md-padding-x)]",
          "py-[var(--pcs-input-size-md-padding-y)]",
        ],
        lg: [
          "h-[var(--pcs-input-size-lg-height)]",
          "px-[var(--pcs-input-size-lg-padding-x)]",
          "py-[var(--pcs-input-size-lg-padding-y)]",
        ],
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function Input({
  className,
  type,
  size,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
