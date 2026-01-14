import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { ContactForm } from "@/components/forms/contact-form";

import { siteConfig } from "@/config/site";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with NewGround Kids. Book birthday parties, camps, or ask about private events. Located in Sherman Oaks, CA.",
};

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    description: "Call us during business hours",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phoneRaw}`,
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    description: "We'll respond within 24 hours",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    action: "Send Email",
  },
  {
    icon: MapPin,
    title: "Visit",
    description: "Drop by during business hours",
    value: siteConfig.contact.fullAddress,
    href: siteConfig.contact.addressLink,
    action: "Get Directions",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={images.birthday.DSC00771}
              alt="NewGround Kids facility"
              fill
              className="object-cover brightness-[0.3]"
              priority
            />
            <div className="from-primary/90 to-primary/70 absolute inset-0 bg-gradient-to-r" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <Badge variant="accent" className="animate-slide-down mb-6 shadow-lg">
                <MessageSquare className="mr-2 h-4 w-4" />
                Get In Touch
              </Badge>

              {/* Text with backdrop for readability */}
              <div className="relative inline-block">
                <div className="absolute -inset-4 -z-10 rounded-2xl bg-black/40 backdrop-blur-sm md:-inset-6" />
                <h1 className="animate-slide-up mb-4 text-white">Contact Us</h1>
                <p className="animate-slide-up animation-delay-100 text-lg text-white/90 md:text-xl">
                  Have questions about our programs? Want to schedule a tour? We&apos;d love to hear
                  from you!
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact Methods */}
        <Section className="bg-muted py-10">
          <Container>
            <div className="grid gap-6 md:grid-cols-3">
              {contactMethods.map((method) => (
                <Card key={method.title} className="shadow-hard border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/10 border-border flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2">
                        <method.icon className="text-accent h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading mb-1 text-lg">{method.title}</h3>
                        <p className="text-muted-foreground mb-2 text-sm">{method.description}</p>
                        <p className="mb-3 text-sm font-medium">{method.value}</p>
                        <Button variant="outline" size="sm" className="font-heading" asChild>
                          <a
                            href={method.href}
                            target={method.title === "Visit" ? "_blank" : undefined}
                          >
                            {method.action}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Contact Form & Info */}
        <Section className="bg-background">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Form */}
              <div>
                <h2 className="mb-6">Send Us a Message</h2>
                <Card className="shadow-hard border-2">
                  <CardContent className="pt-6">
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>

              {/* Info */}
              <div>
                <h2 className="mb-6">Business Hours</h2>
                <Card className="shadow-hard mb-6 border-2">
                  <CardContent className="pt-6">
                    <div className="mb-6 flex items-start gap-4">
                      <Clock className="text-accent h-6 w-6 shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-heading mb-3 text-lg">When We&apos;re Open</h4>
                        <div className="space-y-2">
                          {siteConfig.hours.detailed.map((day) => (
                            <div
                              key={day.day}
                              className="flex justify-between border-b py-2 last:border-0"
                            >
                              <span className="font-medium">{day.day}</span>
                              <span>{day.hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-hard bg-accent/10 border-2">
                  <CardContent className="pt-6">
                    <h4 className="font-heading mb-3 text-lg">Quick Response Guarantee</h4>
                    <p className="text-muted-foreground mb-4">
                      We respond to all inquiries within 24 hours during business days. For urgent
                      matters, please call us directly.
                    </p>
                    <Button className="font-heading" asChild>
                      <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        {siteConfig.contact.phone}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Map */}
        <Section className="bg-muted">
          <Container>
            <div className="mb-8 text-center">
              <h2 className="mb-4">Find Us</h2>
              <p className="text-muted-foreground">
                Located in Sherman Oaks, easily accessible from Studio City, Encino, and Van Nuys
              </p>
            </div>

            <div className="border-border shadow-hard-lg aspect-[21/9] overflow-hidden rounded-lg border-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.4!2d-118.45!3d34.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA5JzAwLjAiTiAxMTjCsDI3JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NewGround Kids Location"
              />
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
}
