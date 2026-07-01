/* global React */
const { ProductCard, Tag, Icon, OptionSwatch, Select, Pagination } = window.KinetikDesignSystem_fefe1a;
const { useState, useMemo } = React;

const SWATCHES = [['Volt', '#CCFF00'], ['Ink', '#0A0A0A'], ['Bone', '#EDEAE2'], ['Steel', '#7C8794']];
const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

function FilterGroup({ title, children }) {
  return (
    <div style={{ padding: 'var(--space-5) 0', borderBottom: '1px solid var(--border-hairline)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <button onClick={onRemove} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: 'var(--surface-inverse)', color: 'var(--text-inverse)', border: 'none', cursor: 'pointer',
      padding: '6px 8px 6px 11px', borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>
      {label} <Icon name="close" size={13} />
    </button>
  );
}

function PlpView({ products, title = 'Shop All', onAdd, onOpen }) {
  const [cat, setCat] = useState('All');
  const [colors, setColors] = useState([]);   // multi
  const [sizes, setSizes] = useState([]);      // multi
  const [page, setPage] = useState(1);
  const cats = ['All', 'Outerwear', 'Audio', 'Gear', 'Tops', 'Bottoms'];

  const toggle = (list, set, v) => set(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

  const shown = useMemo(() => products.filter(p => {
    if (cat !== 'All' && p.category !== cat) return false;
    if (colors.length && !p.colors.some(c => colors.includes(c.name))) return false;
    if (sizes.length && !p.sizes.some(s => sizes.includes(s))) return false;
    return true;
  }), [products, cat, colors, sizes]);

  const activeChips = [
    ...(cat !== 'All' ? [{ label: cat, remove: () => setCat('All') }] : []),
    ...colors.map(c => ({ label: c, remove: () => toggle(colors, setColors, c) })),
    ...sizes.map(s => ({ label: `Size ${s}`, remove: () => toggle(sizes, setSizes, s) })),
  ];
  const clearAll = () => { setCat('All'); setColors([]); setSizes([]); };

  return (
    <div>
      {/* COLLECTION HERO */}
      <section style={{ background: 'var(--ink-950)', color: 'var(--paper)', padding: 'var(--space-12) var(--space-6) var(--space-10)', borderBottom: '1px solid var(--border-strong)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--volt-500)' }}>Home / {title}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.92, letterSpacing: '-0.04em', color: 'var(--paper)', margin: 0 }}>{title.toUpperCase()}</h1>
          <p style={{ maxWidth: 380, color: 'var(--ink-300)', fontSize: 15, lineHeight: 1.5, margin: 0 }}>
            Engineered layers, machined audio, and field-ready carry. Built from one system, made to move.
          </p>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        {/* FILTER RAIL */}
        <aside style={{ borderRight: '1px solid var(--border-hairline)', padding: '0 var(--space-6)', alignSelf: 'start', position: 'sticky', top: 'calc(var(--header-h) + 20px)' }}>
          <FilterGroup title="Category">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cats.map(c => (
                <li key={c}><a onClick={() => setCat(c)} style={{
                  cursor: 'pointer', fontSize: 14, fontWeight: cat === c ? 600 : 400,
                  color: cat === c ? 'var(--text-strong)' : 'var(--text-body)',
                  display: 'flex', justifyContent: 'space-between',
                }}>{c}{cat === c && <Icon name="check" size={16} />}</a></li>
              ))}
            </ul>
          </FilterGroup>
          <FilterGroup title="Color">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SWATCHES.map(([n, s]) => (
                <OptionSwatch key={n} kind="color" value={n} swatch={s} selected={colors.includes(n)} onSelect={(v) => toggle(colors, setColors, v)} />
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="Size">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {ALL_SIZES.map(s => <OptionSwatch key={s} kind="size" value={s} selected={sizes.includes(s)} onSelect={(v) => toggle(sizes, setSizes, v)} />)}
            </div>
          </FilterGroup>
        </aside>

        {/* RESULTS */}
        <div>
          {/* sort + count bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-hairline)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{shown.length} Items</span>
            <Select aria-label="Sort" options={[{ value: 'featured', label: 'Sort · Featured' }, { value: 'new', label: 'Sort · Newest' }, { value: 'price', label: 'Sort · Price' }]} size="sm" />
          </div>

          {/* active filter chips */}
          {activeChips.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-hairline)' }}>
              {activeChips.map((c, i) => <Chip key={i} label={c.label} onRemove={c.remove} />)}
              <button onClick={clearAll} style={{ marginLeft: 4, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'underline' }}>Clear All</button>
            </div>
          )}

          {shown.length === 0 ? (
            <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Icon name="search" size={26} style={{ margin: '0 auto 12px', color: 'var(--text-faint)' }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>No items match these filters</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border-hairline)' }}>
              {shown.map(p => (
                <ProductCard key={p.id} {...p} style={{ border: 'none' }} onAdd={() => onAdd?.(p)} onOpen={() => onOpen?.(p)} />
              ))}
            </div>
          )}

          {shown.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-12) 0' }}>
              <Pagination page={page} total={6} onChange={setPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.PlpView = PlpView;
