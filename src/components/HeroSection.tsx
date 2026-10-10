"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles, MapPin, Clock } from "lucide-react";
import { SALON_INFO } from "@/data/salon-data";

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
  onOpenConcierge: () => void;
}

export default function HeroSection({
  onOpenBooking,
  onExploreTreatments,
  onOpenConcierge,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[92dvh] pt-32 pb-16 md:pt-40 md:pb-28 flex items-center overflow-hidden">
      {/* Delicate background ambient warmth */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#F1E9E6]/60 via-[#F3ECE2]/30 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#261C18]/8 text-[#70635B] text-[11px] uppercase tracking-[0.2em] w-fit mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89D72]"></span>
              <span>YOUR PERSONAL BEAUTY RITUAL</span>
            </div>

            {/* Main Editorial Display Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#261C18] font-normal leading-[1.05] tracking-tight mb-8">
              Beauty, in <br />
              <span className="italic font-light text-[#B89D72]">Your Own Light.</span>
            </h1>

            {/* Supporting Subtext */}
            <p className="font-sans text-base sm:text-lg text-[#70635B] max-w-xl font-normal leading-relaxed mb-10">
              Thoughtful treatments. Exceptional specialists. A beauty experience designed around you in our serene Parisian studio sanctuary.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenBooking}
                className="btn-luxury justify-center group"
                aria-label="Book your appointment"
              >
                <span>BOOK YOUR APPOINTMENT</span>
                <span className="btn-luxury-icon">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF8F5]" />
                </span>
              </button>

              <button
                onClick={onExploreTreatments}
                className="btn-luxury-outline justify-center text-center"
                aria-label="Explore treatments directory"
              >
                <span>EXPLORE TREATMENTS</span>
              </button>

              {/* Sub-pill for AI Concierge */}
              <button
                onClick={onOpenConcierge}
                className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.14em] text-[#70635B] hover:text-[#261C18] py-2 px-2 transition-colors group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B89D72] group-hover:scale-110 transition-transform" />
                <span className="underline underline-offset-4 decoration-[#B89D72]/40 group-hover:decoration-[#B89D72]">
                  Ask AI Concierge
                </span>
              </button>
            </div>

            {/* Meta status strip: Location & Opening Hours */}
            <div className="pt-6 border-t border-[#261C18]/8 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-[#70635B]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B89D72] shrink-0" />
                <span>
                  <strong className="font-medium text-[#261C18]">84 Rue du Faubourg Saint-Honoré</strong>, 75008 Paris
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B89D72] shrink-0" />
                <span>
                  Today: <span className="text-[#261C18] font-medium">09:00 — 20:00</span>
                </span>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase bg-[#EAE2D7]/60 text-[#70635B]">
                Demo Showcase
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (Double-Bezel Framed Editorial Image) */}
          <div className="lg:col-span-5 relative">
            <div className="double-bezel relative max-w-lg mx-auto lg:max-w-none">
              <div className="double-bezel-inner overflow-hidden relative aspect-[4/5] sm:aspect-[3/4] bg-[#F3ECE2]">
                <Image
                  src="/images/atelier-hero.jpg"
                  alt="Atelier Éclat Campaign: Naturally radiant, serene beauty model under soft morning light"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
                />

                {/* Subtle vignette and corner editorial caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#261C18]/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#70635B]">Featured Campaign</p>
                    <p className="font-serif text-base text-[#261C18] font-medium">The Signature Radiance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#70635B]">Master Artisan</p>
                    <p className="font-sans text-xs font-semibold text-[#261C18]">Emma Laurent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative floating quote stamp */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-[#FAF8F5] border border-[#261C18]/10 rounded-2xl p-4 shadow-xl max-w-[210px] items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F1E9E6] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#B89D72]" />
              </div>
              <p className="font-serif italic text-xs text-[#261C18] leading-tight">
                “Beauty refined through gentle precision.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
