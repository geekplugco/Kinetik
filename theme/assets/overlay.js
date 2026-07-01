window.KinetikOverlay = (function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var locks = 0;

  function lockScroll() {
    locks += 1;
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockScroll() {
    locks = Math.max(0, locks - 1);
    if (locks === 0) document.documentElement.style.overflow = '';
  }

  function afterTransition(el, cb) {
    if (reduce || !el) {
      cb();
      return;
    }
    var done = false;
    var finish = function (e) {
      if (e && e.target !== el) return;
      if (done) return;
      done = true;
      el.removeEventListener('transitionend', finish);
      cb();
    };
    el.addEventListener('transitionend', finish);
    var dur = parseFloat(getComputedStyle(el).transitionDuration) || 0;
    setTimeout(finish, dur * 1000 + 80);
  }

  return { lockScroll: lockScroll, unlockScroll: unlockScroll, afterTransition: afterTransition, reduce: reduce };
})();
