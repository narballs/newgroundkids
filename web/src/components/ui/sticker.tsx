import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stickerVariants = cva(
  "inline-block font-medium transition-transform duration-100 cursor-default select-none",
  {
    variants: {
      variant: {
        // Default - White background with hard border
        default:
          "bg-white border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)]",

        // Accent - Amber background
        accent:
          "bg-accent border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] text-foreground",

        // Primary - Navy background
        primary:
          "bg-primary border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] text-primary-foreground",

        // Outline - Transparent with border
        outline:
          "bg-transparent border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)]",

        // Muted - Light gray
        muted:
          "bg-muted border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)]",

        // Success - Green
        success:
          "bg-[var(--success-500)] border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] text-white",

        // Warning - Amber/Yellow
        warning:
          "bg-[var(--warning-500)] border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] text-foreground",

        // Error - Red
        error:
          "bg-[var(--error-500)] border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] text-white",
      },
      rotation: {
        none: "",
        left: "-rotate-2",
        right: "rotate-2",
        "left-more": "-rotate-3",
        "right-more": "rotate-3",
      },
      size: {
        sm: "px-2 py-1 text-xs rounded-sm",
        default: "px-3 py-1.5 text-sm rounded-sm",
        lg: "px-4 py-2 text-base rounded",
        xl: "px-6 py-3 text-lg rounded",
      },
      hoverable: {
        true: "hover:rotate-0 hover:scale-105 cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      rotation: "left",
      size: "default",
      hoverable: true,
    },
  }
);

export interface StickerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stickerVariants> {
  as?: "div" | "span";
}

const Sticker = React.forwardRef<HTMLDivElement, StickerProps>(
  (
    {
      className,
      variant,
      rotation,
      size,
      hoverable,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          stickerVariants({ variant, rotation, size, hoverable, className })
        )}
        {...props}
      />
    );
  }
);
Sticker.displayName = "Sticker";

// Preset sticker styles for common use cases
const StickerNew = React.forwardRef<
  HTMLDivElement,
  Omit<StickerProps, "variant" | "children">
>(({ className, ...props }, ref) => (
  <Sticker
    ref={ref}
    variant="accent"
    rotation="right"
    className={cn("uppercase font-bold tracking-wide", className)}
    {...props}
  >
    New!
  </Sticker>
));
StickerNew.displayName = "StickerNew";

const StickerPopular = React.forwardRef<
  HTMLDivElement,
  Omit<StickerProps, "variant" | "children">
>(({ className, ...props }, ref) => (
  <Sticker
    ref={ref}
    variant="primary"
    rotation="left"
    className={cn("uppercase font-bold tracking-wide", className)}
    {...props}
  >
    Popular
  </Sticker>
));
StickerPopular.displayName = "StickerPopular";

const StickerSale = React.forwardRef<
  HTMLDivElement,
  Omit<StickerProps, "variant" | "children">
>(({ className, ...props }, ref) => (
  <Sticker
    ref={ref}
    variant="error"
    rotation="right-more"
    className={cn("uppercase font-bold tracking-wide", className)}
    {...props}
  >
    Sale!
  </Sticker>
));
StickerSale.displayName = "StickerSale";

export { Sticker, StickerNew, StickerPopular, StickerSale, stickerVariants };
