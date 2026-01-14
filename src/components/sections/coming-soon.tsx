"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComicBurst } from "@/components/ui/comic-burst";
import { Container } from "@/components/layout/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";

interface ComingSoonImage {
  src: string;
  alt: string;
}

interface ComingSoonPageProps {
  /** Page title */
  title: string;
  /** Subtitle/tagline */
  subtitle: string;
  /** Description text */
  description: string;
  /** Hero background image */
  heroImage: ComingSoonImage;
  /** Secondary images for the gallery strip */
  secondaryImages?: ComingSoonImage[];
  /** Text shown in the comic burst badge */
  burstText?: string;
  /** Color of the comic burst: "yellow" | "red" | "white" */
  burstColor?: "yellow" | "red" | "white";
  /** Show contact link for inquiries */
  showContactLink?: boolean;
  /** Contact link text */
  contactLinkText?: string;
  /** Additional CSS classes */
  className?: string;
}

const burstColors = {
  yellow: { fill: "#FACC15", textColor: "#09090B" },
  red: { fill: "#dc2626", textColor: "#ffffff" },
  white: { fill: "#ffffff", textColor: "#dc2626" },
};

export function ComingSoonPage({
  title,
  subtitle,
  description,
  heroImage,
  secondaryImages = [],
  burstText = "COMING SOON!",
  burstColor = "yellow",
  showContactLink = false,
  contactLinkText = "Have questions? Contact us",
  className,
}: ComingSoonPageProps) {
  const colors = burstColors[burstColor];

  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      {/* Hero Section with Full-Bleed Image */}
      <section className="relative flex min-h-[60vh] flex-1 items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover brightness-[0.5]"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Content */}
        <Container className="relative z-10 py-16 text-center">
          {/* Comic Burst Badge */}
          <div className="animate-slide-down mb-8 flex justify-center">
            <ComicBurst
              fill={colors.fill}
              textColor={colors.textColor}
              stroke="#09090B"
              strokeWidth={4}
              rotation={-8}
              size="lg"
              shape="explosion"
              shadow
              shadowOffset={6}
              animate
            >
              {burstText}
            </ComicBurst>
          </div>

          {/* Text with backdrop for readability */}
          <div className="relative mx-auto inline-block">
            <div className="absolute -inset-6 -z-10 rounded-2xl bg-black/50 backdrop-blur-sm md:-inset-8" />

            {/* Title */}
            <h1 className="animate-slide-up mb-4 text-white">{title}</h1>

            {/* Subtitle */}
            <p className="animate-slide-up animation-delay-100 mx-auto mb-4 max-w-2xl text-xl font-medium text-white/90 md:text-2xl">
              {subtitle}
            </p>

            {/* Description */}
            <p className="animate-slide-up animation-delay-200 mx-auto mb-8 max-w-xl text-lg text-white/80">
              {description}
            </p>

            {/* Back to Home */}
            <Button
              variant="outline"
              className="font-heading animate-slide-up animation-delay-300 border-white/30 text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Secondary Images Strip (if provided) */}
      {secondaryImages.length > 0 && (
        <section className="bg-primary border-y-4 border-black py-8">
          <Container>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {secondaryImages.slice(0, 3).map((image, index) => (
                <div
                  key={image.src}
                  className={cn(
                    "shadow-comic relative aspect-[4/3] overflow-hidden rounded-sm border-[3px] border-black transition-transform hover:scale-[1.02]",
                    index === 0 && "-rotate-2",
                    index === 1 && "hidden rotate-1 md:block",
                    index === 2 && "-rotate-1"
                  )}
                >
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  {/* Halftone overlay for comic effect */}
                  <div className="bg-halftone-light pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter Signup Section */}
      <section className="bg-background py-12 md:py-16">
        <Container size="sm">
          <div className="mb-8 text-center">
            <div className="bg-accent/10 shadow-hard-sm mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black px-4 py-2">
              <Bell className="text-accent h-5 w-5" />
              <span className="font-heading text-sm">BE THE FIRST TO KNOW</span>
            </div>
            <h2 className="mb-4 text-2xl md:text-3xl">Get Notified When We Launch</h2>
            <p className="text-muted-foreground">
              Drop your email below and we&apos;ll let you know as soon as registration opens.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="mx-auto max-w-md">
            <NewsletterForm
              variant="default"
              ctaText="Notify Me"
              placeholder="Enter your email"
              className="justify-center"
            />
          </div>

          {/* Contact Link */}
          {showContactLink && (
            <p className="text-muted-foreground mt-6 text-center text-sm">
              {contactLinkText.split("Contact us")[0]}
              <Link href="/contact" className="text-accent font-medium hover:underline">
                Contact us
              </Link>
              {contactLinkText.split("Contact us")[1]}
            </p>
          )}
        </Container>
      </section>
    </div>
  );
}

export type { ComingSoonPageProps, ComingSoonImage };
