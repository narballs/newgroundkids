import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Info, Heart, Flower, ArrowRight } from "lucide-react";
import { Heart, Flower2, Sun, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { upcomingEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events at NewGround Kids — Valentine's Day, Spring Fling, Summer Splash parents night out parties and more!",
};

const eventMeta: Record<string, { icon: typeof Heart; href: string; colors: { bg: string; border: string; text: string; badge: string } }> = {
  "valentines-2026": {
    icon: Heart,
    href: "/events/valentines",
    colors: { bg: "#FDF2F4", border: "#E11D48", text: "#881337", badge: "#FFE4E6" },
  },
  "spring-2026": {
    icon: Flower2,
    href: "/events/spring",
    colors: { bg: "#F0FDF4", border: "#16A34A", text: "#14532D", badge: "#DCFCE7" },
  },
  "summer-2026": {
    icon: Sun,
    href: "/events/summer",
    colors: { bg: "#FFF7ED", border: "#EA580C", text: "#7C2D12", badge: "#FFF7ED" },
  },
};

export default function EventsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <Section className="bg-white py-16 md:py-24">
          <Container>
            <div className="mb-12 text-center">
              <h1 className="font-heading mb-4 text-5xl md:text-6xl">Upcoming Events</h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                Fun-filled parents night out events throughout the year. Drop off your kids for
                games, bounce house, pizza, and a movie!
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {upcomingEvents.map((event) => {
                const meta = eventMeta[event.id];
                if (!meta) return null;
                const Icon = meta.icon;

                return (
                  <Link key={event.id} href={meta.href} className="group">
                    <Card
                      className="flex h-full flex-col border-2 transition-all group-hover:-translate-y-1 group-hover:shadow-lg"
                      style={{
                        borderColor: meta.colors.border,
                        backgroundColor: meta.colors.bg,
                      }}
                    >
                      <CardContent className="flex flex-1 flex-col items-center p-6 text-center">
                        <div
                          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                          style={{ backgroundColor: meta.colors.badge }}
                        >
                          <Icon
                            className="h-8 w-8 fill-current"
                            style={{ color: meta.colors.border }}
                          />
                        </div>

                        <Badge
                          className="mb-3 border text-xs"
                          style={{
                            borderColor: meta.colors.border,
                            color: meta.colors.border,
                            backgroundColor: meta.colors.badge,
                          }}
                        >
                          {event.dayOfWeek}, {event.date}
                        </Badge>

                        <h2
                          className="font-heading mb-2 text-xl"
                          style={{ color: meta.colors.text }}
                        >
                          {event.name}
                        </h2>

                        <p className="text-muted-foreground mb-4 text-sm">{event.subtitle}</p>

                        <div className="mt-auto">
                          <span
                            className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                            style={{ color: meta.colors.border }}
                          >
                            Learn More <ArrowRight className="h-4 w-4" />
                          </span>
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

        {/* Mother's Day Upcoming Event Banner */}
        <Section className="relative overflow-hidden" style={{ backgroundColor: "#FAF5FF" }}>
          {/* Decorative flowers */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <Flower className="absolute top-[15%] left-[8%] h-12 w-12 text-purple-400" />
            <Flower className="absolute right-[10%] bottom-[15%] h-16 w-16 text-pink-400" />
            <Flower className="absolute top-[40%] right-[25%] h-8 w-8 text-purple-300" />
          </div>

          <Container>
            <div className="relative flex flex-col items-center justify-between gap-8 rounded-2xl border-2 border-purple-300 bg-white p-8 shadow-[8px_8px_0px_0px_#9333EA] md:flex-row">
              <div className="flex-1 text-center md:text-left">
                <Badge className="mb-3 border-2 border-purple-300 bg-purple-50 text-purple-600">
                  <Flower className="mr-1 h-3 w-3" />
                  COMING UP NEXT
                </Badge>
                <h2 className="font-heading mb-3 text-3xl text-purple-900">
                  Mother&apos;s Day Mommy &amp; Me Jiu Jitsu
                </h2>
                <p className="max-w-xl text-purple-700/80">
                  Sunday, May 10th — A free Mommy &amp; Me jiu jitsu class for ages 3+. Three time
                  slots organized by age group.
                </p>
              </div>
              <Button
                size="lg"
                className="font-heading border-2 border-purple-600 bg-purple-600 text-white hover:bg-purple-700"
                asChild
              >
                <Link href="/events/mothers-day" className="inline-flex items-center gap-2">
                  View Mother&apos;s Day Event
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
