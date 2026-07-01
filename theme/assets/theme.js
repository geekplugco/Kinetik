(function () {
  var els = document.querySelectorAll('.hp-reveal, .hp-rule-draw');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  window.Kinetik = window.Kinetik || {};
  window.Kinetik.refreshCart = async function () {
    var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    var res = await fetch(root + 'cart.js', { headers: { Accept: 'application/json' } });
    var cart = await res.json();
    document.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: { cart: cart } }));
    return cart;
  };
  document.addEventListener('cart:added', function () { window.Kinetik.refreshCart(); });
})();
