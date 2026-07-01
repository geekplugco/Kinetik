if (!customElements.get('use-modes')) {
  customElements.define(
    'use-modes',
    class UseModes extends HTMLElement {
      connectedCallback() {
        this.tabs = Array.from(this.querySelectorAll('[data-mode-tab]'));
        this.panels = Array.from(this.querySelectorAll('[data-mode-panel]'));
        if (!this.tabs.length) return;
        this.tabs.forEach((tab, i) => {
          tab.addEventListener('click', () => this.select(i));
          tab.addEventListener('keydown', (e) => this.onKey(e, i));
        });
      }

      select(index) {
        this.tabs.forEach((tab, i) => {
          const on = i === index;
          tab.setAttribute('aria-selected', on ? 'true' : 'false');
          tab.tabIndex = on ? 0 : -1;
          if (this.panels[i]) this.panels[i].hidden = !on;
        });
      }

      onKey(e, i) {
        let next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % this.tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + this.tabs.length) % this.tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = this.tabs.length - 1;
        if (next === null) return;
        e.preventDefault();
        this.select(next);
        this.tabs[next].focus();
      }
    }
  );
}
