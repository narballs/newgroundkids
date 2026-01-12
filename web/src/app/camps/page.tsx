import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Users, Sun, Snowflake, Flower, Phone, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";

import { camps, getUpcomingCamps, getFeaturedCamps, type Camp } from "@/data/camps";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Kids Camps",
  description: "Summer, winter, and spring break camps for kids ages 5-12. Action-packed activities, games, and fun! Full and half-day options in Sherman Oaks, CA.",
};

const campTypeIcons = {
  summer: Sun,
  winter: Snowflake,
  spring: Flower,
  holiday: Calendar,
};

const statusColors = {
  upcoming: "default",
  open: "success",
  filling: "warning",
  full: "destructive",
  completed: "secondary",
} as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function CampCard({ camp }: { camp: Camp }) {
  const Icon = campTypeIcons[camp.type];
  const isEarlyBird = camp.earlyBirdDeadline && new Date(camp.earlyBirdDeadline) > new Date();

  return (
    <Card className={`border-2 shadow-hard transition-all hover:shadow-hard-lg ${
      camp.status === "full" ? "opacity-75" : ""
    }`}>
      {camp.featured && (
        <div className="absolute -top-3 -right-3">
          <Badge variant="accent" className="shadow-hard-sm rotate-sticker-right">
            Featured
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-accent" />
            <CardTitle className="font-heading text-xl">{camp.name}</CardTitle>
          </div>
          <Badge variant={camp.status === "full" ? "destructive" : camp.status === "filling" ? "warning" : "outline"}>
            {camp.status === "full" ? "Sold Out" : 
             camp.status === "filling" ? "Filling Fast" : 
             `${camp.spotsRemaining} spots`}
          </Badge>
        </div>
        <CardDescription>{camp.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(camp.startDate)} - {formatDate(camp.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{camp.schedule}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Ages {camp.ageRange}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-baseline justify-between">
            <div>
              {isEarlyBird && camp.earlyBirdPrice ? (
                <>
                  <span className="font-heading text-2xl text-accent">${camp.earlyBirdPrice}</span>
                  <span className="text-muted-foreground line-through ml-2">${camp.price}</span>
                </>
              ) : (
                <span className="font-heading text-2xl">${camp.price}</span>
              )}
            </div>
            {isEarlyBird && (
              <Badge variant="accent" className="text-xs">
                Early Bird ends {formatDate(camp.earlyBirdDeadline!)}
              </Badge>
            )}
          </div>
        </div>

        {camp.highlights && (
          <ul className="mt-4 space-y-1">
            {camp.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full font-heading"
          variant={camp.status === "full" ? "outline" : "default"}
          disabled={camp.status === "full"}
          asChild={camp.status !== "full"}
        >
          {camp.status === "full" ? (
            <span>Sold Out - Join Waitlist</span>
          ) : (
            <a href="#register">Register Now</a>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function CampsPage() {
  const upcomingCamps = getUpcomingCamps();
  const featuredCamps = getFeaturedCamps();

  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Kids summer camp"
              fill
              className="object-cover"
              priority
            />
            <div className="hero-overlay absolute inset-0" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-4 shadow-hard-sm">
                <Sun className="mr-2 h-4 w-4" />
                School Break Fun
              </Badge>
              <h1 className="text-white mb-6">
                Martial Arts Camps
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Keep your kids active, engaged, and learning during school breaks. 
                Our camps combine martial arts training with games, activities, and 
                tons of fun!
              </p>
              <Button 
                size="lg" 
                variant="accent" 
                className="shadow-hard font-heading"
                asChild
              >
                <a href="#camps">
                  View Upcoming Camps
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </Container>
        </section>

        {/* Camp Highlights */}
        <Section className="bg-muted py-10">
          <Container>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, title: "Ages 5-12", desc: "Age-appropriate activities" },
                { icon: Clock, title: "Full & Half Day", desc: "Flexible scheduling options" },
                { icon: Sun, title: "Year Round", desc: "Summer, winter & spring" },
                { icon: Check, title: "All Included", desc: "T-shirt, snacks & supervision" },
              ].map((item) => (
                <div 
                  key={item.title}
                  className="flex items-center gap-4 p-4 bg-background rounded-lg border-2 border-border shadow-hard-xs"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Upcoming Camps */}
        <Section id="camps" className="bg-background scroll-mt-20">
          <Container>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Upcoming Sessions</Badge>
              <h2 className="mb-4">2026 Camp Schedule</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Register early for the best rates and guaranteed spots. 
                Camps fill up fast!
              </p>
            </div>

            {upcomingCamps.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingCamps.map((camp) => (
                  <CampCard key={camp.id} camp={camp} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-lg border-2 border-border">
                <h3 className="font-heading text-xl mb-2">Coming Soon!</h3>
                <p className="text-muted-foreground mb-4">
                  Our 2026 camp schedule is being finalized. Join our newsletter 
                  to be the first to know when registration opens!
                </p>
                <Button asChild>
                  <Link href="/contact">Get Notified</Link>
                </Button>
              </div>
            )}
          </Container>
        </Section>

        {/* What's Included */}
        <Section className="bg-muted">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Daily Schedule</Badge>
                <h2 className="mb-6">A Typical Camp Day</h2>
                
                <div className="space-y-4">
                  {[
                    { time: "9:00 AM", activity: "Check-in & Warm-up Games" },
                    { time: "9:30 AM", activity: "Martial Arts Instruction" },
                    { time: "10:30 AM", activity: "Snack Break" },
                    { time: "11:00 AM", activity: "Team Challenges & Games" },
                    { time: "12:00 PM", activity: "Lunch (full-day) / Pickup (half-day)" },
                    { time: "1:00 PM", activity: "Creative Activities" },
                    { time: "2:00 PM", activity: "Advanced Training & Sparring" },
                    { time: "3:00 PM", activity: "Pickup / Extended Care Available" },
                  ].map((item) => (
                    <div 
                      key={item.time}
                      className="flex gap-4 p-3 bg-background rounded-lg border-2 border-border"
                    >
                      <span className="font-heading text-accent shrink-0 w-20">{item.time}</span>
                      <span>{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-border shadow-hard-lg">
                  <Image
                    src="/images/about-bg.jpg"
                    alt="Kids at camp"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground p-4 rounded-lg shadow-hard border-2 border-border rotate-sticker-left">
                  <div className="font-heading text-xl">Camp T-Shirt</div>
                  <div className="text-sm">Included!</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Register CTA */}
        <Section id="register" className="bg-primary text-primary-foreground scroll-mt-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-primary-foreground mb-6">
                Ready to Register?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Spots are limited and camps fill quickly. Contact us today to 
                secure your child&apos;s spot!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="accent" 
                  className="shadow-hard font-heading"
                  asChild
                >
                  <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call to Register
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-heading"
                  asChild
                >
                  <Link href="/contact">Send Inquiry</Link>
                </Button>
              </div>

              <p className="mt-8 text-sm text-primary-foreground/60">
                Questions? Email us at {siteConfig.contact.email}
              </p>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
      <StickyMobileCTA primaryText="Register Now" primaryHref="#register" />
    </>
  );
}
