import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingSize = "sm" | "md" | "lg";

interface RatingProps {
  value: number;
  max?: number;
  size?: RatingSize;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  className?: string;
}

const sizeClasses: Record<RatingSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const textSizeClasses: Record<RatingSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Rating({
  value,
  max = 5,
  size = "md",
  showValue = false,
  showCount = false,
  count,
  className,
}: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizeClasses[size], "fill-accent text-accent")}
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={cn(sizeClasses[size], "text-muted")} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={cn(sizeClasses[size], "fill-accent text-accent")} />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeClasses[size], "text-muted")}
          />
        ))}
      </div>

      {(showValue || showCount) && (
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>
          {showValue && <span className="font-medium text-foreground">{value.toFixed(1)}</span>}
          {showValue && showCount && count && " · "}
          {showCount && count && `${count.toLocaleString()} reviews`}
        </span>
      )}
    </div>
  );
}
