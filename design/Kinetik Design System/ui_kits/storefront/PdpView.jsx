/* global React */
const { MediaTile, PriceTag, VariantPicker, QuantityStepper, Button, Tag, Icon, Breadcrumbs, StarRating, Accordion, TrustBar, Dialog } = window.KinetikDesignSystem_fefe1a;
const isUnavailable = VariantPicker.isUnavailable;
const { useState, useEffect, useMemo } = React;

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

function PdpView({ product, onAdd }) {
  const p = product;
  const needsSize = p.sizes.length > 0 && !(p.sizes.length === 1 && /one size/i.test(p.sizes[0]));

  // first colorway that has any stock
  const firstColor = useMemo(() => {
    const ok = p.colors.find(c => !(p.unavailable || []).includes(`${c.name}|*`) && (!needsSize || p.sizes.some(s => !isUnavailable(p.unavailable, c.name, s))));
    return (ok || p.colors[0])?.name;
  }, [p.id]);
  const firstSize = (color) => needsSize ? (p.sizes.find(s => !isUnavailable(p.unavailable, color, s)) || null) : 'One Size';

  const [variant, setVariant] = useState({ color: firstColor, size: firstSize(firstColor) });
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);

  // reset when product changes
  useEffect(() => {
    const c = firstColor;
    setVariant({ color: c, size: firstSize(c) });
    setQty(1);
  }, [p.id]);

  // when color changes to one where the chosen size is gone, clear size
  const onVariant = (next) => {
    if (next.color !== variant.color && needsSize) {
      const keep = next.size && !isUnavailable(p.unavailable, next.color, next.size) ? next.size : firstSize(next.color);
      setVariant({ color: next.color, size: keep });
    } else {
      setVariant(next);
    }
  };

  const onSale = p.compareAt != null && p.compareAt > p.price;
  const soldOut = !variant.size || isUnavailable(p.unavailable, variant.color, variant.size);
  const low = (p.lowStock || []).includes(`${variant.color}|${variant.size}`);
  const ctaLabel = soldOut && variant.size ? 'Sold Out'
    : !variant.size ? 'Select a Size'
    : `Add to Cart · ${money(p.price * qty)}`;

  const stock = soldOut && variant.size
    ? { icon: 'close', text: 'Sold out in this combination', color: 'var(--text-faint)' }
    : low
      ? { icon: 'package', text: 'Low stock — only a few left', color: 'var(--text-strong)' }
      : { icon: 'package', text: 'In stock · Ships in 24h', color: 'var(--text-muted)' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', borderBottom: '1px solid var(--border-strong)' }}>
      {/* MEDIA COLUMN — swaps with colorway */}
      <div style={{ borderRight: '1px solid var(--border-hairline)' }}>
        <MediaTile key={variant.color} code={`${p.code} · ${variant.color}`} ratio="1 / 1">
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 6 }}>
            {onSale && <Tag tone="sale">−{Math.round((1 - p.price / p.compareAt) * 100)}%</Tag>}
            {p.badge && <Tag tone="solid">{p.badge}</Tag>}
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <Icon name="play" size={13} /> Hover to play · {variant.color}
          </div>
        </MediaTile>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border-hairline)', borderTop: '1px solid var(--border-hairline)' }}>
          <MediaTile code={`${variant.color} · 01`} ratio="1 / 1" />
          <MediaTile code={`${variant.color} · 02`} ratio="1 / 1" />
        </div>
      </div>

      {/* STICKY INFO */}
      <div>
        <div style={{ position: 'sticky', top: 'var(--header-h)', padding: 'var(--space-10) var(--space-10) var(--space-12)' }}>
          <Breadcrumbs items={['Home', p.category, p.name]} style={{ marginBottom: 18 }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{p.category} · {p.code}</div>
          <h1 style={{ fontSize: 40, margin: '12px 0 12px' }}>{p.name}</h1>
          <div style={{ marginBottom: 16 }}><StarRating value={p.rating || 4.5} count={p.reviews} showValue /></div>
          <PriceTag price={p.price} compareAt={p.compareAt} size="lg" />
          <p style={{ margin: '20px 0 28px', maxWidth: 420, color: 'var(--text-body)', lineHeight: 1.6, fontSize: 15 }}>{p.blurb}</p>

          {/* VARIANTS */}
          <VariantPicker
            colors={p.colors} sizes={p.sizes} unavailable={p.unavailable}
            value={variant} onChange={onVariant}
            onGuide={needsSize ? () => setGuide(true) : undefined}
            style={{ marginBottom: 28 }}
          />

          {/* add to cart */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <QuantityStepper value={qty} min={1} max={10} onChange={setQty} />
            <Button variant="primary" block size="lg" disabled={soldOut}
              iconLeft={!soldOut ? <Icon name="bag" size={18} /> : undefined}
              onClick={() => !soldOut && onAdd?.({ ...p, color: variant.color, size: variant.size, qty })}>
              {ctaLabel}
            </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: stock.color, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
            <Icon name={stock.icon} size={15} /> {stock.text}
          </div>

          <TrustBar columns={2} style={{ marginBottom: 28 }} items={[
            { icon: 'package', label: 'Ships in 24h' },
            { icon: 'shield', label: 'Secure checkout' },
            { icon: 'arrowRight', label: '60-day returns' },
            { icon: 'star', label: '2-year warranty' },
          ]} />

          {/* specs + disclosure */}
          <Accordion defaultOpen={['specs']} items={[
            { id: 'specs', title: 'Specifications', content: (
              <div>
                {p.specs.map(([k, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < p.specs.length - 1 ? '1px solid var(--border-hairline)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text-strong)' }}>{v}</span>
                  </div>
                ))}
              </div>
            ) },
            { id: 'ship', title: 'Shipping & Returns', content: 'Ships in 24h. Free over $200. 60-day returns, no questions asked.' },
            { id: 'care', title: 'Care', content: 'Machine wash cold, hang dry. Do not tumble dry membrane fabrics.' },
          ]} />
        </div>
      </div>

      {/* SIZE GUIDE */}
      <Dialog open={guide} onClose={() => setGuide(false)} title="Size Guide"
        footer={<Button variant="inverse" block onClick={() => setGuide(false)}>Done</Button>}>
        <div style={{ border: '1px solid var(--border-hairline)' }}>
          {[['Size', 'Chest', 'Length'], ['S', '98cm', '68cm'], ['M', '104cm', '70cm'], ['L', '110cm', '72cm'], ['XL', '116cm', '74cm']].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < 4 ? '1px solid var(--border-hairline)' : 'none', background: i === 0 ? 'var(--surface-sunken)' : 'transparent' }}>
              {row.map((cell, j) => (
                <span key={j} style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', textTransform: i === 0 ? 'uppercase' : 'none', color: i === 0 ? 'var(--text-muted)' : 'var(--text-strong)', fontWeight: j === 0 && i > 0 ? 700 : 400 }}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
        <p style={{ margin: '16px 0 0', fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)' }}>Model is 183cm, wearing M. Between sizes? Size up for a layering fit.</p>
      </Dialog>
    </div>
  );
}

window.PdpView = PdpView;
