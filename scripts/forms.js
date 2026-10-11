/**
 * ATELIER BEAUTÉ — CONTACT FORM & FAQ ACCORDION CONTROLS
 * Handles contact validation, demo modal, and accessible FAQ accordions
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initAccordions();
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const demoModal = document.getElementById('contactSuccessModal');
  const closeModalBtn = document.getElementById('closeContactModalBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const privacyCheck = document.getElementById('contactPrivacy');

    function checkField(el, condition) {
      const group = el.closest('.form-group') || el.parentElement;
      if (!condition) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
    }

    if (nameInput) checkField(nameInput, nameInput.value.trim().length > 0);
    if (emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      checkField(emailInput, emailRegex.test(emailInput.value.trim()));
    }
    if (messageInput) checkField(messageInput, messageInput.value.trim().length >= 10);
    if (privacyCheck) checkField(privacyCheck, privacyCheck.checked);

    if (!isValid) {
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    if (demoModal) {
      demoModal.classList.add('open');
      demoModal.setAttribute('aria-hidden', 'false');
      form.reset();
      if (closeModalBtn) closeModalBtn.focus();
    }
  });

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

function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Optional: close other accordions in the same group
      const parent = item.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('open');
            const sibTrigger = sibling.querySelector('.accordion-trigger');
            if (sibTrigger) sibTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
