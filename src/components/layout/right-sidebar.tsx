 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Search,
  Settings,
  Brain,
  Plus,
  LogOut,
  User,
  ChevronDown,
  ChevronUp,
  Zap,
  Bell,
  BarChart2,
  Shield,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mainNavItems = [
  { href: '/', label: 'لوحة التحكم', icon: LayoutDashboard, badge: null },
  { href: '/projects', label: 'المشاريع', icon: FolderKanban, badge: '12' },
  { href: '/chat', label: 'المساعد الذكي', icon: MessageSquare, badge: '3' },
  { href: '/analytics', label: 'التحليلات', icon: BarChart2, badge: null },
  { href: '/search', label: 'البحث الذكي', icon: Search, badge: null },
  { href: '/security', label: 'الأمان', icon: Shield, badge: null },
  { href: '/integrations', label: 'التكاملات', icon: Globe, badge: '2' },
  { href: '/settings', label: 'الإعدادات', icon: Settings, badge: null },
];

const quickItems = [
  { href: '/projects?new=true', label: 'مشروع جديد', icon: Plus },
  { href: '/notifications', label: 'الإشعارات', icon: Bell },
];

interface RightSidebarProps {
  onSignOut?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export function RightSidebar({
  onSignOut,
  userName = 'راشد AlKing',
  userEmail = 'rashed@alking.com',
  userAvatar,
}: RightSidebarProps) {
  const pathname = usePathname();
  const [quickExpanded, setQuickExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full w-full flex-col">
      {/* ─── Logo ─── */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-blue-500/20">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/40"
        >
          <Brain className="h-7 w-7 text-white" />
        </motion.div>
        <div className="flex-1">
          <h1 className="font-extrabold text-lg bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Memory AI
          </h1>
          <p className="text-[10px] text-blue-300/50 font-medium tracking-widest uppercase">
            Omnipotent Master
          </p>
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow shadow-emerald-400/60 animate-pulse" />
      </div>

      {/* ─── New Project CTA ─── */}
      <div className="px-4 pt-4 pb-2">
        <Link
          href="/projects?new=true"
          className="group relative flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 font-semibold text-sm transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Zap className="h-4 w-4" />
          مشروع جديد
        </Link>
      </div>

      {/* ─── Main Navigation ─── */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-bold text-blue-400/60 uppercase tracking-[0.15em]">
          الأقسام الرئيسية
        </p>

        {mainNavItems.map((item, i) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'nav-item group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'active bg-gradient-to-r from-blue-500/20 to-transparent text-white border border-blue-500/30'
                    : 'text-gray-400 hover:text-gray-200'
                )}
              >
                {/* Active glow pulse */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-xl bg-blue-500/10"
                  />
                )}
                <item.icon
                  className={cn(
                    'h-[18px] w-[18px] transition-colors shrink-0',
                    isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                    isActive
                      ? 'bg-blue-500/40 text-blue-200'
                      : 'bg-gray-700/60 text-gray-400'
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}

        {/* Quick Access */}
        <div className="pt-3">
          <button
            onClick={() => setQuickExpanded(!quickExpanded)}
            className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-bold text-blue-400/60 uppercase tracking-[0.15em] hover:text-blue-300 transition-colors"
          >
            <span>الوصول السريع</span>
            {quickExpanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>

          <AnimatePresence>
            {quickExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden space-y-0.5 mt-1"
              >
                {quickItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 transition-all duration-200"
                  >
                    <item.icon className="h-[18px] w-[18px] text-gray-500" />
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ─── System Status ─── */}
      <div className="mx-4 mb-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-medium">حالة النظام</span>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            متصل
          </span>
        </div>
        <div className="space-y-1.5">
          {[
            { label: 'وحدة المعالجة', value: 34 },
            { label: 'الذاكرة', value: 67 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                <span>{m.label}</span>
                <span>{m.value}%</span>
              </div>
              <div className="h-1 rounded-full bg-gray-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── User Profile ─── */}
      <div className="px-4 py-4 border-t border-blue-500/15">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border-2 border-blue-500/40 shadow-lg shadow-blue-500/20">
              {userAvatar ? (
                <img src={userAvatar} alt="Avatar" className="h-full w-full rounded-full object-cover" />
              ) : (
                <User className="h-5 w-5 text-blue-300" />
              )}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#0a0a1a] shadow shadow-emerald-400/50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-800/40 border border-gray-700/40 px-3 py-2.5 text-xs font-semibold text-gray-400 transition-all hover:bg-rose-500/15 hover:text-rose-400 hover:border-rose-500/30"
        >
          <LogOut className="h-3.5 w-3.5" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="hidden lg:flex h-full w-72 flex-col glass-sidebar glowing-border border-l-0 relative z-20"
      >
        <SidebarContent />
      </motion.div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl glass-card border border-blue-500/30 text-blue-400 shadow-lg"
      >
        <Brain className="h-5 w-5" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 z-50 w-72 glass-sidebar shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
