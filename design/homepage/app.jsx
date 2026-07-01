/* global React, ReactDOM, KinetikDesignSystem_fefe1a */
const { useState, useMemo, useEffect } = React;

/* viewport hook — drives all responsive layout */
function useViewport() {
  const get = () => (typeof window === 'undefined' ? 1280 : window.innerWidth);
  const [w, setW] = useState(get);
  useEffect(() => {
    let raf = 0;
    const onR = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setW(get())); };
    window.addEventListener('resize', onR);
    return () => { window.removeEventListener('resize', onR); cancelAnimationFrame(raf); };
  }, []);
  return { w, isMobile: w < 680, isTablet: w >= 680 && w < 1040, isDesktop: w >= 1040 };
}
const K = window.KinetikDesignSystem_fefe1a;
const {
  Logo, Button, IconButton, Icon, Tag,
  AnnouncementBar, TrustBar, SectionHeading,
  ProductCard, CollectionCard, MediaTile,
  Drawer, CartLineItem, ShippingBar,
} = K;

const INK = 'var(--ink-950)';
const VOLT = 'var(--volt-500)';

/* ----------------------------------------------------------- catalog ---- */
const PRODUCTS = [
  { id: 'shell-01', code: 'KX-SHELL-01', category: 'Outerwear', name: 'Shell-01 Hardshell', price: 336, compareAt: 420, badge: null, src: 'uploads/card-01-shell-jacket.png', spec: 'Gore-Tex 3L · 480g', colors: [{ name: 'Ink', swatch: '#0A0A0A' }, { name: 'Volt', swatch: VOLT }] },
  { id: 'pant-02', code: 'KX-PANT-02', category: 'Bottoms', name: 'Cargo Tech Pant', price: 210, badge: 'New', src: 'uploads/card-02-cargo-pants.png', spec: '4-way stretch · taped', colors: [{ name: 'Graphite', swatch: '#3A3A3A' }, { name: 'Ink', swatch: '#0A0A0A' }] },
  { id: 'vest-03', code: 'KX-VEST-03', category: 'Outerwear', name: 'Utility Vest 6P', price: 188, compareAt: 235, badge: null, src: 'uploads/card-03-utility-vest.png', spec: '6-pocket · ripstop', colors: [{ name: 'Ink', swatch: '#0A0A0A' }] },
  { id: 'bag-04', code: 'KX-BAG-04', category: 'Gear', name: 'Sling 4L', price: 145, badge: 'New', src: 'uploads/card-04-sling-bag.png', spec: 'CORDURA · 4L', colors: [{ name: 'Ink', swatch: '#0A0A0A' }] },
  { id: 'shoe-05', code: 'KX-SHOE-05', category: 'Footwear', name: 'Trail Runner XS', price: 240, compareAt: 300, badge: null, src: 'uploads/card-05-sneakers.png', spec: 'Vibram · 280g', colors: [{ name: 'Ink', swatch: '#0A0A0A' }, { name: 'Bone', swatch: '#EFece2' }] },
  { id: 'cap-06', code: 'KX-CAP-06', category: 'Headwear', name: '6-Panel Field Cap', price: 65, badge: null, src: 'uploads/card-06-cap.png', spec: 'Cotton twill · strap', colors: [{ name: 'Ink', swatch: '#0A0A0A' }] },
  { id: 'aud-07', code: 'KX-AUD-07', category: 'Audio', name: 'Field Monitors', price: 290, compareAt: 340, badge: null, src: 'uploads/card-07-headphones.png', spec: 'ANC · 40h battery', colors: [{ name: 'Ink', swatch: '#0A0A0A' }] },
  { id: 'aud-08', code: 'KX-AUD-08', category: 'Audio', name: 'Pulse Earbuds', price: 160, badge: 'New', src: 'uploads/card-08-earbuds.png', spec: 'IPX5 · 32h case', colors: [{ name: 'Ink', swatch: '#0A0A0A' }] },
  { id: 'watch-09', code: 'KX-WTCH-09', category: 'Tech', name: 'Kinetik Watch', price: 380, badge: null, src: 'uploads/card-09-smartwatch.png', spec: 'GPS · 18h active', colors: [{ name: 'Ink', swatch: '#0A0A0A' }, { name: 'Volt', swatch: VOLT }] },
  { id: 'spk-10', code: 'KX-SPK-10', category: 'Audio', name: 'Field Speaker 02', price: 175, compareAt: 215, badge: null, src: 'uploads/card-10-speaker.png', spec: 'IP67 · 24h play', colors: [{ name: 'Ink', swatch: '#0A0A0A' }] },
];

const mono = { fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' };
const wrap = { maxWidth: 1440, margin: '0 auto', width: '100%' };
const pad = (vp) => (vp.isMobile ? 16 : 24);

/* ------------------------------------------------------------- header ---- */
const NAV = ['New Arrivals', 'Apparel', 'Audio', 'Gear', 'Lookbook'];

function Header({ count, onCart, vp, onMenu }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--surface-page)', borderBottom: '1px solid var(--border-strong)' }}>
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${pad(vp)}px`, height: vp.isMobile ? 56 : 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: vp.isDesktop ? 40 : 12 }}>
          {!vp.isDesktop && (
            <IconButton aria-label="Menu" size="md" onClick={onMenu}><Icon name="menu" size={22} /></IconButton>
          )}
          <Logo size={vp.isMobile ? 20 : 24} />
          {vp.isDesktop && (
            <nav style={{ display: 'flex', gap: 26 }}>
              {NAV.map((n) => (
                <a key={n} href="#arrivals" style={{ ...mono, fontSize: 11, color: 'var(--text-body)', letterSpacing: '0.1em', cursor: 'pointer' }}>{n}</a>
              ))}
            </nav>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!vp.isMobile && <IconButton aria-label="Search" size="md"><Icon name="search" size={20} /></IconButton>}
          {!vp.isMobile && <IconButton aria-label="Account" size="md"><Icon name="user" size={20} /></IconButton>}
          <button type="button" aria-label="Cart" onClick={onCart} style={{ position: 'relative', width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-strong)' }}>
            <Icon name="bag" size={20} />
            {count > 0 && (
              <span style={{ position: 'absolute', top: 4, right: 2, minWidth: 16, height: 16, padding: '0 4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, borderRadius: 8 }}>{count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose }) {
  return (
    <Drawer open={open} onClose={onClose} title="Menu" side="left" width={300}>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {NAV.map((n) => (
          <a key={n} href="#arrivals" onClick={onClose} style={{ ...mono, fontSize: 14, color: 'var(--text-strong)', letterSpacing: '0.08em', padding: '18px 24px', borderBottom: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {n}<Icon name="chevronRight" size={18} />
          </a>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 8, padding: '20px 24px' }}>
        <Button variant="secondary" size="md" iconLeft={<Icon name="search" size={16} />}>Search</Button>
        <Button variant="secondary" size="md" iconLeft={<Icon name="user" size={16} />}>Account</Button>
      </div>
    </Drawer>
  );
}

/* --------------------------------------------------------------- hero ---- */
function Hero({ vp }) {
  const stack = !vp.isDesktop;
  const p = vp.isMobile ? 28 : 56;
  return (
    <section style={{ ...wrap, borderBottom: '1px solid var(--border-strong)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: stack ? '1fr' : '1.05fr 1.25fr' }}>
        <div style={{ background: INK, color: '#fff', padding: `${p}px ${p}px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: stack ? 28 : 0, minHeight: stack ? 'auto' : 600, order: stack ? 2 : 1 }}>
          <div style={{ ...mono, fontSize: 12, letterSpacing: '0.14em', color: VOLT }}>SS26 / Field System</div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(3rem, 11vw, 6rem)', lineHeight: 0.9, letterSpacing: '-0.04em', color: '#fff', margin: stack ? '8px 0 0' : '24px 0 0' }}>MOVE<br />FASTER.</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p style={{ maxWidth: 380, color: 'var(--ink-300)', fontSize: 16, lineHeight: 1.5, margin: 0 }}>High-resolution techwear that loads in a blink. Engineered for the city, the trail, and everything in transit.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#arrivals"><Button variant="primary" size="lg" iconRight={<Icon name="arrowRight" size={19} />}>Shop the Drop</Button></a>
              <a href="#lookbook"><Button variant="inverse" size="lg" style={{ background: 'transparent', borderColor: 'var(--ink-600)', color: '#fff' }}>Lookbook</Button></a>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', background: '#1A1A1A', minHeight: stack ? (vp.isMobile ? 380 : 460) : 600, overflow: 'hidden', order: stack ? 1 : 2 }}>
          <img src="uploads/hero-editorial.png" alt="SS26 field system lookbook" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', left: 24, bottom: 24, ...mono, fontSize: 11, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em' }}>SS26 · Lookbook 01</div>
          <span style={{ position: 'absolute', right: 24, top: 24 }}><Tag tone="sale">Drop 04 Live</Tag></span>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = ['Ships in 24h', 'Gore-Tex 3L', 'Free returns 60d', 'Engineered for movement', 'Carbon-neutral delivery', 'Field-tested'];
  const row = [...items, ...items, ...items];
  return (
    <div style={{ borderTop: '1px solid var(--border-strong)', background: VOLT, overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-flex', gap: 0, animation: 'km-marquee 28s linear infinite' }}>
        {row.map((t, i) => (
          <span key={i} style={{ ...mono, fontSize: 12, fontWeight: 700, color: INK, padding: '11px 22px', letterSpacing: '0.12em' }}>{t} <span style={{ opacity: 0.45, marginLeft: 22 }}>/</span></span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- arrivals ---- */
function Arrivals({ onAdd, vp }) {
  const cols = vp.isMobile ? 2 : vp.isTablet ? 3 : 5;
  return (
    <section id="arrivals" style={{ ...wrap, padding: `${vp.isMobile ? 44 : 72}px ${pad(vp)}px 24px` }}>
      <SectionHeading eyebrow="SS26 · 10 styles" title="New Arrivals" action={{ label: 'View All', onClick: () => {} }} style={{ marginBottom: 28 }} />
      <div className="km-pgrid" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)' }}>
        {PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            category={p.category}
            price={p.price}
            compareAt={p.compareAt}
            badge={p.badge}
            colors={p.colors}
            src={p.src}
            code={p.code}
            onAdd={() => onAdd(p)}
            onOpen={() => onAdd(p)}
            style={{ border: 'none' }}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- banner ---- */
function FieldBanner({ vp }) {
  if (!vp.isDesktop) {
    // stacked: image on top, copy on ink below
    return (
      <section id="lookbook" style={{ ...wrap, padding: `24px ${pad(vp)}px` }}>
        <div style={{ border: '1px solid var(--border-strong)', overflow: 'hidden' }}>
          <div style={{ position: 'relative', background: '#1A1A1A' }}>
            <img src="uploads/banner-dark-flatlay.png" alt="The field system flat-lay" style={{ display: 'block', width: '100%', height: vp.isMobile ? 260 : 340, objectFit: 'cover' }} />
          </div>
          <div style={{ background: INK, padding: vp.isMobile ? '28px 24px' : '40px 48px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ ...mono, fontSize: 12, color: VOLT, letterSpacing: '0.14em' }}>The Complete Kit</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 8vw, 3.4rem)', lineHeight: 0.92, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>ONE SYSTEM.<br />HEAD TO TRAIL.</h2>
            <p style={{ color: 'var(--ink-300)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>Twelve modular pieces engineered to work as one. Layer the shell, load the vest, sync the gear — built monochrome, built to move.</p>
            <div><a href="#arrivals"><Button variant="primary" size="md" iconRight={<Icon name="arrowRight" size={17} />}>Shop the System</Button></a></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="lookbook" style={{ ...wrap, padding: '24px 24px' }}>
      <div style={{ position: 'relative', background: INK, border: '1px solid var(--border-strong)', overflow: 'hidden' }}>
        <img src="uploads/banner-dark-flatlay.png" alt="The field system flat-lay" style={{ display: 'block', width: '100%', height: '100%', maxHeight: 540, objectFit: 'cover', opacity: 0.92 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0) 70%)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '52%', padding: '48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          <div style={{ ...mono, fontSize: 12, color: VOLT, letterSpacing: '0.14em' }}>The Complete Kit</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', lineHeight: 0.92, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>ONE SYSTEM.<br />HEAD TO TRAIL.</h2>
          <p style={{ maxWidth: 360, color: 'var(--ink-300)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>Twelve modular pieces engineered to work as one. Layer the shell, load the vest, sync the gear — built monochrome, built to move.</p>
          <div><a href="#arrivals"><Button variant="primary" size="md" iconRight={<Icon name="arrowRight" size={17} />}>Shop the System</Button></a></div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- collections ---- */
function Collections({ vp }) {
  const cols = [
    { name: 'Apparel', count: 14, src: 'uploads/card-01-shell-jacket.png' },
    { name: 'Audio', count: 8, src: 'uploads/card-07-headphones.png' },
    { name: 'Gear', count: 11, src: 'uploads/card-04-sling-bag.png' },
  ];
  return (
    <section style={{ ...wrap, padding: `48px ${pad(vp)}px 24px` }}>
      <SectionHeading eyebrow="Shop by category" title="Collections" style={{ marginBottom: 28 }} />
      <div style={{ display: 'grid', gridTemplateColumns: vp.isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)' }}>
        {cols.map((c) => (
          <CollectionCard key={c.name} name={c.name} count={c.count} src={c.src} ratio={vp.isMobile ? '16 / 9' : '3 / 2'} />
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- trust+nl ---- */
function TrustSection({ vp }) {
  return (
    <section style={{ ...wrap, padding: `24px ${pad(vp)}px 24px` }}>
      <TrustBar />
    </section>
  );
}

function Newsletter({ vp }) {
  const [email, setEmail] = useState('');
  const stack = !vp.isDesktop;
  return (
    <section style={{ ...wrap, padding: `24px ${pad(vp)}px 72px` }}>
      <div style={{ background: INK, color: '#fff', border: '1px solid var(--border-strong)', padding: vp.isMobile ? '32px 24px' : '56px 56px', display: 'grid', gridTemplateColumns: stack ? '1fr' : '1.2fr 1fr', gap: stack ? 28 : 40, alignItems: 'center' }}>
        <div>
          <div style={{ ...mono, fontSize: 12, color: VOLT, letterSpacing: '0.14em', marginBottom: 16 }}>Drop Alerts</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem, 6vw, 3rem)', lineHeight: 0.95, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>FIRST ACCESS.<br />ZERO NOISE.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ color: 'var(--ink-300)', fontSize: 15, lineHeight: 1.5, margin: 0 }}>Restocks, drops, and field reports. One email per drop. Unsubscribe anytime.</p>
          <div style={{ display: 'flex', gap: 0, border: '1px solid var(--ink-600)' }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.04em', padding: '0 16px', height: 44 }} />
            <Button variant="primary" size="md" style={{ borderRadius: 0 }}>Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- footer ---- */
function Footer({ vp }) {
  const groups = [
    { h: 'Shop', items: ['New Arrivals', 'Apparel', 'Audio', 'Gear', 'Sale'] },
    { h: 'Support', items: ['Shipping', 'Returns', 'Size Guide', 'Warranty', 'Contact'] },
    { h: 'Company', items: ['About', 'Field Journal', 'Sustainability', 'Stores', 'Careers'] },
  ];
  const gc = vp.isMobile ? '1fr 1fr' : vp.isTablet ? 'repeat(3, 1fr)' : '2fr 1fr 1fr 1fr';
  return (
    <footer style={{ borderTop: '1px solid var(--border-strong)', background: 'var(--surface-page)' }}>
      <div style={{ ...wrap, padding: `${vp.isMobile ? 40 : 56}px ${pad(vp)}px 32px`, display: 'grid', gridTemplateColumns: gc, gap: vp.isMobile ? 28 : 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: vp.isDesktop ? 'auto' : '1 / -1' }}>
          <Logo size={26} />
          <p style={{ maxWidth: 280, color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>Minimalist techwear &amp; tech accessories. Sharp visuals, instant response. Engineered for movement.</p>
        </div>
        {groups.map((g) => (
          <div key={g.h} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ ...mono, fontSize: 11, color: 'var(--text-strong)', letterSpacing: '0.12em' }}>{g.h}</div>
            {g.items.map((it) => (
              <a key={it} href="#" style={{ fontSize: 14, color: 'var(--text-muted)', cursor: 'pointer' }}>{it}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--border-hairline)' }}>
        <div style={{ ...wrap, padding: `18px ${pad(vp)}px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ ...mono, fontSize: 11, color: 'var(--text-faint)' }}>© 2026 Kinetik · All systems operational</span>
          <span style={{ ...mono, fontSize: 11, color: 'var(--text-faint)' }}>Designed in transit</span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------- cart ---- */
function CartPanel({ open, onClose, items, setQty, removeItem }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const empty = items.length === 0;
  return (
    <Drawer open={open} onClose={onClose} title="Your Cart" width={440}
      footer={!empty && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ ...mono, fontSize: 12, color: 'var(--text-muted)' }}>Subtotal</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>${subtotal}</span>
          </div>
          <Button variant="primary" size="lg" block>Checkout · ${subtotal}</Button>
          <button type="button" onClick={onClose} style={{ ...mono, fontSize: 11, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Continue Shopping</button>
        </div>
      )}>
      {empty ? (
        <div style={{ padding: '64px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Icon name="bag" size={32} style={{ color: 'var(--text-faint)' }} />
          <p style={{ ...mono, fontSize: 12, color: 'var(--text-muted)' }}>Your cart is empty</p>
          <Button variant="secondary" size="md" onClick={onClose}>Start Shopping</Button>
        </div>
      ) : (
        <div>
          <ShippingBar current={subtotal} threshold={250} />
          <div style={{ borderTop: '1px solid var(--border-hairline)' }}>
            {items.map((i) => (
              <CartLineItem key={i.id} name={i.name} variant={i.category} price={i.price} qty={i.qty} src={i.src} code={i.code}
                onQty={(v) => setQty(i.id, v)} onRemove={() => removeItem(i.id)} />
            ))}
          </div>
        </div>
      )}
    </Drawer>
  );
}

/* ---------------------------------------------------------------- app ---- */
function App() {
  const vp = useViewport();
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const add = (p) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      if (ex) return c.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...p, qty: 1 }];
    });
    setOpen(true);
  };
  const setQty = (id, v) => setCart((c) => v <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => i.id === id ? { ...i, qty: v } : i));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  return (
    <React.Fragment>
      <AnnouncementBar tone="volt" messages={['Drop 04 is live — ships in 24h', 'Free shipping over $250', 'New: Kinetik Watch — GPS, 18h active']} />
      <Header count={count} onCart={() => setOpen(true)} vp={vp} onMenu={() => setMenu(true)} />
      <main>
        <Hero vp={vp} />
        <Arrivals onAdd={add} vp={vp} />
        <FieldBanner vp={vp} />
        <Collections vp={vp} />
        <TrustSection vp={vp} />
        <Newsletter vp={vp} />
      </main>
      <Footer vp={vp} />
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
      <CartPanel open={open} onClose={() => setOpen(false)} items={cart} setQty={setQty} removeItem={removeItem} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
