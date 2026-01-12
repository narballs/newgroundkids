import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap font-semibold transition-colors [&>svg]:size-3 [&>svg]:pointer-events-none uppercase tracking-wide",
  {
    variants: {
      variant: {
        // Default - Primary color with hard border (Street style)
        default:
          "bg-primary text-primary-foreground border-2 border-[var(--border-hard)]",

        // Secondary - Subtle gray with border
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-[var(--border-hard)]",

        // Outline - Border only
        outline: "border-2 border-[var(--border-hard)] bg-transparent",

        // Accent - Amber attention
        accent:
          "bg-accent text-foreground border-2 border-[var(--border-hard)]",

        // Success - Green
        success:
          "bg-[var(--success-500)] text-white border-2 border-[var(--border-hard)]",

        // Warning - Yellow/Orange
        warning:
          "bg-[var(--warning-500)] text-foreground border-2 border-[var(--border-hard)]",

        // Error - Red
        error:
          "bg-[var(--error-500)] text-white border-2 border-[var(--border-hard)]",

        // Info - Blue
        info: "bg-[var(--info-500)] text-white border-2 border-[var(--border-hard)]",

        // Minis Program - Pink (Ages 3-5)
        minis:
          "bg-pink-400 text-white border-2 border-[var(--border-hard)]",

        // Juniors Program - Sky (Ages 6-7)
        juniors:
          "bg-sky-400 text-white border-2 border-[var(--border-hard)]",

        // Youth Program - Emerald (Ages 8-12)
        youth:
          "bg-emerald-500 text-white border-2 border-[var(--border-hard)]",

        // Teens Program - Violet (Ages 13+)
        teens:
          "bg-violet-500 text-white border-2 border-[var(--border-hard)]",

        // New - Standout
        new: "bg-accent text-foreground border-2 border-[var(--border-hard)] animate-pulse",

        // Popular - Strong
        popular:
          "bg-primary text-primary-foreground border-2 border-[var(--border-hard)]",

        // Sold Out - Muted
        "sold-out":
          "bg-muted text-muted-foreground border-2 border-muted-foreground line-through",

        // Limited - Urgent
        limited:
          "bg-[var(--error-500)] text-white border-2 border-[var(--border-hard)]",

        // Soft variants (less prominent)
        "soft-default": "bg-primary/10 text-primary border border-primary/20",
        "soft-success":
          "bg-[var(--success-100)] text-[var(--success-700)] border border-[var(--success-500)]/20",
        "soft-warning":
          "bg-[var(--warning-100)] text-[var(--warning-700)] border border-[var(--warning-500)]/20",
        "soft-error":
          "bg-[var(--error-100)] text-[var(--error-700)] border border-[var(--error-500)]/20",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] rounded-sm",
        default: "px-2.5 py-1 text-xs rounded-sm",
        lg: "px-3 py-1.5 text-sm rounded-sm",
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
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  ...props
}: BadgeProps) {
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
