/* global React */
const { ProductCard, MediaTile, CollectionCard, TrustBar, Button, Tag, Icon } = window.KinetikDesignSystem_fefe1a;

function HomeView({ products, onAdd, onOpen }) {
  return (
    <div>
      {/* HERO — oversized split */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', borderBottom: '1px solid var(--border-strong)' }}>
        <div style={{
          background: 'var(--ink-950)', color: 'var(--paper)',
          padding: 'var(--space-16) var(--space-12)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 520,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--volt-500)' }}>
            SS26 / Field System
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: 'var(--paper)', margin: '24px 0' }}>
            MOVE<br />FASTER.
          </h1>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <p style={{ maxWidth: 360, color: 'var(--ink-300)', fontSize: 16, lineHeight: 1.5 }}>
              High-resolution techwear that loads in a blink. Engineered for the city, the trail, and everything in transit.
            </p>
            <Button variant="primary" size="lg" iconRight={<Icon name="arrowRight" size={19} />}>Shop the Drop</Button>
          </div>
        </div>
        <MediaTile tone="dark" code="SS26 · Lookbook" ratio="auto" style={{ minHeight: 520 }}>
          <div style={{ position: 'absolute', top: 16, left: 16 }}><Tag tone="sale">New Drop</Tag></div>
        </MediaTile>
      </section>

      {/* CATEGORY BENTO */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border-hairline)', borderBottom: '1px solid var(--border-strong)' }}>
        <CollectionCard name="Outerwear" count={24} code="Outerwear" ratio="4 / 3" onOpen={() => onOpen?.()} />
        <CollectionCard name="Audio" count={9} code="Audio" ratio="4 / 3" onOpen={() => onOpen?.()} />
        <CollectionCard name="Gear" count={17} code="Gear" ratio="4 / 3" onOpen={() => onOpen?.()} />
      </section>

      {/* PRODUCT GRID */}
      <section style={{ padding: 'var(--space-12) var(--space-6) var(--space-16)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 32 }}>New Arrivals</h2>
          <a onClick={() => onOpen?.()} style={{ cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            View All <Icon name="arrowRight" size={15} />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)' }}>
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} {...p} style={{ border: 'none' }}
              onAdd={() => onAdd?.(p)} onOpen={() => onOpen?.(p)} />
          ))}
        </div>
      </section>

      {/* TRUST */}
      <TrustBar style={{ borderLeft: 'none', borderRight: 'none', borderRadius: 0 }} />
    </div>
  );
}

window.HomeView = HomeView;
