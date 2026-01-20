import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/email";

// Cal.com webhook payload types
interface CalWebhookPayload {
  triggerEvent: string;
  createdAt: string;
  payload: {
    type: string;
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    organizer: {
      email: string;
      name: string;
      timeZone: string;
    };
    attendees: Array<{
      email: string;
      name: string;
      timeZone: string;
    }>;
    location?: string;
    destinationCalendar?: unknown;
    metadata?: {
      videoCallUrl?: string;
    };
    // Custom booking questions/responses
    responses?: Record<string, string | number>;
    // Event type info
    eventTypeId?: number;
    eventTitle?: string;
  };
}

/**
 * Cal.com Webhook Handler
 *
 * Receives booking notifications from Cal.com and sends confirmation emails.
 *
 * Setup in Cal.com:
 * 1. Go to Settings → Webhooks
 * 2. Add webhook URL: https://yoursite.com/api/webhooks/cal
 * 3. Select "Booking Created" trigger
 * 4. Copy the signing secret and add to CALCOM_WEBHOOK_SECRET env var
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();

    // Verify webhook signature (optional but recommended)
    const signature = request.headers.get("x-cal-signature-256");
    if (process.env.CALCOM_WEBHOOK_SECRET && signature) {
      const isValid = await verifyWebhookSignature(body, signature);
      if (!isValid) {
        console.error("Invalid webhook signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    // Parse the webhook payload
    const data: CalWebhookPayload = JSON.parse(body);

    console.log("📅 Cal.com webhook received:", {
      event: data.triggerEvent,
      title: data.payload?.title,
      attendee: data.payload?.attendees?.[0]?.email,
      responses: data.payload?.responses, // Log full responses for debugging
    });

    // Only process booking created events
    if (data.triggerEvent !== "BOOKING_CREATED") {
      return NextResponse.json({ message: "Event type not handled" }, { status: 200 });
    }

    // Extract booking data
    const booking = data.payload;
    const attendee = booking.attendees?.[0];

    if (!attendee) {
      console.error("No attendee found in booking");
      return NextResponse.json({ error: "No attendee data" }, { status: 400 });
    }

    // Extract custom responses (child name, age, etc.)
    const responses = booking.responses || {};

    // Helper to extract value from Cal.com response (handles both string and object formats)
    const extractValue = (value: unknown): string => {
      if (!value) return "";
      if (typeof value === "string") return value;
      if (typeof value === "number") return String(value);
      if (typeof value === "object" && value !== null) {
        // Cal.com sometimes sends { value: "..." } or { label: "...", value: "..." }
        const obj = value as Record<string, unknown>;
        if ("value" in obj) return extractValue(obj.value);
        if ("label" in obj) return extractValue(obj.label);
        // Try to get first string value from object
        for (const key of Object.keys(obj)) {
          const val = extractValue(obj[key]);
          if (val) return val;
        }
      }
      return "";
    };

    // Find a response value by checking multiple possible key names (case-insensitive)
    const findResponse = (keywords: string[]): string => {
      // First try exact matches
      for (const keyword of keywords) {
        if (responses[keyword] !== undefined) {
          return extractValue(responses[keyword]);
        }
      }
      // Then try case-insensitive search
      const responseKeys = Object.keys(responses);
      for (const keyword of keywords) {
        const lowerKeyword = keyword.toLowerCase();
        for (const key of responseKeys) {
          if (key.toLowerCase().includes(lowerKeyword)) {
            return extractValue(responses[key]);
          }
        }
      }
      return "";
    };

    // Common field names in Cal.com custom questions
    const childName = findResponse([
      "childName",
      "child_name",
      "child-name",
      "Child's Name",
      "childs_name",
      "name",
      "child",
      "kid",
      "birthday_child",
    ]);

    const childAge = findResponse([
      "childAge",
      "child_age",
      "child-age",
      "Child's Age",
      "childs_age",
      "age",
      "turning",
      "years",
    ]);

    console.log("📝 Extracted booking data:", {
      childName,
      childAge,
      attendeeName: attendee.name,
      attendeeEmail: attendee.email,
      rawResponses: JSON.stringify(responses),
    });

    // Format date and time using attendee's timezone
    const startDate = new Date(booking.startTime);
    const endDate = new Date(booking.endTime);
    const attendeeTimezone = attendee.timeZone || "America/Los_Angeles";

    const partyDate = startDate.toISOString().split("T")[0] || "";
    const partyTime = `${formatTimeInTimezone(startDate, attendeeTimezone)} - ${formatTimeInTimezone(endDate, attendeeTimezone)}`;

    // Determine package name from event title
    const packageName = booking.title || booking.eventTitle || "Birthday Party";

    // Send confirmation email
    const emailResult = await sendBookingConfirmationEmail({
      parentName: attendee.name,
      parentEmail: attendee.email,
      childName,
      childAge,
      partyDate,
      partyTime,
      packageName,
    });

    if (!emailResult.success) {
      console.error("Failed to send confirmation email:", emailResult.error);
      // Still return 200 to Cal.com - we don't want them to retry
      return NextResponse.json(
        {
          message: "Webhook received, email failed",
          error: "Email delivery failed",
        },
        { status: 200 }
      );
    }

    console.log("✅ Booking confirmation email sent to:", attendee.email);

    return NextResponse.json(
      {
        message: "Webhook processed successfully",
        emailSent: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Verify Cal.com webhook signature
 */
async function verifyWebhookSignature(body: string, signature: string): Promise<boolean> {
  const secret = process.env.CALCOM_WEBHOOK_SECRET;
  if (!secret) return true; // Skip verification if no secret configured

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(body));

    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}

/**
 * Format time to readable string in a specific timezone (e.g., "2:00 PM")
 */
function formatTimeInTimezone(date: Date, timezone: string): string {
  try {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    });
  } catch {
    // Fallback if timezone is invalid
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Los_Angeles",
    });
  }
}

// Also handle GET for webhook verification
export async function GET() {
  return NextResponse.json({
    message: "Cal.com webhook endpoint",
    status: "active",
  });
}
