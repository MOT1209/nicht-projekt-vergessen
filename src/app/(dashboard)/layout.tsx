'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { supabase } from '@/lib/supabase';

import { useStore } from '@/lib/store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const checked = useRef(false);
  const { checkSession, user } = useStore();

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        // Populate the store with user and profile data
        checkSession();
      }
    });
  }, [router, checkSession]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto border-r border-border dark:border-gray-800">
        {children}
      </main>
    </div>
  );
}
