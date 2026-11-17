"use client";

import React from "react";
import Image from "next/image";

export interface CampusVisualProps {
  className?: string;
  imageSrc?: string;
}

export default function CampusVisual({
  className = "",
  imageSrc = "/images/hero-campus-reference-2x.webp",
}: CampusVisualProps) {
  return (
    <div
      className={`relative w-full aspect-[1021/844] lg:aspect-auto h-full min-h-[340px] sm:min-h-[440px] lg:min-h-full bg-white overflow-hidden select-none rounded-none p-0 border-none ${className}`}
    >
      {/* Exact Approved Reference Campus Artwork (Preserves blue 'e', people, buildings, trees, and both original badges) */}
      <Image
        src={imageSrc}
        alt="Edubot connected campus architecture featuring the iconic blue architectural 'e' entrance gateway, students, and campus grounds"
        fill
        priority
        quality={95}
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover object-center pointer-events-none select-none rounded-none"
      />
    </div>
  );
}
