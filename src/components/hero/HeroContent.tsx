"use client";

import React from "react";
import HeroActions from "./HeroActions";

export interface HeroContentProps {
  className?: string;
}

export default function HeroContent({ className = "" }: HeroContentProps) {
  return (
    <div
      className={`w-full max-w-[480px] flex flex-col justify-start text-left select-none ${className}`}
    >
      {/* Eyebrow */}
      <div className="mb-3 sm:mb-3.5">
        <span className="text-xs sm:text-[13px] lg:text-[14px] font-bold text-[#0747FF] uppercase tracking-wider inline-block">
          EDUCATION MANAGEMENT SYSTEM
        </span>
      </div>

      {/* Headline: Three explicit lines, editorial serif (48px-52px on desktop) */}
      <h1 className="font-serif font-bold text-[#080D28] text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[52px] leading-[1.08] tracking-tight mb-3.5 sm:mb-4">
        <span className="block text-[#080D28]">Less admin.</span>
        <span className="block text-[#080D28]">More time for</span>
        <span className="block text-[#0747FF]">learning.</span>
      </h1>

      {/* Supporting paragraph */}
      <p className="text-sm sm:text-base lg:text-[16px] xl:text-[17px] text-[#667085] leading-[1.4] mb-2.5 sm:mb-3">
        Bring records, attendance and classroom
        <br className="hidden sm:inline" />
        {" "}tasks together—so your team can focus on
        <br className="hidden sm:inline" />
        {" "}education.
      </p>

      {/* Audience line */}
      <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] text-[#667085] mb-5 sm:mb-6">
        For schools, colleges and universities
      </p>

      {/* CTA Row */}
      <div className="mb-5 sm:mb-6">
        <HeroActions />
      </div>

      {/* Divider */}
      <div
        className="w-full max-w-[460px] h-[1px] bg-[#D5DBE5] mb-3.5 sm:mb-4"
        aria-hidden="true"
      />

      {/* Bottom Category Row */}
      <div>
        <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] font-medium text-[#667085]">
          Administration &nbsp;&middot;&nbsp; Teaching &nbsp;&middot;&nbsp; Learning
        </p>
      </div>
    </div>
  );
}
