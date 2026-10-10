"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface BeautyExperienceProps {
  onOpenBooking: () => void;
}

export default function BeautyExperience({ onOpenBooking }: BeautyExperienceProps) {
  const steps = [
    {
      num: "01",
      title: "The Botanical Welcome & Dialogue",
      detail:
        "You are welcomed into our quiet lounge with an organic herbal infusion. Your specialist sits down with you for a 10-minute diagnostic conversation to understand your skin's immediate condition, seasonal shifts, and personal aesthetic aspirations.",
    },
    {
      num: "02",
      title: "Bespoke Formulation Selection",
      detail:
        "No two skin treatments are identical. We blend small-batch botanical extracts, gentle AHA fruit complexes, and clinical hyaluronic actives formulated to harmonize specifically with your skin barrier.",
    },
    {
      num: "03",
      title: "Artisanal Technique & Acupressure",
      detail:
        "Every stroke, brush, or sculpt is performed in peaceful silence with calibrated pressure. From facial sculpting to micro-precise nail architecture, our practitioners respect the physiology of your body.",
    },
    {
      num: "04",
      title: "Finishing Touches & Enduring Guidance",
      detail:
        "Your ritual concludes with a soothing mineral mist, custom daytime SPF finish, and a handwritten morning/evening regimen card so your radiant results continue long after leaving our doors.",
    },
  ];

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
          <div className="lg:col-span-8">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
              THE SALON RITUAL JOURNEY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261C18] font-normal leading-[1.1]">
              A Sanctuary Designed <br />
              <span className="italic text-[#70635B] font-light">Around Your Pace.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-sm text-[#70635B] leading-relaxed mb-4">
              Step away from the urban momentum of Paris. Discover how a considered appointment unfolds from arrival to aftercare.
            </p>
          </div>
        </div>

        {/* 2-Column Storytelling: Visual Stack Left, 4 Interactive Steps Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Pair */}
          <div className="lg:col-span-6 space-y-6">
            <div className="double-bezel relative aspect-[16/10] overflow-hidden">
              <div className="double-bezel-inner overflow-hidden relative w-full h-full">
                <Image
                  src="/images/salon-interior.jpg"
                  alt="Interior architecture of Atelier Éclat Parisian salon sanctuary"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="double-bezel relative aspect-[4/3]">
                <div className="double-bezel-inner overflow-hidden relative w-full h-full">
                  <Image
                    src="/images/facial-treatment.jpg"
                    alt="Gentle facial treatment hands at Atelier Éclat"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="double-bezel relative aspect-[4/3]">
                <div className="double-bezel-inner overflow-hidden relative w-full h-full">
                  <Image
                    src="/images/relaxation-lounge.jpg"
                    alt="Botanical tea relaxation lounge at Atelier Éclat"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="lg:col-span-6 space-y-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="group border-b border-[#261C18]/8 pb-8 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <span className="font-serif text-2xl sm:text-3xl text-[#B89D72] italic font-light shrink-0 pt-0.5">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#261C18] font-normal mb-2 group-hover:text-[#B89D72] transition-colors">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#70635B] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="btn-luxury"
                aria-label="Begin your personal beauty ritual"
              >
                <span>Reserve Your Time</span>
                <span className="btn-luxury-icon">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
