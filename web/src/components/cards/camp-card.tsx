import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgeTag } from "@/components/ui/age-tag";
import { PatternPlaceholder } from "@/components/ui/pattern-placeholder";
import { cn } from "@/lib/utils";
import type { Camp } from "@/data/camps";

interface CampCardProps {
  camp: Camp;
  className?: string;
}

// Map camp status to card status
function getCardStatus(campStatus: Camp["status"]): "available" | "limited" | "sold-out" {
  switch (campStatus) {
    case "full":
      return "sold-out";
    case "filling":
      return "limited";
    default:
      return "available";
  }
}

// Format date range for display
function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}, ${start.getFullYear()}`;
}

export function CampCard({ camp, className }: CampCardProps) {
  const status = getCardStatus(camp.status);
  const isSoldOut = status === "sold-out";
  const dates = formatDateRange(camp.startDate, camp.endDate);
  const hasImage = camp.image?.url && camp.image.url.length > 0;

  return (
    <Card
      variant={isSoldOut ? "default" : "interactive"}
      padding="none"
      className={cn(
        "overflow-hidden",
        isSoldOut && "opacity-75",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {hasImage ? (
          <Image
            src={camp.image.url}
            alt={camp.image.alt || camp.name}
            fill
            className="object-cover"
          />
        ) : (
          <PatternPlaceholder className="absolute inset-0" />
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {status === "limited" && (
            <Badge variant="limited">Only {camp.spotsRemaining} spots left!</Badge>
          )}
          {status === "sold-out" && (
            <Badge variant="sold-out">Sold Out</Badge>
          )}
        </div>

        {/* Age Tag */}
        <div className="absolute top-4 left-4">
          <AgeTag minAge={camp.ageMin} maxAge={camp.ageMax} />
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg border-2 border-border">
          {camp.earlyBirdPrice && camp.earlyBirdDeadline && new Date(camp.earlyBirdDeadline) > new Date() ? (
            <div className="text-center">
              <span className="font-heading text-2xl text-accent">${camp.earlyBirdPrice}</span>
              <span className="text-xs text-muted-foreground line-through ml-1">${camp.price}</span>
            </div>
          ) : (
            <span className="font-heading text-2xl">${camp.price}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5">
        <h3 className="font-heading text-xl mb-2">{camp.name}</h3>
        
        {camp.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {camp.description}
          </p>
        )}

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{dates}</span>
          </div>
          {camp.schedule && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{camp.schedule}</span>
            </div>
          )}
          {camp.spotsRemaining !== undefined && status !== "sold-out" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{camp.spotsRemaining} spots remaining</span>
            </div>
          )}
        </div>

        <Button
          variant={isSoldOut ? "secondary" : "default"}
          fullWidth
          disabled={isSoldOut}
          asChild={!isSoldOut}
        >
          {isSoldOut ? (
            <span>Sold Out</span>
          ) : (
            <Link href={`/camps#register`}>Register Now</Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
