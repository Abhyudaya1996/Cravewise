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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
