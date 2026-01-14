"use client";

import { useState } from "react";
import Image from "next/image";
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
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (variant === "minimal") {
    const current = testimonials[activeIndex]!;
    return (
      <div className={cn("text-center", className)}>
        <Quote className="text-accent mx-auto mb-6 h-10 w-10 opacity-50" />

        <blockquote className="mx-auto mb-6 max-w-3xl text-xl font-medium md:text-2xl">
          &ldquo;{current.content}&rdquo;
        </blockquote>

        {current.rating && <Rating value={current.rating} className="mb-4 justify-center" />}

        <div className="text-muted-foreground">
          <span className="text-foreground font-semibold">{current.author}</span>
          {current.role && <span className="mx-2">·</span>}
          {current.role && <span>{current.role}</span>}
        </div>

        {/* Navigation dots */}
        {testimonials.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === activeIndex ? "bg-primary w-6" : "bg-primary/20 hover:bg-primary/40"
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
  const current = testimonials[activeIndex]!;

  return (
    <div className={cn("relative", className)}>
      <div className="bg-card rounded-2xl border p-8 shadow-lg md:p-12">
        <Quote className="text-accent mb-6 h-10 w-10" />

        <blockquote className="mb-6 text-xl font-medium md:text-2xl">
          &ldquo;{current.content}&rdquo;
        </blockquote>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {current.image && (
              <div className="bg-muted relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={current.image} alt={current.author} fill className="object-cover" />
              </div>
            )}
            <div>
              <div className="font-semibold">{current.author}</div>
              {current.role && <div className="text-muted-foreground text-sm">{current.role}</div>}
            </div>
          </div>

          {current.rating && <Rating value={current.rating} size="lg" />}
        </div>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-muted-foreground text-sm">
            {activeIndex + 1} / {testimonials.length}
          </div>

          <Button variant="outline" size="icon" onClick={goToNext} aria-label="Next testimonial">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
