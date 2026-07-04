class ProductGallery extends HTMLElement {
  connectedCallback() {
    this.main = this.querySelector('[data-gallery-main]');
    this.mainImg = this.main && this.main.querySelector('img');
    this.thumbs = Array.from(this.querySelectorAll('[data-gallery-thumb]'));
    this.dots = Array.from(this.querySelectorAll('[data-gallery-dot]'));
    this.caption = this.querySelector('[data-gallery-caption]');
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!this.main || !this.mainImg) return;
    this.index = 0;

    this.thumbs.forEach((t, i) => t.addEventListener('click', () => this.select(i)));
    this.dots.forEach((d, i) => d.addEventListener('click', () => this.select(i)));
    this.initLightbox();

    this.main.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { this.step(-1); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { this.step(1); e.preventDefault(); }
    });
    this.addSwipe();

    if (this.dataset.zoom === 'true' && !this.reduce) this.initZoom();

    this.onVariant = (e) => {
      const v = e.detail && e.detail.variant;
      if (!v) return;
      let idx = 0;
      if (v.featured_media_id) {
        const found = this.thumbs.findIndex((t) => t.dataset.mediaId === String(v.featured_media_id));
        if (found >= 0) idx = found;
      }
      this.select(idx);
    };
    document.addEventListener('variant:change', this.onVariant);
  }

  disconnectedCallback() {
    document.removeEventListener('variant:change', this.onVariant);
  }

  ref(i) {
    return this.thumbs[i] || this.dots[i];
  }

  select(i) {
    if (i < 0 || i >= (this.thumbs.length || this.dots.length)) return;
    this.index = i;
    const t = this.ref(i);
    const src = t && t.dataset.img;
    if (src && window.KinetikMedia) window.KinetikMedia.swap(this.mainImg, src);
    else if (src) this.mainImg.setAttribute('src', src);

    this.thumbs.forEach((th, j) => {
      const on = j === i;
      th.classList.toggle('border-border-strong', on);
      th.classList.toggle('border-border-hairline', !on);
      th.setAttribute('aria-current', on ? 'true' : 'false');
    });
    this.dots.forEach((d, j) => {
      const on = j === i;
      const dot = d.querySelector('span') || d;
      dot.classList.toggle('bg-border-strong', on);
      dot.classList.toggle('bg-transparent', !on);
      d.setAttribute('aria-current', on ? 'true' : 'false');
    });
    if (this.caption && t) this.caption.textContent = t.dataset.alt || '';
    if (this.lightbox && !this.lightbox.hidden) this.renderLightbox(i);
  }

  step(dir) {
    const n = this.thumbs.length || this.dots.length;
    this.select(Math.min(n - 1, Math.max(0, this.index + dir)));
  }

  initLightbox() {
    this.lightbox = document.querySelector('[data-lightbox]');
    if (!this.lightbox) return;
    this.lbImg = this.lightbox.querySelector('[data-lightbox-img]');
    this.lbCaption = this.lightbox.querySelector('[data-lightbox-caption]');
    const expandBtn = this.querySelector('[data-gallery-expand]');
    if (expandBtn) expandBtn.addEventListener('click', () => this.openLightbox(this.index));
    this.lightbox.querySelector('[data-lightbox-close]').addEventListener('click', () => this.closeLightbox());
    this.lightbox.querySelector('[data-lightbox-prev]').addEventListener('click', () => this.lightboxStep(-1));
    this.lightbox.querySelector('[data-lightbox-next]').addEventListener('click', () => this.lightboxStep(1));
    this.lightbox.addEventListener('click', (e) => { if (e.target === this.lightbox) this.closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (this.lightbox.hidden) return;
      if (e.key === 'Escape') this.closeLightbox();
      else if (e.key === 'ArrowLeft') this.lightboxStep(-1);
      else if (e.key === 'ArrowRight') this.lightboxStep(1);
    });
  }

  openLightbox(i) {
    if (!this.lightbox) return;
    this.lightbox.hidden = false;
    if (window.KinetikOverlay) window.KinetikOverlay.lockScroll();
    else document.documentElement.style.overflow = 'hidden';
    this.renderLightbox(i);
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.hidden = true;
    if (window.KinetikOverlay) window.KinetikOverlay.unlockScroll();
    else document.documentElement.style.overflow = '';
  }

  lightboxStep(dir) {
    const n = this.thumbs.length || this.dots.length;
    const next = ((this.index + dir) % n + n) % n;
    this.select(next);
    this.renderLightbox(next);
  }

  renderLightbox(i) {
    const t = this.ref(i);
    if (!t || !this.lbImg) return;
    this.lbImg.setAttribute('src', t.dataset.img);
    this.lbImg.setAttribute('alt', t.dataset.alt || '');
    if (this.lbCaption) this.lbCaption.textContent = t.dataset.alt || '';
  }

  addSwipe() {
    let x0 = null;
    this.main.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    this.main.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) this.step(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  initZoom() {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const img = () => this.main.querySelector('img');
    if (fine) {
      this.main.classList.add('cursor-zoom-in');
      this.main.addEventListener('mousemove', (e) => {
        const el = img();
        if (!el) return;
        const r = this.main.getBoundingClientRect();
        el.style.transformOrigin = ((e.clientX - r.left) / r.width) * 100 + '% ' + ((e.clientY - r.top) / r.height) * 100 + '%';
      });
      this.main.addEventListener('mouseenter', () => { const el = img(); if (el) el.style.transform = 'scale(1.8)'; });
      this.main.addEventListener('mouseleave', () => { const el = img(); if (el) el.style.transform = ''; });
    } else {
      this.main.addEventListener('click', (e) => {
        const el = img();
        if (!el) return;
        if (el.style.transform) { el.style.transform = ''; return; }
        const r = this.main.getBoundingClientRect();
        el.style.transformOrigin = ((e.clientX - r.left) / r.width) * 100 + '% ' + ((e.clientY - r.top) / r.height) * 100 + '%';
        el.style.transform = 'scale(2)';
      });
    }
  }
}
customElements.define('product-gallery', ProductGallery);
