"use client";

import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export interface HeroActionsProps {
  className?: string;
}

export default function HeroActions({ className = "" }: HeroActionsProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      elem.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 ${className}`}>
      {/* Primary CTA: Explore Edubot -> (approx 266 × 65px, 13px radius, #0747FF) */}
      <a
        href="#features"
        onClick={(e) => handleScrollTo(e, "features")}
        className="inline-flex items-center justify-center w-full sm:w-[250px] lg:w-[266px] h-[56px] lg:h-[65px] px-6 bg-[#0747FF] hover:bg-[#0039DE] text-white font-semibold text-base lg:text-[20px] rounded-[13px] shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none"
        aria-label="Explore Edubot features"
      >
        <span>Explore Edubot</span>
        <ArrowRight className="w-5 h-5 ml-2.5 stroke-[2.2]" aria-hidden="true" />
      </a>

      {/* Secondary CTA: Request a Demo ↗ (Navy text, transparent background, vertically centered) */}
      <a
        href="#request-demo"
        onClick={(e) => handleScrollTo(e, "request-demo")}
        className="inline-flex items-center text-[#080D28] hover:text-[#0747FF] font-semibold text-base lg:text-[20px] transition-colors duration-150 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none"
        aria-label="Request a Demo"
      >
        <span>Request a Demo</span>
        <ArrowUpRight className="w-5 h-5 ml-1.5 stroke-[2.2]" aria-hidden="true" />
      </a>
    </div>
  );
}
