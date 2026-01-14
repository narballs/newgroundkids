import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Users,
  Heart,
  Shield,
  Calendar,
  MapPin,
  PartyPopper,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";

import { siteConfig } from "@/config/site";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about NewGround Kids, Sherman Oaks' premier kids event venue. Birthday parties, camps, and private events in a safe, fun environment.",
};

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Clean facility, trained staff, and supervised activities ensure every child has a safe experience.",
  },
  {
    icon: PartyPopper,
    title: "Epic Fun",
    description:
      "Action-packed activities that keep kids engaged, entertained, and talking about it for weeks.",
  },
  {
    icon: Heart,
    title: "Stress-Free for Parents",
    description:
      "We handle everything—setup, activities, cleanup—so you can relax and enjoy the celebration.",
  },
  {
    icon: Star,
    title: "Memorable Experiences",
    description: "Every event is designed to create lasting memories for kids and families alike.",
  },
];

const stats = [
  { value: "500+", label: "Events Hosted" },
  { value: "10,000+", label: "Happy Kids" },
  { value: "4.9", label: "Google Rating" },
  { value: "100%", label: "Would Recommend" },
];

export default function AboutPage() {
  // Images for the diagonal slices hero (using Vercel Blob storage)
  const heroSlices = [
    { src: images.backgrounds.about, alt: "Kids having fun at NewGround Kids" },
    { src: images.birthday.DSC00808, alt: "Birthday party celebration" },
    { src: images.birthday.DSC06067, alt: "Kids activities" },
  ];

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section - Diagonal Slices */}
        <section className="relative min-h-[60vh] overflow-hidden bg-black lg:min-h-[65vh]">
          {/* Desktop: Diagonal Slices */}
          <div className="absolute inset-0 hidden h-full w-full md:block">
            <div
              className="absolute inset-0 flex"
              style={{
                left: "-5%",
                right: "-5%",
                width: "110%",
                gap: "20px",
              }}
            >
              {heroSlices.map((slice, index) => (
                <div
                  key={index}
                  className="group relative h-full flex-1 overflow-hidden"
                  style={{ transform: "skewX(-8deg)" }}
                >
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      transform: "skewX(8deg) scale(1.2)",
                      transformOrigin: "center center",
                    }}
                  >
                    <Image
                      src={slice.src}
                      alt={slice.alt}
                      fill
                      className="object-cover object-center brightness-[0.7] transition-all duration-700 group-hover:scale-105 group-hover:brightness-85"
                      priority={index < 2}
                      sizes="50vw"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"
                    style={{ transform: "skewX(8deg)", transformOrigin: "center center" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Single Image */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src={images.backgrounds.about}
              alt="Kids having fun at NewGround Kids"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center">
            <Container>
              <div className="max-w-3xl">
                {/* Badge */}
                <Badge variant="accent" className="animate-slide-down mb-6 shadow-lg">
                  <MapPin className="mr-2 h-4 w-4" />
                  Sherman Oaks, CA
                </Badge>

                {/* Text with backdrop for readability */}
                <div className="relative inline-block">
                  <div className="absolute -inset-4 -z-10 rounded-2xl bg-black/50 backdrop-blur-sm md:-inset-6" />
                  <h1 className="animate-slide-up mb-4 text-white">
                    Where Kids&apos; Best Memories Are Made
                  </h1>
                  <p className="animate-slide-up animation-delay-100 max-w-2xl text-lg text-white/90 md:text-xl">
                    NewGround Kids is Sherman Oaks&apos; premier kids event venue. We specialize in
                    epic birthday parties, action-packed camps, and unforgettable private events.
                  </p>
                </div>
              </div>
            </Container>
          </div>
        </section>

        {/* Stats Bar */}
        <Section className="bg-primary text-primary-foreground py-8">
          <Container>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-3xl md:text-4xl">{stat.value}</div>
                  <span className="text-primary-foreground/70 text-sm tracking-wide uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Our Story */}
        <Section className="bg-background">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="outline" className="mb-4">
                  Our Story
                </Badge>
                <h2 className="mb-6">From Academy to Event Venue</h2>
                <div className="text-muted-foreground space-y-4 text-lg">
                  <p>
                    NewGround Kids started as a simple idea: use our amazing facility to host the
                    most epic birthday parties kids have ever experienced. What began as a few
                    weekend parties has grown into Sherman Oaks&apos; go-to venue for kids&apos;
                    events.
                  </p>
                  <p>
                    Located inside New Ground Jiu Jitsu, our space features professional padded
                    mats, obstacle equipment, and a dedicated party room—everything you need for
                    action-packed fun in a safe environment.
                  </p>
                  <p>
                    Today, we host hundreds of events each year, from birthday parties and summer
                    camps to team celebrations and private group events. Our mission is simple:
                    create unforgettable experiences for kids while making life easy for parents.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="border-border shadow-hard-lg aspect-square overflow-hidden rounded-lg border-2">
                  <Image
                    src={images.backgrounds.programs}
                    alt="Kids at NewGround Kids"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-accent text-accent-foreground shadow-hard border-border absolute -right-6 -bottom-6 rounded-lg border-2 p-6">
                  <div className="font-heading text-3xl">Est. 2021</div>
                  <div className="text-sm">Sherman Oaks</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Values */}
        <Section className="bg-muted">
          <Container>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                Why Parents Choose Us
              </Badge>
              <h2 className="mb-4">What Makes Us Different</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <Card key={value.title} className="shadow-hard border-2">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="bg-accent/10 border-border shadow-hard-xs flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border-2">
                        <value.icon className="text-accent h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-heading mb-2 text-xl">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* What We Offer */}
        <Section className="bg-background">
          <Container>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                Our Services
              </Badge>
              <h2 className="mb-4">What We Offer</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-accent/10 border-border mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2">
                  <PartyPopper className="text-accent h-8 w-8" />
                </div>
                <h3 className="font-heading mb-3 text-xl">Birthday Parties</h3>
                <p className="text-muted-foreground mb-4">
                  Action-packed parties with games, activities, and all-inclusive packages. The
                  party they&apos;ll talk about for years!
                </p>
                <Button variant="outline" asChild>
                  <Link href="/birthday-parties">View Packages</Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="bg-accent/10 border-border mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2">
                  <Calendar className="text-accent h-8 w-8" />
                </div>
                <h3 className="font-heading mb-3 text-xl">Camps</h3>
                <p className="text-muted-foreground mb-4">
                  Summer, holiday, and school break camps filled with activities, games, and new
                  friends. Full and half-day options.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/camps">See Schedule</Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="bg-accent/10 border-border mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2">
                  <Users className="text-accent h-8 w-8" />
                </div>
                <h3 className="font-heading mb-3 text-xl">Private Events</h3>
                <p className="text-muted-foreground mb-4">
                  Rent our space for team parties, scout troops, corporate family days, and more.
                  Custom packages available.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/private-events">Learn More</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Our Facility */}
        <Section className="bg-muted">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="border-border shadow-hard-lg relative aspect-video overflow-hidden rounded-lg border-2">
                <Image
                  src={images.events.venue1}
                  alt="NewGround Kids facility with professional padded mats and obstacle equipment"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <Badge variant="outline" className="mb-4">
                  <MapPin className="mr-2 h-4 w-4" />
                  Our Facility
                </Badge>
                <h2 className="mb-6">Purpose-Built for Fun</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Our 3,000+ sq ft facility features professional-grade padded mats, obstacle
                    course equipment, and a dedicated party room with seating for parents and
                    guests.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    "Professional padded mats",
                    "Obstacle course equipment",
                    "Dedicated party room",
                    "Climate controlled",
                    "Clean restrooms",
                    "Free parking",
                    "Parent viewing area",
                    "Sound system",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="text-success h-4 w-4 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-accent mt-1 h-5 w-5 shrink-0" />
                    <div>
                      <div className="font-medium">{siteConfig.contact.fullAddress}</div>
                      <a
                        href={siteConfig.contact.addressLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent text-sm hover:underline"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section className="bg-primary text-primary-foreground">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-primary-foreground mb-6">Ready to Plan Your Event?</h2>
              <p className="text-primary-foreground/80 mb-8 text-xl">
                Whether it&apos;s a birthday party, camp registration, or private event, we&apos;re
                here to make it amazing. Let&apos;s get started!
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="accent" className="shadow-hard font-heading" asChild>
                  <Link href="/birthday-parties">
                    Plan a Party
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-heading"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
      <StickyMobileCTA primaryHref="/birthday-parties" primaryText="Book Now" />
    </>
  );
}
