import { NextRequest, NextResponse } from "next/server";
import { SERVICES, SPECIALISTS } from "@/data/salon-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, specialistId, date, time, clientName, clientEmail, clientPhone, notes } = body;

    // Strict validation
    if (!serviceId) {
      return NextResponse.json({ success: false, error: "Please select a beauty service." }, { status: 400 });
    }
    if (!date) {
      return NextResponse.json({ success: false, error: "Please select an appointment date." }, { status: 400 });
    }
    if (!time) {
      return NextResponse.json({ success: false, error: "Please select a preferred appointment time." }, { status: 400 });
    }
    if (!clientName || clientName.trim().length < 2) {
      return NextResponse.json({ success: false, error: "Please enter your full name." }, { status: 400 });
    }
    if (!clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address." }, { status: 400 });
    }
    if (!clientPhone || clientPhone.trim().length < 6) {
      return NextResponse.json({ success: false, error: "Please provide a valid contact telephone number." }, { status: 400 });
    }

    const service = SERVICES.find((s) => s.id === serviceId);
    const specialist = SPECIALISTS.find((sp) => sp.id === specialistId);

    const bookingId = `ECLAT-${Math.floor(10000 + Math.random() * 90000)}`;

    const bookingRecord = {
      id: bookingId,
      serviceId,
      serviceName: service ? service.name : "Custom Treatment",
      specialistId: specialistId || "any",
      specialistName: specialist ? specialist.name : "Any Available Specialist",
      durationMinutes: service ? service.durationMinutes : 60,
      price: service ? service.price : 90,
      date,
      time,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      notes: notes?.trim() || "",
      createdAt: new Date().toISOString(),
      status: "confirmed",
      isDemo: true,
      demoNotice: "Simulation Demo: No payment was charged and no calendar slot was locked in a live system.",
    };

    return NextResponse.json({
      success: true,
      booking: bookingRecord,
      message: `Your appointment request for ${bookingRecord.serviceName} has been recorded under reference ${bookingId}.`,
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred while processing your reservation." },
      { status: 500 }
    );
  }
}
