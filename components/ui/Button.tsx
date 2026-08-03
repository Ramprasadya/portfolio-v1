import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-[#F5F5F5] shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] hover:-translate-y-[1px]",
        secondary:
          "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-md hover:-translate-y-[1px]",
        ghost: "hover:bg-white/10 text-white/70 hover:text-white backdrop-blur-sm",
        link: "text-white/70 underline-offset-4 hover:underline hover:text-white",
      },
      size: {
        default: "min-h-[44px] h-11 px-6",
        sm: "min-h-[44px] h-10 px-4 text-xs",
        lg: "min-h-[48px] h-12 px-8 text-base",
        icon: "min-h-[44px] h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
