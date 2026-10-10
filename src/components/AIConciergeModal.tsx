"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  ChevronRight,
  Info,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { SERVICES, SPECIALISTS } from "@/data/salon-data";
import { getAvailableSlots, getUpcomingDates, saveBooking, formatEditorialDate } from "@/lib/booking-service";
import { BookingFormData, BookingRecord, ChatMessage } from "@/types";

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialSpecialistId?: string;
}

let messageSeq = 0;
function createMessage(
  sender: "assistant" | "user",
  text: string,
  quickReplies?: { label: string; action: string; payload?: unknown }[]
): ChatMessage {
  messageSeq += 1;
  return {
    id: `msg-${messageSeq}`,
    sender,
    text,
    timestamp: "Just now",
    quickReplies,
  };
}

export default function AIConciergeModal({
  isOpen,
  onClose,
  initialServiceId,
  initialSpecialistId,
}: AIConciergeModalProps) {
  // Booking Form State initialized directly
  const [bookingState, setBookingState] = useState<Partial<BookingFormData>>(() => ({
    serviceId: initialServiceId || "",
    specialistId: initialSpecialistId || "",
    date: "",
    time: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  }));

  // Current Booking Flow Step initialized directly
  const [currentStep, setCurrentStep] = useState<
    "chat" | "select_service" | "select_specialist" | "select_date" | "select_time" | "enter_contact" | "review" | "confirmed"
  >(() => {
    if (initialServiceId) return "select_specialist";
    if (initialSpecialistId) return "select_service";
    return "chat";
  });

  // Chat message history initialized directly
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (initialServiceId) {
      const s = SERVICES.find((item) => item.id === initialServiceId);
      if (s) {
        return [
          createMessage(
            "assistant",
            `You have selected the "${s.name}" ($${s.price}, ${s.durationMinutes} min).\n\nPlease select your preferred specialist for this ritual, or choose "Any Available Specialist".`
          ),
        ];
      }
    }
    if (initialSpecialistId) {
      const sp = SPECIALISTS.find((item) => item.id === initialSpecialistId);
      if (sp) {
        return [
          createMessage(
            "assistant",
            `You have chosen to book with ${sp.name} (${sp.title}).\n\nWhich of ${sp.name.split(" ")[0]}'s specialized rituals would you like to experience?`
          ),
        ];
      }
    }
    return [
      createMessage(
        "assistant",
        `Bonjour. I am your Atelier AI Concierge — a virtual beauty assistant for Atelier Éclat Paris.\n\nI can curate bespoke treatments for your skin, recommend an artisan specialist, or guide you through scheduling your appointment.`,
        [
          { label: "Book a Treatment", action: "start_booking" },
          { label: "Skincare Recommendations", action: "recommend_skin" },
          { label: "Meet the Artisans", action: "view_specialists" },
          { label: "Salon Hours & Location", action: "hours_location" },
        ]
      ),
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [upcomingDates] = useState<{ dateStr: string; label: string; weekday: string }[]>(() =>
    getUpcomingDates(14)
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, currentStep]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Send message to AI endpoint or process quick action
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    setInputValue("");
    setErrorMessage(null);

    // Append user message
    const userMsg = createMessage("user", query);
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages,
          currentStep,
          bookingState,
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.reply) {
        const assistantMsg = createMessage("assistant", data.reply, data.quickReplies);
        setMessages((prev) => [...prev, assistantMsg]);

        // If user explicitly asked to start booking
        if (
          query.toLowerCase().includes("book") ||
          query.toLowerCase().includes("appointment") ||
          query.toLowerCase().includes("schedule") ||
          query.toLowerCase().includes("reserve")
        ) {
          if (!bookingState.serviceId) {
            setCurrentStep("select_service");
          } else if (!bookingState.specialistId) {
            setCurrentStep("select_specialist");
          } else if (!bookingState.date) {
            setCurrentStep("select_date");
          } else if (!bookingState.time) {
            setCurrentStep("select_time");
          } else {
            setCurrentStep("review");
          }
        }
      }
    } catch (err) {
      console.error("AI Concierge error:", err);
      setIsTyping(false);
      const fallbackMsg = createMessage(
        "assistant",
        "I am at your service. Please choose an option below to proceed directly with your reservation.",
        [
          { label: "Choose a Treatment", action: "start_booking" },
          { label: "View Available Times", action: "view_times" },
        ]
      );
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  // Handle Quick Reply Action Clicks
  const handleQuickReply = (action: string, payload?: unknown) => {
    switch (action) {
      case "start_booking":
      case "explore_menu":
        setCurrentStep("select_service");
        setMessages((prev) => [
          ...prev,
          createMessage("assistant", "Please select the ritual you wish to reserve:"),
        ]);
        break;

      case "recommend_skin":
        handleSendMessage("What facial treatments do you recommend for dull or dehydrated skin?");
        break;

      case "view_specialists":
        handleSendMessage("Tell me about your specialists and their expertise.");
        break;

      case "hours_location":
        handleSendMessage("Where are you located and what are your opening hours?");
        break;

      case "select_service":
        if (typeof payload === "string") {
          handleSelectService(payload);
        }
        break;

      case "select_specialist":
        if (typeof payload === "string") {
          handleSelectSpecialist(payload);
        }
        break;

      default:
        handleSendMessage(action);
        break;
    }
  };

  // Flow Step 1: Select Service
  const handleSelectService = (serviceId: string) => {
    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) return;

    setBookingState((prev) => ({ ...prev, serviceId }));
    setCurrentStep("select_specialist");

    setMessages((prev) => [
      ...prev,
      createMessage("user", `Selected Ritual: ${service.name} ($${service.price}, ${service.durationMinutes}m)`),
      createMessage("assistant", `Magnifique choice. Which specialist would you prefer for your ${service.name}?`),
    ]);
  };

  // Flow Step 2: Select Specialist
  const handleSelectSpecialist = (specialistId: string) => {
    const specialist = SPECIALISTS.find((sp) => sp.id === specialistId);
    const specialistName = specialist ? specialist.name : "Any Available Specialist";

    setBookingState((prev) => ({ ...prev, specialistId }));
    setCurrentStep("select_date");

    setMessages((prev) => [
      ...prev,
      createMessage("user", `Practitioner Preference: ${specialistName}`),
      createMessage("assistant", `Noted with care. Please choose your preferred date for the appointment:`),
    ]);
  };

  // Flow Step 3: Select Date
  const handleSelectDate = (dateStr: string) => {
    setBookingState((prev) => ({ ...prev, date: dateStr, time: "" }));
    setCurrentStep("select_time");

    setMessages((prev) => [
      ...prev,
      createMessage("user", `Date: ${formatEditorialDate(dateStr)}`),
      createMessage(
        "assistant",
        `We have retrieved the current available salon slots for ${formatEditorialDate(dateStr)}. Please select your preferred time:`
      ),
    ]);
  };

  // Flow Step 4: Select Time
  const handleSelectTime = (timeStr: string) => {
    setBookingState((prev) => ({ ...prev, time: timeStr }));
    setCurrentStep("enter_contact");

    setMessages((prev) => [
      ...prev,
      createMessage("user", `Time: ${timeStr}`),
      createMessage(
        "assistant",
        `Perfect. To finalize your demonstration reservation card, please provide your guest contact details below.`
      ),
    ]);
  };

  // Flow Step 5: Submit Final Booking to API
  const handleConfirmBooking = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const payload: BookingFormData = {
        serviceId: bookingState.serviceId || "",
        specialistId: bookingState.specialistId || "any",
        date: bookingState.date || "",
        time: bookingState.time || "",
        clientName: bookingState.clientName || "",
        clientEmail: bookingState.clientEmail || "",
        clientPhone: bookingState.clientPhone || "",
        notes: bookingState.notes || "",
      };

      // Call server API route
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(result.error || "Unable to confirm booking. Please verify all details.");
        setIsSubmitting(false);
        return;
      }

      // Persist in client storage as well
      const savedRecord = saveBooking(payload);
      setConfirmedBooking(savedRecord);
      setCurrentStep("confirmed");
      setIsSubmitting(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#B89D72", "#E8DCD8", "#FAF8F5", "#261C18"],
        });
      } catch {
        // ignore in non-browser environments
      }

      setMessages((prev) => [
        ...prev,
        createMessage(
          "assistant",
          `Your reservation request has been confirmed under demonstration reference ${savedRecord.id}. We look forward to welcoming you to Atelier Éclat.`
        ),
      ]);
    } catch (err) {
      console.error("Booking submission error:", err);
      setErrorMessage("Network error processing your reservation. Please try again.");
      setIsSubmitting(false);
    }
  };

  const copyReferenceCode = () => {
    if (confirmedBooking?.id && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(confirmedBooking.id);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const resetBookingFlow = () => {
    setBookingState({
      serviceId: "",
      specialistId: "",
      date: "",
      time: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      notes: "",
    });
    setConfirmedBooking(null);
    setCurrentStep("chat");
  };

  if (!isOpen) return null;

  // Selected Service and Specialist objects
  const selectedService = SERVICES.find((s) => s.id === bookingState.serviceId);
  const selectedSpecialist = SPECIALISTS.find((sp) => sp.id === bookingState.specialistId);
  const availableSlots =
    bookingState.date
      ? getAvailableSlots(bookingState.specialistId || "any", bookingState.date)
      : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#181210]/75 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Atelier AI Concierge Booking Assistant"
    >
      <div className="bg-[#FAF8F5] w-full sm:max-w-2xl sm:rounded-3xl h-[95vh] sm:h-[85vh] max-h-[820px] flex flex-col shadow-2xl border border-[#261C18]/10 overflow-hidden relative">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-white/90 border-b border-[#261C18]/8 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 rounded-full bg-[#1C1614] items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5 text-[#B89D72]" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-medium text-[#261C18]">
                  Atelier AI Concierge
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-[#B89D72]/20 text-[#9E8256]">
                  AI Virtual Assistant
                </span>
              </div>
              <p className="text-[11px] text-[#70635B]">
                Paris Salon • Personalized Ritual Scheduling
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={resetBookingFlow}
              title="Reset conversation"
              className="p-2 rounded-full text-[#70635B] hover:text-[#261C18] hover:bg-[#261C18]/5 transition-colors"
              aria-label="Reset booking"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#70635B] hover:text-[#261C18] hover:bg-[#261C18]/5 transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Demo Mode Notice Banner */}
        <div className="bg-[#F3ECE2] px-4 py-1.5 border-b border-[#261C18]/6 flex items-center justify-between text-[11px] text-[#70635B]">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#B89D72] shrink-0" />
            <span>
              <strong>DEMO SIMULATION:</strong> No actual payment is required or real calendar slot booked.
            </span>
          </div>
          {bookingState.serviceId && (
            <span className="text-[10px] font-mono text-[#261C18] hidden sm:inline">
              Selected: {selectedService?.name.split(" ")[0]}
            </span>
          )}
        </div>

        {/* Conversation Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Messages list */}
          {messages.map((msg) => {
            const isAssistant = msg.sender === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[78%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    isAssistant
                      ? "bg-white text-[#261C18] rounded-tl-xs border border-[#261C18]/8"
                      : "bg-[#261C18] text-[#FAF8F5] rounded-tr-xs"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#9B8D84] mt-1 px-1">{msg.timestamp}</span>

                {/* Quick reply action chips attached to assistant message */}
                {isAssistant && msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.quickReplies.map((qr, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(qr.action, qr.payload)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#F1E9E6] hover:bg-[#E8DCD8] text-[#261C18] border border-[#C4A29B]/30 transition-all text-left flex items-center gap-1"
                      >
                        <span>{qr.label}</span>
                        <ChevronRight className="w-3 h-3 text-[#B89D72]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#261C18]/8 w-fit text-[#70635B]">
              <span className="w-2 h-2 rounded-full bg-[#B89D72] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#B89D72] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#B89D72] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          {/* STEP 1 INTERACTIVE UI: Service Selector */}
          {currentStep === "select_service" && (
            <div className="p-4 rounded-2xl bg-white/90 border border-[#B89D72]/40 shadow-sm space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#261C18]/6">
                <span className="text-[11px] uppercase tracking-wider text-[#261C18] font-semibold">
                  Step 1 of 4: Select Your Treatment
                </span>
                <span className="text-[10px] text-[#9B8D84]">
                  {SERVICES.length} rituals available
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectService(s.id)}
                    className="p-3 rounded-xl border border-[#261C18]/8 hover:border-[#B89D72] bg-[#FAF8F5] hover:bg-white text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-serif text-sm font-medium text-[#261C18] group-hover:text-[#B89D72]">
                        {s.name}
                      </p>
                      <p className="text-[11px] text-[#70635B]">
                        {s.categoryLabel} • {s.durationMinutes} min
                      </p>
                    </div>
                    <span className="font-serif text-sm font-semibold text-[#261C18] shrink-0">
                      ${s.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 INTERACTIVE UI: Specialist Selector */}
          {currentStep === "select_specialist" && (
            <div className="p-4 rounded-2xl bg-white/90 border border-[#B89D72]/40 shadow-sm space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#261C18]/6">
                <span className="text-[11px] uppercase tracking-wider text-[#261C18] font-semibold">
                  Step 2 of 4: Select Master Specialist
                </span>
                <button
                  onClick={() => setCurrentStep("select_service")}
                  className="text-[11px] text-[#B89D72] underline"
                >
                  Change Ritual
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Any Available Specialist option */}
                <button
                  onClick={() => handleSelectSpecialist("any")}
                  className="p-3 rounded-xl border border-[#261C18]/10 hover:border-[#B89D72] bg-[#FAF8F5] hover:bg-white text-left transition-all col-span-1 sm:col-span-2 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#261C18]">
                      Any Available Specialist
                    </p>
                    <p className="text-[10px] text-[#70635B]">
                      First available master artisan on your chosen date
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#B89D72]" />
                </button>

                {SPECIALISTS.map((sp) => (
                  <button
                    key={sp.id}
                    onClick={() => handleSelectSpecialist(sp.id)}
                    className="p-3 rounded-xl border border-[#261C18]/8 hover:border-[#B89D72] bg-[#FAF8F5] hover:bg-white text-left transition-all flex items-center gap-3 group"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white">
                      <Image
                        src={sp.image}
                        alt={sp.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-sm font-medium text-[#261C18] group-hover:text-[#B89D72]">
                        {sp.name}
                      </p>
                      <p className="text-[10px] text-[#70635B] line-clamp-1">{sp.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 INTERACTIVE UI: Date Selector */}
          {currentStep === "select_date" && (
            <div className="p-4 rounded-2xl bg-white/90 border border-[#B89D72]/40 shadow-sm space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#261C18]/6">
                <span className="text-[11px] uppercase tracking-wider text-[#261C18] font-semibold">
                  Step 3 of 4: Select Appointment Date
                </span>
                <button
                  onClick={() => setCurrentStep("select_specialist")}
                  className="text-[11px] text-[#B89D72] underline"
                >
                  Change Specialist
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {upcomingDates.map((d) => (
                  <button
                    key={d.dateStr}
                    onClick={() => handleSelectDate(d.dateStr)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      bookingState.date === d.dateStr
                        ? "bg-[#261C18] text-[#FAF8F5] border-[#261C18]"
                        : "bg-[#FAF8F5] hover:bg-white text-[#261C18] border-[#261C18]/8 hover:border-[#B89D72]"
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider block text-[#9B8D84]">
                      {d.weekday}
                    </span>
                    <span className="text-xs font-semibold block mt-0.5">{d.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 INTERACTIVE UI: Time Slot Selector */}
          {currentStep === "select_time" && (
            <div className="p-4 rounded-2xl bg-white/90 border border-[#B89D72]/40 shadow-sm space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#261C18]/6">
                <span className="text-[11px] uppercase tracking-wider text-[#261C18] font-semibold">
                  Select Time for {bookingState.date}
                </span>
                <button
                  onClick={() => setCurrentStep("select_date")}
                  className="text-[11px] text-[#B89D72] underline"
                >
                  Change Date
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => handleSelectTime(slot.time)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-medium transition-all ${
                      slot.available
                        ? "bg-[#FAF8F5] hover:bg-[#261C18] hover:text-[#FAF8F5] text-[#261C18] border border-[#261C18]/10"
                        : "bg-gray-100 text-gray-400 border border-transparent line-through cursor-not-allowed"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 INTERACTIVE UI: Contact Details & Review */}
          {currentStep === "enter_contact" && (
            <div className="p-5 rounded-2xl bg-white/95 border border-[#B89D72]/40 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#261C18]/6">
                <span className="text-[11px] uppercase tracking-wider text-[#261C18] font-semibold">
                  Guest Contact & Reservation Summary
                </span>
                <button
                  onClick={() => setCurrentStep("select_time")}
                  className="text-[11px] text-[#B89D72] underline"
                >
                  Back
                </button>
              </div>

              {/* Review Pills */}
              <div className="p-3.5 rounded-xl bg-[#F5F0EA] space-y-1.5 text-xs text-[#261C18]">
                <div className="flex justify-between">
                  <span className="text-[#70635B]">Treatment:</span>
                  <strong className="font-serif">{selectedService?.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#70635B]">Artisan:</span>
                  <span>{selectedSpecialist ? selectedSpecialist.name : "Any Available Specialist"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#70635B]">Scheduled:</span>
                  <span className="font-mono">
                    {bookingState.date} at {bookingState.time}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#261C18]/6 pt-1.5 mt-1.5">
                  <span className="text-[#70635B]">Total (Demo):</span>
                  <strong className="font-serif text-sm">${selectedService?.price}</strong>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#70635B] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Camille Laurent"
                    value={bookingState.clientName}
                    onChange={(e) =>
                      setBookingState((prev) => ({ ...prev, clientName: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#FAF8F5] border border-[#261C18]/10 focus:outline-none focus:border-[#B89D72]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#70635B] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="camille@domain.com"
                      value={bookingState.clientEmail}
                      onChange={(e) =>
                        setBookingState((prev) => ({ ...prev, clientEmail: e.target.value }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#FAF8F5] border border-[#261C18]/10 focus:outline-none focus:border-[#B89D72]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#70635B] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+33 6 12 34 56 78"
                      value={bookingState.clientPhone}
                      onChange={(e) =>
                        setBookingState((prev) => ({ ...prev, clientPhone: e.target.value }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#FAF8F5] border border-[#261C18]/10 focus:outline-none focus:border-[#B89D72]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#70635B] block mb-1">
                    Skin Notes or Sensitivities (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. sensitive skin, organic oils preferred..."
                    value={bookingState.notes}
                    onChange={(e) =>
                      setBookingState((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#FAF8F5] border border-[#261C18]/10 focus:outline-none focus:border-[#B89D72]"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                disabled={
                  isSubmitting ||
                  !bookingState.clientName ||
                  !bookingState.clientEmail ||
                  !bookingState.clientPhone
                }
                onClick={handleConfirmBooking}
                className="btn-luxury w-full justify-center !py-3 text-xs tracking-wider disabled:opacity-50"
              >
                <span>
                  {isSubmitting ? "Generating Confirmation..." : "Confirm Demonstration Reservation"}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* STEP 6: CONFIRMED STATE */}
          {currentStep === "confirmed" && confirmedBooking && (
            <div className="p-6 rounded-2xl bg-white border border-[#B89D72] shadow-xl space-y-4 animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 text-emerald-800">
                <CheckCircle2 className="w-7 h-7 text-[#B89D72] shrink-0" />
                <div>
                  <h3 className="font-serif text-xl text-[#261C18]">
                    Reservation Requested Successfully
                  </h3>
                  <p className="text-xs text-[#70635B]">
                    Atelier Éclat Paris (Demonstration Simulation)
                  </p>
                </div>
              </div>

              {/* Booking Card */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#261C18]/8 space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#261C18]/6">
                  <span className="text-[10px] uppercase tracking-wider text-[#70635B]">
                    Confirmation Code
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#261C18]">
                      {confirmedBooking.id}
                    </span>
                    <button
                      onClick={copyReferenceCode}
                      className="p-1 text-[#70635B] hover:text-[#261C18]"
                      title="Copy confirmation reference"
                    >
                      {copiedCode ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[#261C18]">
                  <div>
                    <span className="text-[10px] uppercase text-[#9B8D84] block">Guest Name</span>
                    <span className="font-medium">{confirmedBooking.clientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#9B8D84] block">Ritual</span>
                    <span className="font-medium">{confirmedBooking.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#9B8D84] block">Specialist</span>
                    <span className="font-medium">{confirmedBooking.specialistName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#9B8D84] block">Date & Time</span>
                    <span className="font-medium">
                      {confirmedBooking.date} @ {confirmedBooking.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#70635B] leading-relaxed italic bg-[#F3ECE2]/60 p-3 rounded-lg border border-[#261C18]/4">
                Note: In a live production configuration with Supabase / Google Calendar connected, an email confirmation with calendar invitation (.ics) is automatically dispatched to {confirmedBooking.clientEmail}.
              </div>

              <div className="flex gap-2">
                <button
                  onClick={resetBookingFlow}
                  className="btn-luxury-outline w-full justify-center text-xs !py-2.5"
                >
                  Book Another Ritual
                </button>
                <button
                  onClick={onClose}
                  className="btn-luxury w-full justify-center text-xs !py-2.5"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="p-3 sm:p-4 bg-white/90 border-t border-[#261C18]/8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about treatments, pricing, specialists, or say 'book'..."
              className="flex-1 px-4 py-2.5 rounded-full text-xs sm:text-sm bg-[#FAF8F5] border border-[#261C18]/10 text-[#261C18] placeholder-[#9B8D84] focus:outline-none focus:border-[#B89D72] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-full bg-[#261C18] hover:bg-[#3D2D27] disabled:opacity-40 text-white transition-all shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-[#9B8D84] mt-2 px-2">
            <span>Powered by Atelier AI Concierge Engine</span>
            <span>Explicit Demo Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
}
