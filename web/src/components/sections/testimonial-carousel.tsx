"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role?: string;
  rating?: number;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  variant?: "cards" | "single" | "minimal";
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  variant = "single",
  className,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  if (variant === "minimal") {
    const current = testimonials[activeIndex];
    return (
      <div className={cn("text-center", className)}>
        <Quote className="h-10 w-10 text-accent mx-auto mb-6 opacity-50" />
        
        <blockquote className="text-xl md:text-2xl font-medium mb-6 max-w-3xl mx-auto">
          &ldquo;{current.content}&rdquo;
        </blockquote>

        {current.rating && (
          <Rating value={current.rating} className="justify-center mb-4" />
        )}

        <div className="text-muted-foreground">
          <span className="font-semibold text-foreground">{current.author}</span>
          {current.role && <span className="mx-2">·</span>}
          {current.role && <span>{current.role}</span>}
        </div>

        {/* Navigation dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === activeIndex
                    ? "bg-primary w-6"
                    : "bg-primary/20 hover:bg-primary/40"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Single testimonial view with arrows
  const current = testimonials[activeIndex];

  return (
    <div className={cn("relative", className)}>
      <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border">
        <Quote className="h-10 w-10 text-accent mb-6" />

        <blockquote className="text-xl md:text-2xl font-medium mb-6">
          &ldquo;{current.content}&rdquo;
        </blockquote>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {current.image && (
              <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                <img
                  src={current.image}
                  alt={current.author}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <div className="font-semibold">{current.author}</div>
              {current.role && (
                <div className="text-sm text-muted-foreground">
                  {current.role}
                </div>
              )}
            </div>
          </div>

          {current.rating && <Rating value={current.rating} size="lg" />}
        </div>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-sm text-muted-foreground">
            {activeIndex + 1} / {testimonials.length}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
