"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import EdubotLogo from "./EdubotLogo";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  forcedActive?: "overview" | "features" | "user-portals" | "benefits" | "none";
  forcedButtonStyle?: "solid" | "outline";
}

export default function Navbar({ forcedActive, forcedButtonStyle }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("overview");

  const isHomePage = pathname === "/";

  // Top page scroll progress bar using spring physics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // IntersectionObserver to observe visible section on single page
  useEffect(() => {
    if (!isHomePage || forcedActive) return;

    const sectionIds = ["overview", "features", "user-portals", "benefits", "request-demo"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topVisibleId = visible[0].target.id;
          setActiveSection(topVisibleId);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection("overview");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage, forcedActive]);

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

  // Determine current active item
  let currentActive = activeSection;
  if (forcedActive === "none") {
    currentActive = "";
  } else if (forcedActive) {
    currentActive = forcedActive;
  } else if (!isHomePage) {
    if (pathname === "/features") currentActive = "features";
    else if (pathname === "/user-portals") currentActive = "user-portals";
    else if (pathname === "/benefits") currentActive = "benefits";
    else if (pathname === "/request-demo") currentActive = "";
  } else if (activeSection === "request-demo") {
    currentActive = "";
  }

  // Button style: outline when overview is active, solid blue when in later sections
  const isSolidButton =
    forcedButtonStyle === "solid" ||
    (!forcedButtonStyle && (
      currentActive === "features" ||
      currentActive === "user-portals" ||
      currentActive === "benefits" ||
      activeSection === "features" ||
      activeSection === "user-portals" ||
      activeSection === "benefits" ||
      activeSection === "request-demo" ||
      pathname === "/features" ||
      pathname === "/user-portals" ||
      pathname === "/benefits" ||
      pathname === "/request-demo"
    ));

  const navItems = [
    { name: "Overview", href: isHomePage ? "#overview" : "/#overview", id: "overview" },
    { name: "Features", href: isHomePage ? "#features" : "/#features", id: "features" },
    { name: "User Portals", href: isHomePage ? "#user-portals" : "/#user-portals", id: "user-portals" },
    { name: "Benefits", href: isHomePage ? "#benefits" : "/#benefits", id: "benefits" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        element.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        setActiveSection(targetId);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Precision Scroll Progress Bar at the very top of the window */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-primary origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E0E6EF]/80 transition-all duration-200">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between">
          {/* Brand Logo - Smooth hover micro-scale */}
          <Link
            href={isHomePage ? "#overview" : "/"}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
                setActiveSection("overview");
              }
            }}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            aria-label="Edubot home — scroll to top"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <EdubotLogo />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links with Framer Motion LayoutId Underline */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = currentActive === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative py-1 text-[15px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded cursor-pointer ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-[#080D26] hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Request a Demo with Tactile Spring Transitions */}
          <div className="hidden md:flex items-center">
            <motion.a
              href={isHomePage ? "#request-demo" : "/#request-demo"}
              onClick={(e) => handleNavClick(e, "#request-demo")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer shadow-xs transition-colors duration-200 ${
                isSolidButton
                  ? "bg-primary hover:bg-[#0039DE] text-white"
                  : "text-primary border border-primary hover:bg-[#EFF5FF]"
              }`}
            >
              Request a Demo
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-navy hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Collapsible Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden border-t border-[#E0E6EF] bg-white px-5 py-5 shadow-lg overflow-hidden"
            >
              <div className="flex flex-col gap-3.5">
                {navItems.map((item) => {
                  const isActive = currentActive === item.id;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-base font-medium py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
                        isActive ? "text-primary font-semibold" : "text-[#080D26]"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}

                <div className="pt-3 border-t border-[#E0E6EF]">
                  <a
                    href={isHomePage ? "#request-demo" : "/#request-demo"}
                    onClick={(e) => handleNavClick(e, "#request-demo")}
                    className={`w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isSolidButton
                        ? "bg-primary text-white hover:bg-[#0039DE]"
                        : "text-primary border border-primary hover:bg-[#EFF5FF]"
                    }`}
                  >
                    Request a Demo
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
