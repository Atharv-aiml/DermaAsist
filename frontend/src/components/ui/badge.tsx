import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline: "text-slate-950",
        success: "border-transparent bg-success-100 text-success-800",
        warning: "border-transparent bg-warning-100 text-warning-800",
        danger: "border-transparent bg-danger-100 text-danger-800",
        ai: "border-transparent bg-accent-100 text-accent-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
