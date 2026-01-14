// ============================================
// NGK Testimonials Data
// Source: project_knowledge.md
// ============================================

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole?: string;
  authorTitle?: string;
  content: string;
  rating: number;
  date: string;
  image?: {
    url: string;
    alt: string;
  };
  programId?: string;
  featured?: boolean;
  source?: "google" | "yelp" | "facebook" | "direct";
}

export const testimonials: Testimonial[] = [
  {
    id: "keith-krikorian",
    authorName: "Keith Krikorian",
    authorRole: "ADCC Competitor",
    authorTitle: "Professional Athlete",
    content: "I've been to hundreds of jiu jitsu gyms in my life and New Ground is without a doubt one of the best out there. The instruction is top-notch and the environment is welcoming to everyone.",
    rating: 5,
    date: "2024-08-15",
    featured: true,
    source: "direct",
  },
  {
    id: "casey-halstead",
    authorName: "Casey Halstead",
    authorRole: "Owner, 10th Planet Las Vegas",
    authorTitle: "Academy Owner",
    content: "Mike is an amazing coach. The culture he is creating is second to none. If you're in the Sherman Oaks area and looking for world-class instruction in a supportive environment, New Ground is the place.",
    rating: 5,
    date: "2024-07-20",
    featured: true,
    source: "direct",
  },
  {
    id: "jason-saggo",
    authorName: "Jason Saggo",
    authorRole: "Former UFC Athlete",
    authorTitle: "Professional Fighter",
    content: "As a former UFC athlete who has been to several clubs throughout my career, New Ground Jiu-Jitsu stands out for its excellent instruction, elegant and clean academy. The attention to detail in both teaching and facility maintenance is impressive.",
    rating: 5,
    date: "2024-06-10",
    featured: true,
    source: "direct",
  },
  {
    id: "parent-review-1",
    authorName: "Sarah M.",
    authorRole: "Parent of Mini Grounder",
    content: "My 5-year-old absolutely loves coming to class! The coaches are patient, encouraging, and really know how to keep the little ones engaged. We've seen such a positive change in his confidence and focus at school.",
    rating: 5,
    date: "2024-09-05",
    programId: "mini-grounders",
    featured: true,
    source: "google",
  },
  {
    id: "parent-review-2",
    authorName: "Michael T.",
    authorRole: "Parent of Super Grounder",
    content: "There is a great sense of community among the students. I highly recommend New Ground to anyone looking to get into jiu-jitsu or to improve their skills. Overall, a top-notch gym! My son has been training here for 2 years and the progress is incredible.",
    rating: 5,
    date: "2024-08-28",
    programId: "super-grounders",
    featured: false,
    source: "yelp",
  },
  {
    id: "parent-review-3",
    authorName: "Jennifer L.",
    authorRole: "Parent of Little Grounder",
    content: "The birthday party we had here was amazing! The staff handled everything professionally, the kids had a blast learning some moves, and the parents got to relax. Highly recommend for parties!",
    rating: 5,
    date: "2024-07-15",
    featured: false,
    source: "google",
  },
  {
    id: "parent-review-4",
    authorName: "David R.",
    authorRole: "Parent of two Grounders",
    content: "Both my kids train here—ages 6 and 10. The program structure is perfect for different age groups, and the coaches really care about each child's development. It's not just about jiu jitsu, it's about building character.",
    rating: 5,
    date: "2024-09-12",
    featured: false,
    source: "facebook",
  },
  {
    id: "parent-review-5",
    authorName: "Amanda K.",
    authorRole: "Parent",
    content: "We switched from another martial arts school and the difference is night and day. The no-gi focus, the quality of instruction, and the positive environment make this the best choice in Sherman Oaks.",
    rating: 5,
    date: "2024-08-01",
    featured: false,
    source: "google",
  },
];

// Helper functions
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}

export function getTestimonialsByProgram(programId: string): Testimonial[] {
  return testimonials.filter((t) => t.programId === programId);
}

export function getTestimonialsBySource(source: Testimonial["source"]): Testimonial[] {
  return testimonials.filter((t) => t.source === source);
}
