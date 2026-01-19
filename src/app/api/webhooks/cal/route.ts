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

    // Common field names in Cal.com custom questions
    const childName =
      (responses["childName"] as string) ||
      (responses["child_name"] as string) ||
      (responses["Child's Name"] as string) ||
      (responses["name"] as string) ||
      "";

    const childAge =
      (responses["childAge"] as string) ||
      (responses["child_age"] as string) ||
      (responses["Child's Age"] as string) ||
      (responses["age"] as string) ||
      "";

    // Format date and time
    const startDate = new Date(booking.startTime);
    const endDate = new Date(booking.endTime);

    const partyDate = startDate.toISOString().split("T")[0] || "";
    const partyTime = `${formatTime(startDate)} - ${formatTime(endDate)}`;

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
 * Format time to readable string (e.g., "2:00 PM")
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Also handle GET for webhook verification
export async function GET() {
  return NextResponse.json({
    message: "Cal.com webhook endpoint",
    status: "active",
  });
}
