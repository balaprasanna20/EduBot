"use client";

import React from "react";
import { HeroContent, CampusVisual } from "./hero";

export default function OverviewSection() {
  return (
    <section
      id="overview"
      className="relative w-full bg-white overflow-hidden scroll-mt-20 border-b border-[#E0E6EF]"
      aria-label="Overview"
    >
      {/* Unified 1280px Container matching all other sections */}
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] xl:grid-cols-[44%_56%] items-stretch min-h-0">
          {/* Left Content Column: aligned to standard desktop side padding lg:pl-12 */}
          <div className="w-full flex flex-col justify-center px-5 sm:px-8 lg:pl-12 lg:pr-6 py-6 sm:py-8 lg:py-10 z-10 bg-white">
            <HeroContent />
          </div>

          {/* Right Artwork Column: clean vertical flush edge meeting left panel */}
          <div className="w-full h-full relative overflow-hidden bg-white p-0 rounded-none border-none flex items-stretch">
            <CampusVisual imageSrc="/images/hero-campus-reference-2x.webp" />
          </div>
        </div>
      </div>
    </section>
  );
}
