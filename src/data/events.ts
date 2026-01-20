// Events Data
// Recurring events like Parents Night Out, Pizza Night, etc.

import { LucideIcon, Pizza, Gamepad2, Palette, Film, Heart } from "lucide-react";

export interface EventActivity {
  icon: string; // Lucide icon name
  label: string;
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
      { icon: "Heart", label: "Bounce House" }, // Reusing icon for bounce house concept
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
];

// Helper to get the next upcoming event
export const getNextEvent = () => upcomingEvents.find((e) => e.featured) || upcomingEvents[0];

// Activity icons map for rendering
export const activityIcons: Record<string, LucideIcon> = {
  Gamepad2,
  Palette,
  Pizza,
  Film,
  Heart,
};
