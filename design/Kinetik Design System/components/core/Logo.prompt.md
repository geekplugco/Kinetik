The Kinetik wordmark. Typographic only (no image asset) — renders in Space Grotesk with a volt full-stop. Use in the header and footer.

```jsx
<Logo size={24} />
<Logo size={32} color="var(--paper)" /> {/* on dark */}
```

On dark surfaces pass `color="var(--paper)"`; the volt dot stays. Set `showDot={false}` for a quieter lockup.
