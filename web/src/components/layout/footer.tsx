import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-wide py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-white.png"
                alt={siteConfig.name}
                width={160}
                height={46}
                style={{ height: 48, width: "auto" }}
              />
            </Link>
            <p className="text-primary-foreground/80 max-w-sm">
              {siteConfig.tagline}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <a
                href={siteConfig.contact.addressLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                {siteConfig.contact.fullAddress}
              </a>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.contact.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {Object.entries(siteConfig.social).slice(0, 3).map(([key, href]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20"
                    aria-label={key}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Events */}
          <div>
            <h3 className="font-heading text-lg mb-4 uppercase tracking-wide">Events</h3>
            <ul className="space-y-2.5">
              {siteConfig.footerNav.events.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-lg mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-2.5">
              {siteConfig.footerNav.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-heading text-lg mb-4 uppercase tracking-wide">Hours</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-primary-foreground">Parties</p>
                  <p>{siteConfig.hours.parties}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-primary-foreground">Camps</p>
                  <p>{siteConfig.hours.camps}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-primary-foreground">Office</p>
                  <p>{siteConfig.hours.office}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Bar */}
      <div className="container-wide py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p>
              Part of{" "}
              <a
                href={siteConfig.parentBrands.jiujitsu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground transition-colors underline"
              >
                {siteConfig.parentBrands.jiujitsu.name}
              </a>
            </p>
          </div>
          <div className="flex gap-6">
            {siteConfig.footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary-foreground transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
