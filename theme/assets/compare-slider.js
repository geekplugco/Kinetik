if (!customElements.get('compare-slider')) {
  customElements.define(
    'compare-slider',
    class CompareSlider extends HTMLElement {
      connectedCallback() {
        this.clip = this.querySelector('[data-compare-clip]');
        this.handle = this.querySelector('[data-compare-handle]');
        if (!this.clip || !this.handle) return;
        this.dragging = false;
        this.pos = 50;
        this.set(50);
        this.addEventListener('pointerdown', (e) => {
          this.dragging = true;
          if (this.setPointerCapture) this.setPointerCapture(e.pointerId);
          this.move(e);
        });
        this.addEventListener('pointermove', (e) => {
          if (this.dragging) this.move(e);
        });
        this.addEventListener('pointerup', () => { this.dragging = false; });
        this.addEventListener('pointercancel', () => { this.dragging = false; });
        this.handle.addEventListener('keydown', (e) => {
          const step = e.shiftKey ? 10 : 2;
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { this.set(this.pos - step); e.preventDefault(); }
          else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { this.set(this.pos + step); e.preventDefault(); }
          else if (e.key === 'Home') { this.set(0); e.preventDefault(); }
          else if (e.key === 'End') { this.set(100); e.preventDefault(); }
        });
      }

      move(e) {
        const r = this.getBoundingClientRect();
        if (!r.width) return;
        this.set(((e.clientX - r.left) / r.width) * 100);
      }

      set(pct) {
        pct = Math.max(0, Math.min(100, pct));
        this.pos = pct;
        this.clip.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
        this.handle.style.left = pct + '%';
        this.handle.setAttribute('aria-valuenow', Math.round(pct));
      }
    }
  );
}
