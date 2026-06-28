export function money(cents: number, opts?: { currency?: string; locale?: string }): string {
  const currency = opts?.currency ?? "USD";
  const locale = opts?.locale ?? "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(cents / 100);
}

export function t(dict: Record<string, string>, key: string, fallback?: string): string {
  return dict[key] ?? fallback ?? key;
}

export function imageUrl(src: string, width?: number): string {
  if (!width) return src;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}width=${width}`;
}
