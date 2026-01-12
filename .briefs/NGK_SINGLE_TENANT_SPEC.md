# NewGround Kids (NGK) - Website Specification

> **Project URL:** https://newgroundkids.com/  
> **Short Name:** NGK  
> **Type:** Kids event booking platform  
> **Reference Site:** https://kids.fightworkshq.com/  
> **Design Inspiration:** https://artofjiujitsu.com/  
> **Version:** 2.0 (Events Pivot)  
> **Created:** January 2026  
> **Updated:** January 12, 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Site Architecture](#site-architecture)
4. [Page Specifications](#page-specifications)
5. [Booking System](#booking-system)
6. [Payments](#payments)
7. [Content Management](#content-management)
8. [Design Direction](#design-direction)
9. [Component Library](#component-library)
10. [Development Timeline](#development-timeline)
11. [Content Requirements](#content-requirements)
12. [Open Questions](#open-questions)

---

## Project Overview

### What We're Building

A modern website for NewGround Kids, a **kids event booking platform** offering:

- **Birthday Parties** — Bronze, Silver, Gold packages with martial arts activities
- **Seasonal Camps** — Summer, Holiday, School Break day camps
- **Private Rentals** — Gym rentals for private events, groups, and holidays

> ⚠️ **Important:** This is NOT a martial arts school website. NGK does not offer recurring classes, memberships, or student enrollment. It is exclusively an **event booking platform**.

### Goals

1. Professional online presence for event bookings
2. Easy party/camp booking for parents
3. Seamless payment processing
4. Simple content updates without developer
5. Mobile-first experience

### Reference Analysis

**Kids FightWorks HQ (Content Reference)**
- Platform: Wodify Sites
- Strengths: Event-focused, clear pricing, testimonials
- Weaknesses: Dated UX, JavaScript-heavy

**Art of Jiu Jitsu (Design Reference)**
- Platform: Shopify
- Strengths: Premium feel, video-first, clean navigation
- Weaknesses: Too dark for kids brand, needs more warmth

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15 | React, SSR, API routes |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI** | shadcn/ui | Component library |
| **Booking** | Cal.com | Scheduling, availability |
| **Payments** | Stripe | One-time payments |
| **CMS** | Payload CMS | Content management |
| **Email** | Resend | Transactional emails |
| **Hosting** | Vercel | Deployment |
| **Analytics** | Plausible | Privacy-friendly |

### Why This Stack

| Requirement | Solution |
|-------------|----------|
| AI-friendly coding | Next.js, Stripe, Cal.com — extensive docs, CLI tools |
| Easy content updates | Payload CMS — admin panel for non-technical staff |
| Modern booking UX | Cal.com — clean, mobile-friendly |
| Reliable payments | Stripe — industry standard |
| Fast performance | Vercel edge deployment |
| Cost effective | All tools have generous free tiers |

---

## Site Architecture

### Sitemap

```
newgroundkids.com/
├── / (Home)
│   └── Event showcase, party hero, camps preview
├── /birthday-parties
│   └── Packages, availability, inquiry form
├── /camps
│   └── Upcoming camps, registration
├── /private-events
│   └── Rental info, use cases, inquiry form
├── /about
│   └── Venue story, team, facility photos
├── /contact
│   └── Location, hours, contact form
├── /faq
│   └── Event-focused FAQs
├── /privacy-policy
└── /terms-of-service
```

### URL Structure

| Page | URL | Dynamic |
|------|-----|---------|
| Home | `/` | No |
| Birthday parties | `/birthday-parties` | No |
| Camps listing | `/camps` | No |
| Private events | `/private-events` | No |
| About | `/about` | No |
| Contact | `/contact` | No |
| FAQ | `/faq` | No |
| Privacy | `/privacy-policy` | No |
| Terms | `/terms-of-service` | No |

### Pages REMOVED (from v1.0)

The following pages from the original spec are **no longer applicable**:

| Page | Reason |
|------|--------|
| `/programs` | No recurring classes |
| `/programs/[slug]` | No program detail pages |
| `/schedule` | No class schedule |
| `/pricing` | Pricing shown on event pages |
| `/free-trial` | No trials for events |
| `/about/instructors` | Staff shown on About page |

---

## Page Specifications

### Home Page (`/`)

**Purpose:** Showcase events, drive party bookings (highest revenue)

**Sections:**

| Order | Section | Content |
|-------|---------|---------|
| 1 | Hero | Party video/image, headline, "Plan Your Party" CTA |
| 2 | Event Types | 3 cards (Parties, Camps, Private Rentals) |
| 3 | Party Packages | Bronze/Silver/Gold preview cards |
| 4 | Photo Gallery | 6-8 party action shots |
| 5 | Testimonials | 3 parent testimonials carousel |
| 6 | Upcoming Camps | Next 1-2 camps with dates |
| 7 | CTA Banner | "Book Your Event Today" |
| 8 | Footer | Contact, hours, social, links |

**Hero Content:**
```
Headline: "Epic Parties & Camps for Kids"
Subheadline: "Unforgettable events in Sherman Oaks. Safe, fun, action-packed!"
Primary CTA: "Plan Your Party"
Secondary CTA: "Explore Camps"
```

---

### Birthday Parties (`/birthday-parties`)

**Purpose:** Showcase packages, drive party bookings

**Sections:**

| Order | Section | Content |
|-------|---------|---------|
| 1 | Hero | Party action shot, headline |
| 2 | Intro | Why our parties are awesome |
| 3 | Packages | 3 tier cards (Bronze, Silver, Gold) |
| 4 | What's Included | Detailed checklist per package |
| 5 | Add-Ons | Optional extras (extra kids, pizza, decorations) |
| 6 | Gallery | 6-8 party photos |
| 7 | How It Works | 4 step booking process |
| 8 | Availability | Calendar showing available dates (Sat/Sun) |
| 9 | FAQ | Party-specific questions |
| 10 | Inquiry Form | Name, email, phone, preferred date, package, notes |

**Packages:**

| Package | Price | Duration | Kids | Includes |
|---------|-------|----------|------|----------|
| Bronze | $299 | 90 min | 10 | Martial arts games, obstacle course, board break, party room |
| Silver | $449 | 120 min | 15 | Bronze + pizza, drinks, paper goods, goodie bags |
| Gold | $599 | 150 min | 20 | Silver + cake, decorations, photo booth, t-shirt for birthday child |

**Add-Ons:**
- Additional child: $15/kid
- Extra pizza: $20
- Custom decorations: $50
- Extended time: $100/30min

---

### Camps (`/camps`)

**Purpose:** Promote seasonal camps, drive registration

**Sections:**

| Order | Section | Content |
|-------|---------|---------|
| 1 | Hero | Camp action shot, headline |
| 2 | Intro | What makes NGK camps special |
| 3 | Upcoming Camps | Cards with dates, pricing, status badge, register button |
| 4 | Daily Schedule | Sample camp day breakdown |
| 5 | What's Included | Activities, snacks, instruction |
| 6 | What to Bring | Checklist for parents |
| 7 | Gallery | 4-6 camp photos |
| 8 | FAQ | Camp-specific questions |
| 9 | CTA | Register button |

**Camp Types:**

| Type | Timing | Price |
|------|--------|-------|
| Summer Camp | June-August, weekly | $349/week or $79/day |
| Holiday Camp | Winter/Spring break | $79/day |
| School Break | Teacher workdays | $79/day |

**Daily Schedule Example:**
```
8:00 AM  - Drop-off, free play
9:00 AM  - Warm-up, martial arts games
10:30 AM - Snack break
11:00 AM - Games & activities
12:00 PM - Lunch
1:00 PM  - Arts & crafts / Movie time
2:00 PM  - Martial arts activities
3:30 PM  - Snack break
4:00 PM  - Free play, games
5:00 PM  - Pick-up
```

---

### Private Events (`/private-events`) — NEW

**Purpose:** Attract private rental inquiries

**Sections:**

| Order | Section | Content |
|-------|---------|---------|
| 1 | Hero | Facility photo, "Rent Our Space" headline |
| 2 | Intro | Why our venue is perfect for private events |
| 3 | Use Cases | 4-6 cards (Team parties, Holiday events, Scout troops, etc.) |
| 4 | What's Included | Space size, amenities, staff options |
| 5 | Pricing Overview | "Starting at $X/hour" (custom quotes) |
| 6 | Facility Photos | 4-6 photos of space |
| 7 | Inquiry Form | Name, email, phone, event type, date, group size, notes |

**Use Cases:**
- Kids' team parties (sports teams, scout troops)
- Holiday events (Halloween, New Year's Eve)
- Corporate family days
- Homeschool group activities
- Private group events
- Team building for kids' organizations

---

### About (`/about`)

**Purpose:** Build trust, showcase venue

**Sections:**

| Order | Section | Content |
|-------|---------|---------|
| 1 | Hero | Facility photo, headline |
| 2 | Our Story | 2-3 paragraphs about NGK |
| 3 | Our Values | 4 value blocks (Safety, Fun, Professionalism, Memories) |
| 4 | Facility | 4-6 photos of space |
| 5 | Team | Staff photos and brief bios |
| 6 | CTA | Book event button |

---

### Contact (`/contact`)

**Purpose:** Easy communication, location info

**Sections:**

| Order | Section | Content |
|-------|---------|---------|
| 1 | Hero | Simple headline |
| 2 | Contact Info | Address, phone, email, hours |
| 3 | Map | Google Maps embed |
| 4 | Form | Name, email, phone, event type, message |
| 5 | Social | Instagram, Facebook links |

---

### FAQ (`/faq`)

**Purpose:** Answer common questions, reduce support

**Categories:**
- General
- Birthday Parties
- Camps
- Private Rentals
- Policies

**Format:** Accordion by category

---

## Booking System

### Cal.com Setup

**Event Types:**

| Event | Duration | Capacity | Price | Deposit |
|-------|----------|----------|-------|---------|
| Birthday Party - Bronze | 90 min | 1 party | $299 | $150 |
| Birthday Party - Silver | 120 min | 1 party | $449 | $225 |
| Birthday Party - Gold | 150 min | 1 party | $599 | $300 |
| Summer Camp - Day | Full day | 20 kids | $79 | Full |
| Summer Camp - Week | 5 days | 20 kids | $349 | Full |
| Holiday Camp - Day | Full day | 20 kids | $79 | Full |
| Private Rental - Hourly | 1 hour | Custom | Quote | 50% |

### Booking Flow (Parties)

```
1. Parent views packages on /birthday-parties
2. Clicks "Check Availability" or "Book Now"
3. Cal.com shows available Sat/Sun time slots
4. Parent selects date/time
5. Parent enters:
   - Name (parent)
   - Email
   - Phone
   - Child name
   - Child age
   - Number of guests
   - Package selection
   - Notes/special requests
6. Redirects to Stripe for 50% deposit
7. Confirmation email sent
8. Remaining 50% charged 7 days before party
```

### Booking Flow (Camps)

```
1. Parent views camps on /camps
2. Selects camp (Summer Week 1, Holiday Day, etc.)
3. Cal.com shows remaining spots
4. Parent enters child info
5. Full payment via Stripe
6. Confirmation email with waiver link
```

### Booking Flow (Private Rentals)

```
1. Parent fills inquiry form on /private-events
2. Staff receives notification
3. Staff responds with custom quote
4. If approved, staff sends Cal.com booking link
5. 50% deposit via Stripe
6. Remaining 50% charged on event day
```

### Cal.com Webhooks

| Event | Action |
|-------|--------|
| `booking.created` | Send confirmation email |
| `booking.cancelled` | Send cancellation email, process refund |
| `booking.rescheduled` | Send update email |

---

## Payments

### Stripe Products

**One-Time Payments:**

| Product | Price ID | Amount |
|---------|----------|--------|
| Birthday - Bronze (Deposit) | `price_xxx` | $150 |
| Birthday - Bronze (Balance) | `price_xxx` | $149 |
| Birthday - Silver (Deposit) | `price_xxx` | $225 |
| Birthday - Silver (Balance) | `price_xxx` | $224 |
| Birthday - Gold (Deposit) | `price_xxx` | $300 |
| Birthday - Gold (Balance) | `price_xxx` | $299 |
| Camp - Day | `price_xxx` | $79 |
| Camp - Week | `price_xxx` | $349 |
| Party Add-On - Extra Child | `price_xxx` | $15 |
| Party Add-On - Pizza | `price_xxx` | $20 |
| Party Add-On - Decorations | `price_xxx` | $50 |
| Party Add-On - Extended Time | `price_xxx` | $100 |

### Payment Flows

**Birthday Party:**
```
1. Parent books via Cal.com
2. Selects package
3. Redirects to Stripe Checkout
4. 50% deposit charged
5. Remaining 50% auto-charged 7 days before party
6. Confirmation email with details
```

**Camp:**
```
1. Parent registers via Cal.com
2. Full payment via Stripe Checkout
3. Confirmation email sent
```

**Private Rental:**
```
1. Staff sends custom invoice via Stripe
2. 50% deposit due to confirm
3. Balance due on event day
```

### Stripe Webhooks

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Confirm booking, send receipt |
| `payment_intent.succeeded` | Log payment |
| `payment_intent.payment_failed` | Send failed payment email |
| `invoice.payment_failed` | Alert staff |

---

## Content Management

### Payload CMS Collections

**Birthday Packages:**
```
- name (text)
- slug (text)
- price (number)
- duration (number, minutes)
- maxKids (number)
- includes (array of text)
- highlights (array of text)
- stripePriceId (text)
- stripeDepositPriceId (text)
- order (number)
- published (boolean)
```

**Party Add-Ons:**
```
- name (text)
- price (number)
- description (text)
- stripePriceId (text)
- order (number)
- published (boolean)
```

**Camps:**
```
- title (text)
- slug (text)
- type (select: summer, holiday, school-break)
- startDate (date)
- endDate (date)
- priceDay (number)
- priceWeek (number)
- capacity (number)
- spotsRemaining (number)
- ageRange (text)
- description (rich text)
- dailySchedule (rich text)
- whatToBring (array of text)
- stripePriceIdDay (text)
- stripePriceIdWeek (text)
- status (select: upcoming, open, filling-up, full, completed)
- published (boolean)
```

**Testimonials:**
```
- name (text)
- role (text) // e.g., "Party Parent", "Camp Parent"
- quote (textarea)
- photo (upload, optional)
- rating (number, 1-5)
- eventType (select: party, camp, rental)
- featured (boolean)
- order (number)
- published (boolean)
```

**FAQs:**
```
- question (text)
- answer (rich text)
- category (select: general, parties, camps, rentals, policies)
- order (number)
- published (boolean)
```

**Team Members:**
```
- name (text)
- title (text)
- photo (upload)
- bio (textarea)
- order (number)
- published (boolean)
```

**Gallery Images:**
```
- image (upload)
- caption (text, optional)
- category (select: parties, camps, facility)
- featured (boolean)
- order (number)
- published (boolean)
```

**Site Settings:**
```
- siteName (text)
- tagline (text)
- logo (upload)
- favicon (upload)
- address (text)
- city (text)
- state (text)
- zip (text)
- phone (text)
- email (text)
- partyHours (text)
- campHours (text)
- socialInstagram (text)
- socialFacebook (text)
- primaryColor (text)
- accentColor (text)
```

---

## Design Direction

### Brand Identity

| Attribute | Value |
|-----------|-------|
| **Name** | NewGround Kids |
| **Tagline** | "Epic Parties & Camps for Kids" |
| **Tone** | Fun, celebratory, trustworthy |
| **Target** | Parents of kids ages 4-14 |
| **Vibe** | Premium party venue, not gym |

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Red) | `#E53935` | CTAs, primary actions |
| Accent (Gold) | `#F59E0B` | Highlights, badges, celebration |
| Dark | `#1E293B` | Text, headers |
| Light | `#F8FAFC` | Backgrounds |
| White | `#FFFFFF` | Cards, sections |
| Success | `#10B981` | Confirmations, availability |
| Error | `#EF4444` | Alerts, errors |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Bebas Neue | 400 | 48px / 36px mobile |
| H2 | Bebas Neue | 400 | 36px / 28px mobile |
| H3 | Libre Franklin | 700 | 24px / 20px mobile |
| Body | Libre Franklin | 400 | 16px |
| Small | Libre Franklin | 400 | 14px |
| Button | Libre Franklin | 600 | 16px |

### Design Principles

1. **Book-first** — Every page funnels to booking/inquiry
2. **Visual proof** — Party photos prominently featured
3. **Clear pricing** — Packages visible, no hidden costs
4. **Mobile-optimized** — Parents book on phones
5. **Trust signals** — Reviews, safety info, staff photos
6. **Celebration vibe** — Fun, energetic, not "gym-like"

---

## Component Library

### Navigation

```
Desktop:
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]   Birthday Parties  Camps  Private Events  About  Contact  [BOOK NOW] │
└─────────────────────────────────────────────────────────────────┘

Mobile:
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]                                        [☰]  [BOOK NOW]  │
└─────────────────────────────────────────────────────────────────┘
```

### Hero Section

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    [PARTY VIDEO/IMAGE]                          │
│                                                                 │
│                 EPIC PARTIES & CAMPS                            │
│                    FOR KIDS                                     │
│                                                                 │
│        Unforgettable events in Sherman Oaks                     │
│                                                                 │
│             [Plan Your Party]  [Explore Camps]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Package Card

```
┌─────────────────────┐
│      SILVER         │
│      $449           │
│                     │
│   2 hours | 15 kids │
│                     │
│  ✓ Games & activities│
│  ✓ Party room       │
│  ✓ Pizza & drinks   │
│  ✓ Goodie bags      │
│                     │
│  [Book This Package]│
└─────────────────────┘
```

### Camp Card

```
┌─────────────────────────────────────────────┐
│  [CAMP IMAGE]                               │
│                                             │
│  SUMMER CAMP - WEEK 3           [FILLING UP]│
│  June 16-20, 2026                           │
│                                             │
│  Ages 5-12 | 8am-5pm                        │
│  $349/week or $79/day                       │
│                                             │
│  [Register Now]                             │
└─────────────────────────────────────────────┘
```

### Testimonial Card

```
┌─────────────────────────────────────────────┐
│  "The birthday party was absolutely AMAZING!│
│   The kids had so much fun and the staff    │
│   took care of everything."                 │
│                                             │
│  ★★★★★                                      │
│                                             │
│  [PHOTO]  Sarah M.                          │
│           Party Parent                      │
└─────────────────────────────────────────────┘
```

### Footer

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]                                                         │
│                                                                 │
│  EVENTS           COMPANY         CONTACT        FOLLOW US      │
│  Birthday Parties About Us        [Address]      [IG] [FB]      │
│  Camps            Contact         [Phone]                       │
│  Private Events   FAQ             [Email]                       │
│                                                                 │
│  HOURS                                                          │
│  Parties: Sat-Sun 10am-6pm | Camps: Mon-Fri 8am-5pm             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  © 2026 NewGround Kids. All rights reserved.  Privacy | Terms  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Development Timeline

### Current Status (as of Jan 12, 2026)

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Design System | ✅ Complete | Red Belt Edition implemented |
| Phase 2: Core Pages | ⚠️ Needs Pivot | Pages built for classes, need event pivot |
| Phase 3: Forms | ✅ Complete | Server actions, validation working |
| Phase 4: Booking | 🔜 Pending | Cal.com integration |
| Phase 5: Payments | 🔜 Pending | Stripe integration |
| Phase 6: Launch | 🔜 Pending | SEO, deployment |

### Updated Timeline

#### Phase 2B: Content Pivot (Current)

| Task | Description |
|------|-------------|
| Update Homepage | Party-first hero, event cards |
| Update /birthday-parties | Already event-focused, minor updates |
| Update /camps | Already event-focused, minor updates |
| Create /private-events | New page for rentals |
| Update /about | Venue story, not academy story |
| Update /faq | Event-focused questions |
| Remove unused pages | /programs, /schedule, /pricing, /free-trial |
| Update navigation | New nav structure |
| Update footer | New link structure |
| Update site config | New tagline, keywords |

#### Phase 4: Booking (Week 4)

| Day | Task |
|-----|------|
| 1 | Cal.com setup + event types |
| 2 | Party booking widget (availability calendar) |
| 3 | Camp registration widget |
| 4 | Inquiry forms for private rentals |
| 5 | Testing all booking flows |

#### Phase 5: Payments (Week 5)

| Day | Task |
|-----|------|
| 1 | Stripe setup + products |
| 2 | Party deposit checkout flow |
| 3 | Camp full payment flow |
| 4 | Webhook handlers |
| 5 | Receipt emails |

#### Phase 6: Launch Prep (Week 6)

| Day | Task |
|-----|------|
| 1 | SEO: meta tags, sitemap, robots.txt |
| 2 | Performance optimization |
| 3 | Content entry (real content into CMS) |
| 4 | Testing: mobile, forms, payments |
| 5 | Deploy to production, DNS setup |

---

## Content Requirements

### Images Needed

| Image | Dimensions | Quantity | Notes |
|-------|------------|----------|-------|
| Hero (parties) | 1920x1080 | 1 | Kids at party, celebration |
| Hero (camps) | 1920x1080 | 1 | Camp activities |
| Party gallery | 800x600 | 8-10 | Various party moments |
| Camp gallery | 800x600 | 6-8 | Camp activities |
| Facility photos | 1200x800 | 4-6 | Gym space, party room |
| Staff photos | 400x400 | 2-4 | Friendly headshots |
| Logo | SVG | 1 | Vector format |
| Favicon | 32x32 | 1 | ICO or PNG |

### Copy Needed

| Section | Word Count | Notes |
|---------|------------|-------|
| Homepage hero | 20 | Headline + subheadline |
| About - Our Story | 150-200 | Venue history, mission |
| Party intro | 100 | Why our parties are awesome |
| Camp intro | 100 | What makes camps special |
| Private events intro | 100 | Why rent our space |
| FAQs | 50 each | 15-20 questions |
| Testimonials | 50 each | 5-10 testimonials |

### Info Needed

| Item | Example |
|------|---------|
| Business name | NewGround Kids |
| Full address | 4617 Van Nuys Blvd, Unit B, Sherman Oaks, CA 91403 |
| Phone | (818) 538-4989 |
| Email | info@newgroundkids.com |
| Party hours | Sat-Sun 10am-6pm |
| Camp hours | Mon-Fri 8am-5pm |
| Instagram | @newgroundkids |
| Facebook | facebook.com/newgroundkids |
| Staff names | Party Host names |
| Pricing | Confirm all package prices |

---

## Open Questions

| Question | Status | Decision |
|----------|--------|----------|
| NGK-specific logo? | ❓ | Use parent logo or create variant? |
| Party photos available? | ❓ | Real photos or stock/AI? |
| Staff info? | ❓ | Names, bios, photos for party hosts |
| Pricing confirmed? | ❓ | Package prices, add-ons |
| Cal.com account? | ❓ | Create or use existing? |
| Stripe account? | ❓ | Create or use existing? |
| Domain setup? | ❓ | DNS access for newgroundkids.com |
| Waiver system? | ❓ | Digital waiver for camps/parties? |

---

## Appendix

### Reference Sites

| Site | URL | Reference For |
|------|-----|---------------|
| Kids FightWorks HQ | https://kids.fightworkshq.com/ | Event structure |
| FightWorks HQ | https://www.fightworkshq.com/ | Full site reference |
| Art of Jiu Jitsu | https://artofjiujitsu.com/ | Design inspiration |
| Urban Air | https://www.urbanair.com/ | Party booking UX |
| Sky Zone | https://www.skyzone.com/ | Party/camp packages |

### Tech Documentation

| Tool | URL |
|------|-----|
| Next.js 15 | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| shadcn/ui | https://ui.shadcn.com |
| Payload CMS | https://payloadcms.com/docs |
| Cal.com | https://cal.com/docs |
| Stripe | https://stripe.com/docs |
| Resend | https://resend.com/docs |
| Vercel | https://vercel.com/docs |

---

*Document Version: 2.0 (Events Pivot)*  
*Last Updated: January 12, 2026*
