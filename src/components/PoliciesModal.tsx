"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck, Calendar, FileText } from "lucide-react";

export type PolicyTab = "booking" | "cancellation" | "privacy" | "sanitary";

interface PoliciesModalProps {
  initialTab?: PolicyTab;
  isOpen: boolean;
  onClose: () => void;
}

export default function PoliciesModal({ initialTab = "booking", isOpen, onClose }: PoliciesModalProps) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState<PolicyTab>(initialTab);

  if (prevInitialTab !== initialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(initialTab);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#181210]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Atelier Éclat Policies"
    >
      <div className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#261C18]/10 overflow-hidden">
        {/* Top Header */}
        <div className="p-6 sm:p-8 border-b border-[#261C18]/8 flex items-center justify-between bg-white/70">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89D72] block">
              ATELIER ÉCLAT PARIS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#261C18] font-normal">
              Atelier Policies & Care Standards
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#261C18]/5 hover:bg-[#261C18]/10 text-[#261C18] transition-colors"
            aria-label="Close policies modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#261C18]/8 bg-[#F3ECE2]/40 overflow-x-auto px-6 py-2 gap-2">
          {[
            { id: "booking", label: "Booking Policy", icon: Calendar },
            { id: "cancellation", label: "Cancellation Terms", icon: ClockIcon },
            { id: "privacy", label: "Privacy Notice", icon: FileText },
            { id: "sanitary", label: "Sanitary Protocol", icon: ShieldCheck },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PolicyTab)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#261C18] text-[#FAF8F5] shadow-xs"
                    : "text-[#70635B] hover:text-[#261C18] hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Policy Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#261C18] font-sans text-xs sm:text-sm leading-relaxed">
          {activeTab === "booking" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#261C18]">Reservation & Arrival Guidelines</h3>
              <p className="text-[#70635B]">
                Appointments at Atelier Éclat are dedicated exclusively to one guest per specialist to ensure tranquil privacy and thorough skin diagnosis.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#70635B]">
                <li>
                  <strong className="text-[#261C18]">Advance Booking:</strong> We suggest booking 5 to 10 days ahead for weekend rituals and signature evening sessions.
                </li>
                <li>
                  <strong className="text-[#261C18]">Arrival Time:</strong> Please arrive 10 minutes prior to your allocated time to savor our botanical welcome infusion.
                </li>
                <li>
                  <strong className="text-[#261C18]">Late Arrivals:</strong> If arriving more than 15 minutes late, your ritual may be shortened to protect the schedule of subsequent guests.
                </li>
                <li>
                  <strong className="text-[#261C18]">Demonstration Notice:</strong> All booking workflows on this demonstration website simulate appointments without charging financial cards.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "cancellation" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#261C18]">Rescheduling & Cancellation Terms</h3>
              <p className="text-[#70635B]">
                Because our practitioners commit substantial bespoke preparation for every ritual, we kindly ask for timely notification if your schedule requires adjustment.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#70635B]">
                <li>
                  <strong className="text-[#261C18]">Individual Rituals:</strong> Free cancellation up to 24 hours prior to scheduled start.
                </li>
                <li>
                  <strong className="text-[#261C18]">Curated Packages & Multi-Artisan Bookings:</strong> Free cancellation up to 48 hours in advance.
                </li>
                <li>
                  <strong className="text-[#261C18]">Same-Day Cancellations:</strong> Subject to a 50% reservation hold in standard commercial operation.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#261C18]">Client Privacy & Skin Health Data</h3>
              <p className="text-[#70635B]">
                Atelier Éclat respects guest discretion with the highest standard of confidentiality.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#70635B]">
                <li>
                  <strong className="text-[#261C18]">Data Collection:</strong> We collect solely the name, email, phone number, and skin condition notes necessary to arrange and tailor your ritual.
                </li>
                <li>
                  <strong className="text-[#261C18]">Zero Third-Party Sharing:</strong> Your private contact details and diagnostic notes are never sold, rented, or distributed to advertisers.
                </li>
                <li>
                  <strong className="text-[#261C18]">Local Storage:</strong> Demonstration appointment cards created on this site are stored locally in your browser.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "sanitary" && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#261C18]">Sanitary Protocol & Artisan Hygiene</h3>
              <p className="text-[#70635B]">
                Our salon sanctuary operates under strict hospital-grade sterilization protocols.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#70635B]">
                <li>
                  <strong className="text-[#261C18]">Medical-Grade Autoclaving:</strong> All stainless-steel manicure, pedicure, and brow implements undergo steam sterilization sealed in single-use surgical pouches.
                </li>
                <li>
                  <strong className="text-[#261C18]">HEPA Filtration:</strong> Treatment rooms feature continuous medical-grade air filtration and gentle negative ion diffusion.
                </li>
                <li>
                  <strong className="text-[#261C18]">Fresh Egyptian Linens:</strong> Every treatment couch is dressed in single-use laundered organic cotton linens.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-white/70 border-t border-[#261C18]/8 flex items-center justify-between text-xs text-[#70635B]">
          <span className="italic">Atelier Éclat • Demo Documentation</span>
          <button
            onClick={onClose}
            className="btn-luxury-outline text-xs !py-2 !px-5"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
