import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  showPhone?: boolean;
  variant?: "default" | "accent";
}

export function CTA({
  title = "Ready to Plan Your Event?",
  subtitle = "Book a birthday party, register for camp, or inquire about private events. We can't wait to help you celebrate!",
  primaryCtaText = "Plan a Party",
  primaryCtaHref = "/birthday-parties",
  showPhone = true,
  variant = "default",
}: CTAProps) {
  const bgClass = variant === "accent" ? "bg-gradient-accent" : "bg-gradient-ngk";

  return (
    <section className={`${bgClass} text-white py-16 lg:py-24`}>
      <div className="container-wide text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
          {title}
        </h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="bg-white text-primary hover:bg-white/90 text-lg px-8"
          >
            <Link href={primaryCtaHref}>
              {primaryCtaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          {showPhone && (
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8"
            >
              <a href="tel:+18185384989">
                <Phone className="mr-2 h-5 w-5" />
                (818) 538-4989
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
