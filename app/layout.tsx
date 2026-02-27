import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const satoshiFont = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi-sans",
});

const zodiakFont = localFont({
  src: "./fonts/Zodiak-Variable.woff2",
  variable: "--font-zodiak-serif",
});

export const metadata: Metadata = {
  title: "Creatives Marketing",
  description: "Creatives Marketing - description",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
