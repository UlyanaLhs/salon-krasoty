"use client";

import { useState } from "react";
import { SALON_INFO } from "@/data/salon-data";
import { MapPin, Clock, Phone, Mail, ArrowUpRight, ChevronDown, CheckCircle2 } from "lucide-react";

export default function LocationAndHours() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How early should I arrive prior to my scheduled treatment?",
      a: "We recommend arriving 10 to 15 minutes before your scheduled appointment. This allows you to unwind in our botanical relaxation lounge, enjoy a freshly steeped herbal tea, and complete your pre-ritual consultation in peace.",
    },
    {
      q: "What is your appointment cancellation and rescheduling policy?",
      a: "We ask for a minimum of 24 hours advance notification for individual rituals and 48 hours for curated packages. Because our specialists reserve uninterrupted time exclusively for you, late cancellations may incur a 50% reservation fee.",
    },
    {
      q: "Do you accommodate highly sensitive or reactive skin types?",
      a: "Yes, without exception. All our facial therapies begin with skin barrier diagnostics. We utilize hypoallergenic, fragrance-free, small-batch botanical formulations tailored to fragile, rosacea-prone, and reactive skin.",
    },
    {
      q: "Is parking or private valet service provided?",
      a: "Complimentary valet parking is available directly at 84 Rue du Faubourg Saint-Honoré upon prior arrangement. Public underground parking is also situated 150 meters away at Parking Madeleine.",
    },
  ];

  return (
    <section id="location" className="py-24 sm:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Address, Hours & Contact Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
                VISIT OUR ATELIER
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#261C18] font-normal leading-[1.1] mb-6">
                Sanctuary in the <br />
                <span className="italic text-[#70635B] font-light">Heart of Paris</span>
              </h2>
              <p className="font-sans text-sm text-[#70635B] leading-relaxed">
                Located on the historic Rue du Faubourg Saint-Honoré, our discreet sanctuary offers a quiet retreat amidst Parisian architecture.
              </p>
            </div>

            {/* Address & Direction Card */}
            <div className="p-7 rounded-2xl bg-white/80 border border-[#261C18]/8 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F1E9E6] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#B89D72]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#261C18] font-medium">
                    Atelier Éclat Paris
                  </h3>
                  <p className="text-xs sm:text-sm text-[#70635B] mt-0.5">
                    {SALON_INFO.address}
                  </p>
                  <p className="text-[11px] text-[#9B8D84] mt-1 italic">
                    ({SALON_INFO.addressNote})
                  </p>
                  <div className="mt-3">
                    <a
                      href="https://maps.google.com/?q=Rue+du+Faubourg+Saint-Honore+Paris"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#261C18] hover:text-[#B89D72] underline underline-offset-4 transition-colors"
                    >
                      <span>Open in Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Schedule */}
            <div className="p-7 rounded-2xl bg-white/80 border border-[#261C18]/8 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#261C18]/6 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#261C18]">
                  <Clock className="w-4 h-4 text-[#B89D72]" />
                  <span>Opening Schedule</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase bg-[#EAE2D7]/70 text-[#261C18] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Open Today
                </span>
              </div>

              <div className="space-y-2.5">
                {SALON_INFO.hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#70635B]">{h.days}</span>
                    <span className="font-medium text-[#261C18] font-mono">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#261C18]/8 hover:border-[#B89D72] transition-colors flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4 text-[#B89D72]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9B8D84] block">Direct Telephone</span>
                  <span className="text-xs font-medium text-[#261C18] group-hover:text-[#B89D72] transition-colors">
                    {SALON_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${SALON_INFO.email}`}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#261C18]/8 hover:border-[#B89D72] transition-colors flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-4 h-4 text-[#B89D72]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9B8D84] block">Email Concierge</span>
                  <span className="text-xs font-medium text-[#261C18] group-hover:text-[#B89D72] transition-colors truncate block max-w-[150px]">
                    {SALON_INFO.email}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
              FREQUENTLY ENQUIRED
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#261C18] font-normal leading-tight mb-8">
              Important Details <br />
              <span className="italic text-[#70635B] font-light">for Your Visit</span>
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#261C18]/8 bg-white/70 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-base sm:text-lg text-[#261C18] font-normal">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#B89D72] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#70635B] leading-relaxed border-t border-[#261C18]/4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
