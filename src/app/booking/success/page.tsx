"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  PartyPopper,
  Sparkles,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

function BookingSuccessContent() {
  const searchParams = useSearchParams();

  // Get booking data from URL params (passed by Cal.com redirect with "Forward parameters" enabled)
  // Cal.com sends: attendeeName, email, attendeeStartTime (ISO), title, location, etc.

  // Parse times from ISO format (attendeeStartTime is more reliable than startTime)
  const attendeeStartTime = searchParams.get("attendeeStartTime") || "";
  const rawStartTime = searchParams.get("startTime") || "";
  const rawEndTime = searchParams.get("endTime") || "";

  // Parse date and times
  let formattedDate = "";
  let formattedStartTime = "";
  let formattedEndTime = "";

  // Try to parse attendeeStartTime first (ISO format with timezone: "2026-01-20T11:00:00-08:00")
  if (attendeeStartTime) {
    const startDate = new Date(attendeeStartTime);
    formattedDate = startDate.toISOString().split("T")[0] ?? ""; // YYYY-MM-DD
    formattedStartTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    // Estimate end time (add 2 hours for party duration)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    formattedEndTime = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else if (rawStartTime) {
    // Fallback: try to parse the raw startTime string
    try {
      const startDate = new Date(rawStartTime);
      if (!isNaN(startDate.getTime())) {
        formattedDate = startDate.toISOString().split("T")[0] ?? "";
        formattedStartTime = startDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }
    } catch {
      // Leave empty if parsing fails
    }

    if (rawEndTime) {
      try {
        const endDate = new Date(rawEndTime);
        if (!isNaN(endDate.getTime())) {
          formattedEndTime = endDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
        }
      } catch {
        // Leave empty if parsing fails
      }
    }
  }

  // Extract package name from title (format: "Birthday Party - Small between New Ground Jiu Jitsu and John")
  const title = searchParams.get("title") || "";
  let packageName = "Birthday Party";
  if (title) {
    // Try to extract package type from title
    const match = title.match(/Birthday Party - (\w+)/i);
    if (match) {
      packageName = `Birthday Party - ${match[1]}`;
    } else if (title.includes("Birthday")) {
      packageName = "Birthday Party";
    }
  }

  const bookingData = {
    // Parent info - Cal.com uses "attendeeName" not "name" with Forward parameters
    name: searchParams.get("attendeeName") || searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    // Party details (from Cal.com custom questions if configured)
    childName: searchParams.get("childName") || searchParams.get("responses[childName]") || "",
    childAge: searchParams.get("childAge") || searchParams.get("responses[childAge]") || "",
    // Booking details
    date: formattedDate || searchParams.get("date")?.split("T")[0] || "",
    startTime: formattedStartTime,
    endTime: formattedEndTime,
    // Package info
    packageName,
    // Additional Cal.com data
    location: searchParams.get("location") || "",
    paymentStatus: searchParams.get("redirect_status") || "",
  };

  // Format the time display
  const timeDisplay =
    bookingData.startTime && bookingData.endTime
      ? `${bookingData.startTime} - ${bookingData.endTime}`
      : bookingData.startTime || "Time confirmed in email";

  // Build invite URL with pre-filled data
  const inviteParams = new URLSearchParams();
  if (bookingData.childName) inviteParams.set("childName", bookingData.childName);
  if (bookingData.childAge) inviteParams.set("childAge", bookingData.childAge);
  if (bookingData.date) inviteParams.set("date", bookingData.date);
  if (timeDisplay && timeDisplay !== "Time confirmed in email") {
    inviteParams.set("time", timeDisplay);
  }
  const inviteUrl = `/invites${inviteParams.toString() ? `?${inviteParams.toString()}` : ""}`;

  return (
    <div className="from-accent/10 via-background to-background min-h-screen bg-gradient-to-b">
      {/* Header */}
      <header className="border-border sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="NewGround Kids"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <Link
              href="/birthday-parties"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              View Packages
            </Link>
          </div>
        </Container>
      </header>

      <main className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            {/* Success Animation */}
            <div className="mb-8 text-center">
              <div className="mb-6 inline-flex h-20 w-20 animate-[scale-in_0.5s_ease-out] items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h1 className="mb-3 text-4xl md:text-5xl">You&apos;re All Set!</h1>
              <p className="text-muted-foreground text-xl">
                {bookingData.childName
                  ? `${bookingData.childName}'s party is confirmed! 🎉`
                  : "Your booking is confirmed! 🎉"}
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="border-border mb-8 overflow-hidden rounded-2xl border bg-white shadow-[var(--shadow-soft-lg)]">
              {/* Header */}
              <div className="bg-primary text-primary-foreground p-6">
                <div className="flex items-center gap-3">
                  <PartyPopper className="h-6 w-6" />
                  <div>
                    <h2 className="font-heading text-2xl">{bookingData.packageName}</h2>
                    {bookingData.childName && bookingData.childAge && (
                      <p className="text-primary-foreground/80">
                        {bookingData.childName}&apos;s {bookingData.childAge}th Birthday
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 p-6">
                {bookingData.date && (
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <Calendar className="text-accent h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{formatDate(bookingData.date)}</p>
                      <p className="text-muted-foreground text-sm">Party Date</p>
                    </div>
                  </div>
                )}

                {timeDisplay && (
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <Clock className="text-accent h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{timeDisplay}</p>
                      <p className="text-muted-foreground text-sm">Party Time</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <MapPin className="text-accent h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">NewGround Kids</p>
                    <p className="text-muted-foreground text-sm">
                      {siteConfig.contact.fullAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirmation Email Note */}
              <div className="px-6 pb-6">
                <div className="bg-muted flex items-center gap-3 rounded-xl p-4">
                  <Mail className="text-muted-foreground h-5 w-5 shrink-0" />
                  <p className="text-muted-foreground text-sm">
                    A confirmation email has been sent to{" "}
                    <span className="text-foreground font-medium">
                      {bookingData.email || "your email"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Create Invites CTA */}
            <div className="from-accent to-accent/80 mb-8 rounded-2xl bg-gradient-to-br p-8 text-center text-white">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="font-heading mb-2 text-3xl">Next Step: Create Your Invites!</h2>
              <p className="mx-auto mb-6 max-w-md text-white/90">
                Design beautiful party invitations to share with your guests via text, WhatsApp, or
                email.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="font-heading text-accent bg-white text-lg hover:bg-white/90"
                asChild
              >
                <Link href={inviteUrl}>
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Create Party Invites
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {bookingData.childName && (
                <p className="mt-3 text-sm text-white/70">
                  Pre-filled with {bookingData.childName}&apos;s party details!
                </p>
              )}
            </div>

            {/* What's Next */}
            <div className="border-border rounded-2xl border bg-white p-6 shadow-[var(--shadow-soft-md)]">
              <h3 className="font-heading mb-4 text-xl">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Create & Share Invites</p>
                    <p className="text-muted-foreground text-sm">
                      Design your custom invitations and send them to guests
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    2
                  </div>
                  <div>
                    <p className="font-medium">We&apos;ll Confirm Details</p>
                    <p className="text-muted-foreground text-sm">
                      Our team will reach out 1 week before to confirm final headcount
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Party Day!</p>
                    <p className="text-muted-foreground text-sm">
                      Arrive 15 minutes early. We handle everything else!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-2">Questions? We&apos;re here to help!</p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-accent inline-flex items-center gap-2 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-accent inline-flex items-center gap-2 hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-muted-foreground animate-pulse">Loading...</div>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
