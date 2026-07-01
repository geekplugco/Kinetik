if (!customElements.get('look-book')) {
  customElements.define(
    'look-book',
    class LookBook extends HTMLElement {
      connectedCallback() {
        this.items = Array.from(this.querySelectorAll('[data-hotspot-item]'));
        this.onDocClick = this.onDocClick.bind(this);
        this.onKey = this.onKey.bind(this);

        this.items.forEach(function (item) {
          var btn = item.querySelector('[data-hotspot]');
          if (btn) btn.addEventListener('click', this.toggle.bind(this, item, btn));
        }, this);

        document.addEventListener('click', this.onDocClick);
        this.addEventListener('keydown', this.onKey);
      }

      disconnectedCallback() {
        document.removeEventListener('click', this.onDocClick);
      }

      open(item, btn) {
        var tip = item.querySelector('[data-tip]');
        if (!tip) return;
        tip.classList.remove('opacity-0', 'translate-y-1', 'pointer-events-none');
        tip.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        btn.setAttribute('aria-expanded', 'true');
        item.dataset.open = 'true';
      }

      close(item) {
        var tip = item.querySelector('[data-tip]');
        var btn = item.querySelector('[data-hotspot]');
        if (!tip) return;
        tip.classList.add('opacity-0', 'translate-y-1', 'pointer-events-none');
        tip.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        delete item.dataset.open;
      }

      closeAll(except) {
        this.items.forEach(function (item) {
          if (item !== except) this.close(item);
        }, this);
      }

      toggle(item, btn, e) {
        e.preventDefault();
        e.stopPropagation();
        if (item.dataset.open === 'true') {
          this.close(item);
        } else {
          this.closeAll(item);
          this.open(item, btn);
        }
      }

      onDocClick(e) {
        if (!this.contains(e.target)) this.closeAll(null);
      }

      onKey(e) {
        if (e.key !== 'Escape') return;
        var open = this.querySelector('[data-hotspot-item][data-open="true"]');
        if (!open) return;
        var btn = open.querySelector('[data-hotspot]');
        this.close(open);
        if (btn) btn.focus();
      }
    }
  );
}
