"use client";

import { useState } from "react";
import { PACKAGES } from "@/data/salon-data";
import { ArrowUpRight, Check, Clock, Gift, Sparkles } from "lucide-react";

interface CuratedPackagesProps {
  onSelectPackage: (serviceId: string) => void;
}

export default function CuratedPackages({ onSelectPackage }: CuratedPackagesProps) {
  const [giftAmount, setGiftAmount] = useState<number>(200);
  const [recipientName, setRecipientName] = useState<string>("Madame Laurent");
  const [customMsg, setCustomMsg] = useState<string>("Wishing you moments of pure tranquility and timeless beauty.");
  const [isVoucherCopied, setIsVoucherCopied] = useState<boolean>(false);

  const voucherCode = `GIFT-ECLAT-${giftAmount}-2026`;

  const copyVoucher = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(voucherCode);
      setIsVoucherCopied(true);
      setTimeout(() => setIsVoucherCopied(false), 2500);
    }
  };

  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
            IMMERSIVE RITUAL COLLECTIONS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261C18] font-normal leading-[1.1] mb-6">
            Curated Packages & <br />
            <span className="italic text-[#70635B] font-light">Artisanal Giftings</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#70635B] leading-relaxed">
            Coordinated multi-disciplinary treatments paired for weddings, grand galas, or an uninterrupted afternoon of private restoration.
          </p>
        </div>

        {/* 3 Packages Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {PACKAGES.map((pkg, idx) => {
            const isFeatured = idx === 0;

            return (
              <div
                key={pkg.id}
                className={`double-bezel flex flex-col justify-between relative ${
                  isFeatured ? "ring-2 ring-[#B89D72]/40" : ""
                }`}
              >
                {pkg.popularTag && (
                  <div className="absolute -top-3 left-8 z-10 px-3.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#261C18] text-[#FAF8F5] shadow-md">
                    {pkg.popularTag}
                  </div>
                )}

                <div className="double-bezel-inner p-7 sm:p-8 flex flex-col h-full justify-between">
                  <div>
                    {/* Duration badge */}
                    <div className="flex items-center justify-between text-xs text-[#70635B] mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#B89D72]" />
                        <span>{pkg.durationMinutes} Minutes Experience</span>
                      </div>
                      <span className="text-[11px] text-[#9B8D84] line-through">
                        ${pkg.originalPrice}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#261C18] font-normal mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#B89D72] font-medium tracking-wide uppercase mb-4">
                      {pkg.tagline}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-[#70635B] leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    {/* Price banner */}
                    <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#261C18]/8">
                      <span className="font-serif text-4xl text-[#261C18] font-normal">
                        ${pkg.price}
                      </span>
                      <span className="text-xs text-[#9B8D84]">/ demonstration pricing</span>
                    </div>

                    {/* Included services */}
                    <div className="space-y-3 mb-8">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#261C18] font-medium">
                        Included Rituals:
                      </p>
                      {pkg.includedServices.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#261C18]/85">
                          <Check className="w-3.5 h-3.5 text-[#B89D72] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const serviceId =
                        idx === 0
                          ? "glow-ritual"
                          : idx === 1
                          ? "signature-occasion"
                          : "complete-experience";
                      onSelectPackage(serviceId);
                    }}
                    className={`w-full justify-center !py-3.5 text-xs ${
                      isFeatured ? "btn-luxury" : "btn-luxury-outline"
                    }`}
                  >
                    <span>Reserve Package</span>
                    <span className="btn-luxury-icon !w-5 !h-5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Luxury Gift Voucher Studio (Simulation) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#F5F0EA] to-[#EFE7DE] border border-[#261C18]/8 relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Voucher Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#261C18]/6 text-[10px] uppercase tracking-[0.2em] text-[#70635B]">
                <Gift className="w-3.5 h-3.5 text-[#B89D72]" />
                <span>DEMONSTRATION GIFTING STUDIO</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#261C18] font-normal leading-tight">
                Gift an Unhurried <br />
                <span className="italic text-[#70635B]">Atelier Experience.</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#70635B] leading-relaxed">
                Present someone dear with a private beauty sanctuary experience. Customize your demonstration voucher below.
              </p>

              {/* Amount selector pills */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#261C18] font-medium block">
                  Select Voucher Value:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {[100, 180, 220, 320, 500].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setGiftAmount(amt)}
                      className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all ${
                        giftAmount === amt
                          ? "bg-[#261C18] text-[#FAF8F5] shadow-sm"
                          : "bg-white/80 text-[#70635B] hover:bg-white border border-[#261C18]/8"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient name input */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#261C18] font-medium block">
                  Recipient Name:
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full max-w-md px-4 py-2.5 rounded-xl bg-white/90 border border-[#261C18]/10 text-xs text-[#261C18] focus:outline-none focus:border-[#B89D72]"
                  placeholder="e.g. Hélène de Montmirail"
                />
              </div>

              {/* Personal note input */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#261C18] font-medium block">
                  Personalized Dedication:
                </label>
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="w-full max-w-md px-4 py-2.5 rounded-xl bg-white/90 border border-[#261C18]/10 text-xs text-[#261C18] focus:outline-none focus:border-[#B89D72]"
                  placeholder="Personal note..."
                />
              </div>
            </div>

            {/* Right: Realistic French Haute Card Preview */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#1C1614] text-[#FAF8F5] shadow-2xl border border-white/10 relative overflow-hidden">
                {/* Gold metallic corner border */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#B89D72]/30 via-transparent to-transparent pointer-events-none" />

                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="font-serif text-xl tracking-[0.2em] text-[#D8C7AA] block">
                      ATELIER ÉCLAT
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">
                      Paris • Faubourg Saint-Honoré
                    </span>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#B89D72]" />
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#D8C7AA]/80 block">
                      Presented In Honor Of
                    </span>
                    <p className="font-serif text-2xl text-white font-normal mt-0.5">
                      {recipientName || "Valued Guest"}
                    </p>
                  </div>

                  <p className="font-serif italic text-xs text-white/70 border-l border-[#B89D72]/40 pl-3 py-1">
                    “{customMsg || "Wishing you peaceful moments of pure beauty."}”
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 block">
                      Voucher Credit
                    </span>
                    <span className="font-serif text-3xl text-[#D8C7AA] font-normal">
                      ${giftAmount}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-wider text-white/40 block">
                      Demonstration Reference
                    </span>
                    <span className="font-mono text-[11px] text-white/80">
                      {voucherCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Simulation Note & Copy Action */}
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 text-xs text-[#70635B]">
                <button
                  onClick={copyVoucher}
                  className="px-4 py-1.5 rounded-full bg-white text-[#261C18] border border-[#261C18]/10 text-xs font-medium hover:bg-[#FAF8F5] transition-colors"
                >
                  {isVoucherCopied ? "✓ Voucher Code Copied" : "Copy Demo Code"}
                </button>
                <span className="text-[11px] text-[#9B8D84]">
                  (Simulated gift card feature for portfolio demonstration)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
