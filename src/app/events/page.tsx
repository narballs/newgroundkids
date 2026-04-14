import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Flower, Flower2, Sun, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  "mothers-day-2026": {
    icon: Flower,
    href: "/events/mothers-day",
    colors: { bg: "#FAF5FF", border: "#9333EA", text: "#581C87", badge: "#F3E8FF" },
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

            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Private Events Banner */}
        <Section
          className="relative overflow-hidden text-white"
          style={{ backgroundColor: "#1E293B" }}
        >
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
                className="font-heading border-2 border-white bg-white text-slate-800 hover:bg-white/90"
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
