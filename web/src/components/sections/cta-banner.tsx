import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  variant?: "gradient" | "image" | "primary" | "accent";
  align?: "left" | "center";
  className?: string;
}

export function CTABanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
  variant = "gradient",
  align = "center",
  className,
}: CTABannerProps) {
  const hasImage = !!backgroundImage && variant === "image";

  const variantClasses = {
    gradient: "bg-gradient-ngk text-white",
    image: "text-white",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <section
      className={cn(
        "relative py-16 md:py-24 overflow-hidden",
        variantClasses[variant],
        className
      )}
    >
      {/* Background Image */}
      {hasImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </>
      )}

      {/* Decorative elements for gradient variant */}
      {variant === "gradient" && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        </>
      )}

      {/* Content */}
      <div className="container-wide relative z-10">
        <div
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {title}
          </h2>

          {subtitle && (
            <p
              className={cn(
                "text-lg opacity-90 mb-8",
                align === "center" && "max-w-2xl mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4",
              align === "center" && "justify-center"
            )}
          >
            <Button
              size="lg"
              variant={variant === "accent" ? "white" : "accent"}
              asChild
            >
              <Link href={primaryCta.href}>{primaryCta.text}</Link>
            </Button>

            {secondaryCta && (
              <Button
                size="lg"
                variant="white-outline"
                asChild
              >
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
