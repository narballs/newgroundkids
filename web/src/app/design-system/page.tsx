"use client";

import {
  Shield,
  Heart,
  Trophy,
  Users,
  Star,
  Clock,
  Calendar,
  ArrowRight,
  Check,
  X,
  AlertCircle,
  Info,
  Zap,
  Flame,
} from "lucide-react";

// Layout
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StickerCard,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { AgeTag } from "@/components/ui/age-tag";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Sticker,
  StickerNew,
  StickerPopular,
  StickerSale,
} from "@/components/ui/sticker";

// Section Components
import { SectionHeader } from "@/components/sections/section-header";
import { StatsBar } from "@/components/sections/stats-bar";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { FAQSection } from "@/components/sections/faq-section";
import { CTABanner } from "@/components/sections/cta-banner";

// Card Components
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { PackageCard } from "@/components/cards/package-card";
import { CampCard } from "@/components/cards/camp-card";

// Form Components
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { NewsletterForm } from "@/components/forms/newsletter-form";

// Data
import { testimonials } from "@/data/testimonials";
import { partyPackages } from "@/data/packages";
import { camps } from "@/data/camps";

// Sample Data
const sampleFeatures = [
  {
    icon: Shield,
    title: "Safe Environment",
    description:
      "Certified instructors and padded facilities for worry-free training.",
  },
  {
    icon: Heart,
    title: "Character Building",
    description:
      "We emphasize respect, discipline, and kindness in every class.",
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description:
      "Belt promotions and awards that celebrate your child's progress.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a supportive family of martial arts enthusiasts.",
  },
];

const sampleFAQs = [
  {
    question: "What age can my child start?",
    answer:
      "We accept children as young as 3 years old in our Minis program. Each age group has tailored curriculum.",
  },
  {
    question: "What should my child wear?",
    answer:
      "For the first class, comfortable athletic clothing is fine. We'll help you get a gi (uniform) if your child continues.",
  },
  {
    question: "How often should my child train?",
    answer:
      "We recommend 2-3 classes per week for optimal progress, but even once a week shows benefits.",
  },
  {
    question: "Do you offer family discounts?",
    answer:
      "Yes! We offer sibling discounts and family membership packages. Contact us for details.",
  },
];

const sampleStats = [
  { value: "500", suffix: "+", label: "Happy Families" },
  { value: "5.0", label: "Google Rating" },
  { value: "15", suffix: "+", label: "Years Experience" },
  { value: "98", suffix: "%", label: "Retention Rate" },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Hero Header - Red Belt Edition */}
      <div className="bg-primary relative overflow-hidden">
        {/* Top accent - Red stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

        <Container className="py-16 md:py-24 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Sticker variant="accent" rotation="left" size="lg">
                  <Zap className="w-4 h-4 mr-1 inline" />
                  Red Belt Edition
                </Sticker>
                <Sticker variant="default" rotation="right" size="sm">
                  v3.0
                </Sticker>
              </div>
              <h1 className="font-heading text-5xl md:text-7xl text-white mb-4">
                NGK Design System
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                Black. White. Red. Premium street aesthetic inspired by Vans + AOJ.
                Clean, bold, pro skate shop energy.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <StickerNew size="lg" />
              <StickerPopular size="lg" />
            </div>
          </div>
        </Container>

        {/* Bottom accent - Red stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      </div>

      {/* Red Belt Showcase */}
      <Section spacing="lg" className="bg-checkerboard">
        <Container>
          <SectionHeader
            badge="Red Belt Aesthetic"
            title="Black + White + Red"
            subtitle="Premium street style inspired by Vans and Art of Jiu Jitsu"
          />

          <Grid cols={1} colsMd={3} gap="lg" className="mt-12">
            {/* Hard Shadows Demo */}
            <Card variant="default" className="bg-white">
              <CardHeader>
                <CardTitle>Hard Shadows</CardTitle>
                <CardDescription>
                  Offset shadows that pop off the page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap="sm">
                  <div className="h-8 w-full bg-primary rounded-sm shadow-hard-xs" />
                  <div className="h-8 w-full bg-primary rounded-sm shadow-hard-sm" />
                  <div className="h-8 w-full bg-primary rounded-sm shadow-hard" />
                  <div className="h-8 w-full bg-primary rounded-sm shadow-hard-lg" />
                  <div className="h-8 w-full bg-accent rounded-sm shadow-hard-accent" />
                </Stack>
              </CardContent>
            </Card>

            {/* Sticker Component Demo */}
            <Card variant="default" className="bg-white">
              <CardHeader>
                <CardTitle>Stickers</CardTitle>
                <CardDescription>
                  Slap-style labels with rotation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Sticker rotation="left">Default</Sticker>
                  <Sticker variant="accent" rotation="right">
                    Accent
                  </Sticker>
                  <Sticker variant="primary" rotation="left">
                    Primary
                  </Sticker>
                  <Sticker variant="success" rotation="right">
                    Success
                  </Sticker>
                  <Sticker variant="error" rotation="left-more">
                    Error
                  </Sticker>
                </div>
              </CardContent>
            </Card>

            {/* Pattern Demo */}
            <Card variant="default" className="bg-white overflow-hidden">
              <CardHeader>
                <CardTitle>Patterns</CardTitle>
                <CardDescription>
                  Checkerboard and stripe textures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-16 bg-checkerboard rounded-sm border-2 border-[var(--border-hard)]" />
                <div className="h-16 bg-checkerboard-lg rounded-sm border-2 border-[var(--border-hard)]" />
                <div className="h-16 bg-stripes rounded-sm border-2 border-[var(--border-hard)]" />
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Color Palette */}
      <Section spacing="lg">
        <Container>
          <SectionHeader
            badge="Tokens"
            title="Color Palette"
            subtitle="High contrast colors for maximum impact"
            align="left"
          />

          <div className="space-y-8 mt-8">
            {/* Primary Colors */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                Primary (Navy){" "}
                <Badge variant="default" size="sm">
                  High Contrast
                </Badge>
              </h4>
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                  (shade) => (
                    <div key={shade} className="text-center">
                      <div
                        className="h-12 rounded-sm border-2 border-[var(--border-hard)] shadow-hard-xs mb-1"
                        style={{ backgroundColor: `var(--primary-${shade})` }}
                      />
                      <span className="text-xs text-muted-foreground font-semibold">
                        {shade}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                Accent (Amber){" "}
                <Badge variant="accent" size="sm">
                  Energy
                </Badge>
              </h4>
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                  (shade) => (
                    <div key={shade} className="text-center">
                      <div
                        className="h-12 rounded-sm border-2 border-[var(--border-hard)] shadow-hard-xs mb-1"
                        style={{ backgroundColor: `var(--accent-${shade})` }}
                      />
                      <span className="text-xs text-muted-foreground font-semibold">
                        {shade}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h4 className="font-semibold mb-3">Semantic</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-sm bg-[var(--success-500)] border-2 border-[var(--border-hard)] shadow-hard-xs" />
                  <span className="text-sm font-medium">Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-sm bg-[var(--warning-500)] border-2 border-[var(--border-hard)] shadow-hard-xs" />
                  <span className="text-sm font-medium">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-sm bg-[var(--error-500)] border-2 border-[var(--border-hard)] shadow-hard-xs" />
                  <span className="text-sm font-medium">Error</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-sm bg-[var(--info-500)] border-2 border-[var(--border-hard)] shadow-hard-xs" />
                  <span className="text-sm font-medium">Info</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Typography */}
      <Section spacing="lg" className="section-dark">
        <Container>
          <SectionHeader
            badge="Typography"
            title="Type Scale"
            subtitle="Quicksand for warmth, Bebas Neue for impact"
            align="left"
          />

          <div className="space-y-8 mt-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  Display 2XL
                </span>
                <h1 className="text-display-2xl font-heading text-white">
                  Building Champions
                </h1>
              </div>
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  Display XL
                </span>
                <h2 className="text-display-xl font-heading text-white">
                  Kids Martial Arts
                </h2>
              </div>
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  Display LG
                </span>
                <h2 className="text-display-lg font-heading text-white">
                  Sherman Oaks, CA
                </h2>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8 space-y-4">
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  Body XL
                </span>
                <p className="text-xl text-white/90">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  Body LG
                </span>
                <p className="text-lg text-white/90">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  Body MD (Default)
                </span>
                <p className="text-white/90">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <div>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  Body SM
                </span>
                <p className="text-sm text-white/90">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section spacing="lg">
        <Container>
          <SectionHeader
            badge="Components"
            title="Buttons"
            subtitle="All button variants with hard shadow hover effects"
            align="left"
          />

          <div className="space-y-10 mt-8">
            {/* Variants */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                Variants{" "}
                <Sticker size="sm" rotation="right">
                  Hover Me!
                </Sticker>
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Dark variants */}
            <div className="bg-primary rounded-sm border-2 border-[var(--border-hard)] p-8">
              <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
                On Dark Background
                <Badge
                  variant="accent"
                  className="shadow-[2px_2px_0px_0px_white]"
                >
                  Street
                </Badge>
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="white">White</Button>
                <Button variant="white-outline">White Outline</Button>
                <Button variant="accent">Accent</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="font-semibold mb-4">Sizes</h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="font-semibold mb-4">States</h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button>
                  With Icon <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button fullWidth className="max-w-xs">
                  Full Width
                </Button>
              </div>
            </div>

            {/* Soft variants */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                Soft Variants{" "}
                <Badge variant="secondary" size="sm">
                  Subtle
                </Badge>
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="soft-primary">Soft Primary</Button>
                <Button variant="soft-secondary">Soft Secondary</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Badges & Stickers */}
      <Section spacing="lg" className="bg-checkerboard">
        <Container>
          <SectionHeader
            badge="Components"
            title="Badges & Stickers"
            subtitle="Labels, tags, and attention-grabbing callouts"
            align="left"
          />

          <div className="space-y-8 mt-8">
            {/* Standard variants */}
            <Card variant="default" className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Standard Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="accent">Accent</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Semantic */}
            <Card variant="default" className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Semantic Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success">
                    <Check className="h-3 w-3" /> Success
                  </Badge>
                  <Badge variant="warning">
                    <AlertCircle className="h-3 w-3" /> Warning
                  </Badge>
                  <Badge variant="error">
                    <X className="h-3 w-3" /> Error
                  </Badge>
                  <Badge variant="info">
                    <Info className="h-3 w-3" /> Info
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Program badges */}
            <Card variant="default" className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Program Age Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="minis">Minis (3-5)</Badge>
                  <Badge variant="juniors">Juniors (6-7)</Badge>
                  <Badge variant="youth">Youth (8-12)</Badge>
                  <Badge variant="teens">Teens (13+)</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Stickers */}
            <Card variant="default" className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Sticker Components</CardTitle>
                <CardDescription>
                  Slap these anywhere for attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 items-center">
                  <StickerNew />
                  <StickerPopular />
                  <StickerSale />
                  <Sticker variant="accent" rotation="left" size="lg">
                    <Flame className="w-4 h-4 mr-1 inline" />
                    Hot Deal
                  </Sticker>
                  <Sticker variant="primary" rotation="right">
                    Limited Time
                  </Sticker>
                </div>
              </CardContent>
            </Card>

            {/* Age Tags */}
            <Card variant="default" className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Age Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <AgeTag minAge={3} maxAge={5} />
                  <AgeTag minAge={6} maxAge={7} />
                  <AgeTag minAge={8} maxAge={12} />
                  <AgeTag minAge={13} maxAge={17} />
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Cards */}
      <Section spacing="lg">
        <Container>
          <SectionHeader
            badge="Components"
            title="Cards"
            subtitle="Container components with hard shadow styling"
            align="left"
          />

          <Grid cols={1} colsMd={2} colsLg={4} gap="md" className="mt-8">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Hard border and shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card content goes here.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Larger hard shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card content goes here.
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover for pop effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card content goes here.
                </p>
              </CardContent>
            </Card>

            <Card variant="featured">
              <CardHeader>
                <CardTitle>Featured Card</CardTitle>
                <CardDescription>Accent top border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card content goes here.
                </p>
              </CardContent>
            </Card>

            <Card variant="accent-shadow">
              <CardHeader>
                <CardTitle>Accent Shadow</CardTitle>
                <CardDescription>Amber shadow color</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card content goes here.
                </p>
              </CardContent>
            </Card>

            <Card variant="checkerboard">
              <CardHeader>
                <CardTitle>Checkerboard</CardTitle>
                <CardDescription>Pattern background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card content goes here.
                </p>
              </CardContent>
            </Card>

            <StickerCard rotation="left">
              <CardHeader>
                <CardTitle>Sticker Card</CardTitle>
                <CardDescription>Slight rotation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hover to straighten!
                </p>
              </CardContent>
            </StickerCard>

            <Card variant="primary">
              <CardHeader>
                <CardTitle className="text-white">Primary Card</CardTitle>
                <CardDescription className="text-white/70">
                  Navy background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">Card content goes here.</p>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Ratings & Loading */}
      <Section spacing="lg" className="section-dark">
        <Container>
          <Grid cols={1} colsMd={2} gap="xl">
            <div>
              <h3 className="text-2xl font-heading text-white mb-6">Ratings</h3>
              <Stack gap="lg">
                <div>
                  <span className="text-sm text-white/60 mb-2 block">
                    Sizes
                  </span>
                  <Stack gap="md">
                    <Rating value={5} size="sm" />
                    <Rating value={4.5} size="md" />
                    <Rating value={4} size="lg" />
                  </Stack>
                </div>

                <div>
                  <span className="text-sm text-white/60 mb-2 block">
                    With Value & Count
                  </span>
                  <Stack gap="md">
                    <Rating value={5} showValue />
                    <Rating value={4.5} showValue showCount count={127} />
                    <Rating value={4} showCount count={89} />
                  </Stack>
                </div>
              </Stack>
            </div>

            <div>
              <h3 className="text-2xl font-heading text-white mb-6">
                Loading States
              </h3>
              <div className="flex items-end gap-8">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-xs text-white/60 mt-2">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="text-xs text-white/60 mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="text-xs text-white/60 mt-2">Large</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="xl" />
                  <p className="text-xs text-white/60 mt-2">XL</p>
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Stats Bar */}
      <StatsBar stats={sampleStats} variant="primary" />

      {/* Feature Grid */}
      <Section spacing="lg">
        <Container>
          <SectionHeader
            badge="Sections"
            title="Feature Grid"
            subtitle="Display features, benefits, or services in a grid"
          />

          <div className="space-y-12 mt-8">
            <div>
              <h4 className="text-center text-sm text-muted-foreground mb-6">
                Cards Variant
              </h4>
              <FeatureGrid
                features={sampleFeatures}
                variant="cards"
                columns={4}
              />
            </div>

            <div>
              <h4 className="text-center text-sm text-muted-foreground mb-6">
                Minimal Variant
              </h4>
              <FeatureGrid
                features={sampleFeatures}
                variant="minimal"
                columns={4}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Camp Cards */}
      <Section spacing="lg" className="bg-checkerboard">
        <Container>
          <SectionHeader
            badge="Cards"
            title="Camp Cards"
            subtitle="Display camp events"
          />

          <Grid cols={1} colsMd={2} colsLg={3} gap="md" className="mt-8">
            {camps.slice(0, 3).map((camp) => (
              <CampCard key={camp.id} camp={camp} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Party Package Cards */}
      <Section spacing="lg" className="section-dark">
        <Container>
          <SectionHeader
            badge="Cards"
            title="Package Cards"
            subtitle="Birthday party packages"
          />

          <Grid cols={1} colsMd={3} gap="lg" className="mt-8">
            {partyPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Testimonial Cards */}
      <Section spacing="lg" className="bg-checkerboard">
        <Container>
          <SectionHeader
            badge="Cards"
            title="Testimonial Cards"
            subtitle="Parent reviews and feedback"
          />

          <Grid cols={1} colsMd={3} gap="md" className="mt-8">
            <TestimonialCard
              testimonial={testimonials[0]}
              variant="default"
            />
            <TestimonialCard
              testimonial={testimonials[1]}
              variant="compact"
            />
            <TestimonialCard
              testimonial={testimonials[2]}
              variant="featured"
            />
          </Grid>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="lg">
        <Container>
          <FAQSection
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our programs"
            faqs={sampleFAQs}
            columns={2}
          />
        </Container>
      </Section>

      {/* Forms */}
      <Section spacing="lg" className="section-dark">
        <Container>
          <SectionHeader
            badge="Forms"
            title="Form Components"
            subtitle="Lead capture and contact forms"
          />

          <Grid cols={1} colsMd={2} gap="xl" className="mt-8">
            <LeadCaptureForm
              title="Book Your Free Trial"
              description="Enter your info and we'll schedule your first class."
              variant="card"
            />

            <div className="bg-white rounded-sm border-2 border-white p-6">
              <NewsletterForm
                title="Stay Updated"
                description="Get news about camps, events, and special offers."
                variant="default"
              />
            </div>
          </Grid>
        </Container>
      </Section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Plan Your Event?"
        subtitle="Book a birthday party, register for camp, or inquire about private events. We can't wait to help you celebrate!"
        primaryCta={{ text: "Plan a Party", href: "/birthday-parties" }}
        secondaryCta={{ text: "View Camps", href: "/camps" }}
        variant="gradient"
      />

      {/* Stats Bar - Accent */}
      <StatsBar stats={sampleStats} variant="accent" />

      {/* Footer spacing */}
      <div className="h-16" />
    </div>
  );
}
