(function () {
  var hasIO = 'IntersectionObserver' in window;
  var io = hasIO
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 })
    : null;

  function observeReveals(root) {
    var els = root.querySelectorAll('.hp-reveal, .hp-rule-draw');
    if (root.matches && root.matches('.hp-reveal, .hp-rule-draw')) els = [root].concat(Array.prototype.slice.call(els));
    if (!hasIO) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    els.forEach(function (el) { io.observe(el); });
  }

  observeReveals(document);

  var revealMutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) observeReveals(node);
      });
    });
  });
  revealMutationObserver.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('shopify:section:load', function (e) { observeReveals(e.target); });

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
