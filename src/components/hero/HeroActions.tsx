"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export interface HeroActionsProps {
  className?: string;
}

export default function HeroActions({ className = "" }: HeroActionsProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 ${className}`}>
      {/* Primary CTA: Explore Edubot -> Routes directly to Features page */}
      <Link
        href="/features"
        className="inline-flex items-center justify-center w-full sm:w-auto min-w-[190px] lg:w-[210px] h-[48px] lg:h-[50px] px-5 bg-[#0747FF] hover:bg-[#0039DE] text-white font-semibold text-sm lg:text-[16px] rounded-[10px] shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none"
        aria-label="Explore Edubot features"
      >
        <span>Explore Edubot</span>
        <ArrowRight className="w-4 h-4 ml-2 stroke-[2.2]" aria-hidden="true" />
      </Link>

      {/* Secondary CTA: Request a Demo ↗ Routes directly to Request a Demo page */}
      <Link
        href="/request-demo"
        className="inline-flex items-center text-[#080D28] hover:text-[#0747FF] font-semibold text-sm lg:text-[16px] transition-colors duration-150 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none"
        aria-label="Request a Demo"
      >
        <span>Request a Demo</span>
        <ArrowUpRight className="w-4 h-4 ml-1 stroke-[2.2]" aria-hidden="true" />
      </Link>
    </div>
  );
}
