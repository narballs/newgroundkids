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
 * Party Pop Template
 * Playful, colorful design - best for younger kids ages 4-7
 */
export const TemplateParty = forwardRef<HTMLDivElement, TemplateProps>(({ details }, ref) => {
  const { childName, childAge, partyDate, partyTime, rsvpDate, rsvpPhone, customMessage } = details;

  return (
    <div
      ref={ref}
      className="relative h-[675px] w-[540px] overflow-hidden"
      style={{ backgroundColor: "#fef7ed" }}
    >
      {/* Dot Pattern Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(#fb7185 2px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-8">
        {/* Balloons Header */}
        <div className="mb-2 text-center text-3xl">🎈🎈🎈🎈🎈</div>

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/logo.png"
            alt="NewGround Kids"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center">
          {/* Hooray Badge */}
          <div
            className="mb-4 rounded-full px-5 py-2 text-sm font-bold tracking-wider text-white uppercase"
            style={{ backgroundColor: "#f43f5e" }}
          >
            🎉 Hooray! 🎉
          </div>

          {/* Name Card */}
          <div className="mb-4 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-lg">
            <h1
              className="font-heading mb-1 text-4xl tracking-wider text-gray-900 uppercase"
              style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
            >
              {childName || "Child's Name"}
            </h1>
            <p className="mb-3 text-lg text-gray-600">is turning</p>

            {/* Age Circle */}
            <div
              className="mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: "#14b8a6" }}
            >
              <span
                className="font-heading text-5xl"
                style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
              >
                {childAge || "5"}
              </span>
            </div>
          </div>

          {/* Detail Cards */}
          <div className="mb-4 flex gap-3">
            <div className="min-w-[90px] rounded-xl bg-white p-3 text-center shadow-md">
              <span className="mb-1 block text-2xl">📅</span>
              <p className="text-xs font-medium text-gray-800">
                {partyDate ? formatDateShort(partyDate).split(",")[0] : "SAT"}
              </p>
              <p className="text-xs text-gray-500">
                {partyDate
                  ? new Date(partyDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Feb 22"}
              </p>
            </div>
            <div className="min-w-[90px] rounded-xl bg-white p-3 text-center shadow-md">
              <span className="mb-1 block text-2xl">🕐</span>
              <p className="text-xs font-medium text-gray-800">
                {partyTime ? partyTime.split("-")[0]?.trim() || "1PM" : "1PM"}
              </p>
            </div>
            <div className="min-w-[90px] rounded-xl bg-white p-3 text-center shadow-md">
              <span className="mb-1 block text-2xl">📍</span>
              <p className="text-xs font-medium text-gray-800">NGK</p>
              <p className="text-[10px] text-gray-500">{siteConfig.contact.city}</p>
            </div>
          </div>

          {/* Activities */}
          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-md">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span>🎮</span>
                <span className="text-gray-700">Fun Games!</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🦘</span>
                <span className="text-gray-700">Bounce House!</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🧁</span>
                <span className="text-gray-700">Yummy Treats!</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏅</span>
                <span className="text-gray-700">Special Belt!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Message */}
        {customMessage && (
          <div className="mb-3 text-center">
            <p className="text-sm text-gray-600 italic">&ldquo;{customMessage}&rdquo;</p>
          </div>
        )}

        {/* RSVP */}
        <div className="rounded-xl bg-white p-3 text-center shadow-md">
          <p className="text-sm font-medium text-gray-800">
            Please RSVP by {rsvpDate ? formatDateShort(rsvpDate) : "Feb 15"}
          </p>
          <p className="text-xs text-gray-500">{rsvpPhone || siteConfig.contact.phone}</p>
        </div>

        {/* Footer Balloons */}
        <div className="mt-3 text-center text-3xl">🎈🎈🎈🎈🎈</div>
      </div>
    </div>
  );
});

TemplateParty.displayName = "TemplateParty";
