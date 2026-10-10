"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SALON_INFO } from "@/data/salon-data";
import { ArrowUpRight, Menu, X, Sparkles, Clock, Phone, MapPin } from "lucide-react";

interface NavbarProps {
  onOpenBooking: (serviceId?: string, specialistId?: string) => void;
  onOpenConcierge: () => void;
}

export default function Navbar({ onOpenBooking, onOpenConcierge }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Treatments", href: "#treatments" },
    { label: "Specialists", href: "#specialists" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "Experience", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Packages", href: "#packages" },
    { label: "Location", href: "#location" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#261C18]/6 shadow-sm"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark */}
            <Link
              href="/"
              className="group flex flex-col items-start focus-visible:outline-none"
              aria-label="Atelier Éclat Home"
            >
              <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] text-[#261C18] font-normal transition-colors group-hover:text-[#B89D72]">
                ATELIER ÉCLAT
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#70635B] -mt-0.5">
                Paris • Beauté Sur-Mesure
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs uppercase tracking-[0.16em] text-[#261C18]/80 hover:text-[#261C18] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B89D72] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions: AI Concierge & Book Button */}
            <div className="hidden sm:flex items-center gap-3">
              {/* AI Concierge pill */}
              <button
                onClick={onOpenConcierge}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] uppercase tracking-[0.12em] font-medium text-[#261C18] bg-[#F1E9E6]/80 hover:bg-[#F1E9E6] border border-[#C4A29B]/30 transition-all"
                title="Launch AI Beauty Concierge"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B89D72] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B89D72]"></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B89D72]" />
                  AI Concierge
                </span>
              </button>

              {/* Book Appointment CTA */}
              <button
                onClick={() => onOpenBooking()}
                className="btn-luxury text-xs !py-2.5 !px-5"
                aria-label="Book an appointment"
              >
                <span>Book Appointment</span>
                <span className="btn-luxury-icon !w-5 !h-5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF8F5]" />
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenConcierge}
                className="p-2 rounded-full text-[#261C18] bg-[#F1E9E6] border border-[#C4A29B]/30"
                aria-label="Open AI Concierge"
              >
                <Sparkles className="w-4 h-4 text-[#B89D72]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full text-[#261C18] hover:bg-[#261C18]/5 transition-colors focus-visible:outline-none"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#FAF8F5] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden flex flex-col justify-between p-6 sm:p-10 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        aria-modal="true"
        role="dialog"
      >
        {/* Top bar inside mobile overlay */}
        <div className="flex items-center justify-between border-b border-[#261C18]/8 pb-6">
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.16em] text-[#261C18]">ATELIER ÉCLAT</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#70635B]">Paris</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-3 rounded-full bg-[#261C18]/5 text-[#261C18] hover:bg-[#261C18]/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links list with staggered appearance */}
        <nav className="flex flex-col gap-5 my-auto py-6" aria-label="Mobile Navigation">
          {navLinks.map((link, idx) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="flex items-center justify-between text-left group"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              <span className="font-serif text-3xl sm:text-4xl text-[#261C18] group-hover:text-[#B89D72] group-hover:translate-x-2 transition-all duration-300">
                {link.label}
              </span>
              <ArrowUpRight className="w-5 h-5 text-[#B89D72] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </nav>

        {/* Bottom CTA & salon info */}
        <div className="pt-6 border-t border-[#261C18]/8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-luxury w-full justify-center !py-3.5 text-center text-xs"
            >
              Book Ritual
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="btn-luxury-outline w-full justify-center !py-3.5 text-center text-xs gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89D72]" />
              AI Assistant
            </button>
          </div>

          <div className="text-[11px] text-[#70635B] flex flex-col gap-1.5 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B89D72] shrink-0" />
              <span>{SALON_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#B89D72] shrink-0" />
              <span>Open Daily: 09:00 — 20:00 (Demo Mode)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B89D72] shrink-0" />
              <a href={`tel:${SALON_INFO.phone}`} className="underline hover:text-[#261C18]">
                {SALON_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
