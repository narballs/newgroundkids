import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <Badge
          variant="accent"
          rounded="full"
          className="mb-4 uppercase tracking-wider"
        >
          {badge}
        </Badge>
      )}

      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground text-lg max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
