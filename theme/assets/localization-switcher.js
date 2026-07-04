if (!customElements.get('localization-switcher')) {
  customElements.define(
    'localization-switcher',
    class LocalizationSwitcher extends HTMLElement {
      connectedCallback() {
        this.onDocClick = (e) => {
          if (!this.contains(e.target)) this.closeAll();
        };
        this.onKey = (e) => {
          if (e.key === 'Escape') this.closeAll();
        };
        document.addEventListener('click', this.onDocClick);
        document.addEventListener('keydown', this.onKey);
        this.addEventListener(
          'toggle',
          (e) => {
            if (e.target.matches('details[open]')) {
              this.querySelectorAll('details[open]').forEach((d) => {
                if (d !== e.target) d.removeAttribute('open');
              });
            }
          },
          true
        );
      }

      disconnectedCallback() {
        document.removeEventListener('click', this.onDocClick);
        document.removeEventListener('keydown', this.onKey);
      }

      closeAll() {
        this.querySelectorAll('details[open]').forEach((d) => d.removeAttribute('open'));
      }
    }
  );
}
