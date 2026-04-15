import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "../../lib/utils"

const HoverCard = ({ ...props }: PreviewCardPrimitive.Root.Props) => {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

const HoverCardTrigger = ({ ...props }: PreviewCardPrimitive.Trigger.Props) => {
  return (
    <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

const HoverCardContent = ({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) => {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-[var(--pcs-hover-card-z)]"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            // Sizing
            "w-64 min-w-[var(--pcs-hover-card-min-width)]",
            // Shape + surface — shared with Popover, reference floating base directly
            "rounded-[var(--pcs-floating-border-radius)]",
            "border-[length:var(--pcs-floating-border-width)] border-[color:var(--pcs-floating-border-color)]",
            "bg-[var(--pcs-floating-bg)]",
            "[box-shadow:var(--pcs-hover-card-shadow)]",
            // Spacing — shared with Popover
            "p-[var(--pcs-space-inset-md)]",
            // Typography base
            "text-[length:var(--pcs-text-label-lg-size)]",
            "text-[color:var(--pcs-color-text-default)]",
            // Animation
            "origin-(--transform-origin) outline-hidden duration-100",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=inline-end]:slide-in-from-left-2",
            "data-[side=inline-start]:slide-in-from-right-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
