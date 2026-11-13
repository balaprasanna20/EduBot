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
      {/* Desktop Composition: ~40% Left Text Panel and ~60% Right Campus Artwork */}
      <div className="w-full bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch lg:min-h-[460px] xl:min-h-[500px]">
            {/* Left Column: Solid White Text Area with Real HTML / Accessible UI */}
            <div className="w-full lg:w-[40%] bg-white flex flex-col justify-center px-5 md:px-8 lg:pl-12 lg:pr-8 py-6 md:py-8 lg:py-10 z-10">
              <HeroContent />
            </div>

            {/* Right Column: Campus Artwork with Floating HTML Feature Badges */}
            <div className="w-full lg:w-[60%] flex items-stretch">
              <CampusVisual imageSrc="/images/hero-campus-artwork-pure.webp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
