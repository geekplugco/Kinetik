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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(){var d=document.documentElement;d.classList.add('has-js');try{var p=localStorage.getItem('hp-preset');if(p&&p!=='field')d.setAttribute('data-preset',p);}catch(e){}})()" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
