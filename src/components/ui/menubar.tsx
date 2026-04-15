"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"

import { cn } from "../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { CheckIcon } from "lucide-react"

const Menubar = ({ className, ...props }: MenubarPrimitive.Props) => {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "flex items-center rounded-lg",
        "h-[var(--pcs-menubar-height)] gap-[var(--pcs-menubar-gap)] p-[var(--pcs-menubar-padding-x)]",
        "bg-[var(--pcs-menubar-bg)] border-[length:var(--pcs-menubar-border-width)] border-[color:var(--pcs-menubar-border-color)]",
        className
      )}
      {...props}
    />
  )
}

const MenubarMenu = ({ ...props }: React.ComponentProps<typeof DropdownMenu>) => {
  return <DropdownMenu data-slot="menubar-menu" {...props} />
}

const MenubarGroup = ({
  ...props
}: React.ComponentProps<typeof DropdownMenuGroup>) => {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />
}

const MenubarPortal = ({
  ...props
}: React.ComponentProps<typeof DropdownMenuPortal>) => {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />
}

const MenubarTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuTrigger>) => {
  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      className={cn(
        "flex items-center outline-hidden select-none cursor-default transition-colors",
        "rounded-[var(--pcs-menubar-trigger-border-radius)] px-[var(--pcs-menubar-trigger-padding-x)] py-[var(--pcs-menubar-trigger-padding-y)]",
        "type-label-lg",
        "bg-[var(--pcs-menubar-trigger-bg)] text-[color:var(--pcs-menubar-trigger-text)]",
        "hover:bg-[var(--pcs-menubar-trigger-bg-hover)] hover:text-[color:var(--pcs-menubar-trigger-text-hover)]",
        "aria-expanded:bg-[var(--pcs-menubar-trigger-bg-open)] aria-expanded:text-[color:var(--pcs-menubar-trigger-text-open)]",
        "focus-visible:ring-[length:var(--pcs-menubar-trigger-focus-ring-width)] focus-visible:ring-[var(--pcs-menubar-trigger-focus-ring-color)]/50 focus-visible:ring-offset-[var(--pcs-menubar-trigger-focus-ring-offset)]",
        className
      )}
      {...props}
    />
  )
}

const MenubarContent = ({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) => {
  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={className}
      {...props}
    />
  )
}

const MenubarItem = ({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) => {
  return (
    <DropdownMenuItem
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn("group/menubar-item", className)}
      {...props}
    />
  )
}

const MenubarCheckboxItem = ({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) => {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-[var(--pcs-menu-item-gap)] rounded-[var(--pcs-menu-item-border-radius)] py-[var(--pcs-menu-item-padding-y)] pr-[var(--pcs-menu-item-padding-x)] pl-7 text-[length:var(--pcs-menu-item-font-size)] outline-hidden select-none focus:bg-[var(--pcs-menu-item-bg-hover)] focus:text-[color:var(--pcs-menu-item-text-hover)] focus:**:text-[color:var(--pcs-menu-item-text-hover)] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

const MenubarRadioGroup = ({
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup>) => {
  return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
}

const MenubarRadioItem = ({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) => {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-[var(--pcs-menu-item-gap)] rounded-[var(--pcs-menu-item-border-radius)] py-[var(--pcs-menu-item-padding-y)] pr-[var(--pcs-menu-item-padding-x)] pl-7 text-[length:var(--pcs-menu-item-font-size)] outline-hidden select-none focus:bg-[var(--pcs-menu-item-bg-hover)] focus:text-[color:var(--pcs-menu-item-text-hover)] focus:**:text-[color:var(--pcs-menu-item-text-hover)] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

const MenubarLabel = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
  inset?: boolean
}) => {
  return (
    <DropdownMenuLabel
      data-slot="menubar-label"
      data-inset={inset}
      className={cn("data-inset:pl-7", className)}
      {...props}
    />
  )
}

const MenubarSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) => {
  return (
    <DropdownMenuSeparator
      data-slot="menubar-separator"
      className={className}
      {...props}
    />
  )
}

const MenubarShortcut = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) => {
  return (
    <DropdownMenuShortcut
      data-slot="menubar-shortcut"
      className={cn("group-focus/menubar-item:text-[color:var(--pcs-menu-item-text-hover)]", className)}
      {...props}
    />
  )
}

const MenubarSub = ({
  ...props
}: React.ComponentProps<typeof DropdownMenuSub>) => {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />
}

const MenubarSubTrigger = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean
}) => {
  return (
    <DropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn("data-inset:pl-7", className)}
      {...props}
    />
  )
}

const MenubarSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) => {
  return (
    <DropdownMenuSubContent
      data-slot="menubar-sub-content"
      className={className}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
