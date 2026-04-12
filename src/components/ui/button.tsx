import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  // ─── Base ──────────────────────────────────────────────────────────────────
  [
    // Layout + structure
    "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none transition-all outline-none",
    // Border setup (width + style; color comes from each variant)
    "border border-solid",
    // Typography
    "font-sans font-medium",
    // SVG icon defaults
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Interaction
    "cursor-pointer active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    // Focus ring — no offset; ring at 50% opacity matches input focus pattern
    "focus-visible:ring-[length:var(--pcs-focus-ring-width)] focus-visible:ring-[var(--pcs-button-focus-ring-color)]/50 focus-visible:border-[color:var(--pcs-button-focus-ring-color)]",
    // aria-invalid (form validation error state)
    "aria-invalid:border-[color:var(--pcs-color-error-border)] aria-invalid:ring-2 aria-invalid:ring-[var(--pcs-color-error-border)]",
  ],
  {
    variants: {
      // ─── Visual variants ──────────────────────────────────────────────────
      variant: {
        // Primary — filled brand. Main CTA.
        default: [
          "bg-[var(--pcs-button-primary-bg)] text-[color:var(--pcs-button-primary-text)] border-[color:var(--pcs-button-primary-border)] shadow-[var(--pcs-button-primary-shadow)]",
          "hover:bg-[var(--pcs-button-primary-bg-hover)] hover:border-[color:var(--pcs-button-primary-border-hover)] hover:shadow-[var(--pcs-button-primary-shadow-hover)]",
          "active:bg-[var(--pcs-button-primary-bg-active)] active:border-[color:var(--pcs-button-primary-border-active)]",
        ],

        // Outline / Secondary — visible border, neutral background.
        outline: [
          "bg-[var(--pcs-button-secondary-bg)] text-[color:var(--pcs-button-secondary-text)] border-[color:var(--pcs-button-secondary-border)] shadow-[var(--pcs-button-secondary-shadow)]",
          "hover:bg-[var(--pcs-button-secondary-bg-hover)] hover:border-[color:var(--pcs-button-secondary-border-hover)] hover:shadow-[var(--pcs-button-secondary-shadow-hover)]",
          "active:bg-[var(--pcs-button-secondary-bg-active)] active:border-[color:var(--pcs-button-secondary-border-active)]",
          "aria-expanded:bg-[var(--pcs-button-secondary-bg-active)] aria-expanded:border-[color:var(--pcs-button-secondary-border-active)]",
        ],

        // Ghost — no border, no fill. Tertiary / low-emphasis.
        ghost: [
          "bg-transparent text-[color:var(--pcs-button-ghost-text)] border-transparent",
          "hover:bg-[var(--pcs-button-ghost-bg-hover)]",
          "active:bg-[var(--pcs-button-ghost-bg-active)] aria-expanded:bg-[var(--pcs-button-ghost-bg-active)]",
        ],

        // Destructive — filled red. Dangerous actions.
        destructive: [
          "bg-[var(--pcs-button-destructive-bg)] text-[color:var(--pcs-button-destructive-text)] border-[color:var(--pcs-button-destructive-border)] shadow-[var(--pcs-button-destructive-shadow)]",
          "hover:bg-[var(--pcs-button-destructive-bg-hover)] hover:border-[color:var(--pcs-button-destructive-border-hover)] hover:shadow-[var(--pcs-button-destructive-shadow-hover)]",
          "active:bg-[var(--pcs-button-destructive-bg-active)] active:border-[color:var(--pcs-button-destructive-border-active)]",
        ],

        // Destructive Outline — red border + text, transparent bg.
        "destructive-outline": [
          "bg-transparent text-[color:var(--pcs-button-destructive-outline-text)] border-[color:var(--pcs-button-destructive-outline-border)] shadow-[var(--pcs-button-destructive-outline-shadow)]",
          "hover:bg-[var(--pcs-button-destructive-outline-bg-hover)] hover:border-[color:var(--pcs-button-destructive-outline-border-hover)] hover:shadow-[var(--pcs-button-destructive-outline-shadow-hover)]",
          "active:bg-[var(--pcs-button-destructive-outline-bg-active)] active:border-[color:var(--pcs-button-destructive-outline-border-active)]",
        ],

        // Destructive Ghost — no fill, red text. Soft destructive for icon buttons and low-density contexts.
        "destructive-ghost": [
          "bg-transparent text-[color:var(--pcs-button-destructive-ghost-text)] border-transparent",
          "hover:bg-[var(--pcs-button-destructive-ghost-bg-hover)] hover:text-[color:var(--pcs-button-destructive-ghost-text-hover)]",
          "active:bg-[var(--pcs-button-destructive-ghost-bg-active)] active:text-[color:var(--pcs-button-destructive-ghost-text-active)]",
        ],

        // Link — text link with button semantics. Zero chrome.
        link: [
          "bg-transparent text-[color:var(--pcs-button-link-text)] border-transparent underline-offset-4",
          "hover:text-[color:var(--pcs-button-link-text-hover)] hover:underline",
          "active:text-[color:var(--pcs-button-link-text-active)]",
        ],
      },

      // ─── Size variants ────────────────────────────────────────────────────
      size: {
        // xs — compact toggle/filter
        xs: [
          "h-6 gap-1 px-1.5",
          "text-xs rounded-[min(var(--pcs-button-size-xs-radius),12px)]",
          "in-data-[slot=button-group]:rounded-md",
          "[&_svg:not([class*='size-'])]:size-3",
        ],

        // sm
        sm: [
          "h-7 gap-1 px-2",
          "text-xs rounded-[min(var(--pcs-button-size-sm-radius),12px)]",
          "in-data-[slot=button-group]:rounded-md",
          "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ],

        // md — default
        default: [
          "h-8 gap-1.5 px-3",
          "text-sm rounded-[var(--pcs-button-size-md-radius)]",
          "in-data-[slot=button-group]:rounded-md",
          "has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        ],

        // lg
        lg: [
          "h-10 gap-2 px-4",
          "text-base rounded-[var(--pcs-button-size-lg-radius)]",
          "in-data-[slot=button-group]:rounded-md",
          "has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        ],

        // Icon-only — xs square
        "icon-xs": [
          "size-6 rounded-[min(var(--pcs-button-size-xs-radius),12px)]",
          "in-data-[slot=button-group]:rounded-md",
        ],

        // Icon-only — sm square
        "icon-sm": [
          "size-7 rounded-[min(var(--pcs-button-size-sm-radius),12px)]",
          "in-data-[slot=button-group]:rounded-md",
        ],

        // Icon-only — md square
        icon: [
          "size-8 rounded-[var(--pcs-button-size-md-radius)]",
          "in-data-[slot=button-group]:rounded-md",
        ],

        // Icon-only — lg square
        "icon-lg": [
          "size-10 rounded-[var(--pcs-button-size-lg-radius)]",
          "in-data-[slot=button-group]:rounded-md",
        ],
      },

      // ─── Shape modifier ───────────────────────────────────────────────────
      rounded: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// forwardRef lets Base UI primitives (Menu.Trigger, Tooltip.Trigger, etc.) attach
// a ref to Button in React 18. In React 19 refs are plain props, so this is a no-op
// but safe to keep for cross-version compatibility.
const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonPrimitive.Props & VariantProps<typeof buttonVariants>
>(function Button({ className, variant = "default", size = "default", rounded, ...props }, ref) {
  return (
    <ButtonPrimitive
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  )
})

export { Button, buttonVariants }
