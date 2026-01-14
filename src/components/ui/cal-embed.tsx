"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

// Cal.com username from environment or fallback
const CALCOM_USERNAME = process.env.NEXT_PUBLIC_CALCOM_USERNAME || "newgroundkids";

export type CalEmbedEventType =
  | "15min" // 15 min meeting
  | "30min" // 30 min meeting
  | string; // Custom event slug

interface CalEmbedProps {
  /** The event type slug from Cal.com (e.g., "15min", "30min", "birthday-party-small") */
  eventType?: CalEmbedEventType;
  /** Custom namespace for multiple embeds on same page */
  namespace?: string;
  /** Additional CSS classes */
  className?: string;
  /** Minimum height for the embed */
  minHeight?: string;
  /** Pre-fill guest information */
  prefill?: {
    name?: string;
    email?: string;
    notes?: string;
    guests?: string[];
  };
  /** Custom styles for the Cal.com embed */
  calStyles?: {
    branding?: {
      brandColor?: string;
    };
    hideEventTypeDetails?: boolean;
    layout?: "month_view" | "week_view" | "column_view";
  };
}

/**
 * Cal.com Embed Component
 *
 * Embeds a Cal.com booking calendar inline on the page.
 *
 * @example
 * // Basic usage - shows all event types
 * <CalEmbed />
 *
 * @example
 * // Specific event type
 * <CalEmbed eventType="birthday-party-small" />
 *
 * @example
 * // With prefilled data
 * <CalEmbed
 *   eventType="15min"
 *   prefill={{ name: "John", email: "john@example.com" }}
 * />
 */
export function CalEmbed({
  eventType,
  namespace = "ngk-booking",
  className,
  minHeight = "600px",
  calStyles,
}: CalEmbedProps) {
  // Build the cal link - either specific event or all events
  const calLink = eventType ? `${CALCOM_USERNAME}/${eventType}` : CALCOM_USERNAME;

  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi({ namespace });

      // Configure UI settings
      cal("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: calStyles?.branding?.brandColor || "#E53935", // NGK Primary Red
          },
        },
        hideEventTypeDetails: calStyles?.hideEventTypeDetails ?? false,
        layout: calStyles?.layout || "month_view",
      });
    })();
  }, [namespace, calStyles]);

  const calUrl = `https://cal.com/${calLink}`;

  return (
    <div
      className={cn(
        "shadow-hard w-full overflow-hidden rounded-lg border-2 border-black bg-white",
        className
      )}
      style={{ minHeight }}
    >
      <Cal
        namespace={namespace}
        calLink={calLink}
        style={{
          width: "100%",
          height: "100%",
          minHeight,
          overflow: "scroll",
        }}
        config={{
          layout: calStyles?.layout || "month_view",
          theme: "light",
        }}
      />

      {/* Fallback link if embed doesn't load */}
      <noscript>
        <div className="p-8 text-center">
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Click here to book →
          </a>
        </div>
      </noscript>
    </div>
  );
}

/**
 * Cal.com Popup Button Component
 *
 * Opens Cal.com in a modal popup when clicked.
 */
interface CalPopupButtonProps {
  /** The event type slug */
  eventType?: CalEmbedEventType;
  /** Button text */
  children: React.ReactNode;
  /** Button className */
  className?: string;
  /** Pre-fill guest information */
  prefill?: {
    name?: string;
    email?: string;
    notes?: string;
  };
}

export function CalPopupButton({ eventType, children, className, prefill }: CalPopupButtonProps) {
  const calLink = eventType ? `${CALCOM_USERNAME}/${eventType}` : CALCOM_USERNAME;

  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi({ namespace: "popup" });
      cal("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#E53935",
          },
        },
      });
    })();
  }, []);

  return (
    <button
      className={className}
      data-cal-namespace="popup"
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({
        layout: "month_view",
        theme: "light",
        ...(prefill && {
          name: prefill.name,
          email: prefill.email,
          notes: prefill.notes,
        }),
      })}
    >
      {children}
    </button>
  );
}

export default CalEmbed;
