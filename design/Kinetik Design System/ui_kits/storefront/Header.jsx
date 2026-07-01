/* global React */
const { Logo, Icon, IconButton, Tag } = window.KinetikDesignSystem_fefe1a;

function Header({ cartCount = 0, onCart, onNav, active = 'home', theme, onToggleTheme }) {
  const links = [
    ['home', 'Shop All'],
    ['plp', 'Outerwear'],
    ['plp', 'Audio'],
    ['plp', 'Gear'],
    ['plp', 'Sale'],
  ];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 200, background: 'var(--surface-page)' }}>
      {/* announcement */}
      <div style={{
        background: 'var(--surface-inverse)', color: 'var(--text-inverse)',
        textAlign: 'center', padding: '7px 16px',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        Free 24h shipping over $200 · 60-day returns
      </div>

      {/* main bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24,
        height: 'var(--header-h)', padding: '0 var(--space-6)',
        borderBottom: '1px solid var(--border-hairline)',
      }}>
        <a onClick={() => onNav?.('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Logo size={24} />
        </a>

        <nav style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
          {links.map(([view, label], i) => (
            <a key={i} onClick={() => onNav?.(view, label)}
              style={{
                cursor: 'pointer', padding: '8px 12px',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
                color: label === 'Sale' ? 'var(--text-strong)' : 'var(--text-body)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
              {label}
              {label === 'Sale' && <Tag tone="sale">%</Tag>}
            </a>
          ))}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <IconButton aria-label="Search"><Icon name="search" /></IconButton>
          <IconButton aria-label="Account"><Icon name="user" /></IconButton>
          <button aria-label="Toggle theme" onClick={onToggleTheme} style={{
            width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-strong)',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
          }}>{theme === 'dark' ? 'LT' : 'DK'}</button>
          <div style={{ position: 'relative' }}>
            <IconButton aria-label="Cart" onClick={onCart}><Icon name="bag" /></IconButton>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 2, minWidth: 16, height: 16, padding: '0 4px',
                background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
