if (!customElements.get('collapsible-content')) {
  customElements.define(
    'collapsible-content',
    class CollapsibleContent extends HTMLElement {
      connectedCallback() {
        this.items = Array.prototype.slice.call(this.querySelectorAll('[data-acc-item]'));
        var openFirst = this.getAttribute('data-open-first') === 'true';
        this.openIndex = openFirst ? 0 : -1;
        var self = this;
        this.items.forEach(function (item, i) {
          var trigger = item.querySelector('[data-acc-trigger]');
          if (trigger) trigger.addEventListener('click', function () { self.toggle(i); });
        });
        this.render();
      }
      toggle(i) {
        this.openIndex = this.openIndex === i ? -1 : i;
        this.render();
      }
      render() {
        var self = this;
        this.items.forEach(function (item, i) {
          var isOpen = self.openIndex === i;
          var trigger = item.querySelector('[data-acc-trigger]');
          var panel = item.querySelector('[data-acc-panel]');
          var iconClosed = item.querySelector('[data-acc-icon-closed]');
          var iconOpen = item.querySelector('[data-acc-icon-open]');
          if (trigger) trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          if (panel) panel.hidden = !isOpen;
          if (iconClosed) iconClosed.classList.toggle('hidden', isOpen);
          if (iconOpen) iconOpen.classList.toggle('hidden', !isOpen);
        });
      }
    }
  );
}
