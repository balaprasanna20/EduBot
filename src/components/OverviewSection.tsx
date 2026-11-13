"use client";

import React from "react";
import { HeroContent, CampusVisual } from "./hero";

export default function OverviewSection() {
  return (
    <section
      id="overview"
      className="relative w-full bg-white overflow-hidden scroll-mt-24 border-b border-[#E0E6EF]"
      aria-label="Overview"
    >
      {/* 1672px Reference Container with 39% (x=0-651) / 61% (x=651-1672) Grid Split */}
      <div className="w-full max-w-[1672px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[39%_61%] xl:grid-cols-[651px_1fr] items-stretch min-h-0">
          {/* Left Content Column: x = 0–651px, left inset = ~70px, content width = ~513px */}
          <div className="w-full flex flex-col justify-center px-6 sm:px-10 lg:pl-[70px] lg:pr-8 py-8 sm:py-12 lg:py-14 z-10 bg-white">
            <HeroContent />
          </div>

          {/* Right Artwork Column: x = 651–1672px, clean vertical edge meeting white panel */}
          <div className="w-full h-full relative overflow-hidden bg-white p-0 rounded-none border-none">
            <CampusVisual imageSrc="/images/hero-campus-reference-2x.webp" />
          </div>
        </div>
      </div>
    </section>
  );
}
