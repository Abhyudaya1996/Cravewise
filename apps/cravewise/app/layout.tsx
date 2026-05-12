import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CraveWise Static Prototype",
  description: "A mobile-first food decision prototype using dummy taste history.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
