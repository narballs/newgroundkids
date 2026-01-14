// ============================================
// NGK Birthday Party Packages Data
// ============================================

export interface PartyAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface PartyPackage {
  id: string;
  name: string;
  slug: string;
  price: number;
  duration: number; // in minutes
  maxChildren: number;
  description: string;
  includes: string[];
  addOns?: PartyAddOn[];
  popular?: boolean;
  image: {
    url: string;
    alt: string;
  };
}

export const partyAddOns: PartyAddOn[] = [
  {
    id: "extra-time",
    name: "Extra 30 Minutes",
    price: 75,
    description: "Extend your party by 30 minutes",
  },
  {
    id: "extra-kids",
    name: "Additional Kids (per child)",
    price: 15,
    description: "Add more guests beyond the package limit",
  },
  {
    id: "goodie-bags",
    name: "Goodie Bags (per child)",
    price: 8,
    description: "Pre-made goodie bags with martial arts themed toys",
  },
  {
    id: "photo-package",
    name: "Photo Package",
    price: 50,
    description: "Professional photos of the party emailed within 48 hours",
  },
  {
    id: "pizza-package",
    name: "Pizza & Drinks Package",
    price: 100,
    description: "Pizza, juice boxes, and plates for up to 15 kids",
  },
  {
    id: "cake",
    name: "Martial Arts Themed Cake",
    price: 75,
    description: "Custom decorated cake serves 20",
  },
];

export const partyPackages: PartyPackage[] = [
  {
    id: "starter",
    name: "White Belt Party",
    slug: "white-belt",
    price: 299,
    duration: 90,
    maxChildren: 12,
    description: "Perfect introduction to martial arts birthday fun! Great for younger kids or smaller groups.",
    includes: [
      "90 minutes of party time",
      "Up to 12 children",
      "Dedicated party host/instructor",
      "30 minutes of martial arts games & activities",
      "30 minutes of free play on mats",
      "30 minutes in party area for cake & presents",
      "Invitations (digital)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
    ],
    image: {
      url: "/images/parties/white-belt-party.jpg",
      alt: "Kids at White Belt birthday party",
    },
    popular: false,
  },
  {
    id: "popular",
    name: "Black Belt Bash",
    slug: "black-belt-bash",
    price: 449,
    duration: 120,
    maxChildren: 20,
    description: "Our most popular package! The ultimate martial arts birthday experience with all the extras.",
    includes: [
      "2 hours of party time",
      "Up to 20 children",
      "2 dedicated party hosts/instructors",
      "45 minutes of martial arts instruction & games",
      "30 minutes of obstacle course & challenges",
      "45 minutes in party area for food & presents",
      "Invitations (digital + printable)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
      "Birthday child gets a free week of classes",
      "Goodie bags for all guests",
      "Party favor for birthday child (gi or rashguard)",
    ],
    image: {
      url: "/images/parties/black-belt-party.jpg",
      alt: "Kids celebrating at Black Belt Bash party",
    },
    popular: true,
  },
  {
    id: "premium",
    name: "Champion's Celebration",
    slug: "champions-celebration",
    price: 599,
    duration: 150,
    maxChildren: 25,
    description: "The VIP experience! Everything included for the ultimate celebration. Perfect for larger groups.",
    includes: [
      "2.5 hours of party time",
      "Up to 25 children",
      "2 dedicated party hosts/instructors",
      "60 minutes of martial arts instruction & games",
      "45 minutes of obstacle course, board breaking & challenges",
      "45 minutes in party area for food & presents",
      "Premium invitations (custom designed)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
      "Birthday child gets a free month of classes",
      "Premium goodie bags for all guests",
      "Party favor for birthday child (gi + rashguard + bag)",
      "Pizza and drinks for all guests",
      "Professional photos (digital delivery)",
    ],
    image: {
      url: "/images/parties/champion-party.jpg",
      alt: "Ultimate Champion's Celebration birthday party",
    },
    popular: false,
  },
];

// Helper functions
export function getPartyPackageBySlug(slug: string): PartyPackage | undefined {
  return partyPackages.find((p) => p.slug === slug);
}

export function getPopularPackage(): PartyPackage | undefined {
  return partyPackages.find((p) => p.popular);
}

export function getAllAddOns(): PartyAddOn[] {
  return partyAddOns;
}
