export type ServiceCategory = 
  | "all"
  | "facials"
  | "makeup"
  | "hair"
  | "nails"
  | "brows-lashes"
  | "rituals";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  durationMinutes: number;
  price: number;
  description: string;
  benefits: string[];
  specialistIds: string[];
  image: string;
  popular?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  experienceYears: number;
  specialties: string[];
  image: string;
  availableDays: string[];
  servicesOffered: string[]; // service IDs
}

export interface PackageDeal {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  durationMinutes: number;
  includedServices: string[];
  description: string;
  popularTag?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  treatment: string;
  quote: string;
  rating: number;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: "landscape" | "portrait" | "square";
  caption: string;
}

export interface BookingSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  serviceId: string;
  specialistId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export interface BookingRecord extends BookingFormData {
  id: string;
  serviceName: string;
  specialistName: string;
  price: number;
  durationMinutes: number;
  createdAt: string;
  status: "confirmed" | "pending" | "cancelled";
  isDemo: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "assistant" | "user" | "system";
  text: string;
  timestamp: string;
  quickReplies?: { label: string; action: string; payload?: unknown }[];
  bookingStep?:
    | "select_service"
    | "select_specialist"
    | "select_date"
    | "select_time"
    | "enter_contact"
    | "review"
    | "confirmed";
  bookingPayload?: Partial<BookingFormData>;
}
