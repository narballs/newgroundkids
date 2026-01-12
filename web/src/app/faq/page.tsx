import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";

import { faqCategories, getFAQsByCategory } from "@/data/faqs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about NewGround Kids birthday parties, camps, private events, booking, and policies.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Section className="bg-primary text-primary-foreground py-16 lg:py-20">
          <Container>
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-4 shadow-hard-sm">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </Badge>
              <h1 className="text-primary-foreground mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Find answers to the most common questions about our birthday parties, 
                camps, and private events. Can&apos;t find what you&apos;re looking for? 
                Just ask!
              </p>
            </div>
          </Container>
        </Section>

        {/* Quick Navigation */}
        <Section className="bg-muted py-8">
          <Container>
            <div className="flex flex-wrap gap-3 justify-center">
              {faqCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className="font-heading"
                  asChild
                >
                  <a href={`#${category.id}`}>{category.label}</a>
                </Button>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ Sections */}
        <Section className="bg-background">
          <Container>
            <div className="max-w-3xl mx-auto space-y-12">
              {faqCategories.map((category) => {
                const categoryFaqs = getFAQsByCategory(category.id as "general" | "parties" | "camps" | "rentals" | "booking" | "policies");
                if (categoryFaqs.length === 0) return null;

                return (
                  <div key={category.id} id={category.id} className="scroll-mt-24">
                    <h2 className="mb-6 pb-4 border-b-2">{category.label}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {categoryFaqs.map((faq) => (
                        <AccordionItem 
                          key={faq.id} 
                          value={faq.id}
                          className="border-2 rounded-lg shadow-hard-sm px-6 data-[state=open]:shadow-hard"
                        >
                          <AccordionTrigger className="text-left font-heading hover:no-underline py-4">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Still Have Questions */}
        <Section className="bg-muted">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mb-4">Still Have Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We&apos;re here to help! Reach out and we&apos;ll get back to you 
                within 24 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="font-heading shadow-hard"
                  asChild
                >
                  <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="font-heading"
                  asChild
                >
                  <Link href="/contact">
                    Send a Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section className="bg-primary text-primary-foreground">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-primary-foreground mb-6">
                Ready to Book Your Event?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Birthday parties, camps, private events—we&apos;ve got you covered. 
                Let&apos;s make it unforgettable!
              </p>
              
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
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
      <StickyMobileCTA primaryHref="/birthday-parties" primaryText="Book Now" />
    </>
  );
}
