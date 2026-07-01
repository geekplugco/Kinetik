if (!customElements.get('mega-menu')) {
  customElements.define(
    'mega-menu',
    class MegaMenu extends HTMLElement {
      connectedCallback() {
        this.items = Array.from(this.querySelectorAll('[data-nav-item]'));
        this.panels = {};
        Array.from(this.querySelectorAll('[data-panel]')).forEach(function (p) {
          this.panels[p.getAttribute('data-panel')] = p;
        }, this);
        this.closeTimer = null;

        this.items.forEach(function (item) {
          var trigger = item.querySelector('[data-nav-trigger]');
          if (!trigger) return;
          var key = trigger.getAttribute('data-panel-key');
          item.addEventListener('mouseenter', this.show.bind(this, key));
          trigger.addEventListener('focus', this.show.bind(this, key));
        }, this);

        Object.keys(this.panels).forEach(function (key) {
          var panel = this.panels[key];
          panel.addEventListener('mouseenter', this.cancelClose.bind(this));
          panel.addEventListener('mouseleave', this.scheduleClose.bind(this));
        }, this);

        var nav = this.querySelector('[data-nav]');
        if (nav) {
          nav.addEventListener('mouseleave', this.scheduleClose.bind(this));
          nav.addEventListener('mouseenter', this.cancelClose.bind(this));
        }
        this.addEventListener('focusout', this.onFocusOut.bind(this));

        this.menuPanel = document.querySelector('[data-menu-panel]');
        this.menuOverlay = document.querySelector('[data-menu-overlay]');
        this.openBtn = this.querySelector('[data-menu-open]');
        var closeBtn = document.querySelector('[data-menu-close]');
        if (this.openBtn) this.openBtn.addEventListener('click', this.openMenu.bind(this));
        if (closeBtn) closeBtn.addEventListener('click', this.closeMenu.bind(this));
        if (this.menuOverlay) this.menuOverlay.addEventListener('click', this.closeMenu.bind(this));

        document.querySelectorAll('[data-sub-toggle]').forEach(function (btn) {
          btn.addEventListener('click', this.toggleSub.bind(this, btn));
        }, this);

        this.onKey = this.onKey.bind(this);
        document.addEventListener('keydown', this.onKey);
      }

      disconnectedCallback() {
        document.removeEventListener('keydown', this.onKey);
      }

      show(key) {
        this.cancelClose();
        Object.keys(this.panels).forEach(function (k) {
          this.setPanel(k, k === key);
        }, this);
      }

      setPanel(key, open) {
        var panel = this.panels[key];
        if (!panel) return;
        panel.classList.toggle('hidden', !open);
        var trigger = this.querySelector('[data-panel-key="' + key + '"]');
        if (trigger) {
          trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
          var chevron = trigger.querySelector('svg');
          if (chevron) chevron.classList.toggle('rotate-180', open);
        }
      }

      hideAll() {
        Object.keys(this.panels).forEach(function (k) { this.setPanel(k, false); }, this);
      }

      scheduleClose() {
        this.cancelClose();
        this.closeTimer = window.setTimeout(this.hideAll.bind(this), 150);
      }

      cancelClose() {
        if (this.closeTimer) { window.clearTimeout(this.closeTimer); this.closeTimer = null; }
      }

      onFocusOut(e) {
        if (!this.contains(e.relatedTarget)) this.hideAll();
      }

      openMenu() {
        if (!this.menuPanel) return;
        this.menuPanel.classList.remove('-translate-x-full');
        this.menuPanel.classList.add('translate-x-0');
        if (this.menuOverlay) {
          this.menuOverlay.classList.remove('pointer-events-none', 'opacity-0');
          this.menuOverlay.classList.add('opacity-100');
        }
        document.body.style.overflow = 'hidden';
        if (this.openBtn) this.openBtn.setAttribute('aria-expanded', 'true');
        var close = document.querySelector('[data-menu-close]');
        if (close) close.focus();
        if (window.KinetikTrap && this.menuPanel) window.KinetikTrap.trap(this.menuPanel);
      }

      closeMenu() {
        if (!this.menuPanel) return;
        this.menuPanel.classList.add('-translate-x-full');
        this.menuPanel.classList.remove('translate-x-0');
        if (this.menuOverlay) {
          this.menuOverlay.classList.add('pointer-events-none', 'opacity-0');
          this.menuOverlay.classList.remove('opacity-100');
        }
        document.body.style.overflow = '';
        if (window.KinetikTrap) window.KinetikTrap.release(false);
        if (this.openBtn) { this.openBtn.setAttribute('aria-expanded', 'false'); this.openBtn.focus(); }
      }

      toggleSub(btn) {
        var li = btn.closest('li');
        if (!li) return;
        var panel = li.querySelector('[data-sub-panel]');
        var plus = btn.querySelector('[data-sub-plus]');
        var minus = btn.querySelector('[data-sub-minus]');
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        btn.setAttribute('aria-label', (open ? 'Expand' : 'Collapse') + (btn.getAttribute('aria-label') || '').replace(/^(Expand|Collapse)/, ''));
        if (panel) panel.classList.toggle('hidden', open);
        if (plus) plus.classList.toggle('hidden', !open);
        if (minus) minus.classList.toggle('hidden', open);
      }

      onKey(e) {
        if (e.key !== 'Escape') return;
        this.hideAll();
        if (this.menuPanel && !this.menuPanel.classList.contains('-translate-x-full')) this.closeMenu();
      }
    }
  );
}
