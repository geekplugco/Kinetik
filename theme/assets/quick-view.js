class QuickViewModal extends HTMLElement {
  connectedCallback() {
    this.body = this.querySelector('[data-qv-body]');
    this.cache = new Map();
    this.pending = new Map();
    const prefetchFrom = (e) => {
      const trigger = e.target.closest && e.target.closest('[data-quick-view]');
      if (!trigger) return;
      this.prefetch(trigger.dataset.productUrl || trigger.getAttribute('href'));
    };
    document.addEventListener('pointerover', prefetchFrom, { passive: true });
    document.addEventListener('focusin', prefetchFrom);
    document.addEventListener('touchstart', prefetchFrom, { passive: true });
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

  prefetch(url) {
    if (!url) return null;
    const key = url.split('?')[0];
    if (this.cache.has(key)) return Promise.resolve(this.cache.get(key));
    if (this.pending.has(key)) return this.pending.get(key);
    const req = fetch(key + '?section_id=quick-view')
      .then((res) => {
        if (!res.ok) throw new Error('fetch failed');
        return res.text();
      })
      .then((html) => {
        this.cache.set(key, html);
        if (this.cache.size > 12) this.cache.delete(this.cache.keys().next().value);
        this.pending.delete(key);
        return html;
      })
      .catch((err) => {
        this.pending.delete(key);
        throw err;
      });
    this.pending.set(key, req);
    return req;
  }

  async open(url) {
    if (!url) return;
    const token = this.show();
    const key = url.split('?')[0];
    this.classList.remove('is-ready');
    if (this.cache.has(key)) {
      this.body.innerHTML = this.cache.get(key);
      this.classList.remove('is-loading', 'is-swapping');
      requestAnimationFrame(() => this.classList.add('is-ready'));
      const dialog = this.querySelector('[role="dialog"]') || this;
      if (window.KinetikTrap) window.KinetikTrap.trap(dialog, this.opener);
      if (dialog && dialog.focus) dialog.focus({ preventScroll: true });
      return;
    }
    this.classList.add('is-loading');
    this.body.innerHTML = '<div class="qv-skeleton" aria-live="polite" aria-busy="true"><div class="qv-skeleton-media"></div><div class="qv-skeleton-copy"><div class="qv-skeleton-line" style="width:38%"></div><div class="qv-skeleton-line" style="width:82%;height:2rem"></div><div class="qv-skeleton-line" style="width:30%"></div><div class="qv-skeleton-line" style="width:100%;margin-top:1rem"></div><div class="qv-skeleton-line" style="width:74%"></div><div class="qv-skeleton-line" style="width:100%;height:2.75rem;margin-top:1rem"></div><div class="qv-skeleton-line" style="width:56%;margin-top:1rem"></div><div class="qv-skeleton-line" style="width:44%"></div></div></div>';
    try {
      const html = await this.prefetch(url);
      if (token !== this.token) return;
      this.classList.add('is-swapping');
      await new Promise((resolve) => setTimeout(resolve, 90));
      if (token !== this.token) return;
      this.body.innerHTML = html;
      this.classList.remove('is-loading');
      requestAnimationFrame(() => {
        this.classList.remove('is-swapping');
        this.classList.add('is-ready');
      });
      const dialog = this.querySelector('[role="dialog"]') || this;
      if (window.KinetikTrap) window.KinetikTrap.trap(dialog, this.opener);
      if (dialog && dialog.focus) dialog.focus({ preventScroll: true });
    } catch (err) {
      if (token !== this.token) return;
      this.classList.remove('is-loading', 'is-swapping');
      this.classList.add('is-ready');
      this.body.innerHTML = '<div class="p-12 text-center text-sm text-text-muted">Could not load preview. <a href="' + url + '" class="underline">View product</a></div>';
    }
  }

  show() {
    this.token = (this.token || 0) + 1;
    this.closing = false;
    this.hidden = false;
    if (window.KinetikOverlay) window.KinetikOverlay.lockScroll();
    else document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => this.classList.add('is-open'));
    return this.token;
  }

  close() {
    if (this.hidden || this.closing) return;
    this.closing = true;
    const token = (this.token = (this.token || 0) + 1);
    if (window.KinetikTrap) window.KinetikTrap.release(true);
    this.classList.remove('is-open', 'is-loading', 'is-ready', 'is-swapping');
    if (window.KinetikOverlay) window.KinetikOverlay.unlockScroll();
    else document.documentElement.style.overflow = '';
    const finish = () => {
      if (token !== this.token) return;
      this.hidden = true;
      if (this.body) this.body.innerHTML = '';
      this.closing = false;
    };
    if (window.KinetikOverlay) window.KinetikOverlay.afterTransition(this, finish);
    else setTimeout(finish, 220);
  }
}
customElements.define('quick-view-modal', QuickViewModal);
