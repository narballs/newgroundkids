import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background uppercase tracking-wide",
  {
    variants: {
      variant: {
        // Primary - Navy with soft shadow (main CTA)
        default:
          "bg-primary text-primary-foreground shadow-[var(--shadow-soft-md)] hover:shadow-[var(--shadow-soft-lg)] hover:translate-y-[-2px] active:shadow-[var(--shadow-soft-sm)] active:translate-y-0",

        // Secondary - Light background
        secondary:
          "bg-secondary text-secondary-foreground border border-border shadow-[var(--shadow-soft-sm)] hover:shadow-[var(--shadow-soft-md)] hover:translate-y-[-2px] active:translate-y-0",

        // Accent - Teal with soft shadow (attention-grabbing CTAs)
        accent:
          "bg-accent text-white shadow-[var(--shadow-hard-accent)] hover:shadow-[var(--shadow-hard-accent-lg)] hover:translate-y-[-2px] active:shadow-[var(--shadow-soft-sm)] active:translate-y-0",

        // Outline - Clean border
        outline:
          "border border-border text-foreground bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary hover:translate-y-[-2px] active:translate-y-0",

        // Ghost - No shadow, subtle hover
        ghost: "text-foreground hover:bg-muted",

        // Link - Text only with underline
        link: "text-accent underline-offset-4 hover:underline p-0 h-auto font-medium normal-case tracking-normal",

        // Destructive - Warning style
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-soft-md)] hover:shadow-[var(--shadow-soft-lg)] hover:translate-y-[-2px] active:shadow-[var(--shadow-soft-sm)] active:translate-y-0",

        // White - For dark backgrounds
        white:
          "bg-white text-primary shadow-[var(--shadow-soft-md)] hover:shadow-[var(--shadow-soft-lg)] hover:translate-y-[-2px] active:shadow-[var(--shadow-soft-sm)] active:translate-y-0",

        // White outline - For dark backgrounds
        "white-outline":
          "border border-white/50 text-white bg-transparent hover:bg-white hover:text-primary hover:translate-y-[-2px] active:translate-y-0",

        // Soft variants (for inputs, less prominent actions)
        "soft-primary":
          "bg-primary text-primary-foreground shadow-[var(--shadow-soft-md)] hover:shadow-[var(--shadow-soft-lg)] hover:translate-y-[-2px] active:shadow-[var(--shadow-soft-sm)] active:translate-y-0",

        "soft-secondary":
          "bg-secondary text-secondary-foreground border border-border shadow-[var(--shadow-soft-sm)] hover:shadow-[var(--shadow-soft-md)] hover:bg-muted",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-md",
        default: "h-11 px-6 text-sm rounded-lg",
        lg: "h-13 px-8 text-base rounded-lg",
        xl: "h-15 px-10 text-lg rounded-xl",
        icon: "size-11 rounded-lg",
        "icon-sm": "size-9 rounded-md",
        "icon-lg": "size-13 rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="-ml-1 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
