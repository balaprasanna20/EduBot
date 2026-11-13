"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export interface HeroActionsProps {
  className?: string;
}

export default function HeroActions({ className = "" }: HeroActionsProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-3.5 sm:gap-4 ${className}`}>
      {/* Primary CTA: Request a Demo */}
      <motion.a
        href="#request-demo"
        onClick={(e) => handleScrollTo(e, "request-demo")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-semibold text-white bg-primary hover:bg-[#0039DE] active:bg-[#0034C0] rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer transition-colors select-none"
        aria-label="Request a personalised Edubot demo"
      >
        Request a Demo
      </motion.a>

      {/* Secondary CTA: See How It Works */}
      <motion.a
        href="#user-portals"
        onClick={(e) => handleScrollTo(e, "user-portals")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="inline-flex items-center justify-center px-3.5 py-3 text-sm sm:text-base font-semibold text-navy hover:text-primary transition-colors rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none"
        aria-label="See how Edubot works across user portals"
      >
        <span
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-primary text-primary mr-2.5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
          aria-hidden="true"
        >
          <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
        </span>
        <span>See How It Works</span>
      </motion.a>
    </div>
  );
}

