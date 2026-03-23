import * as React from "react"

import { cn } from "../../lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        [
          "field-sizing-content w-full min-w-0 outline-none transition-colors",
          "min-h-[var(--pcs-input-size-textarea-min-height)]",
          "px-[var(--pcs-input-size-textarea-padding-x)]",
          "py-[var(--pcs-input-size-textarea-padding-y)]",
          "resize-[var(--pcs-input-size-textarea-resize)]",
          "rounded-[var(--pcs-input-border-radius)]",
          "border-[length:var(--pcs-input-border-width)] border-solid",
          "border-[color:var(--pcs-input-border-color)]",
          "bg-[var(--pcs-input-bg)]",
          "text-[color:var(--pcs-input-text)]",
          "font-[family-name:var(--pcs-input-font-family)]",
          "text-[length:var(--pcs-input-font-size)]",
          "font-[var(--pcs-input-font-weight)]",
          "placeholder:text-[color:var(--pcs-input-placeholder)]",
          // Hover
          "hover:border-[color:var(--pcs-input-border-color-hover)]",
          "hover:bg-[var(--pcs-input-bg-hover)]",
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
        ],
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
