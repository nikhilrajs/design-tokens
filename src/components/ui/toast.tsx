import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import {
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { cn } from "../../lib/utils"

// ─── Re-exports ───────────────────────────────────────────────────────────────

export type { ToastObject } from "@base-ui/react/toast"

// For global (out-of-React) toast triggering, import createToastManager directly:
//   import { createToastManager } from "@base-ui/react/toast"

export const useToast = ToastPrimitive.useToastManager

// ─── Variant types + token maps ───────────────────────────────────────────────

export type ToastVariant = "neutral" | "success" | "error" | "warning" | "info"

const variantTokens: Record<
  ToastVariant,
  { bg: string; border: string; title: string; description: string; icon: string }
> = {
  neutral: {
    bg: "var(--pcs-toast-neutral-bg)",
    border: "var(--pcs-toast-neutral-border)",
    title: "var(--pcs-toast-neutral-title)",
    description: "var(--pcs-toast-neutral-description)",
    icon: "var(--pcs-toast-neutral-icon)",
  },
  success: {
    bg: "var(--pcs-toast-success-bg)",
    border: "var(--pcs-toast-success-border)",
    title: "var(--pcs-toast-success-title)",
    description: "var(--pcs-toast-success-description)",
    icon: "var(--pcs-toast-success-icon)",
  },
  error: {
    bg: "var(--pcs-toast-error-bg)",
    border: "var(--pcs-toast-error-border)",
    title: "var(--pcs-toast-error-title)",
    description: "var(--pcs-toast-error-description)",
    icon: "var(--pcs-toast-error-icon)",
  },
  warning: {
    bg: "var(--pcs-toast-warning-bg)",
    border: "var(--pcs-toast-warning-border)",
    title: "var(--pcs-toast-warning-title)",
    description: "var(--pcs-toast-warning-description)",
    icon: "var(--pcs-toast-warning-icon)",
  },
  info: {
    bg: "var(--pcs-toast-info-bg)",
    border: "var(--pcs-toast-info-border)",
    title: "var(--pcs-toast-info-title)",
    description: "var(--pcs-toast-info-description)",
    icon: "var(--pcs-toast-info-icon)",
  },
}

// ─── ToastProvider ────────────────────────────────────────────────────────────

const ToastProvider = ({ ...props }: ToastPrimitive.Provider.Props) => {
  return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />
}

// ─── ToastViewport ────────────────────────────────────────────────────────────

const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  ToastPrimitive.Viewport.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    data-slot="toast-viewport"
    className={cn(
      // Fixed anchor — toasts stack upward from the bottom-right corner
      "fixed bottom-4 right-4 w-[22rem]",
      "focus:outline-none",
      className
    )}
    style={{ zIndex: "var(--pcs-toast-z)" } as React.CSSProperties}
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

// ─── Toast (Root) ─────────────────────────────────────────────────────────────
//
// Structural classes handle what Tailwind can express clearly.
// The style function handles the three things that genuinely require JS+CSS calc:
//   1. State-dependent stacking transform (collapsed / expanded / enter / swipe-exit)
//   2. height: var(--height) — aliases --toast-frontmost-height in collapsed state
//   3. z-index: calc(1000 - var(--toast-index)) — stacking order within the viewport
//   4. Multi-value transition with per-property durations
//   5. Variant colors + scoped CSS vars for description/icon children

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastPrimitive.Root.Props & { variant?: ToastVariant }
>(({ className, variant = "neutral", style: userStyle, ...props }, ref) => {
  const tokens = variantTokens[variant]

  return (
    <ToastPrimitive.Root
      ref={ref}
      data-slot="toast"
      className={cn(
        // Positioning — stacks at bottom of the viewport; transforms handle stacking
        "absolute bottom-0 right-0 w-full box-border",
        // Layout
        "flex items-start gap-3 border p-4",
        // Shape
        "rounded-[var(--pcs-toast-border-radius)]",
        // transform-origin so scale animation shrinks toward the bottom
        "origin-bottom",
        // Interaction
        "select-none cursor-default",
        // ::after hover bridge — invisible zone below each toast that keeps
        // the expanded state active while the mouse moves between toasts
        "after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-3.5",
        className
      )}
      style={(state: ToastPrimitive.Root.State) => {
        // ── Local CSS aliases for the stacking calc ──────────────────────────
        // These mirror the Base UI official demo CSS vars but are set via JS
        // since Tailwind can't express multi-step CSS custom property calcs.
        const PEEK = "0.75rem"   // how much each stacked toast peeks above the front one
        const GAP  = "0.75rem"   // gap between toasts when expanded

        const scale    = `max(0, 1 - (var(--toast-index, 0) * 0.1))`
        const shrink   = `(1 - ${scale})`
        const height   = `var(--toast-frontmost-height, var(--toast-height, 0px))`
        const swipeX   = `var(--toast-swipe-movement-x, 0px)`
        const swipeY   = `var(--toast-swipe-movement-y, 0px)`
        const offsetY  = `calc(var(--toast-offset-y, 0px) * -1 + (var(--toast-index, 0) * ${GAP} * -1) + ${swipeY})`

        // ── State-dependent transform ────────────────────────────────────────
        let transform: string

        if (state.transitionStatus === "starting") {
          // Enter: start position — slides up into view on the next frame
          transform = "translateY(150%)"
        } else if (state.transitionStatus === "ending") {
          // Exit: direction-aware or default slide-down
          switch (state.swipeDirection) {
            case "up":
              transform = `translateY(calc(${swipeY} - 150%))`
              break
            case "down":
              transform = `translateY(calc(${swipeY} + 150%))`
              break
            case "left":
              transform = `translateX(calc(${swipeX} - 150%)) translateY(${offsetY})`
              break
            case "right":
              transform = `translateX(calc(${swipeX} + 150%)) translateY(${offsetY})`
              break
            default:
              transform = "translateY(150%)"
          }
        } else if (state.expanded) {
          // Expanded (viewport hovered): fan out to natural heights
          transform = `translateX(${swipeX}) translateY(${offsetY})`
        } else {
          // Collapsed stacking: scale + peek offset
          transform = `translateX(${swipeX}) translateY(calc(${swipeY} - (var(--toast-index, 0) * ${PEEK}) - (${shrink} * ${height}))) scale(calc(${scale}))`
        }

        return {
          // Scoped CSS vars — inherited by ToastDescription and icon
          "--toast-description-color": tokens.description,
          "--toast-icon-color": tokens.icon,
          // Variant colors
          backgroundColor: tokens.bg,
          borderColor: tokens.border,
          color: tokens.title,
          // Stacking — can't be Tailwind utilities (CSS calc with injected vars)
          // In expanded state each toast shows its natural height; collapsed stacks use
          // the frontmost toast height so the stack appears uniform.
          height: state.expanded
            ? `var(--toast-height, auto)`
            : `var(--toast-frontmost-height, var(--toast-height, 0px))`,
          zIndex: `calc(1000 - var(--toast-index, 0))`,
          boxShadow: "var(--pcs-toast-shadow)",
          transform,
          opacity: state.transitionStatus === "ending" ? 0 : undefined,
          // Per-property transition — can't be expressed as a single Tailwind class
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s, height 0.15s",
          ...(typeof userStyle === "function"
            ? (userStyle as (s: ToastPrimitive.Root.State) => React.CSSProperties)(state)
            : (userStyle as React.CSSProperties)),
        } as React.CSSProperties
      }}
      {...props}
    />
  )
})
Toast.displayName = "Toast"

// ─── ToastContent ─────────────────────────────────────────────────────────────
// data-[behind]:opacity-0 — hides content of non-frontmost toasts in collapsed stack
// data-[expanded]:opacity-100 — reveals all content when viewport is hovered

const ToastContent = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Content>,
  ToastPrimitive.Content.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Content
    ref={ref}
    data-slot="toast-content"
    className={cn(
      "flex min-w-0 flex-1 flex-col gap-1",
      "overflow-hidden transition-opacity duration-[0.25s]",
      "data-[behind]:opacity-0",
      "data-[expanded]:opacity-100",
      className
    )}
    {...props}
  />
))
ToastContent.displayName = "ToastContent"

// ─── ToastTitle ───────────────────────────────────────────────────────────────

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  ToastPrimitive.Title.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    data-slot="toast-title"
    className={cn(
      "text-[length:var(--pcs-toast-title-font-size)] font-medium leading-snug",
      className
    )}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

// ─── ToastDescription ─────────────────────────────────────────────────────────

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  ToastPrimitive.Description.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    data-slot="toast-description"
    className={cn("text-sm opacity-90", className)}
    style={{ color: "var(--toast-description-color)" }}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

// ─── ToastClose ───────────────────────────────────────────────────────────────

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Close>,
  ToastPrimitive.Close.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    data-slot="toast-close"
    aria-label="Dismiss"
    className={cn(
      "ml-auto shrink-0 self-start rounded-sm opacity-60 transition-opacity",
      "hover:opacity-100",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      "focus-visible:outline-[var(--pcs-color-focus-ring)]",
      className
    )}
    {...props}
  >
    <XIcon className="size-4" aria-hidden />
  </ToastPrimitive.Close>
))
ToastClose.displayName = "ToastClose"

// ─── ToastAction ──────────────────────────────────────────────────────────────

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  ToastPrimitive.Action.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      "mt-2 inline-flex h-8 shrink-0 items-center rounded-md border px-3 text-sm font-medium",
      "transition-colors border-current/30 bg-transparent hover:bg-black/5",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      "focus-visible:outline-[var(--pcs-color-focus-ring)]",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = "ToastAction"

// ─── Variant icon map ─────────────────────────────────────────────────────────

const variantIconMap: Record<ToastVariant, React.ElementType> = {
  neutral: InfoIcon,
  success: CheckCircleIcon,
  error: AlertCircleIcon,
  warning: TriangleAlertIcon,
  info: InfoIcon,
}

// ─── Toaster ──────────────────────────────────────────────────────────────────
// Place <Toaster /> once inside <ToastProvider> — typically at the app root.
// Renders the viewport and all active toasts automatically.

const Toaster = () => {
  const { toasts } = useToast()

  return (
    <ToastViewport>
      {toasts.map((toast) => {
        const variant = typeToVariant(toast.type)
        const Icon = variantIconMap[variant]

        return (
          <Toast key={toast.id} toast={toast} variant={variant}>
            <Icon
              aria-hidden
              className="mt-0.5 size-4 shrink-0"
              style={{ color: "var(--toast-icon-color)" }}
            />
            <ToastContent>
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
              {toast.actionProps && <ToastAction {...toast.actionProps} />}
            </ToastContent>
            <ToastClose />
          </Toast>
        )
      })}
    </ToastViewport>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function typeToVariant(type: string | undefined): ToastVariant {
  switch (type) {
    case "success": return "success"
    case "error":   return "error"
    case "warning": return "warning"
    case "info":    return "info"
    default:        return "neutral"
  }
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Toaster,
}
