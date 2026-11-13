import React from "react";
import Image from "next/image";

export interface CampusIllustrationProps {
  className?: string;
}

export default function CampusIllustration({ className = "" }: CampusIllustrationProps) {
  return (
    <figure className={`w-full max-w-[460px] flex flex-col items-center mx-auto ${className}`}>
      {/* Real Campus Illustration with Circular Blue 'e' Emblem */}
      <div className="relative w-full aspect-[448/259] select-none">
        <Image
          src="/images/demo_campus_gateway_artwork-2x.png"
          alt="Edubot connected campus illustration featuring classical campus halls, university library, students, and the circular blue 'e' monument"
          fill
          loading="lazy"
          quality={90}
          sizes="(max-width: 768px) 100vw, 460px"
          priority={false}
          className="object-contain object-center pointer-events-none"
        />
      </div>

      {/* Institution Category Caption */}
      <figcaption className="text-center text-xs sm:text-sm font-medium text-secondary mt-3 select-none">
        Schools · Colleges · Universities
      </figcaption>
    </figure>
  );
}

