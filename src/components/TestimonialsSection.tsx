"use client";

import { TESTIMONIALS } from "@/data/salon-data";
import { Sparkles, Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F3ECE2]/60 border-t border-b border-[#261C18]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
            CLIENT PERSPECTIVES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261C18] font-normal leading-[1.1] mb-4">
            Words from Our <br />
            <span className="italic text-[#70635B] font-light">Cherished Guests</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#70635B] leading-relaxed">
            Reflections on our peaceful studio atmosphere, attentive artisanal care, and enduring results.
          </p>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="double-bezel flex flex-col justify-between"
            >
              <div className="double-bezel-inner p-8 flex flex-col h-full justify-between">
                <div>
                  <Quote className="w-8 h-8 text-[#B89D72]/40 mb-6 stroke-1" />
                  <p className="font-serif text-lg sm:text-xl text-[#261C18] font-normal leading-relaxed mb-6 italic">
                    “{t.quote}”
                  </p>
                </div>

                <div className="pt-6 border-t border-[#261C18]/8">
                  <div className="flex items-center gap-1 text-[#B89D72] mb-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <h3 className="font-serif text-base text-[#261C18] font-medium">
                    {t.author}
                  </h3>
                  <p className="text-[11px] text-[#70635B] font-light">
                    {t.role}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-[#B89D72] mt-1">
                    Ritual: {t.treatment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclosure */}
        <p className="text-center text-xs text-[#9B8D84] mt-12">
          Demonstration client narratives created to illustrate the Atelier Éclat brand philosophy and visitor experience.
        </p>
      </div>
    </section>
  );
}
