import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  [
    // Layout
    "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 truncate transition-colors",
    // Sizing
    "h-[var(--pcs-badge-height)]",
    "px-[var(--pcs-badge-padding-x)] py-[var(--pcs-badge-padding-y)]",
    "max-w-[var(--pcs-badge-max-width)]",
    // Shape + border
    "rounded-[var(--pcs-badge-border-radius)]",
    "border-[length:var(--pcs-badge-border-width)] border-[style:var(--pcs-badge-border-style)]",
    // Typography
    "text-[length:var(--pcs-badge-font-size)] font-[var(--pcs-badge-font-weight)]",
    "uppercase tracking-[var(--pcs-badge-letter-spacing)]",
    // Icons
    "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
    "[&>svg]:pointer-events-none [&>svg]:size-3!",
    // Focus — only applies when rendered as an interactive element (e.g. <a>)
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--pcs-color-focus-ring)]/50",
  ],
  {
    variants: {
      appearance: {
        neutral: "",
        primary: "",
        success: "",
        error: "",
        warning: "",
        info: "",
      },
      weight: {
        default: "",
        emphasis: "",
      },
    },
    compoundVariants: [
      // ── Neutral ─────────────────────────────────────────────────────────────
      {
        appearance: "neutral", weight: "default",
        className: "bg-[var(--pcs-badge-neutral-bg)] border-[color:var(--pcs-badge-neutral-border)] text-[color:var(--pcs-badge-neutral-text)]",
      },
      {
        appearance: "neutral", weight: "emphasis",
        className: "bg-[var(--pcs-badge-neutral-emphasis-bg)] border-[color:var(--pcs-badge-neutral-emphasis-border)] text-[color:var(--pcs-badge-neutral-emphasis-text)]",
      },
      // ── Primary ─────────────────────────────────────────────────────────────
      {
        appearance: "primary", weight: "default",
        className: "bg-[var(--pcs-badge-primary-bg)] border-[color:var(--pcs-badge-primary-border)] text-[color:var(--pcs-badge-primary-text)]",
      },
      {
        appearance: "primary", weight: "emphasis",
        className: "bg-[var(--pcs-badge-primary-emphasis-bg)] border-[color:var(--pcs-badge-primary-emphasis-border)] text-[color:var(--pcs-badge-primary-emphasis-text)]",
      },
      // ── Success ─────────────────────────────────────────────────────────────
      {
        appearance: "success", weight: "default",
        className: "bg-[var(--pcs-badge-success-bg)] border-[color:var(--pcs-badge-success-border)] text-[color:var(--pcs-badge-success-text)]",
      },
      {
        appearance: "success", weight: "emphasis",
        className: "bg-[var(--pcs-badge-success-emphasis-bg)] border-[color:var(--pcs-badge-success-emphasis-border)] text-[color:var(--pcs-badge-success-emphasis-text)]",
      },
      // ── Error ───────────────────────────────────────────────────────────────
      {
        appearance: "error", weight: "default",
        className: "bg-[var(--pcs-badge-error-bg)] border-[color:var(--pcs-badge-error-border)] text-[color:var(--pcs-badge-error-text)]",
      },
      {
        appearance: "error", weight: "emphasis",
        className: "bg-[var(--pcs-badge-error-emphasis-bg)] border-[color:var(--pcs-badge-error-emphasis-border)] text-[color:var(--pcs-badge-error-emphasis-text)]",
      },
      // ── Warning ─────────────────────────────────────────────────────────────
      {
        appearance: "warning", weight: "default",
        className: "bg-[var(--pcs-badge-warning-bg)] border-[color:var(--pcs-badge-warning-border)] text-[color:var(--pcs-badge-warning-text)]",
      },
      {
        appearance: "warning", weight: "emphasis",
        className: "bg-[var(--pcs-badge-warning-emphasis-bg)] border-[color:var(--pcs-badge-warning-emphasis-border)] text-[color:var(--pcs-badge-warning-emphasis-text)]",
      },
      // ── Info ────────────────────────────────────────────────────────────────
      {
        appearance: "info", weight: "default",
        className: "bg-[var(--pcs-badge-info-bg)] border-[color:var(--pcs-badge-info-border)] text-[color:var(--pcs-badge-info-text)]",
      },
      {
        appearance: "info", weight: "emphasis",
        className: "bg-[var(--pcs-badge-info-emphasis-bg)] border-[color:var(--pcs-badge-info-emphasis-border)] text-[color:var(--pcs-badge-info-emphasis-text)]",
      },
    ],
    defaultVariants: {
      appearance: "neutral",
      weight: "default",
    },
  }
)

function Badge({
  className,
  appearance = "neutral",
  weight = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ appearance, weight }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      appearance,
      weight,
    },
  })
}

export { Badge, badgeVariants }
