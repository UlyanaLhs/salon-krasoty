"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface FinalConversionSectionProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export default function FinalConversionSection({
  onOpenBooking,
  onOpenConcierge,
}: FinalConversionSectionProps) {
  return (
    <section className="relative py-28 sm:py-36 bg-[#1C1614] text-[#FAF8F5] overflow-hidden">
      {/* Background subtle atmospheric image with heavy dark gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/atelier-hero.jpg"
          alt="Atelier Éclat background ambiance"
          fill
          className="object-cover object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1614] via-[#1C1614]/80 to-[#1C1614]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#D8C7AA] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#B89D72]" />
          <span>BESPOKE APPOINTMENTS</span>
        </div>

        {/* Display Headline */}
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-normal leading-[1.05] tracking-tight mb-8">
          Make Time <br />
          <span className="italic font-light text-[#D8C7AA]">for Yourself.</span>
        </h2>

        {/* Subtext */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Discover a more considered approach to beauty. Whether seeking a restorative facial, couture makeup, or architectural nails, your appointment is an uninterrupted sanctuary.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="btn-luxury-champagne !px-8 !py-4 text-xs tracking-[0.16em]"
            aria-label="Book your appointment"
          >
            <span>BOOK YOUR APPOINTMENT</span>
            <span className="btn-luxury-icon !w-5 !h-5 !bg-black/15">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>

          <button
            onClick={onOpenConcierge}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs tracking-[0.14em] uppercase transition-all duration-300"
            aria-label="Ask AI Beauty Concierge"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89D72]" />
            <span>ASK OUR AI BEAUTY CONCIERGE</span>
          </button>
        </div>

        {/* Quiet assurance footer note */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-white/50">
          <span>Private Dressing Rooms</span>
          <span>•</span>
          <span>Botanical Tea Ritual Included</span>
          <span>•</span>
          <span>Dedicated Master Artisan</span>
        </div>
      </div>
    </section>
  );
}
