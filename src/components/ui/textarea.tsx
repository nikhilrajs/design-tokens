import * as React from "react"

import { cn } from "../../lib/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
  autoResize?: boolean
}

function Textarea({ className, autoResize = true, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Layout
        "flex w-full",
        // Auto-resize — opt out with autoResize={false}, then control height via className
        autoResize
          ? "field-sizing-content [resize:var(--pcs-input-textarea-resize)]"
          : "",
        // Sizing — textarea-specific tokens
        "min-h-[var(--pcs-input-textarea-min-height)]",
        "px-[var(--pcs-input-textarea-padding-x)] py-[var(--pcs-input-textarea-padding-y)]",
        // Shape + border
        "rounded-[var(--pcs-input-border-radius)]",
        "border-[length:var(--pcs-input-border-width)] border-solid border-[color:var(--pcs-input-border-color)]",
        // Background + text — shared input tokens
        "bg-[var(--pcs-input-bg)]",
        "text-[length:var(--pcs-input-font-size)] text-[color:var(--pcs-input-text)]",
        "placeholder:text-[color:var(--pcs-input-placeholder)]",
        "transition-colors outline-none",
        // Read-only
        "[&[readonly]]:bg-transparent [&[readonly]]:border-dashed [&[readonly]]:shadow-none [&[readonly]]:cursor-default",
        // Focus
        "focus-visible:border-[color:var(--pcs-input-border-color-focus)]",
        "focus-visible:ring-3 focus-visible:ring-[var(--pcs-input-focus-ring-color)]/50",
        // Disabled
        "disabled:pointer-events-none",
        "disabled:bg-[var(--pcs-input-bg-disabled)] disabled:text-[color:var(--pcs-input-text-disabled)]",
        // Error
        "aria-invalid:border-[color:var(--pcs-input-border-color-error)]",
        "aria-invalid:ring-3 aria-invalid:ring-[var(--pcs-input-border-color-error)]/50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
