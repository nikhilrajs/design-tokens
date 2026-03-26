import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "../../lib/utils"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-[var(--pcs-tooltip-z)]"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            // Layout
            "inline-flex w-fit items-center gap-1.5",
            // Sizing
            "max-w-[var(--pcs-tooltip-max-width)]",
            // Shape + surface
            "rounded-[var(--pcs-tooltip-border-radius)]",
            "bg-[var(--pcs-tooltip-bg)]",
            "[box-shadow:var(--pcs-tooltip-shadow)]",
            // Spacing
            "px-[var(--pcs-tooltip-padding-x)] py-[var(--pcs-tooltip-padding-y)]",
            // Typography
            "font-[family-name:var(--pcs-tooltip-font-family)]",
            "text-[length:var(--pcs-tooltip-font-size)]",
            "font-[number:var(--pcs-tooltip-font-weight)]",
            "leading-[var(--pcs-tooltip-line-height)]",
            "text-[color:var(--pcs-tooltip-color)]",
            // Animation origin
            "origin-(--transform-origin)",
            // Kbd slot adjustments
            "has-data-[slot=kbd]:pr-1.5",
            "**:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm",
            // Enter animations per side
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=inline-end]:slide-in-from-left-2",
            "data-[side=inline-start]:slide-in-from-right-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2",
            // State-driven animations — Base UI sets data-open / data-closed
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          {/* Arrow — Base UI positions this automatically via inline styles;
              only visual styles belong here */}
          <TooltipPrimitive.Arrow
            className="size-[var(--pcs-tooltip-arrow-size)] rotate-45 rounded-[2px] bg-[var(--pcs-tooltip-arrow-color)]"
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
