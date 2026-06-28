import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kinetik",
  description: "Kinetik theme — Next.js-first, ports to Shopify Liquid.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
