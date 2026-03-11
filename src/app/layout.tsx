import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/modules/AppShell";
import { AIChatWidget } from "@/components/modules/AIChatWidget";
import { ChatInterface } from "@/components/modules/ChatInterface";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastContext";
import { FirebaseAnalytics } from "@/components/providers/FirebaseAnalytics";
import { FCMHandler } from "@/components/providers/FCMHandler";
import { NoiseOverlay } from "@/components/modules/NoiseOverlay";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebasNeue = Bebas_Neue({ 
  weight: "400", 
  variable: "--font-display",
  display: "swap" 
});
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  display: "swap"
});
const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-body",
  display: "swap"
});
const mono = Inter({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Rose Pearl Entertainment",
    template: "%s | Rose Pearl Entertainment",
  },
  description: "Global entertainment company specializing in artist management, distribution, and premium audio experiences.",
  openGraph: {
    title: "Rose Pearl Entertainment",
    description: "Global entertainment company specializing in artist management, distribution, and premium audio experiences.",
    url: "https://rosepearl.ent",
    siteName: "Rose Pearl Entertainment",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rose Pearl Entertainment",
    description: "Premium Audio Experience",
    creator: "@rosepearlent",
  },
  metadataBase: new URL("https://rosepearl.ent"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${playfair.variable} ${syne.variable} ${mono.variable} antialiased min-h-screen bg-black text-white`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <NoiseOverlay />
            <AppShell>{children}</AppShell>
            <AIChatWidget />
            <ChatInterface />
            {/* Firebase Integration */}
            <Suspense fallback={null}>
              <FirebaseAnalytics />
            </Suspense>
            <FCMHandler />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
