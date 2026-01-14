"use client";

import { cn } from "@/lib/utils";

interface Stat {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface StatsBarProps {
  stats: Stat[];
  variant?: "default" | "primary" | "accent" | "cards";
  className?: string;
}

export function StatsBar({
  stats,
  variant = "default",
  className,
}: StatsBarProps) {
  const containerClasses = {
    default: "bg-muted",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
    cards: "bg-transparent",
  };

  const statClasses = {
    default: "text-foreground",
    primary: "text-primary-foreground",
    accent: "text-accent-foreground",
    cards: "bg-card shadow-lg rounded-xl p-6 text-card-foreground",
  };

  const labelClasses = {
    default: "text-muted-foreground",
    primary: "text-primary-foreground/80",
    accent: "text-accent-foreground/80",
    cards: "text-muted-foreground",
  };

  if (variant === "cards") {
    return (
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
          className
        )}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "text-center animate-slide-up",
              statClasses[variant]
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="font-heading text-4xl md:text-5xl mb-1">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </div>
            <div className={cn("text-sm", labelClasses[variant])}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("py-8 md:py-12", containerClasses[variant], className)}>
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center animate-slide-up",
                statClasses[variant]
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="font-heading text-4xl md:text-5xl mb-1">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className={cn("text-sm", labelClasses[variant])}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
