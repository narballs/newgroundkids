import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Clock,
  Users,
  PartyPopper,
  Award,
  Star,
  Check,
  Cake,
  Camera,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { ComicBurst } from "@/components/ui/comic-burst";
import { SpeechBubble, ComicPanel } from "@/components/ui/speech-bubble";
import { PackageCard, ExtrasCard } from "@/components/cards/package-card";
import { FAQSection } from "@/components/sections/faq-section";

import {
  birthdayPackages,
  birthdayExtras,
  birthdayGalleryImages,
  birthdayStats,
} from "@/data/birthday-packages";
import { siteConfig } from "@/config/site";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Birthday Parties",
  description:
    "Epic birthday parties for kids ages 4-12. Martial arts games, bounce houses, and unforgettable celebrations. Packages from $499. Book now!",
};

const partyFAQs = [
  {
    question: "What ages are your parties for?",
    answer:
      "Our birthday parties are perfect for kids ages 4-12. We tailor the activities and games to suit the age group of your party guests.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-3 weeks in advance, especially for weekend parties. Popular dates can fill up quickly!",
  },
  {
    question: "Can parents stay during the party?",
    answer:
      "Absolutely! Parents are welcome to stay and watch. We have seating areas for adults, and you're welcome to take photos and videos.",
  },
  {
    question: "What if my child has never done martial arts?",
    answer:
      "No experience needed! Our activities are designed for all skill levels. We focus on fun games that introduce basic concepts in a playful way.",
  },
  {
    question: "Can we bring our own food and cake?",
    answer:
      "Yes! You're welcome to bring your own food, cake, and decorations. The Large Party package includes pizza and drinks for all guests.",
  },
  {
    question: "What's included in the digital invitations?",
    answer:
      "We provide a professionally designed digital invitation template that you can customize and send to your guests via email or text.",
  },
];

export default function BirthdayPartiesPage() {
  // Images for the diagonal slices hero (using Vercel Blob storage)
  const heroSlices = [
    { src: images.birthday.DSC00727, alt: "Kids celebrating at birthday party" },
    { src: images.birthday.DSC00789, alt: "Party games and activities" },
    { src: images.birthday.DSC00995, alt: "Birthday celebration fun" },
  ];

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section - Diagonal Slices */}
        <section className="relative min-h-[70vh] overflow-hidden bg-black lg:min-h-[75vh]">
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
                      className="object-cover object-center brightness-[0.75] transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                      priority={index < 2}
                      sizes="50vw"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
                    style={{ transform: "skewX(8deg)", transformOrigin: "center center" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Single Image */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src={images.birthday.DSC00727}
              alt="Kids birthday party"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center">
            <Container>
              <div className="max-w-2xl">
                {/* Badge */}
                <Badge variant="accent" className="animate-slide-down mb-6 shadow-lg">
                  <PartyPopper className="mr-2 h-4 w-4" />
                  EPIC CELEBRATIONS
                </Badge>

                {/* Text with backdrop for readability */}
                <div className="relative inline-block">
                  <div className="absolute -inset-4 -z-10 rounded-2xl bg-black/50 backdrop-blur-sm md:-inset-6" />
                  <h1 className="animate-slide-up mb-4 text-white">Birthday Parties</h1>
                  <p className="animate-slide-up animation-delay-100 max-w-lg text-lg text-white/90 md:text-xl">
                    Give your child the most amazing birthday ever! Action-packed martial arts
                    games, bounce houses, and memories they&apos;ll treasure forever.
                  </p>
                </div>

                {/* CTAs */}
                <div className="animate-slide-up animation-delay-200 mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" variant="accent" className="font-heading text-lg" asChild>
                    <a href="#packages">
                      View Packages
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="lg" variant="white-outline" className="font-heading" asChild>
                    <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </Container>
          </div>

          {/* Accent Banner at Bottom */}
          <div className="bg-accent absolute right-0 bottom-0 left-0 z-30 border-t-4 border-white py-4">
            <Container>
              <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                <div className="text-white">
                  <span className="font-heading text-2xl md:text-3xl">Starting at $499</span>
                  <span className="ml-3 hidden text-white/80 sm:inline">
                    · All-inclusive packages
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <Check className="h-4 w-4" />
                  <span>Setup & Cleanup Included</span>
                  <span className="mx-2 hidden md:inline">·</span>
                  <Check className="hidden h-4 w-4 md:inline" />
                  <span className="hidden md:inline">Dedicated Party Host</span>
                </div>
              </div>
            </Container>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary border-y-4 border-black py-4">
          <Container>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {birthdayStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-2xl text-white md:text-3xl">{stat.value}</div>
                  <div className="text-xs tracking-wider text-white/70 uppercase md:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Why Choose Us */}
        <Section className="bg-background">
          <Container>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                Why Parents Love Us
              </Badge>
              <h2 className="mb-4">The Ultimate Birthday Experience</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                We handle everything so you can enjoy the party too!
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Award,
                  title: "Professional Hosts",
                  desc: "Trained instructors run all activities",
                },
                {
                  icon: Clock,
                  title: "Stress-Free",
                  desc: "Setup & cleanup included",
                },
                {
                  icon: Sparkles,
                  title: "Action-Packed",
                  desc: "Games, activities & fun!",
                },
                {
                  icon: Camera,
                  title: "Photo-Worthy",
                  desc: "Belt ceremony for birthday kid",
                },
              ].map((item) => (
                <ComicPanel key={item.title} className="p-6 text-center">
                  <div className="bg-accent/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                    <item.icon className="text-accent h-7 w-7" />
                  </div>
                  <h3 className="font-heading mb-2 text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </ComicPanel>
              ))}
            </div>
          </Container>
        </Section>

        {/* Package Cards */}
        <Section id="packages" className="bg-muted scroll-mt-20">
          <Container>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                Pricing
              </Badge>
              <h2 className="mb-4">Party Packages</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                Choose the perfect package for your celebration. All packages include setup,
                cleanup, and a dedicated party host.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-3 lg:gap-8">
              {birthdayPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package_={pkg}
                  calEventSlug={`birthday-party-${pkg.id}`}
                />
              ))}
            </div>

            {/* Deposit Note */}
            <p className="text-muted-foreground mt-8 text-center text-sm">
              All packages require a $200 deposit to reserve your date. Balance due on party day.
            </p>
          </Container>
        </Section>

        {/* Extras Section */}
        <Section className="bg-background">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              {/* Left: Extras List */}
              <div>
                <Badge variant="outline" className="mb-4">
                  Add-Ons
                </Badge>
                <h2 className="mb-4">Make It Extra Special</h2>
                <p className="text-muted-foreground mb-8">
                  Customize your party with these popular add-ons.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {birthdayExtras.map((extra) => (
                    <ExtrasCard
                      key={extra.id}
                      name={extra.name}
                      price={extra.price}
                      note={extra.note}
                      description={extra.description}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Testimonial */}
              <div className="lg:pt-12">
                <SpeechBubble author="Sarah M., Parent" className="mx-auto max-w-md">
                  <p className="text-lg">
                    &ldquo;Best birthday party we&apos;ve ever had! The kids were entertained the
                    entire time, and I actually got to relax and enjoy watching them have fun. The
                    belt ceremony was the highlight!&rdquo;
                  </p>
                  <div className="mt-3 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </SpeechBubble>
              </div>
            </div>
          </Container>
        </Section>

        {/* Photo Gallery */}
        <Section className="bg-primary">
          <Container>
            <div className="mb-12 text-center">
              <Badge variant="accent" className="mb-4">
                Gallery
              </Badge>
              <h2 className="mb-4 text-white">Party Moments</h2>
              <p className="mx-auto max-w-2xl text-lg text-white/80">
                See the fun in action! Every party is filled with smiles, excitement, and
                unforgettable memories.
              </p>
            </div>

            {/* Comic Grid */}
            <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_#14b8a6]">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {birthdayGalleryImages.slice(0, 9).map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative overflow-hidden border-4 border-black bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} `}
                  >
                    <div className={`relative ${index === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                      <Image src={image.src} alt={image.alt} fill className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* What's Included Timeline */}
        <Section className="bg-background">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left: Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[var(--shadow-soft-xl)]">
                  <Image
                    src={images.birthday.DSC00995}
                    alt="Instructor helping kids"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right: Timeline */}
              <div>
                <Badge variant="outline" className="mb-4">
                  Party Flow
                </Badge>
                <h2 className="mb-6">A Typical Party Day</h2>

                <div className="space-y-4">
                  {[
                    {
                      time: "Arrival",
                      activity: "Guests arrive, check in & warm-up games",
                      icon: PartyPopper,
                    },
                    {
                      time: "45 min",
                      activity: "Organized gameplay & martial arts activities",
                      icon: Sparkles,
                    },
                    {
                      time: "45 min",
                      activity: "Free play on mats & bounce house",
                      icon: Users,
                    },
                    {
                      time: "30+ min",
                      activity: "Party area: food, cake & presents",
                      icon: Cake,
                    },
                    {
                      time: "Finale",
                      activity: "Special belt ceremony for birthday child!",
                      icon: Award,
                    },
                  ].map((item, index) => (
                    <div key={index} className="bg-muted flex gap-4 rounded-xl p-4">
                      <div className="bg-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-heading text-accent text-sm">{item.time}</span>
                        <p className="text-sm">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ Section */}
        <Section className="bg-muted">
          <Container size="sm">
            <FAQSection
              title="Frequently Asked Questions"
              subtitle="Got questions? We've got answers."
              faqs={partyFAQs}
            />
          </Container>
        </Section>

        {/* Contact CTA */}
        <Section id="book" className="bg-primary scroll-mt-20">
          <Container size="sm">
            <div className="text-center">
              <ComicBurst
                fill="#FACC15"
                stroke="#09090B"
                strokeWidth={3}
                rotation={-5}
                size="default"
                shape="starburst"
                shadow
                shadowOffset={5}
                className="mx-auto mb-6"
              >
                BOOK
                <br />
                NOW!
              </ComicBurst>
              <h2 className="mb-4 text-white">Ready to Party?</h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
                Click &ldquo;Book&rdquo; on any package above to select your date and time.
                Questions? We&apos;re here to help!
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="white-outline" className="font-heading" asChild>
                  <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call {siteConfig.contact.phone}
                  </a>
                </Button>
                <Button size="lg" variant="accent" className="font-heading" asChild>
                  <Link href="/contact">Send a Message</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
      <StickyMobileCTA primaryText="Book Party" primaryHref="#book" />
    </>
  );
}
