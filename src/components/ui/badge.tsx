import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap font-semibold transition-colors [&>svg]:size-3 [&>svg]:pointer-events-none uppercase tracking-wide",
  {
    variants: {
      variant: {
        // Default - Primary color, clean
        default: "bg-primary text-primary-foreground",

        // Secondary - Subtle gray
        secondary: "bg-secondary text-secondary-foreground border border-border",

        // Outline - Border only
        outline: "border border-border bg-transparent",

        // Accent - Teal attention
        accent: "bg-accent text-white",

        // Success - Green
        success: "bg-[var(--success-500)] text-white",

        // Warning - Yellow/Orange
        warning: "bg-[var(--warning-500)] text-foreground",

        // Error - Red
        error: "bg-[var(--error-500)] text-white",

        // Info - Blue
        info: "bg-[var(--info-500)] text-white",

        // Minis Program - Pink (Ages 3-5)
        minis: "bg-pink-400 text-white",

        // Juniors Program - Sky (Ages 6-7)
        juniors: "bg-sky-400 text-white",

        // Youth Program - Emerald (Ages 8-12)
        youth: "bg-emerald-500 text-white",

        // Teens Program - Violet (Ages 13+)
        teens: "bg-violet-500 text-white",

        // New - Standout
        new: "bg-accent text-white",

        // Popular - Strong
        popular: "bg-primary text-primary-foreground",

        // Sold Out - Muted
        "sold-out": "bg-muted text-muted-foreground line-through",

        // Limited - Urgent
        limited: "bg-[var(--error-500)] text-white",

        // Soft variants (less prominent)
        "soft-default": "bg-primary/10 text-primary",
        "soft-success": "bg-[var(--success-100)] text-[var(--success-700)]",
        "soft-warning": "bg-[var(--warning-100)] text-[var(--warning-700)]",
        "soft-error": "bg-[var(--error-100)] text-[var(--error-700)]",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] rounded-md",
        default: "px-2.5 py-1 text-xs rounded-lg",
        lg: "px-3 py-1.5 text-sm rounded-lg",
      },
      rounded: {
        default: "",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, size, rounded, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
