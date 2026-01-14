"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Grid } from "@/components/layout/grid";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "minimal" | "icons-left";
  className?: string;
}

export function FeatureGrid({
  features,
  columns = 3,
  variant = "cards",
  className,
}: FeatureGridProps) {
  if (variant === "minimal") {
    return (
      <Grid
        cols={1}
        colsMd={2}
        colsLg={columns}
        gap="lg"
        className={className}
      >
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="text-center animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
              <feature.icon className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </Grid>
    );
  }

  if (variant === "icons-left") {
    return (
      <Grid
        cols={1}
        colsMd={2}
        colsLg={columns}
        gap="lg"
        className={className}
      >
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="flex gap-4 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              <feature.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </Grid>
    );
  }

  // Default: cards variant
  return (
    <Grid
      cols={1}
      colsMd={2}
      colsLg={columns}
      gap="md"
      className={className}
    >
      {features.map((feature, index) => (
        <Card
          key={feature.title}
          variant="interactive"
          className={cn(
            "text-center animate-slide-up",
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="pt-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-4 shadow-lg">
              <feature.icon className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}
