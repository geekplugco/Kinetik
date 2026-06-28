"use client";

import type { SectionProps } from "../registry";
import { useShopify, useMoney } from "../shopify-context";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";

const field = "border border-border-strong bg-surface-page px-4 py-3 font-sans text-body text-text-strong placeholder:text-text-faint";
const wrap = "mx-auto max-w-[420px] px-6 py-16";

function Heading({ children }: { children: string }) {
  return <h1 className="font-display text-h1 tracking-tight text-text-strong">{children}</h1>;
}

export function CustomerLogin(_: SectionProps) {
  return (
    <section className={wrap}>
      <Heading>Sign in</Heading>
      <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input type="email" required placeholder="Email" aria-label="Email" className={field} />
        <input type="password" required placeholder="Password" aria-label="Password" className={field} />
        <Button type="submit">Sign in</Button>
      </form>
      <div className="mt-4 flex justify-between font-mono text-xs uppercase tracking-label text-text-muted">
        <a href="/account/reset" className="hover:text-text-strong">Forgot password</a>
        <a href="/account/register" className="hover:text-text-strong">Create account</a>
      </div>
    </section>
  );
}

export function CustomerRegister(_: SectionProps) {
  return (
    <section className={wrap}>
      <Heading>Create account</Heading>
      <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="First name" aria-label="First name" className={field} />
        <input type="text" placeholder="Last name" aria-label="Last name" className={field} />
        <input type="email" required placeholder="Email" aria-label="Email" className={field} />
        <input type="password" required placeholder="Password" aria-label="Password" className={field} />
        <Button type="submit">Create account</Button>
      </form>
      <a href="/account/login" className="mt-4 block font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">Already have an account? Sign in</a>
    </section>
  );
}

export function CustomerReset(_: SectionProps) {
  return (
    <section className={wrap}>
      <Heading>Reset password</Heading>
      <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input type="email" required placeholder="Email" aria-label="Email" className={field} />
        <Button type="submit">Send reset link</Button>
      </form>
      <a href="/account/login" className="mt-4 block font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">Back to sign in</a>
    </section>
  );
}

export function CustomerActivate(_: SectionProps) {
  return (
    <section className={wrap}>
      <Heading>Activate account</Heading>
      <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input type="password" required placeholder="Password" aria-label="Password" className={field} />
        <input type="password" required placeholder="Confirm password" aria-label="Confirm password" className={field} />
        <Button type="submit">Activate</Button>
      </form>
    </section>
  );
}

export function CustomerAccount(_: SectionProps) {
  const { shop } = useShopify();
  const money = useMoney();
  return (
    <section className="mx-auto max-w-[900px] px-6 py-16">
      <div className="flex items-center justify-between">
        <Heading>Account</Heading>
        <a href="/account/login" className="font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">Sign out</a>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-label text-text-muted">Order history</h2>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border-strong font-mono text-xs uppercase tracking-label text-text-muted">
                <th className="py-3">Order</th><th>Date</th><th>Status</th><th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-hairline text-text-body"><td className="py-4"><a href="/account/orders/1024" className="font-mono hover:text-accent-press">#1024</a></td><td>2026-05-02</td><td><Tag tone="accent">Fulfilled</Tag></td><td className="text-right font-mono">{money(38800)}</td></tr>
              <tr className="border-b border-border-hairline text-text-body"><td className="py-4"><a href="/account/orders/1019" className="font-mono hover:text-accent-press">#1019</a></td><td>2026-04-18</td><td><Tag>Delivered</Tag></td><td className="text-right font-mono">{money(14000)}</td></tr>
            </tbody>
          </table>
        </div>
        <aside className="flex flex-col gap-3">
          <h2 className="font-mono text-xs uppercase tracking-label text-text-muted">Account details</h2>
          <p className="text-body text-text-body">Signed in to {shop.name}.</p>
          <a href="/account/addresses" className="font-mono text-xs uppercase tracking-label text-text-strong underline underline-offset-4 hover:text-accent-press">Manage addresses</a>
        </aside>
      </div>
    </section>
  );
}

export function CustomerOrder(_: SectionProps) {
  const money = useMoney();
  return (
    <section className="mx-auto max-w-[760px] px-6 py-16">
      <a href="/account" className="font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">← Account</a>
      <Heading>Order #1024</Heading>
      <p className="mt-2 font-mono text-xs text-text-muted">Placed 2026-05-02 · Fulfilled</p>
      <table className="mt-8 w-full border-collapse text-left text-sm">
        <tbody className="divide-y divide-border-hairline">
          <tr className="text-text-body"><td className="py-4">Shell Jacket × 1</td><td className="text-right font-mono">{money(24800)}</td></tr>
          <tr className="text-text-body"><td className="py-4">Field Cap × 1</td><td className="text-right font-mono">{money(4500)}</td></tr>
        </tbody>
        <tfoot>
          <tr className="border-t border-border-strong text-text-strong"><td className="py-4 font-mono uppercase">Total</td><td className="text-right font-mono">{money(38800)}</td></tr>
        </tfoot>
      </table>
    </section>
  );
}

export function CustomerAddresses(_: SectionProps) {
  return (
    <section className="mx-auto max-w-[760px] px-6 py-16">
      <a href="/account" className="font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">← Account</a>
      <Heading>Addresses</Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-border-hairline p-5">
          <span className="font-mono text-xs uppercase tracking-label text-text-muted">Default</span>
          <address className="mt-2 not-italic text-body text-text-body">A. Mercer<br />382 NE 191st St<br />Miami, FL 33179</address>
          <button type="button" className="mt-4 font-mono text-xs uppercase tracking-label text-text-strong underline underline-offset-4 hover:text-accent-press">Edit</button>
        </div>
        <button type="button" className="flex min-h-32 items-center justify-center border border-dashed border-border-strong font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">+ Add address</button>
      </div>
    </section>
  );
}
