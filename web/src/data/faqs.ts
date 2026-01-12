// ============================================
// NGK FAQs Data (Events-Focused)
// ============================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "parties" | "camps" | "rentals" | "booking" | "policies";
  order: number;
}

export const faqs: FAQ[] = [
  // General
  {
    id: "what-is-ngk",
    question: "What is NewGround Kids?",
    answer: "NewGround Kids is a kids event venue in Sherman Oaks offering birthday parties, seasonal camps, and private event rentals. We specialize in action-packed, martial arts-themed activities that keep kids engaged and having fun!",
    category: "general",
    order: 1,
  },
  {
    id: "what-ages",
    question: "What ages do you accommodate?",
    answer: "Our events are designed for kids ages 4-14. Our experienced staff adapts activities to be age-appropriate, ensuring younger kids have fun while older kids stay challenged.",
    category: "general",
    order: 2,
  },
  {
    id: "location",
    question: "Where are you located?",
    answer: "We're located at 4617 Van Nuys Blvd, Unit B in Sherman Oaks, CA. We're easily accessible from Studio City, Encino, Van Nuys, and surrounding areas. Free parking is available.",
    category: "general",
    order: 3,
  },
  {
    id: "safety",
    question: "Is it safe for kids?",
    answer: "Absolutely! Safety is our top priority. We have professional-grade padded mats, trained staff on-site at all times, and age-appropriate activities. All activities are supervised, and our facility is cleaned and maintained to high standards.",
    category: "general",
    order: 4,
  },
  
  // Birthday Parties
  {
    id: "party-include",
    question: "What's included in a birthday party package?",
    answer: "All packages include exclusive use of the party area, a dedicated party host, martial arts-themed games and activities, setup and cleanup, and a special experience for the birthday child. Higher tier packages include food, goodie bags, and additional perks. See our packages page for full details.",
    category: "parties",
    order: 1,
  },
  {
    id: "party-kids",
    question: "How many kids can attend?",
    answer: "Our White Belt party accommodates up to 12 kids, Black Belt Bash up to 20 kids, and Champion's Celebration up to 25 kids. Additional children can be added for $15 each.",
    category: "parties",
    order: 2,
  },
  {
    id: "party-book",
    question: "How far in advance should we book?",
    answer: "We recommend booking at least 2-3 weeks in advance, especially for weekend parties. Popular dates like school breaks and holidays fill up fast. Contact us to check availability for your preferred date.",
    category: "parties",
    order: 3,
  },
  {
    id: "party-food",
    question: "Can we bring our own food and cake?",
    answer: "Yes! You're welcome to bring your own food and cake for any package. Our Silver and Gold packages include pizza and drinks, but you can always bring a custom cake or additional treats.",
    category: "parties",
    order: 4,
  },
  {
    id: "party-activities",
    question: "What activities do you offer at parties?",
    answer: "Our parties include action-packed activities like martial arts games, obstacle courses, relay races, and a board-breaking experience. Activities are age-appropriate and supervised by our trained staff. Kids stay engaged and have a blast!",
    category: "parties",
    order: 5,
  },
  {
    id: "party-parents",
    question: "Can parents stay during the party?",
    answer: "Yes! Parents are welcome to stay and watch. We have a comfortable viewing area. For larger parties, we recommend limiting spectators to parents only due to space constraints.",
    category: "parties",
    order: 6,
  },

  // Camps
  {
    id: "camp-schedule",
    question: "When are camps offered?",
    answer: "We offer camps during school breaks including summer (June-August, weekly sessions), spring break, winter break, and select teacher workdays. Check our Camps page for the current schedule.",
    category: "camps",
    order: 1,
  },
  {
    id: "camp-hours",
    question: "What are camp hours?",
    answer: "Camps typically run 9am-3pm Monday through Friday. Drop-off begins at 8:30am. Extended care (until 5pm) may be available for an additional fee—ask when registering.",
    category: "camps",
    order: 2,
  },
  {
    id: "camp-bring",
    question: "What should my child bring to camp?",
    answer: "Campers should bring: comfortable athletic clothes, a packed lunch and snacks, a water bottle, and sunscreen. We provide all activity equipment. Leave valuables at home.",
    category: "camps",
    order: 3,
  },
  {
    id: "camp-day",
    question: "What does a typical camp day look like?",
    answer: "A typical day includes martial arts activities, team games, obstacle courses, arts & crafts, free play, and snack/lunch breaks. Activities are varied to keep kids engaged and having fun all day!",
    category: "camps",
    order: 4,
  },
  {
    id: "camp-experience",
    question: "Does my child need martial arts experience?",
    answer: "No experience needed! Our camps are designed for all skill levels. Activities are adapted to be fun and accessible for beginners while still engaging for kids with more experience.",
    category: "camps",
    order: 5,
  },

  // Private Rentals
  {
    id: "rental-events",
    question: "What types of private events can you host?",
    answer: "We host team parties (sports teams, dance troupes), scout troop events, corporate family days, homeschool group activities, holiday events, and more. If you have a group of kids who need a fun, active space, we can accommodate!",
    category: "rentals",
    order: 1,
  },
  {
    id: "rental-include",
    question: "What's included in a private rental?",
    answer: "Rentals include exclusive use of the facility, professional staff on-site, access to mats and equipment, the party room, tables and chairs, and setup/cleanup. Instruction and activities can be added for an additional fee.",
    category: "rentals",
    order: 2,
  },
  {
    id: "rental-pricing",
    question: "How much does a private rental cost?",
    answer: "Rental rates start at $150/hour with a 2-hour minimum. Half-day (4 hours) and full-day (8 hours) packages offer better value. Contact us for a custom quote based on your group size and needs.",
    category: "rentals",
    order: 3,
  },

  // Booking
  {
    id: "book-how",
    question: "How do I book an event?",
    answer: "You can book online through our website, call us at (818) 538-4989, or fill out our contact form. We'll confirm availability and send you all the details to finalize your booking.",
    category: "booking",
    order: 1,
  },
  {
    id: "book-deposit",
    question: "Is a deposit required?",
    answer: "Yes, a 50% deposit is required to secure your date for birthday parties and private rentals. The remaining balance is due 7 days before your event. Camp registration requires full payment.",
    category: "booking",
    order: 2,
  },
  {
    id: "book-payment",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and bank transfers. Payment is processed securely through Stripe.",
    category: "booking",
    order: 3,
  },

  // Policies
  {
    id: "cancel-policy",
    question: "What is your cancellation policy?",
    answer: "Cancellations made 7+ days before the event receive a full refund minus a $50 processing fee. Cancellations within 7 days receive a 50% refund. No-shows are not refunded. Rescheduling is free with 48+ hours notice.",
    category: "policies",
    order: 1,
  },
  {
    id: "waiver",
    question: "Is a waiver required?",
    answer: "Yes, all participants must have a signed waiver on file. For birthday parties and camps, parents can sign the waiver online when booking. For party guests, waivers can be signed upon arrival.",
    category: "policies",
    order: 2,
  },
  {
    id: "late-pickup",
    question: "What if I'm late picking up my child?",
    answer: "For camps, a late pickup fee of $1/minute applies after 3:15pm. Please call us if you're running late so we can reassure your child. Chronic late pickups may result in loss of camp privileges.",
    category: "policies",
    order: 3,
  },
];

// Helper functions
export function getFAQsByCategory(category: FAQ["category"]): FAQ[] {
  return faqs.filter((f) => f.category === category).sort((a, b) => a.order - b.order);
}

export function getAllFAQs(): FAQ[] {
  return [...faqs].sort((a, b) => a.order - b.order);
}

export function getTopFAQs(limit: number = 5): FAQ[] {
  return faqs.filter((f) => f.category === "general" || f.category === "parties").slice(0, limit);
}

export const faqCategories = [
  { id: "general", label: "General Questions" },
  { id: "parties", label: "Birthday Parties" },
  { id: "camps", label: "Camps" },
  { id: "rentals", label: "Private Rentals" },
  { id: "booking", label: "Booking & Payment" },
  { id: "policies", label: "Policies" },
] as const;
