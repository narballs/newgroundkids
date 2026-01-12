import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { ContactForm } from "@/components/forms/contact-form";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with NewGround Kids. Book birthday parties, camps, or ask about private events. Located in Sherman Oaks, CA.",
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
        {/* Hero Section */}
        <Section className="bg-primary text-primary-foreground py-16 lg:py-20">
          <Container>
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-4 shadow-hard-sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Get In Touch
              </Badge>
              <h1 className="text-primary-foreground mb-6">Contact Us</h1>
              <p className="text-xl text-primary-foreground/80">
                Have questions about our programs? Want to schedule a tour? 
                We&apos;d love to hear from you!
              </p>
            </div>
          </Container>
        </Section>

        {/* Contact Methods */}
        <Section className="bg-muted py-10">
          <Container>
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method) => (
                <Card key={method.title} className="border-2 shadow-hard">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center border-2 border-border">
                        <method.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg mb-1">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <p className="font-medium text-sm mb-3">{method.value}</p>
                        <Button variant="outline" size="sm" className="font-heading" asChild>
                          <a href={method.href} target={method.title === "Visit" ? "_blank" : undefined}>
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
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="mb-6">Send Us a Message</h2>
                <Card className="border-2 shadow-hard">
                  <CardContent className="pt-6">
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>

              {/* Info */}
              <div>
                <h2 className="mb-6">Business Hours</h2>
                <Card className="border-2 shadow-hard mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-6">
                      <Clock className="h-6 w-6 text-accent shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-heading text-lg mb-3">When We&apos;re Open</h4>
                        <div className="space-y-2">
                          {siteConfig.hours.detailed.map((day) => (
                            <div 
                              key={day.day}
                              className="flex justify-between py-2 border-b last:border-0"
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

                <Card className="border-2 shadow-hard bg-accent/10">
                  <CardContent className="pt-6">
                    <h4 className="font-heading text-lg mb-3">Quick Response Guarantee</h4>
                    <p className="text-muted-foreground mb-4">
                      We respond to all inquiries within 24 hours during business days. 
                      For urgent matters, please call us directly.
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
            <div className="text-center mb-8">
              <h2 className="mb-4">Find Us</h2>
              <p className="text-muted-foreground">
                Located in Sherman Oaks, easily accessible from Studio City, Encino, and Van Nuys
              </p>
            </div>
            
            <div className="aspect-[21/9] rounded-lg overflow-hidden border-2 border-border shadow-hard-lg">
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
