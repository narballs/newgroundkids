import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, PartyPopper, Users, Clock, Gift, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";

import { partyPackages, partyAddOns } from "@/data/packages";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Birthday Parties",
  description: "Host an unforgettable birthday party at NewGround Kids! Action-packed packages include games, activities, and party time. Perfect for ages 4-14 in Sherman Oaks.",
};

const highlights = [
  {
    icon: PartyPopper,
    title: "Action-Packed Fun",
    description: "Kids learn real martial arts moves through exciting games and activities",
  },
  {
    icon: Users,
    title: "Expert Hosts",
    description: "Dedicated party hosts handle everything so you can relax and enjoy",
  },
  {
    icon: Clock,
    title: "Stress-Free",
    description: "We handle setup, activities, and cleanup—you just bring the cake!",
  },
  {
    icon: Gift,
    title: "Memorable Experience",
    description: "Every birthday child feels like a champion with our special ceremony",
  },
];

export default function BirthdayPartiesPage() {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cta-bg.jpg"
              alt="Kids birthday party"
              fill
              className="object-cover"
              priority
            />
            <div className="hero-overlay absolute inset-0" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-4 shadow-hard-sm">
                <PartyPopper className="mr-2 h-4 w-4" />
                Unforgettable Celebrations
              </Badge>
              <h1 className="text-white mb-6">
                Martial Arts Birthday Parties
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Give your child a birthday they&apos;ll never forget! Action-packed fun, 
                expert instruction, and memories that last a lifetime.
              </p>
              <Button 
                size="lg" 
                variant="accent" 
                className="shadow-hard font-heading"
                asChild
              >
                <a href="#packages">
                  View Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </Container>
        </section>

        {/* Highlights */}
        <Section className="bg-muted py-10">
          <Container>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item) => (
                <div 
                  key={item.title}
                  className="flex items-start gap-4 p-4 bg-background rounded-lg border-2 border-border shadow-hard-xs"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Packages */}
        <Section id="packages" className="bg-background scroll-mt-20">
          <Container>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Party Packages</Badge>
              <h2 className="mb-4">Choose Your Party Package</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three great options to fit your celebration needs. Every package includes 
                our signature martial arts activities!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {partyPackages.map((pkg) => (
                <Card 
                  key={pkg.id}
                  className={`relative border-2 transition-all ${
                    pkg.popular 
                      ? "border-accent shadow-hard-lg scale-105" 
                      : "shadow-hard hover:shadow-hard-lg"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="accent" className="shadow-hard-sm">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className={pkg.popular ? "pt-8" : ""}>
                    <CardTitle className="font-heading text-2xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-4xl">${pkg.price}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {pkg.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Up to {pkg.maxChildren} kids
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full font-heading ${pkg.popular ? "shadow-hard" : ""}`}
                      variant={pkg.popular ? "accent" : "default"}
                      asChild
                    >
                      <a href="#inquiry">Book This Package</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Add-Ons */}
        <Section className="bg-muted">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="mb-4">Make It Extra Special</h2>
                <p className="text-muted-foreground">
                  Enhance your party with these popular add-ons
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {partyAddOns.map((addon) => (
                  <Card key={addon.id} className="border-2 shadow-hard-sm">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-heading">{addon.name}</h4>
                        <Badge variant="outline">${addon.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{addon.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* How It Works */}
        <Section className="bg-background">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">How It Works</h2>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Choose", desc: "Pick your package and date" },
                  { step: "2", title: "Confirm", desc: "We'll hold your spot with a deposit" },
                  { step: "3", title: "Invite", desc: "We'll send you digital invitations" },
                  { step: "4", title: "Celebrate!", desc: "Show up and enjoy the fun" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-heading text-2xl shadow-hard">
                      {item.step}
                    </div>
                    <h4 className="font-heading text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Inquiry CTA */}
        <Section id="inquiry" className="bg-primary text-primary-foreground scroll-mt-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-primary-foreground mb-6">
                Ready to Book Your Party?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Contact us to check availability and reserve your date. Weekend 
                parties fill up fast—book early!
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
                    Call to Book
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
                Recommended booking: 2-3 weeks in advance
              </p>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
      <StickyMobileCTA primaryText="Book Party" primaryHref="#inquiry" />
    </>
  );
}
