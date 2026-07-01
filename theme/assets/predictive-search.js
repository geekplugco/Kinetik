if (!customElements.get('predictive-search')) {
  customElements.define(
    'predictive-search',
    class PredictiveSearch extends HTMLElement {
      connectedCallback() {
        this.input = this.querySelector('input[type="search"]');
        this.panel = this.querySelector('[data-results]');
        this.status = this.querySelector('[data-status]');
        this.timer = null;
        this.active = -1;
        if (!this.input) return;
        this.input.addEventListener('input', () => {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => this.run(), 200);
        });
        this.input.addEventListener('focus', () => {
          if (this.input.value.trim()) this.run();
        });
        this.input.addEventListener('keydown', (e) => this.onKeydown(e));
        document.addEventListener('click', (e) => {
          if (!this.contains(e.target)) this.close();
        });
      }

      setExpanded(v) {
        this.input.setAttribute('aria-expanded', v ? 'true' : 'false');
      }

      close() {
        if (this.panel) this.panel.hidden = true;
        this.setExpanded(false);
        this.active = -1;
        this.input.removeAttribute('aria-activedescendant');
      }

      options() {
        return this.panel ? Array.from(this.panel.querySelectorAll('[role="option"]')) : [];
      }

      onKeydown(e) {
        if (e.key === 'Escape') return this.close();
        const opts = this.options();
        if (!opts.length || this.panel.hidden) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          this.active = e.key === 'ArrowDown' ? Math.min(this.active + 1, opts.length - 1) : Math.max(this.active - 1, 0);
          opts.forEach((o, i) => o.classList.toggle('bg-surface-sunken', i === this.active));
          const el = opts[this.active];
          if (el) { this.input.setAttribute('aria-activedescendant', el.id); el.scrollIntoView({ block: 'nearest' }); }
        } else if (e.key === 'Enter' && this.active > -1) {
          e.preventDefault();
          window.location.href = opts[this.active].getAttribute('href');
        }
      }

      async run() {
        const q = this.input.value.trim();
        if (!q) return this.close();
        const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
        try {
          const res = await fetch(
            root +
              'search/suggest.json?q=' +
              encodeURIComponent(q) +
              '&resources[type]=product&resources[limit]=8&resources[options][unavailable_products]=last'
          );
          const data = await res.json();
          const items = (data.resources && data.resources.results && data.resources.results.products) || [];
          this.render(items, q);
        } catch (e) {
          this.close();
        }
      }

      render(items, q) {
        if (!this.panel) return;
        this.active = -1;
        this.input.removeAttribute('aria-activedescendant');
        if (!items.length) {
          this.panel.innerHTML =
            '<p class="px-4 py-6 font-mono text-xs uppercase tracking-label text-text-muted">No matches for &ldquo;' +
            this.escape(q) +
            '&rdquo;</p>';
        } else {
          this.panel.innerHTML = items
            .map((p, i) => {
              const img = (p.featured_image && (p.featured_image.url || p.featured_image.src)) || p.image || '';
              const price = p.price ? '<span class="ml-auto font-mono text-xs text-text-muted">' + p.price + '</span>' : '';
              return (
                '<a role="option" id="predictive-option-' + i + '" href="' +
                p.url +
                '" class="flex items-center gap-3 border-b border-border-hairline px-4 py-3 hover:bg-surface-sunken">' +
                (img
                  ? '<img src="' + img + '" alt="' + this.escape(p.title || 'Search result') + '" loading="lazy" class="h-12 w-10 shrink-0 object-cover" />'
                  : '<span class="h-12 w-10 shrink-0 bg-surface-sunken"></span>') +
                '<span class="font-sans text-sm text-text-strong">' +
                this.escape(p.title) +
                '</span>' +
                price +
                '</a>'
              );
            })
            .join('');
        }
        this.panel.hidden = false;
        this.setExpanded(true);
        if (this.status) this.status.textContent = items.length + (items.length === 1 ? ' result' : ' results');
      }

      escape(s) {
        return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      }
    }
  );
}
