import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  PartyPopper,
  Tent,
  Building,
  Calendar,
  Users,
  Clock,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { PackageCard } from "@/components/cards/package-card";
import { PhotoMarquee } from "@/components/ui/photo-marquee";

import { siteConfig } from "@/config/site";
import { birthdayPackages } from "@/data/birthday-packages";
import { getFeaturedTestimonials } from "@/data/testimonials";
import { images, birthdayGallery, heroSlides } from "@/lib/images";

// Photo gallery images for marquee (using Vercel Blob storage)
const galleryImages = [
  images.birthday.DSC00727,
  images.birthday.DSC00771,
  images.birthday.DSC00728,
  images.birthday.DSC00789,
  images.birthday.DSC00546,
  images.birthday.DSC00549,
  images.birthday.DSC00555,
  images.birthday.DSC00703,
];

const eventTypes = [
  {
    icon: PartyPopper,
    title: "Birthday Parties",
    description:
      "Action-packed martial arts parties with games, activities, and unforgettable memories.",
    href: "/birthday-parties",
    cta: "View Packages",
    accent: true,
    image: images.birthday.DSC00727,
  },
  {
    icon: Tent,
    title: "Camps",
    description:
      "Summer, holiday, and school break camps filled with activities, games, and new friends.",
    href: "/camps",
    cta: "See Schedule",
    accent: false,
    image: images.birthday.DSC06067,
  },
  {
    icon: Building,
    title: "Private Events",
    description: "Rent our space for team parties, scout troops, corporate family days, and more.",
    href: "/private-events",
    cta: "Request Quote",
    accent: false,
    image: images.birthday.DSC00789,
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
  const featuredTestimonials = getFeaturedTestimonials().slice(0, 3);

  // Images for the diagonal slices hero (using Vercel Blob storage)
  const heroSliceData = [
    { src: images.hero.slide1, alt: "Kids having a blast at camp" },
    { src: images.hero.slide4, alt: "Martial arts action" },
    { src: images.hero.slide2, alt: "Group activities" },
    { src: images.hero.slide3, alt: "Exciting party games" },
  ];

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* HERO SECTION: Diagonal Slices with Highlighted Banner */}
        <section className="relative h-[90vh] min-h-[650px] w-full overflow-hidden bg-black">
          {/* Desktop/Tablet: Diagonal Slices with clean 20px gaps */}
          <div className="absolute inset-0 hidden h-full w-full md:block">
            {/* Container for all slices - uses flexbox with gap */}
            <div
              className="absolute inset-0 flex"
              style={{
                // Extend beyond viewport to hide skew overflow
                left: "-5%",
                right: "-5%",
                width: "110%",
                gap: "20px",
              }}
            >
              {heroSliceData.map((slice, index) => (
                <div
                  key={index}
                  className="group relative h-full flex-1 overflow-hidden"
                  style={{
                    // Consistent skew angle for all slices = parallel diagonal edges
                    transform: "skewX(-8deg)",
                  }}
                >
                  {/* Counter-skew the image container */}
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
                      className="object-cover object-center brightness-[0.8] transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
                      priority={index < 2}
                      sizes="33vw"
                    />
                  </div>
                  {/* Gradient overlay for depth */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50"
                    style={{
                      transform: "skewX(8deg)",
                      transformOrigin: "center center",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Single Hero Image with overlay */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src={images.hero.slide3}
              alt="NewGround Kids Party"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>

          {/* Content Overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
            {/* Main Content Area - Vertically Centered */}
            <div className="flex flex-1 items-center">
              <Container>
                <div className="max-w-2xl pl-2 md:pl-4">
                  {/* Badge */}
                  <div className="bg-accent animate-slide-down pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-wider text-white uppercase shadow-lg">
                    <MapPin className="h-4 w-4" />
                    Sherman Oaks · Ages 4-14
                  </div>

                  {/* Main Headline */}
                  <div className="relative mt-8">
                    <div className="absolute -inset-4 -z-10 rounded-2xl bg-black/50 backdrop-blur-sm md:-inset-6" />
                    <h1 className="font-heading animate-slide-up text-4xl leading-[0.9] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                      <span className="block drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        CONFIDENT
                      </span>
                      <span
                        className="mt-2 block drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                        style={{
                          WebkitTextStroke: "2px white",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        PLAY
                      </span>
                      <span className="mt-2 block">
                        <span
                          className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                          style={{
                            WebkitTextStroke: "2px white",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          STARTS{" "}
                        </span>
                        <span className="text-accent drop-shadow-[0_4px_20px_rgba(20,184,166,0.6)]">
                          HERE
                        </span>
                      </span>
                    </h1>
                  </div>

                  {/* Subheadline */}
                  <div className="animate-slide-up animation-delay-200 mt-10">
                    <div className="inline-block rounded-xl bg-black/40 px-5 py-4 backdrop-blur-sm">
                      <p className="max-w-md text-base leading-relaxed text-white/90 md:text-lg">
                        Epic birthday parties & action-packed camps for kids 4-14.
                        <span className="mt-1 block font-semibold text-white">
                          We handle the fun—you enjoy the memories.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Container>
            </div>

            {/* HIGHLIGHTED TEXT BANNER (Bottom) */}
            <div className="bg-accent pointer-events-auto relative w-full border-t-4 border-white py-5 shadow-[0_-10px_50px_rgba(0,0,0,0.4)] md:py-6">
              <Container>
                <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:gap-8 lg:text-left">
                  {/* Banner Text */}
                  <div className="min-w-0 flex-1">
                    <div className="font-heading mb-1 truncate text-xl leading-none text-white sm:text-2xl lg:text-3xl xl:text-4xl">
                      EPIC BIRTHDAY PARTIES & ACTION CAMPS
                    </div>
                    <div className="text-xs font-medium tracking-wide text-white/90 uppercase sm:text-sm lg:text-base">
                      The #1 Kids Activity Center in San Fernando Valley
                    </div>
                  </div>

                  {/* Banner CTAs */}
                  <div className="flex shrink-0 flex-wrap justify-center gap-3">
                    <Button
                      size="lg"
                      variant="white"
                      className="font-heading h-11 px-6 text-base shadow-lg transition-shadow hover:shadow-xl sm:text-lg lg:h-12 lg:px-8 lg:text-xl"
                      asChild
                    >
                      <a href="#packages">
                        Book a Party
                        <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Container>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce-subtle absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 md:bottom-32 lg:block">
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-2">
              <div className="animate-pulse-soft h-3 w-1.5 rounded-full bg-white/60" />
            </div>
          </div>
        </section>

        {/* Photo Showcase Marquee */}
        <section className="bg-muted border-border overflow-hidden border-t py-8 md:py-12">
          <PhotoMarquee images={galleryImages} speed="slow" direction="left" pauseOnHover={true} />
        </section>

        {/* Event Types Section - Hacksmith Project Cards Style */}
        <Section className="bg-background">
          <Container>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                Our Events
              </Badge>
              <h2 className="mb-4">Unforgettable Experiences</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                From epic birthday parties to action-packed camps, we create memories your kids will
                talk about for years.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {eventTypes.map((event, index) => (
                <Link
                  key={event.title}
                  href={event.href}
                  className={`group animate-slide-up relative overflow-hidden rounded-xl transition-all hover:translate-y-[-4px] hover:shadow-[var(--shadow-soft-xl)] animation-delay-${(index + 1) * 100}`}
                >
                  {/* Photo Background */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Badge */}
                    {event.accent && (
                      <Badge variant="accent" className="absolute top-4 right-4 z-10">
                        Most Popular
                      </Badge>
                    )}

                    {/* Content overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="bg-accent/90 flex h-10 w-10 items-center justify-center rounded-lg">
                          <event.icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-heading text-xl text-white">{event.title}</h3>
                      </div>
                      <p className="mb-4 line-clamp-2 text-sm text-white/80">{event.description}</p>
                      <span className="text-accent-400 group-hover:text-accent-300 inline-flex items-center text-sm font-semibold transition-colors">
                        {event.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>

        {/* Party Packages Preview */}
        <Section id="packages" className="bg-muted scroll-mt-20">
          <Container>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                Birthday Packages
              </Badge>
              <h2 className="mb-4">Choose Your Party Package</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                All packages include a dedicated party host, setup & cleanup, and action-packed
                activities your kids will love.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {birthdayPackages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  package_={pkg}
                  calEventSlug={`birthday-party-${pkg.id}`}
                  className={`animate-slide-up animation-delay-${(index + 1) * 100}`}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* Why Choose Us */}
        <Section className="bg-background">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[var(--shadow-soft-xl)]">
                  <Image
                    src={images.birthday.DSC00808}
                    alt="Kids having fun at NewGround Kids"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="bg-accent absolute -right-4 -bottom-4 rounded-xl p-4 text-white shadow-[var(--shadow-hard-accent-lg)] md:-right-6 md:-bottom-6 md:p-6">
                  <div className="font-heading text-2xl md:text-3xl">500+</div>
                  <div className="text-sm opacity-90">Happy Parties</div>
                </div>
              </div>

              {/* Content */}
              <div>
                <Badge variant="outline" className="mb-4">
                  Why Parents Love Us
                </Badge>
                <h2 className="mb-6">Stress-Free Events, Happy Kids</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  We handle everything so you can relax and enjoy watching your kids have the time
                  of their lives. Professional staff, clean facility, and activities kids actually
                  love.
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                  {whyChooseUs.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="bg-accent/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                        <item.icon className="text-accent h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-heading mb-1 text-lg">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="font-heading mt-8" asChild>
                  <Link href="/about">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Testimonials */}
        <Section className="bg-background">
          <Container>
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">
                Reviews
              </Badge>
              <h2 className="mb-4">What Parents Are Saying</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                Don&apos;t just take our word for it. Hear from families who&apos;ve celebrated with
                us.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <Container className="relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-primary-foreground mb-6">Ready to Plan Your Event?</h2>
              <p className="text-primary-foreground/80 mb-8 text-xl">
                Book a birthday party, register for camp, or inquire about private events. We
                can&apos;t wait to help you celebrate!
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="accent" className="font-heading text-lg" asChild>
                  <Link href="/birthday-parties">
                    Plan a Party
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="white-outline" className="font-heading" asChild>
                  <a href={`tel:${siteConfig.contact.phoneRaw}`}>Call {siteConfig.contact.phone}</a>
                </Button>
              </div>

              {/* Location */}
              <div className="text-primary-foreground/70 mt-10 inline-flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{siteConfig.contact.fullAddress}</span>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
      <StickyMobileCTA primaryHref="/birthday-parties" primaryText="Book Now" showPhone={false} />
    </>
  );
}
