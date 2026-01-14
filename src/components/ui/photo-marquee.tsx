"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoMarqueeProps {
  images: string[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function PhotoMarquee({
  images,
  className,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
}: PhotoMarqueeProps) {
  const speedMap = {
    slow: "60s",
    normal: "40s",
    fast: "25s",
  };

  // Double the images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient fade edges */}
      <div className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent md:w-32" />
      <div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l to-transparent md:w-32" />

      <div
        className={cn("flex gap-4 md:gap-6", pauseOnHover && "hover:[animation-play-state:paused]")}
        style={{
          animation: `marquee-${direction} ${speedMap[speed]} linear infinite`,
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl shadow-[var(--shadow-soft-lg)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-soft-xl)] md:h-44 md:w-64 lg:h-52 lg:w-80"
            style={{
              transform: `rotate(${index % 2 === 0 ? "-1" : "1"}deg)`,
            }}
          >
            <Image
              src={src}
              alt="Kids having fun at NewGround Kids"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
