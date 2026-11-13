import React from "react";
import Navbar from "@/components/Navbar";
import BenefitsSection from "@/components/BenefitsSection";

export const metadata = {
  title: "Benefits — Edubot Education Management System",
  description:
    "One institution. Working better, together. Bring campus operations, teaching and learning into one connected system.",
};

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Shared navbar with Benefits active and solid blue Request a Demo button */}
      <Navbar forcedActive="benefits" forcedButtonStyle="solid" />

      {/* Main Benefits Content */}
      <main className="flex-1">
        <BenefitsSection />
      </main>
    </div>
  );
}

