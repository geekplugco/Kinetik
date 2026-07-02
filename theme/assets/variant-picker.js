if (!customElements.get('variant-picker')) {
  customElements.define(
    'variant-picker',
    class VariantPicker extends HTMLElement {
      connectedCallback() {
        const data = this.querySelector('script[type="application/json"]');
        try {
          this.variants = data ? JSON.parse(data.textContent) : [];
        } catch (e) {
          this.variants = [];
        }
        this.form = this.querySelector('form');
        this.idInput = this.querySelector('input[name="id"]');
        this.priceEl = this.querySelector('[data-price]');
        this.atc = this.querySelector('[data-add-to-cart]');
        this.qtyInput = this.querySelector('input[name="quantity"]');
        this.label = this.querySelector('[data-option-current]');
        this.invEl = this.querySelector('[data-inventory]');
        this.errEl = this.querySelector('[data-atc-error]');
        this.sellingPlanInput = this.querySelector('[data-selling-plan-input]');
        this.stickyVariant = this.querySelector('[data-sticky-variant]');
        this.stickyPrice = this.querySelector('[data-sticky-price]');
        this.stickyAdd = this.querySelector('[data-sticky-add]');
        this.unavailableLabel = 'Unavailable';

        this.addEventListener('change', (e) => {
          if (e.target.matches('[data-option-position]')) this.onSelect();
          if (e.target.matches('[data-selling-plan-radio]')) this.onSellingPlanChange();
        });
        this.addEventListener('click', (e) => {
          const down = e.target.closest('[data-qty-down]');
          const up = e.target.closest('[data-qty-up]');
          if (down || up) {
            e.preventDefault();
            this.step(up ? 1 : -1);
          }
          if (e.target.closest('[data-sticky-add]')) {
            e.preventDefault();
            if (this.form) this.form.requestSubmit ? this.form.requestSubmit() : this.onSubmit(e);
          }
        });
        if (this.form) this.form.addEventListener('submit', this.onSubmit.bind(this));

        this.bar = this.querySelector('[data-sticky-bar]');
        const sentinel = this.querySelector('[data-atc-sentinel]');
        if (this.bar && sentinel && 'IntersectionObserver' in window) {
          const io = new IntersectionObserver(
            ([entry]) => this.bar.classList.toggle('translate-y-full', entry.isIntersecting),
            { rootMargin: '-80px 0px 0px 0px' }
          );
          io.observe(sentinel);
        }

        this.preloadVariantImages();
        this.onSelect();
      }

      selections() {
        const map = {};
        this.querySelectorAll(
          'input[type="radio"][data-option-position]:checked, select[data-option-position]'
        ).forEach((el) => {
          map[el.dataset.optionPosition] = el.value;
        });
        return Object.keys(map)
          .map(Number)
          .sort((a, b) => a - b)
          .map((k) => map[k]);
      }

      current() {
        const sel = this.selections();
        if (!sel.length) return this.variants[0];
        return this.variants.find(
          (v) => v.options.length === sel.length && v.options.every((o, i) => o === sel[i])
        );
      }

      comboAvailable(sel, pos, value) {
        const candidate = sel.slice();
        candidate[pos - 1] = value;
        const v = this.variants.find(
          (x) => x.options.length === candidate.length && x.options.every((o, i) => o === candidate[i])
        );
        return !!(v && v.available);
      }

      updateAvailability() {
        const sel = this.selections();
        this.querySelectorAll('[data-option-fieldset]').forEach((fs) => {
          const pos = parseInt(fs.dataset.optionPosition, 10);
          fs.querySelectorAll('input[type="radio"][data-value]').forEach((input) => {
            const ok = this.comboAvailable(sel, pos, input.dataset.value);
            input.setAttribute('aria-disabled', ok ? 'false' : 'true');
            const span = input.parentElement.querySelector('span');
            if (span) {
              span.classList.toggle('opacity-40', !ok);
              if (!input.hasAttribute('data-option-color')) span.classList.toggle('line-through', !ok);
            }
          });
          const select = fs.querySelector('select[data-option-position]');
          if (select) {
            Array.from(select.options).forEach((opt) => {
              const base = opt.dataset.value || opt.textContent;
              const ok = this.comboAvailable(sel, pos, opt.value);
              opt.textContent = ok ? base : base + ' – ' + this.unavailableLabel;
            });
          }
        });
      }

      onSelect() {
        const v = this.current();
        if (this.label) {
          const colour = this.querySelector('input[data-option-color]:checked');
          if (colour) this.label.textContent = colour.value;
        }
        if (v) {
          if (this.idInput) this.idInput.value = v.id;
          this.renderPrice(v);
          if (this.stickyVariant && v.options) this.stickyVariant.textContent = v.options.join(' / ');
        }
        this.renderAtc(v);
        this.renderInventory(v);
        this.renderVariantReadout(v);
        this.renderVariantImage(v);
        this.updateAvailability();
        if (v) this.dispatchEvent(new CustomEvent('variant:change', { detail: { variant: v }, bubbles: true }));
      }

      priceHtml(v, extra) {
        return (
          '<span class="flex items-baseline gap-2 font-mono text-sm ' +
          extra +
          '"><span class="text-text-strong' +
          (v.on_sale ? ' text-accent-press' : '') +
          '">' +
          v.price +
          '</span>' +
          (v.on_sale ? '<s class="text-text-muted">' + v.compare_at + '</s>' : '') +
          '</span>'
        );
      }

      renderPrice(v) {
        if (this.priceEl) {
          this.priceEl.innerHTML = this.priceHtml(v, this.priceEl.getAttribute('data-price-class') || '');
        }
        if (this.stickyPrice) this.stickyPrice.innerHTML = this.priceHtml(v, 'text-xs');
      }

      renderAtc(v) {
        if (!this.atc) return;
        const ok = !!(v && v.available);
        for (const btn of [this.atc, this.stickyAdd]) {
          if (!btn) continue;
          if (ok) {
            btn.removeAttribute('disabled');
            btn.textContent = btn.dataset.labelAvailable || 'Add to cart';
          } else {
            btn.setAttribute('disabled', '');
            btn.textContent = btn.dataset.labelSoldout || 'Sold out';
          }
        }
        const bis = this.querySelector('[data-back-in-stock]');
        if (bis) {
          bis.classList.toggle('hidden', !!(v && v.available));
          const vf = bis.querySelector('[data-bis-variant]');
          if (vf && v && v.options) vf.value = v.options.join(' / ');
        }
      }

      renderInventory(v) {
        const el = this.invEl;
        if (!el) return;
        const thr = parseInt(el.dataset.threshold, 10) || 0;
        el.classList.remove('text-text-strong', 'text-text-muted');
        if (!v) {
          el.textContent = '';
          return;
        }
        if (!v.available) {
          el.textContent = el.dataset.sold || 'Sold out';
          el.classList.add('text-text-muted');
          return;
        }
        if (
          v.inventory_management &&
          thr > 0 &&
          typeof v.inventory_quantity === 'number' &&
          v.inventory_quantity > 0 &&
          v.inventory_quantity <= thr
        ) {
          el.textContent = (el.dataset.low || 'Only [n] left').replace('[n]', v.inventory_quantity);
          el.classList.add('text-text-strong');
        } else {
          el.textContent = el.dataset.inStock || 'In stock';
          el.classList.add('text-text-muted');
        }
      }

      variantImageHolder() {
        const scope = this.closest('section') || this.parentElement || this;
        return scope.querySelector('[data-variant-image]');
      }

      preloadVariantImages() {
        if (!this.variantImageHolder() || !window.KinetikMedia) return;
        const run = () => window.KinetikMedia.preload(this.variants.map((v) => v.featured_image));
        if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 3000 });
        else setTimeout(run, 1500);
      }

      renderVariantImage(v) {
        const holder = this.variantImageHolder();
        if (!holder) return;
        const img = holder.querySelector('img');
        if (!img) return;
        const src = (v && v.featured_image) || holder.getAttribute('data-variant-image-default');
        if (src && window.KinetikMedia) window.KinetikMedia.swap(img, src);
      }

      onSellingPlanChange() {
        if (!this.sellingPlanInput) return;
        const checked = this.querySelector('[data-selling-plan-radio]:checked');
        this.sellingPlanInput.value = checked ? checked.value : '';
      }

      renderVariantReadout(v) {
        const readout = this.querySelector('[data-variant-readout]');
        const sku = this.querySelector('[data-variant-sku]');
        if (!readout) return;
        if (v && v.sku) {
          if (sku) sku.textContent = v.sku;
          readout.classList.remove('hidden');
        } else {
          readout.classList.add('hidden');
        }
      }

      step(dir) {
        if (!this.qtyInput) return;
        const next = Math.max(1, (parseInt(this.qtyInput.value, 10) || 1) + dir);
        this.qtyInput.value = next;
        const out = this.querySelector('[data-qty-value]');
        if (out) out.textContent = next;
      }

      setLoading(on) {
        if (!this.atc) return;
        if (on) {
          this.atc.setAttribute('disabled', '');
          this.atc.setAttribute('aria-busy', 'true');
          if (this.atc.dataset.labelLoading) this.atc.textContent = this.atc.dataset.labelLoading;
        } else {
          this.atc.removeAttribute('aria-busy');
        }
      }

      async onSubmit(e) {
        if (e && e.preventDefault) e.preventDefault();
        const id = this.idInput && this.idInput.value;
        if (!id) return;
        const qty = this.qtyInput ? Math.max(1, parseInt(this.qtyInput.value, 10) || 1) : 1;
        if (this.errEl) this.errEl.textContent = '';
        this.setLoading(true);
        const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
        const body = { id: id, quantity: qty };
        if (this.sellingPlanInput && this.sellingPlanInput.value) body.selling_plan = this.sellingPlanInput.value;
        try {
          const res = await fetch(root + 'cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(body),
          });
          const data = await res.json();
          if (!res.ok) {
            if (this.errEl) this.errEl.textContent = data.description || data.message || 'Could not add to cart.';
            return;
          }
          document.dispatchEvent(new CustomEvent('cart:added', { bubbles: true, detail: { item: data } }));
        } catch (err) {
          if (this.errEl) this.errEl.textContent = 'Network error. Please try again.';
        } finally {
          this.setLoading(false);
          this.onSelect();
        }
      }
    }
  );
}
