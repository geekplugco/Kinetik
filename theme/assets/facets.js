if (!customElements.get('collection-facets')) {
  customElements.define(
    'collection-facets',
    class CollectionFacets extends HTMLElement {
      connectedCallback() {
        this.form = this.querySelector('[data-facet-form]');
        this.panel = this.querySelector('[data-facet-panel]');
        this.overlay = this.querySelector('[data-facet-overlay]');
        this.openers = Array.from(this.querySelectorAll('[data-facet-open]'));
        this.closers = Array.from(this.querySelectorAll('[data-facet-close]'));
        this.opener = null;

        this.openers.forEach((button) => button.addEventListener('click', this.open.bind(this)));
        this.closers.forEach((button) => button.addEventListener('click', this.close.bind(this)));
        if (this.overlay) this.overlay.addEventListener('click', this.close.bind(this));

        this.querySelectorAll('[data-sort]').forEach((select) => {
          select.addEventListener('change', () => {
            if (this.form) this.form.submit();
          });
        });

        this.querySelectorAll('input[type="checkbox"]:not([data-client-filter])').forEach((input) => {
          input.addEventListener('change', () => {
            var group = input.closest('details');
            if (group) group.open = true;
          });
        });

        this.grid = document.querySelector('[data-grid]');
        this.count = document.querySelector('[data-count]');
        this.clientFilterInputs = Array.from(this.querySelectorAll('[data-client-filter]'));
        this.clientFilterInputs.forEach((input) => {
          input.addEventListener('change', this.applyClientFilters.bind(this));
        });

        this.onKey = this.onKey.bind(this);
        document.addEventListener('keydown', this.onKey);

        this.querySelectorAll('[data-price-slider]').forEach(this.initPriceSlider.bind(this));
      }

      initPriceSlider(root) {
        var rangeMax = parseFloat(root.dataset.rangeMax) || 0;
        var minThumb = root.querySelector('[data-price-thumb="min"]');
        var maxThumb = root.querySelector('[data-price-thumb="max"]');
        var minNumber = root.querySelector('[data-price-number="min"]');
        var maxNumber = root.querySelector('[data-price-number="max"]');
        var fill = root.querySelector('[data-price-fill]');
        if (!minThumb || !maxThumb || !minNumber || !maxNumber || !fill || rangeMax <= 0) return;

        var render = function () {
          var lo = Math.min(parseFloat(minThumb.value), parseFloat(maxThumb.value));
          var hi = Math.max(parseFloat(minThumb.value), parseFloat(maxThumb.value));
          fill.style.left = (lo / rangeMax) * 100 + '%';
          fill.style.right = 100 - (hi / rangeMax) * 100 + '%';
        };

        var fromThumbs = function () {
          if (parseFloat(minThumb.value) > parseFloat(maxThumb.value)) {
            var tmp = minThumb.value;
            minThumb.value = maxThumb.value;
            maxThumb.value = tmp;
          }
          minNumber.value = minThumb.value;
          maxNumber.value = maxThumb.value;
          render();
        };

        var fromNumbers = function () {
          var lo = minNumber.value === '' ? 0 : Math.max(0, Math.min(rangeMax, parseFloat(minNumber.value) || 0));
          var hi = maxNumber.value === '' ? rangeMax : Math.max(0, Math.min(rangeMax, parseFloat(maxNumber.value) || rangeMax));
          if (lo > hi) { var t = lo; lo = hi; hi = t; }
          minThumb.value = lo;
          maxThumb.value = hi;
          render();
        };

        minThumb.addEventListener('input', fromThumbs);
        maxThumb.addEventListener('input', fromThumbs);
        minNumber.addEventListener('change', fromNumbers);
        maxNumber.addEventListener('change', fromNumbers);
        render();
      }

      applyClientFilters() {
        if (!this.grid) return;
        var active = {};
        this.clientFilterInputs.forEach((input) => {
          if (!input.checked) return;
          var key = input.dataset.clientFilter;
          (active[key] = active[key] || []).push(input.value);
        });
        var items = Array.from(this.grid.querySelectorAll('[data-product-item]'));
        var visible = 0;
        items.forEach((item) => {
          var matches = Object.keys(active).every((key) => {
            var values = (item.dataset['option' + key.charAt(0).toUpperCase() + key.slice(1)] || '').split('|');
            return active[key].some((v) => values.indexOf(v) !== -1);
          });
          item.classList.toggle('hidden', !matches);
          if (matches) visible += 1;
        });
        if (this.count) this.count.textContent = visible + ' products';
      }

      disconnectedCallback() {
        document.removeEventListener('keydown', this.onKey);
      }

      open(event) {
        if (!this.panel) return;
        this.opener = event.currentTarget;
        this.panel.classList.remove('translate-x-full');
        this.panel.classList.add('translate-x-0');
        if (this.overlay) {
          this.overlay.classList.remove('pointer-events-none', 'opacity-0');
          this.overlay.classList.add('opacity-100');
        }
        if (window.KinetikOverlay) window.KinetikOverlay.lockScroll(); else document.body.style.overflow = 'hidden';
        if (window.KinetikTrap) window.KinetikTrap.trap(this.panel);
        const close = this.panel.querySelector('[data-facet-close]');
        if (close) close.focus();
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
        if (this.opener) {
          this.opener.focus();
          this.opener = null;
        }
      }

      isOpen() {
        return this.panel && !this.panel.classList.contains('translate-x-full');
      }

      onKey(event) {
        if (event.key === 'Escape' && this.isOpen()) this.close();
      }
    }
  );
}
