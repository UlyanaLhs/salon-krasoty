"use client";

import { Sparkles } from "lucide-react";

interface FloatingConciergeLauncherProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function FloatingConciergeLauncher({ onOpen, isOpen }: FloatingConciergeLauncherProps) {
  if (isOpen) return null;

  return (
    <aside
      aria-label="Atelier Concierge Quick Access"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group"
    >
      {/* Subtle floating badge */}
      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-medium bg-white/90 backdrop-blur-md text-[#261C18] border border-[#261C18]/10 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none translate-y-1 group-hover:translate-y-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        AI Concierge Available
      </span>

      <button
        onClick={onOpen}
        className="flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full bg-[#1C1614] text-[#FAF8F5] border border-[#B89D72]/40 shadow-2xl hover:shadow-[0_8px_30px_rgba(184,157,114,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none"
        aria-label="Open Atelier AI Beauty Concierge"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B89D72] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B89D72]"></span>
        </span>

        <span className="font-sans text-xs uppercase tracking-[0.12em] font-medium text-white flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B89D72]" />
          AI Concierge
        </span>
      </button>
    </aside>
  );
}
