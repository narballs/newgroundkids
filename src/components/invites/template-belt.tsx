"use client";

import { forwardRef } from "react";
import Image from "next/image";
import type { PartyDetails } from "@/types/invites";
import { formatDateShort } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface TemplateProps {
  details: PartyDetails;
}

/**
 * Belt Ceremony Template
 * Premium, elegant design - included with Large Party package
 */
export const TemplateBelt = forwardRef<HTMLDivElement, TemplateProps>(({ details }, ref) => {
  const { childName, childAge, partyDate, partyTime, rsvpDate, rsvpPhone, customMessage } = details;

  return (
    <div
      ref={ref}
      className="relative h-[675px] w-[540px] overflow-hidden"
      style={{ backgroundColor: "#09090b" }}
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.7) 0%, rgba(9,9,11,0.4) 30%, rgba(9,9,11,0.85) 100%)",
        }}
      />

      {/* Gold accent lines */}
      <div className="absolute top-0 right-0 left-0 h-1" style={{ backgroundColor: "#d4af37" }} />
      <div
        className="absolute right-0 bottom-0 left-0 h-1"
        style={{ backgroundColor: "#d4af37" }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-8">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/logo.png"
            alt="NewGround Kids"
            width={120}
            height={40}
            className="h-10 w-auto object-contain invert"
          />
        </div>

        {/* Special Invitation Badge */}
        <div className="mb-6 flex justify-center">
          <div
            className="rounded-full px-5 py-2 text-sm font-medium tracking-[0.2em] uppercase"
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.2)",
              color: "#d4af37",
              border: "1px solid rgba(212, 175, 55, 0.5)",
            }}
          >
            🥋 Special Invitation 🥋
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="mb-2 text-sm tracking-[0.2em] text-white/60 uppercase">Join Us For</p>

          {/* Name */}
          <h1
            className="font-heading mb-1 text-5xl tracking-wider text-white uppercase"
            style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
          >
            {childName || "Child's Name"}&apos;s
          </h1>

          {/* Age */}
          <p
            className="font-heading mb-1 text-3xl tracking-wider uppercase"
            style={{
              fontFamily: "var(--font-bebas-neue), sans-serif",
              color: "#d4af37",
            }}
          >
            {childAge || "8"}th Birthday
          </p>
          <p
            className="font-heading mb-6 text-2xl tracking-wider text-white uppercase"
            style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
          >
            Celebration
          </p>

          {/* Decorative Line */}
          <div className="mb-6 h-0.5 w-32" style={{ backgroundColor: "#d4af37" }} />

          {/* Details */}
          <div className="mb-6 space-y-2 text-white">
            <p className="text-lg">
              {partyDate ? formatDateShort(partyDate) : "Saturday, March 22nd"}
            </p>
            <p className="text-lg">{partyTime || "2:00 PM - 4:30 PM"}</p>
            <div className="pt-2">
              <p className="font-medium">NewGround Kids</p>
              <p className="text-sm text-white/60">{siteConfig.contact.fullAddress}</p>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="mb-6 h-0.5 w-32" style={{ backgroundColor: "#d4af37" }} />

          {/* What's Included */}
          <div
            className="w-full max-w-xs rounded-xl p-4"
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.1)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
            }}
          >
            <p className="mb-3 text-xs tracking-wider uppercase" style={{ color: "#d4af37" }}>
              Featuring
            </p>
            <div className="space-y-1.5 text-sm text-white/80">
              <p>• 60 Min Gameplay & Activities</p>
              <p>• Bounce House Fun</p>
              <p>• Pizza & Drinks</p>
              <p>• Special Belt Ceremony Finale</p>
            </div>
          </div>
        </div>

        {/* Custom Message */}
        {customMessage && (
          <div className="mb-4 text-center">
            <p className="text-sm text-white/70 italic">&ldquo;{customMessage}&rdquo;</p>
          </div>
        )}

        {/* RSVP */}
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="mb-1 text-sm text-white">
            RSVP by {rsvpDate ? formatDateShort(rsvpDate) : "March 15"}
          </p>
          <p className="text-sm text-white/60">{rsvpPhone || siteConfig.contact.phone}</p>
        </div>
      </div>
    </div>
  );
});

TemplateBelt.displayName = "TemplateBelt";
