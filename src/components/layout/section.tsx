import { cn } from "@/lib/utils";

type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";
type SectionBackground = "default" | "muted" | "primary" | "accent" | "gradient";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  background?: SectionBackground;
  pattern?: "dots" | "grid" | "diagonal" | "none";
  container?: "xs" | "sm" | "tight" | "wide" | "full" | "none";
  as?: "section" | "div" | "article" | "aside";
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: "",
  sm: "section-sm",
  md: "section-md",
  lg: "section-lg",
  xl: "section-xl",
};

const backgroundClasses: Record<SectionBackground, string> = {
  default: "bg-background",
  muted: "bg-muted",
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  gradient: "bg-gradient-ngk text-primary-foreground",
};

const patternClasses: Record<string, string> = {
  dots: "pattern-dots",
  grid: "pattern-grid",
  diagonal: "pattern-diagonal",
  none: "",
};

const containerClasses: Record<string, string> = {
  xs: "container-xs",
  sm: "container-sm",
  tight: "container-tight",
  wide: "container-wide",
  full: "container-full",
  none: "",
};

export function Section({
  spacing = "md",
  background = "default",
  pattern = "none",
  container = "wide",
  as: Component = "section",
  className,
  children,
  ...props
}: SectionProps) {
  const hasContainer = container !== "none";

  return (
    <Component
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        patternClasses[pattern],
        "relative",
        className
      )}
      {...props}
    >
      {hasContainer ? (
        <div className={containerClasses[container]}>{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}
