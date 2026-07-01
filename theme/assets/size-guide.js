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
        this.token = (this.token || 0) + 1;
        this.modal.hidden = false;
        if (window.KinetikOverlay) window.KinetikOverlay.lockScroll();
        else document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => this.modal.classList.add('is-open'));
        this.opener.setAttribute('aria-expanded', 'true');
        document.addEventListener('keydown', this.onKey);
        if (window.KinetikTrap) window.KinetikTrap.trap(this.panel || this.modal, this.opener);
      }

      close() {
        if (this.modal.hidden) return;
        const token = (this.token = (this.token || 0) + 1);
        this.modal.classList.remove('is-open');
        if (window.KinetikOverlay) window.KinetikOverlay.unlockScroll();
        else document.body.style.overflow = '';
        this.opener.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', this.onKey);
        if (window.KinetikTrap) window.KinetikTrap.release(true);
        else this.opener.focus();
        const finish = () => {
          if (token !== this.token) return;
          this.modal.hidden = true;
        };
        if (window.KinetikOverlay) window.KinetikOverlay.afterTransition(this.modal, finish);
        else setTimeout(finish, 320);
      }

      onKey(e) {
        if (e.key === 'Escape') this.close();
      }
    }
  );
}
