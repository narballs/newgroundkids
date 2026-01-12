import { z } from "zod";

// ============================================
// CONTACT FORM
// ============================================
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\(\)\+]+$/.test(val),
      "Please enter a valid phone number"
    ),
  subject: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================
// LEAD CAPTURE FORM (Free Trial)
// ============================================
export const leadCaptureSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\(\)\+]+$/.test(val),
      "Please enter a valid phone number"
    ),
  childAge: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d+/.test(val),
      "Please enter a valid age"
    ),
  childName: z
    .string()
    .optional(),
  program: z
    .string()
    .optional(),
  source: z
    .string()
    .optional(),
});

export type LeadCaptureData = z.infer<typeof leadCaptureSchema>;

// ============================================
// NEWSLETTER FORM
// ============================================
export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// ============================================
// FORM ACTION RESPONSE
// ============================================
export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: T;
}
