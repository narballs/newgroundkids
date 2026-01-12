import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background uppercase tracking-wide",
  {
    variants: {
      variant: {
        // Primary - Navy with hard shadow (main CTA)
        default:
          "bg-primary text-primary-foreground border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hard-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[var(--shadow-hard-xs)] active:translate-x-0 active:translate-y-0",

        // Secondary - Light background with hard border
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hard-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[var(--shadow-hard-xs)] active:translate-x-0 active:translate-y-0",

        // Accent - Amber with hard shadow (attention-grabbing CTAs)
        accent:
          "bg-accent text-foreground border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hard-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[var(--shadow-hard-xs)] active:translate-x-0 active:translate-y-0",

        // Outline - Transparent with hard border
        outline:
          "border-2 border-[var(--border-hard)] text-foreground bg-transparent shadow-[var(--shadow-hard)] hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-hard-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[var(--shadow-hard-xs)] active:translate-x-0 active:translate-y-0",

        // Ghost - No shadow, subtle hover
        ghost:
          "text-foreground hover:bg-muted border-2 border-transparent hover:border-[var(--border-hard)]",

        // Link - Text only with underline
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium normal-case tracking-normal",

        // Destructive - Red with hard shadow
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hard-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[var(--shadow-hard-xs)] active:translate-x-0 active:translate-y-0",

        // White - For dark backgrounds
        white:
          "bg-white text-primary border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hard-lg)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[var(--shadow-hard-xs)] active:translate-x-0 active:translate-y-0",

        // White outline - For dark backgrounds
        "white-outline":
          "border-2 border-white text-white bg-transparent shadow-[4px_4px_0px_0px_white] hover:bg-white hover:text-primary hover:shadow-[6px_6px_0px_0px_white] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_white] active:translate-x-0 active:translate-y-0",

        // Soft variants (for inputs, less prominent actions)
        "soft-primary":
          "bg-primary text-primary-foreground shadow-[var(--shadow-soft-md)] hover:shadow-[var(--shadow-soft-lg)] hover:translate-y-[-1px] active:shadow-[var(--shadow-soft-sm)] active:translate-y-0",

        "soft-secondary":
          "bg-secondary text-secondary-foreground border border-border shadow-[var(--shadow-soft-sm)] hover:shadow-[var(--shadow-soft-md)] hover:bg-muted",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-sm",
        default: "h-11 px-6 text-sm rounded-sm",
        lg: "h-13 px-8 text-base rounded",
        xl: "h-15 px-10 text-lg rounded",
        icon: "size-11 rounded-sm",
        "icon-sm": "size-9 rounded-sm",
        "icon-lg": "size-13 rounded",
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
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
              className="animate-spin -ml-1 h-4 w-4"
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
