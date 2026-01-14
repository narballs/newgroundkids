"use server";

import { newsletterSchema, type ActionResponse } from "@/lib/validations";
import { checkRateLimit, rateLimitConfigs } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function subscribeNewsletter(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  // Get client IP for rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const email = formData.get("email") as string;
  
  // Check rate limit
  const rateLimitResult = checkRateLimit(`newsletter:${email}`, rateLimitConfigs.newsletter);
  if (!rateLimitResult.allowed) {
    return {
      success: false,
      message: "This email is already subscribed or was recently submitted.",
    };
  }

  // Validate
  const validationResult = newsletterSchema.safeParse({ email });
  
  if (!validationResult.success) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      errors: { email: validationResult.error.issues.map(i => i.message) },
    };
  }

  try {
    // In production, you would:
    // 1. Add to email list (Mailchimp, ConvertKit, etc.)
    // 2. Send welcome email
    // 3. Store preference in database
    
    console.log("📬 Newsletter Subscription:", {
      email,
      timestamp: new Date().toISOString(),
      ip,
    });

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Add to email list
    // await mailchimp.lists.addListMember(listId, {
    //   email_address: email,
    //   status: "subscribed",
    //   tags: ["website"],
    // });

    return {
      success: true,
      message: "You're subscribed! Watch your inbox for updates and special offers.",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
