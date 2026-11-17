"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import EdubotLogo from "./EdubotLogo";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  forcedActive?: "overview" | "features" | "user-portals" | "benefits" | "none";
  forcedButtonStyle?: "outlined" | "solid" | string;
}

export default function Navbar({ forcedActive, forcedButtonStyle }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Compute active navigation item based on route pathname or forced override
  let currentActive = "overview";
  if (pathname === "/features") {
    currentActive = "features";
  } else if (pathname === "/user-portals") {
    currentActive = "user-portals";
  } else if (pathname === "/benefits") {
    currentActive = "benefits";
  } else if (pathname === "/request-demo") {
    currentActive = "none";
  } else if (pathname === "/") {
    currentActive = "overview";
  }

  if (forcedActive === "none") {
    currentActive = "";
  } else if (forcedActive) {
    currentActive = forcedActive;
  }

  // Handle escape key to close mobile menu
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    },
    [mobileMenuOpen]
  );

  useEffect(() => {
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, handleKeyDown]);

  const navItems = [
    { name: "Overview", href: "/", id: "overview" },
    { name: "Features", href: "/features", id: "features" },
    { name: "User Portals", href: "/user-portals", id: "user-portals" },
    { name: "Benefits", href: "/benefits", id: "benefits" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E0E6EF]/70 transition-colors">
      {/* Full-bleed header container with responsive horizontal padding */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 h-[68px] lg:h-[72px] flex items-center justify-between">
        {/* Brand Logo - Official User Logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg py-1"
          aria-label="Edubot home"
        >
          <EdubotLogo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = currentActive === item.id;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[15px] lg:text-[16px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded py-1 cursor-pointer ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-[#080D28] hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Button: Request a Demo (approx 175 × 44px, 8px radius; solid on subpages, cobalt outlined on home reference) */}
        <div className="hidden md:flex items-center">
          <Link
            href="/request-demo"
            className={`inline-flex items-center justify-center min-w-[150px] lg:w-[175px] h-[40px] lg:h-[44px] rounded-[8px] font-semibold text-xs lg:text-[15px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none ${
              forcedButtonStyle === "solid" || pathname === "/request-demo"
                ? "bg-[#0747FF] hover:bg-[#0039DE] text-white shadow-sm"
                : "border border-[#0747FF] text-[#0747FF] hover:bg-[#0747FF] hover:text-white"
            }`}
          >
            Request a Demo
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-navy hover:text-primary rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden w-full bg-white border-b border-[#E0E6EF] shadow-lg overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                    currentActive === item.id
                      ? "text-primary bg-[#EFF5FF] font-semibold"
                      : "text-navy hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/request-demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full inline-flex items-center justify-center py-3 rounded-[9px] font-semibold text-base transition-colors ${
                    forcedButtonStyle === "solid" || pathname === "/request-demo"
                      ? "bg-[#0747FF] hover:bg-[#0039DE] text-white"
                      : "border border-[#0747FF] text-[#0747FF] hover:bg-[#0747FF] hover:text-white"
                  }`}
                >
                  Request a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
