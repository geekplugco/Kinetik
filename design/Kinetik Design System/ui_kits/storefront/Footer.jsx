/* global React */
const { Logo, Input, Button, Icon } = window.KinetikDesignSystem_fefe1a;

function Footer() {
  const cols = [
    ['Shop', ['Outerwear', 'Bottoms', 'Audio', 'Gear', 'Sale']],
    ['Support', ['Shipping', 'Returns', 'Size Guide', 'Track Order']],
    ['Studio', ['About', 'Sustainability', 'Stores', 'Careers']],
  ];
  return (
    <footer style={{ borderTop: '1px solid var(--border-strong)', background: 'var(--surface-page)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 0 }}>
        <div style={{ padding: 'var(--space-12) var(--space-6)', borderRight: '1px solid var(--border-hairline)' }}>
          <Logo size={28} />
          <p style={{ marginTop: 16, maxWidth: 280, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            High-resolution gear, zero-latency storefront. Built from one system of independent parts.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 20, maxWidth: 320 }}>
            <Input placeholder="Email for drops" containerStyle={{ flex: 1 }} />
            <Button variant="primary" iconRight={<Icon name="arrowRight" size={16} />}>Join</Button>
          </div>
        </div>
        {cols.map(([title, items], i) => (
          <div key={i} style={{ padding: 'var(--space-12) var(--space-6)', borderRight: i < 2 ? '1px solid var(--border-hairline)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>{title}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((it, j) => (
                <li key={j}><a style={{ cursor: 'pointer', fontSize: 14, color: 'var(--text-body)' }}>{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8,
        padding: 'var(--space-5) var(--space-6)', borderTop: '1px solid var(--border-hairline)',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--text-muted)',
      }}>
        <span>© 2026 KINETIK STUDIO</span>
        <span>TERMS · PRIVACY · A 60FPS STOREFRONT</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
