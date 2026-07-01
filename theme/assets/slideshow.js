if (!customElements.get('slideshow-carousel')) {
  customElements.define(
    'slideshow-carousel',
    class SlideshowCarousel extends HTMLElement {
      connectedCallback() {
        this.slides = Array.from(this.querySelectorAll('[data-slide]'));
        this.dots = Array.from(this.querySelectorAll('[data-dot]'));
        this.mode = this.getAttribute('data-transition') === 'slide' ? 'slide' : 'fade';
        this.index = 0;
        this.timer = null;
        this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (this.slides.length < 2) {
          this.render();
          return;
        }

        var prev = this.querySelector('[data-prev]');
        var next = this.querySelector('[data-next]');
        if (prev) prev.addEventListener('click', this.go.bind(this, -1));
        if (next) next.addEventListener('click', this.go.bind(this, 1));
        this.dots.forEach(function (dot, i) {
          dot.addEventListener('click', this.to.bind(this, i));
        }, this);

        this.addEventListener('keydown', this.onKey.bind(this));
        this.addEventListener('mouseenter', this.stop.bind(this));
        this.addEventListener('mouseleave', this.start.bind(this));
        this.addEventListener('focusin', this.stop.bind(this));
        this.addEventListener('focusout', this.start.bind(this));

        var area = this.querySelector('[data-slides]') || this;
        area.addEventListener('pointerdown', this.onDown.bind(this));
        area.addEventListener('pointerup', this.onUp.bind(this));
        area.addEventListener('pointercancel', this.clearSwipe.bind(this));

        document.addEventListener('visibilitychange', function () {
          if (document.hidden) this.stop();
          else this.start();
        }.bind(this));

        this.render();
        this.start();
      }

      disconnectedCallback() {
        this.stop();
      }

      render() {
        this.slides.forEach(function (el, i) {
          var active = i === this.index;
          if (this.mode === 'slide') {
            el.style.transform = 'translateX(' + (i - this.index) * 100 + '%)';
            el.classList.toggle('pointer-events-none', !active);
          } else {
            el.classList.toggle('opacity-100', active);
            el.classList.toggle('opacity-0', !active);
            el.classList.toggle('pointer-events-none', !active);
          }
          el.setAttribute('aria-hidden', active ? 'false' : 'true');
        }, this);
        this.dots.forEach(function (dot, i) {
          var active = i === this.index;
          dot.classList.toggle('bg-accent', active);
          dot.classList.toggle('bg-paper/40', !active);
          dot.setAttribute('aria-current', active ? 'true' : 'false');
        }, this);
      }

      to(i) {
        var n = this.slides.length;
        this.index = ((i % n) + n) % n;
        this.render();
      }

      go(dir) {
        this.to(this.index + dir);
        this.start();
      }

      onKey(e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); this.go(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); this.go(1); }
      }

      onDown(e) {
        this.startX = e.clientX;
      }

      onUp(e) {
        if (this.startX == null) return;
        var dx = e.clientX - this.startX;
        if (Math.abs(dx) > 40) this.go(dx < 0 ? 1 : -1);
        this.startX = null;
      }

      clearSwipe() {
        this.startX = null;
      }

      start() {
        this.stop();
        if (this.reduce) return;
        if (this.getAttribute('data-autoplay') !== 'true') return;
        if (this.slides.length < 2) return;
        var delay = parseInt(this.getAttribute('data-delay'), 10) || 5000;
        this.timer = window.setInterval(this.go.bind(this, 1), delay);
      }

      stop() {
        if (this.timer) { window.clearInterval(this.timer); this.timer = null; }
      }
    }
  );
}
