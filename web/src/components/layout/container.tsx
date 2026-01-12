import { cn } from "@/lib/utils";

type ContainerSize = "xs" | "sm" | "tight" | "wide" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  as?: keyof JSX.IntrinsicElements;
}

const sizeClasses: Record<ContainerSize, string> = {
  xs: "container-xs",
  sm: "container-sm",
  tight: "container-tight",
  wide: "container-wide",
  full: "container-full",
};

export function Container({
  size = "wide",
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    // @ts-expect-error - Dynamic component type
    <Component className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </Component>
  );
}
