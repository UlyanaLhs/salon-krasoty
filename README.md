# ATELIER BEAUTÉ — Premium Beauty Salon Website
> **Descriptor:** BEAUTY • CARE • RITUAL  
> **Aesthetic:** Contemporary Calm Luxury Editorial  
> **Technology:** Semantic HTML5, Modular CSS3, Vanilla JavaScript (Framework-free, Static Hosting Ready)

---

## 1. Project Overview

**ATELIER BEAUTÉ** is a complete, production-ready, multi-page website developed for a high-end fictional beauty salon. The brand positioning reflects an intentional, serene aesthetic sanctuary combining master technical craft, biocompatible botanical formulations, and personalized client rituals.

### Core Business Objectives:
1. Generate appointment requests via an intuitive, accessible multi-step form.
2. Showcase comprehensive treatment offerings with illustrative sample pricing and durations.
3. Present master specialists and their professional expertise.
4. Educate visitors on treatment protocols, preparation, and aftercare.
5. Provide instant client guidance through an embedded, deterministic **AI Beauty Concierge**.
6. Build lasting trust through transparent pricing disclaimers, editorial photography, and calm visual hierarchy.

---

## 2. Directory Structure

```text
/
├── index.html                  # Homepage (Hero, Brand Story, Categories, Experience, Team, Packages, Reviews)
├── services.html               # Service Catalog with Category Tabs, Search, and Illustrative Pricing
├── service-details.html        # Dynamic Treatment Protocol View (URL-driven with safe DOM rendering)
├── specialists.html            # Meet the Artisans (Team bios, specialties, and direct booking CTAs)
├── about.html                  # Our Studio (Philosophy, Interior Architecture, Service Standards)
├── gallery.html                # Visual Portfolio with category filters and accessible lightbox modal
├── booking.html                # Appointment Request Form with date validation and demo confirmation modal
├── contact.html                # Studio Location, Opening Hours, Contact Form, and Map Placeholder
├── privacy.html                # Editable Privacy Policy Template with data controller placeholders
├── terms.html                  # Editable Terms of Use Template with cancellation policy placeholders
├── 404.html                    # Custom branded 404 Error Page
├── .nojekyll                   # Disables Jekyll processing for GitHub Pages hosting
├── robots.txt                  # Search engine crawl directives
├── sitemap.xml                 # XML Sitemap for search indexing
├── styles/
│   ├── main.css                # Design tokens, CSS variables, fluid type clamp(), base reset
│   ├── components.css          # Double-bezel cards, buttons, nav, accordion, AI concierge, modals
│   └── responsive.css          # Breakpoints (1024px, 768px, 480px), touch targets, prefers-reduced-motion
├── scripts/
│   ├── services.js             # Structured knowledge base data & catalog filtering logic
│   ├── navigation.js           # Sticky header, mobile drawer menu, keyboard trap, active link detection
│   ├── booking.js              # Booking form validation, date restrictions, dynamic service binding, demo modal
│   ├── forms.js                # Contact form validation, demo modal, accessible FAQ accordion
│   ├── gallery.js              # Gallery category filters, keyboard-navigable lightbox modal
│   ├── ai-concierge.js         # Offline deterministic AI concierge & production backend bridge
│   └── main.js                 # IntersectionObserver scroll reveals, back-to-top handler
└── assets/
    └── images/                 # Original generated & optimized WebP + JPG beauty assets
        ├── hero-beauty-editorial.webp (and .jpg)
        ├── facial-treatment.webp (and .jpg)
        ├── hair-styling.webp (and .jpg)
        ├── manicure-detail.webp (and .jpg)
        ├── makeup-artistry.webp (and .jpg)
        ├── brows-lashes.webp (and .jpg)
        ├── salon-interior.webp (and .jpg)
        ├── specialist-01.webp (and .jpg)
        ├── specialist-02.webp (and .jpg)
        ├── specialist-03.webp (and .jpg)
        ├── skincare-still-life.webp (and .jpg)
        └── beauty-treatment-detail.webp (and .jpg)
```

---

## 3. Brand Identity & Visual Design Tokens

- **Warm Ivory (`#F7F3ED`):** Main canvas background, evoking calm, natural light and limewash studio walls.
- **Soft Porcelain (`#EAE2D8`):** Secondary surface used for alternating sections and subtle cards.
- **Deep Espresso (`#302823`):** Primary typography and high-contrast button styling.
- **Muted Taupe (`#A59688`):** Hairline borders, metadata labels, and understated secondary elements.
- **Dusty Rose (`#C8A7A0`):** Spayed accent tone for interactive highlights and status tags.
- **Charcoal (`#252321`):** Contrast evening tone for the footer and immersion sections.
- **Typography:** An editorial serif (`Playfair Display`, with fallbacks to `Cormorant Garamond`, `Didot`, and `Georgia`) paired with clean modern sans-serif (`Plus Jakarta Sans`, with system fallbacks).
- **Architectural Double-Bezel:** Containers utilize nested framing (`.double-bezel` outer shell with subtle borders, enclosing elevated `.double-bezel-inner` surfaces) mimicking physical gallery frames.
- **Button-in-Button Pattern:** Primary CTAs feature an integrated circular trailing arrow bubble that shifts kinetically on hover.

---

## 4. Original Generated Visual Assets

The visual collection for ATELIER BEAUTÉ was created using the integrated image generation tools, saved in `assets/images/`, and converted to both optimized WebP and high-resolution JPEG formats:

1. **`hero-beauty-editorial.webp` (1376x768):** Editorial portrait of a beauty model in soft natural daylight, realistic skin texture, calm serene expression.
2. **`facial-treatment.webp` (1200x896):** Close-up of professional botanical facial treatment with aesthetician hands.
3. **`hair-styling.webp` (1200x896):** Editorial salon photography showing master stylist shaping glossy brunette waves.
4. **`manicure-detail.webp` (1200x896):** Macro photograph of an immaculate natural manicure with subtle sheer nude polish.
5. **`makeup-artistry.webp` (1200x896):** Professional makeup application in progress with soft blending brush and dewy skin.
6. **`brows-lashes.webp` (1200x896):** Close-up beauty portrait showing naturally feathered eyebrows and defined lashes.
7. **`salon-interior.webp` (1376x768):** Minimalist luxury salon interior featuring limewash archways, travertine reception, and fluted light oak wood.
8. **`specialist-01.webp` (896x1200):** Portrait of Elena Rostova, Master Aesthetician & Facialist.
9. **`specialist-02.webp` (896x1200):** Portrait of Marc Laurent, Creative Hair Director.
10. **`specialist-03.webp` (896x1200):** Portrait of Camille Moreau, Senior Makeup Artist & Brow Architect.
11. **`skincare-still-life.webp` (1200x896):** Editorial still life featuring an amber glass dropper bottle and ceramic cream jar on a travertine pedestal.
12. **`beauty-treatment-detail.webp` (1200x896):** High-resolution detail crop of botanical wellness preparation (created from still-life capture following model API quota reset).

---

## 5. ATELIER AI CONCIERGE

The website features an embedded floating virtual assistant designed to guide visitors, answer treatment questions, and provide transparent guidance.

### Demo Mode (Offline / Static)
- Works 100% in pure vanilla JavaScript without an API key or external network request.
- Powered by a structured local knowledge base covering:
  - Facials, hair styling, manicures, makeup, and brow treatments.
  - Sample pricing ranges and illustrative durations.
  - Preparation guidelines (e.g. pausing retinol 48h prior to facials).
  - Specialist profiles and booking procedures.
  - Medical/dermatological safety disclaimers (recommending board-certified doctors for medical issues).
- Renders messages safely using `textContent` and `document.createElement`, eliminating XSS vulnerabilities.
- Features simulated typing indicators and quick prompt pills.

### Production Backend Integration Path
To connect the concierge to a live LLM model (e.g. Gemini 1.5 Pro, OpenAI, Claude, or a custom RAG server):
1. In `scripts/ai-concierge.js`, configure the endpoint:
   ```javascript
   window.ATELIER_AI_ENDPOINT = "https://api.yourdomain.com/v1/concierge";
   ```
2. The client will send a POST request with:
   ```json
   {
     "message": "User query string",
     "history": [
       {"role": "user", "content": "..."},
       {"role": "assistant", "content": "..."}
     ]
   }
   ```
3. Your secure backend handles authentication and API keys securely, responding with:
   ```json
   {
     "reply": "Assistant response text",
     "links": [
       {"label": "View Facials", "url": "services.html#facials"}
     ]
   }
   ```
4. If the endpoint is offline or times out (12s threshold), the frontend gracefully falls back to the deterministic local rule engine.

---

## 6. Local Preview Instructions

Because this project is built entirely with vanilla web standards, it requires zero build tooling or compilers.

### Option A: Python Built-In Web Server (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000` in your web browser.

### Option B: Node.js (npx serve)
```bash
npx serve .
```
Then open the local URL displayed in the console.

### Option C: Direct File Opening
You can double-click `index.html` to open it directly in modern browsers (Chrome, Safari, Edge, Firefox). All image paths and navigation links use relative URLs.

---

## 7. Step-by-Step GitHub Pages Deployment

This repository is pre-configured for instant zero-build deployment on GitHub Pages:

1. **Create a GitHub repository:**
   - Log into [GitHub](https://github.com) and create a new repository (e.g., `atelier-beaute`).
2. **Push the project files:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete production-ready Atelier Beaute website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. **Configure Pages in Repository Settings:**
   - Open your repository on GitHub.
   - Navigate to **Settings** → **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** → **Source**, select: `Deploy from a branch`.
   - Under **Branch**, select `main` and branch folder `/(root)`.
   - Click **Save**.
4. **Publication & Verification:**
   - Wait 1–2 minutes for the GitHub Actions deployment workflow to finish.
   - Visit the live URL (e.g. `https://<username>.github.io/<repo-name>/`).
   - The `.nojekyll` file included in this repository ensures that all folders and assets are served correctly without Jekyll interference.
   - All internal links and image paths are strictly relative (`assets/images/...`, `services.html`), ensuring complete compatibility with repository subpaths.

---

## 8. Placeholder Information Requiring Owner Customization

Before launching this website for a real commercial salon business, the salon owner must customize and verify the following placeholder items:

| Location | Placeholder Item | Recommended Action |
|---|---|---|
| `contact.html`, `footer` | `[Studio Address Placeholder]` | Insert verified physical address. |
| `contact.html`, `footer` | `[Phone Placeholder]` | Insert official salon telephone number. |
| `contact.html`, `footer` | `concierge@atelierbeaute.example` | Insert live monitored email address. |
| `contact.html` | Map Placeholder Box | Replace with embedded Google Maps / Mapbox iframe or embed. |
| `booking.html`, `scripts/booking.js` | Form Submission Target | Connect to scheduling platform (Acuity, Fresha, Calendly) or form backend (Formspree, Basin). |
| `specialists.html` | Specialist Names & Bios | Replace fictional sample bios (Elena, Marc, Camille) with real licensed staff profiles. |
| `services.html`, `services.js` | Sample Prices (`$XXX`) | Confirm real service menu pricing, durations, and specific product lines. |
| `privacy.html`, `terms.html` | `[LEGAL_BUSINESS_NAME]`, policies | Replace legal entity name, specify cancellation fee policy, and review with legal counsel. |

---

## 9. Quality Assurance & Standards Compliance

- **Accessibility (WCAG 2.2 AA):**
  - Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
  - Accessible Skip Link for keyboard navigation.
  - Visible `:focus-visible` rings on all interactive elements.
  - Screen-reader accessible hamburger button with live `aria-expanded` and `aria-controls`.
  - Color contrast ratios exceed 4.5:1 for body copy against `#F7F3ED`.
  - Lightbox modal supports `Escape` key dismissal and left/right arrow navigation.
  - Date inputs enforce `min` date constraint to prevent booking past dates.
- **Performance & Core Web Vitals:**
  - Zero heavy external JavaScript frameworks.
  - Native WebP images with `.jpg` fallbacks.
  - Explicit `width` and `height` attributes on images to eliminate Cumulative Layout Shift (CLS).
  - Above-the-fold hero image marked with `fetchpriority="high"`; below-the-fold images use `loading="lazy"`.
  - CSS animations strictly leverage GPU-accelerated `transform` and `opacity` properties.
  - Respects `@media (prefers-reduced-motion: reduce)`.
