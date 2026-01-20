"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toPng } from "html-to-image";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Download,
  Sparkles,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/layout/container";
import { TemplateDojo, TemplateAction, TemplateParty, TemplateBelt } from "@/components/invites";
import { INVITE_TEMPLATES, DEFAULT_PARTY_DETAILS } from "@/types/invites";
import type { PartyDetails, InviteTemplateId } from "@/types/invites";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Helper to get real param value, skipping Cal.com placeholder syntax like {attendee_email}
const getRealParam = (searchParams: URLSearchParams, key: string): string => {
  const values = searchParams.getAll(key);
  const realValue = values.find((v) => !v.includes("{") && !v.includes("}"));
  return realValue || "";
};

// Helper to clean up messy time strings from Cal.com
const formatTimeParam = (timeStr: string | null): string => {
  if (!timeStr) return "";
  if (timeStr.length < 25 && !timeStr.includes("GMT")) return timeStr;

  if (timeStr.includes("GMT") || timeStr.includes("Universal Time")) {
    try {
      const parts = timeStr.split(" - ");
      const formatPart = (str: string) => {
        const date = new Date(str);
        if (isNaN(date.getTime())) return "";
        return date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      };
      const start = formatPart(parts[0] ?? "");
      if (!start) return timeStr;
      if (parts[1]) {
        const end = formatPart(parts[1]);
        if (end) return `${start} - ${end}`;
      }
      return start;
    } catch {
      return timeStr;
    }
  }
  return timeStr;
};

// Template preview colors
const templateColors: Record<InviteTemplateId, string> = {
  dojo: "bg-gradient-to-br from-teal-500 to-teal-900",
  action: "bg-gradient-to-br from-gray-900 to-teal-600",
  party: "bg-gradient-to-br from-rose-300 to-amber-200",
  belt: "bg-gradient-to-br from-gray-900 to-amber-600",
};

function BookingSuccessContent() {
  const searchParams = useSearchParams();

  // ============================================
  // PARSE BOOKING DATA FROM CAL.COM URL PARAMS
  // ============================================

  const attendeeStartTime =
    searchParams.get("attendeeStartTime") || searchParams.get("hostStartTime") || "";
  const rawStartTime = searchParams.get("startTime") || "";
  const rawEndTime = searchParams.get("endTime") || "";
  const rawDate = searchParams.get("date") || "";

  let formattedDate = "";
  let formattedStartTime = "";
  let formattedEndTime = "";

  // Parse attendeeStartTime (ISO format)
  if (attendeeStartTime) {
    const startDate = new Date(attendeeStartTime);
    formattedDate = startDate.toISOString().split("T")[0] ?? "";
    formattedStartTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    formattedEndTime = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else if (rawStartTime) {
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
      // Leave empty
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
        // Leave empty
      }
    }
  }

  // Fallback: extract time from date param
  if (!formattedStartTime && rawDate && rawDate.includes("T")) {
    try {
      const dateObj = new Date(rawDate);
      if (!isNaN(dateObj.getTime())) {
        formattedStartTime = dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        const endDateObj = new Date(dateObj.getTime() + 2 * 60 * 60 * 1000);
        formattedEndTime = endDateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }
    } catch {
      // Leave empty
    }
  }

  // Extract package name from title
  const title = searchParams.get("title") || "";
  let packageName = "Birthday Party";
  if (title) {
    const match = title.match(/Birthday Party - (\w+)/i);
    if (match) {
      packageName = `Birthday Party - ${match[1]}`;
    }
  }

  const bookingData = {
    name: searchParams.get("attendeeName") || getRealParam(searchParams, "name") || "",
    email: getRealParam(searchParams, "email") || "",
    childName: searchParams.get("childName") || searchParams.get("responses[childName]") || "",
    childAge: searchParams.get("childAge") || searchParams.get("responses[childAge]") || "",
    date: formattedDate || searchParams.get("date")?.split("T")[0] || "",
    startTime: formattedStartTime,
    endTime: formattedEndTime,
    packageName,
  };

  const timeDisplay =
    bookingData.startTime && bookingData.endTime
      ? `${bookingData.startTime} - ${bookingData.endTime}`
      : bookingData.startTime || "";

  // ============================================
  // INVITE DESIGNER STATE
  // ============================================

  const [selectedTemplate, setSelectedTemplate] = useState<InviteTemplateId>("dojo");
  const [partyDetails, setPartyDetails] = useState<PartyDetails>(DEFAULT_PARTY_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  // Initialize party details from booking data
  const getInitialDetails = useCallback((): PartyDetails => {
    const childName = bookingData.childName || "";
    const childAge = parseInt(bookingData.childAge || "") || DEFAULT_PARTY_DETAILS.childAge;
    const partyDate = bookingData.date || "";
    const partyTime = formatTimeParam(timeDisplay) || DEFAULT_PARTY_DETAILS.partyTime;

    let rsvpDate = "";
    if (partyDate) {
      const date = new Date(partyDate);
      date.setDate(date.getDate() - 7);
      rsvpDate = date.toISOString().split("T")[0] || "";
    }

    return {
      childName,
      childAge,
      partyDate,
      partyTime,
      rsvpDate,
      rsvpPhone: DEFAULT_PARTY_DETAILS.rsvpPhone,
      customMessage: "",
    };
  }, [bookingData.childName, bookingData.childAge, bookingData.date, timeDisplay]);

  useEffect(() => {
    if (!isInitialized) {
      setPartyDetails(getInitialDetails());
      setIsInitialized(true);
    }
  }, [getInitialDetails, isInitialized]);

  const updateDetails = useCallback((field: keyof PartyDetails, value: string | number) => {
    setPartyDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!templateRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(templateRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `${partyDetails.childName || "party"}-birthday-invite.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [partyDetails.childName]);

  const renderTemplate = () => {
    const props = { details: partyDetails, ref: templateRef };
    switch (selectedTemplate) {
      case "action":
        return <TemplateAction {...props} />;
      case "party":
        return <TemplateParty {...props} />;
      case "belt":
        return <TemplateBelt {...props} />;
      default:
        return <TemplateDojo {...props} />;
    }
  };

  // Format date for display
  const displayDate = bookingData.date
    ? new Date(bookingData.date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="bg-muted min-h-screen">
      {/* Header */}
      <header className="border-border sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
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

      <main className="py-8 md:py-12">
        <Container>
          <div className="mx-auto max-w-6xl">
            {/* ============================================ */}
            {/* SUCCESS SECTION - Compact */}
            {/* ============================================ */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 animate-[scale-in_0.5s_ease-out] items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h1 className="mb-2 text-3xl md:text-4xl">You&apos;re All Set!</h1>
              <p className="text-muted-foreground text-lg">
                {partyDetails.childName
                  ? `${partyDetails.childName}'s party is confirmed! 🎉`
                  : "Your booking is confirmed! 🎉"}
              </p>
            </div>

            {/* Compact Booking Summary */}
            <div className="border-border mb-8 overflow-hidden rounded-2xl border bg-white shadow-[var(--shadow-soft-md)]">
              <div className="bg-primary text-primary-foreground px-6 py-4">
                <p className="font-heading text-xl">{bookingData.packageName}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
                {displayDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="text-accent h-4 w-4" />
                    <span className="text-sm font-medium">{displayDate}</span>
                  </div>
                )}
                {timeDisplay && (
                  <div className="flex items-center gap-2">
                    <Clock className="text-accent h-4 w-4" />
                    <span className="text-sm font-medium">{timeDisplay}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="text-accent h-4 w-4" />
                  <span className="text-sm font-medium">{siteConfig.contact.city}</span>
                </div>
                {bookingData.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="text-accent h-4 w-4" />
                    <span className="text-muted-foreground text-sm">
                      Confirmation sent to {bookingData.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ============================================ */}
            {/* DIVIDER - Create Your Invites */}
            {/* ============================================ */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="border-border w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <div className="bg-muted flex items-center gap-2 px-4">
                  <Sparkles className="text-accent h-5 w-5" />
                  <span className="font-heading text-lg">Create Your Party Invites</span>
                  <Sparkles className="text-accent h-5 w-5" />
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* INVITE DESIGNER */}
            {/* ============================================ */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left: Form */}
              <div className="space-y-6">
                {/* Party Details Form */}
                <div className="rounded-xl bg-white p-6 shadow-[var(--shadow-soft-md)]">
                  <h2 className="font-heading mb-4 text-xl">Party Details</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="childName">Child&apos;s Name</Label>
                        <Input
                          id="childName"
                          placeholder="e.g., Tina"
                          value={partyDetails.childName}
                          onChange={(e) => updateDetails("childName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childAge">Age</Label>
                        <Input
                          id="childAge"
                          type="number"
                          min={1}
                          max={18}
                          placeholder="7"
                          value={partyDetails.childAge || ""}
                          onChange={(e) => updateDetails("childAge", parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Party Date</Label>
                        <div className="border-border bg-muted/50 text-foreground flex h-10 items-center rounded-md border px-3 text-sm">
                          {partyDetails.partyDate
                            ? new Date(partyDetails.partyDate + "T12:00:00").toLocaleDateString(
                                "en-US",
                                { weekday: "short", month: "short", day: "numeric" }
                              )
                            : "From booking"}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground">Party Time</Label>
                        <div className="border-border bg-muted/50 text-foreground flex h-10 items-center rounded-md border px-3 text-sm">
                          {partyDetails.partyTime || "From booking"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rsvpDate">RSVP By</Label>
                        <Input
                          id="rsvpDate"
                          type="date"
                          value={partyDetails.rsvpDate}
                          onChange={(e) => updateDetails("rsvpDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rsvpPhone">RSVP Phone</Label>
                        <Input
                          id="rsvpPhone"
                          placeholder="(818) 538-4989"
                          value={partyDetails.rsvpPhone}
                          onChange={(e) => updateDetails("rsvpPhone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customMessage">Custom Message (optional)</Label>
                      <Textarea
                        id="customMessage"
                        placeholder="Can't wait to see you there!"
                        rows={2}
                        value={partyDetails.customMessage}
                        onChange={(e) => updateDetails("customMessage", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Template Selector */}
                <div className="rounded-xl bg-white p-6 shadow-[var(--shadow-soft-md)]">
                  <h2 className="font-heading mb-4 text-xl">Choose Your Design</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {INVITE_TEMPLATES.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={cn(
                          "group relative overflow-hidden rounded-xl border-2 text-left transition-all",
                          selectedTemplate === template.id
                            ? "border-accent ring-accent ring-2 ring-offset-2"
                            : "border-border hover:border-accent/50 hover:shadow-md"
                        )}
                      >
                        <div className={cn("h-24", templateColors[template.id])} />
                        <div className="bg-white p-3">
                          <div className="mb-1 flex items-start justify-between gap-2">
                            <p className="font-heading text-sm font-bold leading-tight">
                              {template.name}
                            </p>
                            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                              {template.ageRange}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-xs leading-snug">
                            {template.description}
                          </p>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="bg-accent absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full shadow-md">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download Button - Mobile */}
                <div className="lg:hidden">
                  <Button
                    size="lg"
                    variant="accent"
                    className="font-heading w-full"
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {isDownloading ? "Generating..." : "Download PNG"}
                  </Button>
                </div>
              </div>

              {/* Right: Preview - Sticky on desktop */}
              <div className="h-fit space-y-4 lg:sticky lg:top-24">
                <div className="flex flex-col items-center rounded-xl bg-white p-6 shadow-[var(--shadow-soft-md)]">
                  <div className="border-border mb-4 flex w-full items-center justify-between border-b pb-4">
                    <h2 className="font-heading text-xl">Live Preview</h2>
                    <span className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs font-medium">
                      1080 × 1350 px
                    </span>
                  </div>

                  {/* Preview Container */}
                  <div
                    className="relative w-full overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50"
                    style={{ aspectRatio: "4 / 5", maxWidth: "400px" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div
                        style={{
                          width: "540px",
                          height: "675px",
                          transform: "scale(var(--preview-scale, 0.7))",
                          transformOrigin: "center center",
                        }}
                        className="[--preview-scale:0.55] sm:[--preview-scale:0.65] lg:[--preview-scale:0.7]"
                      >
                        {renderTemplate()}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-2 text-center text-xs">
                    Preview shows exact download appearance
                  </p>
                </div>

                {/* Download Button - Desktop */}
                <div className="hidden lg:block">
                  <Button
                    size="lg"
                    variant="accent"
                    className="font-heading w-full"
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {isDownloading ? "Generating..." : "Download PNG"}
                  </Button>
                  <p className="text-muted-foreground mt-2 text-center text-xs">
                    High-resolution image perfect for texting, WhatsApp, or printing
                  </p>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* CONTACT FOOTER */}
            {/* ============================================ */}
            <div className="mt-12 text-center">
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

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-muted flex min-h-screen items-center justify-center">
          <div className="text-muted-foreground animate-pulse">Loading...</div>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
