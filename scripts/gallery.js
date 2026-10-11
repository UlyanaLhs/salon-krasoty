/**
 * ATELIER BEAUTÉ — GALLERY FILTER & ACCESSIBLE LIGHTBOX
 * Handles category filtering, image click zoom, modal dialog, and keyboard navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});

function initGallery() {
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const lightbox = document.getElementById('lightboxModal');
  if (!galleryItems.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption-text');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let activeList = galleryItems;

  // 1. Filter logic
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        activeList = galleryItems.filter(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            return true;
          } else {
            item.style.display = 'none';
            return false;
          }
        });
      });
    });
  }

  // 2. Open Lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (activeList[currentIndex]) {
      activeList[currentIndex].focus();
    }
  }

  function updateLightboxContent() {
    if (!activeList.length || currentIndex < 0 || currentIndex >= activeList.length) return;
    const item = activeList[currentIndex];
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || img?.alt || 'Atelier Beauté editorial aesthetic';

    if (img && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }
  }

  function showNext() {
    if (!activeList.length) return;
    currentIndex = (currentIndex + 1) % activeList.length;
    updateLightboxContent();
  }

  function showPrev() {
    if (!activeList.length) return;
    currentIndex = (currentIndex - 1 + activeList.length) % activeList.length;
    updateLightboxContent();
  }

  // Item clicks
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = activeList.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = activeList.indexOf(item);
        if (idx !== -1) {
          openLightbox(idx);
        }
      }
    });
  });

  // Controls
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}
