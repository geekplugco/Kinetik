if (!customElements.get('size-guide')) {
  customElements.define(
    'size-guide',
    class SizeGuide extends HTMLElement {
      connectedCallback() {
        this.modal = this.querySelector('[data-size-guide-modal]');
        this.panel = this.querySelector('[role="dialog"]');
        this.opener = this.querySelector('[data-size-guide-open]');
        if (!this.modal || !this.opener) return;

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onKey = this.onKey.bind(this);

        this.opener.addEventListener('click', this.open);
        this.querySelectorAll('[data-size-guide-close]').forEach((el) => el.addEventListener('click', this.close));
      }

      open() {
        this.modal.hidden = false;
        document.body.style.overflow = 'hidden';
        this.opener.setAttribute('aria-expanded', 'true');
        document.addEventListener('keydown', this.onKey);
        if (window.KinetikTrap) window.KinetikTrap.trap(this.panel || this.modal, this.opener);
      }

      close() {
        this.modal.hidden = true;
        document.body.style.overflow = '';
        this.opener.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', this.onKey);
        if (window.KinetikTrap) window.KinetikTrap.release(true);
        else this.opener.focus();
      }

      onKey(e) {
        if (e.key === 'Escape') this.close();
      }
    }
  );
}
