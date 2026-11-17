"use client";

import React from "react";
import { HeroContent, CampusVisual } from "./hero";

export default function OverviewSection() {
  return (
    <section
      id="overview"
      className="relative w-full bg-white overflow-hidden border-b border-[#E0E6EF] lg:h-[calc(100vh-72px)] lg:min-h-[640px] flex flex-col justify-center scroll-mt-[72px]"
      aria-label="Overview"
    >
      {/* Full-bleed editorial grid without arbitrary container side-margins */}
      <div className="w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] xl:grid-cols-[40%_60%] items-stretch min-h-0 flex-1">
          {/* Left Content Column: aligned with navbar padding (pl-6 sm:pl-10 lg:pl-14 xl:pl-20) */}
          <div className="w-full flex flex-col justify-center px-6 sm:px-10 lg:pl-14 xl:pl-20 lg:pr-8 py-8 sm:py-10 lg:py-12 z-10 bg-white">
            <HeroContent />
          </div>

          {/* Right Artwork Column: extends flush to right edge without white margin gaps */}
          <div className="w-full h-full relative overflow-hidden bg-white p-0 rounded-none border-none flex items-stretch min-h-[340px] sm:min-h-[440px] lg:min-h-full">
            <CampusVisual imageSrc="/images/hero-campus-reference-2x.webp" />
          </div>
        </div>
      </div>
    </section>
  );
}
