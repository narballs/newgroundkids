import { cn } from "@/lib/utils";

type StackDirection = "vertical" | "horizontal";
type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const directionClasses: Record<StackDirection, string> = {
  vertical: "flex-col",
  horizontal: "flex-row",
};

const gapClasses: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
};

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export function Stack({
  direction = "vertical",
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  as: Component = "div",
  className,
  children,
  ...props
}: StackProps) {
  return (
    // @ts-expect-error - Dynamic component type
    <Component
      className={cn(
        "flex",
        directionClasses[direction],
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
