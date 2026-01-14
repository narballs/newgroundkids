import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Speed lines SVG background
const SpeedLines = ({ className }: { className?: string }) => (
  <svg
    className={cn("absolute inset-0 -z-10 h-full w-full opacity-20", className)}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <path
      d="M50 50 L0 0 M50 50 L100 0 M50 50 L0 100 M50 50 L100 100 M50 50 L50 0 M50 50 L0 50 M50 50 L100 50 M50 50 L50 100"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const heroCharacterVariants = cva("relative group transition-all duration-300", {
  variants: {
    size: {
      sm: "w-32 h-32",
      md: "w-48 h-48",
      lg: "w-64 h-64",
      xl: "w-80 h-80",
      full: "w-full h-full",
    },
    variant: {
      default: "",
      comic: "hero-cutout",
      print: "photo-comic-print",
    },
    effect: {
      none: "",
      speed: "overflow-visible",
      glow: "",
      float: "animate-float",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "comic",
    effect: "speed",
  },
});

export interface HeroCharacterProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof heroCharacterVariants> {
  src: string;
  alt: string;
  side?: "left" | "right" | "center";
}

export function HeroCharacter({
  src,
  alt,
  className,
  size,
  variant,
  effect,
  side = "left",
  ...props
}: HeroCharacterProps) {
  return (
    <div className={cn(heroCharacterVariants({ size, variant, effect, className }))} {...props}>
      {/* Background Effects */}
      {effect === "speed" && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2">
          <SpeedLines className="text-accent animate-pulse-soft" />
          <div className="bg-accent/5 absolute inset-0 rounded-full blur-2xl" />
        </div>
      )}

      {effect === "glow" && (
        <div className="bg-accent/20 group-hover:bg-accent/40 absolute inset-4 -z-10 rounded-full blur-xl transition-colors" />
      )}

      {/* The Character Image */}
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-300",
          side === "right" ? "group-hover:rotate-2" : "group-hover:-rotate-2",
          side === "center" ? "group-hover:scale-105" : "",
          variant === "comic" && "drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] filter"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "h-full w-full object-contain",
            variant === "print" && "mix-blend-multiply brightness-110 contrast-125"
            // Add a subtle border to the image itself if needed
            // "border-2 border-transparent"
          )}
        />

        {/* Halftone overlay for 'print' variant */}
        {variant === "print" && (
          <div className="overlay-halftone pointer-events-none absolute inset-0 opacity-40" />
        )}
      </div>
    </div>
  );
}
