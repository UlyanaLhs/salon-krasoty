"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PHILOSOPHY_PILLARS } from "@/data/salon-data";

interface BrandPhilosophyProps {
  onExploreSpecialists: () => void;
}

export default function BrandPhilosophy({ onExploreSpecialists }: BrandPhilosophyProps) {
  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-[#F5F0EA]/70 relative border-t border-b border-[#261C18]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <div className="lg:col-span-8">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
              OUR GUIDING PHILOSOPHY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261C18] font-normal leading-[1.1]">
              Your Beauty. <br />
              <span className="italic text-[#70635B] font-light">Our Expertise.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="font-sans text-sm sm:text-base text-[#70635B] leading-relaxed mb-4">
              We reject the rush of generic salons. At Atelier Éclat, every treatment is an uninterrupted dialogue between artisanal technique, pure botanical formulations, and your unique features.
            </p>
            <button
              onClick={onExploreSpecialists}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#261C18] hover:text-[#B89D72] transition-colors group w-fit"
            >
              <span>Meet our master artisans</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 text-[#B89D72]" />
            </button>
          </div>
        </div>

        {/* Asymmetrical Content Grid: Pillars + Editorial Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Pair: Still Life + Texture in staggered double-bezels */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="double-bezel relative aspect-[4/5] w-full max-w-md mx-auto">
              <div className="double-bezel-inner overflow-hidden relative w-full h-full">
                <Image
                  src="/images/beauty-still-life.jpg"
                  alt="Curated botanical skincare bottles and natural travertine stone at Atelier Éclat"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Overlapping small texture accent */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 w-44 aspect-square double-bezel shadow-2xl">
              <div className="double-bezel-inner overflow-hidden relative w-full h-full">
                <Image
                  src="/images/skincare-texture.jpg"
                  alt="Pure cold-pressed rose nectar formulation texture"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="p-6 rounded-2xl bg-[#FAF8F5]/80 border border-[#261C18]/6 hover:border-[#B89D72]/40 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-serif text-2xl text-[#B89D72] italic font-light">
                      {pillar.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9B8D84]">
                      {pillar.subtitle}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#261C18] font-normal mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#70635B] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/60 border border-[#261C18]/6 flex items-center justify-between text-xs text-[#70635B]">
              <span className="font-medium text-[#261C18]">Conscious Formulations:</span>
              <span>100% Cruelty-free • Biodynamic Botanicals • Small-Batch Grasse Extracts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
