import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Memory AI - Alking Dashboard",
  description: "المنصة الذكية المتكاملة لإدارة المشاريع وتحليل الأكواد والإنتاج الإبداعي المعزز بالذكاء الاصطناعي.",
  keywords: ["إدارة مشاريع", "ذكاء اصطناعي", "برمجة", "تحليل أكواد", "Next.js", "AI Assistant"],
  authors: [{ name: "راشد Alking" }],
  openGraph: {
    title: "Project Memory AI - Alking Dashboard",
    description: "استعد لمستقبل إدارة المشاريع مع أقوى منصة ذكية.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Memory AI - Alking Dashboard",
    description: "منصة ذكية لإدارة المشاريع وتحليل الأكواد.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0c10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
