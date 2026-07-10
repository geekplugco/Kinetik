if (!customElements.get('back-to-top')) {
  customElements.define(
    'back-to-top',
    class BackToTop extends HTMLElement {
      connectedCallback() {
        this.button = this.querySelector('[data-back-to-top-button]');
        this.threshold = window.innerHeight;
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScroll, { passive: true });
        if (this.button) this.button.addEventListener('click', this.scrollToTop.bind(this));
        this.onScroll();
      }

      disconnectedCallback() {
        window.removeEventListener('scroll', this.onScroll);
      }

      onScroll() {
        this.hidden = window.scrollY < this.threshold;
      }

      scrollToTop() {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
  );
}
