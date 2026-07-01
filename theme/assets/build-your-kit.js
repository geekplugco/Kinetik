if (!customElements.get('build-your-kit')) {
  customElements.define(
    'build-your-kit',
    class BuildYourKit extends HTMLElement {
      connectedCallback() {
        this.options = Array.from(this.querySelectorAll('[data-kit-option]'));
        this.discountPct = parseFloat(this.getAttribute('data-discount-pct')) || 0;
        this.minPieces = parseInt(this.getAttribute('data-min-pieces'), 10) || 0;
        this.currency = this.getAttribute('data-currency') || 'USD';
        this.selected = {};

        this.listEl = this.querySelector('[data-kit-list]');
        this.emptyEl = this.querySelector('[data-kit-empty]');
        this.countEl = this.querySelector('[data-count]');
        this.subtotalEl = this.querySelector('[data-subtotal]');
        this.discountEl = this.querySelector('[data-discount]');
        this.discountLabelEl = this.querySelector('[data-discount-label]');
        this.totalEl = this.querySelector('[data-total]');
        this.addBtn = this.querySelector('[data-add-kit]');

        this.options.forEach(function (btn) {
          btn.addEventListener('click', this.pick.bind(this, btn));
        }, this);
        if (this.addBtn) this.addBtn.addEventListener('click', this.addKit.bind(this));

        this.update();
      }

      fmt(cents) {
        try {
          return new Intl.NumberFormat(undefined, { style: 'currency', currency: this.currency }).format(cents / 100);
        } catch (e) {
          return '$' + (cents / 100).toFixed(2);
        }
      }

      escape(s) {
        return String(s || '').replace(/[&<>"]/g, function (c) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
      }

      setActive(btn, active) {
        btn.classList.toggle('border-border-strong', active);
        btn.classList.toggle('border-border-hairline', !active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        var badge = btn.querySelector('[data-badge]');
        if (badge) {
          badge.classList.toggle('bg-accent', active);
          badge.classList.toggle('text-accent-ink', active);
          badge.classList.toggle('bg-surface-page/80', !active);
          badge.classList.toggle('text-text-muted', !active);
        }
        var plus = btn.querySelector('[data-icon-plus]');
        var close = btn.querySelector('[data-icon-close]');
        if (plus) plus.classList.toggle('hidden', active);
        if (close) close.classList.toggle('hidden', !active);
      }

      setSlotStatus(slot, title) {
        var status = this.querySelector('[data-slot-status="' + slot + '"]');
        if (status) status.textContent = title || (status.hasAttribute('data-required') ? 'Required' : 'Optional');
      }

      requiredMet() {
        var ok = true;
        Array.prototype.forEach.call(this.querySelectorAll('[data-slot-status][data-required]'), function (st) {
          if (!this.selected[st.getAttribute('data-slot-status')]) ok = false;
        }, this);
        return ok;
      }

      pick(btn) {
        var slot = btn.dataset.slot;
        var current = this.selected[slot];
        if (current === btn) {
          this.setActive(btn, false);
          delete this.selected[slot];
          this.setSlotStatus(slot, null);
        } else {
          if (current) this.setActive(current, false);
          this.setActive(btn, true);
          this.selected[slot] = btn;
          this.setSlotStatus(slot, btn.dataset.title);
        }
        this.update();
      }

      kit() {
        return this.options.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; });
      }

      update() {
        var kit = this.kit();
        var subtotal = kit.reduce(function (sum, b) { return sum + (parseInt(b.dataset.price, 10) || 0); }, 0);
        var discountActive = kit.length >= this.minPieces && this.discountPct > 0;
        var discount = discountActive ? Math.round(subtotal * (this.discountPct / 100)) : 0;
        var total = subtotal - discount;

        if (this.countEl) this.countEl.textContent = kit.length + ' ' + (kit.length === 1 ? 'piece' : 'pieces');

        if (this.listEl && this.emptyEl) {
          if (kit.length === 0) {
            this.emptyEl.classList.remove('hidden');
            this.listEl.classList.add('hidden');
            this.listEl.classList.remove('flex');
            this.listEl.innerHTML = '';
          } else {
            this.emptyEl.classList.add('hidden');
            this.listEl.classList.remove('hidden');
            this.listEl.classList.add('flex');
            this.listEl.innerHTML = kit.map(function (b) {
              return (
                '<li class="flex items-center gap-3 py-3">' +
                '<div class="relative h-12 w-10 shrink-0 overflow-hidden bg-surface-sunken">' +
                (b.dataset.image ? '<img src="' + b.dataset.image + '" alt="' + this.escape(b.dataset.imageAlt || b.dataset.title || 'Kit item') + '" class="absolute inset-0 h-full w-full object-cover">' : '') +
                '</div>' +
                '<span class="min-w-0 flex-1 truncate font-sans text-sm text-text-strong">' + b.dataset.title + '</span>' +
                '<span class="font-mono text-sm text-text-muted">' + this.fmt(parseInt(b.dataset.price, 10) || 0) + '</span>' +
                '</li>'
              );
            }, this).join('');
          }
        }

        if (this.subtotalEl) this.subtotalEl.textContent = this.fmt(subtotal);
        if (this.discountEl) this.discountEl.textContent = '−' + this.fmt(discount);
        if (this.discountLabelEl) {
          this.discountLabelEl.textContent = 'Kit discount −' + this.discountPct + '%' + (discountActive ? '' : ' (' + this.minPieces + '+ pieces)');
        }
        if (this.discountEl && this.discountEl.parentElement) {
          this.discountEl.parentElement.classList.toggle('text-text-strong', discountActive);
          this.discountEl.parentElement.classList.toggle('text-text-muted', !discountActive);
        }
        if (this.totalEl) this.totalEl.textContent = this.fmt(total);
        if (this.addBtn) this.addBtn.disabled = kit.length === 0 || !this.requiredMet();
      }

      async addKit() {
        var kit = this.kit();
        if (!kit.length) return;
        this.addBtn.setAttribute('disabled', '');
        var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
        var items = kit.map(function (b) { return { id: b.dataset.variant, quantity: 1 }; });
        try {
          await fetch(root + 'cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ items: items }),
          });
          document.dispatchEvent(new CustomEvent('cart:added', { bubbles: true }));
          document.dispatchEvent(new CustomEvent('cart:open', { bubbles: true }));
        } catch (e) {
          window.location.href = root + 'cart';
        } finally {
          this.update();
        }
      }
    }
  );
}
