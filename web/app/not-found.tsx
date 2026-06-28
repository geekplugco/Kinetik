import { ThemeShell } from "@/lib/theme-layout";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <ThemeShell>
      <section className="mx-auto flex max-w-[640px] flex-col items-center gap-6 px-6 py-32 text-center">
        <span className="font-display text-display-1 tracking-hero text-text-strong">404</span>
        <p className="text-body-lg text-text-muted">This page went off-grid.</p>
        <Button href="/">Back home</Button>
      </section>
    </ThemeShell>
  );
}
