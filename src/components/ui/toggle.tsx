import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const toggleVariants = cva(
  [
    // Layout
    "group/toggle inline-flex items-center justify-center whitespace-nowrap transition-all outline-none",
    // Typography
    "font-[family-name:var(--pcs-toggle-font-family)] font-[number:var(--pcs-toggle-font-weight)]",
    // Border (base — transparent; outline variant overrides the color)
    "border-[length:var(--pcs-toggle-border-width)] border-[color:var(--pcs-toggle-border-color)]",
    // Default state
    "bg-[var(--pcs-toggle-bg)] text-[color:var(--pcs-toggle-text)]",
    // Hover
    "hover:bg-[var(--pcs-toggle-bg-hover)] hover:text-[color:var(--pcs-toggle-text-hover)]",
    // Pressed / active state — Base UI sets aria-pressed; data-[state=on] covers Radix compat
    "aria-pressed:bg-[var(--pcs-toggle-bg-active)] aria-pressed:border-[color:var(--pcs-toggle-border-color-active)] aria-pressed:text-[color:var(--pcs-toggle-text-active)]",
    "aria-pressed:hover:bg-[var(--pcs-toggle-bg-active-hover)] aria-pressed:hover:border-[color:var(--pcs-toggle-border-color-active-hover)]",
    "data-[state=on]:bg-[var(--pcs-toggle-bg-active)] data-[state=on]:text-[color:var(--pcs-toggle-text-active)]",
    // Focus ring
    "focus-visible:border-[color:var(--pcs-toggle-focus-ring-color)] focus-visible:ring-[length:var(--pcs-toggle-focus-ring-width)] focus-visible:ring-[var(--pcs-toggle-focus-ring-color)]/50",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Error
    "aria-invalid:border-[color:var(--pcs-color-error-border)] aria-invalid:ring-[var(--pcs-color-error-border)]/20",
    // SVG icons
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        outline: "border-[color:var(--pcs-toggle-outline-border-color)]",
      },
      size: {
        sm: [
          "h-[var(--pcs-toggle-size-sm-height)] min-w-[var(--pcs-toggle-size-sm-height)]",
          "gap-[var(--pcs-toggle-size-sm-gap)] px-[var(--pcs-toggle-size-sm-padding-x)]",
          "rounded-[min(var(--pcs-toggle-border-radius),12px)]",
          "text-[length:var(--pcs-toggle-size-sm-font-size)]",
        ].join(" "),
        default: [
          "h-[var(--pcs-toggle-size-md-height)] min-w-[var(--pcs-toggle-size-md-height)]",
          "gap-[var(--pcs-toggle-size-md-gap)] px-[var(--pcs-toggle-size-md-padding-x)]",
          "rounded-[var(--pcs-toggle-border-radius)]",
          "text-[length:var(--pcs-toggle-size-md-font-size)]",
        ].join(" "),
        lg: [
          "h-[var(--pcs-toggle-size-lg-height)] min-w-[var(--pcs-toggle-size-lg-height)]",
          "gap-[var(--pcs-toggle-size-lg-gap)] px-[var(--pcs-toggle-size-lg-padding-x)]",
          "rounded-[var(--pcs-toggle-border-radius)]",
          "text-[length:var(--pcs-toggle-size-lg-font-size)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
