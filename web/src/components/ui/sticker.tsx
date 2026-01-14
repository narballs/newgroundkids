import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stickerVariants = cva(
  "inline-block font-medium transition-all duration-200 cursor-default select-none",
  {
    variants: {
      variant: {
        // Default - White background with soft shadow
        default: "bg-white border border-border shadow-[var(--shadow-soft-sm)]",

        // Accent - Teal background
        accent: "bg-accent shadow-[var(--shadow-hard-accent)] text-white",

        // Primary - Navy background
        primary: "bg-primary shadow-[var(--shadow-soft-md)] text-primary-foreground",

        // Outline - Transparent with border
        outline: "bg-transparent border border-border",

        // Muted - Light gray
        muted: "bg-muted border border-border",

        // Success - Green
        success: "bg-[var(--success-500)] shadow-[var(--shadow-soft-sm)] text-white",

        // Warning - Amber/Yellow
        warning: "bg-[var(--warning-500)] shadow-[var(--shadow-soft-sm)] text-foreground",

        // Error - Red
        error: "bg-[var(--error-500)] shadow-[var(--shadow-soft-sm)] text-white",
      },
      rotation: {
        none: "",
        left: "",
        right: "",
        "left-more": "",
        "right-more": "",
      },
      size: {
        sm: "px-2 py-1 text-xs rounded-md",
        default: "px-3 py-1.5 text-sm rounded-lg",
        lg: "px-4 py-2 text-base rounded-lg",
        xl: "px-6 py-3 text-lg rounded-xl",
      },
      hoverable: {
        true: "hover:translate-y-[-2px] hover:shadow-[var(--shadow-soft-md)] cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      rotation: "none",
      size: "default",
      hoverable: true,
    },
  }
);

export interface StickerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stickerVariants> {
  as?: "div" | "span";
}

const Sticker = React.forwardRef<HTMLDivElement, StickerProps>(
  ({ className, variant, rotation, size, hoverable, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(stickerVariants({ variant, rotation, size, hoverable, className }))}
        {...props}
      />
    );
  }
);
Sticker.displayName = "Sticker";

// Preset sticker styles for common use cases
const StickerNew = React.forwardRef<HTMLDivElement, Omit<StickerProps, "variant" | "children">>(
  ({ className, ...props }, ref) => (
    <Sticker
      ref={ref}
      variant="accent"
      rotation="right"
      className={cn("font-bold tracking-wide uppercase", className)}
      {...props}
    >
      New!
    </Sticker>
  )
);
StickerNew.displayName = "StickerNew";

const StickerPopular = React.forwardRef<HTMLDivElement, Omit<StickerProps, "variant" | "children">>(
  ({ className, ...props }, ref) => (
    <Sticker
      ref={ref}
      variant="primary"
      rotation="left"
      className={cn("font-bold tracking-wide uppercase", className)}
      {...props}
    >
      Popular
    </Sticker>
  )
);
StickerPopular.displayName = "StickerPopular";

const StickerSale = React.forwardRef<HTMLDivElement, Omit<StickerProps, "variant" | "children">>(
  ({ className, ...props }, ref) => (
    <Sticker
      ref={ref}
      variant="error"
      rotation="right-more"
      className={cn("font-bold tracking-wide uppercase", className)}
      {...props}
    >
      Sale!
    </Sticker>
  )
);
StickerSale.displayName = "StickerSale";

export { Sticker, StickerNew, StickerPopular, StickerSale, stickerVariants };
