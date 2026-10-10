import { NextRequest, NextResponse } from "next/server";
import { SERVICES, SPECIALISTS, SALON_INFO, PACKAGES } from "@/data/salon-data";

export async function POST(req: NextRequest) {
  try {
    const { message, history, currentStep, bookingState } = await req.json();
    const userQuery = (message || "").toLowerCase().trim();

    // Check if an AI provider API key is present
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      try {
        // Direct call to Gemini REST API for luxury tone
        const systemPrompt = `You are ATELIER AI CONCIERGE, the virtual beauty assistant for ATELIER ÉCLAT, an ultra-luxury Parisian beauty salon.
Salon Details:
- Address: ${SALON_INFO.address} (Demo showcase)
- Hours: Mon-Fri 09:00-20:00, Sat 09:30-19:30, Sun 10:00-18:00
- Specialists:
  * Emma Laurent (Facial Treatments & Cellular Skincare)
  * Sophie Bennett (Editorial Makeup & Event Hairstyling)
  * Claire Morgan (Restorative Nail Architecture, Keratin Lash Lift, Brow Lamination)
- Signature Treatments:
${SERVICES.map((s) => `  * ${s.name} ($${s.price}, ${s.durationMinutes}m): ${s.description}`).join("\n")}
- Packages:
${PACKAGES.map((p) => `  * ${p.name} ($${p.price}): ${p.tagline}`).join("\n")}

Guidelines:
1. Warm, elegant, concise, European luxury editorial tone. Keep responses under 3 short paragraphs.
2. Never make medical claims or guarantee clinical cures.
3. Recommend only treatments from the catalog.
4. If the client asks to book, warmly invite them to choose a service or date using the interactive booking cards.
5. Clarify that you are an AI virtual concierge.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nClient: ${message}` }],
                },
              ],
              generationConfig: {
                maxOutputTokens: 300,
                temperature: 0.7,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({
              reply: replyText,
              provider: "gemini-ai",
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, gracefully falling back to deterministic concierge:", geminiError);
      }
    }

    // High-fidelity deterministic luxury concierge fallback engine
    let reply = "";
    let quickReplies: { label: string; action: string; payload?: unknown }[] = [];
    let nextStep = currentStep;

    if (
      userQuery.includes("book") ||
      userQuery.includes("appointment") ||
      userQuery.includes("reserve") ||
      userQuery.includes("schedule")
    ) {
      reply =
        "It would be our distinct pleasure to arrange your visit to Atelier Éclat. Which ritual would you like to experience?";
      nextStep = "select_service";
      quickReplies = [
        { label: "Signature Éclat Facial ($85)", action: "select_service", payload: "signature-facial" },
        { label: "Signature Daylight Makeup ($90)", action: "select_service", payload: "signature-makeup" },
        { label: "Restorative Manicure ($40)", action: "select_service", payload: "signature-manicure" },
        { label: "The Glow Ritual ($180)", action: "select_service", payload: "glow-ritual" },
      ];
    } else if (
      userQuery.includes("specialist") ||
      userQuery.includes("team") ||
      userQuery.includes("artist") ||
      userQuery.includes("who") ||
      userQuery.includes("emma") ||
      userQuery.includes("sophie") ||
      userQuery.includes("claire")
    ) {
      reply =
        "Our atelier is led by three dedicated master artisans:\n\n• Emma Laurent: Facial rituals & cellular skin health\n• Sophie Bennett: Editorial makeup & bespoke hairstyling\n• Claire Morgan: Architectural nails, brow lamination & lash lifts\n\nWould you like to reserve a consultation with a specific specialist?";
      quickReplies = [
        { label: "Book with Emma Laurent", action: "select_specialist", payload: "emma-laurent" },
        { label: "Book with Sophie Bennett", action: "select_specialist", payload: "sophie-bennett" },
        { label: "Book with Claire Morgan", action: "select_specialist", payload: "claire-morgan" },
        { label: "Any Available Specialist", action: "select_specialist", payload: "any" },
      ];
    } else if (
      userQuery.includes("facial") ||
      userQuery.includes("skin") ||
      userQuery.includes("glow") ||
      userQuery.includes("hydration")
    ) {
      reply =
        "For skin rejuvenation, Emma Laurent recommends our 'Signature Éclat Facial' ($85, 60m) for deep nourishment and sculpting, or our 'Deep Hydration Thermal Ritual' ($110, 75m) for intense moisture barrier repair. If you are pressed for time, the 'Express Radiance Glow' ($55, 30m) delivers instant luminosity.";
      quickReplies = [
        { label: "Book Signature Facial", action: "select_service", payload: "signature-facial" },
        { label: "Book Deep Hydration", action: "select_service", payload: "deep-hydration" },
        { label: "Book Express Glow", action: "select_service", payload: "express-glow" },
      ];
    } else if (
      userQuery.includes("wedding") ||
      userQuery.includes("bridal") ||
      userQuery.includes("event") ||
      userQuery.includes("occasion")
    ) {
      reply =
        "For grand occasions and weddings, Sophie Bennett curates our 'The Event-Ready Occasion' ritual ($220, 150m), combining an express skin glow, bespoke event hairstyling, and couture evening makeup artistry. Would you like to schedule an occasion consultation?";
      quickReplies = [
        { label: "Book Event-Ready Package", action: "select_service", payload: "signature-occasion" },
        { label: "Book Bridal Consultation", action: "select_service", payload: "bridal-consultation" },
      ];
    } else if (
      userQuery.includes("price") ||
      userQuery.includes("cost") ||
      userQuery.includes("rate") ||
      userQuery.includes("menu")
    ) {
      reply =
        "Our treatments range from tailored $35–$40 brow and nail care, to $85 signature facials, $90 editorial makeup, and $180–$320 multi-hour restorative sanctuary packages. All pricing reflects individual private attention.";
      quickReplies = [
        { label: "Explore Full Menu", action: "explore_menu" },
        { label: "Book an Appointment", action: "start_booking" },
      ];
    } else if (
      userQuery.includes("where") ||
      userQuery.includes("address") ||
      userQuery.includes("location") ||
      userQuery.includes("hours") ||
      userQuery.includes("open")
    ) {
      reply = `Atelier Éclat is located at ${SALON_INFO.address}.\n\nOur doors are open Monday through Friday from 09:00 to 20:00, Saturday 09:30 to 19:30, and Sunday 10:00 to 18:00. Private valet parking is available by reservation.`;
      quickReplies = [
        { label: "Book an Appointment", action: "start_booking" },
        { label: "Contact Us", action: "contact_us" },
      ];
    } else {
      reply =
        "Bonjour. I am your Atelier AI Concierge. I can guide you through our bespoke facial treatments, editorial makeup, nail architecture, or match you with the ideal specialist for your personal beauty ritual.";
      quickReplies = [
        { label: "Book an Appointment", action: "start_booking" },
        { label: "Skincare Recommendations", action: "recommend_skin" },
        { label: "Meet the Specialists", action: "view_specialists" },
        { label: "Curated Packages", action: "view_packages" },
      ];
    }

    return NextResponse.json({
      reply,
      quickReplies,
      nextStep,
      provider: "deterministic-luxury-engine",
    });
  } catch (error) {
    console.error("Concierge API error:", error);
    return NextResponse.json(
      {
        reply: "I apologize, but our concierge connection momentarily paused. Please select a treatment directly below or tap to view available times.",
        quickReplies: [{ label: "Book an Appointment", action: "start_booking" }],
        provider: "fallback",
      },
      { status: 500 }
    );
  }
}
