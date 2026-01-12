import Link from "next/link";
import { Check, Sparkles, Clock, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PartyPackage } from "@/data/packages";

interface PackageCardProps {
  package: PartyPackage;
  ctaText?: string;
  ctaHref?: string;
  showAll?: boolean;
  className?: string;
}

export function PackageCard({
  package: pkg,
  ctaText = "Book Now",
  ctaHref,
  showAll = false,
  className,
}: PackageCardProps) {
  const isPopular = pkg.popular;
  const featuresToShow = showAll ? pkg.includes : pkg.includes.slice(0, 5);
  const hasMore = !showAll && pkg.includes.length > 5;

  return (
    <Card
      variant={isPopular ? "featured" : "default"}
      className={cn(
        "flex flex-col relative overflow-hidden",
        isPopular && "border-accent border-2",
        className
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <Badge 
          variant="accent" 
          className="absolute -top-0 -right-0 rounded-none rounded-bl-lg z-10"
        >
          <Sparkles className="h-3 w-3 mr-1" />
          Most Popular
        </Badge>
      )}

      <CardContent className="flex-1 p-6">
        {/* Package Name */}
        <h3 className="font-heading text-2xl mb-2">{pkg.name}</h3>
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-lg">$</span>
            <span className="font-heading text-4xl">{pkg.price}</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{pkg.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Up to {pkg.maxChildren} kids</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>

        {/* Features */}
        <ul className="space-y-2">
          {featuresToShow.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
          {hasMore && (
            <li className="text-sm text-muted-foreground pl-6">
              +{pkg.includes.length - 5} more...
            </li>
          )}
        </ul>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          variant={isPopular ? "accent" : "default"}
          fullWidth
          size="lg"
          className="font-heading"
          asChild
        >
          <Link href={ctaHref || `/birthday-parties#${pkg.slug}`}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
