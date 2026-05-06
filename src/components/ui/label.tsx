import * as React from "react"

import { cn } from "../../lib/utils"

const Label = ({ className, ...props }: React.ComponentProps<"label">) => {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 select-none",
        "type-label-lg",
        "leading-none",
        "text-[color:var(--pcs-field-label-color)]",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-disabled",
        "peer-disabled:opacity-disabled",
        className
      )}
      {...props}
    />
  )
}

export { Label }
