import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "../../lib/utils"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Layout + structure
        "peer relative flex shrink-0 items-center justify-center outline-none transition-colors",
        // Touch target — 44×44px tap area via centered pseudo-element (visual size unchanged)
        "after:absolute after:size-[var(--pcs-checkbox-touch-target)] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
        // Size + shape
        "size-[var(--pcs-checkbox-size)] rounded-[var(--pcs-checkbox-border-radius)]",
        // Border
        "border-[length:var(--pcs-checkbox-border-width)] border-[color:var(--pcs-checkbox-border-color)]",
        // Background
        "bg-[var(--pcs-checkbox-bg)]",
        // Hover (unchecked)
        "hover:bg-[var(--pcs-checkbox-bg-hover)] hover:border-[color:var(--pcs-checkbox-border-color-hover)]",
        // Checked state — indicator color is set here and inherited via text-current in Indicator
        "data-checked:bg-[var(--pcs-checkbox-bg-checked)]",
        "data-checked:border-[color:var(--pcs-checkbox-border-color-checked)]",
        "data-checked:text-[color:var(--pcs-checkbox-indicator-color-checked)]",
        // Checked + hover
        "data-checked:hover:bg-[var(--pcs-checkbox-bg-checked-hover)]",
        "data-checked:hover:border-[color:var(--pcs-checkbox-border-color-checked-hover)]",
        // Indeterminate state
        "data-indeterminate:bg-[var(--pcs-checkbox-bg-indeterminate)]",
        "data-indeterminate:border-[color:var(--pcs-checkbox-border-color-indeterminate)]",
        "data-indeterminate:text-[color:var(--pcs-checkbox-indicator-color-indeterminate)]",
        // Focus ring
        "focus-visible:border-[color:var(--pcs-checkbox-focus-ring-color)]",
        "focus-visible:ring-3 focus-visible:ring-[var(--pcs-checkbox-focus-ring-color)]/50",
        // Disabled — Base UI sets data-disabled, not native :disabled
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        // Error (aria-invalid)
        "aria-invalid:border-[color:var(--pcs-color-error-border)]",
        "aria-invalid:ring-3 aria-invalid:ring-[var(--pcs-color-error-border)]/50",
        // Field-level disabled — when checkbox sits inside a disabled <FieldGroup>
        "group-has-[[data-disabled]]/field:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-[var(--pcs-checkbox-indicator-size)]"
      >
        {/* Check for checked; minus swapped in for indeterminate */}
        <CheckIcon className="[[data-indeterminate]_&]:hidden" />
        <MinusIcon className="hidden [[data-indeterminate]_&]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
