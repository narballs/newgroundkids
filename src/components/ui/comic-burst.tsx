import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Callout/Badge component - Clean, modern replacement for comic bursts
const burstVariants = cva(
  "inline-flex items-center justify-center font-heading font-bold uppercase select-none transition-all hover:translate-y-[-2px] duration-200",
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-xs",
        default: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// Shape variants kept for API compatibility but now render as pills
const BURST_PATHS = {
  starburst: "pill",
  explosion: "pill",
  rounded: "pill",
  jagged: "pill",
};

type BurstShape = keyof typeof BURST_PATHS;

interface ComicBurstProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof burstVariants> {
  /** Fill color of the burst */
  fill?: string;
  /** Stroke/outline color */
  stroke?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Show offset shadow */
  shadow?: boolean;
  /** Shadow color */
  shadowColor?: string;
  /** Shadow offset in pixels */
  shadowOffset?: number;
  /** Rotation in degrees */
  rotation?: number;
  /** Shape variant */
  shape?: BurstShape;
  /** Text color override */
  textColor?: string;
  /** Animation on mount */
  animate?: boolean;
}

export const ComicBurst = React.forwardRef<HTMLDivElement, ComicBurstProps>(
  (
    {
      className,
      size,
      fill = "#14b8a6", // Teal (new accent)
      stroke: _1,
      strokeWidth: _2,
      shadow = true,
      shadowColor: _3,
      shadowOffset: _4,
      rotation: _5,
      shape: _6,
      textColor,
      animate = false,
      children,
      ...props
    },
    ref
  ) => {
    // Intentionally unused - kept for API compatibility
    void _1;
    void _2;
    void _3;
    void _4;
    void _5;
    void _6;
    // Determine text color based on fill brightness if not specified
    const computedTextColor =
      textColor ||
      ([
        "#FACC15",
        "#eab308",
        "#fbbf24",
        "#fef9c3",
        "white",
        "#ffffff",
        "#fff",
        "#f0fdfa",
        "#ccfbf1",
      ].includes(fill?.toLowerCase() || "")
        ? "#09090B" // Dark text on light backgrounds
        : "#ffffff"); // Light text on dark backgrounds

    // Map old fill colors to new teal-based palette
    const mappedFill =
      fill === "#FACC15" || fill === "#fbbf24" || fill === "#eab308"
        ? "#14b8a6" // Yellow -> Teal
        : fill === "#dc2626" || fill === "#ef4444" || fill === "#f87171"
          ? "#0d9488" // Red -> Dark Teal
          : fill === "#ea580c" || fill === "#f97316"
            ? "#14b8a6" // Orange -> Teal
            : fill;

    return (
      <div
        ref={ref}
        className={cn(
          burstVariants({ size, className }),
          "rounded-full",
          shadow && "shadow-[var(--shadow-hard-accent)]",
          animate && "animate-scale-in"
        )}
        style={{
          backgroundColor: mappedFill,
          color: computedTextColor,
        }}
        {...props}
      >
        <span className="text-center leading-none tracking-wide">{children}</span>
      </div>
    );
  }
);
ComicBurst.displayName = "ComicBurst";

// ============================================
// PRE-CONFIGURED CALLOUT VARIANTS
// ============================================

// 🆕 NEW! Badge - Teal
export const BurstNew = React.forwardRef<HTMLDivElement, Partial<ComicBurstProps>>(
  ({ className, ...props }, ref) => (
    <ComicBurst
      ref={ref}
      fill="#14b8a6"
      size="sm"
      textColor="white"
      animate
      className={className}
      {...props}
    >
      NEW!
    </ComicBurst>
  )
);
BurstNew.displayName = "BurstNew";

// 💥 Featured Badge
export const BurstPow = React.forwardRef<HTMLDivElement, Partial<ComicBurstProps>>(
  ({ className, ...props }, ref) => (
    <ComicBurst
      ref={ref}
      fill="#0d9488"
      size="lg"
      textColor="white"
      className={className}
      {...props}
    >
      FEATURED
    </ComicBurst>
  )
);
BurstPow.displayName = "BurstPow";

// 💢 Popular Badge
export const BurstBam = React.forwardRef<HTMLDivElement, Partial<ComicBurstProps>>(
  ({ className, ...props }, ref) => (
    <ComicBurst
      ref={ref}
      fill="#09090b"
      size="lg"
      textColor="white"
      className={className}
      {...props}
    >
      POPULAR
    </ComicBurst>
  )
);
BurstBam.displayName = "BurstBam";

// 🎉 Amazing Badge
export const BurstWow = React.forwardRef<HTMLDivElement, Partial<ComicBurstProps>>(
  ({ className, ...props }, ref) => (
    <ComicBurst
      ref={ref}
      fill="#14b8a6"
      size="default"
      textColor="white"
      className={className}
      {...props}
    >
      AMAZING!
    </ComicBurst>
  )
);
BurstWow.displayName = "BurstWow";

// 💰 SALE! Badge
export const BurstSale = React.forwardRef<HTMLDivElement, Partial<ComicBurstProps>>(
  ({ className, ...props }, ref) => (
    <ComicBurst
      ref={ref}
      fill="#0d9488"
      size="default"
      textColor="white"
      animate
      className={className}
      {...props}
    >
      SALE!
    </ComicBurst>
  )
);
BurstSale.displayName = "BurstSale";

// 🔥 HOT! Badge
export const BurstHot = React.forwardRef<HTMLDivElement, Partial<ComicBurstProps>>(
  ({ className, ...props }, ref) => (
    <ComicBurst
      ref={ref}
      fill="#14b8a6"
      size="sm"
      textColor="white"
      className={className}
      {...props}
    >
      HOT!
    </ComicBurst>
  )
);
BurstHot.displayName = "BurstHot";

// ✅ GO! Badge
export const BurstGo = React.forwardRef<HTMLDivElement, Partial<ComicBurstProps>>(
  ({ className, ...props }, ref) => (
    <ComicBurst
      ref={ref}
      fill="#22c55e"
      size="sm"
      textColor="white"
      className={className}
      {...props}
    >
      GO!
    </ComicBurst>
  )
);
BurstGo.displayName = "BurstGo";

// ⭐ Best Value Badge
export const BurstWin = React.forwardRef<HTMLDivElement, Partial<ComicBurstProps>>(
  ({ className, ...props }, ref) => (
    <ComicBurst
      ref={ref}
      fill="#0f766e"
      size="lg"
      textColor="white"
      className={className}
      {...props}
    >
      BEST VALUE
    </ComicBurst>
  )
);
BurstWin.displayName = "BurstWin";

export { burstVariants, BURST_PATHS };
export type { ComicBurstProps, BurstShape };
