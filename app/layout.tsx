import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABIRYVA Private Security | Private Security Escorts",
  description: "Explore private executive convoys, compare service ratings and request a tailored quote.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
