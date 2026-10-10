"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandPhilosophy from "@/components/BrandPhilosophy";
import TreatmentMenu from "@/components/TreatmentMenu";
import SpecialistsSection from "@/components/SpecialistsSection";
import BeautyExperience from "@/components/BeautyExperience";
import CuratedPackages from "@/components/CuratedPackages";
import BeautyGallery from "@/components/BeautyGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationAndHours from "@/components/LocationAndHours";
import FinalConversionSection from "@/components/FinalConversionSection";
import Footer from "@/components/Footer";
import AIConciergeModal from "@/components/AIConciergeModal";
import FloatingConciergeLauncher from "@/components/FloatingConciergeLauncher";
import PoliciesModal, { PolicyTab } from "@/components/PoliciesModal";

export default function Home() {
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string | undefined>(undefined);

  const [policiesOpen, setPoliciesOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<PolicyTab>("booking");

  const handleOpenBooking = (serviceId?: string, specialistId?: string) => {
    setSelectedServiceId(serviceId);
    setSelectedSpecialistId(specialistId);
    setConciergeOpen(true);
  };

  const handleOpenPolicy = (tab: PolicyTab) => {
    setActivePolicyTab(tab);
    setPoliciesOpen(true);
  };

  const handleScrollToTreatments = () => {
    const el = document.getElementById("treatments");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToSpecialists = () => {
    const el = document.getElementById("specialists");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#261C18] flex flex-col justify-between selection:bg-[#E8DCD8] selection:text-[#261C18]">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenConcierge={() => handleOpenBooking()}
      />

      <main className="flex-1">
        {/* 2. Main Hero Campaign Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onExploreTreatments={handleScrollToTreatments}
          onOpenConcierge={() => handleOpenBooking()}
        />

        {/* 3. Brand Philosophy */}
        <BrandPhilosophy onExploreSpecialists={handleScrollToSpecialists} />

        {/* 4. Curated Treatments Directory */}
        <TreatmentMenu
          onSelectService={(serviceId) => handleOpenBooking(serviceId)}
          onOpenConcierge={() => handleOpenBooking()}
        />

        {/* 5. Master Artisans & Specialists */}
        <SpecialistsSection
          onSelectSpecialist={(specialistId) => handleOpenBooking(undefined, specialistId)}
        />

        {/* 6. The Beauty Experience Journey */}
        <BeautyExperience onOpenBooking={() => handleOpenBooking()} />

        {/* 7. Curated Ritual Packages & Interactive Gift Voucher */}
        <CuratedPackages
          onSelectPackage={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* 8. Editorial Beauty Gallery with Lightbox */}
        <BeautyGallery />

        {/* 9. Client Perspectives / Testimonials */}
        <TestimonialsSection />

        {/* 10. Location, Hours & FAQ */}
        <LocationAndHours />

        {/* 11. Final Closing Conversion Statement */}
        <FinalConversionSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenConcierge={() => handleOpenBooking()}
        />
      </main>

      {/* 12. Footer */}
      <Footer
        onOpenPolicy={handleOpenPolicy}
        onOpenBooking={() => handleOpenBooking()}
        onOpenConcierge={() => handleOpenBooking()}
      />

      {/* 13. Persistent Floating Concierge Launcher */}
      <FloatingConciergeLauncher
        isOpen={conciergeOpen}
        onOpen={() => handleOpenBooking()}
      />

      {/* 14. Full AI Beauty Concierge Assistant Modal */}
      <AIConciergeModal
        isOpen={conciergeOpen}
        onClose={() => {
          setConciergeOpen(false);
          setSelectedServiceId(undefined);
          setSelectedSpecialistId(undefined);
        }}
        initialServiceId={selectedServiceId}
        initialSpecialistId={selectedSpecialistId}
      />

      {/* 15. Atelier Legal Policies Modal */}
      <PoliciesModal
        isOpen={policiesOpen}
        initialTab={activePolicyTab}
        onClose={() => setPoliciesOpen(false)}
      />
    </div>
  );
}
