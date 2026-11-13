import React from "react";
import Navbar from "@/components/Navbar";
import FeaturesSection from "@/components/FeaturesSection";

export const metadata = {
  title: "Features — Edubot Education Management System",
  description:
    "Campus essentials. All in one place. Simple tools for administration, teaching and learning.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar with Features active and solid blue Request a Demo button */}
      <Navbar forcedActive="features" forcedButtonStyle="solid" />

      {/* Main Features Content */}
      <main className="flex-1">
        <FeaturesSection />
      </main>
    </div>
  );
}

