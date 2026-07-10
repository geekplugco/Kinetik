(function () {
  if (!customElements.get('related-products-section')) {
    customElements.define(
      'related-products-section',
      class RelatedProductsSection extends HTMLElement {
        connectedCallback() {
          this.grid = this.querySelector('[data-related-grid]');
          this.url = this.dataset.url;
          if (!this.hasAttribute('data-pending') || !this.url || !this.grid) return;
          this.observer = new IntersectionObserver(this.handleIntersection.bind(this), { rootMargin: '0px 0px 200px 0px' });
          this.observer.observe(this);
        }
        handleIntersection(entries) {
          if (!entries[0].isIntersecting) return;
          this.observer.unobserve(this);
          this.fetchRecommendations();
        }
        async fetchRecommendations() {
          try {
            const response = await fetch(this.url);
            if (!response.ok) { this.hide(); return; }
            const text = await response.text();
            const html = document.createElement('div');
            html.innerHTML = text;
            const grid = html.querySelector('[data-related-grid]');
            const hasProducts = grid && grid.children.length && !grid.querySelector('[data-related-loading]');
            if (hasProducts) {
              this.grid.innerHTML = grid.innerHTML;
              this.removeAttribute('data-pending');
            } else {
              this.hide();
            }
          } catch (e) {
            this.hide();
          }
        }
        hide() {
          this.hidden = true;
          this.style.display = 'none';
        }
      }
    );
  }
})();
