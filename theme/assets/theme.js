(function () {
  var hasIO = 'IntersectionObserver' in window;
  var io = hasIO
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 })
    : null;

  var revealSelector = '.hp-reveal, .hp-rule-draw, [data-kx-effect="exposure"], [data-kx-effect="trace"]';

  function observeReveals(root) {
    var els = root.querySelectorAll(revealSelector);
    if (root.matches && root.matches(revealSelector)) els = [root].concat(Array.prototype.slice.call(els));
    if (!hasIO) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    els.forEach(function (el) { io.observe(el); });
  }

  observeReveals(document);
  window.addEventListener('load', function () { observeReveals(document); });
  window.setTimeout(function () {
    document.querySelectorAll(revealSelector).forEach(function (el) {
      if (el.classList.contains('is-in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0 && r.width > 0) el.classList.add('is-in');
    });
  }, 1200);

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

(function () {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function part(cls) {
    var el = document.createElement('span');
    el.className = cls;
    el.setAttribute('aria-hidden', 'true');
    return el;
  }

  function arm(host) {
    host.__kxCaliper = true;
    var x = part('kx-caliper-x');
    var y = part('kx-caliper-y');
    var chip = part('kx-caliper-chip');
    host.appendChild(x);
    host.appendChild(y);
    host.appendChild(chip);
    host.addEventListener('pointermove', function (e) {
      var r = host.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var px = Math.min(Math.max(e.clientX - r.left, 0), r.width);
      var py = Math.min(Math.max(e.clientY - r.top, 0), r.height);
      x.style.transform = 'translateX(' + px.toFixed(1) + 'px)';
      y.style.transform = 'translateY(' + py.toFixed(1) + 'px)';
      chip.textContent = 'x' + Math.round((px / r.width) * 100) + ' · y' + Math.round((py / r.height) * 100);
    });
    host.addEventListener('pointerenter', function () { host.classList.add('kx-caliper-live'); });
    host.addEventListener('pointerleave', function () { host.classList.remove('kx-caliper-live'); });
  }

  document.addEventListener('pointerover', function (e) {
    if (!fine.matches || reduce.matches) return;
    var target = e.target;
    if (!target || !target.closest) return;
    var host = target.closest('[data-kx-effect="caliper"]');
    if (host && !host.__kxCaliper) {
      arm(host);
      host.classList.add('kx-caliper-live');
    }
  });
})();
