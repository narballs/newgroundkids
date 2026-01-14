import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const speechBubbleVariants = cva(
  "relative bg-white border border-border shadow-[var(--shadow-soft-md)]",
  {
    variants: {
      variant: {
        // Standard card style
        speech: "rounded-xl",
        // Rounded card style
        thought: "rounded-2xl",
        // Highlighted card
        shout: "rounded-xl bg-accent/5 border-accent/20",
        // Caption box (like label text)
        caption: "rounded-lg bg-accent/10 border-accent/20",
      },
      size: {
        sm: "p-4 text-sm",
        default: "p-5 text-base",
        lg: "p-6 text-lg",
      },
      pointer: {
        // Pointer removed - using clean card style
        bottom: "",
        "bottom-left": "",
        "bottom-right": "",
        left: "",
        right: "",
        none: "",
      },
    },
    defaultVariants: {
      variant: "speech",
      size: "default",
      pointer: "none",
    },
  }
);

export interface SpeechBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof speechBubbleVariants> {
  /** Content inside the bubble */
  children: React.ReactNode;
  /** Optional author/speaker name */
  author?: string;
}

const SpeechBubble = React.forwardRef<HTMLDivElement, SpeechBubbleProps>(
  ({ className, variant, size, pointer: _, author, children, ...props }, ref) => {
    void _; // Intentionally unused - kept for API compatibility
    // Clean, card-based testimonial/quote component
    return (
      <div className={cn("relative", className)}>
        <div
          ref={ref}
          className={cn(speechBubbleVariants({ variant, size, className: "" }))}
          {...props}
        >
          {children}
        </div>
        {author && <div className="text-muted-foreground mt-4 text-sm font-medium">— {author}</div>}
      </div>
    );
  }
);
SpeechBubble.displayName = "SpeechBubble";

// Card Panel Component
interface ComicPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show pattern overlay (disabled) */
  halftone?: boolean;
  /** Panel border thickness */
  borderWidth?: "default" | "thick" | "panel";
}

const ComicPanel = React.forwardRef<HTMLDivElement, ComicPanelProps>(
  ({ className, halftone: _1, borderWidth: _2, children, ...props }, ref) => {
    void _1;
    void _2; // Intentionally unused - kept for API compatibility
    return (
      <div
        ref={ref}
        className={cn(
          "border-border relative overflow-hidden rounded-xl border bg-white shadow-[var(--shadow-soft-md)]",
          className
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
ComicPanel.displayName = "ComicPanel";

// Label Box Component
interface CaptionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "accent";
}

const CaptionBox = React.forwardRef<HTMLDivElement, CaptionBoxProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-accent/10 text-accent-text border-accent/20",
      dark: "bg-primary text-primary-foreground border-primary",
      accent: "bg-accent text-white border-accent",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border px-3 py-1.5",
          "font-heading text-xs tracking-wide uppercase",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CaptionBox.displayName = "CaptionBox";

export { SpeechBubble, ComicPanel, CaptionBox, speechBubbleVariants };
