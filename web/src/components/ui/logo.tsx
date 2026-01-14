import Image from "next/image";
import Link from "next/link";

type LogoVariant = "default" | "white" | "dark";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  href?: string;
  className?: string;
  showText?: boolean;
}

const sizeClasses: Record<
  LogoSize,
  { width: number; height: number; style: { height: number; width: string } }
> = {
  sm: { width: 100, height: 28, style: { height: 28, width: "auto" } },
  md: { width: 140, height: 40, style: { height: 40, width: "auto" } },
  lg: { width: 180, height: 52, style: { height: 52, width: "auto" } },
  xl: { width: 220, height: 64, style: { height: 64, width: "auto" } },
};

const variantSrc: Record<LogoVariant, string> = {
  default: "/logo.png",
  white: "/logo-white.png",
  dark: "/logo.png",
};

export function Logo({
  variant = "default",
  size = "md",
  href = "/",
  className,
  showText = false,
}: LogoProps) {
  const sizeConfig = sizeClasses[size];
  const src = variantSrc[variant];

  const LogoImage = (
    <Image
      src={src}
      alt="NewGround Kids"
      width={sizeConfig.width}
      height={sizeConfig.height}
      style={sizeConfig.style}
      className={className}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center gap-2">
        {LogoImage}
        {showText && (
          <span className="font-heading text-xl tracking-wide uppercase">NewGround Kids</span>
        )}
      </Link>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      {LogoImage}
      {showText && (
        <span className="font-heading text-xl tracking-wide uppercase">NewGround Kids</span>
      )}
    </div>
  );
}
