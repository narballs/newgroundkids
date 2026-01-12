import { cn } from "@/lib/utils";

type AgeTagVariant = "default" | "minis" | "juniors" | "youth" | "teens";

interface AgeTagProps {
  minAge: number;
  maxAge: number;
  variant?: AgeTagVariant;
  className?: string;
}

const variantClasses: Record<AgeTagVariant, string> = {
  default: "bg-primary/10 text-primary border-primary/20",
  minis: "bg-pink-100 text-pink-700 border-pink-200",
  juniors: "bg-sky-100 text-sky-700 border-sky-200",
  youth: "bg-emerald-100 text-emerald-700 border-emerald-200",
  teens: "bg-violet-100 text-violet-700 border-violet-200",
};

// Auto-detect variant based on age range
function getVariantFromAge(minAge: number): AgeTagVariant {
  if (minAge <= 5) return "minis";
  if (minAge <= 7) return "juniors";
  if (minAge <= 12) return "youth";
  return "teens";
}

export function AgeTag({ minAge, maxAge, variant, className }: AgeTagProps) {
  const resolvedVariant = variant || getVariantFromAge(minAge);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[resolvedVariant],
        className
      )}
    >
      Ages {minAge}-{maxAge}
    </span>
  );
}
