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
 * Dojo Classic Template
 * Clean, modern design with teal gradient - works for all ages
 */
export const TemplateDojo = forwardRef<HTMLDivElement, TemplateProps>(({ details }, ref) => {
  const { childName, childAge, partyDate, partyTime, rsvpDate, rsvpPhone, customMessage } = details;

  return (
    <div
      ref={ref}
      className="relative h-[675px] w-[540px] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d9488 0%, #042f2e 100%)",
      }}
    >
      {/* Inner container with padding */}
      <div className="absolute inset-4 flex flex-col rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white p-3">
            <Image
              src="/logo.png"
              alt="NewGround Kids"
              width={240}
              height={60}
              className="h-10 w-auto object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-4 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-white/80 uppercase">
            You&apos;re Invited To
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Child's Name */}
          <h1
            className="font-heading mb-2 text-5xl tracking-wider text-white uppercase"
            style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
          >
            {childName || "Child's Name"}&apos;s
          </h1>

          {/* Age Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-6 py-2"
            style={{ backgroundColor: "#14b8a6" }}
          >
            <span className="font-heading text-xl tracking-wider text-white uppercase">
              {childAge || "7"}th Birthday Party!
            </span>
          </div>

          {/* Decorative line */}
          <div className="mb-6 h-0.5 w-24 bg-white/30" />

          {/* Party Details Card */}
          <div className="w-full max-w-xs rounded-xl bg-white p-5 shadow-lg">
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">📅</span>
                <span className="font-medium text-gray-800">
                  {partyDate ? formatDateShort(partyDate) : "Saturday, Feb 15"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🕐</span>
                <span className="font-medium text-gray-800">
                  {partyTime || "2:00 PM - 4:00 PM"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">📍</span>
                <span className="text-sm font-medium text-gray-800">
                  NewGround Kids
                  <br />
                  <span className="text-xs text-gray-500">
                    {siteConfig.contact.city}, {siteConfig.contact.state}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-6 text-sm text-white/80">
            <p className="mb-1">🥋 Martial Arts Games • 🎪 Bounce House</p>
            <p>🎂 Cake & Pizza • 🏅 Belt Ceremony</p>
          </div>
        </div>

        {/* Custom Message */}
        {customMessage && (
          <div className="mb-4 text-center">
            <p className="text-sm text-white/90 italic">&ldquo;{customMessage}&rdquo;</p>
          </div>
        )}

        {/* RSVP Footer */}
        <div className="border-t border-white/20 pt-4 text-center">
          <p className="mb-1 text-sm font-medium text-white">
            RSVP by {rsvpDate ? formatDateShort(rsvpDate) : "Feb 10"}
          </p>
          <p className="text-sm text-white/70">{rsvpPhone || siteConfig.contact.phone}</p>
        </div>
      </div>
    </div>
  );
});

TemplateDojo.displayName = "TemplateDojo";
