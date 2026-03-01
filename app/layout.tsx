import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const satoshiFont = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi-sans",
});

const zodiakFont = localFont({
  src: "./fonts/Zodiak-Variable.woff2",
  variable: "--font-zodiak-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://www.creatives.marketing"),
  ),
  title: {
    default: "Creatives Marketing | Tráfego Pago & Branding",
    template: "%s | Creatives Marketing",
  },
  description:
    "Estratégias de tráfego pago e branding para empresas que não aceitam o comum. Escale seu negócio com campanhas de alta performance no Meta Ads, Google Ads e mais.",
  keywords: [
    "marketing digital",
    "tráfego pago",
    "branding",
    "Meta Ads",
    "Google Ads",
    "gestão de tráfego",
    "agência de marketing",
    "marketing para empresas",
    "creatives marketing",
    "campanhas digitais",
  ],
  authors: [{ name: "Creatives Marketing" }],
  creator: "Creatives Marketing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Creatives Marketing",
    title: "Creatives Marketing | Tráfego Pago & Branding",
    description:
      "Estratégias de tráfego pago e branding para empresas que não aceitam o comum. Escale seu negócio com campanhas de alta performance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creatives Marketing — Tráfego Pago & Branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatives Marketing | Tráfego Pago & Branding",
    description:
      "Estratégias de tráfego pago e branding para empresas que não aceitam o comum.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/creatives-favicon.svg",
  },
  other: {
    "theme-color": "#EC4E02",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${satoshiFont.variable} ${zodiakFont.variable} antialiased`}
      >
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
