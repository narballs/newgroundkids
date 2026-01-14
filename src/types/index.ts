// ============================================
// NGK Type Definitions
// ============================================

// Program Types
export interface Program {
  id: string;
  name: string;
  slug: string;
  ageRange: string;
  description: string;
  longDescription?: string;
  benefits: string[];
  schedule: ClassSchedule[];
  image?: string;
}

export interface ClassSchedule {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  time: string;
  duration: number; // in minutes
  instructor?: string;
}

// Pricing Types
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year" | "one-time";
  description: string;
  features: string[];
  popular?: boolean;
  stripePriceId?: string;
}

// Booking Types
export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  programId?: string;
  type: "trial" | "party" | "camp" | "class";
}

export interface TrialBooking {
  id: string;
  childName: string;
  childAge: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  programId: string;
  slotId: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

// Birthday Party Types
export interface PartyPackage {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  maxChildren: number;
  includes: string[];
  addOns?: PartyAddOn[];
}

export interface PartyAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface PartyBooking {
  id: string;
  packageId: string;
  childName: string;
  childAge: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  date: string;
  time: string;
  guestCount: number;
  addOns: string[];
  specialRequests?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  depositPaid: boolean;
  totalPaid: number;
}

// Camp Types
export interface Camp {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  ageRange: string;
  price: number;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: string;
  description: string;
  schedule: string;
  spotsTotal: number;
  spotsRemaining: number;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  programInterest?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  authorName: string;
  authorRole?: string;
  content: string;
  rating: number;
  date: string;
  image?: string;
  programId?: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  certifications?: string[];
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
