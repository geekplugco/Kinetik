/* @ds-bundle: {"format":3,"namespace":"KinetikDesignSystem_fefe1a","components":[{"name":"CartLineItem","sourcePath":"components/commerce/CartLineItem.jsx"},{"name":"CollectionCard","sourcePath":"components/commerce/CollectionCard.jsx"},{"name":"Drawer","sourcePath":"components/commerce/Drawer.jsx"},{"name":"MediaTile","sourcePath":"components/commerce/MediaTile.jsx"},{"name":"PriceTag","sourcePath":"components/commerce/PriceTag.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"ShippingBar","sourcePath":"components/commerce/ShippingBar.jsx"},{"name":"TrustBar","sourcePath":"components/commerce/TrustBar.jsx"},{"name":"VariantPicker","sourcePath":"components/commerce/VariantPicker.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"StarRating","sourcePath":"components/feedback/StarRating.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"OptionSwatch","sourcePath":"components/forms/OptionSwatch.jsx"},{"name":"QuantityStepper","sourcePath":"components/forms/QuantityStepper.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"AnnouncementBar","sourcePath":"components/navigation/AnnouncementBar.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"ArticleCard","sourcePath":"components/sections/ArticleCard.jsx"},{"name":"SectionHeading","sourcePath":"components/sections/SectionHeading.jsx"}],"sourceHashes":{"components/commerce/CartLineItem.jsx":"2f1ef40405b4","components/commerce/CollectionCard.jsx":"60f311d1480d","components/commerce/Drawer.jsx":"ac3f7db8af8d","components/commerce/MediaTile.jsx":"6fc36f4b2496","components/commerce/PriceTag.jsx":"c80399791c33","components/commerce/ProductCard.jsx":"58ece2f19b6b","components/commerce/ShippingBar.jsx":"1e70c3b6eec7","components/commerce/TrustBar.jsx":"2e3f76a5fd50","components/commerce/VariantPicker.jsx":"04d18d538246","components/core/Button.jsx":"31fefd39e018","components/core/Icon.jsx":"3294b6da13a5","components/core/IconButton.jsx":"9a55a9f7fed9","components/core/Logo.jsx":"b9283ff9badc","components/core/Tag.jsx":"87e02da32bf8","components/feedback/Accordion.jsx":"6d8d37a223f6","components/feedback/Dialog.jsx":"1120460f7c0e","components/feedback/StarRating.jsx":"2cb2c6b95b36","components/feedback/Toast.jsx":"fe7c2d45cc4d","components/forms/Input.jsx":"0909c02e03e9","components/forms/OptionSwatch.jsx":"23a555e700ed","components/forms/QuantityStepper.jsx":"03d868f731bf","components/forms/Select.jsx":"73afa8b9b0bf","components/navigation/AnnouncementBar.jsx":"cca808933ce4","components/navigation/Breadcrumbs.jsx":"c6bfd6cdfc55","components/navigation/Pagination.jsx":"6c165abe2fc6","components/navigation/Tabs.jsx":"7eaf03812987","components/sections/ArticleCard.jsx":"a4392f8b7cbb","components/sections/SectionHeading.jsx":"5592868aa95c","ui_kits/storefront/Footer.jsx":"a1abc80bb788","ui_kits/storefront/Header.jsx":"1dc5bb5a276d","ui_kits/storefront/HomeView.jsx":"30b96442b33a","ui_kits/storefront/PdpView.jsx":"4a1cdbf56a2f","ui_kits/storefront/PlpView.jsx":"2bcbb0a2f05a","ui_kits/storefront/data.js":"2c25f10c0717"},"inlinedExternals":[],"unexposedExports":[{"name":"isUnavailable","sourcePath":"components/commerce/VariantPicker.jsx"}]} */

(() => {

const __ds_ns = (window.KinetikDesignSystem_fefe1a = window.KinetikDesignSystem_fefe1a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/MediaTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Media tile — the hover-to-play product media frame.
 * If `src` is an image it renders it; if `videoSrc` is given, it plays on hover
 * (muted, looped, inline). With neither, it renders a branded placeholder so
 * layouts hold their shape before real media is dropped in.
 */
function MediaTile({
  src,
  videoSrc,
  alt = '',
  ratio = '4 / 5',
  code,
  tone = 'light',
  rounded = false,
  children,
  style,
  ...rest
}) {
  const videoRef = React.useRef(null);
  const isDark = tone === 'dark';
  const onEnter = () => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play?.();
    }
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause?.();
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    style: {
      position: 'relative',
      aspectRatio: ratio,
      overflow: 'hidden',
      background: isDark ? 'var(--ink-900)' : 'var(--ink-100)',
      borderRadius: rounded ? 'var(--radius-lg)' : 'var(--radius-0)',
      ...style
    }
  }, rest), src && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      inset: 0
    }
  }), videoSrc && /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    src: videoSrc,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "metadata",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      inset: 0
    }
  }), !src && !videoSrc &&
  /*#__PURE__*/
  // Branded placeholder — exposed-grid feel
  React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: isDark ? 'linear-gradient(var(--ink-800) 1px, transparent 1px), linear-gradient(90deg, var(--ink-800) 1px, transparent 1px)' : 'linear-gradient(var(--ink-150) 1px, transparent 1px), linear-gradient(90deg, var(--ink-150) 1px, transparent 1px)',
      backgroundSize: '28px 28px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: isDark ? 'var(--ink-500)' : 'var(--ink-400)'
    }
  }, code || 'Media')), children);
}
Object.assign(__ds_scope, { MediaTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/MediaTile.jsx", error: String((e && e.message) || e) }); }

// components/commerce/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Format a number as USD with no trailing cents when whole. */
function fmt(n, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2
    }).format(n);
  } catch {
    return '$' + n;
  }
}

/**
 * Price block — mono numerals. Optional compare-at (struck) reveals a volt
 * discount; the sale price inherits ink (never colored) to keep volt scarce.
 */
function PriceTag({
  price,
  compareAt,
  currency = 'USD',
  size = 'md',
  align = 'left',
  style,
  ...rest
}) {
  const onSale = compareAt != null && compareAt > price;
  const fs = size === 'lg' ? 28 : size === 'sm' ? 14 : 18;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: fs,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)'
    }
  }, fmt(price, currency)), onSale && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: fs * 0.62,
      color: 'var(--text-faint)',
      textDecoration: 'line-through'
    }
  }, fmt(compareAt, currency)));
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: {
    padding: '8px 14px',
    fontSize: 12,
    gap: 6,
    icon: 15
  },
  md: {
    padding: '12px 20px',
    fontSize: 13,
    gap: 8,
    icon: 17
  },
  lg: {
    padding: '16px 28px',
    fontSize: 15,
    gap: 10,
    icon: 19
  }
};
function palette(variant, hovered, pressed) {
  switch (variant) {
    case 'primary':
      // volt — conversion
      return {
        background: pressed ? 'var(--accent-press)' : hovered ? 'var(--accent-hover)' : 'var(--accent)',
        color: 'var(--accent-ink)',
        border: '1px solid transparent'
      };
    case 'inverse':
      // ink block
      return {
        background: pressed ? 'var(--ink-700)' : hovered ? 'var(--ink-800)' : 'var(--surface-inverse)',
        color: 'var(--text-inverse)',
        border: '1px solid var(--surface-inverse)'
      };
    case 'ghost':
      return {
        background: hovered ? 'var(--surface-sunken)' : 'transparent',
        color: 'var(--text-strong)',
        border: '1px solid transparent'
      };
    case 'secondary': // hairline outline
    default:
      return {
        background: hovered ? 'var(--surface-sunken)' : 'transparent',
        color: 'var(--text-strong)',
        border: '1px solid var(--border-strong)'
      };
  }
}

/**
 * Kinetik button. Square by default, display type, uppercase tracked label.
 * Primary = volt and is reserved for the page's main conversion action.
 */
function Button({
  variant = 'secondary',
  size = 'md',
  iconLeft,
  iconRight,
  block = false,
  uppercase = true,
  disabled = false,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const pal = palette(variant, hovered && !disabled, pressed && !disabled);
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: e => {
      setHovered(true);
      onMouseEnter?.(e);
    },
    onMouseLeave: e => {
      setHovered(false);
      setPressed(false);
      onMouseLeave?.(e);
    },
    onMouseDown: e => {
      setPressed(true);
      onMouseDown?.(e);
    },
    onMouseUp: e => {
      setPressed(false);
      onMouseUp?.(e);
    },
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      padding: s.padding,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: s.fontSize,
      letterSpacing: uppercase ? '0.06em' : '-0.01em',
      textTransform: uppercase ? 'uppercase' : 'none',
      lineHeight: 1,
      borderRadius: 'var(--radius-0)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
      transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-out)',
      ...pal,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Kinetik icon set — Lucide-style 24px line glyphs.
 * Stroke 1.75, round joins, currentColor. No fills except solid `play`.
 * Substitution note: these are Lucide-derived (ISC) paths, redrawn inline so
 * the system ships zero runtime icon dependency.
 */
const PATHS = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  menu: '<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  play: '<path d="M6 3 20 12 6 21V3Z" fill="currentColor" stroke="none"/>',
  star: '<path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2Z"/>',
  package: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>'
};
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  className = '',
  style,
  ...rest
}) {
  const inner = PATHS[name] || '';
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: {
      display: 'block',
      flex: 'none',
      ...style
    },
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: inner
    }
  }, rest));
}

/** Names available in the Kinetik icon set. */
const ICON_NAMES = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CollectionCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Collection tile — media with an overlaid label + item count. For the homepage
 * category bento and collection-list sections.
 */
function CollectionCard({
  name,
  count,
  src,
  code,
  ratio = '4 / 5',
  onOpen,
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    onClick: onOpen,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      position: 'relative',
      display: 'block',
      cursor: 'pointer',
      overflow: 'hidden',
      background: 'var(--ink-100)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.MediaTile, {
    src: src,
    code: code || name,
    ratio: ratio,
    tone: "dark",
    style: {
      transform: hovered ? 'scale(1.03)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(10,10,10,0.55), rgba(10,10,10,0) 55%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 'var(--space-5) var(--space-5)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 24,
      color: 'var(--paper)',
      lineHeight: 1
    }
  }, name), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.7)'
    }
  }, count, " Items")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--paper)',
      color: 'var(--ink-950)',
      transform: hovered ? 'translate(2px,-2px)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrowUpRight",
    size: 20
  }))));
}
Object.assign(__ds_scope, { CollectionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CollectionCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/Drawer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect
} = React;
/**
 * Slide-in panel (cart, filters, menu). Transform + opacity only for 60fps.
 * Renders an overlay + a panel anchored to `side`.
 */
function Drawer({
  open,
  onClose,
  side = 'right',
  width = 420,
  title,
  footer,
  children,
  style,
  ...rest
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  const hidden = side === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      pointerEvents: open ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-overlay)',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("aside", _extends({
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      [side]: 0,
      width: '100%',
      maxWidth: width,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-drawer)',
      transform: open ? 'translateX(0)' : hidden,
      transition: 'transform var(--dur-slow) var(--ease-out)',
      ...style
    }
  }, rest), title != null && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-4) var(--space-5)',
      borderBottom: '1px solid var(--border-hairline)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: onClose,
    style: {
      width: 36,
      height: 36,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      flex: 'none',
      borderTop: '1px solid var(--border-hairline)',
      padding: 'var(--space-5)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ShippingBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function fmt(n, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(n);
  } catch {
    return '$' + n;
  }
}

/**
 * Free-shipping progress bar for the cart. Volt fill; flips to an unlocked
 * state at the threshold. A quiet, persistent CRO nudge.
 */
function ShippingBar({
  current = 0,
  threshold = 200,
  currency = 'USD',
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(1, current / threshold)) * 100;
  const unlocked = current >= threshold;
  const remaining = Math.max(0, threshold - current);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: 'var(--space-4) var(--space-5)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: unlocked ? 'check' : 'package',
    size: 15,
    style: {
      color: unlocked ? 'var(--text-strong)' : 'var(--text-muted)'
    }
  }), unlocked ? /*#__PURE__*/React.createElement("span", null, "Free shipping unlocked") : /*#__PURE__*/React.createElement("span", null, fmt(remaining, currency), " away from free shipping")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 6,
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: `${pct}%`,
      background: 'var(--accent)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ShippingBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ShippingBar.jsx", error: String((e && e.message) || e) }); }

// components/commerce/TrustBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DEFAULTS = [{
  icon: 'package',
  label: 'Ships in 24h'
}, {
  icon: 'shield',
  label: 'Secure checkout'
}, {
  icon: 'arrowRight',
  label: '60-day returns'
}, {
  icon: 'star',
  label: '2-year warranty'
}];

/**
 * Trust bar — a row of reassurance signals (shipping, security, returns,
 * warranty). Hairline-divided cells, mono labels. No payment-brand logos.
 */
function TrustBar({
  items = DEFAULTS,
  columns,
  style,
  ...rest
}) {
  const cols = columns || items.length;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: '1px',
      background: 'var(--border-hairline)',
      border: '1px solid var(--border-hairline)',
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 'var(--space-4) var(--space-5)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 18,
    style: {
      color: 'var(--text-strong)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-body)'
    }
  }, it.label))));
}
Object.assign(__ds_scope, { TrustBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/TrustBar.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: 32,
  md: 40,
  lg: 48
};

/**
 * Square icon-only action — header utilities, card wishlist, stepper controls.
 */
function IconButton({
  size = 'md',
  variant = 'ghost',
  bordered = false,
  active = false,
  disabled = false,
  'aria-label': ariaLabel,
  children,
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const dim = SIZES[size] || SIZES.md;
  const isInverse = variant === 'inverse';
  const bg = active ? 'var(--accent)' : isInverse ? hovered ? 'var(--ink-800)' : 'var(--surface-inverse)' : hovered ? 'var(--surface-sunken)' : 'transparent';
  const color = active ? 'var(--accent-ink)' : isInverse ? 'var(--text-inverse)' : 'var(--text-strong)';
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    disabled: disabled,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      width: dim,
      height: dim,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: bg,
      color,
      border: bordered ? '1px solid var(--border-strong)' : '1px solid transparent',
      borderRadius: 'var(--radius-0)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Kinetik wordmark — typographic, Space Grotesk, tight tracking,
 * with the signature volt full-stop.
 */
function Logo({
  size = 24,
  color,
  dotColor = 'var(--accent)',
  showDot = true,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: '-0.04em',
      color: color || 'var(--text-strong)',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), "KINETIK", showDot && /*#__PURE__*/React.createElement("span", {
    style: {
      color: dotColor
    }
  }, "."));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function toneStyle(tone) {
  switch (tone) {
    case 'sale':
      // volt — the only colored tag
      return {
        background: 'var(--accent)',
        color: 'var(--accent-ink)',
        border: '1px solid transparent'
      };
    case 'solid':
      // ink block — "NEW", "DROP"
      return {
        background: 'var(--surface-inverse)',
        color: 'var(--text-inverse)',
        border: '1px solid var(--surface-inverse)'
      };
    case 'outline':
      // hairline spec chip
      return {
        background: 'transparent',
        color: 'var(--text-body)',
        border: '1px solid var(--border-hairline)'
      };
    case 'muted':
    default:
      return {
        background: 'var(--surface-sunken)',
        color: 'var(--text-muted)',
        border: '1px solid transparent'
      };
  }
}

/**
 * Mono uppercase tag/badge — sale flags, status, spec chips.
 */
function Tag({
  tone = 'outline',
  shape = 'square',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      lineHeight: 1,
      padding: '5px 9px',
      borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-0)',
      whiteSpace: 'nowrap',
      ...toneStyle(tone),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Product card — exposed grid cell. Hover plays media and slides up a volt
 * Add-to-Cart bar; color dots preview variants. The whole tile is one
 * conversion unit.
 */
function ProductCard({
  name,
  category,
  price,
  compareAt,
  colors = [],
  src,
  videoSrc,
  code,
  badge,
  wished = false,
  onAdd,
  onWishlist,
  onOpen,
  style,
  // swallow catalog fields that aren't DOM attributes (from {...product} spreads)
  id,
  sizes,
  soldOut,
  blurb,
  specs,
  rating,
  reviews,
  unavailable,
  lowStock,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const onSale = compareAt != null && compareAt > price;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-0)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      cursor: 'pointer'
    },
    onClick: onOpen
  }, /*#__PURE__*/React.createElement(__ds_scope.MediaTile, {
    src: src,
    videoSrc: videoSrc,
    code: code || name,
    ratio: "4 / 5",
    alt: name
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 10,
      left: 10,
      display: 'flex',
      gap: 6
    }
  }, onSale && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: "sale"
  }, "\u2212", Math.round((1 - price / compareAt) * 100), "%"), badge && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: "solid"
  }, badge)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Add to wishlist",
    onClick: e => {
      e.stopPropagation();
      onWishlist?.();
    },
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 36,
      height: 36,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      color: wished ? 'var(--text-strong)' : 'var(--text-muted)',
      cursor: 'pointer',
      opacity: hovered || wished ? 1 : 0,
      transform: hovered || wished ? 'translateY(0)' : 'translateY(-4px)',
      transition: 'opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "heart",
    size: 17,
    style: wished ? {
      fill: 'currentColor'
    } : undefined
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onAdd?.();
    },
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 48,
      border: 'none',
      cursor: 'pointer',
      background: 'var(--accent)',
      color: 'var(--accent-ink)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      transform: hovered ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bag",
    size: 16
  }), " Add to Cart")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, category && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, category), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h4", {
    onClick: onOpen,
    style: {
      fontSize: 16,
      lineHeight: 1.15,
      cursor: onOpen ? 'pointer' : 'default'
    }
  }, name)), /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    price: price,
    compareAt: compareAt,
    size: "sm"
  }), colors.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 2
    }
  }, colors.slice(0, 5).map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    title: c.name,
    style: {
      width: 14,
      height: 14,
      borderRadius: 'var(--radius-pill)',
      background: c.swatch,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)'
    }
  })), colors.length > 5 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, "+", colors.length - 5))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Accordion — hairline rows with a +/− toggle. For PDP details, FAQ, shipping.
 * Single-open by default; set `multi` to allow several.
 */
function Accordion({
  items = [],
  multi = false,
  defaultOpen = [],
  style,
  ...rest
}) {
  const [open, setOpen] = useState(new Set(defaultOpen));
  const toggle = id => {
    setOpen(prev => {
      const next = new Set(multi ? prev : []);
      if (prev.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: '1px solid var(--border-hairline)',
      ...style
    }
  }, rest), items.map(it => {
    const isOpen = open.has(it.id);
    return /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      "aria-expanded": isOpen,
      onClick: () => toggle(it.id),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        padding: '16px 0',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 15,
        letterSpacing: '-0.01em',
        color: 'var(--text-strong)'
      }
    }, it.title, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        width: 14,
        height: 14,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 6,
        left: 0,
        width: 14,
        height: 2,
        background: 'var(--text-strong)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 0,
        left: 6,
        width: 2,
        height: 14,
        background: 'var(--text-strong)',
        transform: isOpen ? 'scaleY(0)' : 'scaleY(1)',
        transformOrigin: 'center',
        transition: 'transform var(--dur-fast) var(--ease-out)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 0 18px',
        fontSize: 14,
        lineHeight: 1.6,
        color: 'var(--text-body)'
      }
    }, it.content))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect
} = React;
/**
 * Centered modal — size guide, quick view, confirmations. Scale + opacity in.
 */
function Dialog({
  open,
  onClose,
  title,
  footer,
  width = 520,
  children,
  style,
  ...rest
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      pointerEvents: open ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-overlay)',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: width,
      maxHeight: '88vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--shadow-dialog)',
      opacity: open ? 1 : 0,
      transform: open ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.98)',
      transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), title != null && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-4) var(--space-5)',
      borderBottom: '1px solid var(--border-hairline)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: onClose,
    style: {
      width: 36,
      height: 36,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6)',
      overflowY: 'auto'
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      flex: 'none',
      borderTop: '1px solid var(--border-hairline)',
      padding: 'var(--space-5)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StarRating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STAR = 'M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2Z';
function Stars({
  filled,
  size
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("svg", {
    key: i,
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: filled ? 'currentColor' : 'none',
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: STAR
  }))));
}

/**
 * Star rating — fractional fill via clip. Optional review count.
 * Stars inherit currentColor; default ink (volt is reserved for conversion).
 */
function StarRating({
  value = 0,
  count,
  size = 15,
  showValue = false,
  color = 'var(--text-strong)',
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(1, value / 5)) * 100;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      lineHeight: 0
    },
    "aria-label": `${value} out of 5`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    filled: true,
    size: size
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: `${pct}%`,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    filled: true,
    size: size
  }))), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 700
    }
  }, value.toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.06em',
      color: 'var(--text-muted)'
    }
  }, "(", count, ")"));
}
Object.assign(__ds_scope, { StarRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StarRating.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect
} = React;
/**
 * Toast — transient confirmation ("Added to cart"). Self-positions bottom-center.
 * Auto-dismisses after `duration` (0 to disable).
 */
function Toast({
  open,
  onClose,
  message,
  action,
  icon = 'check',
  duration = 3000,
  position = 'bottom',
  style,
  ...rest
}) {
  useEffect(() => {
    if (!open || !duration) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);
  const hiddenY = position === 'top' ? '-16px' : '16px';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      [position]: 24,
      zIndex: 1200,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      pointerEvents: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      border: '1px solid var(--surface-inverse)',
      padding: '12px 14px 12px 16px',
      boxShadow: 'var(--shadow-dialog)',
      opacity: open ? 1 : 0,
      transform: open ? 'translateY(0)' : `translateY(${hiddenY})`,
      transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      width: 22,
      height: 22,
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--accent)',
      color: 'var(--accent-ink)',
      borderRadius: 'var(--radius-pill)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14,
    strokeWidth: 2.25
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500
    }
  }, message), action && /*#__PURE__*/React.createElement("button", {
    onClick: action.onClick,
    style: {
      marginLeft: 4,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--volt-500)'
    }
  }, action.label), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      display: 'flex',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--ink-400)',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 16
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Text input — square, hairline, ink focus block. Optional leading icon.
 */
function Input({
  label,
  hint,
  iconLeft,
  invalid = false,
  size = 'md',
  style,
  containerStyle,
  id,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const pad = size === 'lg' ? '14px 14px' : size === 'sm' ? '8px 10px' : '11px 12px';
  const fieldId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = invalid ? 'var(--negative)' : focused ? 'var(--border-strong)' : 'var(--border-hairline)';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'block',
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: pad,
      background: 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      boxShadow: focused ? 'inset 0 0 0 1px ' + borderColor : 'none',
      borderRadius: 'var(--radius-0)',
      transition: 'border-color var(--dur-fast) var(--ease-standard)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: e => {
      setFocused(true);
      rest.onFocus?.(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur?.(e);
    }
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-strong)',
      padding: 0,
      ...style
    }
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontSize: 12,
      color: invalid ? 'var(--negative)' : 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/OptionSwatch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Variant selector — the "seamless variant switching" control.
 * `kind="color"` renders a swatch dot; `kind="size"`/`kind="label"` renders
 * a square chip. Selected = ink frame; volt tick on color.
 */
function OptionSwatch({
  kind = 'label',
  value,
  selected = false,
  disabled = false,
  swatch,
  onSelect,
  style,
  children,
  ...rest
}) {
  const common = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: 'var(--surface-card)',
    transition: 'box-shadow var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard)',
    opacity: disabled ? 0.4 : 1
  };
  if (kind === 'color') {
    return /*#__PURE__*/React.createElement("button", _extends({
      type: "button",
      disabled: disabled,
      "aria-pressed": selected,
      onClick: () => !disabled && onSelect?.(value),
      title: value,
      style: {
        ...common,
        width: 32,
        height: 32,
        padding: 3,
        borderRadius: 'var(--radius-pill)',
        border: `1px solid ${selected ? 'var(--border-strong)' : 'var(--border-hairline)'}`,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        width: '100%',
        height: '100%',
        borderRadius: 'var(--radius-pill)',
        background: swatch,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
        display: 'block'
      }
    }), disabled && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        borderTop: '1px solid var(--ink-400)',
        transform: 'rotate(45deg)'
      }
    }));
  }

  // size / label chip
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    "aria-pressed": selected,
    onClick: () => !disabled && onSelect?.(value),
    style: {
      ...common,
      minWidth: 44,
      height: 40,
      padding: '0 12px',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.04em',
      color: selected ? 'var(--text-strong)' : 'var(--text-body)',
      border: `1px solid ${selected ? 'var(--border-strong)' : 'var(--border-hairline)'}`,
      boxShadow: selected ? 'inset 0 0 0 1px var(--border-strong)' : 'none',
      borderRadius: 'var(--radius-0)',
      textDecoration: disabled ? 'line-through' : 'none',
      ...style
    }
  }, rest), children ?? value);
}
Object.assign(__ds_scope, { OptionSwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/OptionSwatch.jsx", error: String((e && e.message) || e) }); }

// components/commerce/VariantPicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Is this color+size combination sold out? Supports `${color}|*` for a whole color. */
function isUnavailable(unavailable, color, size) {
  if (!unavailable) return false;
  return unavailable.includes(`${color}|${size}`) || unavailable.includes(`${color}|*`);
}
/**
 * Variant picker — color × size with a live availability matrix. Selecting a
 * color re-evaluates which sizes are in stock; out-of-stock sizes strike through.
 * Controlled: owns no state, drives selection through `value` / `onChange`.
 */
function VariantPicker({
  colors = [],
  sizes = [],
  unavailable = [],
  value = {},
  onChange,
  onGuide,
  style,
  ...rest
}) {
  const {
    color,
    size
  } = value;
  const set = patch => onChange?.({
    ...value,
    ...patch
  });
  const hasSizes = sizes.length > 0 && !(sizes.length === 1 && /one size/i.test(sizes[0]));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      ...style
    }
  }, rest), colors.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Colorway"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, color || '—')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, colors.map(c => {
    const fullyOut = unavailable.includes(`${c.name}|*`) || sizes.length > 0 && sizes.every(s => isUnavailable(unavailable, c.name, s));
    return /*#__PURE__*/React.createElement(__ds_scope.OptionSwatch, {
      key: c.name,
      kind: "color",
      value: c.name,
      swatch: c.swatch,
      selected: color === c.name,
      disabled: fullyOut,
      onSelect: v => set({
        color: v
      })
    });
  }))), hasSizes && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Size", size ? ` · ${size}` : ''), onGuide && /*#__PURE__*/React.createElement("a", {
    onClick: onGuide,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  }, "Size Guide")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, sizes.map(s => /*#__PURE__*/React.createElement(__ds_scope.OptionSwatch, {
    key: s,
    kind: "size",
    value: s,
    selected: size === s,
    disabled: isUnavailable(unavailable, color, s),
    onSelect: v => set({
      size: v
    })
  })))));
}

// Expose the helper on the (capitalized) component so DS-namespace consumers
// can reach it — lowercase exports aren't attached to window.<Namespace>.
VariantPicker.isUnavailable = isUnavailable;
Object.assign(__ds_scope, { isUnavailable, VariantPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/VariantPicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Quantity stepper — square hairline group, ink press feedback.
 */
function QuantityStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  style,
  ...rest
}) {
  const dim = size === 'sm' ? 32 : 40;
  const dec = () => onChange?.(Math.max(min, value - 1));
  const inc = () => onChange?.(Math.min(max, value + 1));
  const btn = disabled => ({
    width: dim,
    height: dim,
    flex: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: disabled ? 'var(--text-faint)' : 'var(--text-strong)',
    transition: 'background var(--dur-fast) var(--ease-standard)'
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-0)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Decrease",
    onClick: dec,
    disabled: value <= min,
    style: btn(value <= min)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: dim,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-strong)',
      borderLeft: '1px solid var(--border-hairline)',
      borderRight: '1px solid var(--border-hairline)',
      height: dim,
      lineHeight: `${dim}px`
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Increase",
    onClick: inc,
    disabled: value >= max,
    style: btn(value >= max)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }))));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CartLineItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cart line item — thumb, meta, stepper, price, remove. For the smart drawer.
 */
function CartLineItem({
  name,
  variant,
  price,
  compareAt,
  qty = 1,
  src,
  code,
  onQty,
  onRemove,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      padding: 'var(--space-4) var(--space-5)',
      borderBottom: '1px solid var(--border-hairline)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MediaTile, {
    src: src,
    code: code || name,
    ratio: "4 / 5"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 14,
      lineHeight: 1.2
    }
  }, name), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: onRemove,
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      padding: 0,
      height: 18,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 16
  }))), variant && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, variant), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.QuantityStepper, {
    value: qty,
    size: "sm",
    onChange: onQty
  }), /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    price: price * qty,
    compareAt: compareAt != null ? compareAt * qty : undefined,
    size: "sm",
    align: "right"
  }))));
}
Object.assign(__ds_scope, { CartLineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartLineItem.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — styled native dropdown (sort, country, etc). Square, hairline,
 * mono label, chevron affordance.
 */
function Select({
  label,
  hint,
  options = [],
  size = 'md',
  invalid = false,
  style,
  containerStyle,
  id,
  ...rest
}) {
  const pad = size === 'lg' ? '14px 40px 14px 14px' : size === 'sm' ? '8px 34px 8px 10px' : '11px 38px 11px 12px';
  const fieldId = id || (label ? `sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = invalid ? 'var(--negative)' : 'var(--border-hairline)';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'block',
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId
  }, rest, {
    style: {
      width: '100%',
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      padding: pad,
      background: 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-0)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-strong)',
      cursor: 'pointer',
      outline: 'none',
      ...style
    }
  }), options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const labelText = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, labelText);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      right: 12,
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevronDown",
    size: 16
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontSize: 12,
      color: invalid ? 'var(--negative)' : 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AnnouncementBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect
} = React;
/**
 * Announcement bar — the thin promo strip above the header. Single message or
 * an auto-rotating list. Ink by default; `tone="volt"` for a drop alert.
 */
function AnnouncementBar({
  messages,
  children,
  tone = 'ink',
  interval = 4000,
  style,
  ...rest
}) {
  const list = messages && messages.length ? messages : children != null ? [children] : [];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (list.length < 2) return;
    const t = setInterval(() => setI(n => (n + 1) % list.length), interval);
    return () => clearInterval(t);
  }, [list.length, interval]);
  const pal = tone === 'volt' ? {
    background: 'var(--accent)',
    color: 'var(--accent-ink)'
  } : {
    background: 'var(--surface-inverse)',
    color: 'var(--text-inverse)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      textAlign: 'center',
      padding: '7px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      ...pal,
      ...style
    }
  }, rest), list[i]);
}
Object.assign(__ds_scope, { AnnouncementBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AnnouncementBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Breadcrumb trail — mono, uppercase, chevron-separated. Last item is current.
 */
function Breadcrumbs({
  items = [],
  onNavigate,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Breadcrumb",
    style: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      ...style
    }
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    const label = typeof it === 'string' ? it : it.label;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => !last && onNavigate?.(it, i),
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: last ? 'var(--text-strong)' : 'var(--text-muted)',
        cursor: last ? 'default' : 'pointer'
      }
    }, label), !last && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevronRight",
      size: 13,
      style: {
        color: 'var(--text-faint)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function range(total, current, span = 1) {
  const pages = new Set([1, total, current]);
  for (let i = 1; i <= span; i++) {
    pages.add(current - i);
    pages.add(current + i);
  }
  const sorted = [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push('…');
    out.push(p);
    prev = p;
  }
  return out;
}

/**
 * Pagination — square numbered cells, ink for current. Prev/next chevrons.
 */
function Pagination({
  page = 1,
  total = 1,
  onChange,
  style,
  ...rest
}) {
  const cell = active => ({
    minWidth: 40,
    height: 40,
    padding: '0 8px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: active ? 'var(--surface-inverse)' : 'transparent',
    color: active ? 'var(--text-inverse)' : 'var(--text-strong)',
    border: '1px solid var(--border-hairline)',
    marginLeft: -1,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    fontWeight: 700
  });
  const go = p => {
    if (p >= 1 && p <= total && p !== page) onChange?.(p);
  };
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Pagination",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Previous",
    onClick: () => go(page - 1),
    disabled: page <= 1,
    style: {
      ...cell(false),
      marginLeft: 0,
      opacity: page <= 1 ? 0.4 : 1,
      cursor: page <= 1 ? 'not-allowed' : 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevronRight",
    size: 16,
    style: {
      transform: 'rotate(180deg)'
    }
  })), range(total, page).map((p, i) => p === '…' ? /*#__PURE__*/React.createElement("span", {
    key: `e${i}`,
    style: {
      ...cell(false),
      cursor: 'default',
      color: 'var(--text-faint)'
    }
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => go(p),
    "aria-current": p === page,
    style: cell(p === page)
  }, p)), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Next",
    onClick: () => go(page + 1),
    disabled: page >= total,
    style: {
      ...cell(false),
      opacity: page >= total ? 0.4 : 1,
      cursor: page >= total ? 'not-allowed' : 'pointer'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevronRight",
    size: 16
  })));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Tabs — underline-style, ink active marker. Controlled or uncontrolled.
 * Use for PDP detail panels (Description / Specs / Shipping) or collection views.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  children,
  style,
  ...rest
}) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };
  const current = tabs.find(t => t.id === active);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 0,
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      role: "tab",
      "aria-selected": on,
      onClick: () => select(t.id),
      style: {
        position: 'relative',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '12px 18px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        boxShadow: on ? 'inset 0 -2px 0 0 var(--border-strong)' : 'none',
        transition: 'color var(--dur-fast) var(--ease-standard)'
      }
    }, t.label);
  })), (current?.content || children) && /*#__PURE__*/React.createElement("div", {
    role: "tabpanel",
    style: {
      padding: 'var(--space-5) 0'
    }
  }, current?.content ?? children));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/sections/ArticleCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Article card — blog/editorial teaser. `layout="row"` for a featured wide
 * post, `layout="stack"` (default) for the grid.
 */
function ArticleCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  author,
  src,
  code,
  layout = 'stack',
  onOpen,
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const row = layout === 'row';
  const Media = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      flex: row ? '1 1 0' : 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MediaTile, {
    src: src,
    code: code || category,
    ratio: row ? '4 / 3' : '16 / 10',
    style: {
      transform: hovered ? 'scale(1.03)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), category && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: "solid"
  }, category)));
  const Body = /*#__PURE__*/React.createElement("div", {
    style: {
      flex: row ? '1 1 0' : 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: row ? 'var(--space-8)' : 'var(--space-4) 0 0',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, date && /*#__PURE__*/React.createElement("span", null, date), readTime && /*#__PURE__*/React.createElement("span", null, "\xB7 ", readTime, " read")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: row ? 'clamp(1.5rem, 3vw, 2.25rem)' : 19,
      lineHeight: 1.1,
      letterSpacing: '-0.02em'
    }
  }, title), excerpt && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 520
    }
  }, excerpt), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, "Read Article ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrowRight",
    size: 14
  })));
  return /*#__PURE__*/React.createElement("a", _extends({
    onClick: onOpen,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: row ? 'row' : 'column',
      gap: row ? 0 : undefined,
      background: 'var(--surface-card)',
      ...style
    }
  }, rest), Media, Body);
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// components/sections/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Section heading — mono eyebrow + oversized display title + optional action.
 * The standard lead-in for any homepage / editorial section.
 */
function SectionHeading({
  eyebrow,
  title,
  action,
  align = 'left',
  size = 'md',
  style,
  ...rest
}) {
  const fs = size === 'lg' ? 'clamp(2rem, 4vw, 3.25rem)' : size === 'sm' ? 24 : 32;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: align === 'center' ? 'center' : 'space-between',
      gap: 24,
      flexWrap: 'wrap',
      textAlign: align === 'center' ? 'center' : 'left',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: fs,
      lineHeight: 1.0,
      letterSpacing: '-0.03em',
      margin: 0
    }
  }, title)), action && /*#__PURE__*/React.createElement("a", {
    onClick: action.onClick,
    style: {
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap'
    }
  }, action.label, " ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrowRight",
    size: 15
  })));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Footer.jsx
try { (() => {
/* global React */
const {
  Logo,
  Input,
  Button,
  Icon
} = window.KinetikDesignSystem_fefe1a;
function Footer() {
  const cols = [['Shop', ['Outerwear', 'Bottoms', 'Audio', 'Gear', 'Sale']], ['Support', ['Shipping', 'Returns', 'Size Guide', 'Track Order']], ['Studio', ['About', 'Sustainability', 'Stores', 'Careers']]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-strong)',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-12) var(--space-6)',
      borderRight: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 28
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      maxWidth: 280,
      fontSize: 14,
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, "High-resolution gear, zero-latency storefront. Built from one system of independent parts."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 20,
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Email for drops",
    containerStyle: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 16
    })
  }, "Join"))), cols.map(([title, items], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 'var(--space-12) var(--space-6)',
      borderRight: i < 2 ? '1px solid var(--border-hairline)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 16
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map((it, j) => /*#__PURE__*/React.createElement("li", {
    key: j
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: 'pointer',
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, it))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
      padding: 'var(--space-5) var(--space-6)',
      borderTop: '1px solid var(--border-hairline)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.06em',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 KINETIK STUDIO"), /*#__PURE__*/React.createElement("span", null, "TERMS \xB7 PRIVACY \xB7 A 60FPS STOREFRONT")));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Header.jsx
try { (() => {
/* global React */
const {
  Logo,
  Icon,
  IconButton,
  Tag
} = window.KinetikDesignSystem_fefe1a;
function Header({
  cartCount = 0,
  onCart,
  onNav,
  active = 'home',
  theme,
  onToggleTheme
}) {
  const links = [['home', 'Shop All'], ['plp', 'Outerwear'], ['plp', 'Audio'], ['plp', 'Gear'], ['plp', 'Sale']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 200,
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      textAlign: 'center',
      padding: '7px 16px',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase'
    }
  }, "Free 24h shipping over $200 \xB7 60-day returns"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      height: 'var(--header-h)',
      padding: '0 var(--space-6)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav?.('home'),
    style: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 24
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4,
      marginLeft: 16
    }
  }, links.map(([view, label], i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    onClick: () => onNav?.(view, label),
    style: {
      cursor: 'pointer',
      padding: '8px 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 500,
      color: label === 'Sale' ? 'var(--text-strong)' : 'var(--text-body)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, label, label === 'Sale' && /*#__PURE__*/React.createElement(Tag, {
    tone: "sale"
  }, "%")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  })), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Account"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Toggle theme",
    onClick: onToggleTheme,
    style: {
      width: 40,
      height: 40,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em'
    }
  }, theme === 'dark' ? 'LT' : 'DK'), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Cart",
    onClick: onCart
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bag"
  })), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      right: 2,
      minWidth: 16,
      height: 16,
      padding: '0 4px',
      background: 'var(--accent)',
      color: 'var(--accent-ink)',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, cartCount)))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/HomeView.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
const {
  ProductCard,
  MediaTile,
  CollectionCard,
  TrustBar,
  Button,
  Tag,
  Icon
} = window.KinetikDesignSystem_fefe1a;
function HomeView({
  products,
  onAdd,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      borderBottom: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--paper)',
      padding: 'var(--space-16) var(--space-12)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--volt-500)'
    }
  }, "SS26 / Field System"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(3rem, 7vw, 6.5rem)',
      lineHeight: 0.92,
      letterSpacing: '-0.04em',
      color: 'var(--paper)',
      margin: '24px 0'
    }
  }, "MOVE", /*#__PURE__*/React.createElement("br", null), "FASTER."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 360,
      color: 'var(--ink-300)',
      fontSize: 16,
      lineHeight: 1.5
    }
  }, "High-resolution techwear that loads in a blink. Engineered for the city, the trail, and everything in transit."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrowRight",
      size: 19
    })
  }, "Shop the Drop"))), /*#__PURE__*/React.createElement(MediaTile, {
    tone: "dark",
    code: "SS26 \xB7 Lookbook",
    ratio: "auto",
    style: {
      minHeight: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "sale"
  }, "New Drop")))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1px',
      background: 'var(--border-hairline)',
      borderBottom: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement(CollectionCard, {
    name: "Outerwear",
    count: 24,
    code: "Outerwear",
    ratio: "4 / 3",
    onOpen: () => onOpen?.()
  }), /*#__PURE__*/React.createElement(CollectionCard, {
    name: "Audio",
    count: 9,
    code: "Audio",
    ratio: "4 / 3",
    onOpen: () => onOpen?.()
  }), /*#__PURE__*/React.createElement(CollectionCard, {
    name: "Gear",
    count: 17,
    code: "Gear",
    ratio: "4 / 3",
    onOpen: () => onOpen?.()
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-12) var(--space-6) var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 32
    }
  }, "New Arrivals"), /*#__PURE__*/React.createElement("a", {
    onClick: () => onOpen?.(),
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, "View All ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowRight",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1px',
      background: 'var(--border-hairline)',
      border: '1px solid var(--border-hairline)'
    }
  }, products.slice(0, 8).map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    style: {
      border: 'none'
    },
    onAdd: () => onAdd?.(p),
    onOpen: () => onOpen?.(p)
  }))))), /*#__PURE__*/React.createElement(TrustBar, {
    style: {
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: 0
    }
  }));
}
window.HomeView = HomeView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/HomeView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/PdpView.jsx
try { (() => {
/* global React */
const {
  MediaTile,
  PriceTag,
  VariantPicker,
  QuantityStepper,
  Button,
  Tag,
  Icon,
  Breadcrumbs,
  StarRating,
  Accordion,
  TrustBar,
  Dialog
} = window.KinetikDesignSystem_fefe1a;
const isUnavailable = VariantPicker.isUnavailable;
const {
  useState,
  useEffect,
  useMemo
} = React;
const money = n => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(n);
function PdpView({
  product,
  onAdd
}) {
  const p = product;
  const needsSize = p.sizes.length > 0 && !(p.sizes.length === 1 && /one size/i.test(p.sizes[0]));

  // first colorway that has any stock
  const firstColor = useMemo(() => {
    const ok = p.colors.find(c => !(p.unavailable || []).includes(`${c.name}|*`) && (!needsSize || p.sizes.some(s => !isUnavailable(p.unavailable, c.name, s))));
    return (ok || p.colors[0])?.name;
  }, [p.id]);
  const firstSize = color => needsSize ? p.sizes.find(s => !isUnavailable(p.unavailable, color, s)) || null : 'One Size';
  const [variant, setVariant] = useState({
    color: firstColor,
    size: firstSize(firstColor)
  });
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);

  // reset when product changes
  useEffect(() => {
    const c = firstColor;
    setVariant({
      color: c,
      size: firstSize(c)
    });
    setQty(1);
  }, [p.id]);

  // when color changes to one where the chosen size is gone, clear size
  const onVariant = next => {
    if (next.color !== variant.color && needsSize) {
      const keep = next.size && !isUnavailable(p.unavailable, next.color, next.size) ? next.size : firstSize(next.color);
      setVariant({
        color: next.color,
        size: keep
      });
    } else {
      setVariant(next);
    }
  };
  const onSale = p.compareAt != null && p.compareAt > p.price;
  const soldOut = !variant.size || isUnavailable(p.unavailable, variant.color, variant.size);
  const low = (p.lowStock || []).includes(`${variant.color}|${variant.size}`);
  const ctaLabel = soldOut && variant.size ? 'Sold Out' : !variant.size ? 'Select a Size' : `Add to Cart · ${money(p.price * qty)}`;
  const stock = soldOut && variant.size ? {
    icon: 'close',
    text: 'Sold out in this combination',
    color: 'var(--text-faint)'
  } : low ? {
    icon: 'package',
    text: 'Low stock — only a few left',
    color: 'var(--text-strong)'
  } : {
    icon: 'package',
    text: 'In stock · Ships in 24h',
    color: 'var(--text-muted)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      borderBottom: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(MediaTile, {
    key: variant.color,
    code: `${p.code} · ${variant.color}`,
    ratio: "1 / 1"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16,
      display: 'flex',
      gap: 6
    }
  }, onSale && /*#__PURE__*/React.createElement(Tag, {
    tone: "sale"
  }, "\u2212", Math.round((1 - p.price / p.compareAt) * 100), "%"), p.badge && /*#__PURE__*/React.createElement(Tag, {
    tone: "solid"
  }, p.badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      padding: '8px 12px',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 13
  }), " Hover to play \xB7 ", variant.color)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1px',
      background: 'var(--border-hairline)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(MediaTile, {
    code: `${variant.color} · 01`,
    ratio: "1 / 1"
  }), /*#__PURE__*/React.createElement(MediaTile, {
    code: `${variant.color} · 02`,
    ratio: "1 / 1"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 'var(--header-h)',
      padding: 'var(--space-10) var(--space-10) var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: ['Home', p.category, p.name],
    style: {
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, p.category, " \xB7 ", p.code), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 40,
      margin: '12px 0 12px'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(StarRating, {
    value: p.rating || 4.5,
    count: p.reviews,
    showValue: true
  })), /*#__PURE__*/React.createElement(PriceTag, {
    price: p.price,
    compareAt: p.compareAt,
    size: "lg"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 28px',
      maxWidth: 420,
      color: 'var(--text-body)',
      lineHeight: 1.6,
      fontSize: 15
    }
  }, p.blurb), /*#__PURE__*/React.createElement(VariantPicker, {
    colors: p.colors,
    sizes: p.sizes,
    unavailable: p.unavailable,
    value: variant,
    onChange: onVariant,
    onGuide: needsSize ? () => setGuide(true) : undefined,
    style: {
      marginBottom: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    min: 1,
    max: 10,
    onChange: setQty
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    size: "lg",
    disabled: soldOut,
    iconLeft: !soldOut ? /*#__PURE__*/React.createElement(Icon, {
      name: "bag",
      size: 18
    }) : undefined,
    onClick: () => !soldOut && onAdd?.({
      ...p,
      color: variant.color,
      size: variant.size,
      qty
    })
  }, ctaLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: stock.color,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: stock.icon,
    size: 15
  }), " ", stock.text), /*#__PURE__*/React.createElement(TrustBar, {
    columns: 2,
    style: {
      marginBottom: 28
    },
    items: [{
      icon: 'package',
      label: 'Ships in 24h'
    }, {
      icon: 'shield',
      label: 'Secure checkout'
    }, {
      icon: 'arrowRight',
      label: '60-day returns'
    }, {
      icon: 'star',
      label: '2-year warranty'
    }]
  }), /*#__PURE__*/React.createElement(Accordion, {
    defaultOpen: ['specs'],
    items: [{
      id: 'specs',
      title: 'Specifications',
      content: /*#__PURE__*/React.createElement("div", null, p.specs.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 0',
          borderBottom: i < p.specs.length - 1 ? '1px solid var(--border-hairline)' : 'none'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)'
        }
      }, k), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text-strong)'
        }
      }, v))))
    }, {
      id: 'ship',
      title: 'Shipping & Returns',
      content: 'Ships in 24h. Free over $200. 60-day returns, no questions asked.'
    }, {
      id: 'care',
      title: 'Care',
      content: 'Machine wash cold, hang dry. Do not tumble dry membrane fabrics.'
    }]
  }))), /*#__PURE__*/React.createElement(Dialog, {
    open: guide,
    onClose: () => setGuide(false),
    title: "Size Guide",
    footer: /*#__PURE__*/React.createElement(Button, {
      variant: "inverse",
      block: true,
      onClick: () => setGuide(false)
    }, "Done")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-hairline)'
    }
  }, [['Size', 'Chest', 'Length'], ['S', '98cm', '68cm'], ['M', '104cm', '70cm'], ['L', '110cm', '72cm'], ['XL', '116cm', '74cm']].map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      borderBottom: i < 4 ? '1px solid var(--border-hairline)' : 'none',
      background: i === 0 ? 'var(--surface-sunken)' : 'transparent'
    }
  }, row.map((cell, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    style: {
      padding: '10px 14px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.04em',
      textTransform: i === 0 ? 'uppercase' : 'none',
      color: i === 0 ? 'var(--text-muted)' : 'var(--text-strong)',
      fontWeight: j === 0 && i > 0 ? 700 : 400
    }
  }, cell))))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, "Model is 183cm, wearing M. Between sizes? Size up for a layering fit.")));
}
window.PdpView = PdpView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/PdpView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/PlpView.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
const {
  ProductCard,
  Tag,
  Icon,
  OptionSwatch,
  Select,
  Pagination
} = window.KinetikDesignSystem_fefe1a;
const {
  useState,
  useMemo
} = React;
const SWATCHES = [['Volt', '#CCFF00'], ['Ink', '#0A0A0A'], ['Bone', '#EDEAE2'], ['Steel', '#7C8794']];
const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
function FilterGroup({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 14
    }
  }, title), children);
}
function Chip({
  label,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      border: 'none',
      cursor: 'pointer',
      padding: '6px 8px 6px 11px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, label, " ", /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 13
  }));
}
function PlpView({
  products,
  title = 'Shop All',
  onAdd,
  onOpen
}) {
  const [cat, setCat] = useState('All');
  const [colors, setColors] = useState([]); // multi
  const [sizes, setSizes] = useState([]); // multi
  const [page, setPage] = useState(1);
  const cats = ['All', 'Outerwear', 'Audio', 'Gear', 'Tops', 'Bottoms'];
  const toggle = (list, set, v) => set(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);
  const shown = useMemo(() => products.filter(p => {
    if (cat !== 'All' && p.category !== cat) return false;
    if (colors.length && !p.colors.some(c => colors.includes(c.name))) return false;
    if (sizes.length && !p.sizes.some(s => sizes.includes(s))) return false;
    return true;
  }), [products, cat, colors, sizes]);
  const activeChips = [...(cat !== 'All' ? [{
    label: cat,
    remove: () => setCat('All')
  }] : []), ...colors.map(c => ({
    label: c,
    remove: () => toggle(colors, setColors, c)
  })), ...sizes.map(s => ({
    label: `Size ${s}`,
    remove: () => toggle(sizes, setSizes, s)
  }))];
  const clearAll = () => {
    setCat('All');
    setColors([]);
    setSizes([]);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--paper)',
      padding: 'var(--space-12) var(--space-6) var(--space-10)',
      borderBottom: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--volt-500)'
    }
  }, "Home / ", title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      lineHeight: 0.92,
      letterSpacing: '-0.04em',
      color: 'var(--paper)',
      margin: 0
    }
  }, title.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 380,
      color: 'var(--ink-300)',
      fontSize: 15,
      lineHeight: 1.5,
      margin: 0
    }
  }, "Engineered layers, machined audio, and field-ready carry. Built from one system, made to move."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '240px 1fr'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      borderRight: '1px solid var(--border-hairline)',
      padding: '0 var(--space-6)',
      alignSelf: 'start',
      position: 'sticky',
      top: 'calc(var(--header-h) + 20px)'
    }
  }, /*#__PURE__*/React.createElement(FilterGroup, {
    title: "Category"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("li", {
    key: c
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => setCat(c),
    style: {
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: cat === c ? 600 : 400,
      color: cat === c ? 'var(--text-strong)' : 'var(--text-body)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, c, cat === c && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  })))))), /*#__PURE__*/React.createElement(FilterGroup, {
    title: "Color"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, SWATCHES.map(([n, s]) => /*#__PURE__*/React.createElement(OptionSwatch, {
    key: n,
    kind: "color",
    value: n,
    swatch: s,
    selected: colors.includes(n),
    onSelect: v => toggle(colors, setColors, v)
  })))), /*#__PURE__*/React.createElement(FilterGroup, {
    title: "Size"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, ALL_SIZES.map(s => /*#__PURE__*/React.createElement(OptionSwatch, {
    key: s,
    kind: "size",
    value: s,
    selected: sizes.includes(s),
    onSelect: v => toggle(sizes, setSizes, v)
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-4) var(--space-6)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, shown.length, " Items"), /*#__PURE__*/React.createElement(Select, {
    "aria-label": "Sort",
    options: [{
      value: 'featured',
      label: 'Sort · Featured'
    }, {
      value: 'new',
      label: 'Sort · Newest'
    }, {
      value: 'price',
      label: 'Sort · Price'
    }],
    size: "sm"
  })), activeChips.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 8,
      padding: 'var(--space-4) var(--space-6)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, activeChips.map((c, i) => /*#__PURE__*/React.createElement(Chip, {
    key: i,
    label: c.label,
    onRemove: c.remove
  })), /*#__PURE__*/React.createElement("button", {
    onClick: clearAll,
    style: {
      marginLeft: 4,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      textDecoration: 'underline'
    }
  }, "Clear All")), shown.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '80px 24px',
      textAlign: 'center',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 26,
    style: {
      margin: '0 auto 12px',
      color: 'var(--text-faint)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "No items match these filters")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1px',
      background: 'var(--border-hairline)'
    }
  }, shown.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    style: {
      border: 'none'
    },
    onAdd: () => onAdd?.(p),
    onOpen: () => onOpen?.(p)
  })))), shown.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: 'var(--space-12) 0'
    }
  }, /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    total: 6,
    onChange: setPage
  })))));
}
window.PlpView = PlpView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/PlpView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
/* Kinetik storefront — demo catalog (no real media; placeholders by code).
   `unavailable` lists sold-out color|size combos. Use `${color}|*` for a whole
   colorway. `soldOut` (size list) is kept for back-compat with simple cards. */
window.KINETIK_PRODUCTS = [{
  id: 'shell-01',
  name: 'Shell-01 Hardshell',
  category: 'Outerwear',
  code: 'KX-SHELL-01',
  price: 336,
  compareAt: 420,
  badge: 'New Drop',
  rating: 4.6,
  reviews: 128,
  colors: [{
    name: 'Volt',
    swatch: '#CCFF00'
  }, {
    name: 'Ink',
    swatch: '#0A0A0A'
  }, {
    name: 'Bone',
    swatch: '#EDEAE2'
  }],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  soldOut: ['XS'],
  unavailable: ['Volt|XS', 'Ink|XS', 'Bone|XS', 'Volt|XL', 'Bone|S'],
  lowStock: ['Volt|L'],
  blurb: '3-layer Gore-Tex shell engineered for movement. Laser-cut vents, magnetic storm placket, fully taped seams.',
  specs: [['Membrane', 'Gore-Tex 3L'], ['Weight', '480g'], ['Fit', 'Boxed regular'], ['Origin', 'Made in JP']]
}, {
  id: 'pant-02',
  name: 'Cargo Tech Pant',
  category: 'Bottoms',
  code: 'KX-PANT-02',
  price: 210,
  compareAt: null,
  badge: null,
  rating: 4.4,
  reviews: 64,
  colors: [{
    name: 'Ink',
    swatch: '#0A0A0A'
  }, {
    name: 'Steel',
    swatch: '#7C8794'
  }],
  sizes: ['28', '30', '32', '34', '36'],
  soldOut: ['28'],
  unavailable: ['Ink|28', 'Steel|28', 'Steel|36'],
  lowStock: ['Ink|34'],
  blurb: 'Articulated 4-way stretch cargo with sealed zip pockets and a gusseted crotch for full range of motion.',
  specs: [['Fabric', 'Schoeller Dryskin'], ['Weight', '320g'], ['Fit', 'Tapered'], ['Origin', 'Made in PT']]
}, {
  id: 'aud-03',
  name: 'Field Monitors',
  category: 'Audio',
  code: 'KX-AUD-03',
  price: 290,
  compareAt: 340,
  badge: null,
  rating: 4.8,
  reviews: 212,
  colors: [{
    name: 'Ink',
    swatch: '#0A0A0A'
  }, {
    name: 'Bone',
    swatch: '#EDEAE2'
  }],
  sizes: ['One Size'],
  soldOut: [],
  unavailable: [],
  lowStock: [],
  blurb: 'Closed-back reference monitors. 40mm beryllium-coated drivers, machined aluminium cups, 40h battery.',
  specs: [['Driver', '40mm Be'], ['Battery', '40h'], ['Codec', 'LDAC / aptX'], ['Weight', '286g']]
}, {
  id: 'tee-04',
  name: 'Box Tech Tee',
  category: 'Tops',
  code: 'KX-TEE-04',
  price: 78,
  compareAt: null,
  badge: null,
  rating: 4.3,
  reviews: 41,
  colors: [{
    name: 'Bone',
    swatch: '#EDEAE2'
  }, {
    name: 'Ink',
    swatch: '#0A0A0A'
  }, {
    name: 'Volt',
    swatch: '#CCFF00'
  }],
  sizes: ['S', 'M', 'L', 'XL'],
  soldOut: [],
  unavailable: ['Volt|S', 'Volt|XL'],
  lowStock: ['Volt|M'],
  blurb: 'Heavyweight 240gsm supima jersey, boxed silhouette, bonded hem. The everyday base layer.',
  specs: [['Fabric', '240gsm Supima'], ['Fit', 'Boxed'], ['Care', 'Cold wash'], ['Origin', 'Made in PT']]
}, {
  id: 'bag-05',
  name: 'Sling 4L',
  category: 'Gear',
  code: 'KX-BAG-05',
  price: 145,
  compareAt: null,
  badge: 'New Drop',
  rating: 4.7,
  reviews: 88,
  colors: [{
    name: 'Ink',
    swatch: '#0A0A0A'
  }, {
    name: 'Volt',
    swatch: '#CCFF00'
  }],
  sizes: ['One Size'],
  soldOut: [],
  unavailable: [],
  lowStock: ['Volt|One Size'],
  blurb: 'Weatherproof X-Pac sling with a magnetic Fidlock buckle and a hidden RFID pocket.',
  specs: [['Fabric', 'X-Pac VX21'], ['Volume', '4L'], ['Buckle', 'Fidlock'], ['Weight', '210g']]
}, {
  id: 'cap-06',
  name: 'Tech Logo Cap',
  category: 'Gear',
  code: 'KX-CAP-06',
  price: 64,
  compareAt: null,
  badge: null,
  rating: 4.2,
  reviews: 33,
  colors: [{
    name: 'Ink',
    swatch: '#0A0A0A'
  }, {
    name: 'Steel',
    swatch: '#7C8794'
  }],
  sizes: ['One Size'],
  soldOut: [],
  unavailable: ['Steel|*'],
  lowStock: [],
  blurb: 'Unstructured 6-panel in coated ripstop with a debossed volt logo and a recycled webbing strap.',
  specs: [['Fabric', 'Coated ripstop'], ['Panels', '6'], ['Strap', 'Recycled web'], ['Origin', 'Made in VN']]
}, {
  id: 'jkt-07',
  name: 'Liner Vest',
  category: 'Outerwear',
  code: 'KX-JKT-07',
  price: 248,
  compareAt: 310,
  badge: null,
  rating: 4.5,
  reviews: 57,
  colors: [{
    name: 'Ink',
    swatch: '#0A0A0A'
  }, {
    name: 'Bone',
    swatch: '#EDEAE2'
  }],
  sizes: ['S', 'M', 'L', 'XL'],
  soldOut: ['S'],
  unavailable: ['Ink|S', 'Bone|S', 'Bone|XL'],
  lowStock: ['Ink|M'],
  blurb: 'PrimaLoft Gold liner vest that packs into its own chest pocket. Wear solo or zip into the Shell-01.',
  specs: [['Fill', 'PrimaLoft Gold'], ['Weight', '240g'], ['Packs to', '1L'], ['Origin', 'Made in VN']]
}, {
  id: 'aud-08',
  name: 'Buds Pro',
  category: 'Audio',
  code: 'KX-AUD-08',
  price: 180,
  compareAt: null,
  badge: null,
  rating: 4.6,
  reviews: 149,
  colors: [{
    name: 'Ink',
    swatch: '#0A0A0A'
  }, {
    name: 'Bone',
    swatch: '#EDEAE2'
  }],
  sizes: ['One Size'],
  soldOut: [],
  unavailable: ['Bone|*'],
  lowStock: [],
  blurb: 'Active-noise-cancelling earbuds with a machined case, 8h playback, and dual-device handoff.',
  specs: [['Driver', '11mm'], ['ANC', '−42dB'], ['Battery', '8h + 24h'], ['Weight', '4.8g']]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

__ds_ns.CartLineItem = __ds_scope.CartLineItem;

__ds_ns.CollectionCard = __ds_scope.CollectionCard;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.MediaTile = __ds_scope.MediaTile;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ShippingBar = __ds_scope.ShippingBar;

__ds_ns.TrustBar = __ds_scope.TrustBar;

__ds_ns.VariantPicker = __ds_scope.VariantPicker;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.StarRating = __ds_scope.StarRating;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.OptionSwatch = __ds_scope.OptionSwatch;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.AnnouncementBar = __ds_scope.AnnouncementBar;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
