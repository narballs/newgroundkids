"use client";

import {
  Shield,
  Heart,
  Trophy,
  Users,
  ArrowRight,
  Check,
  X,
  AlertCircle,
  Info,
  Zap,
  Flame,
  Sparkles,
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
  StickerCard,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { AgeTag } from "@/components/ui/age-tag";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Sticker, StickerNew, StickerPopular, StickerSale } from "@/components/ui/sticker";
import {
  ComicBurst,
  BurstNew,
  BurstPow,
  BurstBam,
  BurstSale,
  BurstHot,
  BurstGo,
  BurstWin,
} from "@/components/ui/comic-burst";
import { SpeechBubble, ComicPanel, CaptionBox } from "@/components/ui/speech-bubble";
import { HeroCharacter } from "@/components/ui/hero-character";

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
import { birthdayPackages } from "@/data/birthday-packages";
import { camps } from "@/data/camps";

// Sample Data
const sampleFeatures = [
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Certified instructors and padded facilities for worry-free training.",
  },
  {
    icon: Heart,
    title: "Character Building",
    description: "We emphasize respect, discipline, and kindness in every class.",
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Belt promotions and awards that celebrate your child's progress.",
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
    <div className="bg-background relative min-h-screen">
      {/* Hero Header - Confident Play Edition */}
      <div className="bg-primary relative overflow-hidden">
        <Container className="relative py-16 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <Badge variant="accent" className="text-sm">
                  v5.0
                </Badge>
                <CaptionBox variant="accent" className="inline-block">
                  <Zap className="mr-1 inline h-4 w-4" />
                  Confident Play Edition
                </CaptionBox>
              </div>
              <h1 className="font-heading mb-4 text-5xl text-white md:text-7xl">
                NGK Design System
              </h1>
              <p className="max-w-2xl text-xl text-white/90">
                Modern, welcoming, professional. Soft shadows, rounded corners, and a color palette
                that parents trust.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <BurstNew />
              <Badge variant="accent" size="lg">
                Safe & Fun
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      {/* Components Showcase */}
      <Section spacing="lg" className="bg-muted">
        <Container>
          <SectionHeader
            badge="Components"
            title="UI Components"
            subtitle="Clean, modern, and welcoming design components"
          />

          <Grid cols={1} colsMd={2} colsLg={3} gap="lg" className="mt-12">
            {/* Badges Demo */}
            <ComicPanel className="p-6">
              <CardHeader className="mb-4 p-0">
                <CardTitle>Callout Badges</CardTitle>
                <CardDescription>Clean pill-shaped badges</CardDescription>
              </CardHeader>
              <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                <BurstNew />
                <BurstHot />
                <BurstGo />
              </div>
            </ComicPanel>

            {/* Quote Cards Demo */}
            <ComicPanel className="p-6">
              <CardHeader className="mb-4 p-0">
                <CardTitle>Quote Cards</CardTitle>
                <CardDescription>Testimonials and feedback</CardDescription>
              </CardHeader>
              <div className="space-y-6">
                <SpeechBubble author="Happy Parent">My kids love it here!</SpeechBubble>
              </div>
            </ComicPanel>

            {/* Backgrounds Demo */}
            <ComicPanel className="p-6">
              <CardHeader className="mb-4 p-0">
                <CardTitle>Background Styles</CardTitle>
                <CardDescription>Subtle, clean backgrounds</CardDescription>
              </CardHeader>
              <Stack gap="sm">
                <div className="bg-muted h-12 rounded-lg" />
                <div className="bg-accent/10 h-12 rounded-lg" />
                <div className="from-accent/10 to-accent/20 h-12 rounded-lg bg-gradient-to-r" />
              </Stack>
            </ComicPanel>

            {/* Shadows Demo */}
            <ComicPanel className="p-6">
              <CardHeader className="mb-4 p-0">
                <CardTitle>Soft Shadows</CardTitle>
                <CardDescription>Elevation with soft shadows</CardDescription>
              </CardHeader>
              <Stack gap="md">
                <div className="h-10 w-full rounded-lg bg-white shadow-[var(--shadow-soft-sm)]" />
                <div className="h-10 w-full rounded-lg bg-white shadow-[var(--shadow-soft-md)]" />
                <div className="h-10 w-full rounded-lg bg-white shadow-[var(--shadow-soft-lg)]" />
              </Stack>
            </ComicPanel>

            {/* Labels Demo */}
            <ComicPanel className="p-6">
              <CardHeader className="mb-4 p-0">
                <CardTitle>Label Boxes</CardTitle>
                <CardDescription>Section labels and captions</CardDescription>
              </CardHeader>
              <Stack gap="sm">
                <CaptionBox>Getting Started</CaptionBox>
                <CaptionBox variant="dark">Pro Tip</CaptionBox>
                <CaptionBox variant="accent">
                  <Sparkles className="mr-1 inline h-4 w-4" />
                  New Feature
                </CaptionBox>
              </Stack>
            </ComicPanel>

            {/* Typography Demo */}
            <ComicPanel className="bg-primary p-6">
              <CardHeader className="mb-4 p-0">
                <CardTitle className="text-white">Typography</CardTitle>
                <CardDescription className="text-white/70">Clean, readable text</CardDescription>
              </CardHeader>
              <Stack gap="md" className="text-center">
                <span className="font-heading text-3xl text-white">HEADLINES</span>
                <span className="font-heading text-accent text-2xl">ACCENT TEXT</span>
                <span className="text-lg text-white/90">Body copy</span>
              </Stack>
            </ComicPanel>
          </Grid>
        </Container>
      </Section>

      {/* Superhero Graphics Showcase */}
      <Section spacing="lg" className="relative overflow-hidden bg-white">
        {/* Background elements */}
        <div className="bg-action-lines absolute inset-0 opacity-50" />

        <Container>
          <SectionHeader
            badge="Superhero Graphics"
            title="Dynamic Characters"
            subtitle="Cutout effects, halftone overlays, and action poses"
          />

          <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: Character Showcase */}
            <div className="relative">
              <ComicPanel className="bg-sky-100/50 p-8" borderWidth="thick">
                <div className="absolute top-4 left-4 z-20">
                  <ComicBurst fill="#14b8a6" size="sm" rotation={-10}>
                    COACH!
                  </ComicBurst>
                </div>

                <div className="flex h-[400px] items-end justify-center">
                  {/* Using a placeholder since we don't have real photos yet */}
                  <HeroCharacter
                    src="/images/team/mike-frausto.jpg"
                    alt="Coach Mike"
                    size="full"
                    effect="speed"
                    className="z-10"
                  />
                </div>

                <div className="absolute right-8 bottom-8 z-20 max-w-[200px]">
                  <SpeechBubble pointer="none" size="sm">
                    <span className="font-heading text-lg">Ready to train like a hero?</span>
                  </SpeechBubble>
                </div>
              </ComicPanel>
            </div>

            {/* Right: Layout Example */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading mb-4 flex items-center gap-2 text-2xl">
                  <span className="text-stroke-thin bg-black px-2 text-white">Action Layouts</span>
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Break the grid! Let characters overlap panels and bursts to create depth and
                  excitement.
                </p>
              </div>

              {/* Mini Panel Grid */}
              <div className="grid h-[300px] grid-cols-2 gap-4">
                <div className="bg-primary border-comic group relative overflow-hidden p-6 text-white transition-transform hover:scale-[1.02]">
                  <div className="bg-halftone-light absolute inset-0 opacity-10" />
                  <h4 className="font-heading skew-action relative z-10 text-3xl transition-transform group-hover:skew-x-0">
                    JIU JITSU
                  </h4>
                  <ComicBurst
                    fill="#fbbf24"
                    size="sm"
                    className="absolute right-2 bottom-2 rotate-12"
                  >
                    POW!
                  </ComicBurst>
                </div>

                <div className="bg-accent border-comic group relative overflow-hidden p-6 text-white transition-transform hover:scale-[1.02]">
                  <div className="bg-burst-lines absolute inset-0 opacity-20" />
                  <h4 className="font-heading -skew-action relative z-10 text-right text-3xl transition-transform group-hover:skew-x-0">
                    KICK BOXING
                  </h4>
                  <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-black/10 blur-xl" />
                </div>

                <div className="border-comic group relative col-span-2 flex items-center justify-between bg-white p-6 transition-colors hover:border-[var(--accent-500)]">
                  <div>
                    <CaptionBox variant="dark" className="mb-2 inline-block">
                      Sign Up Today
                    </CaptionBox>
                    <h4 className="font-heading text-2xl">Start Your Journey</h4>
                  </div>
                  <BurstNew className="animate-comic-wobble" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Large Comic Burst Showcase */}
      <Section spacing="md" className="bg-checkerboard overflow-hidden">
        <Container>
          <SectionHeader
            badge="SVG Bursts"
            title="Comic Sound Effects"
            subtitle="Each burst has a unique shape, thick ink stroke, and hard shadow"
          />
          <div className="flex flex-wrap items-center justify-center gap-6 py-8">
            <BurstPow />
            <BurstBam />
            <BurstWin />
            <BurstSale />
          </div>

          {/* Burst Shapes Comparison */}
          <div className="mt-8 border-t-2 border-[var(--border-hard)] pt-8">
            <h4 className="mb-6 text-center font-semibold">Shape Variants</h4>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="text-center">
                <ComicBurst fill="#fbbf24" shape="starburst" size="default" rotation={0}>
                  STAR
                </ComicBurst>
                <p className="text-muted-foreground mt-2 text-xs">starburst</p>
              </div>
              <div className="text-center">
                <ComicBurst
                  fill="#f97316"
                  shape="explosion"
                  size="default"
                  rotation={5}
                  textColor="white"
                >
                  BOOM
                </ComicBurst>
                <p className="text-muted-foreground mt-2 text-xs">explosion</p>
              </div>
              <div className="text-center">
                <ComicBurst
                  fill="#22c55e"
                  shape="rounded"
                  size="default"
                  rotation={-3}
                  textColor="white"
                >
                  SOFT
                </ComicBurst>
                <p className="text-muted-foreground mt-2 text-xs">rounded</p>
              </div>
              <div className="text-center">
                <ComicBurst
                  fill="#ef4444"
                  shape="jagged"
                  size="default"
                  rotation={8}
                  textColor="white"
                >
                  ZAP!
                </ComicBurst>
                <p className="text-muted-foreground mt-2 text-xs">jagged</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Color Palette */}
      <Section spacing="lg">
        <Container>
          <SectionHeader
            badge="Tokens"
            title="Color Palette"
            subtitle="Trustworthy teal accent with clean neutrals"
            align="left"
          />

          <div className="mt-8 space-y-8">
            {/* Primary Colors */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                Primary (Jet Black){" "}
                <Badge variant="default" size="sm">
                  Headlines
                </Badge>
              </h4>
              <div className="grid grid-cols-5 gap-2 md:grid-cols-11">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className="shadow-hard-xs mb-1 h-12 rounded-sm border-2 border-[var(--border-hard)]"
                      style={{ backgroundColor: `var(--primary-${shade})` }}
                    />
                    <span className="text-muted-foreground text-xs font-semibold">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                Accent (Teal){" "}
                <Badge variant="accent" size="sm">
                  Trust
                </Badge>
              </h4>
              <div className="grid grid-cols-5 gap-2 md:grid-cols-11">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className="mb-1 h-12 rounded-lg shadow-[var(--shadow-soft-sm)]"
                      style={{ backgroundColor: `var(--accent-${shade})` }}
                    />
                    <span className="text-muted-foreground text-xs font-semibold">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h4 className="mb-3 font-semibold">Semantic</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="shadow-hard-xs h-10 w-10 rounded-sm border-2 border-[var(--border-hard)] bg-[var(--success-500)]" />
                  <span className="text-sm font-medium">Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="shadow-hard-xs h-10 w-10 rounded-sm border-2 border-[var(--border-hard)] bg-[var(--warning-500)]" />
                  <span className="text-sm font-medium">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="shadow-hard-xs h-10 w-10 rounded-sm border-2 border-[var(--border-hard)] bg-[var(--error-500)]" />
                  <span className="text-sm font-medium">Error</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="shadow-hard-xs h-10 w-10 rounded-sm border-2 border-[var(--border-hard)] bg-[var(--info-500)]" />
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
            subtitle="Libre Franklin for readability, Bebas Neue for IMPACT!"
            align="left"
          />

          <div className="mt-8 space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs tracking-wider text-white/60 uppercase">Display 2XL</span>
                <h1 className="text-display-2xl font-heading text-white">Building Champions</h1>
              </div>
              <div>
                <span className="text-xs tracking-wider text-white/60 uppercase">Display XL</span>
                <h2 className="text-display-xl font-heading text-white">Kids Martial Arts</h2>
              </div>
              <div>
                <span className="text-xs tracking-wider text-white/60 uppercase">Display LG</span>
                <h2 className="text-display-lg font-heading text-white">Sherman Oaks, CA</h2>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/20 pt-8">
              <div>
                <span className="text-xs tracking-wider text-white/60 uppercase">Body XL</span>
                <p className="text-xl text-white/90">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <div>
                <span className="text-xs tracking-wider text-white/60 uppercase">Body LG</span>
                <p className="text-lg text-white/90">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <div>
                <span className="text-xs tracking-wider text-white/60 uppercase">
                  Body MD (Default)
                </span>
                <p className="text-white/90">The quick brown fox jumps over the lazy dog.</p>
              </div>
              <div>
                <span className="text-xs tracking-wider text-white/60 uppercase">Body SM</span>
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

          <div className="mt-8 space-y-10">
            {/* Variants */}
            <div>
              <h4 className="mb-4 flex items-center gap-2 font-semibold">
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
              <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
                On Dark Background
                <Badge variant="accent" className="shadow-[2px_2px_0px_0px_white]">
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
              <h4 className="mb-4 font-semibold">Sizes</h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="mb-4 font-semibold">States</h4>
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
              <h4 className="mb-4 flex items-center gap-2 font-semibold">
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

          <div className="mt-8 space-y-8">
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
                <CardDescription>Slap these anywhere for attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <StickerNew />
                  <StickerPopular />
                  <StickerSale />
                  <Sticker variant="accent" rotation="left" size="lg">
                    <Flame className="mr-1 inline h-4 w-4" />
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
                <p className="text-muted-foreground text-sm">Card content goes here.</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Larger hard shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Card content goes here.</p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover for pop effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Card content goes here.</p>
              </CardContent>
            </Card>

            <Card variant="featured">
              <CardHeader>
                <CardTitle>Featured Card</CardTitle>
                <CardDescription>Accent top border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Card content goes here.</p>
              </CardContent>
            </Card>

            <Card variant="accent-shadow">
              <CardHeader>
                <CardTitle>Accent Shadow</CardTitle>
                <CardDescription>Amber shadow color</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Card content goes here.</p>
              </CardContent>
            </Card>

            <Card variant="checkerboard">
              <CardHeader>
                <CardTitle>Checkerboard</CardTitle>
                <CardDescription>Pattern background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Card content goes here.</p>
              </CardContent>
            </Card>

            <StickerCard rotation="left">
              <CardHeader>
                <CardTitle>Sticker Card</CardTitle>
                <CardDescription>Slight rotation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Hover to straighten!</p>
              </CardContent>
            </StickerCard>

            <Card variant="primary">
              <CardHeader>
                <CardTitle className="text-white">Primary Card</CardTitle>
                <CardDescription className="text-white/70">Navy background</CardDescription>
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
              <h3 className="font-heading mb-6 text-2xl text-white">Ratings</h3>
              <Stack gap="lg">
                <div>
                  <span className="mb-2 block text-sm text-white/60">Sizes</span>
                  <Stack gap="md">
                    <Rating value={5} size="sm" />
                    <Rating value={4.5} size="md" />
                    <Rating value={4} size="lg" />
                  </Stack>
                </div>

                <div>
                  <span className="mb-2 block text-sm text-white/60">With Value & Count</span>
                  <Stack gap="md">
                    <Rating value={5} showValue />
                    <Rating value={4.5} showValue showCount count={127} />
                    <Rating value={4} showCount count={89} />
                  </Stack>
                </div>
              </Stack>
            </div>

            <div>
              <h3 className="font-heading mb-6 text-2xl text-white">Loading States</h3>
              <div className="flex items-end gap-8">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="mt-2 text-xs text-white/60">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="mt-2 text-xs text-white/60">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-2 text-xs text-white/60">Large</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="xl" />
                  <p className="mt-2 text-xs text-white/60">XL</p>
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

          <div className="mt-8 space-y-12">
            <div>
              <h4 className="text-muted-foreground mb-6 text-center text-sm">Cards Variant</h4>
              <FeatureGrid features={sampleFeatures} variant="cards" columns={4} />
            </div>

            <div>
              <h4 className="text-muted-foreground mb-6 text-center text-sm">Minimal Variant</h4>
              <FeatureGrid features={sampleFeatures} variant="minimal" columns={4} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Camp Cards */}
      <Section spacing="lg" className="bg-checkerboard">
        <Container>
          <SectionHeader badge="Cards" title="Camp Cards" subtitle="Display camp events" />

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
          <SectionHeader badge="Cards" title="Package Cards" subtitle="Birthday party packages" />

          <Grid cols={1} colsMd={3} gap="lg" className="mt-8">
            {birthdayPackages.map((pkg) => (
              <PackageCard key={pkg.id} package_={pkg} />
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
            <TestimonialCard testimonial={testimonials[0]!} variant="default" />
            <TestimonialCard testimonial={testimonials[1]!} variant="compact" />
            <TestimonialCard testimonial={testimonials[2]!} variant="featured" />
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

            <div className="rounded-sm border-2 border-white bg-white p-6">
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
