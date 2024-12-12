import type { Metadata } from "next";
import { Nunito, Modak, Bangers } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});
const modak = Modak({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-modak",
});
const bangers = Bangers({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bangers",
});

let title = "The Lying Machine";
let description =
  "Search smarter and faster with our open source AI search engine";
let url = "https://lying-machine.vercel.app/";
let ogimage = "https://lying-machine.vercel.app/og-image.png";
let sitename = "The Lying Machine";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} ${nunito.variable} ${modak.variable} ${bangers.variable} flex min-h-screen flex-col justify-between`}
      >
        {children}
      </body>
    </html>
  );
}
