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
 * Action Hero Template
 * Bold, energetic design with diagonal split - best for ages 8-12
 */
export const TemplateAction = forwardRef<HTMLDivElement, TemplateProps>(({ details }, ref) => {
  const { childName, childAge, partyDate, partyTime, rsvpDate, rsvpPhone, customMessage } = details;

  return (
    <div
      ref={ref}
      className="relative h-[675px] w-[540px] overflow-hidden"
      style={{ backgroundColor: "#09090b" }}
    >
      {/* Diagonal Split Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #09090b 50%, #14b8a6 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-8">
        {/* Top Badge */}
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-black uppercase">
            ⚡ Epic Party Alert ⚡
          </div>
        </div>

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/logo.png"
            alt="NewGround Kids"
            width={120}
            height={40}
            className="h-8 w-auto object-contain invert"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Name */}
          <p className="mb-2 text-sm tracking-[0.2em] text-white/70 uppercase">Get Ready For</p>
          <h1
            className="font-heading mb-1 text-5xl tracking-wider text-white uppercase"
            style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
          >
            {childName || "Child's Name"}&apos;s
          </h1>

          {/* Giant Age Number */}
          <div className="relative my-4">
            <span
              className="font-heading absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-white/10"
              style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
            >
              {childAge || "8"}
            </span>
            <span
              className="font-heading relative text-7xl text-white"
              style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                textShadow: "4px 4px 0 #14b8a6",
              }}
            >
              {childAge || "8"}
            </span>
          </div>
          <p
            className="font-heading text-2xl tracking-wider text-white uppercase"
            style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
          >
            Years Old!
          </p>

          {/* Details */}
          <div className="mt-6 w-full max-w-xs rounded-xl bg-white/10 p-4 backdrop-blur">
            <div className="space-y-2 text-center text-white">
              <p className="font-medium">📅 {partyDate ? formatDateShort(partyDate) : "March 8"}</p>
              <p className="font-medium">🕐 {partyTime || "3PM - 5PM"}</p>
              <p className="text-sm text-white/80">📍 NewGround Kids, {siteConfig.contact.city}</p>
            </div>
          </div>

          {/* Activities */}
          <div className="mt-5 grid w-full max-w-xs grid-cols-3 gap-2">
            <div className="rounded-lg bg-black/30 px-1 py-2 text-center">
              <span className="text-lg">🥷</span>
              <p className="mt-1 text-xs text-white">Ninja Games</p>
            </div>
            <div className="rounded-lg bg-black/30 px-1 py-2 text-center">
              <span className="text-lg">🏆</span>
              <p className="mt-1 text-xs text-white">Epic Battles</p>
            </div>
            <div className="rounded-lg bg-black/30 px-1 py-2 text-center">
              <span className="text-lg">🎁</span>
              <p className="mt-1 text-xs text-white">Prizes</p>
            </div>
          </div>
        </div>

        {/* Custom Message */}
        {customMessage && (
          <div className="mb-3 text-center">
            <p className="text-sm text-white/80 italic">&ldquo;{customMessage}&rdquo;</p>
          </div>
        )}

        {/* RSVP */}
        <div className="border-t border-white/20 pt-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-black">
            <span className="text-sm font-bold">BE THERE!</span>
          </div>
          <p className="mt-2 text-xs text-white/60">
            RSVP by {rsvpDate ? formatDateShort(rsvpDate) : "March 1"} •{" "}
            {rsvpPhone || siteConfig.contact.phone}
          </p>
        </div>
      </div>
    </div>
  );
});

TemplateAction.displayName = "TemplateAction";
