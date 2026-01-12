import { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface IconProps extends Omit<LucideProps, "size"> {
  icon: LucideIcon;
  size?: IconSize;
}

const sizeClasses: Record<IconSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "2xl": "h-10 w-10",
};

export function Icon({ icon: IconComponent, size = "md", className, ...props }: IconProps) {
  return <IconComponent className={cn(sizeClasses[size], className)} {...props} />;
}
