Blog / editorial teaser. `layout="stack"` for the article grid, `layout="row"` for a featured wide post at the top of the journal.

```jsx
<ArticleCard layout="row" category="Field Notes" date="Mar 12" readTime="6 min"
  title="Engineering the Shell-01" excerpt="How a 3-layer membrane…" onOpen={openArticle} />

<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
  {posts.map(p => <ArticleCard key={p.id} {...p} onOpen={() => open(p)} />)}
</div>
```
