import React from "react";

export interface FeatureBadgeProps {
  icon: React.ReactNode;
  label: string;
  hasStatusDot?: boolean;
  statusColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function FeatureBadge({
  icon,
  label,
  hasStatusDot = false,
  statusColor = "#10B981",
  className = "",
  style,
}: FeatureBadgeProps) {
  return (
    <div
      role="status"
      aria-label={hasStatusDot ? `${label} (active status)` : label}
      style={style}
      className={`inline-flex items-center gap-2.5 sm:gap-3 bg-white/95 backdrop-blur-sm text-navy px-3.5 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-[0_6px_24px_rgba(8,13,38,0.08)] select-none pointer-events-none transition-transform duration-200 ${className}`}
    >
      {/* Icon with primary/navy brand styling */}
      <span className="flex-shrink-0 text-primary flex items-center justify-center" aria-hidden="true">
        {icon}
      </span>

      {/* Label */}
      <span className="text-xs sm:text-[13px] md:text-sm font-semibold text-navy tracking-tight whitespace-nowrap">
        {label}
      </span>

      {/* Optional Status Indicator Dot */}
      {hasStatusDot && (
        <span
          className="flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full relative"
          style={{ backgroundColor: statusColor }}
          aria-hidden="true"
        >
          <span
            className="absolute inset-0 rounded-full animate-ping motion-reduce:animate-none opacity-40"
            style={{ backgroundColor: statusColor }}
          />
        </span>
      )}
    </div>
  );
}

