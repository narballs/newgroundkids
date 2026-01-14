import * as React from "react";
import { Check, Star, Users, Clock, Gift } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalPopupButton } from "@/components/ui/cal-embed";
import type { BirthdayPackage } from "@/data/birthday-packages";

interface PackageCardProps {
  package_: BirthdayPackage;
  /** Fallback href if no Cal.com slug provided */
  bookingHref?: string;
  /** Cal.com event slug - when provided, opens booking popup */
  calEventSlug?: string;
  className?: string;
}

const colorThemes = {
  coral: {
    header: "bg-orange-500 text-white",
    icon: "text-orange-500",
    bonus: "text-orange-600",
    buttonClass: "bg-orange-500 text-white hover:bg-orange-600",
    border: "border-orange-500",
  },
  accent: {
    header: "bg-accent text-white",
    icon: "text-accent",
    bonus: "text-accent",
    buttonClass: "bg-accent text-accent-foreground hover:bg-accent/90",
    border: "border-accent",
  },
  purple: {
    header: "bg-violet-600 text-white",
    icon: "text-violet-600",
    bonus: "text-violet-600",
    buttonClass: "bg-violet-600 text-white hover:bg-violet-700",
    border: "border-violet-600",
  },
  primary: {
    header: "bg-primary text-white",
    icon: "text-primary",
    bonus: "text-primary",
    buttonClass: "bg-primary text-white hover:bg-primary/90",
    border: "border-primary",
  },
};

export function PackageCard({
  package_,
  bookingHref = "#book",
  calEventSlug,
  className,
}: PackageCardProps) {
  const {
    name,
    subtitle,
    price,
    deposit,
    duration,
    maxKids,
    hosts,
    featured,
    features,
    bonuses,
    color = featured ? "accent" : "primary",
  } = package_;

  const theme = colorThemes[color] || colorThemes.coral;

  return (
    <div className={cn("relative h-full", featured && "pt-3.5", className)}>
      {/* Featured Badge - outside overflow container */}
      {featured && (
        <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2">
          <span className="bg-accent inline-block rounded-full border-2 border-white px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-md">
            Best Value
          </span>
        </div>
      )}

      {/* Card Container */}
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-xl bg-white transition-all duration-300",
          "border-2",
          theme.border,
          featured
            ? "shadow-[var(--shadow-hard-accent-lg)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-hard-accent-xl)]"
            : "shadow-[var(--shadow-soft-lg)] hover:-translate-y-1 hover:shadow-[var(--shadow-soft-xl)]"
        )}
      >
        {/* Header */}
        <div className={cn("px-6 py-5", theme.header)}>
          <h3 className="font-heading mb-1 text-3xl tracking-wide">{name}</h3>
          <p className="text-base font-medium text-white">{subtitle}</p>
        </div>

        {/* Price Section */}
        <div className="border-border bg-muted/50 border-b px-6 py-6">
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-foreground text-5xl">${price}</span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">${deposit} deposit required</p>
        </div>

        {/* Quick Stats */}
        <div className="divide-border border-border grid grid-cols-3 divide-x border-b">
          <div className="px-3 py-3 text-center">
            <Users className={cn("mx-auto mb-1 h-5 w-5", theme.icon)} />
            <span className="text-xs font-medium">{maxKids} Kids</span>
          </div>
          <div className="px-3 py-3 text-center">
            <Clock className={cn("mx-auto mb-1 h-5 w-5", theme.icon)} />
            <span className="text-xs font-medium">{duration}</span>
          </div>
          <div className="px-3 py-3 text-center">
            <Star className={cn("mx-auto mb-1 h-5 w-5", theme.icon)} />
            <span className="text-xs font-medium">
              {hosts} Host{hosts > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="flex flex-1 flex-col px-6 py-5">
          <p className="font-heading text-muted-foreground mb-3 text-xs tracking-wider uppercase">
            What&apos;s Included
          </p>
          <ul className="space-y-2.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Bonuses - pushed to bottom with mt-auto */}
          {bonuses && bonuses.length > 0 && (
            <div className="border-border mt-auto border-t border-dashed pt-4">
              <p
                className={cn(
                  "font-heading mb-3 flex items-center gap-1 text-xs tracking-wider uppercase",
                  theme.bonus
                )}
              >
                <Gift className="h-3 w-3" />
                Bonus Perks
              </p>
              <ul className="space-y-2">
                {bonuses.map((bonus, index) => (
                  <li
                    key={index}
                    className={cn("flex items-start gap-2 text-sm font-medium", theme.bonus)}
                  >
                    <Star className="mt-0.5 h-4 w-4 shrink-0 fill-current" />
                    <span>{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="px-6 pb-6">
          {calEventSlug ? (
            <CalPopupButton
              eventType={calEventSlug}
              className={cn(
                "font-heading inline-flex w-full items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
                "focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none",
                "disabled:pointer-events-none disabled:opacity-50",
                "h-11 px-8",
                theme.buttonClass,
                "shadow"
              )}
            >
              Book {name}
            </CalPopupButton>
          ) : (
            <Button size="lg" className={cn("font-heading w-full", theme.buttonClass)} asChild>
              <a href={bookingHref}>Book {name}</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple extras card for add-ons
interface ExtrasCardProps {
  name: string;
  price: number;
  note?: string;
  description?: string;
  className?: string;
}

export function ExtrasCard({ name, price, note, description, className }: ExtrasCardProps) {
  return (
    <div
      className={cn(
        "border-border rounded-xl border bg-white p-4 shadow-[var(--shadow-soft-sm)] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[var(--shadow-soft-md)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-heading text-sm">{name}</h4>
          {description && <p className="text-muted-foreground mt-1 text-xs">{description}</p>}
        </div>
        <div className="shrink-0 text-right">
          <span className="font-heading text-lg">${price}</span>
          {note && <p className="text-muted-foreground text-xs">{note}</p>}
        </div>
      </div>
    </div>
  );
}
