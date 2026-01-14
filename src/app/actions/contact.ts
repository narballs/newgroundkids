"use server";

import { contactFormSchema, type ActionResponse } from "@/lib/validations";
import { checkRateLimit, rateLimitConfigs } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function submitContactForm(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  // Get client IP for rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  
  // Check rate limit
  const rateLimitResult = checkRateLimit(`contact:${ip}`, rateLimitConfigs.contact);
  if (!rateLimitResult.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${rateLimitResult.resetIn} seconds.`,
    };
  }

  // Parse form data
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string || undefined,
    subject: formData.get("subject") as string || undefined,
    message: formData.get("message") as string,
  };

  // Validate
  const validationResult = contactFormSchema.safeParse(rawData);
  
  if (!validationResult.success) {
    const errors: Record<string, string[]> = {};
    validationResult.error.issues.forEach((issue) => {
      const path = issue.path[0] as string;
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    });
    
    return {
      success: false,
      message: "Please fix the errors below.",
      errors,
    };
  }

  const data = validationResult.data;

  try {
    // In production, you would:
    // 1. Send email notification
    // 2. Store in database
    // 3. Add to CRM
    // 4. Send auto-reply
    
    // For now, simulate processing
    console.log("📧 Contact Form Submission:", {
      ...data,
      timestamp: new Date().toISOString(),
      ip,
    });

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `New Contact: ${data.subject || 'General Inquiry'}`,
    //   body: formatContactEmail(data),
    // });

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
      data: { name: data.name },
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
  }
}
