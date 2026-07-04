if (!customElements.get('gift-card-recipient')) {
  customElements.define(
    'gift-card-recipient',
    class GiftCardRecipient extends HTMLElement {
      connectedCallback() {
        this.toggle = this.querySelector('[data-recipient-toggle]');
        this.fields = this.querySelector('[data-recipient-fields]');
        this.controls = this.fields ? Array.prototype.slice.call(this.fields.querySelectorAll('input, textarea')) : [];
        this.offsetInput = this.querySelector('[data-recipient-offset]');
        if (this.offsetInput) this.offsetInput.value = new Date().getTimezoneOffset().toString();
        var self = this;
        if (this.toggle) this.toggle.addEventListener('change', function () { self.render(); });
        this.render();
      }
      render() {
        var on = !!(this.toggle && this.toggle.checked);
        if (this.fields) this.fields.hidden = !on;
        this.controls.forEach(function (el) { el.disabled = !on; });
      }
    }
  );
}
