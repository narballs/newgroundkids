"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toPng } from "html-to-image";
import { Download, ArrowLeft, Sparkles, Check, PartyPopper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/layout/container";
import { TemplateDojo, TemplateAction, TemplateParty, TemplateBelt } from "@/components/invites";
import { INVITE_TEMPLATES, DEFAULT_PARTY_DETAILS } from "@/types/invites";
import type { PartyDetails, InviteTemplateId } from "@/types/invites";
import { cn } from "@/lib/utils";

// Helper to clean up messy time strings from Cal.com
const formatTimeParam = (timeStr: string | null): string => {
  if (!timeStr) return "";

  // If it's a clean short string, return as-is
  if (timeStr.length < 25 && !timeStr.includes("GMT")) {
    return timeStr;
  }

  // Handle Cal.com's raw date string format
  // e.g. "Tue Jan 20 2026 19:00:00 GMT+0000 (Coordinated Universal Time)"
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

function InvitesPageContent() {
  const searchParams = useSearchParams();

  // Check if we have pre-filled data from URL params (from booking confirmation)
  const hasPrefilledData = searchParams.has("childName") || searchParams.has("date");

  // Initialize state from URL params if available
  const getInitialDetails = useCallback((): PartyDetails => {
    const childName = searchParams.get("childName") || "";
    const childAge = parseInt(searchParams.get("childAge") || "") || DEFAULT_PARTY_DETAILS.childAge;
    const partyDate = searchParams.get("date") || "";
    // Clean up time param (handles messy Cal.com date strings)
    const partyTime = formatTimeParam(searchParams.get("time")) || DEFAULT_PARTY_DETAILS.partyTime;

    // Calculate RSVP date (1 week before party)
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
      rsvpPhone: searchParams.get("phone") || DEFAULT_PARTY_DETAILS.rsvpPhone,
      customMessage: "",
    };
  }, [searchParams]);

  const [selectedTemplate, setSelectedTemplate] = useState<InviteTemplateId>("dojo");
  const [partyDetails, setPartyDetails] = useState<PartyDetails>(DEFAULT_PARTY_DETAILS);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  // Initialize from URL params on mount
  useEffect(() => {
    if (!isInitialized) {
      setPartyDetails(getInitialDetails());
      setIsInitialized(true);
    }
  }, [getInitialDetails, isInitialized]);

  // Update party details
  const updateDetails = useCallback((field: keyof PartyDetails, value: string | number) => {
    setPartyDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Download PNG
  const handleDownload = useCallback(async () => {
    if (!templateRef.current) return;

    setIsDownloading(true);
    try {
      // Generate PNG at 2x resolution for high quality
      const dataUrl = await toPng(templateRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      // Create download link
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

  // Render the selected template
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

  return (
    <div className="bg-muted min-h-screen">
      {/* Header */}
      <header className="border-border sticky top-0 z-50 border-b bg-white">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/birthday-parties"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Parties</span>
              </Link>
              <div className="bg-border h-6 w-px" />
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="NewGround Kids"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-accent h-4 w-4" />
              <span className="text-sm font-medium">Invite Designer</span>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container>
          <div className="mx-auto max-w-6xl">
            {/* Pre-filled Banner */}
            {hasPrefilledData && partyDetails.childName && (
              <div className="bg-accent/10 border-accent/20 mb-6 flex items-center gap-3 rounded-xl border p-4">
                <PartyPopper className="text-accent h-5 w-5 shrink-0" />
                <p className="text-sm">
                  <span className="font-medium">Party details pre-filled!</span>{" "}
                  <span className="text-muted-foreground">
                    Creating invites for {partyDetails.childName}&apos;s{" "}
                    {partyDetails.childAge ? `${partyDetails.childAge}th ` : ""}birthday party.
                  </span>
                </p>
              </div>
            )}

            {/* Page Title */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl md:text-4xl">Create Your Party Invites</h1>
              <p className="text-muted-foreground">
                {hasPrefilledData
                  ? "Your party details are pre-filled! Choose a design and download."
                  : "Fill in your party details, choose a design, and download your invite!"}
              </p>
            </div>

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
                        <Label htmlFor="partyDate">Party Date</Label>
                        <Input
                          id="partyDate"
                          type="date"
                          value={partyDetails.partyDate}
                          onChange={(e) => updateDetails("partyDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partyTime">Party Time</Label>
                        <Input
                          id="partyTime"
                          placeholder="2:00 PM - 4:00 PM"
                          value={partyDetails.partyTime}
                          onChange={(e) => updateDetails("partyTime", e.target.value)}
                        />
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
                        {/* Preview Gradient */}
                        <div className={cn("h-28", templateColors[template.id])} />

                        {/* Info */}
                        <div className="bg-white p-4">
                          <div className="mb-1 flex items-start justify-between gap-2">
                            <p className="font-heading text-base leading-tight font-bold">
                              {template.name}
                            </p>
                            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                              {template.ageRange}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm leading-snug">
                            {template.description}
                          </p>
                        </div>

                        {/* Selected Check */}
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
                <div className="flex min-h-[650px] flex-col items-center rounded-xl bg-white p-6 shadow-[var(--shadow-soft-md)]">
                  {/* Header */}
                  <div className="border-border mb-6 flex w-full items-center justify-between border-b pb-4">
                    <h2 className="font-heading text-xl">Live Preview</h2>
                    <span className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs font-medium">
                      1080 × 1350 px
                    </span>
                  </div>

                  {/* Centered Preview Area */}
                  <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 p-4">
                    <div
                      className="origin-center overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ease-in-out"
                      style={{ transform: "scale(0.85)" }}
                    >
                      {renderTemplate()}
                    </div>
                  </div>
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
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="border-border mt-8 border-t bg-white py-6">
        <Container>
          <div className="text-muted-foreground text-center text-sm">
            <p>
              Need to book a party?{" "}
              <Link href="/birthday-parties" className="text-accent hover:underline">
                View our packages →
              </Link>
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function InvitesPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-muted flex min-h-screen items-center justify-center">
          <div className="text-muted-foreground animate-pulse">Loading invite designer...</div>
        </div>
      }
    >
      <InvitesPageContent />
    </Suspense>
  );
}
