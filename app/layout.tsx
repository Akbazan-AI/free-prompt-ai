import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prompt AI - Kho Prompts AI Miễn Phí",
    template: "%s | Prompt AI",
  },
  description: "Khám phá 75+ prompts AI chất lượng cao cho hình ảnh, văn phòng và nhiều hơn nữa. Hoàn toàn miễn phí, dễ sử dụng.",
  keywords: ["prompt ai", "ai prompts", "midjourney prompts", "dall-e prompts", "chatgpt prompts", "prompts miễn phí", "image generation", "ai tools"],
  authors: [{ name: "ADM" }],
  creator: "ADM",
  metadataBase: new URL('https://prompt-ai.vercel.app'),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://prompt-ai.vercel.app",
    title: "Prompt AI - Kho Prompts AI Miễn Phí",
    description: "Khám phá 75+ prompts AI chất lượng cao cho hình ảnh, văn phòng và nhiều hơn nữa",
    siteName: "Prompt AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt AI - Kho Prompts AI Miễn Phí",
    description: "Khám phá 75+ prompts AI chất lượng cao",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
