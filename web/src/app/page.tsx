import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, PartyPopper, Tent, Building, CheckCircle, Calendar, Users, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { PackageCard } from "@/components/cards/package-card";
import { CampCard } from "@/components/cards/camp-card";

import { siteConfig } from "@/config/site";
import { partyPackages } from "@/data/packages";
import { getFeaturedCamps, getOpenCamps } from "@/data/camps";
import { getFeaturedTestimonials } from "@/data/testimonials";

const eventTypes = [
  {
    icon: PartyPopper,
    title: "Birthday Parties",
    description: "Action-packed martial arts parties with games, activities, and unforgettable memories.",
    href: "/birthday-parties",
    cta: "View Packages",
    accent: true,
  },
  {
    icon: Tent,
    title: "Camps",
    description: "Summer, holiday, and school break camps filled with activities, games, and new friends.",
    href: "/camps",
    cta: "See Schedule",
    accent: false,
  },
  {
    icon: Building,
    title: "Private Events",
    description: "Rent our space for team parties, scout troops, corporate family days, and more.",
    href: "/private-events",
    cta: "Request Quote",
    accent: false,
  },
];

const whyChooseUs = [
  {
    icon: Users,
    title: "Professional Staff",
    description: "Experienced party hosts who make every event run smoothly.",
  },
  {
    icon: Star,
    title: "5-Star Experience",
    description: "Hundreds of happy families and glowing reviews.",
  },
  {
    icon: Clock,
    title: "Stress-Free Planning",
    description: "We handle setup, activities, and cleanup. You enjoy the party!",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Simple online booking with transparent pricing.",
  },
];

export default function HomePage() {
  const featuredCamps = getFeaturedCamps().slice(0, 2);
  const openCamps = getOpenCamps().slice(0, 2);
  const campsToShow = featuredCamps.length > 0 ? featuredCamps : openCamps;
  const featuredTestimonials = getFeaturedTestimonials().slice(0, 3);

  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Kids having fun at a party"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="hero-overlay absolute inset-0" />
          </div>

          {/* Content */}
          <Container className="relative z-10 py-20 lg:py-32">
            <div className="max-w-3xl">
              {/* Badge */}
              <Badge 
                variant="accent" 
                className="mb-6 animate-slide-down shadow-hard-sm"
              >
                Sherman Oaks, CA • Ages 4-14
              </Badge>

              {/* Headline */}
              <h1 className="text-white mb-6 animate-slide-up">
                Epic Parties & Camps
                <span className="block text-accent">For Kids</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl animate-slide-up animation-delay-200">
                Unforgettable birthday parties and action-packed camps. 
                Safe, fun, and stress-free for parents!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-300">
                <Button 
                  size="lg" 
                  variant="accent" 
                  className="shadow-hard font-heading text-lg"
                  asChild
                >
                  <Link href="/birthday-parties">
                    Plan Your Party
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-primary font-heading text-lg"
                  asChild
                >
                  <Link href="/camps">
                    Explore Camps
                  </Link>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="mt-12 flex flex-wrap items-center gap-6 animate-slide-up animation-delay-500">
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Packages from $299</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Setup & cleanup included</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Safe, supervised fun</span>
                </div>
              </div>
            </div>
          </Container>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle">
            <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse-soft" />
            </div>
          </div>
        </section>

        {/* Event Types Section */}
        <Section className="bg-background">
          <Container>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Our Events</Badge>
              <h2 className="mb-4">Unforgettable Experiences</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From epic birthday parties to action-packed camps, we create 
                memories your kids will talk about for years.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {eventTypes.map((event, index) => (
                <Card 
                  key={event.title} 
                  className={`group relative overflow-hidden transition-all hover:shadow-hard-lg animate-slide-up animation-delay-${(index + 1) * 100} ${event.accent ? 'border-accent border-2' : ''}`}
                >
                  {event.accent && (
                    <Badge variant="accent" className="absolute top-4 right-4 z-10">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4 border-2 border-border shadow-hard-xs group-hover:bg-accent/20 transition-colors">
                      <event.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-heading text-xl mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <Button 
                      variant={event.accent ? "accent" : "outline"} 
                      className="w-full font-heading"
                      asChild
                    >
                      <Link href={event.href}>
                        {event.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Party Packages Preview */}
        <Section className="bg-muted">
          <Container>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Birthday Packages</Badge>
              <h2 className="mb-4">Choose Your Party Package</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All packages include a dedicated party host, setup & cleanup, 
                and action-packed activities your kids will love.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {partyPackages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  className={`animate-slide-up animation-delay-${(index + 1) * 100}`}
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" size="lg" className="font-heading" asChild>
                <Link href="/birthday-parties">
                  View Full Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>

        {/* Why Choose Us */}
        <Section className="bg-background">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-border shadow-hard-lg">
                  <Image
                    src="/images/about-bg.jpg"
                    alt="Kids having fun at NewGround Kids"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-accent text-accent-foreground p-4 md:p-6 rounded-lg shadow-hard border-2 border-border rotate-sticker-right">
                  <div className="font-heading text-2xl md:text-3xl">500+</div>
                  <div className="text-sm">Happy Parties</div>
                </div>
              </div>

              {/* Content */}
              <div>
                <Badge variant="outline" className="mb-4">Why Parents Love Us</Badge>
                <h2 className="mb-6">Stress-Free Events, Happy Kids</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We handle everything so you can relax and enjoy watching your 
                  kids have the time of their lives. Professional staff, clean 
                  facility, and activities kids actually love.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {whyChooseUs.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center border-2 border-border shadow-hard-xs">
                        <item.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-heading text-lg mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="mt-8 font-heading shadow-hard" asChild>
                  <Link href="/about">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Upcoming Camps */}
        {campsToShow.length > 0 && (
          <Section className="bg-muted">
            <Container>
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">Camps</Badge>
                <h2 className="mb-4">Upcoming Camps</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Action-packed day camps during school breaks. 
                  Register early—spots fill up fast!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {campsToShow.map((camp, index) => (
                  <CampCard
                    key={camp.id}
                    camp={camp}
                    className={`animate-slide-up animation-delay-${(index + 1) * 100}`}
                  />
                ))}
              </div>

              <div className="text-center mt-10">
                <Button variant="outline" size="lg" className="font-heading" asChild>
                  <Link href="/camps">
                    View All Camps
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Container>
          </Section>
        )}

        {/* Testimonials */}
        <Section className="bg-background">
          <Container>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Reviews</Badge>
              <h2 className="mb-4">What Parents Are Saying</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don&apos;t just take our word for it. Hear from families 
                who&apos;ve celebrated with us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  className={`animate-slide-up animation-delay-${(index + 1) * 100}`}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section className="bg-primary text-primary-foreground relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-checkerboard-dark opacity-30" />
          
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-primary-foreground mb-6">
                Ready to Plan Your Event?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Book a birthday party, register for camp, or inquire about 
                private events. We can&apos;t wait to help you celebrate!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="accent" 
                  className="shadow-hard font-heading text-lg"
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
                  <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                    Call {siteConfig.contact.phone}
                  </a>
                </Button>
              </div>

              {/* Location */}
              <div className="mt-10 inline-flex items-center gap-2 text-primary-foreground/70">
                <MapPin className="h-5 w-5" />
                <span>{siteConfig.contact.fullAddress}</span>
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
