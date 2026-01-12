"use server";

import { leadCaptureSchema, type ActionResponse } from "@/lib/validations";
import { checkRateLimit, rateLimitConfigs } from "@/lib/rate-limit";
import { headers } from "next/headers";

interface LeadResponseData {
  name?: string;
  recommendedProgram?: string;
}

export async function submitLeadCapture(
  _prevState: ActionResponse<LeadResponseData> | null,
  formData: FormData
): Promise<ActionResponse<LeadResponseData>> {
  // Get client IP for rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const email = formData.get("email") as string;
  
  // Check rate limit by IP and email
  const ipRateLimit = checkRateLimit(`lead:${ip}`, rateLimitConfigs.lead);
  const emailRateLimit = checkRateLimit(`lead:${email}`, rateLimitConfigs.lead);
  
  if (!ipRateLimit.allowed || !emailRateLimit.allowed) {
    const resetIn = Math.max(ipRateLimit.resetIn, emailRateLimit.resetIn);
    return {
      success: false,
      message: `You've already submitted a request. Please try again later or call us to schedule your trial.`,
    };
  }

  // Parse form data
  const rawData = {
    name: formData.get("name") as string,
    email: email,
    phone: formData.get("phone") as string || undefined,
    childAge: formData.get("childAge") as string || undefined,
    childName: formData.get("childName") as string || undefined,
    program: formData.get("program") as string || undefined,
    source: formData.get("source") as string || "website",
  };

  // Validate
  const validationResult = leadCaptureSchema.safeParse(rawData);
  
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
    // 1. Store lead in database
    // 2. Send to CRM (HubSpot, Mailchimp, etc.)
    // 3. Send confirmation email to parent
    // 4. Notify staff
    
    console.log("🎯 New Lead Captured:", {
      ...data,
      timestamp: new Date().toISOString(),
      ip,
    });

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Store in database
    // await db.leads.create({ data });

    // TODO: Send to CRM
    // await crm.addContact({ ...data, tags: ['free-trial'] });

    // TODO: Send confirmation email
    // await sendEmail({
    //   to: data.email,
    //   subject: "Your Free Trial at NewGround Kids",
    //   template: "free-trial-confirmation",
    //   data,
    // });

    // Determine recommended program based on age
    let recommendedProgram = "our programs";
    if (data.childAge) {
      const age = parseInt(data.childAge);
      if (age >= 4 && age <= 5) recommendedProgram = "Mini Grounders";
      else if (age >= 5 && age <= 7) recommendedProgram = "Little Grounders";
      else if (age >= 8 && age <= 13) recommendedProgram = "Super Grounders";
    }

    return {
      success: true,
      message: `You're all set! We'll contact you within 24 hours to schedule your free ${recommendedProgram} class.`,
      data: { 
        name: data.name.split(" ")[0], // First name
        recommendedProgram,
      },
    };
  } catch (error) {
    console.error("Lead capture error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or call us at (818) 538-4989.",
    };
  }
}
