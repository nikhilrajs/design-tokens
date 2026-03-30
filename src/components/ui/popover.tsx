import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "../../lib/utils"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-[var(--pcs-popover-z)]"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            // Layout
            "flex flex-col gap-[var(--pcs-popover-header-gap)]",
            // Sizing
            "w-72",
            // Shape + surface
            "rounded-[var(--pcs-popover-border-radius)]",
            "border-[length:var(--pcs-popover-border-width)] border-[color:var(--pcs-popover-border-color)]",
            "bg-[var(--pcs-popover-bg)]",
            "[box-shadow:var(--pcs-popover-shadow)]",
            // Spacing
            "p-[var(--pcs-popover-padding)]",
            // Typography
            "text-[length:var(--pcs-popover-body-font-size)]",
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
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-[var(--pcs-popover-header-gap)]", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        "text-[length:var(--pcs-popover-title-font-size)] font-[number:var(--pcs-popover-title-font-weight)] text-[color:var(--pcs-popover-title-color)]",
        className
      )}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-[color:var(--pcs-popover-body-color)]", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
