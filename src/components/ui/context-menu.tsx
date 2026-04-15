import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"

import { cn } from "../../lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

const ContextMenu = ({ ...props }: ContextMenuPrimitive.Root.Props) => {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

const ContextMenuPortal = ({ ...props }: ContextMenuPrimitive.Portal.Props) => {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

const ContextMenuTrigger = ({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props) => {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  )
}

const ContextMenuContent = ({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) => {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-[var(--pcs-menu-z)] outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(
            "z-[var(--pcs-menu-z)] max-h-(--available-height) min-w-[var(--pcs-menu-min-width)] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--pcs-menu-border-radius)] bg-[var(--pcs-menu-bg)] p-[var(--pcs-menu-padding)] text-[color:var(--pcs-menu-item-text)] [box-shadow:var(--pcs-menu-shadow)] border-[length:var(--pcs-menu-border-width)] border-[color:var(--pcs-menu-border-color)] duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

const ContextMenuGroup = ({ ...props }: ContextMenuPrimitive.Group.Props) => {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

const ContextMenuLabel = ({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) => {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-[var(--pcs-menu-section-label-padding-x)] py-[var(--pcs-menu-section-label-padding-y)] type-label-sm text-[color:var(--pcs-menu-section-label-color)] data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

const ContextMenuItem = ({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) => {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/context-menu-item relative flex cursor-default items-center gap-[var(--pcs-menu-item-gap)] rounded-[var(--pcs-menu-item-border-radius)] px-[var(--pcs-menu-item-padding-x)] py-[var(--pcs-menu-item-padding-y)] text-[length:var(--pcs-menu-item-font-size)] outline-hidden select-none focus:bg-[var(--pcs-menu-item-bg-hover)] focus:text-[color:var(--pcs-menu-item-text-hover)] not-data-[variant=destructive]:focus:**:text-[color:var(--pcs-menu-item-text-hover)] data-inset:pl-7 data-[variant=destructive]:text-[color:var(--pcs-menu-item-text-destructive)] data-[variant=destructive]:focus:bg-[var(--pcs-menu-item-bg-destructive-hover)] data-[variant=destructive]:focus:text-[color:var(--pcs-menu-item-text-destructive-hover)] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-[color:var(--pcs-menu-item-icon-color-destructive)]",
        className
      )}
      {...props}
    />
  )
}

const ContextMenuSub = ({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) => {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  )
}

const ContextMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) => {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-[var(--pcs-menu-item-gap)] rounded-[var(--pcs-menu-item-border-radius)] px-[var(--pcs-menu-item-padding-x)] py-[var(--pcs-menu-item-padding-y)] text-[length:var(--pcs-menu-item-font-size)] outline-hidden select-none focus:bg-[var(--pcs-menu-item-bg-hover)] focus:text-[color:var(--pcs-menu-item-text-hover)] not-data-[variant=destructive]:focus:**:text-[color:var(--pcs-menu-item-text-hover)] data-inset:pl-7 data-popup-open:bg-[var(--pcs-menu-item-bg-hover)] data-popup-open:text-[color:var(--pcs-menu-item-text-hover)] data-open:bg-[var(--pcs-menu-item-bg-hover)] data-open:text-[color:var(--pcs-menu-item-text-hover)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

const ContextMenuSubContent = ({
  ...props
}: React.ComponentProps<typeof ContextMenuContent>) => {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className="w-auto min-w-[96px]"
      align="start"
      alignOffset={-3}
      side="right"
      sideOffset={0}
      {...props}
    />
  )
}

const ContextMenuCheckboxItem = ({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) => {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-[var(--pcs-menu-item-gap)] rounded-[var(--pcs-menu-item-border-radius)] py-[var(--pcs-menu-item-padding-y)] pr-8 pl-[var(--pcs-menu-item-padding-x)] text-[length:var(--pcs-menu-item-font-size)] outline-hidden select-none focus:bg-[var(--pcs-menu-item-bg-hover)] focus:text-[color:var(--pcs-menu-item-text-hover)] focus:**:text-[color:var(--pcs-menu-item-text-hover)] data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="context-menu-checkbox-item-indicator"
      >
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

const ContextMenuRadioGroup = ({
  ...props
}: ContextMenuPrimitive.RadioGroup.Props) => {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

const ContextMenuRadioItem = ({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) => {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-[var(--pcs-menu-item-gap)] rounded-[var(--pcs-menu-item-border-radius)] py-[var(--pcs-menu-item-padding-y)] pr-8 pl-[var(--pcs-menu-item-padding-x)] text-[length:var(--pcs-menu-item-font-size)] outline-hidden select-none focus:bg-[var(--pcs-menu-item-bg-hover)] focus:text-[color:var(--pcs-menu-item-text-hover)] focus:**:text-[color:var(--pcs-menu-item-text-hover)] data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="context-menu-radio-item-indicator"
      >
        <ContextMenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

const ContextMenuSeparator = ({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) => {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn(
        "-mx-1 my-[var(--pcs-menu-separator-margin-y)] h-[var(--pcs-menu-separator-width)] bg-[var(--pcs-menu-separator-color)]",
        className
      )}
      {...props}
    />
  )
}

const ContextMenuShortcut = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-[color:var(--pcs-menu-item-shortcut-color)] group-focus/context-menu-item:text-[color:var(--pcs-menu-item-text-hover)]",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
