window.KinetikTrap = (function () {
  var handler = null;
  var opener = null;

  function focusable(container) {
    var sel = 'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    return Array.prototype.slice.call(container.querySelectorAll(sel)).filter(function (el) {
      return el.offsetWidth || el.offsetHeight || el.getClientRects().length;
    });
  }

  return {
    trap: function (container, trigger) {
      this.release(false);
      opener = trigger || document.activeElement;
      handler = function (e) {
        if (e.key !== 'Tab') return;
        var list = focusable(container);
        if (!list.length) return;
        var first = list[0];
        var last = list[list.length - 1];
        if (!container.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener('keydown', handler);
    },
    release: function (returnFocus) {
      if (handler) document.removeEventListener('keydown', handler);
      handler = null;
      if (returnFocus && opener && typeof opener.focus === 'function') opener.focus();
      opener = null;
    },
  };
})();
