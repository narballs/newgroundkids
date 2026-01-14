// Birthday Party Packages Data
// Based on NewGround Kids official pricing

export interface BirthdayPackage {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  deposit: number;
  duration: string;
  maxKids: number;
  hosts: number;
  featured?: boolean;
  color?: "coral" | "accent" | "purple";
  features: string[];
  bonuses?: string[];
}

export const birthdayPackages: BirthdayPackage[] = [
  {
    id: "small",
    name: "Small Party",
    subtitle: "Up to 12 Kids",
    price: 499,
    deposit: 200,
    duration: "2 hours",
    maxKids: 12,
    hosts: 1,
    color: "coral",
    features: [
      "45 minutes of gameplay & activities",
      "45 minutes of free play on mats",
      "30 minutes in party area for food, drinks & cake",
      "Digital invitations (design only)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
    ],
  },
  {
    id: "medium",
    name: "Medium Party",
    subtitle: "Up to 16 Kids",
    price: 699,
    deposit: 200,
    duration: "2 hours",
    maxKids: 16,
    hosts: 2,
    featured: true,
    color: "accent",
    features: [
      "45 minutes of gameplay & activities",
      "45 minutes of free play + indoor bounce house (ages 5-9)",
      "30 minutes in party area for food, drinks & cake",
      "Digital invitations (design only)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
    ],
    bonuses: ["Birthday child gets a free week of Jiu Jitsu classes"],
  },
  {
    id: "large",
    name: "Large Party",
    subtitle: "Up to 20 Kids",
    price: 899,
    deposit: 200,
    duration: "2.5 hours",
    maxKids: 20,
    hosts: 2,
    color: "purple",
    features: [
      "60 minutes of gameplay + indoor bounce house (ages 5-9)",
      "45 minutes of free play + bounce house (indoor or outdoor)",
      "45 minutes in party area for food, drinks & cake",
      "Premium invitations (custom designed)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
    ],
    bonuses: ["Birthday child gets a free month of classes", "Pizza and drinks for all guests"],
  },
];

export interface BirthdayExtra {
  id: string;
  name: string;
  price: number;
  note?: string;
  description?: string;
}

export const birthdayExtras: BirthdayExtra[] = [
  {
    id: "extra-time",
    name: "Extra 30 Minutes",
    price: 100,
  },
  {
    id: "extra-kids",
    name: "Additional Kids",
    price: 15,
    note: "per child",
  },
  {
    id: "decorations",
    name: "Balloons & Decorations",
    price: 100,
  },
  {
    id: "face-painting",
    name: "Face Painting",
    price: 125,
    note: "per artist/hr",
    description: "Small party: 1 artist | Medium/Large: 2 artists ($175/hr)",
  },
  {
    id: "nerf",
    name: "Nerf Battle for Gameplay",
    price: 100,
  },
  {
    id: "photo",
    name: "Photo Package",
    price: 350,
    note: "50 HQ photos",
    description: "Professional photos delivered within 48 hours",
  },
  {
    id: "bounce-house",
    name: "Large Outdoor Bounce House",
    price: 200,
    note: "$125 as substitute",
    description: "Upgrade to large outdoor bounce house",
  },
];

// Gallery images for the birthday party page
export interface BirthdayImage {
  id: string;
  src: string;
  alt: string;
  featured?: boolean;
}

export const birthdayGalleryImages: BirthdayImage[] = [
  {
    id: "1",
    src: "/images/birthday/DSC00727.jpg",
    alt: "Kids training at birthday party",
    featured: true,
  },
  { id: "2", src: "/images/birthday/DSC00728.jpg", alt: "Birthday party activity" },
  { id: "3", src: "/images/birthday/DSC00995.jpg", alt: "Instructor with kids" },
  { id: "4", src: "/images/birthday/DSC00808.jpg", alt: "Kids sparring" },
  { id: "5", src: "/images/birthday/DSC00821.jpg", alt: "Training session" },
  { id: "6", src: "/images/birthday/DSC06067.JPG", alt: "Kid with face paint" },
  { id: "7", src: "/images/birthday/DSC06065.JPG", alt: "Photo booth setup" },
  { id: "8", src: "/images/birthday/DSC06057.JPG", alt: "Party activities" },
  { id: "9", src: "/images/birthday/DSC06039.JPG", alt: "Kids having fun" },
];

// Stats for the stats bar
export const birthdayStats = [
  { value: "500+", label: "Parties Hosted" },
  { value: "4.9", label: "Star Rating" },
  { value: "2-2.5", label: "Hours of Fun" },
  { value: "12-20", label: "Kids per Party" },
];
