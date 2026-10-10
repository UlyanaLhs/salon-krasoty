"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/data/salon-data";
import { GalleryItem } from "@/types";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function BeautyGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const openLightbox = (item: GalleryItem, index: number) => {
    setActiveItem(item);
    setActiveIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveItem(null);
  }, []);

  const nextImage = useCallback(() => {
    const nextIdx = (activeIndex + 1) % GALLERY_ITEMS.length;
    setActiveIndex(nextIdx);
    setActiveItem(GALLERY_ITEMS[nextIdx]);
  }, [activeIndex]);

  const prevImage = useCallback(() => {
    const prevIdx = (activeIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActiveIndex(prevIdx);
    setActiveItem(GALLERY_ITEMS[prevIdx]);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, closeLightbox, nextImage, prevImage]);

  // Prevent background scroll when lightbox open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#F5F0EA]/60 border-t border-[#261C18]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B89D72] font-medium block mb-3">
              EDITORIAL GLIMPSE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261C18] font-normal leading-[1.1]">
              Atmosphere & <br />
              <span className="italic text-[#70635B] font-light">Fine Artistry</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#70635B] max-w-sm">
            A visual documentation of daily rituals, botanical textures, and understated craftsmanship captured inside our studio.
          </p>
        </div>

        {/* Asymmetrical Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => {
            // Span logic for editorial asymmetry
            const isWide = idx === 0 || idx === 6;
            const isTall = idx === 1 || idx === 4;

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(item, idx)}
                className={`double-bezel cursor-pointer group relative overflow-hidden ${
                  isWide ? "sm:col-span-2 aspect-[16/10]" : isTall ? "aspect-[3/4]" : "aspect-square"
                }`}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openLightbox(item, idx);
                  }
                }}
              >
                <div className="double-bezel-inner overflow-hidden relative w-full h-full bg-[#EAE2D7]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#261C18]/80 via-[#261C18]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8C7AA] mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-normal text-white">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-white/80 line-clamp-1 mt-1 font-light">
                      {item.caption}
                    </p>
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Interactive Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-[#181210]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 focus-visible:outline-none"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 focus-visible:outline-none"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 focus-visible:outline-none"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[70vh] rounded-xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            {/* Bottom Caption Bar */}
            <div className="mt-4 text-center max-w-xl text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8C7AA]">
                {activeItem.category} — {activeIndex + 1} of {GALLERY_ITEMS.length}
              </span>
              <h3 className="font-serif text-2xl font-normal mt-1">{activeItem.title}</h3>
              <p className="text-xs text-[#FAF8F5]/80 mt-1 font-light leading-relaxed">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
