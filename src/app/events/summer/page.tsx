import type { Metadata } from "next";
import { getEventBySlug } from "@/data/events";
import { EventPage } from "@/components/events/event-page";

export const metadata: Metadata = {
  title: "Summer Splash Parents Night Out",
  description:
    "Summer Splash Parents Night Out! Drop off your kids for summer-themed games, bounce house, pizza, and a movie while you enjoy a free evening.",
};

export default function SummerPage() {
  const event = getEventBySlug("summer");
  if (!event) return null;
  return <EventPage event={event} />;
}
