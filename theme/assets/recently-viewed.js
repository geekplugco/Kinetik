(function () {
  var KEY = 'kinetik:recently-viewed';
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function write(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }

  var current = document.querySelector('[data-product-handle]');
  if (current) {
    var h = current.getAttribute('data-product-handle');
    if (h) write([h].concat(read().filter(function (x) { return x !== h; })).slice(0, 12));
  }

  if (!customElements.get('recently-viewed-products')) {
    customElements.define(
      'recently-viewed-products',
      class RecentlyViewed extends HTMLElement {
        connectedCallback() {
          this.grid = this.querySelector('[data-rv-grid]');
          this.limit = parseInt(this.dataset.limit || '4', 10);
          this.current = this.dataset.current || '';
          this.render();
        }
        async render() {
          if (!this.grid) return;
          var handles = read().filter((x) => x && x !== this.current).slice(0, this.limit);
          if (!handles.length) { this.hidden = true; return; }
          var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
          var cards = await Promise.all(
            handles.map(async (handle) => {
              try {
                const r = await fetch(root + 'products/' + handle + '?section_id=recently-viewed-card');
                return r.ok ? await r.text() : '';
              } catch (e) { return ''; }
            })
          );
          var html = cards
            .map((c) => (c || '').trim())
            .filter((c) => c && c.indexOf('<a') !== -1)
            .join('');
          this.grid.innerHTML = html;
          this.hidden = this.grid.children.length === 0;
        }
      }
    );
  }
})();
