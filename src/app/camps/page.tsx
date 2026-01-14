import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ComingSoonPage } from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Kids Camps - Coming Soon",
  description:
    "Summer, winter, and spring break camps for kids ages 4-12. Action-packed activities, games, and martial arts fun! Sign up to be notified when registration opens.",
};

export default function CampsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <ComingSoonPage
          title="Kids Camps"
          subtitle="Summer & Holiday Camps for Ages 4-12"
          description="Action-packed days of martial arts training, games, team challenges, and making new friends. Registration opening soon!"
          heroImage={{
            src: "/images/camps/hero.jpg",
            alt: "Kids training at New Ground Kids martial arts camp",
          }}
          secondaryImages={[
            {
              src: "/images/camps/training-1.jpg",
              alt: "Kids learning martial arts techniques",
            },
            {
              src: "/images/camps/training-2.jpg",
              alt: "Instructor teaching young students",
            },
            {
              src: "/images/camps/hero.jpg",
              alt: "Group training session",
            },
          ]}
          burstText="COMING SOON!"
          burstColor="yellow"
          showContactLink={true}
          contactLinkText="Have questions about our camps? Contact us"
        />
      </main>

      <Footer />
    </>
  );
}
