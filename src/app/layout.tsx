import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Memory AI - مساعدك الذكي للمشاريع",
  description: "تطبيق يساعد المبرمجين على تذكر أين توقفوا في مشاريعهم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
