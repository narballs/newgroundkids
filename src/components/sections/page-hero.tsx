import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  overlay?: "dark" | "light" | "none";
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
};

const overlayClasses = {
  dark: "hero-overlay",
  light: "hero-overlay-light",
  none: "",
};

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
  overlay = "dark",
  align = "center",
  size = "md",
  className,
  children,
}: PageHeroProps) {
  const hasBackground = !!backgroundImage;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        hasBackground ? "text-white" : "bg-gradient-ngk text-white",
        sizeClasses[size],
        className
      )}
    >
      {/* Background Image */}
      {hasBackground && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          {overlay !== "none" && (
            <div className={cn("absolute inset-0", overlayClasses[overlay])} />
          )}
        </>
      )}

      {/* Content */}
      <div className="container-wide relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb
            items={breadcrumbs}
            className={cn(
              "mb-6",
              "[&_a]:text-white/70 [&_a:hover]:text-white",
              "[&_span]:text-white",
              "[&_svg]:text-white/50"
            )}
          />
        )}

        <div
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          {/* Title */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4 animate-slide-up">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={cn(
                "text-lg md:text-xl text-white/90 animate-slide-up animation-delay-100",
                align === "center" && "max-w-2xl mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}

          {/* Additional Content (CTAs, etc.) */}
          {children && (
            <div className="mt-8 animate-slide-up animation-delay-200">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
