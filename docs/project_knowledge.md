# NewGround Kids (NGK) - Project Knowledge Base

> **Generated:** January 11, 2026  
> **Updated:** January 12, 2026 (Events Pivot)  
> **Purpose:** Centralized brand and content reference for building NGK website  
> **Business Model:** Kids event booking platform (birthday parties, camps, private rentals)

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Business Model](#business-model)
3. [Visual Identity](#visual-identity)
4. [Typography](#typography)
5. [Color System](#color-system)
6. [Logo Assets](#logo-assets)
7. [Image Requirements](#image-requirements)
8. [Content & Copy](#content--copy)
9. [CSS Variables Reference](#css-variables-reference)
10. [Design Recommendations for NGK](#design-recommendations-for-ngk)

---

## Brand Overview

### What is NGK?

**NewGround Kids (NGK)** is a kids event booking platform offering:

- **Birthday Parties** — Martial arts-themed parties with activities, games, and packages
- **Seasonal Camps** — Summer, holiday, and school break camps
- **Private Rentals** — Gym rentals for private events, team parties, holidays

> ⚠️ **Important:** NGK is NOT a martial arts school. It does not offer recurring classes, memberships, or enrollment. It is an **event-only** booking platform.

### Parent Brands

| Brand | URL | Relationship |
|-------|-----|--------------|
| **New Ground Jiu Jitsu** | https://www.newgroundjiujitsu.com/ | Parent facility (hosts NGK events) |
| **New Ground Apparel** | https://www.newgroundapparel.com/ | Merchandise partner |

### Brand Personality

| Attribute | Description |
|-----------|-------------|
| **Celebratory** | Fun, party-focused, memorable experiences |
| **Family-friendly** | Safe, welcoming, parent-approved |
| **Professional** | Well-organized, reliable, trustworthy |
| **Energetic** | Active, exciting, engaging |

### Target Audience

| Segment | Description |
|---------|-------------|
| **Primary** | Parents of kids ages 4-14 planning birthday parties |
| **Secondary** | Parents seeking summer/holiday camps |
| **Tertiary** | Groups needing private event space (sports teams, scouts, homeschool) |

---

## Business Model

### Service Offerings

| Service | Description | Pricing Model |
|---------|-------------|---------------|
| **Birthday Parties** | Martial arts-themed parties with games, activities, and party room | Package-based ($299-$599) |
| **Camps** | Summer, holiday, school break day camps | Daily ($79) or Weekly ($349) |
| **Private Rentals** | Gym rental for private events, groups, holidays | Custom quote (hourly/half-day/full-day) |

### Birthday Party Packages

| Package | Price | Duration | Max Kids | Includes |
|---------|-------|----------|----------|----------|
| **Bronze** | $299 | 90 min | 10 | Martial arts games, obstacle course, board break, party room |
| **Silver** | $449 | 120 min | 15 | Bronze + pizza, drinks, paper goods, goodie bags |
| **Gold** | $599 | 150 min | 20 | Silver + cake, decorations, photo booth, t-shirt for birthday child |

### Party Add-Ons

| Add-On | Price |
|--------|-------|
| Additional child | $15/kid |
| Extra pizza | $20 |
| Custom decorations | $50 |
| Extended time | $100/30min |

### Camp Pricing

| Type | Timing | Price |
|------|--------|-------|
| Summer Camp | June-August | $349/week or $79/day |
| Holiday Camp | Winter/Spring break | $79/day |
| School Break | Teacher workdays | $79/day |

### Private Rental Use Cases

- Kids' team parties (sports teams, scout troops)
- Holiday events (Halloween, New Year's Eve)
- Corporate family days
- Homeschool group activities
- Private group events

---

## Visual Identity

### Design Language

| Aspect | Description |
|--------|-------------|
| **Style** | Bold, fun, celebratory |
| **Imagery** | Kids laughing, party action, group fun |
| **Layout** | Full-width sections, event showcases |
| **Mood** | Energetic, memorable, family-friendly |

### Key Visual Elements

1. **High energy** — Action shots, confetti, celebration
2. **Warm colors** — Orange/yellow accents for party vibe
3. **Bold typography** — Large headlines, impactful fonts
4. **Clean whitespace** — Easy to scan for busy parents

---

## Typography

### Primary Fonts

| Font | Usage | Source | Characteristics |
|------|-------|--------|-----------------|
| **Bebas Neue** | Headlines, CTAs, impact text | Google Fonts | Condensed, bold, all-caps friendly |
| **Libre Franklin** | Body text, descriptions | Google Fonts | Clean, readable, professional |

### Typography Scale

```css
/* Desktop */
--font-h1-desktop: 48px;
--font-h2-desktop: 36px;
--font-h3-desktop: 24px;
--font-body-desktop: 16px;

/* Mobile */
--font-h1-mobile: 36px;
--font-h2-mobile: 28px;
--font-h3-mobile: 20px;
--font-body-mobile: 16px;
```

---

## Color System

### NGK Color Palette

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary (Red)** | `#E53935` | 229, 57, 53 | CTAs, primary actions |
| **Secondary (Dark)** | `#1E293B` | 30, 41, 59 | Text, headers |
| **Accent (Gold)** | `#F59E0B` | 245, 158, 11 | Highlights, badges, celebration |
| **Background** | `#FFFFFF` | 255, 255, 255 | Main background |
| **Background Alt** | `#F8FAFC` | 248, 250, 252 | Section backgrounds |
| **Text** | `#1E293B` | 30, 41, 59 | Primary text |
| **Text Light** | `#64748B` | 100, 116, 139 | Secondary text |
| **Success** | `#10B981` | 16, 185, 129 | Confirmations |
| **Error** | `#EF4444` | 239, 68, 68 | Errors, alerts |

---

## Logo Assets

### Available Files

```
brand-assets/
├── newground-apparel/assets/logos/
│   └── logo-primary.png
└── newground-jiujitsu/assets/logos/
    ├── logo-primary.png
    └── favicon.png
```

### Logo Usage Guidelines

1. **Clear space** — Maintain padding around logo equal to logo height
2. **Minimum size** — Don't scale below 100px width for legibility
3. **NGK variant** — Consider "NGK" or "NewGround Kids" branded version
4. **Party context** — May add celebratory elements for party marketing

---

## Image Requirements

### Images Needed

| Image | Dimensions | Quantity | Notes |
|-------|------------|----------|-------|
| Hero (parties) | 1920x1080 | 1 | Kids at party, celebration |
| Hero (camps) | 1920x1080 | 1 | Camp activities, group fun |
| Party gallery | 800x600 | 8-10 | Various party moments |
| Camp gallery | 800x600 | 6-8 | Camp activities |
| Facility photos | 1200x800 | 4-6 | Gym space, party room |
| Staff photos | 400x400 | 2-4 | Friendly headshots |
| Logo | SVG | 1 | Vector format |
| Favicon | 32x32 | 1 | ICO or PNG |

### Image Style Guidelines

- **Celebratory** — Kids laughing, having fun
- **Action-oriented** — Movement, games, activities
- **Inclusive** — Diverse group shots
- **Well-lit** — Bright, professional lighting
- **Parent-friendly** — Safe, supervised activities visible

---

## Content & Copy

### Business Information

| Field | Value |
|-------|-------|
| **Business Name** | NewGround Kids |
| **Location** | Sherman Oaks, CA |
| **Address** | 4617 Van Nuys Blvd, Unit B, Sherman Oaks, CA 91403 |
| **Phone** | (818) 538-4989 |
| **Email** | newgroundjj@gmail.com |
| **Website** | https://newgroundkids.com |

### Brand Taglines & Headlines

**Primary Tagline:**
- "Epic Parties & Camps for Kids"
- (Alternative: "Where Kids' Best Memories Are Made")

**Hero Headlines:**
- "The Ultimate Birthday Party Experience"
- "Action-Packed Camps Your Kids Will Love"
- "Book Your Epic Event Today"

**Value Propositions:**
- "Unforgettable parties kids talk about for years"
- "Safe, supervised, action-packed fun"
- "Stress-free planning for parents"
- "Professional staff, premium experience"

### Calls to Action (CTAs)

| CTA Text | Usage |
|----------|-------|
| "Plan Your Party" | Primary party booking CTA |
| "Book Now" | Generic booking CTA |
| "View Packages" | Party packages CTA |
| "Register for Camp" | Camp registration CTA |
| "Request Quote" | Private rental CTA |
| "Check Availability" | Calendar/availability CTA |
| "Contact Us" | General inquiry CTA |

### Testimonials (Event-Focused)

> "The birthday party was absolutely AMAZING! The kids had so much fun and the staff took care of everything. Best party we've ever thrown!"  
> — **Sarah M.**, Party Parent

> "My son hasn't stopped talking about camp. The activities were perfect and he made so many friends. Already signed up for next summer!"  
> — **Michael R.**, Camp Parent

> "We rented the space for our scout troop and it was perfect. The kids loved the activities and the staff was incredibly helpful."  
> — **Jennifer L.**, Troop Leader

### SEO Keywords (Updated)

**Primary:**
- kids birthday party venue sherman oaks
- birthday party packages for kids
- kids party place near me
- summer camp sherman oaks
- kids camp near me

**Secondary:**
- martial arts birthday party
- action birthday party for kids
- kids event venue rental
- holiday camp for kids
- private event space for kids

### Meta Descriptions

**Homepage:**
> "Epic birthday parties and camps for kids in Sherman Oaks! Action-packed packages from $299. Safe, fun, unforgettable. Book your event today!"

**Birthday Parties Page:**
> "Throw the ultimate birthday party at NewGround Kids! Martial arts games, obstacle courses, and party packages for all budgets. Book now!"

**Camps Page:**
> "Action-packed summer, holiday, and school break camps for kids in Sherman Oaks. Daily or weekly options. Register today!"

**About Page:**
> "NewGround Kids is Sherman Oaks' premier kids event venue. Birthday parties, camps, and private rentals in a safe, fun environment."

---

## CSS Variables Reference

### NGK Design Tokens

```css
:root {
  /* Colors */
  --color-primary: #E53935;
  --color-primary-dark: #C62828;
  --color-secondary: #1E293B;
  --color-accent: #F59E0B;
  --color-background: #FFFFFF;
  --color-background-alt: #F8FAFC;
  --color-text: #1E293B;
  --color-text-light: #64748B;
  --color-success: #10B981;
  --color-error: #EF4444;
  
  /* Typography */
  --font-heading: "Bebas Neue", sans-serif;
  --font-body: "Libre Franklin", sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

---

## Design Recommendations for NGK

### Homepage Layout (Event-Focused)

| Order | Section | Content |
|-------|---------|---------|
| 1 | Hero | Party video/image, "Plan Your Party" CTA |
| 2 | Event Types | 3 cards (Parties, Camps, Private Rentals) |
| 3 | Party Packages | Bronze/Silver/Gold preview cards |
| 4 | Photo Gallery | Party action shots carousel |
| 5 | Testimonials | Parent reviews (party-focused) |
| 6 | Upcoming Camps | Next 1-2 camps with dates |
| 7 | CTA Banner | "Book Your Event Today" |
| 8 | Footer | Contact, hours, social, links |

### Navigation Structure

```
Desktop:
[LOGO]   Birthday Parties   Camps   Private Events   About   Contact   [BOOK NOW]

Mobile:
[LOGO]   [☰ Menu]   [BOOK NOW sticky]
```

### Key Design Principles

1. **Book-first** — Every page funnels to booking
2. **Visual proof** — Gallery/photos prominently featured
3. **Clear pricing** — No hidden costs, packages visible
4. **Mobile-optimized** — Parents book on phones
5. **Trust signals** — Reviews, safety info, staff credentials

### Brand Voice Guidelines

| Do | Don't |
|----|-------|
| "Book your party" | "Enroll your child" |
| "Epic events" | "Training programs" |
| "Unforgettable memories" | "Belt progression" |
| "Action-packed fun" | "Martial arts curriculum" |
| "Your event" | "Your child's journey" |

---

## Project Structure

```
ngk/
├── docs/                 # Documentation
├── scripts/              # PowerShell automation scripts
│   ├── ship.ps1          # Validate + commit + push + deploy
│   ├── start.ps1         # Start dev server
│   ├── stop.ps1          # Clean build cache
│   ├── sync.ps1          # Git sync with AI commit messages
│   └── merge.ps1         # PR merge workflow
├── src/                  # Next.js application
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── config/           # Site configuration
│   ├── data/             # Static data (packages, camps, etc.)
│   ├── lib/              # Utilities
│   └── types/            # TypeScript types
├── public/               # Static assets
├── package.json          # Dependencies & scripts
├── pnpm-lock.yaml        # Lockfile (pnpm)
└── tsconfig.json         # TypeScript config
```

### Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm ship` | Validate, commit, push (CI-safe) |
| `pnpm sync` | Pull changes + AI commit message |
| `pnpm dev-start` | Clean start (clears cache first) |

### Deployment

- **Platform:** Vercel
- **Root Directory:** `.` (project root)
- **Package Manager:** pnpm
- **Node Version:** 22.x

---

## File References

| File | Path | Description |
|------|------|-------------|
| Site Config | `src/config/site.ts` | Runtime site configuration |
| Project Spec | `.briefs/NGK_SINGLE_TENANT_SPEC.md` | Full project specification |
| Package Data | `src/data/packages.ts` | Birthday party packages |
| Camp Data | `src/data/camps.ts` | Camp information |

---

*Last Updated: January 18, 2026*  
*Version: 2.1 (Flattened Structure)*
