if (!customElements.get('announcement-bar')) {
  customElements.define(
    'announcement-bar',
    class AnnouncementBar extends HTMLElement {
      connectedCallback() {
        if (this.getAttribute('data-rotate') !== 'true') return;
        this.items = Array.prototype.slice.call(this.querySelectorAll('[data-ann-item]'));
        if (this.items.length < 2) return;
        this.index = 0;
        var delay = parseInt(this.getAttribute('data-speed'), 10) || 4000;
        this.show(0);
        var self = this;
        this.timer = window.setInterval(function () {
          self.index = (self.index + 1) % self.items.length;
          self.show(self.index);
        }, delay);
      }
      disconnectedCallback() {
        if (this.timer) window.clearInterval(this.timer);
      }
      show(active) {
        this.items.forEach(function (el, i) {
          el.hidden = i !== active;
        });
      }
    }
  );
}
