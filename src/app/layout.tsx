import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Layout from "~/components/layout";

const instrument = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devlinks",
  description: "A Link Sharing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={instrument.className}>{children}</body>
    </html>
  );
}
