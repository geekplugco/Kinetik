if (!customElements.get('build-loadout')) {
  customElements.define(
    'build-loadout',
    class BuildLoadout extends HTMLElement {
      connectedCallback() {
        this.baseVariant = this.getAttribute('data-base-variant');
        this.basePrice = parseInt(this.getAttribute('data-base-price'), 10) || 0;
        this.currency = this.getAttribute('data-currency') || 'USD';
        this.items = Array.from(this.querySelectorAll('[data-loadout-item]'));
        this.countEl = this.querySelector('[data-loadout-count]');
        this.totalEl = this.querySelector('[data-loadout-total]');
        this.basePriceEl = this.querySelector('[data-base-price-display]');
        this.addBtn = this.querySelector('[data-add-loadout]');
        this.errEl = this.querySelector('[data-loadout-error]');

        this.addEventListener('change', (e) => {
          if (e.target.matches('[data-loadout-variant]')) this.syncVariant(e.target);
          this.update();
        });
        if (this.addBtn) this.addBtn.addEventListener('click', () => this.add());

        this.onVariant = (e) => {
          const v = e.detail && e.detail.variant;
          if (!v) return;
          this.baseVariant = String(v.id);
          if (typeof v.price_cents === 'number') this.basePrice = v.price_cents;
          this.update();
        };
        document.addEventListener('variant:change', this.onVariant);

        this.excludeInCart();
        this.update();
      }

      async excludeInCart() {
        const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
        try {
          const res = await fetch(root + 'cart.js', { headers: { Accept: 'application/json' } });
          if (!res.ok) return;
          const cart = await res.json();
          const inCart = new Set((cart.items || []).map((i) => String(i.variant_id)));
          this.items.forEach((item) => {
            if (inCart.has(String(item.dataset.variant))) {
              item.checked = false;
              const row = item.closest('li');
              if (row) {
                row.classList.add('opacity-50');
                const link = row.querySelector('a');
                if (link && !row.querySelector('[data-in-cart]')) {
                  const tag = document.createElement('span');
                  tag.dataset.inCart = '';
                  tag.className = 'ml-2 font-mono text-[10px] uppercase tracking-label text-text-muted';
                  tag.textContent = 'In cart';
                  link.after(tag);
                }
              }
            }
          });
          this.update();
        } catch (e) {
          this.update();
        }
      }

      disconnectedCallback() {
        document.removeEventListener('variant:change', this.onVariant);
      }

      fmt(cents) {
        try {
          return new Intl.NumberFormat(undefined, { style: 'currency', currency: this.currency }).format(cents / 100);
        } catch (e) {
          return '$' + (cents / 100).toFixed(2);
        }
      }

      syncVariant(select) {
        const opt = select.options[select.selectedIndex];
        const item = select.closest('li').querySelector('[data-loadout-item]');
        if (!item || !opt) return;
        item.dataset.variant = opt.value;
        item.dataset.price = opt.dataset.price || item.dataset.price;
        const priceEl = select.closest('li').querySelector('.font-mono.text-text-muted');
        if (priceEl) priceEl.textContent = this.fmt(parseInt(item.dataset.price, 10) || 0);
      }

      selected() {
        return this.items.filter((i) => i.checked);
      }

      update() {
        const sel = this.selected();
        const addOns = sel.reduce((sum, i) => sum + (parseInt(i.dataset.price, 10) || 0), 0);
        const total = this.basePrice + addOns;
        if (this.countEl) this.countEl.textContent = sel.length + ' add-on' + (sel.length === 1 ? '' : 's') + ' selected';
        if (this.totalEl) this.totalEl.textContent = this.fmt(total);
        if (this.basePriceEl) this.basePriceEl.textContent = this.fmt(this.basePrice);
      }

      async add() {
        const items = [{ id: this.baseVariant, quantity: 1 }].concat(
          this.selected().map((i) => ({ id: i.dataset.variant, quantity: 1 }))
        );
        if (this.errEl) this.errEl.textContent = '';
        this.addBtn.setAttribute('disabled', '');
        this.addBtn.setAttribute('aria-busy', 'true');
        const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
        try {
          const res = await fetch(root + 'cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ items: items }),
          });
          const data = await res.json();
          if (!res.ok) {
            if (this.errEl) this.errEl.textContent = data.description || data.message || 'Could not add the loadout.';
            return;
          }
          document.dispatchEvent(new CustomEvent('cart:added', { bubbles: true, detail: { item: data } }));
          document.dispatchEvent(new CustomEvent('cart:open', { bubbles: true }));
        } catch (e) {
          if (this.errEl) this.errEl.textContent = 'Network error. Please try again.';
        } finally {
          this.addBtn.removeAttribute('disabled');
          this.addBtn.removeAttribute('aria-busy');
        }
      }
    }
  );
}
