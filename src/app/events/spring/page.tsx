import type { Metadata } from "next";
import { getEventBySlug } from "@/data/events";
import { EventPage } from "@/components/events/event-page";

export const metadata: Metadata = {
  title: "Spring Fling Parents Night Out",
  description:
    "Spring Fling Parents Night Out! Drop off your kids for spring-themed games, bounce house, pizza, and a movie while you enjoy a night out.",
};

export default function SpringPage() {
  const event = getEventBySlug("spring");
  if (!event) return null;
  return <EventPage event={event} />;
}
