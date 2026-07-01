if (!customElements.get('cart-items')) {
  customElements.define(
    'cart-items',
    class CartItems extends HTMLElement {
      connectedCallback() {
        this.sectionId = this.dataset.sectionId;
        this.addEventListener('click', (e) => {
          const down = e.target.closest('[data-qty-down]');
          const up = e.target.closest('[data-qty-up]');
          const remove = e.target.closest('[data-remove]');
          if (down) this.change(down.dataset.line, parseInt(down.dataset.qty, 10) - 1);
          else if (up) this.change(up.dataset.line, parseInt(up.dataset.qty, 10) + 1);
          else if (remove) this.change(remove.dataset.line, 0);
        });
      }

      busy(state) {
        this.style.opacity = state ? '0.5' : '';
        this.style.pointerEvents = state ? 'none' : '';
      }

      async change(line, quantity) {
        this.busy(true);
        const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
        try {
          const res = await fetch(root + 'cart/change.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              line: Number(line),
              quantity: Math.max(0, quantity),
              sections: this.sectionId,
              sections_url: window.location.pathname,
            }),
          });
          const data = await res.json();
          if (data.sections && data.sections[this.sectionId]) {
            const doc = new DOMParser().parseFromString(data.sections[this.sectionId], 'text/html');
            const fresh = doc.querySelector('cart-items');
            if (fresh) this.innerHTML = fresh.innerHTML;
          }
          document.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: { cart: data } }));
        } catch (e) {
          window.location.reload();
        } finally {
          this.busy(false);
        }
      }
    }
  );
}
