import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  description:
    "Find answers to common questions about NewGround Kids birthday parties, camps, private events, booking, and policies.",
};

export default function FAQPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative overflow-hidden py-20 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/birthday/DSC00728.jpg"
              alt="NewGround Kids activities"
              fill
              className="object-cover brightness-[0.25]"
              priority
            />
            <div className="from-primary/80 to-primary/60 absolute inset-0 bg-gradient-to-br" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <Badge variant="accent" className="animate-slide-down mb-6 shadow-lg">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </Badge>

              {/* Text with backdrop for readability */}
              <div className="relative inline-block">
                <div className="absolute -inset-4 -z-10 rounded-2xl bg-black/40 backdrop-blur-sm md:-inset-6" />
                <h1 className="animate-slide-up mb-4 text-white">Frequently Asked Questions</h1>
                <p className="animate-slide-up animation-delay-100 text-lg text-white/90 md:text-xl">
                  Find answers to the most common questions about our birthday parties, camps, and
                  private events. Can&apos;t find what you&apos;re looking for? Just ask!
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Quick Navigation */}
        <Section className="bg-muted py-8">
          <Container>
            <div className="flex flex-wrap justify-center gap-3">
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
            <div className="mx-auto max-w-3xl space-y-12">
              {faqCategories.map((category) => {
                const categoryFaqs = getFAQsByCategory(
                  category.id as
                    | "general"
                    | "parties"
                    | "camps"
                    | "rentals"
                    | "booking"
                    | "policies"
                );
                if (categoryFaqs.length === 0) return null;

                return (
                  <div key={category.id} id={category.id} className="scroll-mt-24">
                    <h2 className="mb-6 border-b-2 pb-4">{category.label}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {categoryFaqs.map((faq) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="shadow-hard-sm data-[state=open]:shadow-hard rounded-lg border-2 px-6"
                        >
                          <AccordionTrigger className="font-heading py-4 text-left hover:no-underline">
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
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We&apos;re here to help! Reach out and we&apos;ll get back to you within 24 hours.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="font-heading shadow-hard" asChild>
                  <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="font-heading" asChild>
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
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-primary-foreground mb-6">Ready to Book Your Event?</h2>
              <p className="text-primary-foreground/80 mb-8 text-xl">
                Birthday parties, camps, private events—we&apos;ve got you covered. Let&apos;s make
                it unforgettable!
              </p>

              <Button size="lg" variant="accent" className="shadow-hard font-heading" asChild>
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
