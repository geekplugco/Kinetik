class QuickViewModal extends HTMLElement {
  connectedCallback() {
    this.body = this.querySelector('[data-qv-body]');
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-quick-view]');
      if (!trigger) return;
      e.preventDefault();
      this.opener = trigger;
      this.open(trigger.dataset.productUrl || trigger.getAttribute('href'));
    });
    this.addEventListener('click', (e) => {
      if (e.target === this || (e.target.closest && e.target.closest('[data-qv-close]'))) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.hidden) this.close();
    });
    document.addEventListener('cart:added', () => { if (!this.hidden) this.close(); });
  }

  async open(url) {
    if (!url) return;
    this.show();
    this.body.innerHTML = '<div class="p-12 text-center font-mono text-xs uppercase tracking-label text-text-muted">Loading…</div>';
    try {
      const base = url.split('?')[0];
      const res = await fetch(base + '?section_id=quick-view');
      if (!res.ok) throw new Error('fetch failed');
      this.body.innerHTML = await res.text();
      const dialog = this.querySelector('[role="dialog"]') || this;
      if (window.KinetikTrap) window.KinetikTrap.trap(dialog, this.opener);
      const focusable = this.body.querySelector('input, button, a');
      if (focusable) focusable.focus();
    } catch (err) {
      this.body.innerHTML = '<div class="p-12 text-center text-sm text-text-muted">Could not load preview. <a href="' + url + '" class="underline">View product</a></div>';
    }
  }

  show() {
    this.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => this.classList.add('is-open'));
  }

  close() {
    if (window.KinetikTrap) window.KinetikTrap.release(true);
    this.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    setTimeout(() => { this.hidden = true; if (this.body) this.body.innerHTML = ''; }, 200);
  }
}
customElements.define('quick-view-modal', QuickViewModal);
