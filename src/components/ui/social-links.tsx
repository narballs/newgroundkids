import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

type SocialPlatform = "facebook" | "instagram" | "youtube" | "twitter" | "tiktok";
type SocialSize = "sm" | "md" | "lg";
type SocialVariant = "default" | "filled" | "outline";

interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  size?: SocialSize;
  variant?: SocialVariant;
  className?: string;
}

const platformIcons: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
};

const sizeClasses: Record<SocialSize, { icon: string; button: string }> = {
  sm: { icon: "h-4 w-4", button: "p-1.5" },
  md: { icon: "h-5 w-5", button: "p-2" },
  lg: { icon: "h-6 w-6", button: "p-2.5" },
};

const variantClasses: Record<SocialVariant, string> = {
  default: "hover:bg-muted",
  filled: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-border hover:bg-muted",
};

export function SocialLinks({
  links,
  size = "md",
  variant = "default",
  className,
}: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((link) => {
        const Icon = platformIcons[link.platform];
        const label = link.label || `Follow us on ${link.platform}`;

        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center rounded-full transition-colors",
              sizeClasses[size].button,
              variantClasses[variant]
            )}
            aria-label={label}
          >
            <Icon className={sizeClasses[size].icon} />
          </a>
        );
      })}
    </div>
  );
}
