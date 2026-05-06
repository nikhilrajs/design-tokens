import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const Tabs = ({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center p-[var(--pcs-tabs-list-padding)] text-[color:var(--pcs-tabs-list-text)] group-data-horizontal/tabs:h-[var(--pcs-tabs-list-height)] group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "rounded-[var(--pcs-tabs-list-border-radius)] bg-[var(--pcs-tabs-list-bg)]",
        line: "gap-1 rounded-none bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const TabsList = ({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

const TabsTrigger = ({ className, ...props }: TabsPrimitive.Tab.Props) => {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        // Base layout + shape
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5",
        "rounded-[var(--pcs-tabs-trigger-border-radius)] border border-transparent",
        "px-1.5 py-0.5 whitespace-nowrap transition-all outline-hidden",
        // Typography
        "type-label-lg",
        // Text states
        "text-[color:var(--pcs-tabs-trigger-text)]",
        "hover:text-[color:var(--pcs-tabs-trigger-text-hover)]",
        "data-active:text-[color:var(--pcs-tabs-trigger-text-active)]",
        // Vertical orientation
        "group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
        // Focus ring
        "focus-visible:border-[color:var(--pcs-color-focus-ring)]",
        "focus-visible:ring-[length:var(--pcs-focus-ring-width)] focus-visible:ring-[color:var(--pcs-color-focus-ring)]/50",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-disabled",
        "aria-disabled:pointer-events-none aria-disabled:opacity-disabled",
        // Default variant — active tab surface
        "group-data-[variant=default]/tabs-list:data-active:bg-[var(--pcs-tabs-trigger-active-bg)]",
        "group-data-[variant=default]/tabs-list:data-active:border-[color:var(--pcs-tabs-trigger-active-border-color)]",
        "group-data-[variant=default]/tabs-list:data-active:[box-shadow:var(--pcs-tabs-trigger-active-shadow)]",
        // Line variant — no bg, no shadow when active
        "group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "group-data-[variant=line]/tabs-list:data-active:shadow-none",
        // Line variant — ::after indicator
        "after:absolute after:bg-[var(--pcs-tabs-trigger-indicator-color)] after:opacity-0 after:transition-opacity",
        "group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-[var(--pcs-tabs-trigger-indicator-size)]",
        "group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-[var(--pcs-tabs-trigger-indicator-size)]",
        "group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        // SVG slots
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

const TabsContent = ({ className, ...props }: TabsPrimitive.Panel.Props) => {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
