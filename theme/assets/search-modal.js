if (!customElements.get('search-modal')) {
  customElements.define(
    'search-modal',
    class SearchModal extends HTMLElement {
      connectedCallback() {
        this.panel = this.querySelector('[data-search-panel]');
        this.overlay = this.querySelector('[data-search-overlay]');
        this.input = this.querySelector('[data-search-input]');
        this.opener = null;

        var closeBtn = this.querySelector('[data-search-close]');
        if (closeBtn) closeBtn.addEventListener('click', this.close.bind(this));
        if (this.overlay) this.overlay.addEventListener('click', this.close.bind(this));

        this.onTrigger = this.onTrigger.bind(this);
        document.querySelectorAll('[data-search-open]').forEach(function (btn) {
          btn.addEventListener('click', this.onTrigger);
        }, this);

        this.onOpenEvt = function () { this.open(); }.bind(this);
        this.onKey = this.onKey.bind(this);
        document.addEventListener('search:open', this.onOpenEvt);
        document.addEventListener('keydown', this.onKey);
      }

      disconnectedCallback() {
        document.removeEventListener('search:open', this.onOpenEvt);
        document.removeEventListener('keydown', this.onKey);
      }

      onTrigger(e) {
        e.preventDefault();
        this.opener = e.currentTarget;
        this.open();
      }

      open() {
        if (!this.panel) return;
        this.panel.classList.remove('-translate-y-full');
        this.panel.classList.add('translate-y-0');
        if (this.overlay) {
          this.overlay.classList.remove('pointer-events-none', 'opacity-0');
          this.overlay.classList.add('opacity-100');
        }
        if (window.KinetikOverlay) window.KinetikOverlay.lockScroll(); else document.body.style.overflow = 'hidden';
        if (window.KinetikTrap) window.KinetikTrap.trap(this.panel);
        if (this.input) window.setTimeout(function () { this.input.focus(); }.bind(this), 60);
      }

      close() {
        if (!this.panel) return;
        this.panel.classList.add('-translate-y-full');
        this.panel.classList.remove('translate-y-0');
        if (this.overlay) {
          this.overlay.classList.add('pointer-events-none', 'opacity-0');
          this.overlay.classList.remove('opacity-100');
        }
        if (window.KinetikOverlay) window.KinetikOverlay.unlockScroll(); else document.body.style.overflow = '';
        if (window.KinetikTrap) window.KinetikTrap.release(false);
        if (this.opener) { this.opener.focus(); this.opener = null; }
      }

      isOpen() {
        return this.panel && !this.panel.classList.contains('-translate-y-full');
      }

      onKey(e) {
        if (e.key === 'Escape' && this.isOpen()) this.close();
      }
    }
  );
}
