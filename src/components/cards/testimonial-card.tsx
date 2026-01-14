import Image from "next/image";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function TestimonialCard({
  testimonial,
  variant = "default",
  className,
}: TestimonialCardProps) {
  const { content, authorName, authorRole, rating, image } = testimonial;

  if (variant === "compact") {
    return (
      <Card variant="default" className={cn("", className)}>
        <CardContent className="pt-4">
          <Rating value={rating} size="sm" className="mb-3" />
          <p className="mb-3 line-clamp-4 text-sm">&ldquo;{content}&rdquo;</p>
          <div className="text-sm">
            <span className="font-semibold">{authorName}</span>
            {authorRole && <span className="text-muted-foreground ml-1">· {authorRole}</span>}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card variant="featured" className={cn("bg-primary text-primary-foreground", className)}>
        <CardContent className="pt-6">
          <Quote className="text-accent mb-4 h-8 w-8" />
          <p className="mb-6 text-lg font-medium">&ldquo;{content}&rdquo;</p>

          <div className="flex items-center gap-4">
            {image && (
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10">
                <Image src={image.url} alt={authorName} fill className="object-cover" />
              </div>
            )}
            <div>
              <div className="font-semibold">{authorName}</div>
              {authorRole && <div className="text-primary-foreground/80 text-sm">{authorRole}</div>}
            </div>
            {rating && (
              <Rating value={rating} className="[&_svg]:text-accent [&_svg]:fill-accent ml-auto" />
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card variant="default" className={cn("shadow-hard border-2", className)}>
      <CardContent className="pt-6">
        <Quote className="text-accent mb-4 h-8 w-8" />
        <p className="mb-4">&ldquo;{content}&rdquo;</p>

        {rating && <Rating value={rating} className="mb-4" />}

        <div className="flex items-center gap-3">
          {image && (
            <div className="bg-muted border-border relative h-10 w-10 overflow-hidden rounded-full border-2">
              <Image src={image.url} alt={authorName} fill className="object-cover" />
            </div>
          )}
          <div>
            <div className="text-sm font-semibold">{authorName}</div>
            {authorRole && <div className="text-muted-foreground text-xs">{authorRole}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
