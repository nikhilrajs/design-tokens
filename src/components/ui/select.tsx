import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "../../lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-[var(--pcs-menu-padding)]", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-[var(--pcs-select-trigger-icon-gap)] rounded-[var(--pcs-select-trigger-border-radius)] border-[length:var(--pcs-select-trigger-border-width)] border-[color:var(--pcs-select-trigger-border-color)] bg-[var(--pcs-select-trigger-bg)] [box-shadow:var(--pcs-select-trigger-shadow)] py-2 px-[var(--pcs-select-trigger-md-padding-x)] text-[length:var(--pcs-select-trigger-md-font-size)] text-[color:var(--pcs-select-trigger-text)] whitespace-nowrap transition-colors outline-none select-none hover:border-[color:var(--pcs-select-trigger-border-color-hover)] focus-visible:border-[color:var(--pcs-select-trigger-border-color-open)] focus-visible:ring-3 focus-visible:ring-[var(--pcs-color-focus-ring)]/50 disabled:pointer-events-none disabled:opacity-50 disabled:bg-[var(--pcs-select-trigger-bg-disabled)] disabled:border-[color:var(--pcs-select-trigger-border-color-disabled)] disabled:text-[color:var(--pcs-select-trigger-text-disabled)] disabled:[box-shadow:var(--pcs-select-trigger-shadow-disabled)] aria-invalid:border-[color:var(--pcs-select-trigger-border-color-error)] aria-invalid:[box-shadow:var(--pcs-select-trigger-shadow-error-focus)] data-placeholder:text-[color:var(--pcs-select-trigger-placeholder)] data-[size=default]:h-[var(--pcs-select-trigger-md-height)] data-[size=sm]:h-[var(--pcs-select-trigger-sm-height)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-[var(--pcs-select-trigger-icon-size)] text-[color:var(--pcs-select-trigger-icon-color)]" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-[var(--pcs-menu-z)]"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-[var(--pcs-menu-z)] max-h-(--available-height) w-(--anchor-width) min-w-[var(--pcs-menu-min-width)] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--pcs-menu-border-radius)] bg-[var(--pcs-menu-bg)] text-[color:var(--pcs-menu-item-text)] [box-shadow:var(--pcs-menu-shadow)] border-[length:var(--pcs-menu-border-width)] border-[color:var(--pcs-menu-border-color)] duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-[var(--pcs-menu-section-label-padding-x)] py-[var(--pcs-menu-section-label-padding-y)] text-[length:var(--pcs-menu-section-label-font-size)] font-[number:var(--pcs-menu-section-label-font-weight)] text-[color:var(--pcs-menu-section-label-color)]", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-[var(--pcs-menu-item-gap)] rounded-[var(--pcs-menu-item-border-radius)] py-[var(--pcs-menu-item-padding-y)] pr-8 pl-[var(--pcs-menu-item-padding-x)] text-[length:var(--pcs-menu-item-font-size)] outline-hidden select-none focus:bg-[var(--pcs-menu-item-bg-hover)] focus:text-[color:var(--pcs-menu-item-text-hover)] not-data-[variant=destructive]:focus:**:text-[color:var(--pcs-menu-item-text-hover)] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-[var(--pcs-menu-separator-margin-y)] h-[var(--pcs-menu-separator-width)] bg-[var(--pcs-menu-separator-color)]", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-[var(--pcs-menu-bg)] py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-[var(--pcs-menu-bg)] py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
