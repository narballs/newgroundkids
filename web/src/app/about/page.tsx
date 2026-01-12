import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Users, Heart, Shield, Calendar, MapPin, PartyPopper, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about NewGround Kids, Sherman Oaks' premier kids event venue. Birthday parties, camps, and private events in a safe, fun environment.",
};

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Clean facility, trained staff, and supervised activities ensure every child has a safe experience.",
  },
  {
    icon: PartyPopper,
    title: "Epic Fun",
    description: "Action-packed activities that keep kids engaged, entertained, and talking about it for weeks.",
  },
  {
    icon: Heart,
    title: "Stress-Free for Parents",
    description: "We handle everything—setup, activities, cleanup—so you can relax and enjoy the celebration.",
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
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about-bg.jpg"
              alt="Kids having fun at NewGround Kids"
              fill
              className="object-cover"
              priority
            />
            <div className="hero-overlay absolute inset-0" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-4 shadow-hard-sm">
                Sherman Oaks, CA
              </Badge>
              <h1 className="text-white mb-6">
                Where Kids&apos; Best Memories Are Made
              </h1>
              <p className="text-xl text-white/90">
                NewGround Kids is Sherman Oaks&apos; premier kids event venue. 
                We specialize in epic birthday parties, action-packed camps, 
                and unforgettable private events.
              </p>
            </div>
          </Container>
        </section>

        {/* Stats Bar */}
        <Section className="bg-primary text-primary-foreground py-8">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-3xl md:text-4xl">{stat.value}</div>
                  <span className="text-sm text-primary-foreground/70 uppercase tracking-wide">
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Our Story</Badge>
                <h2 className="mb-6">From Academy to Event Venue</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    NewGround Kids started as a simple idea: use our amazing facility 
                    to host the most epic birthday parties kids have ever experienced. 
                    What began as a few weekend parties has grown into Sherman Oaks&apos; 
                    go-to venue for kids&apos; events.
                  </p>
                  <p>
                    Located inside New Ground Jiu Jitsu, our space features professional 
                    padded mats, obstacle equipment, and a dedicated party room—everything 
                    you need for action-packed fun in a safe environment.
                  </p>
                  <p>
                    Today, we host hundreds of events each year, from birthday parties 
                    and summer camps to team celebrations and private group events. 
                    Our mission is simple: create unforgettable experiences for kids 
                    while making life easy for parents.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-border shadow-hard-lg">
                  <Image
                    src="/images/programs-bg.jpg"
                    alt="Kids at NewGround Kids"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-hard border-2 border-border">
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
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Why Parents Choose Us</Badge>
              <h2 className="mb-4">What Makes Us Different</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="border-2 shadow-hard">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center border-2 border-border shadow-hard-xs">
                        <value.icon className="h-7 w-7 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl mb-2">{value.title}</h3>
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
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Our Services</Badge>
              <h2 className="mb-4">What We Offer</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-border">
                  <PartyPopper className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-heading text-xl mb-3">Birthday Parties</h3>
                <p className="text-muted-foreground mb-4">
                  Action-packed parties with games, activities, and all-inclusive packages. 
                  The party they&apos;ll talk about for years!
                </p>
                <Button variant="outline" asChild>
                  <Link href="/birthday-parties">View Packages</Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-border">
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-heading text-xl mb-3">Camps</h3>
                <p className="text-muted-foreground mb-4">
                  Summer, holiday, and school break camps filled with activities, 
                  games, and new friends. Full and half-day options.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/camps">See Schedule</Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 border-2 border-border">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-heading text-xl mb-3">Private Events</h3>
                <p className="text-muted-foreground mb-4">
                  Rent our space for team parties, scout troops, corporate family days, 
                  and more. Custom packages available.
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-border shadow-hard-lg">
                <Image
                  src="/images/about-bg.jpg"
                  alt="Our facility"
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
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our 3,000+ sq ft facility features professional-grade padded mats, 
                    obstacle course equipment, and a dedicated party room with seating 
                    for parents and guests.
                  </p>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
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
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <div>
                      <div className="font-medium">{siteConfig.contact.fullAddress}</div>
                      <a 
                        href={siteConfig.contact.addressLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:underline"
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
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-primary-foreground mb-6">
                Ready to Plan Your Event?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Whether it&apos;s a birthday party, camp registration, or private event, 
                we&apos;re here to make it amazing. Let&apos;s get started!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="accent" 
                  className="shadow-hard font-heading"
                  asChild
                >
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
