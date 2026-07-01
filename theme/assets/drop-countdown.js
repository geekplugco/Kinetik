if (!customElements.get('drop-countdown')) {
  customElements.define(
    'drop-countdown',
    class DropCountdown extends HTMLElement {
      connectedCallback() {
        this.target = new Date(this.getAttribute('data-target') || '').getTime();
        this.timerEl = this.querySelector('[data-timer]');
        this.liveEl = this.querySelector('[data-live]');
        this.units = {
          days: this.querySelector('[data-unit="days"]'),
          hrs: this.querySelector('[data-unit="hrs"]'),
          min: this.querySelector('[data-unit="min"]'),
          sec: this.querySelector('[data-unit="sec"]'),
        };

        if (!isNaN(this.target)) {
          this.update();
          this.tickId = window.setInterval(this.update.bind(this), 1000);
        }

        this.initTicker();
      }

      disconnectedCallback() {
        if (this.tickId) window.clearInterval(this.tickId);
        if (this.tickerId) window.clearInterval(this.tickerId);
      }

      pad(n) {
        return n < 10 ? '0' + n : String(n);
      }

      update() {
        var diff = Math.max(0, this.target - Date.now());
        if (diff === 0) {
          this.setLive();
          if (this.tickId) { window.clearInterval(this.tickId); this.tickId = null; }
          return;
        }
        var d = Math.floor(diff / 86400000);
        var h = Math.floor(diff / 3600000) % 24;
        var m = Math.floor(diff / 60000) % 60;
        var s = Math.floor(diff / 1000) % 60;
        if (this.units.days) this.units.days.textContent = this.pad(d);
        if (this.units.hrs) this.units.hrs.textContent = this.pad(h);
        if (this.units.min) this.units.min.textContent = this.pad(m);
        if (this.units.sec) this.units.sec.textContent = this.pad(s);
      }

      setLive() {
        if (this.timerEl) { this.timerEl.classList.add('hidden'); this.timerEl.setAttribute('aria-hidden', 'true'); }
        if (this.liveEl) { this.liveEl.classList.remove('hidden'); this.liveEl.removeAttribute('aria-hidden'); }
      }

      initTicker() {
        var wrap = this.querySelector('[data-ticker]');
        if (!wrap) return;
        var text = wrap.querySelector('[data-ticker-text]');
        var raw = wrap.getAttribute('data-items') || '';
        this.items = raw.split('||').filter(Boolean);
        if (!text || this.items.length < 2) return;
        this.tIndex = 0;
        this.tickerId = window.setInterval(function () {
          this.tIndex = (this.tIndex + 1) % this.items.length;
          text.classList.remove('is-in');
          void text.offsetWidth;
          text.textContent = this.items[this.tIndex];
          text.classList.add('is-in');
        }.bind(this), 3200);
      }
    }
  );
}
