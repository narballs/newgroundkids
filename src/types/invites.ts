// Party invite types and data structures

export type InviteTemplateId = "dojo" | "action" | "party" | "belt";

export interface InviteTemplate {
  id: InviteTemplateId;
  name: string;
  description: string;
  preview: string;
  ageRange: string;
}

export interface PartyDetails {
  childName: string;
  childAge: number;
  partyDate: string;
  partyTime: string;
  rsvpDate: string;
  rsvpPhone: string;
  customMessage?: string;
}

export const INVITE_TEMPLATES: InviteTemplate[] = [
  {
    id: "dojo",
    name: "Dojo Classic",
    description: "Clean & modern with teal gradient",
    preview: "teal",
    ageRange: "All ages",
  },
  {
    id: "action",
    name: "Action Hero",
    description: "Bold & energetic diagonal design",
    preview: "black",
    ageRange: "8-12 years",
  },
  {
    id: "party",
    name: "Party Pop",
    description: "Playful & colorful celebration",
    preview: "coral",
    ageRange: "4-7 years",
  },
  {
    id: "belt",
    name: "Belt Ceremony",
    description: "Premium photo-backed elegance",
    preview: "gold",
    ageRange: "All ages",
  },
];

export const DEFAULT_PARTY_DETAILS: PartyDetails = {
  childName: "",
  childAge: 7,
  partyDate: "",
  partyTime: "2:00 PM - 4:00 PM",
  rsvpDate: "",
  rsvpPhone: "(818) 538-4989",
  customMessage: "",
};
