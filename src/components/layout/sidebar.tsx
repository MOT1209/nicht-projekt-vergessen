'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Search, 
  Settings,
  Brain,
  Plus,
  LogOut,
  User,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/projects', label: 'المشاريع', icon: FolderKanban },
  { href: '/chat', label: 'المساعد الذكي', icon: MessageSquare },
  { href: '/search', label: 'البحث', icon: Search },
  { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useStore();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-500">
          <Brain className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg">Memory AI</h1>
          <p className="text-xs text-gray-400">مساعدك الذكي</p>
        </div>
      </div>

      {/* New Project Button */}
      <div className="px-4 py-4">
        <Link
          href="/projects?new=true"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 font-medium transition-all"
        >
          <Plus className="h-4 w-4" />
          مشروع جديد
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-gray-800 text-white" 
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 border border-gray-700">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="User Avatar" className="h-full w-full rounded-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {profile?.full_name || user?.email?.split('@')[0] || 'المستخدم'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
