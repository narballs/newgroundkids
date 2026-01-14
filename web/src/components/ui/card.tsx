import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("bg-card text-card-foreground rounded-xl transition-all", {
  variants: {
    variant: {
      // Default - Clean with soft shadow
      default: "border border-border shadow-[var(--shadow-soft-md)]",

      // Elevated - Larger soft shadow
      elevated: "border border-border shadow-[var(--shadow-soft-lg)]",

      // Interactive - Card with hover lift effect
      interactive:
        "border border-border shadow-[var(--shadow-soft-md)] hover:shadow-[var(--shadow-soft-xl)] hover:translate-y-[-4px] active:shadow-[var(--shadow-soft-sm)] active:translate-y-[-2px] cursor-pointer duration-200",

      // Featured - Card with accent top border
      featured:
        "border border-border shadow-[var(--shadow-soft-lg)] relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-accent",

      // Accent Shadow - Soft shadow with accent tint
      "accent-shadow": "border border-accent/20 shadow-[var(--shadow-hard-accent)]",

      // Ghost - Minimal, no border (for grouping)
      ghost: "bg-transparent border-0 shadow-none",

      // Muted - Subtle background
      muted: "bg-muted border border-transparent shadow-none rounded-xl",

      // Primary - Navy background
      primary: "bg-primary text-primary-foreground shadow-[var(--shadow-soft-lg)]",

      // Outline - Just border, no shadow
      outline: "border border-border shadow-none",

      // Soft - Traditional soft shadow (for inputs, forms)
      soft: "border border-border shadow-[var(--shadow-soft-md)]",

      // Muted background
      checkerboard: "bg-muted border border-border shadow-[var(--shadow-soft-sm)]",
    },
    padding: {
      none: "",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 pb-4", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-xl leading-tight font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center pt-4", className)} {...props} />
  );
}

function CardImage({
  className,
  aspectRatio = "video",
  ...props
}: React.ComponentProps<"div"> & {
  aspectRatio?: "video" | "square" | "wide";
}) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[2/1]",
  };

  return (
    <div
      data-slot="card-image"
      className={cn(
        "relative -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl",
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    />
  );
}

// Special card for featured presentation
function StickerCard({
  className,
  rotation: _,
  ...props
}: CardProps & { rotation?: "left" | "right" | "none" }) {
  void _; // Intentionally unused - kept for API compatibility
  return (
    <Card
      variant="default"
      className={cn("transition-all duration-200 hover:translate-y-[-4px]", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  StickerCard,
  cardVariants,
};
