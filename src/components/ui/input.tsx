import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "../../lib/utils"

const inputVariants = cva(
  [
    // Layout
    "w-full min-w-0",
    // Shape + border
    "rounded-[var(--pcs-input-border-radius)]",
    "border-[length:var(--pcs-input-border-width)] border-solid border-[color:var(--pcs-input-border-color)]",
    // Background + text
    "bg-[var(--pcs-input-bg)]",
    "text-[length:var(--pcs-input-font-size)] text-[color:var(--pcs-input-text)]",
    "transition-colors outline-none",
    "placeholder:text-[color:var(--pcs-input-placeholder)]",
    // Focus
    "focus-visible:border-[color:var(--pcs-input-border-color-focus)]",
    "focus-visible:ring-3 focus-visible:ring-[var(--pcs-input-focus-ring-color)]/50",
    // Read-only — Option B: transparent bg, dashed border, default text (user can read + copy, not edit)
    "[&[readonly]]:bg-transparent [&[readonly]]:border-dashed [&[readonly]]:shadow-none [&[readonly]]:cursor-default",
    // Disabled
    "disabled:pointer-events-none disabled:cursor-[var(--pcs-input-cursor-disabled)]",
    "disabled:bg-[var(--pcs-input-bg-disabled)] disabled:text-[color:var(--pcs-input-text-disabled)]",
    // Error
    "aria-invalid:border-[color:var(--pcs-input-border-color-error)]",
    "aria-invalid:ring-3 aria-invalid:ring-[var(--pcs-input-border-color-error)]/50",
    // File input reset
    "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[color:var(--pcs-input-text)]",
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
    defaultVariants: { size: "md" },
  }
)

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

function Input({ className, type, size, ...props }: InputProps) {
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
