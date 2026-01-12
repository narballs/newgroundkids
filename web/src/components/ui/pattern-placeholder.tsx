"use client";

import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface PatternPlaceholderProps {
  className?: string;
  label?: string;
  pattern?: "checkerboard" | "stripes" | "dots" | "grid";
  showIcon?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
}

export function PatternPlaceholder({
  className,
  label,
  pattern = "checkerboard",
  showIcon = true,
  aspectRatio = "video",
}: PatternPlaceholderProps) {
  const patternClasses = {
    checkerboard: "bg-checkerboard",
    stripes: "bg-stripes",
    dots: "pattern-dots",
    grid: "pattern-grid",
  };

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        "border-2 border-dashed border-border",
        "rounded-lg",
        patternClasses[pattern],
        aspectClasses[aspectRatio],
        className
      )}
    >
      {showIcon && (
        <ImageOff className="h-8 w-8 text-muted-foreground/50" />
      )}
      {label && (
        <span className="font-heading text-sm text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}
