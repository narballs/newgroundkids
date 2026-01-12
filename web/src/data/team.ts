// ============================================
// NGK Team/Instructors Data
// Source: project_knowledge.md
// ============================================

export interface TeamMember {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  title: string;
  bio: string;
  longBio?: string;
  image: {
    url: string;
    alt: string;
  };
  certifications: string[];
  experience: string;
  specialties: string[];
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  featured?: boolean;
  order: number;
}

export const team: TeamMember[] = [
  {
    id: "mike-frausto",
    name: "Mike Frausto",
    nickname: "Coach Lobes",
    role: "founder",
    title: "Head Coach & Founder",
    bio: "10th Planet Black Belt with over 16 years of Jiu Jitsu training and 12 years of coaching experience. Mike built New Ground to be Los Angeles' premier No-Gi academy.",
    longBio: `With over 16 years of Jiu Jitsu training and 12 years of coaching, Coach Lobes built New Ground Jiu Jitsu to be Los Angeles' premier No-Gi academy — a place rooted in community, technical excellence, and the love for the art.

What started as a dream to create something different — an environment where beginners feel supported and experienced grapplers stay challenged — has grown into one of the most exciting academies in the San Fernando Valley.

Coach Mike trained at 10th Planet Seattle before bringing his vision to Sherman Oaks. He's known for his technical precision, patient teaching style, and ability to break down complex movements into understandable steps.

Under his leadership, New Ground has produced numerous competition medalists while maintaining its welcoming, ego-free culture.`,
    image: {
      url: "/images/team/mike-frausto.jpg",
      alt: "Coach Mike Frausto - Head Coach and Founder",
    },
    certifications: [
      "10th Planet Black Belt",
      "CPR/First Aid Certified",
      "Youth Coaching Certified",
    ],
    experience: "16+ years training, 12+ years coaching",
    specialties: [
      "No-Gi Jiu Jitsu",
      "Leg Locks",
      "Guard Systems",
      "Youth Development",
    ],
    socialLinks: {
      instagram: "https://instagram.com/coachlobes",
    },
    featured: true,
    order: 1,
  },
  {
    id: "kids-coach-1",
    name: "Coach Alex",
    role: "instructor",
    title: "Kids Program Lead",
    bio: "Purple belt with a passion for youth development. Alex specializes in making learning fun while building strong fundamentals.",
    image: {
      url: "/images/team/coach-alex.jpg",
      alt: "Coach Alex - Kids Program Lead",
    },
    certifications: [
      "10th Planet Purple Belt",
      "CPR/First Aid Certified",
      "Youth Coaching Certified",
    ],
    experience: "8 years training, 4 years coaching kids",
    specialties: [
      "Youth Jiu Jitsu",
      "Game-Based Learning",
      "Fundamentals",
    ],
    featured: true,
    order: 2,
  },
  {
    id: "kids-coach-2",
    name: "Coach Maria",
    role: "instructor",
    title: "Assistant Kids Coach",
    bio: "Blue belt competitor who brings energy and enthusiasm to every class. Maria focuses on building confidence in our younger students.",
    image: {
      url: "/images/team/coach-maria.jpg",
      alt: "Coach Maria - Assistant Kids Coach",
    },
    certifications: [
      "10th Planet Blue Belt",
      "CPR/First Aid Certified",
    ],
    experience: "5 years training, 2 years coaching",
    specialties: [
      "Mini Grounders",
      "Little Grounders",
      "Competition Prep",
    ],
    featured: false,
    order: 3,
  },
];

// Helper functions
export function getFeaturedTeam(): TeamMember[] {
  return team.filter((t) => t.featured).sort((a, b) => a.order - b.order);
}

export function getTeamByRole(role: TeamMember["role"]): TeamMember[] {
  return team.filter((t) => t.role === role);
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return team.find((t) => t.id === id);
}
