if (!customElements.get('collection-facets')) {
  customElements.define(
    'collection-facets',
    class CollectionFacets extends HTMLElement {
      connectedCallback() {
        this.form = this.querySelector('[data-facet-form]');
        this.panel = this.querySelector('[data-facet-panel]');
        this.overlay = this.querySelector('[data-facet-overlay]');
        this.openers = Array.from(this.querySelectorAll('[data-facet-open]'));
        this.closers = Array.from(this.querySelectorAll('[data-facet-close]'));
        this.opener = null;

        this.openers.forEach((button) => button.addEventListener('click', this.open.bind(this)));
        this.closers.forEach((button) => button.addEventListener('click', this.close.bind(this)));
        if (this.overlay) this.overlay.addEventListener('click', this.close.bind(this));

        this.querySelectorAll('[data-sort]').forEach((select) => {
          select.addEventListener('change', () => {
            if (this.form) this.form.submit();
          });
        });

        this.querySelectorAll('input[type="checkbox"]').forEach((input) => {
          input.addEventListener('change', () => {
            if (window.matchMedia('(min-width: 750px)').matches && this.form) this.form.submit();
          });
        });

        this.onKey = this.onKey.bind(this);
        document.addEventListener('keydown', this.onKey);
      }

      disconnectedCallback() {
        document.removeEventListener('keydown', this.onKey);
      }

      open(event) {
        if (!this.panel) return;
        this.opener = event.currentTarget;
        this.panel.classList.remove('-translate-x-full');
        this.panel.classList.add('translate-x-0');
        if (this.overlay) {
          this.overlay.classList.remove('pointer-events-none', 'opacity-0');
          this.overlay.classList.add('opacity-100');
        }
        if (window.KinetikOverlay) window.KinetikOverlay.lockScroll(); else document.body.style.overflow = 'hidden';
        if (window.KinetikTrap) window.KinetikTrap.trap(this.panel);
        const close = this.panel.querySelector('[data-facet-close]');
        if (close) close.focus();
      }

      close() {
        if (!this.panel) return;
        this.panel.classList.add('-translate-x-full');
        this.panel.classList.remove('translate-x-0');
        if (this.overlay) {
          this.overlay.classList.add('pointer-events-none', 'opacity-0');
          this.overlay.classList.remove('opacity-100');
        }
        if (window.KinetikOverlay) window.KinetikOverlay.unlockScroll(); else document.body.style.overflow = '';
        if (window.KinetikTrap) window.KinetikTrap.release(false);
        if (this.opener) {
          this.opener.focus();
          this.opener = null;
        }
      }

      isOpen() {
        return this.panel && !this.panel.classList.contains('-translate-x-full');
      }

      onKey(event) {
        if (event.key === 'Escape' && this.isOpen()) this.close();
      }
    }
  );
}
