import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "../../lib/utils"

const Avatar = ({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex shrink-0 select-none",
        // Shape
        "rounded-[var(--pcs-avatar-border-radius-circle)]",
        // Default size (md)
        "size-[var(--pcs-size-avatar-md)]",
        // Size variants
        "data-[size=sm]:size-[var(--pcs-size-avatar-sm)]",
        "data-[size=lg]:size-[var(--pcs-size-avatar-lg)]",
        // Overlay border — subtle ring on top of image via mix-blend
        "after:absolute after:inset-0",
        "after:rounded-[var(--pcs-avatar-border-radius-circle)]",
        "after:border after:border-[var(--pcs-color-border-default)]",
        "after:mix-blend-darken dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

const AvatarImage = ({ className, ...props }: AvatarPrimitive.Image.Props) => {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full object-cover",
        "rounded-[var(--pcs-avatar-border-radius-circle)]",
        className
      )}
      {...props}
    />
  )
}

const AvatarFallback = ({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center",
        "rounded-[var(--pcs-avatar-border-radius-circle)]",
        "bg-[var(--pcs-avatar-bg-fallback)]",
        "font-[number:var(--pcs-avatar-initials-font-weight)]",
        "text-[color:var(--pcs-avatar-initials-color)]",
        // Default size (md) initials
        "text-[length:var(--pcs-avatar-initials-size-md)]",
        // Size variant overrides
        "group-data-[size=sm]/avatar:text-[length:var(--pcs-avatar-initials-size-sm)]",
        "group-data-[size=lg]/avatar:text-[length:var(--pcs-avatar-initials-size-lg)]",
        className
      )}
      {...props}
    />
  )
}

const AvatarBadge = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center",
        "rounded-[var(--pcs-avatar-status-border-radius)]",
        "bg-[var(--pcs-color-primary-emphasis)]",
        "text-[color:var(--pcs-color-primary-on-emphasis)]",
        "ring-[length:var(--pcs-avatar-status-border-width)] ring-[var(--pcs-avatar-status-border-color)]",
        "select-none bg-blend-color",
        // Sizes per avatar size — kept at shadcn defaults (slightly larger than status tokens)
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

const AvatarGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2",
        "*:data-[slot=avatar]:ring-[length:var(--pcs-avatar-border-width)]",
        "*:data-[slot=avatar]:ring-[var(--pcs-avatar-border-color)]",
        className
      )}
      {...props}
    />
  )
}

const AvatarGroupCount = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex shrink-0 items-center justify-center",
        "rounded-[var(--pcs-avatar-border-radius-circle)]",
        "bg-[var(--pcs-avatar-stack-count-bg)]",
        "type-label-sm",
        "text-[color:var(--pcs-avatar-stack-count-text)]",
        "ring-[length:var(--pcs-avatar-border-width)] ring-[var(--pcs-avatar-stack-count-border)]",
        // Default size (md)
        "size-[var(--pcs-size-avatar-md)]",
        // Size variants via group context
        "group-has-data-[size=sm]/avatar-group:size-[var(--pcs-size-avatar-sm)]",
        "group-has-data-[size=lg]/avatar-group:size-[var(--pcs-size-avatar-lg)]",
        "[&>svg]:size-4",
        "group-has-data-[size=lg]/avatar-group:[&>svg]:size-5",
        "group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
