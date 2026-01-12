import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "bg-card text-card-foreground rounded transition-all",
  {
    variants: {
      variant: {
        // Default - Hard border with shadow (Street style)
        default:
          "border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)]",

        // Elevated - Larger hard shadow
        elevated:
          "border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard-lg)]",

        // Interactive - Card with hover pop effect
        interactive:
          "border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hard-xl)] hover:translate-x-[-4px] hover:translate-y-[-4px] active:shadow-[var(--shadow-hard-xs)] active:translate-x-[-1px] active:translate-y-[-1px] cursor-pointer duration-100",

        // Featured - Card with accent top border
        featured:
          "border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard-lg)] relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-accent",

        // Accent Shadow - Hard shadow with accent color
        "accent-shadow":
          "border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard-accent)]",

        // Ghost - Minimal, no border (for grouping)
        ghost: "bg-transparent border-0 shadow-none",

        // Muted - Subtle background
        muted: "bg-muted border-2 border-transparent shadow-none",

        // Primary - Navy background
        primary:
          "bg-primary text-primary-foreground border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)]",

        // Outline - Just hard border, no shadow
        outline: "border-2 border-[var(--border-hard)] shadow-none",

        // Soft - Traditional soft shadow (for inputs, forms)
        soft: "border border-border shadow-[var(--shadow-soft-md)]",

        // Checkerboard - Street pattern background
        checkerboard:
          "bg-checkerboard border-2 border-[var(--border-hard)] shadow-[var(--shadow-hard)]",
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
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

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
      className={cn(
        "text-xl font-semibold leading-tight tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
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
        "relative overflow-hidden rounded-t -mx-6 -mt-6 mb-4 border-b-2 border-[var(--border-hard)]",
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    />
  );
}

// Special card for sticker-style presentation
function StickerCard({
  className,
  rotation = "left",
  ...props
}: CardProps & { rotation?: "left" | "right" | "none" }) {
  const rotationClass = {
    left: "-rotate-1",
    right: "rotate-1",
    none: "",
  };

  return (
    <Card
      variant="default"
      className={cn(
        rotationClass[rotation],
        "hover:rotate-0 transition-transform duration-100",
        className
      )}
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
