import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WorkspaceProvider } from '@/store/workspace-store'
import { TopNav } from '@/components/shared/TopNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alking Dashboard',
  description: 'Elite Developer & Content Studio Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen`}>
        <WorkspaceProvider>
          <TopNav />
          <main className="pt-14">
            {children}
          </main>
        </WorkspaceProvider>
      </body>
    </html>
  )
}
