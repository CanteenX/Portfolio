import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nventra — High-Performance Web & Mobile Engineering",
  description: "Nventra is an elite engineering collective building scalable web and mobile products for global brands.",
  openGraph: {
    title: "Nventra — High-Performance Web & Mobile Engineering",
    description: "Nventra is an elite engineering collective building scalable web and mobile products for global brands.",
    type: "website",
    siteName: "Nventra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nventra — High-Performance Web & Mobile Engineering",
    description: "Nventra is an elite engineering collective building scalable web and mobile products for global brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
