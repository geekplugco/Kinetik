if (!customElements.get('promo-popup')) {
  customElements.define(
    'promo-popup',
    class PromoPopup extends HTMLElement {
      connectedCallback() {
        this.dialog = this.querySelector('[role="dialog"]');
        this.closers = this.querySelectorAll('[data-promo-popup-close]');
        this.closers.forEach((el) => el.addEventListener('click', () => this.close()));
        this.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') this.close();
        });

        if (this.shouldShow()) {
          const delay = Number(this.dataset.delay || 4) * 1000;
          this.timer = window.setTimeout(() => this.open(), delay);
        }
      }

      storageKey() {
        return 'kx-promo-popup:' + this.dataset.key;
      }

      shouldShow() {
        const frequency = this.dataset.frequency;
        const raw = window.localStorage.getItem(this.storageKey());
        if (!raw) return true;
        if (frequency === 'once') return false;
        const dismissedAt = Number(raw);
        if (!dismissedAt) return true;
        if (frequency === 'session') return !window.sessionStorage.getItem(this.storageKey());
        if (frequency === 'day') return Date.now() - dismissedAt > 24 * 60 * 60 * 1000;
        return true;
      }

      open() {
        this.hidden = false;
        if (window.KinetikOverlay) window.KinetikOverlay.lockScroll();
        requestAnimationFrame(() => this.classList.add('is-open'));
        if (window.KinetikTrap && this.dialog) window.KinetikTrap.trap(this.dialog, document.activeElement);
        if (this.dialog) this.dialog.focus();
      }

      close() {
        window.localStorage.setItem(this.storageKey(), String(Date.now()));
        window.sessionStorage.setItem(this.storageKey(), '1');
        window.clearTimeout(this.timer);
        this.classList.remove('is-open');
        if (window.KinetikTrap) window.KinetikTrap.release(true);
        const finish = () => {
          this.hidden = true;
          if (window.KinetikOverlay) window.KinetikOverlay.unlockScroll();
        };
        if (window.KinetikOverlay) window.KinetikOverlay.afterTransition(this, finish);
        else finish();
      }
    }
  );
}
