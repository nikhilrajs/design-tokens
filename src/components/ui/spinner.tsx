import { cn } from "../../lib/utils"

type SpinnerSize    = 'sm' | 'md' | 'lg' | 'xl'
type SpinnerVariant = 'inherit' | 'primary' | 'muted' | 'on-emphasis'

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?:    SpinnerSize
  variant?: SpinnerVariant
}

/* Circumference of the arc circle at r=10: 2π×10 ≈ 62.83
   Showing ~75% as the spinning arc (47.12) with a ~25% gap (15.71). */
const ARC_DASHARRAY = '47.12 15.71'

const Spinner = ({
  size    = 'md',
  variant = 'inherit',
  className,
  style,
  ...props
}: SpinnerProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn('animate-spin', className)}
      style={{
        width:                  `var(--pcs-spinner-size-${size})`,
        height:                 `var(--pcs-spinner-size-${size})`,
        animationDuration:      'var(--pcs-spinner-animation-duration)',
        animationTimingFunction:'var(--pcs-spinner-animation-easing)',
        flexShrink:             0,
        ...style,
      }}
      {...props}
    >
      {/* Track — full circle, faint background */}
      <circle
        cx="12"
        cy="12"
        r="10"
        style={{
          stroke:      `var(--pcs-spinner-track-bg-${variant})`,
          strokeWidth: `var(--pcs-spinner-track-width-${size})`,
        }}
      />
      {/* Arc — the visible spinning portion */}
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeLinecap="round"
        strokeDasharray={ARC_DASHARRAY}
        style={{
          stroke:      `var(--pcs-spinner-color-${variant})`,
          strokeWidth: `var(--pcs-spinner-track-width-${size})`,
        }}
      />
    </svg>
  )
}

export { Spinner }
export type { SpinnerSize, SpinnerVariant }
