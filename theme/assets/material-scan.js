if (!customElements.get('material-scan')) {
  customElements.define(
    'material-scan',
    class MaterialScan extends HTMLElement {
      connectedCallback() {
        this.pins = Array.from(this.querySelectorAll('[data-scan-point]'));
        this.details = Array.from(this.querySelectorAll('[data-scan-detail]'));
        this.line = this.querySelector('[data-scan-line]');
        this.stage = this.querySelector('[data-scan-stage]');
        this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.pins.forEach(function (p) {
          p.addEventListener('click', this.activate.bind(this, p.dataset.index));
        }, this);
        this.details.forEach(function (d) {
          d.addEventListener('click', this.activate.bind(this, d.dataset.index));
        }, this);

        if (this.line && this.stage && !this.reduce && 'IntersectionObserver' in window) {
          var io = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (e) {
                if (e.isIntersecting) {
                  this.scan();
                  io.disconnect();
                }
              }, this);
            }.bind(this),
            { threshold: 0.4 }
          );
          io.observe(this.stage);
        }
      }

      activate(index) {
        this.pins.forEach(function (p) {
          p.setAttribute('aria-pressed', p.dataset.index === index ? 'true' : 'false');
        });
        this.details.forEach(function (d) {
          d.setAttribute('aria-pressed', d.dataset.index === index ? 'true' : 'false');
        });
      }

      scan() {
        if (!this.line || !this.line.animate) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var base = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-base')) || 300;
        this.line.animate(
          [
            { transform: 'translateY(0)', opacity: 0 },
            { opacity: 1, offset: 0.12 },
            { opacity: 1, offset: 0.88 },
            { transform: 'translateY(' + this.stage.offsetHeight + 'px)', opacity: 0 },
          ],
          { duration: base * 3, easing: 'cubic-bezier(.16,1,.3,1)' }
        );
      }
    }
  );
}
