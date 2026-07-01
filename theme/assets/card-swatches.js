(function () {
  function media(sw) {
    var card = sw.closest('article');
    return card ? card.querySelector('[data-card-media] img') : null;
  }
  function preview(sw) {
    if (!sw.dataset.img || !window.KinetikMedia) return;
    var img = media(sw);
    if (!img) return;
    if (img.dataset.orig === undefined) img.dataset.orig = img.currentSrc || img.getAttribute('src') || '';
    window.KinetikMedia.swap(img, sw.dataset.img);
  }
  function restore(sw) {
    if (!window.KinetikMedia) return;
    var img = media(sw);
    if (!img || img.dataset.orig === undefined) return;
    window.KinetikMedia.swap(img, img.dataset.orig);
  }
  document.addEventListener('mouseover', function (e) {
    var sw = e.target.closest('[data-card-swatch]');
    if (sw) preview(sw);
  });
  document.addEventListener('mouseout', function (e) {
    var sw = e.target.closest('[data-card-swatch]');
    if (sw) restore(sw);
  });
  document.addEventListener('focusin', function (e) {
    var sw = e.target.closest('[data-card-swatch]');
    if (sw) preview(sw);
  });
  document.addEventListener('focusout', function (e) {
    var sw = e.target.closest('[data-card-swatch]');
    if (sw) restore(sw);
  });
})();
