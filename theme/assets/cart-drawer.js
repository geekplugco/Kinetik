if (!customElements.get('cart-drawer')) {
  customElements.define(
    'cart-drawer',
    class CartDrawer extends HTMLElement {
      connectedCallback() {
        this.currency = this.getAttribute('data-currency') || 'USD';
        this.panel = this.querySelector('[data-cart-panel]');
        this.overlay = this.querySelector('[data-cart-overlay]');
        this.itemsEl = this.querySelector('[data-cart-items]');
        this.countEl = this.querySelector('[data-cart-count]');
        this.subtotalEl = this.querySelector('[data-cart-subtotal]');
        this.progressEl = this.querySelector('[data-cart-progress]');
        this.noteEl = this.querySelector('[data-cart-note]');
        this.opener = null;
        this.busy = false;

        var closeBtn = this.querySelector('[data-cart-close]');
        if (closeBtn) closeBtn.addEventListener('click', this.close.bind(this));
        if (this.overlay) this.overlay.addEventListener('click', this.close.bind(this));

        this.onTrigger = this.onTrigger.bind(this);
        document.querySelectorAll('[data-cart-open]').forEach(function (btn) {
          btn.addEventListener('click', this.onTrigger);
        }, this);

        if (this.itemsEl) {
          this.itemsEl.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-cart-qty]');
            if (!btn) return;
            e.preventDefault();
            this.changeLine(parseInt(btn.dataset.line, 10), parseInt(btn.dataset.to, 10));
          }.bind(this));
        }

        if (this.noteEl) {
          var t;
          this.noteEl.addEventListener('input', function () {
            clearTimeout(t);
            t = setTimeout(this.saveNote.bind(this), 600);
          }.bind(this));
        }

        this.onOpenEvt = function () { this.open(); }.bind(this);
        this.onAdded = function () { this.open(); }.bind(this);
        this.onUpdated = function (e) { if (e.detail && e.detail.cart) this.render(e.detail.cart); }.bind(this);
        this.onKey = this.onKey.bind(this);

        document.addEventListener('cart:open', this.onOpenEvt);
        document.addEventListener('cart:added', this.onAdded);
        document.addEventListener('cart:updated', this.onUpdated);
        document.addEventListener('keydown', this.onKey);
      }

      disconnectedCallback() {
        document.removeEventListener('cart:open', this.onOpenEvt);
        document.removeEventListener('cart:added', this.onAdded);
        document.removeEventListener('cart:updated', this.onUpdated);
        document.removeEventListener('keydown', this.onKey);
      }

      root() {
        return (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
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

      onTrigger(e) {
        e.preventDefault();
        this.opener = e.currentTarget;
        this.open();
      }

      open() {
        if (!this.panel) return;
        this.panel.classList.remove('translate-x-full');
        this.panel.classList.add('translate-x-0');
        if (this.overlay) {
          this.overlay.classList.remove('pointer-events-none', 'opacity-0');
          this.overlay.classList.add('opacity-100');
        }
        if (window.KinetikOverlay) window.KinetikOverlay.lockScroll(); else document.body.style.overflow = 'hidden';
        var close = this.querySelector('[data-cart-close]');
        if (close) close.focus();
        if (window.KinetikTrap) window.KinetikTrap.trap(this.panel);
        this.refresh();
      }

      close() {
        if (!this.panel) return;
        this.panel.classList.add('translate-x-full');
        this.panel.classList.remove('translate-x-0');
        if (this.overlay) {
          this.overlay.classList.add('pointer-events-none', 'opacity-0');
          this.overlay.classList.remove('opacity-100');
        }
        if (window.KinetikOverlay) window.KinetikOverlay.unlockScroll(); else document.body.style.overflow = '';
        if (window.KinetikTrap) window.KinetikTrap.release(false);
        if (this.opener) { this.opener.focus(); this.opener = null; }
      }

      isOpen() {
        return this.panel && !this.panel.classList.contains('translate-x-full');
      }

      onKey(e) {
        if (e.key === 'Escape' && this.isOpen()) this.close();
      }

      async refresh() {
        try {
          var res = await fetch(this.root() + 'cart.js', { headers: { Accept: 'application/json' } });
          if (!res.ok) return;
          this.render(await res.json());
        } catch (e) {
          return;
        }
      }

      async changeLine(line, quantity) {
        if (this.busy) return;
        this.busy = true;
        if (this.panel) this.panel.setAttribute('aria-busy', 'true');
        try {
          var res = await fetch(this.root() + 'cart/change.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ line: line, quantity: quantity }),
          });
          var cart = await res.json();
          this.render(cart);
          document.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: { cart: cart } }));
        } catch (e) {
          this.busy = false;
        } finally {
          this.busy = false;
          if (this.panel) this.panel.removeAttribute('aria-busy');
        }
      }

      saveNote() {
        if (!this.noteEl) return;
        fetch(this.root() + 'cart/update.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ note: this.noteEl.value }),
        });
      }

      renderProgress(cart) {
        if (!this.progressEl) return;
        this.progressEl.classList.toggle('hidden', cart.item_count === 0);
        var threshold = parseInt(this.progressEl.dataset.threshold, 10) || 0;
        if (threshold <= 0) return;
        var remaining = threshold - cart.total_price;
        var pct = Math.min(100, Math.round((cart.total_price / threshold) * 100));
        var bar = this.progressEl.querySelector('[data-cart-progress-bar]');
        var text = this.progressEl.querySelector('[data-cart-progress-text]');
        if (bar) bar.style.width = pct + '%';
        if (text) text.textContent = remaining > 0 ? 'Add ' + this.fmt(remaining) + ' for free shipping' : 'Free shipping unlocked';
      }

      render(cart) {
        if (this.countEl) this.countEl.textContent = cart.item_count;
        if (this.subtotalEl) this.subtotalEl.textContent = this.fmt(cart.total_price);

        var badge = document.querySelector('[data-header-cart-count]');
        if (badge) {
          badge.textContent = cart.item_count;
          badge.classList.toggle('hidden', cart.item_count === 0);
        }

        this.renderProgress(cart);

        if (!this.itemsEl) return;
        if (cart.item_count === 0) {
          this.itemsEl.innerHTML =
            '<div class="py-12 text-center">' +
            '<p class="font-display text-h4 text-text-strong">Your cart is empty.</p>' +
            '<p class="mx-auto mt-2 max-w-xs text-sm text-text-muted">Start with field-ready essentials or return to the latest drop.</p>' +
            '<a href="/collections/all" class="mt-5 inline-flex min-h-[44px] items-center justify-center border border-border-strong px-5 py-2 font-mono text-xs uppercase tracking-label text-text-strong">Shop all</a>' +
            '</div>';
          return;
        }
        this.itemsEl.innerHTML = cart.items
          .map(function (item, i) {
            var line = i + 1;
            var vt =
              item.variant_title && item.variant_title.indexOf('Default') === -1
                ? '<span class="font-mono text-[11px] text-text-muted">' + item.variant_title + '</span>'
                : '';
            var imgAlt = item.featured_image && item.featured_image.alt ? item.featured_image.alt : item.product_title;
            var img = item.image
              ? '<img src="' + item.image + '" alt="' + this.escape(imgAlt || 'Cart item') + '" class="absolute inset-0 h-full w-full object-cover">'
              : '';
            return (
              '<div class="flex gap-4 border-b border-border-hairline py-4" data-cart-line="' + line + '">' +
              '<div class="relative h-24 w-20 shrink-0 overflow-hidden bg-surface-sunken">' + img + '</div>' +
              '<div class="flex flex-1 flex-col gap-1">' +
              '<a href="' + item.url + '" class="font-sans text-sm text-text-strong">' + item.product_title + '</a>' +
              vt +
              '<div class="mt-auto flex items-center gap-3 pt-2">' +
              '<div class="flex items-center border border-border-hairline">' +
              '<button type="button" data-cart-qty data-line="' + line + '" data-to="' + (item.quantity - 1) + '" aria-label="Decrease quantity" class="flex h-9 w-9 items-center justify-center text-text-strong">−</button>' +
              '<span class="w-6 text-center font-mono text-xs">' + item.quantity + '</span>' +
              '<button type="button" data-cart-qty data-line="' + line + '" data-to="' + (item.quantity + 1) + '" aria-label="Increase quantity" class="flex h-9 w-9 items-center justify-center text-text-strong">+</button>' +
              '</div>' +
              '<button type="button" data-cart-qty data-line="' + line + '" data-to="0" class="font-mono text-[10px] uppercase tracking-label text-text-muted underline underline-offset-2 hover:text-text-strong">Remove</button>' +
              '</div>' +
              '</div>' +
              '<span class="font-mono text-sm text-text-strong">' + this.fmt(item.final_line_price) + '</span>' +
              '</div>'
            );
          }, this)
          .join('');
      }
    }
  );
}
