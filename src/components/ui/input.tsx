import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "../../lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-[var(--pcs-input-size-md-height)] w-full min-w-0 rounded-[var(--pcs-input-border-radius)] border-[length:var(--pcs-input-border-width)] border-solid border-[color:var(--pcs-input-border-color)] bg-[var(--pcs-input-bg)] px-[var(--pcs-input-size-md-padding-x)] py-[var(--pcs-input-size-md-padding-y)] text-[length:var(--pcs-input-font-size)] text-[color:var(--pcs-input-text)] transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[color:var(--pcs-input-text)] placeholder:text-[color:var(--pcs-input-placeholder)] focus-visible:border-[color:var(--pcs-input-border-color-focus)] focus-visible:ring-3 focus-visible:ring-[var(--pcs-input-focus-ring-color)]/50 disabled:pointer-events-none disabled:cursor-[var(--pcs-input-cursor-disabled)] disabled:bg-[var(--pcs-input-bg-disabled)] disabled:text-[color:var(--pcs-input-text-disabled)] aria-invalid:border-[color:var(--pcs-input-border-color-error)] aria-invalid:ring-2 aria-invalid:ring-[var(--pcs-input-border-color-error)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
