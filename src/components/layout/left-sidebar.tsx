'use client';

import {
  Plus,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Settings,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkedAccount {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'error' | 'pending';
  lastSync?: string;
  color?: string;
  members?: number;
}

const defaultAccounts: LinkedAccount[] = [
  { id: '1', name: 'Google Drive', icon: '📁', status: 'connected', lastSync: 'منذ 5 دقائق', color: '#4285f4', members: 8 },
  { id: '2', name: 'GitHub', icon: '💻', status: 'connected', lastSync: 'منذ ساعة', color: '#333', members: 14 },
  { id: '3', name: 'Notion', icon: '📝', status: 'error', lastSync: 'منذ يوم', color: '#000', members: 5 },
  { id: '4', name: 'Slack', icon: '💬', status: 'connected', lastSync: 'منذ 10 دقائق', color: '#4a154b', members: 22 },
  { id: '5', name: 'Trello', icon: '📋', status: 'pending', lastSync: undefined, color: '#0052cc', members: 3 },
  { id: '6', name: 'Figma', icon: '🎨', status: 'connected', lastSync: 'منذ 2 دقائق', color: '#f24e1e', members: 6 },
];

interface LeftSidebarProps {
  accounts?: LinkedAccount[];
  onAddAccount?: () => void;
  onSyncAccount?: (id: string) => void;
  onSettings?: () => void;
}

export function LeftSidebar({
  accounts = defaultAccounts,
  onAddAccount,
  onSyncAccount,
  onSettings,
}: LeftSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeAccountId, setActiveAccountId] = useState<string>('1');
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const connected = accounts.filter(a => a.status === 'connected').length;

  const handleSync = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSyncingId(id);
    setTimeout(() => setSyncingId(null), 2000);
    onSyncAccount?.(id);
  };

  const statusConfig = {
    connected: {
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-500/30',
      label: 'نشط',
    },
    error: {
      icon: AlertCircle,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
      border: 'border-rose-500/30',
      label: 'خطأ',
    },
    pending: {
      icon: RefreshCw,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-500/30',
      label: 'انتظار',
    },
  };

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="hidden lg:flex h-full w-64 flex-col glass-sidebar border-r border-blue-500/15 relative z-20"
    >
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-blue-500/15">
        <div>
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            الحسابات المرتبطة
          </h2>
          <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            {connected} نشط · {accounts.length - connected} متوقف
          </p>
        </div>
        <motion.button
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
          onClick={onSettings}
          className="p-2 rounded-lg hover:bg-blue-500/10 transition-colors text-gray-500 hover:text-blue-400"
        >
          <Settings className="h-4 w-4" />
        </motion.button>
      </div>

      {/* ─── Connection Status Banner ─── */}
      <div className="mx-3 my-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 px-3 py-2.5 flex items-center gap-2">
        <Wifi className="h-4 w-4 text-emerald-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-emerald-300">جميع الأنظمة تعمل</p>
          <p className="text-[10px] text-emerald-500/70 truncate">آخر فحص: منذ دقيقة واحدة</p>
        </div>
      </div>

      {/* ─── Add Account ─── */}
      <div className="px-3 pb-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddAccount}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-dashed border-blue-500/30 text-sm text-blue-400/70 hover:text-blue-300 hover:border-blue-400/60 hover:bg-blue-500/5 transition-all"
        >
          <Plus className="h-4 w-4" />
          ربط حساب جديد
        </motion.button>
      </div>

      {/* ─── Accounts List ─── */}
      <div className="flex-1 overflow-y-auto px-3 pb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-bold text-blue-400/60 uppercase tracking-[0.15em] hover:text-blue-300 transition-colors mb-2"
        >
          <span>الخدمات المتصلة</span>
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-1.5 overflow-hidden"
            >
              {accounts.map((account, i) => {
                const cfg = statusConfig[account.status];
                const StatusIcon = cfg.icon;
                const isActive = activeAccountId === account.id;
                const isSyncing = syncingId === account.id;

                return (
                  <motion.div
                    key={account.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setActiveAccountId(account.id)}
                    className={cn(
                      'group relative flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/15 to-transparent border-blue-500/40 shadow-md shadow-blue-500/10'
                        : 'bg-gray-800/20 border-transparent hover:bg-gray-800/40 hover:border-blue-500/20'
                    )}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="active-account"
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-l-full bg-gradient-to-b from-blue-400 to-cyan-400"
                      />
                    )}

                    {/* Icon */}
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg shadow-sm"
                      style={{ backgroundColor: `${account.color}20`, border: `1px solid ${account.color}30` }}
                    >
                      {account.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className={cn(
                          'text-sm font-semibold truncate',
                          isActive ? 'text-white' : 'text-gray-300'
                        )}>
                          {account.name}
                        </p>
                        <span className={cn(
                          'shrink-0 flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md border',
                          cfg.color, cfg.bg, cfg.border
                        )}>
                          <StatusIcon className={cn('h-2.5 w-2.5', account.status === 'pending' && 'animate-spin')} />
                          {cfg.label}
                        </span>
                      </div>

                      {account.lastSync ? (
                        <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          {account.lastSync}
                          {account.members && (
                            <span className="mr-1 text-gray-600">· {account.members} عضو</span>
                          )}
                        </p>
                      ) : (
                        <p className="text-[10px] text-amber-500/70 mt-0.5">في الانتظار...</p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => handleSync(e, account.id)}
                        className="p-1 rounded-lg hover:bg-blue-500/20 text-gray-500 hover:text-blue-400 transition-colors"
                        title="مزامنة"
                      >
                        <RefreshCw className={cn('h-3.5 w-3.5', isSyncing && 'animate-spin text-blue-400')} />
                      </motion.button>
                      <button
                        onClick={e => e.stopPropagation()}
                        className="p-1 rounded-lg hover:bg-blue-500/20 text-gray-500 hover:text-blue-400 transition-colors"
                        title="فتح"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Footer Stats ─── */}
      <div className="px-4 py-4 border-t border-blue-500/15 space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500 flex items-center gap-1">
              <Wifi className="h-3 w-3" /> إجمالي التخزين
            </span>
            <span className="text-blue-400 font-semibold">15.2 / 50 GB</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '30.4%' }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm shadow-blue-500/50"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            <WifiOff className="h-3 w-3" /> غير متصل
          </span>
          <div className="flex items-center gap-1">
            {accounts.map(a => (
              <div
                key={a.id}
                title={a.name}
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  a.status === 'connected' ? 'bg-emerald-400' :
                  a.status === 'error' ? 'bg-rose-400' : 'bg-amber-400'
                )}
              />
            ))}
          </div>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <Wifi className="h-3 w-3" /> متصل
          </span>
        </div>
      </div>

      {/* ─── حساباتي والمواقع ─── */}
      <div className="px-4 py-4 border-t border-blue-500/15">
        <p className="text-[10px] font-bold text-blue-400/60 uppercase tracking-[0.15em] mb-3">حساباتي والمواقع</p>
        <div className="grid grid-cols-4 gap-2">
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-800/30 hover:bg-pink-500/10 border border-transparent hover:border-pink-500/30 transition-all group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 group-hover:border-pink-400/50 transition-all">
              <Music className="h-4 w-4 text-pink-400" />
            </div>
            <span className="text-[8px] text-gray-500 group-hover:text-pink-400 transition-colors">TikTok</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-800/30 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 group-hover:border-red-400/50 transition-all">
              <Youtube className="h-4 w-4 text-red-400" />
            </div>
            <span className="text-[8px] text-gray-500 group-hover:text-red-400 transition-colors">YouTube</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-800/30 hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30 transition-all group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 group-hover:border-purple-400/50 transition-all">
              <Instagram className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-[8px] text-gray-500 group-hover:text-purple-400 transition-colors">Instagram</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-800/30 hover:bg-yellow-500/10 border border-transparent hover:border-yellow-500/30 transition-all group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all">
              <Ghost className="h-4 w-4 text-yellow-400" />
            </div>
            <span className="text-[8px] text-gray-500 group-hover:text-yellow-400 transition-colors">Snapchat</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
