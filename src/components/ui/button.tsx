import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  // ─── Base ──────────────────────────────────────────────────────────────────
  // Layout + structure
  "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none transition-all outline-none" +
  // Border setup (width + style; color comes from each variant)
  " border border-solid" +
  // Typography
  " font-sans font-medium" +
  // SVG icon defaults
  " [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" +
  // Interaction
  " active:translate-y-px" +
  " disabled:pointer-events-none disabled:cursor-not-allowed" +
  // Focus ring — driven by component tokens
  " focus-visible:ring-2 focus-visible:ring-offset-2" +
  " focus-visible:ring-[var(--pcs-button-focus-ring-color)]" +
  " focus-visible:border-[color:var(--pcs-button-focus-ring-color)]" +
  // aria-invalid (form validation error state)
  " aria-invalid:border-[color:var(--pcs-color-error-border)]" +
  " aria-invalid:ring-2 aria-invalid:ring-[var(--pcs-color-error-border)]",
  {
    variants: {
      // ─── Visual variants ──────────────────────────────────────────────────
      variant: {
        // Primary — filled brand. Main CTA.
        default:
          "bg-[var(--pcs-button-primary-bg)]" +
          " text-[color:var(--pcs-button-primary-text)]" +
          " border-[color:var(--pcs-button-primary-border)]" +
          " shadow-[var(--pcs-button-primary-shadow)]" +
          " hover:bg-[var(--pcs-button-primary-bg-hover)]" +
          " hover:border-[color:var(--pcs-button-primary-border-hover)]" +
          " hover:shadow-[var(--pcs-button-primary-shadow-hover)]" +
          " active:bg-[var(--pcs-button-primary-bg-active)]" +
          " active:border-[color:var(--pcs-button-primary-border-active)]" +
          " disabled:bg-[var(--pcs-button-primary-bg-disabled)]" +
          " disabled:text-[color:var(--pcs-button-primary-text-disabled)]" +
          " disabled:border-[color:var(--pcs-button-primary-border-disabled)]" +
          " disabled:shadow-[var(--pcs-button-primary-shadow-disabled)]",

        // Outline / Secondary — visible border, neutral background.
        outline:
          "bg-[var(--pcs-button-secondary-bg)]" +
          " text-[color:var(--pcs-button-secondary-text)]" +
          " border-[color:var(--pcs-button-secondary-border)]" +
          " shadow-[var(--pcs-button-secondary-shadow)]" +
          " hover:bg-[var(--pcs-button-secondary-bg-hover)]" +
          " hover:border-[color:var(--pcs-button-secondary-border-hover)]" +
          " hover:shadow-[var(--pcs-button-secondary-shadow-hover)]" +
          " active:bg-[var(--pcs-button-secondary-bg-active)]" +
          " active:border-[color:var(--pcs-button-secondary-border-active)]" +
          " aria-expanded:bg-[var(--pcs-button-secondary-bg-active)]" +
          " aria-expanded:border-[color:var(--pcs-button-secondary-border-active)]" +
          " disabled:bg-[var(--pcs-button-secondary-bg-disabled)]" +
          " disabled:text-[color:var(--pcs-button-secondary-text-disabled)]" +
          " disabled:border-[color:var(--pcs-button-secondary-border-disabled)]" +
          " disabled:shadow-[var(--pcs-button-secondary-shadow-disabled)]",

        // Secondary — same visual as outline; alias kept for shadcn API compat.
        secondary:
          "bg-[var(--pcs-button-secondary-bg)]" +
          " text-[color:var(--pcs-button-secondary-text)]" +
          " border-[color:var(--pcs-button-secondary-border)]" +
          " hover:bg-[var(--pcs-button-secondary-bg-hover)]" +
          " hover:border-[color:var(--pcs-button-secondary-border-hover)]" +
          " active:bg-[var(--pcs-button-secondary-bg-active)]" +
          " aria-expanded:bg-[var(--pcs-button-secondary-bg-active)]" +
          " disabled:bg-[var(--pcs-button-secondary-bg-disabled)]" +
          " disabled:text-[color:var(--pcs-button-secondary-text-disabled)]" +
          " disabled:border-[color:var(--pcs-button-secondary-border-disabled)]",

        // Ghost — no border, no fill. Tertiary / low-emphasis.
        ghost:
          "bg-[var(--pcs-button-ghost-bg)]" +
          " text-[color:var(--pcs-button-ghost-text)]" +
          " border-[color:var(--pcs-button-ghost-border)]" +
          " hover:bg-[var(--pcs-button-ghost-bg-hover)]" +
          " active:bg-[var(--pcs-button-ghost-bg-active)]" +
          " aria-expanded:bg-[var(--pcs-button-ghost-bg-active)]" +
          " disabled:bg-[var(--pcs-button-ghost-bg-disabled)]" +
          " disabled:text-[color:var(--pcs-button-ghost-text-disabled)]",

        // Destructive — filled red. Dangerous actions.
        destructive:
          "bg-[var(--pcs-button-destructive-bg)]" +
          " text-[color:var(--pcs-button-destructive-text)]" +
          " border-[color:var(--pcs-button-destructive-border)]" +
          " shadow-[var(--pcs-button-destructive-shadow)]" +
          " hover:bg-[var(--pcs-button-destructive-bg-hover)]" +
          " hover:border-[color:var(--pcs-button-destructive-border-hover)]" +
          " hover:shadow-[var(--pcs-button-destructive-shadow-hover)]" +
          " active:bg-[var(--pcs-button-destructive-bg-active)]" +
          " active:border-[color:var(--pcs-button-destructive-border-active)]" +
          " disabled:bg-[var(--pcs-button-destructive-bg-disabled)]" +
          " disabled:text-[color:var(--pcs-button-destructive-text-disabled)]" +
          " disabled:border-[color:var(--pcs-button-destructive-border-disabled)]" +
          " disabled:shadow-[var(--pcs-button-destructive-shadow-disabled)]",

        // Link — text link with button semantics. Zero chrome.
        link:
          "bg-[var(--pcs-button-link-bg)]" +
          " text-[color:var(--pcs-button-link-text)]" +
          " border-[color:var(--pcs-button-link-border)]" +
          " underline-offset-4" +
          " hover:text-[color:var(--pcs-button-link-text-hover)]" +
          " hover:underline" +
          " active:text-[color:var(--pcs-button-link-text-active)]" +
          " disabled:text-[color:var(--pcs-button-link-text-disabled)]",
      },

      // ─── Size variants ────────────────────────────────────────────────────
      size: {
        // md — default
        default:
          "h-[var(--pcs-button-size-md-height)]" +
          " gap-[var(--pcs-button-size-md-gap)]" +
          " px-[var(--pcs-button-size-md-padding-x)]" +
          " text-[length:var(--pcs-button-size-md-font-size)]" +
          " rounded-[var(--pcs-button-size-md-radius)]" +
          " has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",

        // xs
        xs:
          "h-[var(--pcs-button-icon-size-sm)]" +
          " gap-[var(--pcs-button-size-sm-gap)]" +
          " px-[var(--pcs-button-size-sm-padding-x)]" +
          " text-[length:var(--pcs-button-size-sm-font-size)]" +
          " rounded-[min(var(--pcs-button-size-sm-radius),10px)]" +
          " in-data-[slot=button-group]:rounded-lg" +
          " has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5" +
          " [&_svg:not([class*='size-'])]:size-3",

        // sm
        sm:
          "h-[var(--pcs-button-size-sm-height)]" +
          " gap-[var(--pcs-button-size-sm-gap)]" +
          " px-[var(--pcs-button-size-sm-padding-x)]" +
          " text-[length:var(--pcs-button-size-sm-font-size)]" +
          " rounded-[min(var(--pcs-button-size-sm-radius),12px)]" +
          " in-data-[slot=button-group]:rounded-lg" +
          " has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5" +
          " [&_svg:not([class*='size-'])]:size-3.5",

        // lg
        lg:
          "h-[var(--pcs-button-size-lg-height)]" +
          " gap-[var(--pcs-button-size-lg-gap)]" +
          " px-[var(--pcs-button-size-lg-padding-x)]" +
          " text-[length:var(--pcs-button-size-lg-font-size)]" +
          " rounded-[var(--pcs-button-size-lg-radius)]" +
          " has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",

        // Icon-only — md square
        icon:
          "size-[var(--pcs-button-icon-size-md)]" +
          " rounded-[var(--pcs-button-size-md-radius)]",

        // Icon-only — xs square
        "icon-xs":
          "size-[var(--pcs-button-icon-size-sm)]" +
          " rounded-[min(var(--pcs-button-size-sm-radius),10px)]" +
          " in-data-[slot=button-group]:rounded-lg" +
          " [&_svg:not([class*='size-'])]:size-3",

        // Icon-only — sm square
        "icon-sm":
          "size-[var(--pcs-button-icon-size-sm)]" +
          " rounded-[min(var(--pcs-button-size-sm-radius),12px)]" +
          " in-data-[slot=button-group]:rounded-lg",

        // Icon-only — lg square
        "icon-lg":
          "size-[var(--pcs-button-icon-size-lg)]" +
          " rounded-[var(--pcs-button-size-lg-radius)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
