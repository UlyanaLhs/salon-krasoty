"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SPECIALISTS } from "@/data/salon-data";

interface SpecialistsSectionProps {
  onSelectSpecialist: (specialistId: string) => void;
}

export default function SpecialistsSection({ onSelectSpecialist }: SpecialistsSectionProps) {
  return (
    <section id="specialists" className="py-24 sm:py-32 bg-[#F3ECE2]/50 border-t border-[#261C18]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
            MASTER ARTISANS & PRACTITIONERS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261C18] font-normal leading-[1.1] mb-6">
            Craftsmanship in <br />
            <span className="italic text-[#70635B] font-light">Dedicated Hands.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#70635B] leading-relaxed">
            Our specialists do not follow generic assembly-line protocols. Each brings over a decade of disciplined technique, personalized diagnosis, and aesthetic intuition to your appointment.
          </p>
        </div>

        {/* 3 Specialists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPECIALISTS.map((specialist) => (
            <div
              key={specialist.id}
              className="double-bezel flex flex-col justify-between group"
            >
              <div className="double-bezel-inner p-6 sm:p-7 flex flex-col h-full justify-between">
                <div>
                  {/* Portrait with Double-Bezel nested frame */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-[#EAE2D7]">
                    <Image
                      src={specialist.image}
                      alt={`Portrait of ${specialist.name}, ${specialist.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#261C18]/70 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8C7AA] block">
                        {specialist.role}
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-white">
                        {specialist.name}
                      </h3>
                    </div>
                  </div>

                  {/* Title & Experience */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#B89D72]">
                      {specialist.title}
                    </span>
                    <span className="text-[11px] text-[#9B8D84] tracking-wide">
                      {specialist.experienceYears}+ Years Craft
                    </span>
                  </div>

                  {/* Biography */}
                  <p className="font-sans text-xs sm:text-sm text-[#70635B] leading-relaxed mb-6">
                    {specialist.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {specialist.specialties.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full text-[11px] bg-[#FAF8F5] text-[#261C18] border border-[#261C18]/8"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Button preloading specialist */}
                <button
                  onClick={() => onSelectSpecialist(specialist.id)}
                  className="btn-luxury w-full justify-center !py-3 text-xs tracking-wider"
                  aria-label={`Book appointment with ${specialist.name}`}
                >
                  <span>Book with {specialist.name.split(" ")[0]}</span>
                  <span className="btn-luxury-icon !w-5 !h-5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Demo profile footnote */}
        <div className="mt-12 text-center text-xs text-[#9B8D84]">
          Specialist biographies and profiles are created for demonstration purposes of the Atelier Éclat brand experience.
        </div>
      </div>
    </section>
  );
}
