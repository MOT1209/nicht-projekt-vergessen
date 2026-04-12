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

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('CRITICAL: Auth session error:', error);
          router.push('/login');
          return;
        }

        if (!session) {
          console.log('No active session found, redirecting to login...');
          router.push('/login');
        } else {
          // Robustly populate the store and verify user permissions
          const success = await checkSession();
          if (!success) {
            console.error('Failed to sync session with store, retrying...');
            // Optional: add retry logic here
          }
        }
      } catch (error) {
        console.error('Authentication initialization failed:', error);
        router.push('/login');
      }
    };

    initializeAuth();
  }, [router, checkSession]);

  if (!checked.current || (!user && !profile)) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0a0c10] space-y-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500 animate-spin" />
          <div className="absolute inset-4 rounded-full border-b-2 border-l-2 border-violet-500 animate-spin-reverse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-white tracking-widest uppercase italic">Project Memory AI</h2>
          <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Securing Workspace & Syncing Data...</p>
        </div>
      </div>
    );
  }

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

      {/* Left Sidebar - File Explorer & Project History */}
      <LeftSidebar />

      {/* Main Content Area - Center: Code Editor and Analysis Results */}
      <main className="flex-1 overflow-auto relative z-10 border-x border-blue-500/10">
        {children}
      </main>

      {/* Right Sidebar - AI Agent Suite (10 Tools) */}
      <RightSidebar 
        onSignOut={handleSignOut}
        userName={profile?.full_name || user?.email?.split('@')[0] || 'راشد Alking'}
        userEmail={user?.email || 'rashed@alking.com'}
        userAvatar={profile?.avatar_url}
      />
    </div>
  );
}
