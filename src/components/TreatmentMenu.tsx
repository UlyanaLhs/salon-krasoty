"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Clock, ArrowUpRight, Search, Sparkles, Check } from "lucide-react";
import { SERVICES, SPECIALISTS } from "@/data/salon-data";
import { ServiceCategory } from "@/types";

interface TreatmentMenuProps {
  onSelectService: (serviceId: string) => void;
  onOpenConcierge: () => void;
}

export default function TreatmentMenu({ onSelectService, onOpenConcierge }: TreatmentMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: "all", label: "All Treatments" },
    { id: "facials", label: "Facial Treatments" },
    { id: "makeup", label: "Makeup" },
    { id: "hair", label: "Hair Styling" },
    { id: "nails", label: "Nails & Hands" },
    { id: "brows-lashes", label: "Brows & Lashes" },
    { id: "rituals", label: "Curated Rituals" },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="treatments" className="py-24 sm:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
              CURATED SERVICES DIRECTORY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261C18] font-normal leading-[1.1]">
              The Treatment <br />
              <span className="italic text-[#70635B] font-light">Collection</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quick Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#70635B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search rituals or benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-white/80 border border-[#261C18]/10 text-[#261C18] placeholder-[#9B8D84] focus:outline-none focus:border-[#B89D72] transition-colors"
                aria-label="Search treatments"
              />
            </div>

            {/* AI Recommendation Trigger */}
            <button
              onClick={onOpenConcierge}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#F1E9E6] border border-[#C4A29B]/40 text-[#261C18] text-xs font-medium uppercase tracking-[0.1em] hover:bg-[#E8DCD8] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89D72]" />
              <span>Match My Skin</span>
            </button>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs tracking-[0.08em] whitespace-nowrap transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-[#261C18] text-[#FAF8F5] shadow-md"
                    : "bg-white/60 text-[#70635B] hover:text-[#261C18] hover:bg-white border border-[#261C18]/6"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Treatments Editorial List */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-2xl border border-dashed border-[#261C18]/10 p-8">
            <p className="font-serif text-2xl text-[#261C18] mb-2">No matching rituals found</p>
            <p className="text-sm text-[#70635B] mb-6">
              Try adjusting your search terms or ask our AI Concierge to curate a bespoke treatment.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="btn-luxury-outline text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredServices.map((service) => {
              const assignedSpecialists = SPECIALISTS.filter((sp) =>
                service.specialistIds.includes(sp.id)
              );

              return (
                <article
                  key={service.id}
                  className="double-bezel group flex flex-col justify-between"
                >
                  <div className="double-bezel-inner p-6 sm:p-7 flex flex-col h-full justify-between">
                    <div>
                      {/* Top Meta: Category + Duration */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89D72] font-semibold">
                          {service.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-[#70635B]">
                          <Clock className="w-3.5 h-3.5 text-[#B89D72]" />
                          <span>{service.durationMinutes} minutes</span>
                        </div>
                      </div>

                      {/* Title & Price */}
                      <div className="flex items-baseline justify-between gap-4 mb-3">
                        <h3 className="font-serif text-2xl sm:text-[1.65rem] text-[#261C18] font-normal group-hover:text-[#B89D72] transition-colors">
                          {service.name}
                        </h3>
                        <span className="font-serif text-xl sm:text-2xl text-[#261C18] font-medium shrink-0">
                          ${service.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm text-[#70635B] leading-relaxed mb-5">
                        {service.description}
                      </p>

                      {/* Benefits Bullets */}
                      <div className="space-y-1.5 mb-6">
                        {service.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#261C18]/80">
                            <span className="w-1 h-1 rounded-full bg-[#B89D72] shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Specialist attribution + Direct Reserve CTA */}
                    <div className="pt-4 border-t border-[#261C18]/6 flex flex-wrap items-center justify-between gap-3 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#9B8D84]">
                          Practitioner:
                        </span>
                        <div className="flex -space-x-1.5">
                          {assignedSpecialists.map((sp) => (
                            <div
                              key={sp.id}
                              className="relative w-6 h-6 rounded-full overflow-hidden border border-white"
                              title={sp.name}
                            >
                              <Image
                                src={sp.image}
                                alt={sp.name}
                                fill
                                sizes="24px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-[#261C18] font-medium">
                          {assignedSpecialists.map((sp) => sp.name.split(" ")[0]).join(" & ")}
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectService(service.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#261C18] text-[#261C18] hover:text-[#FAF8F5] border border-[#261C18]/12 text-xs font-medium tracking-[0.06em] transition-all group/btn"
                        aria-label={`Book ${service.name}`}
                      >
                        <span>Reserve Ritual</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B89D72] group-hover/btn:text-[#FAF8F5] transition-colors" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Notice on Fictional Prices */}
        <p className="text-center text-xs text-[#9B8D84] mt-12">
          All service durations and pricing are demonstration content for the Atelier Éclat portfolio experience.
        </p>
      </div>
    </section>
  );
}
