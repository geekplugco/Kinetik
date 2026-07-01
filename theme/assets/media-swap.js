window.KinetikMedia = (function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function preload(urls) {
    (urls || []).forEach(function (u) {
      if (u) {
        var i = new Image();
        i.src = u;
      }
    });
  }

  function commit(img, src) {
    img.setAttribute('srcset', '');
    img.setAttribute('src', src);
  }

  function swap(img, src) {
    if (!img || !src || img.dataset.shownSrc === src) return;
    img.dataset.shownSrc = src;

    var run = function () {
      if (reduce || !img.parentElement) {
        commit(img, src);
        return;
      }
      var overlay = img.cloneNode(false);
      overlay.removeAttribute('srcset');
      overlay.setAttribute('src', src);
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.position = 'absolute';
      overlay.style.inset = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 340ms cubic-bezier(.16,1,.3,1)';
      img.parentElement.appendChild(overlay);
      requestAnimationFrame(function () {
        overlay.style.opacity = '1';
      });
      var done = function () {
        if (!overlay.isConnected) return;
        commit(img, src);
        overlay.remove();
      };
      overlay.addEventListener('transitionend', done, { once: true });
      setTimeout(done, 480);
    };

    var pre = new Image();
    if (pre.decode) {
      pre.src = src;
      pre.decode().then(run).catch(run);
    } else {
      pre.onload = run;
      pre.onerror = run;
      pre.src = src;
    }
  }

  return { preload: preload, swap: swap, reduce: reduce };
})();
