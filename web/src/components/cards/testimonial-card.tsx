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
          <p className="text-sm mb-3 line-clamp-4">&ldquo;{content}&rdquo;</p>
          <div className="text-sm">
            <span className="font-semibold">{authorName}</span>
            {authorRole && (
              <span className="text-muted-foreground ml-1">· {authorRole}</span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card
        variant="featured"
        className={cn("bg-primary text-primary-foreground", className)}
      >
        <CardContent className="pt-6">
          <Quote className="h-8 w-8 text-accent mb-4" />
          <p className="text-lg font-medium mb-6">&ldquo;{content}&rdquo;</p>
          
          <div className="flex items-center gap-4">
            {image && (
              <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
                <img
                  src={image.url}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <div className="font-semibold">{authorName}</div>
              {authorRole && (
                <div className="text-sm text-primary-foreground/80">
                  {authorRole}
                </div>
              )}
            </div>
            {rating && (
              <Rating
                value={rating}
                className="ml-auto [&_svg]:text-accent [&_svg]:fill-accent"
              />
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card variant="default" className={cn("border-2 shadow-hard", className)}>
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-accent mb-4" />
        <p className="mb-4">&ldquo;{content}&rdquo;</p>
        
        {rating && <Rating value={rating} className="mb-4" />}
        
        <div className="flex items-center gap-3">
          {image && (
            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden border-2 border-border">
              <img
                src={image.url}
                alt={authorName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <div className="font-semibold text-sm">{authorName}</div>
            {authorRole && (
              <div className="text-xs text-muted-foreground">{authorRole}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
