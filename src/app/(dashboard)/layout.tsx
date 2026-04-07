'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { RightSidebar } from '@/components/layout/right-sidebar';
import { LeftSidebar } from '@/components/layout/left-sidebar';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/lib/store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const checked = useRef(false);
  const { checkSession, user, profile, signOut } = useStore();

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

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Right Sidebar - Platform Navigation */}
      <RightSidebar 
        onSignOut={handleSignOut}
        userName={profile?.full_name || user?.email?.split('@')[0] || 'راشد Alking'}
        userEmail={user?.email || 'rashed@alking.com'}
        userAvatar={profile?.avatar_url}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative z-10">
        {children}
      </main>

      {/* Left Sidebar - Linked Accounts */}
      <LeftSidebar />
    </div>
  );
}
