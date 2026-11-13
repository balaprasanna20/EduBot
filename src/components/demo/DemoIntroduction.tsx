import React from "react";
import Image from "next/image";
import CampusIllustration from "./CampusIllustration";

export interface DemoIntroductionProps {
  className?: string;
}

export default function DemoIntroduction({ className = "" }: DemoIntroductionProps) {
  return (
    <div className={`w-full max-w-[500px] flex flex-col justify-between ${className}`}>
      <div>
        {/* Top Identity: Circular 'e' Emblem + Pipe + Edubot */}
        <div className="flex items-center gap-2.5 mb-4 sm:mb-5 select-none">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
            <Image
              src="/images/edubot-icon.png"
              alt="Edubot Icon"
              width={148}
              height={148}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[#CBD5E1] font-light text-lg select-none" aria-hidden="true">
            |
          </span>
          <span className="text-lg sm:text-xl font-bold tracking-tight font-sans text-navy">
            Edubot
          </span>
        </div>

        {/* Eyebrow - 12px to headline */}
        <div className="mb-3">
          <span className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider inline-block">
            LET’S CONNECT
          </span>
        </div>

        {/* Headline with exact two-line contrasting typography - 16px to description */}
        <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] leading-[1.12] tracking-tight mb-4">
          <span className="block font-sans font-bold text-navy">
            Your next chapter
          </span>
          <span className="block font-serif italic font-normal text-primary">
            starts with Edubot.
          </span>
        </h2>

        {/* Supporting Paragraph - 32px to illustration */}
        <p className="text-sm sm:text-base md:text-[17px] text-secondary leading-relaxed max-w-[440px] mb-6 sm:mb-8">
          See how connected administration, teaching and learning can work for your institution.
        </p>
      </div>

      {/* Campus Gateway Artwork with Category Caption */}
      <div className="mt-auto pt-2">
        <CampusIllustration />
      </div>
    </div>
  );
}

