"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { CalendarCheck, BookOpen } from "lucide-react";
import FeatureBadge from "./FeatureBadge";

export interface CampusVisualProps {
  className?: string;
  imageSrc?: string;
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function CampusVisual({
  className = "",
  imageSrc = "/images/hero-campus-artwork-pure.webp",
}: CampusVisualProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      className={`relative w-full aspect-[640/409] lg:aspect-auto min-h-[340px] sm:min-h-[420px] lg:min-h-full bg-white overflow-hidden select-none ${className}`}
    >
      {/* Real Campus Visual Artwork (Clean high-res plate with proper sky headroom) */}
      <Image
        src={imageSrc}
        alt="Edubot connected campus architecture featuring the iconic blue 'e' entrance gateway, students, and campus grounds"
        fill
        priority
        quality={95}
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover object-top pointer-events-none select-none"
      />

      {/* Floating Badge 1: "Attendance verified" with CalendarCheck icon and live green status dot */}
      <motion.div
        custom={0.25}
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-[18%] sm:top-[20%] right-[6%] sm:right-[10%] lg:right-[12%] z-10"
      >
        <FeatureBadge
          icon={<CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary stroke-[2.2]" />}
          label="Attendance verified"
          hasStatusDot={true}
          statusColor="#10B981"
          className="scale-90 sm:scale-95 md:scale-100 origin-right shadow-md"
        />
      </motion.div>

      {/* Floating Badge 2: "Learning, organised" with BookOpen icon */}
      <motion.div
        custom={0.35}
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-[42%] sm:top-[44%] right-[8%] sm:right-[12%] lg:right-[14%] z-10"
      >
        <FeatureBadge
          icon={<BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary stroke-[2.2]" />}
          label="Learning, organised"
          hasStatusDot={false}
          className="scale-90 sm:scale-95 md:scale-100 origin-right shadow-md"
        />
      </motion.div>
    </motion.div>
  );
}

