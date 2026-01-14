import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ComingSoonPage } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Private Events & Rentals - Coming Soon",
  description:
    "Host your team parties, scout troops, corporate family days, and special events at New Ground Kids. Contact us for inquiries.",
};

export default function PrivateEventsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <ComingSoonPage
          title="Private Events"
          subtitle="Corporate Events, Team Parties & Group Sessions"
          description="Unforgettable team building, school groups, and private celebrations. Our facility is perfect for groups of all sizes. Booking opening soon!"
          heroImage={{
            src: "/images/events/hero.jpg",
            alt: "Kids training at New Ground Kids facility",
          }}
          secondaryImages={[
            {
              src: "/images/events/venue-1.jpg",
              alt: "Photo booth setup for events",
            },
            {
              src: "/images/events/action-1.jpg",
              alt: "Kids sparring during event",
            },
            {
              src: "/images/events/hero.jpg",
              alt: "Training session",
            },
          ]}
          burstText="COMING SOON!"
          burstColor="red"
          showContactLink={true}
          contactLinkText="Interested in booking? Contact us for inquiries"
        />
      </main>

      <Footer />
    </>
  );
}
