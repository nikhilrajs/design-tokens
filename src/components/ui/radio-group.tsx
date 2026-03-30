import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "../../lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-[var(--pcs-radio-group-gap)]", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        // Layout + structure
        "group/radio-group-item peer relative flex shrink-0 items-center justify-center outline-none transition-colors",
        // Touch target — 44×44px tap area via centered pseudo-element (visual size unchanged)
        "after:absolute after:size-[var(--pcs-radio-touch-target)] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
        // Size + shape
        "size-[var(--pcs-radio-size)] rounded-[var(--pcs-radio-border-radius)]",
        // Border
        "border-[length:var(--pcs-radio-border-width)] border-[color:var(--pcs-radio-border-color)]",
        // Background
        "bg-[var(--pcs-radio-bg)]",
        // Hover (unselected)
        "hover:bg-[var(--pcs-radio-bg-hover)] hover:border-[color:var(--pcs-radio-border-color-hover)]",
        // Selected state
        "data-checked:bg-[var(--pcs-radio-bg-selected)]",
        "data-checked:border-[color:var(--pcs-radio-border-color-selected)]",
        // Selected + hover
        "data-checked:hover:bg-[var(--pcs-radio-bg-selected-hover)]",
        "data-checked:hover:border-[color:var(--pcs-radio-border-color-selected-hover)]",
        // Focus ring
        "focus-visible:border-[color:var(--pcs-radio-focus-ring-color)]",
        "focus-visible:ring-3 focus-visible:ring-[var(--pcs-radio-focus-ring-color)]/50",
        // Disabled — Base UI sets data-disabled, not native :disabled
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        // Error (aria-invalid)
        "aria-invalid:border-[color:var(--pcs-color-error-border)]",
        "aria-invalid:ring-3 aria-invalid:ring-[var(--pcs-color-error-border)]/50",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-[var(--pcs-radio-size)] items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-[var(--pcs-radio-dot-size)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--pcs-radio-dot-color)] [[data-checked]_&]:bg-[var(--pcs-radio-dot-color-selected)] [[data-disabled][data-checked]_&]:bg-[var(--pcs-radio-dot-color-disabled-selected)]" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
