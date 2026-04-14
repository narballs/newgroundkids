// Events Data
// Recurring events like Parents Night Out, Pizza Night, etc.

import {
  LucideIcon,
  Pizza,
  Gamepad2,
  Palette,
  Film,
  Heart,
  Shield,
  Users,
  Baby,
  Flower,
  Sun,
  Flower2,
  Waves,
  IceCream,
  Music,
  TreePine,
} from "lucide-react";

export interface EventActivity {
  icon: string; // Lucide icon name
  label: string;
}

export interface EventTimeSlot {
  label: string;
  ageRange: string;
  time: string;
  calEventSlug: string;
}

export interface RecurringEvent {
  id: string;
  name: string;
  emoji?: string;
  subtitle: string;
  description: string;
  date: string;
  dayOfWeek: string;
  dropOff: string;
  pickUp: string;
  location: string;
  addressLine1: string;
  addressLine2: string;
  pricing: {
    perChild: number;
    description: string;
  };
  activities: EventActivity[];
  calEventSlug: string;
  featured: boolean;
  // For display
  tagline?: string;
  theme?: {
    primary: string; // Hex color for buttons/accents
    secondary: string; // Hex color for backgrounds/secondary elements
    burstColor: string;
  };
  timeSlots?: EventTimeSlot[];
}

export const upcomingEvents: RecurringEvent[] = [
  {
    id: "valentines-2026",
    name: "Valentine's Day Parents Night Out",
    emoji: "💖",
    subtitle: "4 Hours of Freedom",
    description:
      "Treat yourself to a romantic evening while your kids have a blast! We've got games, a bounce house, pizza, and a movie. It's the perfect date night solution.",
    date: "February 14th",
    dayOfWeek: "Friday",
    dropOff: "4:00 PM",
    pickUp: "8:00 PM",
    location: "New Ground Jiu Jitsu",
    addressLine1: "4617 Van Nuys Blvd, Unit B",
    addressLine2: "Sherman Oaks, CA 91403",
    pricing: {
      perChild: 40,
      description: "per child",
    },
    activities: [
      { icon: "Gamepad2", label: "Fun Games" },
      { icon: "Heart", label: "Bounce House" },
      { icon: "Pizza", label: "Pizza & Snacks" },
      { icon: "Film", label: "Movie & Popcorn" },
    ],
    calEventSlug: "valentines-night-out",
    featured: true,
    tagline: "You enjoy date night. We'll handle the fun.",
    theme: {
      primary: "#E11D48", // Rose-600
      secondary: "#FFE4E6", // Rose-100
      burstColor: "#E11D48",
    },
  },
  {
    id: "mothers-day-2026",
    name: "Mother's Day Mommy & Me Jiu Jitsu",
    emoji: "🌸",
    subtitle: "Train Together. Bond Forever.",
    description:
      "Celebrate Mother's Day with an unforgettable Mommy & Me jiu jitsu class! Moms and kids will learn together, play together, and create memories that last a lifetime. No experience needed — just bring your smile and your mom!",
    date: "May 10th",
    dayOfWeek: "Sunday",
    dropOff: "10:00 AM",
    pickUp: "2:30 PM",
    location: "New Ground Jiu Jitsu",
    addressLine1: "4617 Van Nuys Blvd, Unit B",
    addressLine2: "Sherman Oaks, CA 91403",
    pricing: {
      perChild: 0,
      description: "FREE for mom & child pair",
    },
    activities: [
      { icon: "Shield", label: "Jiu Jitsu Basics" },
      { icon: "Users", label: "Mommy & Me Drills" },
      { icon: "Flower", label: "Mother's Day Crafts" },
      { icon: "Pizza", label: "Snacks & Refreshments" },
    ],
    calEventSlug: "mothers-day-mommy-and-me",
    featured: false,
    tagline: "The best gift is time together on the mats.",
    theme: {
      primary: "#9333EA", // Purple-600
      secondary: "#F3E8FF", // Purple-50
      burstColor: "#9333EA",
    },
    timeSlots: [
      {
        label: "Little Warriors",
        ageRange: "Ages 3–5",
        time: "10:00 AM – 10:45 AM",
        calEventSlug: "mothers-day-ages-3-5",
      },
      {
        label: "Junior Grapplers",
        ageRange: "Ages 6–9",
        time: "11:15 AM – 12:15 PM",
        calEventSlug: "mothers-day-ages-6-9",
      },
      {
        label: "Youth Warriors",
        ageRange: "Ages 10+",
        time: "1:00 PM – 2:00 PM",
        calEventSlug: "mothers-day-ages-10-plus",
      },
    ],
  },
  {
    id: "spring-2026",
    name: "Spring Fling Parents Night Out",
    emoji: "🌸",
    subtitle: "4 Hours of Spring Fun",
    description:
      "Spring is in the air! Drop off your kids for an evening of spring-themed games, bounce house, pizza, and a movie while you enjoy a night out.",
    date: "April 18th",
    dayOfWeek: "Saturday",
    dropOff: "4:00 PM",
    pickUp: "8:00 PM",
    location: "New Ground Jiu Jitsu",
    addressLine1: "4617 Van Nuys Blvd, Unit B",
    addressLine2: "Sherman Oaks, CA 91403",
    pricing: {
      perChild: 40,
      description: "per child",
    },
    activities: [
      { icon: "Gamepad2", label: "Spring Games" },
      { icon: "Flower2", label: "Bounce House" },
      { icon: "Pizza", label: "Pizza & Snacks" },
      { icon: "Film", label: "Movie & Popcorn" },
    ],
    calEventSlug: "spring-night-out",
    featured: true,
    tagline: "You enjoy a night out. We'll bring the spring fun.",
    theme: {
      primary: "#16A34A", // Green-600
      secondary: "#DCFCE7", // Green-100
      burstColor: "#16A34A",
    },
  },
  {
    id: "summer-2026",
    name: "Summer Splash Parents Night Out",
    emoji: "☀️",
    subtitle: "4 Hours of Summer Vibes",
    description:
      "Summer is here! Drop off your kids for an evening of summer-themed games, bounce house, pizza, and a movie while you soak up a free evening.",
    date: "June 20th",
    dayOfWeek: "Saturday",
    dropOff: "4:00 PM",
    pickUp: "8:00 PM",
    location: "New Ground Jiu Jitsu",
    addressLine1: "4617 Van Nuys Blvd, Unit B",
    addressLine2: "Sherman Oaks, CA 91403",
    pricing: {
      perChild: 40,
      description: "per child",
    },
    activities: [
      { icon: "Gamepad2", label: "Summer Games" },
      { icon: "Sun", label: "Bounce House" },
      { icon: "Pizza", label: "Pizza & Snacks" },
      { icon: "Film", label: "Movie & Popcorn" },
    ],
    calEventSlug: "summer-night-out",
    featured: true,
    tagline: "You enjoy a summer night. We'll keep the fun going.",
    theme: {
      primary: "#EA580C", // Orange-600
      secondary: "#FFF7ED", // Orange-50
      burstColor: "#EA580C",
    },
  },
];

// Helper to get event by slug
export const getEventBySlug = (slug: string) => {
  const slugMap: Record<string, string> = {
    valentines: "valentines-2026",
    "mothers-day": "mothers-day-2026",
    spring: "spring-2026",
    summer: "summer-2026",
  };
  return upcomingEvents.find((e) => e.id === slugMap[slug]);
};

// Helper to get the next upcoming event
export const getNextEvent = () => upcomingEvents.find((e) => e.featured) || upcomingEvents[0];

// Helper to get event by ID
export const getEventById = (id: string) => upcomingEvents.find((e) => e.id === id);

// Activity icons map for rendering
export const activityIcons: Record<string, LucideIcon> = {
  Gamepad2,
  Palette,
  Pizza,
  Film,
  Heart,
  Shield,
  Users,
  Baby,
  Flower,
  Sun,
  Flower2,
  Waves,
  IceCream,
  Music,
  TreePine,
};
