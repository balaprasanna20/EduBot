"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import HeroActions from "./HeroActions";

export interface HeroContentProps {
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function HeroContent({ className = "" }: HeroContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full max-w-[520px] flex flex-col justify-center ${className}`}
    >
      {/* Eyebrow - 12px to headline */}
      <motion.div variants={itemVariants} className="mb-3">
        <span className="text-xs sm:text-[13px] font-bold text-primary uppercase tracking-wider inline-block">
          EDUCATION MANAGEMENT SYSTEM
        </span>
      </motion.div>

      {/* Headline: High-Contrast Editorial Serif - 16px to description */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[54px] 2xl:text-[60px] leading-[1.08] font-serif font-bold text-navy tracking-tight mb-4"
      >
        Your campus.
        <br />
        <span className="text-primary font-serif">Connected.</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg lg:text-[17px] xl:text-lg font-medium text-navy leading-snug mb-1"
      >
        Administration, teaching and learning.
        <br />
        Together in one platform.
      </motion.p>

      {/* Supporting Line - 24px-32px to buttons */}
      <motion.p
        variants={itemVariants}
        className="text-sm sm:text-base text-secondary pt-0.5 mb-6 sm:mb-8"
      >
        For schools, colleges and universities
      </motion.p>

      {/* Action Controls */}
      <motion.div variants={itemVariants}>
        <HeroActions />
      </motion.div>
    </motion.div>
  );
}

