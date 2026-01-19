// ============================================
// NGK Site Configuration
// Version 2.0 - Events Pivot
// ============================================

export const siteConfig = {
  name: "NewGround Kids",
  shortName: "NGK",
  tagline: "Epic Parties & Camps for Kids",
  description:
    "Unforgettable birthday parties and camps for kids in Sherman Oaks, CA. Action-packed packages, professional staff, stress-free planning.",
  url: "https://newgroundkids.com",
  ogImage: "https://newgroundkids.com/og-image.jpg",

  // Contact - Using New Ground facility location
  contact: {
    phone: "(818) 538-4989",
    phoneRaw: "+18185384989",
    email: "newgroundjj@gmail.com",
    address: "4617 Van Nuys Blvd, Unit B",
    city: "Sherman Oaks",
    state: "CA",
    zip: "91403",
    fullAddress: "4617 Van Nuys Blvd, Unit B, Sherman Oaks, CA 91403",
    shortAddress: "Sherman Oaks, CA",
    addressLink: "https://maps.google.com/?q=4617+Van+Nuys+Blvd,+Unit+B,+Sherman+Oaks,+CA+91403",
  },

  // Business Hours (Events-focused)
  hours: {
    parties: "Sat-Sun 10:00 AM - 6:00 PM",
    camps: "Mon-Fri 8:00 AM - 5:00 PM",
    office: "Mon-Fri 10:00 AM - 6:00 PM",
    detailed: [
      { day: "Monday", hours: "Office: 10am-6pm | Camps: 8am-5pm" },
      { day: "Tuesday", hours: "Office: 10am-6pm | Camps: 8am-5pm" },
      { day: "Wednesday", hours: "Office: 10am-6pm | Camps: 8am-5pm" },
      { day: "Thursday", hours: "Office: 10am-6pm | Camps: 8am-5pm" },
      { day: "Friday", hours: "Office: 10am-6pm | Camps: 8am-5pm" },
      { day: "Saturday", hours: "Parties: 10am-6pm" },
      { day: "Sunday", hours: "Parties: 10am-6pm" },
    ],
  },

  // Social Links
  social: {
    facebook: "https://facebook.com/newgroundkids",
    instagram: "https://instagram.com/newgroundkids",
    youtube: "https://youtube.com/@newgroundkids",
    yelp: "https://yelp.com/biz/newground-kids-sherman-oaks",
    tiktok: "https://tiktok.com/@newgroundkids",
  },

  // Parent Brands
  parentBrands: {
    jiujitsu: {
      name: "New Ground Jiu Jitsu",
      url: "https://newgroundjiujitsu.com",
      booking: "https://NewGroundJiuJitsu.as.me/",
    },
    apparel: {
      name: "New Ground Apparel",
      url: "https://newgroundapparel.com",
    },
  },

  // Booking (Events-focused)
  booking: {
    partiesUrl: "/birthday-parties",
    campsUrl: "/camps",
    eventsUrl: "/events",
    calendarUrl: "https://cal.com/newgroundkids", // Cal.com for booking
    inquiryUrl: "/contact",
  },

  // Main Navigation (Events-only)
  mainNav: [
    { title: "Birthday Parties", href: "/birthday-parties" },
    { title: "Camps", href: "/camps" },
    { title: "Events", href: "/events" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],

  // Footer Navigation (Events-only)
  footerNav: {
    events: [
      { title: "Birthday Parties", href: "/birthday-parties" },
      { title: "Summer Camps", href: "/camps" },
      { title: "Holiday Camps", href: "/camps" },
      { title: "Events", href: "/events" },
    ],
    company: [
      { title: "About Us", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "FAQ", href: "/faq" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Service", href: "/terms-of-service" },
    ],
  },

  // SEO defaults (Events-focused)
  seo: {
    titleTemplate: "%s | NewGround Kids",
    defaultTitle: "NewGround Kids | Epic Parties & Camps for Kids",
    defaultDescription:
      "Unforgettable birthday parties and camps for kids in Sherman Oaks! Action-packed packages from $299. Safe, fun, stress-free. Book your event today!",
    keywords: [
      "kids birthday party venue",
      "birthday party sherman oaks",
      "kids party packages",
      "summer camp sherman oaks",
      "kids camp near me",
      "holiday camp for kids",
      "martial arts birthday party",
      "action birthday party",
      "private event space kids",
      "kids event venue",
    ],
  },

  // Feature flags
  features: {
    onlineBooking: true,
    merchandise: false, // Removed for events-only
    camps: true,
    parties: true,
    privateEvents: true,
    newsletter: true,
  },

  // Party Packages (for quick reference)
  packages: {
    bronze: {
      name: "Bronze",
      price: 299,
      duration: 90,
      maxKids: 10,
      deposit: 150,
    },
    silver: {
      name: "Silver",
      price: 449,
      duration: 120,
      maxKids: 15,
      deposit: 225,
    },
    gold: {
      name: "Gold",
      price: 599,
      duration: 150,
      maxKids: 20,
      deposit: 300,
    },
  },

  // Camp Pricing (for quick reference)
  campPricing: {
    daily: 79,
    weekly: 349,
  },
} as const;

export type SiteConfig = typeof siteConfig;
