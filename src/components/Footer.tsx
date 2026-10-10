"use client";

import { SALON_INFO } from "@/data/salon-data";
import { PolicyTab } from "./PoliciesModal";
import { ArrowUpRight, MapPin, Phone, Mail, Sparkles } from "lucide-react";

interface FooterProps {
  onOpenPolicy: (tab: PolicyTab) => void;
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export default function Footer({ onOpenPolicy, onOpenBooking, onOpenConcierge }: FooterProps) {
  return (
    <footer className="bg-[#181210] text-[#FAF8F5] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#D8C7AA] block">
                ATELIER ÉCLAT
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 block mt-1">
                Paris • Beauty Sanctuary
              </span>
            </div>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-sm">
              An intimate Parisian atelier where botanical science and bespoke craftsmanship converge. Dedicated to tranquil rituals and natural radiance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="btn-luxury-champagne !py-2.5 !px-5 text-xs"
              >
                <span>Reserve Appointment</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenConcierge}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/20 text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-[#B89D72]" />
                <span>AI Concierge</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#D8C7AA] font-medium">
              Explore Atelier
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70 font-light">
              <li>
                <a href="#treatments" className="hover:text-white transition-colors">
                  Treatments Menu
                </a>
              </li>
              <li>
                <a href="#specialists" className="hover:text-white transition-colors">
                  Master Specialists
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  The Salon Journey
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Editorial Gallery
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Curated Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Treatment Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#D8C7AA] font-medium">
              Specialized Care
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70 font-light">
              <li>Facial Rejuvenation & Acupressure</li>
              <li>Haute Evening & Editorial Makeup</li>
              <li>Parisian Blowout & Event Styling</li>
              <li>Restorative Japanese Gel Nails</li>
              <li>Architectural Brow Lamination</li>
              <li>Keratin Lash Lift & Infusion</li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#D8C7AA] font-medium">
              Sanctuary Details
            </h3>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89D72] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89D72] shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:text-white underline">
                  {SALON_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89D72] shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-white underline">
                  {SALON_INFO.email}
                </a>
              </div>
              <p className="text-[11px] text-white/50 pt-1">
                Mon–Fri: 09:00–20:00 • Sat: 09:30–19:30 • Sun: 10:00–18:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Policies, Copyright & Demo Badge */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => onOpenPolicy("booking")}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Booking Policy
            </button>
            <button
              onClick={() => onOpenPolicy("cancellation")}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Cancellation Terms
            </button>
            <button
              onClick={() => onOpenPolicy("privacy")}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy("sanitary")}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Sanitary Guarantee
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase bg-white/10 text-[#D8C7AA] border border-white/10">
              Demo Showcase Website
            </span>
            <span>© 2026 Atelier Éclat. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
