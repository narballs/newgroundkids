// ============================================
// NGK Camps Data
// ============================================

export interface Camp {
  id: string;
  name: string;
  slug: string;
  type: "summer" | "winter" | "spring" | "holiday";
  startDate: string;
  endDate: string;
  ageRange: string;
  ageMin: number;
  ageMax: number;
  price: number;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: string;
  description: string;
  highlights: string[];
  schedule: string;
  spotsTotal: number;
  spotsRemaining: number;
  image: {
    url: string;
    alt: string;
  };
  featured?: boolean;
  status: "upcoming" | "open" | "filling" | "full" | "completed";
}

export const camps: Camp[] = [
  {
    id: "summer-2026-week1",
    name: "Summer Camp - Week 1",
    slug: "summer-2026-week1",
    type: "summer",
    startDate: "2026-06-15",
    endDate: "2026-06-19",
    ageRange: "5-12 years",
    ageMin: 5,
    ageMax: 12,
    price: 349,
    earlyBirdPrice: 299,
    earlyBirdDeadline: "2026-05-15",
    description: "Kick off summer with a week of martial arts adventure! Campers will learn jiu jitsu fundamentals, play team games, and build lasting friendships.",
    highlights: [
      "Daily jiu jitsu instruction",
      "Team building games",
      "Obstacle courses",
      "Friday mini-tournament",
      "Camp t-shirt included",
    ],
    schedule: "Monday-Friday, 9:00 AM - 3:00 PM",
    spotsTotal: 24,
    spotsRemaining: 18,
    image: {
      url: "/images/camps/summer-camp.jpg",
      alt: "Kids having fun at summer martial arts camp",
    },
    featured: true,
    status: "open",
  },
  {
    id: "summer-2026-week2",
    name: "Summer Camp - Week 2",
    slug: "summer-2026-week2",
    type: "summer",
    startDate: "2026-06-22",
    endDate: "2026-06-26",
    ageRange: "5-12 years",
    ageMin: 5,
    ageMax: 12,
    price: 349,
    earlyBirdPrice: 299,
    earlyBirdDeadline: "2026-05-15",
    description: "Continue the summer fun with week 2! Each week features new games and challenges while reinforcing jiu jitsu skills.",
    highlights: [
      "Daily jiu jitsu instruction",
      "New games and activities",
      "Swimming trip (Wednesday)",
      "Friday showcase for parents",
      "Camp t-shirt included",
    ],
    schedule: "Monday-Friday, 9:00 AM - 3:00 PM",
    spotsTotal: 24,
    spotsRemaining: 20,
    image: {
      url: "/images/camps/summer-camp.jpg",
      alt: "Kids at summer martial arts camp",
    },
    featured: false,
    status: "open",
  },
  {
    id: "summer-2026-week3",
    name: "Summer Camp - Week 3",
    slug: "summer-2026-week3",
    type: "summer",
    startDate: "2026-06-29",
    endDate: "2026-07-03",
    ageRange: "5-12 years",
    ageMin: 5,
    ageMax: 12,
    price: 349,
    earlyBirdPrice: 299,
    earlyBirdDeadline: "2026-05-15",
    description: "Week 3 brings new adventures! This week focuses on self-defense skills and building confidence.",
    highlights: [
      "Self-defense focus",
      "Confidence workshops",
      "Team challenges",
      "Thursday celebration (July 3rd)",
      "Camp t-shirt included",
    ],
    schedule: "Monday-Thursday, 9:00 AM - 3:00 PM (4-day week)",
    spotsTotal: 24,
    spotsRemaining: 22,
    image: {
      url: "/images/camps/summer-camp.jpg",
      alt: "Summer camp activities",
    },
    featured: false,
    status: "open",
  },
  {
    id: "spring-break-2026",
    name: "Spring Break Camp",
    slug: "spring-break-2026",
    type: "spring",
    startDate: "2026-03-30",
    endDate: "2026-04-03",
    ageRange: "5-12 years",
    ageMin: 5,
    ageMax: 12,
    price: 299,
    earlyBirdPrice: 249,
    earlyBirdDeadline: "2026-03-01",
    description: "Make spring break active and fun! A week of martial arts, games, and new friends.",
    highlights: [
      "Daily martial arts training",
      "Outdoor activities (weather permitting)",
      "Movie afternoon",
      "Friday pizza party",
      "Camp t-shirt included",
    ],
    schedule: "Monday-Friday, 9:00 AM - 3:00 PM",
    spotsTotal: 20,
    spotsRemaining: 8,
    image: {
      url: "/images/camps/spring-camp.jpg",
      alt: "Kids at spring break camp",
    },
    featured: true,
    status: "filling",
  },
  {
    id: "winter-break-2025",
    name: "Winter Break Camp",
    slug: "winter-break-2025",
    type: "winter",
    startDate: "2025-12-22",
    endDate: "2025-12-24",
    ageRange: "5-12 years",
    ageMin: 5,
    ageMax: 12,
    price: 199,
    description: "A 3-day mini-camp during winter break. Keep kids active while school is out!",
    highlights: [
      "3-day mini-camp",
      "Holiday-themed activities",
      "Gingerbread house building",
      "Gift exchange (optional)",
    ],
    schedule: "Mon-Wed, 9:00 AM - 1:00 PM",
    spotsTotal: 16,
    spotsRemaining: 0,
    image: {
      url: "/images/camps/winter-camp.jpg",
      alt: "Winter break camp fun",
    },
    featured: false,
    status: "full",
  },
];

// Helper functions
export function getUpcomingCamps(): Camp[] {
  const today = new Date().toISOString().split("T")[0]!;
  return camps
    .filter((c) => c.startDate >= today && c.status !== "completed")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getFeaturedCamps(): Camp[] {
  return camps.filter((c) => c.featured && c.status !== "completed" && c.status !== "full");
}

export function getCampsByType(type: Camp["type"]): Camp[] {
  return camps.filter((c) => c.type === type);
}

export function getCampBySlug(slug: string): Camp | undefined {
  return camps.find((c) => c.slug === slug);
}

export function getOpenCamps(): Camp[] {
  return camps.filter((c) => c.status === "open" || c.status === "filling");
}
