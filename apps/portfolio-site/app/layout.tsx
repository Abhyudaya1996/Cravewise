import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhyudaya Singh - AI Product Portfolio",
  description:
    "AI Product Portfolio by Abhyudaya Singh, a fintech Product Manager building structured product experiments with bounded AI, deterministic trust layers, and honest evidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
