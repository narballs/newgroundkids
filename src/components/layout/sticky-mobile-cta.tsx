"use client";

import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

interface StickyMobileCTAProps {
  primaryText?: string;
  primaryHref?: string;
  showPhone?: boolean;
}

export function StickyMobileCTA({
  primaryText = "Book Now",
  primaryHref = "/birthday-parties",
  showPhone = true,
}: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      {/* Gradient fade effect */}
      <div className="h-4 bg-gradient-to-t from-background to-transparent" />
      
      {/* CTA Bar */}
      <div className="bg-background border-t-2 border-border px-4 py-3 shadow-hard-lg">
        <div className="flex gap-3">
          {showPhone && (
            <Button
              variant="outline"
              className="flex-1 gap-2 border-2 font-heading"
              asChild
            >
              <a href={`tel:${siteConfig.contact.phoneRaw}`}>
                <Phone className="h-4 w-4" />
                Call
              </a>
            </Button>
          )}
          <Button
            variant="accent"
            className="flex-1 gap-2 font-heading shadow-hard-sm"
            asChild
          >
            <Link href={primaryHref}>
              <Calendar className="h-4 w-4" />
              {primaryText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
