import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Info, Flower, Flower2, Users } from "lucide-react";

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
import { getEventById, activityIcons } from "@/data/events";

export const metadata: Metadata = {
  title: "Mother's Day Mommy & Me Jiu Jitsu - NewGround Kids",
  description:
    "Celebrate Mother's Day with a special Mommy & Me jiu jitsu class! Ages 3+. Three class times available. Bond with your child on the mats at New Ground Jiu Jitsu.",
};

// Floating flower component for decorations
function FloatingFlower({
  className,
  size = "md",
  variant = "primary",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary";
}) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-16 w-16",
  };

  const Icon = variant === "primary" ? Flower : Flower2;

  return <Icon className={`${sizes[size]} ${className}`} />;
}

export default function MothersDayPage() {
  const event = getEventById("mothers-day-2026");

  if (!event) {
    return null;
  }

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section - Mother's Day Theme */}
        <section
          className="relative overflow-hidden py-16 md:py-24"
          style={{ backgroundColor: "#FAF5FF" }}
        >
          {/* Sunburst Background Pattern */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: `
                repeating-conic-gradient(
                  from 0deg at 50% 0%,
                  #9333EA 0deg 10deg,
                  #D8B4FE 10deg 20deg
                )
              `,
              maskImage: "radial-gradient(ellipse at top, black 0%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 70%)",
            }}
          />

          {/* Floating Flowers Decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <FloatingFlower
              className="absolute top-[15%] left-[5%] animate-pulse text-purple-400 opacity-60"
              size="lg"
            />
            <FloatingFlower
              className="absolute top-[10%] right-[8%] text-pink-400 opacity-50"
              size="xl"
              variant="secondary"
            />
            <FloatingFlower
              className="absolute bottom-[20%] left-[15%] text-purple-300 opacity-40"
              size="md"
              variant="secondary"
            />
            <FloatingFlower
              className="absolute right-[12%] bottom-[25%] text-purple-500 opacity-50"
              size="lg"
            />
            <FloatingFlower
              className="absolute top-[5%] left-[40%] text-pink-300 opacity-30"
              size="sm"
              variant="secondary"
            />
            <FloatingFlower
              className="absolute top-[20%] right-[30%] text-purple-400 opacity-40"
              size="md"
            />
            <FloatingFlower
              className="absolute top-[50%] left-[8%] text-pink-400 opacity-50"
              size="md"
              variant="secondary"
            />
            <FloatingFlower
              className="absolute top-[45%] right-[5%] text-purple-500 opacity-60"
              size="lg"
              variant="secondary"
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
              <Badge className="animate-slide-down mb-6 border-2 border-purple-300 bg-white/80 text-purple-600 hover:bg-white">
                <Flower className="mr-2 h-4 w-4 text-purple-500" />
                {event.dayOfWeek}, {event.date}
              </Badge>

              <h1 className="animate-slide-up font-heading mb-4 text-5xl leading-tight text-purple-900 md:text-6xl lg:text-7xl">
                {event.name}
              </h1>

              <p
                className="animate-slide-up animation-delay-100 font-heading mb-6 text-2xl md:text-3xl"
                style={{ color: event.theme?.primary }}
              >
                {event.subtitle}
              </p>

              <p className="animation-delay-200 animate-slide-up mx-auto max-w-2xl text-lg text-purple-700/80 md:text-xl">
                {event.tagline}
              </p>

              {/* Age Groups Quick Info */}
              <div className="animate-slide-up animation-delay-400 mt-8 flex flex-wrap items-center justify-center gap-3">
                {event.timeSlots?.map((slot) => (
                  <Badge
                    key={slot.calEventSlug}
                    className="border-2 border-purple-300 bg-white/90 px-4 py-2 text-sm text-purple-700"
                  >
                    <Users className="mr-1.5 h-3.5 w-3.5" />
                    {slot.ageRange}
                  </Badge>
                ))}
              </div>

              {/* CTA Button */}
              <div className="animate-slide-up animation-delay-400 mt-8">
                <CalPopupButton
                  eventType={event.calEventSlug}
                  className="font-heading inline-flex h-16 items-center justify-center gap-3 rounded-full border-4 border-white bg-purple-600 px-12 text-xl text-white shadow-[0_8px_30px_rgba(147,51,234,0.4)] transition-all hover:scale-105 hover:bg-purple-700 hover:shadow-[0_12px_40px_rgba(147,51,234,0.5)]"
                >
                  <Flower className="h-6 w-6" />
                  Reserve Your Spot
                </CalPopupButton>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto mt-12 max-w-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                <Image
                  src={images.camps.training1}
                  alt="Mommy and Me jiu jitsu class at New Ground"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
              </div>
              {/* Decorative flowers around image */}
              <FloatingFlower
                className="absolute -top-4 -left-6 z-10 text-purple-500 drop-shadow-lg"
                size="xl"
              />
              <FloatingFlower
                className="absolute -right-4 -bottom-3 z-10 text-pink-400 drop-shadow-lg"
                size="lg"
                variant="secondary"
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

        {/* Time Slots Section */}
        <Section className="relative overflow-hidden bg-white">
          {/* Subtle flower pattern background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='%239333EA' stroke-width='2'%3E%3Cpath d='M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 1-4.5-4.5m4.5 4.5V15m4.5-3a4.5 4.5 0 1 0-4.5-4.5M16.5 12H15'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <Container>
            <div className="mb-12 text-center">
              <Badge
                className="mb-6 border-2 text-sm font-bold"
                style={{
                  borderColor: event.theme?.primary,
                  color: event.theme?.primary,
                  backgroundColor: event.theme?.secondary,
                }}
              >
                <Flower className="mr-1 h-3 w-3" />
                CHOOSE YOUR CLASS
              </Badge>
              <h2 className="font-heading mb-4 text-3xl md:text-4xl">Pick Your Time Slot</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                Three classes organized by age so every child gets the right experience.
                Each session includes warm-ups, partner drills with mom, and fun games.
              </p>
            </div>

            {/* Time Slot Cards */}
            <div className="grid gap-8 md:grid-cols-3">
              {event.timeSlots?.map((slot, index) => (
                <Card
                  key={slot.calEventSlug}
                  className="group relative flex flex-col overflow-hidden border-2 transition-all hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    borderColor: event.theme?.primary,
                    boxShadow: `4px 4px 0px 0px ${event.theme?.primary}`,
                  }}
                >
                  {/* Card Header */}
                  <div
                    className="relative p-6 text-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${event.theme?.primary} 0%, #7E22CE 100%)`,
                    }}
                  >
                    {/* Decorative flowers in header */}
                    <Flower2 className="absolute top-3 left-3 h-5 w-5 text-white/20" />
                    <Flower className="absolute right-3 bottom-3 h-6 w-6 text-white/15" />

                    <p className="mb-1 text-xs font-bold tracking-widest text-white/80 uppercase">
                      Session {index + 1}
                    </p>
                    <h3 className="font-heading text-2xl">{slot.label}</h3>
                    <Badge className="mt-2 border border-white/30 bg-white/20 text-white hover:bg-white/30">
                      {slot.ageRange}
                    </Badge>
                  </div>

                  <CardContent className="flex flex-1 flex-col p-6">
                    {/* Time */}
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: event.theme?.secondary }}
                      >
                        <Clock className="h-5 w-5" style={{ color: event.theme?.primary }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Time</p>
                        <p className="font-semibold">{slot.time}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: event.theme?.secondary }}
                      >
                        <MapPin className="h-5 w-5" style={{ color: event.theme?.primary }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="font-semibold">{event.location}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <CalPopupButton
                        eventType={slot.calEventSlug}
                        className="font-heading flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 text-base shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                        style={{
                          borderColor: event.theme?.primary,
                          color: "white",
                          backgroundColor: event.theme?.primary,
                        }}
                      >
                        <Flower className="h-4 w-4" />
                        Book {slot.ageRange}
                      </CalPopupButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Event Details & What's Included */}
        <Section className="relative overflow-hidden" style={{ backgroundColor: "#FAF5FF" }}>
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
                    <Flower className="mr-1 h-3 w-3" />
                    MOTHER&apos;S DAY SPECIAL
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
                    backgroundColor: event.theme?.secondary || "#F3E8FF",
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
                          <h4 className="font-heading text-lg font-bold">CLASS TIMES</h4>
                          <div className="space-y-1">
                            {event.timeSlots?.map((slot) => (
                              <p key={slot.calEventSlug} className="text-sm">
                                <span className="font-semibold">{slot.ageRange}:</span>{" "}
                                {slot.time}
                              </p>
                            ))}
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

                    {/* Footer text */}
                    <div className="mt-auto pt-4">
                      <p className="text-center text-sm font-medium" style={{ color: event.theme?.primary }}>
                        No experience necessary. All levels welcome!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: What's Included Card */}
              <div className="relative flex flex-col">
                {/* Decorative flowers around card */}
                <FloatingFlower
                  className="absolute -top-4 -left-4 z-20 text-purple-400 opacity-70 drop-shadow-lg"
                  size="lg"
                />
                <FloatingFlower
                  className="absolute -right-2 -bottom-2 z-20 text-pink-400 opacity-60 drop-shadow-lg"
                  size="xl"
                  variant="secondary"
                />

                <Card
                  className="relative flex flex-1 flex-col overflow-hidden border-4 shadow-2xl"
                  style={{ borderColor: event.theme?.primary }}
                >
                  {/* Card Header with gradient */}
                  <div
                    className="relative p-8 text-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${event.theme?.primary} 0%, #7E22CE 100%)`,
                    }}
                  >
                    {/* Flower decorations in header */}
                    <Flower className="absolute top-4 left-4 h-6 w-6 text-white/20" />
                    <Flower2 className="absolute right-4 bottom-4 h-8 w-8 text-white/10" />

                    <p className="mb-2 text-sm font-bold tracking-widest text-white/80 uppercase">
                      Mommy & Me
                    </p>
                    <p className="font-heading text-5xl">FREE</p>
                    <p className="mt-1 text-sm font-medium tracking-wide text-white/90 uppercase">
                      for mom & child pair
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

                    {/* Who Can Attend */}
                    <p
                      className="mb-3 text-xs font-bold tracking-wider uppercase"
                      style={{ color: event.theme?.primary }}
                    >
                      Who Can Attend
                    </p>
                    <ul className="mb-6 space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <Flower className="h-3 w-3" style={{ color: event.theme?.primary }} />
                        Moms (or any maternal figure) & their kids
                      </li>
                      <li className="flex items-center gap-2">
                        <Flower className="h-3 w-3" style={{ color: event.theme?.primary }} />
                        Kids ages 3 and up
                      </li>
                      <li className="flex items-center gap-2">
                        <Flower className="h-3 w-3" style={{ color: event.theme?.primary }} />
                        No prior jiu jitsu experience needed
                      </li>
                    </ul>

                    {/* Primary CTA */}
                    <div className="mt-auto">
                      <CalPopupButton
                        eventType={event.calEventSlug}
                        className="font-heading flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 bg-white text-base shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                        style={{ borderColor: event.theme?.primary, color: event.theme?.primary }}
                      >
                        <Flower className="h-4 w-4" />
                        Reserve Your Spot
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
                        Select your child&apos;s age group when booking. Spots limited!
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
          {/* Flowers in background */}
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <Flower className="absolute top-[20%] left-[10%] h-20 w-20" />
            <Flower2 className="absolute right-[15%] bottom-[10%] h-16 w-16" />
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
                className="font-heading border-2 border-white bg-white text-purple-600 hover:bg-white/90"
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
