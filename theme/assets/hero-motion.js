if (!customElements.get('hero-motion')) {
  customElements.define(
    'hero-motion',
    class HeroMotion extends HTMLElement {
      connectedCallback() {
        this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        this.slides = Array.from(this.querySelectorAll('[data-hm-slide]'));
        this.layer = this.querySelector('[data-hm-layer]');
        this.indexEl = this.querySelector('[data-hm-index]');
        this.labelEl = this.querySelector('[data-hm-label]');
        this.progressEl = this.querySelector('[data-hm-progress]');
        this.stats = Array.from(this.querySelectorAll('[data-hm-stat]'));
        this.magnets = Array.from(this.querySelectorAll('[data-hm-magnet]'));
        this.index = 0;
        this.statIndex = 0;
        this.raf = 0;
        this.cx = 0;
        this.cy = 0;
        this.tx = 0;
        this.ty = 0;
        this.px = -1e4;
        this.py = -1e4;
        this.initRotation();
        this.initStats();
        this.initPointer();
      }

      disconnectedCallback() {
        if (this.statTimer) clearInterval(this.statTimer);
        if (this.onVis) document.removeEventListener('visibilitychange', this.onVis);
        if (this.raf) cancelAnimationFrame(this.raf);
      }

      initRotation() {
        if (this.reduce || this.slides.length < 2 || !this.progressEl) return;
        this.progressEl.addEventListener('animationend', () => {
          this.show((this.index + 1) % this.slides.length);
          this.runProgress();
        });
        if (this.fine) {
          this.addEventListener('pointerenter', () => this.classList.add('hm-paused'));
          this.addEventListener('pointerleave', () => this.classList.remove('hm-paused'));
        }
        this.onVis = () => this.classList.toggle('hm-paused', document.hidden);
        document.addEventListener('visibilitychange', this.onVis);
        this.runProgress();
      }

      runProgress() {
        this.progressEl.classList.remove('hm-progress-run');
        void this.progressEl.offsetWidth;
        this.progressEl.classList.add('hm-progress-run');
      }

      show(i) {
        this.slides.forEach((el, j) => {
          const on = j === i;
          el.classList.toggle('opacity-100', on);
          el.classList.toggle('opacity-0', !on);
          el.classList.toggle('pointer-events-none', !on);
          el.setAttribute('aria-hidden', on ? 'false' : 'true');
        });
        this.index = i;
        if (this.indexEl) this.indexEl.textContent = String(i + 1).padStart(2, '0');
        if (this.labelEl && this.slides[i].dataset.label) this.labelEl.textContent = this.slides[i].dataset.label;
      }

      initStats() {
        if (!this.stats.length) return;
        this.stats[0].setAttribute('data-active', '');
        if (this.reduce || this.stats.length < 2) return;
        this.statTimer = setInterval(() => {
          if (document.hidden) return;
          this.stats[this.statIndex].removeAttribute('data-active');
          this.statIndex = (this.statIndex + 1) % this.stats.length;
          this.stats[this.statIndex].setAttribute('data-active', '');
        }, 2500);
      }

      initPointer() {
        if (this.reduce || !this.fine) return;
        this.parallaxOn = this.dataset.parallax === 'true' && !!this.layer;
        if (!this.parallaxOn && !this.magnets.length) return;
        this.addEventListener('pointermove', (e) => {
          this.px = e.clientX;
          this.py = e.clientY;
          if (this.parallaxOn) {
            const r = this.getBoundingClientRect();
            this.tx = (0.5 - (e.clientX - r.left) / r.width) * 20;
            this.ty = (0.5 - (e.clientY - r.top) / r.height) * 20;
          }
          this.queue();
        });
        this.addEventListener('pointerleave', () => {
          this.px = -1e4;
          this.py = -1e4;
          this.tx = 0;
          this.ty = 0;
          this.queue();
        });
      }

      queue() {
        if (!this.raf) this.raf = requestAnimationFrame(() => this.tick());
      }

      tick() {
        this.raf = 0;
        let live = false;
        if (this.parallaxOn) {
          this.cx += (this.tx - this.cx) * 0.12;
          this.cy += (this.ty - this.cy) * 0.12;
          if (Math.abs(this.tx - this.cx) > 0.08 || Math.abs(this.ty - this.cy) > 0.08) {
            live = true;
          } else {
            this.cx = this.tx;
            this.cy = this.ty;
          }
          this.layer.style.transform = 'translate3d(' + this.cx.toFixed(2) + 'px,' + this.cy.toFixed(2) + 'px,0)';
        }
        this.magnets.forEach((m) => {
          const r = m.getBoundingClientRect();
          const dx = this.px - (r.left + r.width / 2);
          const dy = this.py - (r.top + r.height / 2);
          const reach = Math.max(r.width, r.height) / 2 + 40;
          const dist = Math.hypot(dx, dy);
          if (dist < reach) {
            const pull = (1 - dist / reach) * 6;
            const len = dist || 1;
            m.style.transform = 'translate3d(' + ((dx / len) * pull).toFixed(2) + 'px,' + ((dy / len) * pull).toFixed(2) + 'px,0)';
          } else if (m.style.transform) {
            m.style.transform = '';
          }
        });
        if (live) this.queue();
      }
    }
  );
}
