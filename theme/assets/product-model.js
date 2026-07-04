(function () {
  if (window.__kxModelViewerBooted) return;
  window.__kxModelViewerBooted = true;

  function init(errors) {
    if (errors || !window.Shopify || !window.Shopify.ModelViewerUI) return;
    document.querySelectorAll('model-viewer:not([data-kx-mv-init])').forEach(function (el) {
      el.setAttribute('data-kx-mv-init', '');
      new window.Shopify.ModelViewerUI(el);
    });
  }

  if (window.Shopify && typeof window.Shopify.loadFeatures === 'function') {
    window.Shopify.loadFeatures([{ name: 'model-viewer-ui', version: '1.0', onLoad: init }]);
  }

  document.addEventListener('shopify:section:load', function () { init(); });
})();
