/**
 * ATELIER BEAUTÉ — AI BEAUTY CONCIERGE
 * Static-first, Deterministic Rule-Based Demo + Production Backend Endpoint Bridge
 * Zero API keys exposed, Safe DOM Rendering, WCAG Accessible
 */

(function() {
  // Configuration: Set this window variable in production to forward messages to your secure backend
  window.ATELIER_AI_ENDPOINT = window.ATELIER_AI_ENDPOINT || null;

  const KNOWLEDGE_BASE = [
    {
      keywords: ["facial", "skin", "skincare", "glow", "cellular", "lymphatic", "acne", "peeling"],
      title: "Facial Treatments",
      text: "We offer three signature facial rituals designed around skin health:\n• Atelier Signature Cellular Facial (75 min, sample price $175): enzyme exfoliation, peptide infusion, and sculpting massage.\n• Sculpting Lymphatic Facial (60 min, sample price $145): manual tension release, depuffing, and contour definition.\n• Deep Hydration & Peptide Infusion (60 min, sample price $150): intensive moisture restoration for fatigued barriers.\n\nAll pricing is illustrative. Please note we do not diagnose medical skin conditions.",
      links: [
        { label: "View Facial Services", url: "services.html#facials" },
        { label: "Request Appointment", url: "booking.html?service=signature-cellular-facial" }
      ]
    },
    {
      keywords: ["hair", "cut", "color", "balayage", "blowout", "blonde", "scalp", "style"],
      title: "Hair Styling & Color",
      text: "Our hair artistry focuses on natural movement and strand health:\n• Editorial Cut & Blowout (75 min, sample price $130): tailored precision shaping and finish.\n• Bespoke Botanical Balayage (180 min, sample price $260): hand-painted dimensional color.\n• Intensive Scalp & Strand Therapy (60 min, sample price $110): micro-exfoliation and botanical steam.",
      links: [
        { label: "Explore Hair Services", url: "services.html#hair" },
        { label: "Hair Appointment", url: "booking.html?service=editorial-cut-blowout" }
      ]
    },
    {
      keywords: ["nail", "manicure", "pedicure", "hands", "feet", "gel", "polish"],
      title: "Nail Care & Rituals",
      text: "We emphasize natural nail bed integrity and understated elegance:\n• Essential Editorial Manicure (50 min, sample price $65): dry cuticle alignment, shaping, massage, and 10-free polish.\n• Restorative Spa Pedicure (65 min, sample price $85): herbal soak, sea salt scrub, and quartz smoothing.",
      links: [
        { label: "View Nail Services", url: "services.html#nails" },
        { label: "Book Manicure", url: "booking.html?service=essential-editorial-manicure" }
      ]
    },
    {
      keywords: ["makeup", "bride", "bridal", "event", "evening", "wedding"],
      title: "Makeup Artistry",
      text: "Our makeup artistry enhances your innate facial structure without heavy masking:\n• Haute Couture Evening Makeup (75 min, sample price $140): bespoke complexion design and individual lashes.\n• Natural Radiant Bridal Makeup (90 min, sample price $190): long-wearing, camera-tested elegance.",
      links: [
        { label: "Makeup Catalog", url: "services.html#makeup" },
        { label: "Bridal Inquiry", url: "booking.html?service=natural-radiant-bridal-makeup" }
      ]
    },
    {
      keywords: ["brow", "brows", "lash", "lashes", "tint", "lift", "lamination"],
      title: "Brows & Lashes",
      text: "Architectural framing that highlights your eyes naturally:\n• Architectural Brow Sculpt & Tint (45 min, sample price $55): customized facial measurement, tint, and precision shaping.\n• Keratin Lash Lift & Nourishing Glaze (60 min, sample price $95): gentle curl enhancement and deep obsidian glaze.",
      links: [
        { label: "Browse Brow & Lash", url: "services.html#brows" },
        { label: "Book Brow Sculpt", url: "booking.html?service=architectural-brow-sculpt-tint" }
      ]
    },
    {
      keywords: ["ritual", "package", "signature", "experience", "gift", "serenity"],
      title: "Signature Beauty Rituals",
      text: "For holistic renewal, we offer dedicated multi-service rituals:\n• The Atelier Signature Ritual (180 min, sample price $320): includes our Cellular Facial, Scalp Therapy, and Editorial Manicure in a private suite.\n• The Serenity Glow Reset (90 min, sample price $195): Deep Hydration Facial paired with hand reflexology.",
      links: [
        { label: "View All Rituals", url: "services.html#rituals" },
        { label: "Request Signature Ritual", url: "booking.html?service=the-atelier-signature-ritual" }
      ]
    },
    {
      keywords: ["prep", "prepare", "preparation", "before", "visit", "arrive"],
      title: "Preparing for Your Visit",
      text: "To ensure the best experience:\n• Facials: Please pause active retinol or chemical exfoliants 48 hours prior.\n• Hair Color: Avoid washing hair on the day of coloring to retain natural scalp oils.\n• Nails: Please inform us in advance if acrylic or hard gel removal is needed.\n• General: Arrive 10 minutes early to enjoy our quiet lounge and welcome herbal tea.",
      links: [
        { label: "Our Studio Philosophy", url: "about.html" },
        { label: "Request Appointment", url: "booking.html" }
      ]
    },
    {
      keywords: ["book", "booking", "appointment", "reserve", "schedule", "how to"],
      title: "How Appointment Requests Work",
      text: "You can submit an appointment request directly through our online Booking page. You'll specify your desired treatment, preferred specialist, date, and time window. Our reception team contacts you promptly to confirm availability and finalize your reservation. Note that web submissions represent appointment requests, not instant confirmed slots.",
      links: [
        { label: "Go to Booking Page", url: "booking.html" }
      ]
    },
    {
      keywords: ["specialist", "specialists", "team", "who", "master", "aesthetician", "stylist", "elena", "marc", "camille"],
      title: "Atelier Specialists",
      text: "Our studio brings together dedicated master practitioners:\n• Elena Rostova — Master Aesthetician & Skin Health Specialist\n• Marc Laurent — Creative Hair Director & Colorist\n• Camille Moreau — Senior Makeup Artist & Brow Architect\n\n(Note: Specialist profiles are fictional demonstration placeholders for this project).",
      links: [
        { label: "Meet the Specialists", url: "specialists.html" }
      ]
    },
    {
      keywords: ["price", "cost", "sample price", "expensive", "how much"],
      title: "Sample Pricing Guide",
      text: "All pricing on our website is illustrative and sample-based:\n• Brow & Lash: from $55\n• Manicure & Pedicure: $65 – $85\n• Hair Styling: $110 – $260\n• Facials: $145 – $175\n• Signature Packages: $195 – $320\n\nFinal prices are confirmed by the studio during consultation.",
      links: [
        { label: "View Full Price List", url: "services.html" }
      ]
    },
    {
      keywords: ["doctor", "medical", "dermatology", "rash", "botox", "filler", "surgery", "cure", "heal"],
      title: "Cosmetic & Health Guidance Notice",
      text: "Atelier Beauté provides cosmetic wellness and aesthetic services, not medical care. We cannot diagnose skin conditions, prescribe pharmaceuticals, or guarantee clinical outcomes. For medical, dermatological, or health concerns, we always recommend consulting a qualified board-certified healthcare professional.",
      links: [
        { label: "View Studio Standards", url: "about.html" },
        { label: "Contact Studio", url: "contact.html" }
      ]
    },
    {
      keywords: ["hours", "open", "address", "location", "where", "phone", "contact"],
      title: "Studio Hours & Location",
      text: "Atelier Beauté is situated in a calm, contemporary studio setting. Demonstration hours:\n• Tuesday – Friday: 09:30 – 19:30\n• Saturday: 09:00 – 18:00\n• Sunday & Monday: Closed for private preparation.\n\nAll contact details and address references are demonstration placeholders.",
      links: [
        { label: "View Contact Details", url: "contact.html" }
      ]
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initAiConcierge();
  });

  function initAiConcierge() {
    const launcherBtn = document.querySelector('.ai-launcher-btn');
    const chatWindow = document.querySelector('.ai-chat-window');
    const closeBtn = document.querySelector('.ai-chat-close-btn');
    const messagesContainer = document.querySelector('.ai-chat-messages');
    const inputForm = document.querySelector('.ai-chat-input-form');
    const chatInput = document.querySelector('.ai-chat-input');
    const promptChips = document.querySelectorAll('.ai-prompt-chip');

    if (!launcherBtn || !chatWindow || !messagesContainer) return;

    let isOpen = false;
    let messageHistory = [];

    function toggleChat(forceOpen) {
      isOpen = typeof forceOpen === 'boolean' ? forceOpen : !isOpen;
      if (isOpen) {
        chatWindow.classList.add('open');
        chatWindow.setAttribute('aria-hidden', 'false');
        launcherBtn.setAttribute('aria-expanded', 'true');
        if (chatInput) chatInput.focus();
        scrollToBottom();
      } else {
        chatWindow.classList.remove('open');
        chatWindow.setAttribute('aria-hidden', 'true');
        launcherBtn.setAttribute('aria-expanded', 'false');
        launcherBtn.focus();
      }
    }

    launcherBtn.addEventListener('click', () => toggleChat());
    if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat(false);
      }
    });

    // Handle Quick Prompt Chips
    if (promptChips.length) {
      promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const text = chip.getAttribute('data-prompt') || chip.textContent.trim();
          handleUserMessage(text);
        });
      });
    }

    // Handle Form Submit
    if (inputForm && chatInput) {
      inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        handleUserMessage(text);
      });
    }

    // Main Message Processing Pipeline
    function handleUserMessage(userText) {
      appendMessage('user', userText);
      messageHistory.push({ role: 'user', content: userText });

      // Show typing indicator
      const typingEl = showTypingIndicator();
      scrollToBottom();

      // Check if Production Endpoint is configured
      if (window.ATELIER_AI_ENDPOINT) {
        forwardToBackend(userText, typingEl);
      } else {
        // Run deterministic rule engine
        setTimeout(() => {
          removeTypingIndicator(typingEl);
          const response = generateLocalResponse(userText);
          appendBotResponse(response);
          messageHistory.push({ role: 'assistant', content: response.text });
        }, 550);
      }
    }

    function forwardToBackend(prompt, typingEl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      fetch(window.ATELIER_AI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, history: messageHistory }),
        signal: controller.signal
      })
      .then(res => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        removeTypingIndicator(typingEl);
        const reply = data.reply || data.message || "Thank you for inquiring. Our concierge is at your service.";
        appendBotResponse({ text: reply, links: data.links || [] });
        messageHistory.push({ role: 'assistant', content: reply });
      })
      .catch(err => {
        clearTimeout(timeoutId);
        console.warn('Backend AI endpoint unavailable, falling back to local engine:', err);
        removeTypingIndicator(typingEl);
        const fallback = generateLocalResponse(prompt);
        appendBotResponse(fallback);
      });
    }

    // Safe Deterministic Engine
    function generateLocalResponse(query) {
      const q = query.toLowerCase();

      // Check for greeting
      if (q.includes('hello') || q.includes('hi') || q.includes('good morning') || q.includes('hey')) {
        return {
          title: "Welcome to Atelier Beauté",
          text: "Hello! I am your Atelier AI Concierge. I can help you explore our facials, hair styling, nails, makeup, brow sculpts, and signature rituals. What would you like to discover today?",
          links: [
            { label: "Explore Services", url: "services.html" },
            { label: "Request Appointment", url: "booking.html" }
          ]
        };
      }

      // Check matching entry in knowledge base
      let bestMatch = null;
      let highestScore = 0;

      for (const item of KNOWLEDGE_BASE) {
        let score = 0;
        for (const kw of item.keywords) {
          if (q.includes(kw)) {
            score++;
          }
        }
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }

      if (bestMatch && highestScore > 0) {
        return {
          title: bestMatch.title,
          text: bestMatch.text,
          links: bestMatch.links || []
        };
      }

      // Fallback for unmatched query
      return {
        title: "Atelier Concierge Guidance",
        text: "I want to be transparent: in this demonstration mode, I don't have verified information regarding that specific question. However, you can explore our complete treatment catalog, meet our specialists, or submit an appointment request for a bespoke consultation.",
        links: [
          { label: "View Service Catalog", url: "services.html" },
          { label: "Contact Our Studio", url: "contact.html" }
        ]
      };
    }

    // Safe DOM Message Appenders
    function appendMessage(sender, text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${sender}`;

      const bubbleDiv = document.createElement('div');
      bubbleDiv.className = 'msg-bubble';
      bubbleDiv.textContent = text; // Safe textContent to prevent XSS

      const timeDiv = document.createElement('span');
      timeDiv.className = 'msg-time';
      const now = new Date();
      timeDiv.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      msgDiv.appendChild(bubbleDiv);
      msgDiv.appendChild(timeDiv);
      messagesContainer.appendChild(msgDiv);
      scrollToBottom();
    }

    function appendBotResponse(resObj) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-msg bot';

      const bubbleDiv = document.createElement('div');
      bubbleDiv.className = 'msg-bubble';

      if (resObj.title) {
        const titleEl = document.createElement('div');
        titleEl.style.fontWeight = '600';
        titleEl.style.marginBottom = '6px';
        titleEl.style.fontFamily = 'var(--font-serif)';
        titleEl.style.fontSize = '0.98rem';
        titleEl.textContent = resObj.title;
        bubbleDiv.appendChild(titleEl);
      }

      // Handle multiline text safely
      const paragraphs = resObj.text.split('\n');
      paragraphs.forEach((pText, i) => {
        if (pText.trim()) {
          const pEl = document.createElement('p');
          pEl.style.margin = i === 0 ? '0' : '6px 0 0 0';
          pEl.style.fontSize = '0.86rem';
          pEl.style.lineHeight = '1.45';
          pEl.textContent = pText;
          bubbleDiv.appendChild(pEl);
        }
      });

      // Append safe actionable links if present
      if (resObj.links && resObj.links.length) {
        const linksContainer = document.createElement('div');
        linksContainer.style.display = 'flex';
        linksContainer.style.flexWrap = 'wrap';
        linksContainer.style.gap = '6px';
        linksContainer.style.marginTop = '10px';

        resObj.links.forEach(lnk => {
          const a = document.createElement('a');
          a.href = lnk.url;
          a.textContent = `${lnk.label} →`;
          a.style.display = 'inline-block';
          a.style.fontSize = '0.76rem';
          a.style.fontWeight = '600';
          a.style.padding = '3px 8px';
          a.style.backgroundColor = 'var(--color-porcelain)';
          a.style.borderRadius = 'var(--radius-pill)';
          a.style.textDecoration = 'none';
          a.style.color = 'var(--color-espresso)';
          linksContainer.appendChild(a);
        });

        bubbleDiv.appendChild(linksContainer);
      }

      const timeDiv = document.createElement('span');
      timeDiv.className = 'msg-time';
      const now = new Date();
      timeDiv.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      msgDiv.appendChild(bubbleDiv);
      msgDiv.appendChild(timeDiv);
      messagesContainer.appendChild(msgDiv);
      scrollToBottom();
    }

    function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg bot typing';

      const bubbleDiv = document.createElement('div');
      bubbleDiv.className = 'msg-bubble typing-indicator';
      bubbleDiv.setAttribute('aria-label', 'AI Concierge is typing…');

      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.className = 'typing-dot';
        bubbleDiv.appendChild(dot);
      }

      typingDiv.appendChild(bubbleDiv);
      messagesContainer.appendChild(typingDiv);
      return typingDiv;
    }

    function removeTypingIndicator(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }

    function scrollToBottom() {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
})();
