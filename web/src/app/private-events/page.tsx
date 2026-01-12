import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Calendar, Building, PartyPopper, Heart, Tent, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Private Events & Rentals",
  description: "Rent our space for private events, team parties, scout troops, corporate family days, and more. Contact us for a custom quote.",
};

const useCases = [
  {
    icon: Users,
    title: "Team Parties",
    description: "Celebrate your sports team's season or achievement with an action-packed party.",
    examples: ["Soccer teams", "Baseball teams", "Dance troupes", "Cheer squads"],
  },
  {
    icon: Heart,
    title: "Scout Troops",
    description: "Perfect venue for scout meetings, badge activities, and troop celebrations.",
    examples: ["Boy Scouts", "Girl Scouts", "Cub Scouts", "Troop outings"],
  },
  {
    icon: Building,
    title: "Corporate Family Days",
    description: "Host your company's family event in a fun, engaging environment.",
    examples: ["Employee appreciation", "Family fun days", "Team building", "Holiday parties"],
  },
  {
    icon: Tent,
    title: "Homeschool Groups",
    description: "Active learning and socialization for homeschool co-ops and groups.",
    examples: ["PE classes", "Field trips", "Social events", "Group activities"],
  },
  {
    icon: PartyPopper,
    title: "Holiday Events",
    description: "Celebrate holidays with a themed event your kids will remember.",
    examples: ["Halloween parties", "New Year's Eve", "End of school", "Graduation parties"],
  },
  {
    icon: Calendar,
    title: "Special Occasions",
    description: "Any occasion worth celebrating, we can host it!",
    examples: ["Milestone celebrations", "Reunions", "Award ceremonies", "Fundraisers"],
  },
];

const included = [
  "Exclusive use of facility",
  "Professional staff on-site",
  "Mats and equipment access",
  "Party room availability",
  "Setup and cleanup",
  "Tables and chairs",
  "Sound system access",
  "Climate controlled space",
];

const pricingTiers = [
  {
    name: "Hourly",
    price: "150",
    unit: "per hour",
    description: "Minimum 2 hours",
    best: false,
  },
  {
    name: "Half Day",
    price: "500",
    unit: "4 hours",
    description: "Most popular for groups",
    best: true,
  },
  {
    name: "Full Day",
    price: "900",
    unit: "8 hours",
    description: "Best for large events",
    best: false,
  },
];

export default function PrivateEventsPage() {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        <PageHero
          title="Private Events & Rentals"
          subtitle="Rent our space for team parties, scout troops, corporate events, and more. Custom packages available."
          backgroundImage="/images/about-bg.jpg"
        />

        {/* Intro Section */}
        <Section className="bg-background">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">Your Event, Your Way</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Looking for a unique venue for your group event? Our facility offers 
                a fun, active environment perfect for kids of all ages. Whether you&apos;re 
                planning a team celebration, scout outing, or corporate family day, 
                we&apos;ve got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-base px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2 text-success" />
                  Clean, Safe Facility
                </Badge>
                <Badge variant="outline" className="text-base px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2 text-success" />
                  Professional Staff
                </Badge>
                <Badge variant="outline" className="text-base px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2 text-success" />
                  Flexible Scheduling
                </Badge>
              </div>
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section className="bg-muted">
          <Container>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Perfect For</Badge>
              <h2 className="mb-4">Event Ideas</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our versatile space works for all kinds of group events. 
                Here are just a few ideas to get you started.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <Card 
                  key={useCase.title}
                  className={`animate-slide-up animation-delay-${(index + 1) * 100}`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 border-2 border-border shadow-hard-xs">
                      <useCase.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-heading text-xl mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-4">{useCase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.examples.map((example) => (
                        <Badge key={example} variant="secondary" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* What's Included */}
        <Section className="bg-background">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-border shadow-hard-lg">
                  <Image
                    src="/images/about-bg.jpg"
                    alt="Our facility"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <Badge variant="outline" className="mb-4">Included</Badge>
                <h2 className="mb-6">Everything You Need</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  All rentals include access to our full facility and professional 
                  staff to ensure your event runs smoothly.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {included.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mt-6">
                  Additional services like instruction, activities, and catering 
                  available for an additional fee.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Pricing Overview */}
        <Section className="bg-muted">
          <Container>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Pricing</Badge>
              <h2 className="mb-4">Rental Rates</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Competitive rates for exclusive use of our facility. 
                Contact us for a custom quote based on your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <Card 
                  key={tier.name}
                  className={`text-center relative overflow-hidden animate-slide-up animation-delay-${(index + 1) * 100} ${tier.best ? 'border-accent border-2' : ''}`}
                >
                  {tier.best && (
                    <Badge variant="accent" className="absolute top-4 right-4">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-6 pt-8">
                    <h3 className="font-heading text-xl mb-2">{tier.name}</h3>
                    <div className="mb-4">
                      <span className="font-heading text-4xl">${tier.price}</span>
                      <span className="text-muted-foreground">/{tier.unit}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              * Prices may vary based on day, time, and group size. 
              Contact us for an accurate quote.
            </p>
          </Container>
        </Section>

        {/* Inquiry Form */}
        <Section className="bg-background">
          <Container size="sm">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Get in Touch</Badge>
              <h2 className="mb-4">Request a Quote</h2>
              <p className="text-lg text-muted-foreground">
                Tell us about your event and we&apos;ll get back to you 
                with a custom quote within 24 hours.
              </p>
            </div>

            <ContactForm 
              title=""
              description=""
              variant="card"
              showSubject={true}
              subjects={[
                "Team Party",
                "Scout Troop Event",
                "Corporate Family Day",
                "Homeschool Group",
                "Holiday Event",
                "Other",
              ]}
            />
          </Container>
        </Section>

        {/* CTA */}
        <Section className="bg-primary text-primary-foreground">
          <Container>
            <div className="text-center">
              <h2 className="text-primary-foreground mb-6">
                Questions? We&apos;re Here to Help
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Call us to discuss your event needs or schedule a facility tour.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="accent" 
                  className="shadow-hard font-heading"
                  asChild
                >
                  <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                    Call {siteConfig.contact.phone}
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-heading"
                  asChild
                >
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
      <StickyMobileCTA primaryHref="/contact" primaryText="Get Quote" />
    </>
  );
}
