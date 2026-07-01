if (!customElements.get('quick-add')) {
  customElements.define(
    'quick-add',
    class QuickAdd extends HTMLElement {
      connectedCallback() {
        this.form = this.querySelector('form');
        if (this.form) this.form.addEventListener('submit', this.onSubmit.bind(this));
      }
      async onSubmit(event) {
        event.preventDefault();
        var btn = this.form.querySelector('button[type="submit"]');
        if (btn) btn.setAttribute('disabled', '');
        var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
        try {
          var res = await fetch(root + 'cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ id: this.form.querySelector('[name="id"]').value, quantity: 1 }),
          });
          var item = await res.json();
          document.dispatchEvent(new CustomEvent('cart:added', { bubbles: true, detail: { item: item } }));
        } catch (e) {
          this.form.submit();
        } finally {
          if (btn) btn.removeAttribute('disabled');
        }
      }
    }
  );
}
