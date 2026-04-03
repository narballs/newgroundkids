import type { Metadata } from "next";
import { getEventBySlug } from "@/data/events";
import { EventPage } from "@/components/events/event-page";

export const metadata: Metadata = {
  title: "Valentine's Day Parents Night Out",
  description:
    "Valentine's Day Parents Night Out! Drop off your kids for games, bounce house, pizza, and a movie while you enjoy date night.",
};

export default function ValentinesPage() {
  const event = getEventBySlug("valentines");
  if (!event) return null;
  return <EventPage event={event} />;
}
