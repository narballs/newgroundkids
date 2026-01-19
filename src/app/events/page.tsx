import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Info, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { CalPopupButton } from "@/components/ui/cal-embed";
import { images } from "@/lib/images";
import { siteConfig } from "@/config/site";
import { getNextEvent, activityIcons } from "@/data/events";

export const metadata: Metadata = {
  title: "Events - Valentine's Day Parents Night Out",
  description:
    "Valentine's Day Parents Night Out! Drop off your kids for games, bounce house, pizza, and a movie while you enjoy date night. $35 per child.",
};

// Floating heart component for decorations
function FloatingHeart({
  className,
  size = "md",
  filled = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  filled?: boolean;
}) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-16 w-16",
  };

  return <Heart className={`${sizes[size]} ${filled ? "fill-current" : ""} ${className}`} />;
}

export default function EventsPage() {
  const event = getNextEvent();

  if (!event) {
    return null;
  }

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section - Valentine's Theme */}
        <section
          className="relative overflow-hidden py-16 md:py-24"
          style={{ backgroundColor: "#FDF2F4" }}
        >
          {/* Sunburst Background Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                repeating-conic-gradient(
                  from 0deg at 50% 0%,
                  #E11D48 0deg 10deg,
                  #FDA4AF 10deg 20deg
                )
              `,
              maskImage: "radial-gradient(ellipse at top, black 0%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 70%)",
            }}
          />

          {/* Floating Hearts Decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <FloatingHeart
              className="absolute top-[15%] left-[5%] animate-pulse text-rose-400 opacity-60"
              size="lg"
            />
            <FloatingHeart
              className="absolute top-[10%] right-[8%] text-rose-500 opacity-50"
              size="xl"
            />
            <FloatingHeart
              className="absolute bottom-[20%] left-[15%] text-rose-300 opacity-40"
              size="md"
            />
            <FloatingHeart
              className="absolute right-[12%] bottom-[25%] text-rose-600 opacity-50"
              size="lg"
            />
            <FloatingHeart
              className="absolute top-[5%] left-[40%] text-rose-400 opacity-30"
              size="sm"
            />
            <FloatingHeart
              className="absolute top-[20%] right-[30%] text-rose-500 opacity-40"
              size="md"
            />
            <FloatingHeart
              className="absolute top-[50%] left-[8%] text-rose-400 opacity-50"
              size="md"
              filled={false}
            />
            <FloatingHeart
              className="absolute top-[45%] right-[5%] text-rose-500 opacity-60"
              size="lg"
            />
          </div>

          {/* Decorative Dots */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-[30%] left-[20%] h-3 w-3 rounded-full bg-white opacity-80" />
            <div className="absolute top-[15%] right-[25%] h-4 w-4 rounded-full bg-white opacity-70" />
            <div className="absolute bottom-[35%] left-[30%] h-2 w-2 rounded-full bg-white opacity-90" />
            <div className="absolute right-[15%] bottom-[40%] h-3 w-3 rounded-full bg-white opacity-60" />
          </div>

          <Container className="relative z-10">
            <div className="text-center">
              <Badge className="animate-slide-down mb-6 border-2 border-rose-300 bg-white/80 text-rose-600 hover:bg-white">
                <Heart className="mr-2 h-4 w-4 fill-rose-500 text-rose-500" />
                {event.dayOfWeek}, {event.date}
              </Badge>

              <h1 className="animate-slide-up font-heading mb-4 text-5xl leading-tight text-rose-900 md:text-6xl lg:text-7xl">
                {event.name}
              </h1>

              <p
                className="animate-slide-up animation-delay-100 font-heading mb-6 text-2xl md:text-3xl"
                style={{ color: event.theme?.primary }}
              >
                {event.subtitle}
              </p>

              <p className="animation-delay-200 animate-slide-up mx-auto max-w-2xl text-lg text-rose-700/80 md:text-xl">
                {event.tagline}
              </p>

              {/* CTA Button */}
              <div className="animate-slide-up animation-delay-400 mt-8">
                <CalPopupButton
                  eventType={event.calEventSlug}
                  className="font-heading inline-flex h-16 items-center justify-center gap-3 rounded-full border-4 border-white bg-rose-600 px-12 text-xl text-white shadow-[0_8px_30px_rgba(225,29,72,0.4)] transition-all hover:scale-105 hover:bg-rose-700 hover:shadow-[0_12px_40px_rgba(225,29,72,0.5)]"
                >
                  <Heart className="h-6 w-6 fill-current" />
                  Book Now - ${event.pricing.perChild}/child
                </CalPopupButton>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto mt-12 max-w-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                <Image
                  src={images.birthday.DSC00995}
                  alt="Kids having fun at New Ground"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Heart overlay decorations */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
              </div>
              {/* Decorative hearts around image */}
              <FloatingHeart
                className="absolute -top-4 -left-6 z-10 text-rose-500 drop-shadow-lg"
                size="xl"
              />
              <FloatingHeart
                className="absolute -right-4 -bottom-3 z-10 text-rose-400 drop-shadow-lg"
                size="lg"
              />
            </div>
          </Container>

          {/* Bottom Cloud Effect */}
          <div
            className="absolute right-0 bottom-0 left-0 h-24"
            style={{
              background: "linear-gradient(to top, white 0%, transparent 100%)",
            }}
          />
        </section>

        {/* Featured Event Details */}
        <Section className="relative overflow-hidden bg-white">
          {/* Subtle heart pattern background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%23E11D48'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <Container>
            <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left: Event Details */}
              <div className="relative z-10 flex flex-col">
                <div className="mb-6 inline-flex items-center gap-2">
                  <Badge
                    className="border-2 text-sm font-bold"
                    style={{
                      borderColor: event.theme?.primary,
                      color: event.theme?.primary,
                      backgroundColor: event.theme?.secondary,
                    }}
                  >
                    <Heart className="mr-1 h-3 w-3 fill-current" />
                    NEXT EVENT
                  </Badge>
                </div>

                <h2 className="font-heading mb-2 text-3xl md:text-4xl">Event Details</h2>

                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {event.description}
                </p>

                {/* Event Logistics Card */}
                <Card
                  className="flex flex-1 flex-col border-2 shadow-[6px_6px_0px_0px]"
                  style={{
                    backgroundColor: event.theme?.secondary || "#FFE4E6",
                    borderColor: event.theme?.primary,
                    boxShadow: `6px 6px 0px 0px ${event.theme?.primary}`,
                  }}
                >
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: event.theme?.primary }}
                        >
                          <CalendarDays className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold">WHEN</h4>
                          <p className="text-lg">
                            {event.dayOfWeek}, {event.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: event.theme?.primary }}
                        >
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold">TIME</h4>
                          <div className="flex gap-6">
                            <div>
                              <span className="text-xs font-bold uppercase opacity-70">
                                Drop Off
                              </span>
                              <p className="text-lg font-semibold">{event.dropOff}</p>
                            </div>
                            <div>
                              <span className="text-xs font-bold uppercase opacity-70">
                                Pick Up
                              </span>
                              <p className="text-lg font-semibold">{event.pickUp}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: event.theme?.primary }}
                        >
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold">WHERE</h4>
                          <p className="text-lg">{event.location}</p>
                          <p className="text-sm opacity-70">{event.addressLine1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer text - pushed to bottom */}
                    <div className="mt-auto pt-4">
                      <p className="text-center text-sm font-medium text-rose-700">
                        Spots are limited! Reserve yours today.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Booking Card */}
              <div className="relative flex flex-col">
                {/* Decorative hearts around booking card */}
                <FloatingHeart
                  className="absolute -top-4 -left-4 z-20 text-rose-400 opacity-70 drop-shadow-lg"
                  size="lg"
                />
                <FloatingHeart
                  className="absolute -right-2 -bottom-2 z-20 text-rose-500 opacity-60 drop-shadow-lg"
                  size="xl"
                />

                <Card
                  className="relative flex flex-1 flex-col overflow-hidden border-4 shadow-2xl"
                  style={{ borderColor: event.theme?.primary }}
                >
                  {/* Card Header with gradient */}
                  <div
                    className="relative p-8 text-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${event.theme?.primary} 0%, #BE123C 100%)`,
                    }}
                  >
                    {/* Heart decorations in header */}
                    <Heart className="absolute top-4 left-4 h-6 w-6 fill-white/20 text-white/20" />
                    <Heart className="absolute right-4 bottom-4 h-8 w-8 fill-white/10 text-white/10" />

                    <p className="mb-2 text-sm font-bold tracking-widest text-white/80 uppercase">
                      Reserve Your Spot
                    </p>
                    <p className="font-heading text-6xl">${event.pricing.perChild}</p>
                    <p className="mt-1 text-sm font-medium tracking-wide text-white/90 uppercase">
                      {event.pricing.description}
                    </p>
                  </div>

                  <CardContent className="flex flex-1 flex-col p-6">
                    {/* What's Included */}
                    <p
                      className="mb-4 text-xs font-bold tracking-wider uppercase"
                      style={{ color: event.theme?.primary }}
                    >
                      What&apos;s Included
                    </p>
                    <ul className="mb-6 space-y-3">
                      {event.activities.map((activity, i) => {
                        const IconComponent = activityIcons[activity.icon];
                        return (
                          <li key={i} className="flex items-center gap-3">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full"
                              style={{ backgroundColor: event.theme?.secondary }}
                            >
                              {IconComponent && (
                                <IconComponent
                                  className="h-4 w-4"
                                  style={{ color: event.theme?.primary }}
                                />
                              )}
                            </div>
                            <span className="font-medium">{activity.label}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Primary CTA - pushed to bottom */}
                    <div className="mt-auto">
                      <CalPopupButton
                        eventType={event.calEventSlug}
                        className="font-heading flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 bg-white text-base shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                        style={{ borderColor: event.theme?.primary, color: event.theme?.primary }}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                        Book Now - ${event.pricing.perChild}/child
                      </CalPopupButton>

                      {/* Secondary Info */}
                      <p className="text-muted-foreground mt-4 text-center text-sm">
                        Questions? Call{" "}
                        <a
                          href={`tel:${siteConfig.contact.phoneRaw}`}
                          className="font-medium hover:underline"
                          style={{ color: event.theme?.primary }}
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </p>

                      <p className="text-muted-foreground mt-3 text-center text-xs">
                        <Info className="mr-1 inline h-3 w-3" />
                        Select number of children at checkout. Spots limited!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Private Events Banner */}
        <Section
          className="relative overflow-hidden text-white"
          style={{ backgroundColor: event.theme?.primary }}
        >
          {/* Hearts in background */}
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <Heart className="absolute top-[20%] left-[10%] h-20 w-20 fill-current" />
            <Heart className="absolute right-[15%] bottom-[10%] h-16 w-16 fill-current" />
          </div>

          <Container>
            <div className="relative flex flex-col items-center justify-between gap-8 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm md:flex-row">
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading mb-3 text-3xl">Looking for Private Events?</h2>
                <p className="max-w-xl text-white/80">
                  We also host private team parties, corporate events, and group sessions. Get in
                  touch to reserve the facility for your group.
                </p>
              </div>
              <Button
                size="lg"
                className="font-heading border-2 border-white bg-white text-rose-600 hover:bg-white/90"
                asChild
              >
                <Link href="/contact">Inquire About Private Events</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
