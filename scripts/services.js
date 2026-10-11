/**
 * ATELIER BEAUTÉ — SERVICES KNOWLEDGE BASE & CATALOG LOGIC
 * Framework-free, Vanilla JS, Safe DOM Rendering
 */

const ATELIER_SERVICES = [
  // 1. FACIAL TREATMENTS
  {
    id: "signature-cellular-facial",
    category: "Facial Treatments",
    categorySlug: "facials",
    name: "Atelier Signature Cellular Facial",
    shortDesc: "A multi-phase bespoke ritual combining botanical enzyme exfoliation, targeted peptide serums, and micro-current lifting for deep cellular radiance.",
    duration: "75 min",
    priceSample: "$175",
    image: "assets/images/facial-treatment.webp",
    overview: "Our hallmark facial ritual is customized in real-time according to your skin's immediate moisture barrier, elasticity, and circulation needs. Using antioxidant-dense botanical serums and rhythmic facial massage, this treatment delivers lasting luminosity without irritation.",
    involves: [
      "In-depth skin barrier analysis and double botanical cleansing",
      "Gentle enzymatic exfoliation under warm steam",
      "Sculpting lymphatic drainage and buccal facial massage",
      "Custom bioactive peptide infusion mask with cold marble stones",
      "Protective ceramide seal and broad-spectrum antioxidant veil"
    ],
    preparation: "Please pause retinol, AHA/BHA exfoliants, and active acids 48 hours prior to your visit. Arrive with clean skin or light daily makeup.",
    aftercare: "Avoid direct sun exposure, heavy workouts, or saunas for 24 hours. Keep skin hydrated with a gentle barrier cream.",
    faqs: [
      {
        q: "Is there any downtime after this facial?",
        a: "None. You will leave with a radiant, hydrated glow suitable for immediate social engagements."
      },
      {
        q: "Can this treatment be customized for sensitive skin?",
        a: "Yes. Every formulation is tailored to your individual tolerance level after consultation."
      }
    ]
  },
  {
    id: "sculpting-lymphatic-facial",
    category: "Facial Treatments",
    categorySlug: "facials",
    name: "Sculpting Lymphatic Facial",
    shortDesc: "Traditional manual drainage techniques combined with acupressure to release facial tension, depuff, and define natural facial contours.",
    duration: "60 min",
    priceSample: "$145",
    image: "assets/images/beauty-treatment-detail.webp",
    overview: "Designed for stressed or tired skin, this treatment focuses on manual release of jaw and neck tension while stimulating lymph flow to reduce fluid retention and restore sculpted cheek and jawline contours.",
    involves: [
      "Neck, décolleté, and shoulder tension release",
      "Warm botanical oil cleanse",
      "Manual lymphatic drainage and intra-oral buccal lifting techniques",
      "Cooling cryo-globe finish to tighten pores and soothe circulation"
    ],
    preparation: "Stay well-hydrated before your appointment. Inform your specialist of any recent dental procedures or facial injectables.",
    aftercare: "Drink plenty of room-temperature water post-treatment to assist in lymphatic clearance.",
    faqs: [
      {
        q: "How soon after injectables can I book this facial?",
        a: "We recommend waiting at least 3 weeks following neurotoxins or dermal fillers."
      }
    ]
  },
  {
    id: "deep-hydration-peptide-infusion",
    category: "Facial Treatments",
    categorySlug: "facials",
    name: "Deep Hydration & Peptide Infusion",
    shortDesc: "Intensive moisture recovery delivering multi-molecular hyaluronic acid and biomimetic peptides for plump, quenched skin.",
    duration: "60 min",
    priceSample: "$150",
    image: "assets/images/skincare-still-life.webp",
    overview: "Formulated specifically for dehydrated, travel-fatigued, or seasonally depleted skin barriers. Infuses concentrated moisture deep into the epidermal layers.",
    involves: [
      "Ultra-gentle milk cleansing and hydrating floral mist",
      "Low-frequency ultrasound infusion of peptide matrix",
      "Bio-cellulose restorative moisture blanket",
      "Lipid-replenishing squalane massage"
    ],
    preparation: "No special preparation needed. Ideal before big events or flights.",
    aftercare: "Maintain gentle hydration; avoid aggressive scrubbing.",
    faqs: [
      {
        q: "Is this suitable during pregnancy?",
        a: "Yes, this formula uses only nourishing, pregnancy-safe humectants and lipids."
      }
    ]
  },

  // 2. HAIR STYLING
  {
    id: "editorial-cut-blowout",
    category: "Hair Styling",
    categorySlug: "hair",
    name: "Editorial Cut & Blowout",
    shortDesc: "Precision dry and wet cutting customized to your natural hair growth patterns, followed by a luminous signature blowout.",
    duration: "75 min",
    priceSample: "$130",
    image: "assets/images/hair-styling.webp",
    overview: "Every haircut begins with a consultation regarding your daily styling habits, head shape, and natural texture. We craft effortless, enduring shapes that grow out seamlessly.",
    involves: [
      "Detailed texture and silhouette consultation",
      "Aromatherapy scalp massage and conditioning wash",
      "Architectural shear and slide-cutting technique",
      "Low-heat polish blowout with silk thermal protection"
    ],
    preparation: "Please arrive with your hair in its natural state so we can observe its organic movement.",
    aftercare: "We provide personalized product styling suggestions to preserve volume and shape at home.",
    faqs: [
      {
        q: "Does this include a wash?",
        a: "Yes, an invigorating wash and conditioning treatment are standard with all cuts."
      }
    ]
  },
  {
    id: "bespoke-botanical-balayage",
    category: "Hair Styling",
    categorySlug: "hair",
    name: "Bespoke Botanical Balayage",
    shortDesc: "Hand-painted, dimension-enhancing color with low-ammonia formulas designed for subtle transitions and natural sun-kissed reflection.",
    duration: "180 min",
    priceSample: "$260",
    image: "assets/images/hair-styling.webp",
    overview: "A customized color painting method that compliments your natural skin undertones. We prioritize strand integrity by infusing botanical bond-builders into every formulation.",
    involves: [
      "Color theory and skin undertone mapping",
      "Freehand dimensional light painting",
      "Bond-repairing herbal gloss toner",
      "Deep moisture masque and finishing blowdry"
    ],
    preparation: "Avoid washing hair for 24 hours prior to appointment to maintain natural scalp lipid protection.",
    aftercare: "Use sulfate-free, color-safe cleansing agents and lukewarm water.",
    faqs: [
      {
        q: "How often does balayage need a touch-up?",
        a: "Due to the seamless blended growth line, maintenance is typically required every 3 to 5 months."
      }
    ]
  },
  {
    id: "intensive-scalp-strand-therapy",
    category: "Hair Styling",
    categorySlug: "hair",
    name: "Intensive Scalp & Strand Therapy",
    shortDesc: "Targeted scalp exfoliation, botanical steam therapy, and keratin-peptide mask to revive brittle hair and stimulate follicles.",
    duration: "60 min",
    priceSample: "$110",
    image: "assets/images/beauty-treatment-detail.webp",
    overview: "Healthy hair begins with an optimized scalp microbiome. This restorative ritual decongests follicles, clears buildup, and infuses essential lipids into each strand.",
    involves: [
      "Micro-exfoliating scalp scrub with tea tree and rosemary",
      "Warm ozone steam infusion",
      "Stimulating acupressure scalp massage",
      "Repairing amino acid sealant"
    ],
    preparation: "No preparation required.",
    aftercare: "Leave nourishing oils in place for at least 12 hours if possible.",
    faqs: [
      {
        q: "Is this suitable for colored hair?",
        a: "Yes, our formulations are gentle and pH-balanced to safeguard tone vibrancy."
      }
    ]
  },

  // 3. MANICURE & PEDICURE
  {
    id: "essential-editorial-manicure",
    category: "Manicure & Pedicure",
    categorySlug: "nails",
    name: "Essential Editorial Manicure",
    shortDesc: "Precision dry cuticle refinement, nail shaping, warm botanical hand massage, and long-wear sheer or classic finish.",
    duration: "50 min",
    priceSample: "$65",
    image: "assets/images/manicure-detail.webp",
    overview: "A clean, modern approach to nail care focused on nail bed health, tidy cuticles, and understated, timeless polish tones.",
    involves: [
      "E-file dry cuticle alignment and gentle exfoliation",
      "Natural nail shaping with diamond files",
      "Warm jojoba and sweet almond oil cuticle bath",
      "Hydrating hand and wrist massage",
      "Non-toxic 10-free polish or buffed natural finish"
    ],
    preparation: "Please let us know in advance if you require removal of existing acrylics or hard gel.",
    aftercare: "Apply nourishing cuticle oil twice daily to extend longevity.",
    faqs: [
      {
        q: "What polish brands do you use?",
        a: "We curate clean, 10-free, cruelty-free professional nail lacquers and bio-gels."
      }
    ]
  },
  {
    id: "restorative-spa-pedicure",
    category: "Manicure & Pedicure",
    categorySlug: "nails",
    name: "Restorative Spa Pedicure",
    shortDesc: "Warm herbal foot soak, natural pumice smoothing, magnesium salt scrub, deep moisturizing mask, and flawless lacquer.",
    duration: "65 min",
    priceSample: "$85",
    image: "assets/images/manicure-detail.webp",
    overview: "A deeply grounding ritual for tired feet. We combine therapeutic exfoliation with intensive hydration in private, whisper-quiet pedicure suites.",
    involves: [
      "Dead Sea salt and eucalyptus foot bath",
      "Gentle callus smoothing with natural quartz",
      "Reflexology-inspired foot and lower leg massage",
      "Warm botanical paraffin or nourishing mask wrap"
    ],
    preparation: "Wear comfortable, loose clothing that rolls easily above the calf.",
    aftercare: "Allow 20 minutes of drying time if selecting standard lacquer.",
    faqs: [
      {
        q: "Do you sanitize all metal instruments?",
        a: "Every tool undergoes medical-grade autoclave sterilization and is unsealed in front of you."
      }
    ]
  },

  // 4. MAKEUP ARTISTRY
  {
    id: "haute-couture-evening-makeup",
    category: "Makeup Artistry",
    categorySlug: "makeup",
    name: "Haute Couture Evening Makeup",
    shortDesc: "Refined, camera-ready beauty design tailored to your event lighting, personal features, and evening wardrobe.",
    duration: "75 min",
    priceSample: "$140",
    image: "assets/images/makeup-artistry.webp",
    overview: "Sophisticated makeup that enhances rather than masks your individuality. We focus on glowing skin, refined eye emphasis, and lasting comfort throughout your event.",
    involves: [
      "Pre-makeup skin prep with toning mists and peptide primer",
      "Custom shade blending for imperceptible base coverage",
      "Strategic contouring and luminous soft-focus highlighting",
      "Individual lash cluster placement for natural flutter",
      "Long-wear lip formulation and setting mist"
    ],
    preparation: "Arrive with a cleansed face and your daily moisturizer. Bring reference photos of your outfit or chosen vibe.",
    aftercare: "We provide a small touch-up lip vial and blotting sheets for your evening.",
    faqs: [
      {
        q: "Are false lashes included?",
        a: "Yes, customized individual flare lashes are included with all evening makeup services."
      }
    ]
  },
  {
    id: "natural-radiant-bridal-makeup",
    category: "Makeup Artistry",
    categorySlug: "makeup",
    name: "Natural Radiant Bridal Makeup",
    shortDesc: "Timeless, tear-resistant elegance engineered for high-definition photography and natural in-person beauty all day.",
    duration: "90 min",
    priceSample: "$190",
    image: "assets/images/makeup-artistry.webp",
    overview: "Your wedding day beauty should feel effortless and authentically you. We combine long-lasting formulations with skin-mimicking texture for a radiant, enduring look.",
    involves: [
      "Detailed bridal palette consultation",
      "Lymphatic depuffing skin preparation",
      "HD photography-tested complexion matching",
      "Waterproof eye refinement and bespoke lash architecture",
      "Bridal emergency touch-up kit"
    ],
    preparation: "We recommend scheduling a bridal trial 4-8 weeks before your ceremony date.",
    aftercare: "Gently remove with an oil-based cleanser followed by a hydrating milk wash.",
    faqs: [
      {
        q: "Do you offer on-location bridal services?",
        a: "Yes, on-location bookings are available upon inquiry with our concierge."
      }
    ]
  },

  // 5. BROWS & LASHES
  {
    id: "architectural-brow-sculpt-tint",
    category: "Brows & Lashes",
    categorySlug: "brows",
    name: "Architectural Brow Sculpt & Tint",
    shortDesc: "Bespoke facial measurement, precision tweezing or gentle waxing, and custom-mixed hybrid dye for defined, feathered arches.",
    duration: "45 min",
    priceSample: "$55",
    image: "assets/images/brows-lashes.webp",
    overview: "We treat brow design as architectural facial framing. By honoring your natural bone structure and brow density, we create flattering, low-maintenance shapes.",
    involves: [
      "Facial symmetry mapping and brow geometry check",
      "Custom color tint matching hair roots and skin warmth",
      "Precision wax, string, and fine tweezer finishing",
      "Nourishing keratin infusion and soft brow gel setting"
    ],
    preparation: "Allow brows to grow uninterrupted for at least 3 weeks prior for optimal shaping options.",
    aftercare: "Keep brows dry for 12 hours post-tint to allow hybrid pigment to stabilize.",
    faqs: [
      {
        q: "How long does the tint typically last?",
        a: "The hybrid tint stains the skin for 5-7 days and remains on brow hairs for up to 4 weeks."
      }
    ]
  },
  {
    id: "keratin-lash-lift-glaze",
    category: "Brows & Lashes",
    categorySlug: "brows",
    name: "Keratin Lash Lift & Nourishing Glaze",
    shortDesc: "Gentle natural lash curl enhancement paired with deep black gloss tint and keratin conditioning treatment.",
    duration: "60 min",
    priceSample: "$95",
    image: "assets/images/brows-lashes.webp",
    overview: "Open up your eyes without the weight or maintenance of artificial extensions. Our gentle cysteamine-based lifting formula curls and strengthens your natural lashes.",
    involves: [
      "Shield sizing tailored to your eyelid curvature",
      "Damage-free gentle lifting lotion application",
      "Deep obsidian lash glaze tinting",
      "Strengthening keratin and panthenol infusion"
    ],
    preparation: "Remove contact lenses and ensure eyes are completely free of mascara or oils.",
    aftercare: "Avoid steam, moisture, and mascara for 24 hours while curl bonds cure.",
    faqs: [
      {
        q: "How long does the lift last?",
        a: "Typically 6 to 8 weeks, aligning with your natural eyelash shedding cycle."
      }
    ]
  },

  // 6. BEAUTY RITUALS (SIGNATURE PACKAGES)
  {
    id: "the-atelier-signature-ritual",
    category: "Beauty Rituals",
    categorySlug: "rituals",
    name: "The Atelier Signature Ritual",
    shortDesc: "Our premier comprehensive experience combining the Cellular Facial, Scalp Therapy, and Essential Manicure in a private suite.",
    duration: "180 min",
    priceSample: "$320",
    image: "assets/images/salon-interior.webp",
    overview: "The quintessential Atelier Beauté experience. An immersive three-hour journey designed to quiet the mind, release accumulated physical tension, and revive skin and hair.",
    involves: [
      "Warm herbal foot soak and grounding welcome tea",
      "Full 75-minute Atelier Signature Cellular Facial",
      "Restorative scalp and neck acupressure therapy",
      "Essential editorial manicure with nourishing botanical massage",
      "Curated wellness refreshments and personalized aftercare kit"
    ],
    preparation: "Arrive 15 minutes prior to unwind in our quiet lounge with herbal infusion.",
    aftercare: "We encourage a restful evening following this restorative ritual.",
    faqs: [
      {
        q: "Can elements of this package be modified?",
        a: "Yes. Our concierge can customize components to suit your personal preferences or schedule."
      }
    ]
  },
  {
    id: "serenity-glow-reset",
    category: "Beauty Rituals",
    categorySlug: "rituals",
    name: "The Serenity Glow Reset",
    shortDesc: "A targeted 90-minute pairing of our Deep Hydration Facial with a restorative hand and forearm reflexology ritual.",
    duration: "90 min",
    priceSample: "$195",
    image: "assets/images/hero-beauty-editorial.webp",
    overview: "Created for individuals with limited time who require maximum restorative benefit. Leaves face radiant and hands thoroughly pampered.",
    involves: [
      "Express lymphatic drainage facial cleanse",
      "Hyaluronic peptide infusion mask",
      "Heated herbal hand mitts and lavender massage",
      "Nourishing lip balm and protective skin veil"
    ],
    preparation: "No preparation required.",
    aftercare: "Drink extra water and maintain clean skin.",
    faqs: [
      {
        q: "Is this a good gift package?",
        a: "It is one of our most popular gift experiences for birthdays and celebrations."
      }
    ]
  }
];

// Helper functions for catalog queries
function getAllServices() {
  return ATELIER_SERVICES;
}

function getServiceById(id) {
  if (!id) return null;
  return ATELIER_SERVICES.find(s => s.id.toLowerCase() === id.toLowerCase()) || null;
}

function getServicesByCategory(catSlug) {
  if (!catSlug || catSlug === "all") return ATELIER_SERVICES;
  return ATELIER_SERVICES.filter(s => s.categorySlug.toLowerCase() === catSlug.toLowerCase());
}

// Export to window for vanilla JS access across pages
window.AtelierServices = {
  data: ATELIER_SERVICES,
  getAll: getAllServices,
  getById: getServiceById,
  getByCategory: getServicesByCategory
};
