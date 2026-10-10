import { SERVICES, SPECIALISTS } from "@/data/salon-data";
import { BookingFormData, BookingRecord, BookingSlot } from "@/types";

// Standard time slots available throughout the day
const STANDARD_SLOTS = [
  "09:30",
  "10:45",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
  "19:00",
];

const STORAGE_KEY = "atelier_eclat_demo_bookings";

/**
 * Generates available time slots for a given specialist and date
 */
export function getAvailableSlots(specialistId: string, dateStr: string): BookingSlot[] {
  // Hash seed from specialist and date to consistently simulate real-time availability
  let hash = 0;
  const combined = specialistId + dateStr;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }

  // Get locally stored bookings for this specialist and date to block them
  const existingBookings = getStoredBookings();
  const bookedTimes = new Set(
    existingBookings
      .filter((b) => b.date === dateStr && (b.specialistId === specialistId || specialistId === "any"))
      .map((b) => b.time)
  );

  return STANDARD_SLOTS.map((time, idx) => {
    // Deterministic simulation: some slots booked depending on hash and index
    const isPseudoBooked = (Math.abs(hash) + idx * 7) % 3 === 0;
    const isAlreadyReserved = bookedTimes.has(time);
    return {
      time,
      available: !isPseudoBooked && !isAlreadyReserved,
    };
  });
}

/**
 * Retrieves existing simulated bookings from browser storage
 */
export function getStoredBookings(): BookingRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read bookings from storage", err);
    return [];
  }
}

/**
 * Saves a new simulated booking record
 */
export function saveBooking(data: BookingFormData): BookingRecord {
  const service = SERVICES.find((s) => s.id === data.serviceId);
  const specialist = SPECIALISTS.find((sp) => sp.id === data.specialistId);

  const referenceCode = `ECLAT-${Math.floor(10000 + Math.random() * 90000)}`;

  const newRecord: BookingRecord = {
    id: referenceCode,
    serviceId: data.serviceId,
    serviceName: service ? service.name : "Custom Ritual",
    specialistId: data.specialistId,
    specialistName: specialist ? specialist.name : "Any Available Specialist",
    price: service ? service.price : 90,
    durationMinutes: service ? service.durationMinutes : 60,
    date: data.date,
    time: data.time,
    clientName: data.clientName.trim(),
    clientEmail: data.clientEmail.trim(),
    clientPhone: data.clientPhone.trim(),
    notes: data.notes?.trim() || "",
    createdAt: new Date().toISOString(),
    status: "confirmed",
    isDemo: true,
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getStoredBookings();
      existing.unshift(newRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      console.error("Failed to persist demo booking", err);
    }
  }

  return newRecord;
}

/**
 * Format date for high-end editorial display (e.g., "Thursday, 22 October 2026")
 */
export function formatEditorialDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Returns the next 14 available dates as date strings YYYY-MM-DD
 */
export function getUpcomingDates(count = 14): { dateStr: string; label: string; weekday: string }[] {
  const result = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    const dateStr = nextDate.toISOString().split("T")[0];
    const weekday = nextDate.toLocaleDateString("en-US", { weekday: "short" });
    const label = nextDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    result.push({ dateStr, label, weekday });
  }

  return result;
}
