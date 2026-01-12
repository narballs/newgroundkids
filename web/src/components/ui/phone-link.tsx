import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneLinkProps {
  number: string;
  formatted?: string;
  showIcon?: boolean;
  className?: string;
}

export function PhoneLink({
  number,
  formatted,
  showIcon = true,
  className,
}: PhoneLinkProps) {
  // Clean number for tel: link (remove all non-digits except leading +)
  const cleanNumber = number.replace(/[^\d+]/g, "");
  
  // Format for display if not provided
  const displayNumber = formatted || number;

  return (
    <a
      href={`tel:${cleanNumber}`}
      className={cn(
        "inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors",
        className
      )}
    >
      {showIcon && <Phone className="h-4 w-4 shrink-0" />}
      <span>{displayNumber}</span>
    </a>
  );
}
