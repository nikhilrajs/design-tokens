import * as React from "react"

import { cn } from "../../lib/utils"
import { ChevronDownIcon } from "lucide-react"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          // Layout
          "w-full min-w-0",
          // Shape + border — mirrors Input
          "appearance-none",
          "rounded-[var(--pcs-input-border-radius)]",
          "border-[length:var(--pcs-input-border-width)] border-[color:var(--pcs-input-border-color)]",
          // Background + text
          "bg-[var(--pcs-input-bg)]",
          "text-[length:var(--pcs-input-font-size)] text-[color:var(--pcs-input-text)]",
          "placeholder:text-[color:var(--pcs-input-placeholder)]",
          "transition-colors outline-none",
          // Right padding fixed to accommodate the absolute-positioned chevron (icon 16px at right-2.5)
          "pr-8",
          // Focus — mirrors Input
          "focus-visible:border-[color:var(--pcs-input-border-color-focus)]",
          "focus-visible:ring-[length:var(--pcs-input-focus-ring-width)] focus-visible:ring-[var(--pcs-input-focus-ring-color)]/50",
          // Disabled — opacity is applied on the wrapper via has-[select:disabled]
          "disabled:pointer-events-none",
          // Error — mirrors Input
          "aria-invalid:border-[color:var(--pcs-input-border-color-error)]",
          "aria-invalid:ring-3 aria-invalid:ring-[var(--pcs-input-border-color-error)]/50",
          // Size: default (md)
          "h-[var(--pcs-input-size-md-height)] py-[var(--pcs-input-size-md-padding-y)] pl-[var(--pcs-input-size-md-padding-x)]",
          // Size: sm
          "data-[size=sm]:h-[var(--pcs-input-size-sm-height)] data-[size=sm]:py-[var(--pcs-input-size-sm-padding-y)] data-[size=sm]:pl-[var(--pcs-input-size-sm-padding-x)]",
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 select-none size-[var(--pcs-native-select-icon-size)] text-[color:var(--pcs-native-select-icon-color)]"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
