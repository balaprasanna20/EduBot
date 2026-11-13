"use client";

import React from "react";
import HeroActions from "./HeroActions";

export interface HeroContentProps {
  className?: string;
}

export default function HeroContent({ className = "" }: HeroContentProps) {
  return (
    <div
      className={`w-full max-w-[513px] flex flex-col justify-start text-left select-none ${className}`}
    >
      {/* Eyebrow - Calibration anchor y ~ 213px */}
      <div className="mb-4 lg:mb-5">
        <span className="text-xs sm:text-sm lg:text-[17px] xl:text-[18px] font-bold text-[#0747FF] uppercase tracking-wider inline-block">
          EDUCATION MANAGEMENT SYSTEM
        </span>
      </div>

      {/* Headline: Three explicit lines, editorial serif - Calibration anchor y ~ 270px */}
      <h1 className="font-serif font-bold text-[#080D28] text-[44px] sm:text-[58px] lg:text-[68px] xl:text-[76px] leading-[1.06] tracking-tight mb-5 lg:mb-7">
        <span className="block text-[#080D28]">Less admin.</span>
        <span className="block text-[#080D28]">More time for</span>
        <span className="block text-[#0747FF]">learning.</span>
      </h1>

      {/* Supporting paragraph - Calibration anchor y ~ 533px */}
      <p className="text-base sm:text-lg lg:text-[20px] xl:text-[22px] text-[#667085] leading-[1.38] mb-3 lg:mb-4">
        Bring records, attendance and classroom
        <br className="hidden sm:inline" />
        {" "}tasks together—so your team can focus on
        <br className="hidden sm:inline" />
        {" "}education.
      </p>

      {/* Audience line - Calibration anchor y ~ 644px */}
      <p className="text-sm sm:text-base lg:text-[19px] xl:text-[20px] text-[#667085] mb-6 lg:mb-8">
        For schools, colleges and universities
      </p>

      {/* CTA Row - Calibration anchor y ~ 715px */}
      <div className="mb-6 lg:mb-7">
        <HeroActions />
      </div>

      {/* Divider - Calibration anchor y ~ 824px (Approx 513px wide, thin pale-grey line) */}
      <div
        className="w-full max-w-[513px] h-[1px] bg-[#D5DBE5] mb-5 lg:mb-6"
        aria-hidden="true"
      />

      {/* Bottom Category Row - Calibration anchor y ~ 850px */}
      <div>
        <p className="text-sm sm:text-base lg:text-[18px] xl:text-[20px] font-medium text-[#667085]">
          Administration &nbsp;&middot;&nbsp; Teaching &nbsp;&middot;&nbsp; Learning
        </p>
      </div>
    </div>
  );
}
