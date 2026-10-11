/**
 * ATELIER BEAUTÉ — APPOINTMENT REQUEST & BOOKING DEMO LOGIC
 * Safe client-side validation, date restrictions, dynamic service binding, demo modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingForm();
});

function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const categorySelect = document.getElementById('serviceCategory');
  const serviceSelect = document.getElementById('specificService');
  const dateInput = document.getElementById('preferredDate');
  const specialistSelect = document.getElementById('preferredSpecialist');
  const demoModal = document.getElementById('bookingSuccessModal');
  const closeModalBtn = document.getElementById('closeBookingModalBtn');
  const modalSummary = document.getElementById('bookingModalSummary');

  // 1. Prevent past dates
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // 2. Populate service options based on category
  function updateServiceOptions(selectedCat, preselectedServiceId) {
    if (!serviceSelect) return;
    serviceSelect.innerHTML = '<option value="">Select a specific treatment…</option>';

    if (!window.AtelierServices) return;
    const services = selectedCat && selectedCat !== 'all' 
      ? window.AtelierServices.getByCategory(selectedCat)
      : window.AtelierServices.getAll();

    services.forEach(srv => {
      const opt = document.createElement('option');
      opt.value = srv.id;
      opt.textContent = `${srv.name} (${srv.duration} — ${srv.priceSample})`;
      if (preselectedServiceId && srv.id.toLowerCase() === preselectedServiceId.toLowerCase()) {
        opt.selected = true;
      }
      serviceSelect.appendChild(opt);
    });
  }

  // Handle URL query parameters for pre-filling (?service=... or ?specialist=...)
  const urlParams = new URLSearchParams(window.location.search);
  const paramService = urlParams.get('service');
  const paramSpecialist = urlParams.get('specialist');

  if (window.AtelierServices && paramService) {
    const matchedService = window.AtelierServices.getById(paramService);
    if (matchedService) {
      if (categorySelect) categorySelect.value = matchedService.categorySlug;
      updateServiceOptions(matchedService.categorySlug, matchedService.id);
    } else {
      updateServiceOptions(categorySelect ? categorySelect.value : '');
    }
  } else {
    updateServiceOptions(categorySelect ? categorySelect.value : '');
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      updateServiceOptions(categorySelect.value);
    });
  }

  if (paramSpecialist && specialistSelect) {
    specialistSelect.value = paramSpecialist;
  }

  // 3. Form Validation and Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('clientName');
    const emailInput = document.getElementById('clientEmail');
    const privacyCheckbox = document.getElementById('privacyConsent');

    // Helper to toggle error
    function setError(inputEl, hasErr) {
      const group = inputEl.closest('.form-group') || inputEl.parentElement;
      if (hasErr) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
    }

    // Name check
    if (!nameInput.value.trim()) {
      setError(nameInput, true);
    } else {
      setError(nameInput, false);
    }

    // Email check (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, true);
    } else {
      setError(emailInput, false);
    }

    // Service check
    if (serviceSelect && !serviceSelect.value) {
      setError(serviceSelect, true);
    } else if (serviceSelect) {
      setError(serviceSelect, false);
    }

    // Date check
    if (dateInput && !dateInput.value) {
      setError(dateInput, true);
    } else if (dateInput) {
      setError(dateInput, false);
    }

    // Privacy checkbox check
    if (privacyCheckbox && !privacyCheckbox.checked) {
      setError(privacyCheckbox, true);
    } else if (privacyCheckbox) {
      setError(privacyCheckbox, false);
    }

    if (!isValid) {
      // Focus first error field for accessibility
      const firstError = form.querySelector('.has-error input, .has-error select');
      if (firstError) firstError.focus();
      return;
    }

    // Show safe demo confirmation modal
    if (demoModal && modalSummary) {
      const selectedServiceName = serviceSelect.options[serviceSelect.selectedIndex]?.text || 'Bespoke Consultation';
      const specialistName = specialistSelect?.options[specialistSelect.selectedIndex]?.text || 'First Available Specialist';
      const timeWindow = document.getElementById('preferredTime')?.value || 'Morning Window';

      modalSummary.innerHTML = `
        <div style="font-size: 0.92rem; line-height: 1.6; color: var(--color-text-secondary);">
          <p><strong>Client:</strong> ${escapeHtml(nameInput.value)} (${escapeHtml(emailInput.value)})</p>
          <p><strong>Treatment Requested:</strong> ${escapeHtml(selectedServiceName)}</p>
          <p><strong>Preferred Specialist:</strong> ${escapeHtml(specialistName)}</p>
          <p><strong>Requested Date & Window:</strong> ${escapeHtml(dateInput.value)} (${escapeHtml(timeWindow)})</p>
        </div>
      `;

      demoModal.classList.add('open');
      demoModal.setAttribute('aria-hidden', 'false');
      form.reset();
      if (closeModalBtn) closeModalBtn.focus();
    }
  });

  // Modal close handlers
  if (closeModalBtn && demoModal) {
    closeModalBtn.addEventListener('click', () => {
      demoModal.classList.remove('open');
      demoModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('open');
        demoModal.setAttribute('aria-hidden', 'true');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && demoModal.classList.contains('open')) {
        demoModal.classList.remove('open');
        demoModal.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

// Security: Prevent XSS in safe preview rendering
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
