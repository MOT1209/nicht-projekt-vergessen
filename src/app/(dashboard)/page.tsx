'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { WeeklyActivityChart, ActivityHeatmap } from '@/components/dashboard/ChartPlaceholder';
import { cn } from '@/lib/utils';
import {
  Users,
  Eye,
  Heart,
  FolderKanban,
  TrendingUp,
  Activity,
  Zap,
  Send,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Brain,
  Star,
  Globe,
  Database,
  Sparkles,
  Clock,
  Bell,
  ChevronRight,
  FileText,
  Video,
  Image,
  Music,
  Youtube,
  Instagram,
  Ghost,
} from 'lucide-react';
import Link from 'next/link';
import { socialAccounts, platformConfig } from '@/lib/mock-social-data';
import { SocialStatCard } from '@/components/social/SocialStatCard';
import { AddAccountButton } from '@/components/social/AddAccountButton';

/* ─────────────────────────────── Types ─────────────────────────────── */

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

/* ─────────────────────────────── Stats Data ─────────────────────────────── */

const STATS = [
  {
    title: 'إجمالي المشتركين',
    value: '2.57M',
    subtitle: 'عبر جميع المنصات',
    icon: Users,
    trend: { value: 12.4, direction: 'up' as const },
    accentColor: 'blue' as const,
    delay: 0,
  },
  {
    title: 'إجمالي المشاهدات',
    value: '48.3M',
    subtitle: 'آخر 30 يوم',
    icon: Eye,
    trend: { value: 8.1, direction: 'up' as const },
    accentColor: 'cyan' as const,
    delay: 0.08,
  },
  {
    title: 'معدل التفاعل',
    value: '84%',
    subtitle: 'متوسط عبر المنصات',
    icon: Heart,
    trend: { value: 5.2, direction: 'up' as const },
    accentColor: 'violet' as const,
    delay: 0.16,
  },
  {
    title: 'المشاريع النشطة',
    value: '12',
    subtitle: '4 مشاريع جديدة هذا الشهر',
    icon: FolderKanban,
    trend: { value: 33, direction: 'up' as const },
    accentColor: 'emerald' as const,
    delay: 0.24,
  },
  {
    title: 'المحتوى المنشور',
    value: '847',
    subtitle: 'قطعة محتوى',
    icon: Globe,
    trend: { value: 2.8, direction: 'down' as const },
    accentColor: 'amber' as const,
    delay: 0.32,
  },
  {
    title: 'قوة الذكاء',
    value: '99.8%',
    subtitle: 'دقة التحليل والتوقع',
    icon: Brain,
    trend: { value: 0.6, direction: 'up' as const },
    accentColor: 'rose' as const,
    delay: 0.4,
  },
];

const RECENT_ACTIVITY = [
  { id: '1', icon: '🚀', title: 'تم نشر مشروع جديد', desc: 'مشروع الذكاء الاصطناعي رقم 12', time: 'منذ 5 دقائق', color: 'text-emerald-400' },
  { id: '2', icon: '💬', title: 'رسالة جديدة من المساعد', desc: 'تحليل الأداء الأسبوعي جاهز', time: 'منذ 18 دقيقة', color: 'text-blue-400' },
  { id: '3', icon: '⭐', title: 'هدف تجاوز المليون', desc: 'اقتربنا من الهدف المحدد بنسبة 87%', time: 'منذ ساعة', color: 'text-amber-400' },
  { id: '4', icon: '🔄', title: 'مزامنة Google Drive', desc: 'تمت مزامنة 24 ملف بنجاح', time: 'منذ 2 ساعة', color: 'text-violet-400' },
];

const PLATFORMS = [
  { name: 'TikTok', icon: '🎵', followers: '1.2M', growth: '+15%', color: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-500/30', bar: 85 },
  { name: 'YouTube', icon: '▶️', followers: '680K', growth: '+8%', color: 'from-red-500/20 to-orange-500/10', border: 'border-red-500/30', bar: 62 },
  { name: 'Instagram', icon: '📸', followers: '430K', growth: '+22%', color: 'from-purple-500/20 to-violet-500/10', border: 'border-purple-500/30', bar: 78 },
  { name: 'X (Twitter)', icon: '🐦', followers: '260K', growth: '+5%', color: 'from-sky-500/20 to-blue-500/10', border: 'border-sky-500/30', bar: 45 },
];

const INIT_MESSAGES: ChatMessage[] = [
  { id: '1', role: 'assistant', content: 'مرحباً! أنا مساعدك الذكي المتكامل. كيف يمكنني مساعدتك اليوم؟ 🚀', timestamp: '10:30' },
  { id: '2', role: 'user', content: 'ما هو أداء المحتوى هذا الأسبوع؟', timestamp: '10:32' },
  { id: '3', role: 'assistant', content: 'بناءً على تحليلي، حقق المحتوى هذا الأسبوع 2.3M مشاهدة — بزيادة 18% مقارنة بالأسبوع الماضي. 📈 أنصح بنشر محتوى في الفترة من 6–9 مساءً للحصول على أعلى تفاعل.', timestamp: '10:33' },
];

/* ─────────────────────────────── Component ─────────────────────────────── */

export default function DashboardPage() {
  const { projects, tasks, fetchProjects } = useStore();
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INIT_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleRefresh = async () => {
    setLoading(true);
    await fetchProjects();
    setTimeout(() => setLoading(false), 800);
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: 'شكراً على سؤالك! جاري تحليل البيانات وسأقدم لك توصيات مخصصة بناءً على أدائك الفعلي. 🎯',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 1800);
  };

  const incompleteTasks = tasks.filter(t => t.status !== 'DONE').slice(0, 5);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-8">

      {/* ─── Hero Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 uppercase tracking-widest">
              Omnipotent Master
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              نشط الآن
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
            مرحباً، راشد AlKing 👑
          </h1>
          <p className="text-gray-500 mt-1 text-sm flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-blue-500/20 text-blue-400 hover:border-blue-400/50 text-sm font-medium transition-all"
          >
            <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
            تحديث
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            توليد تقرير ذكي
            <span className="absolute -top-1 -left-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* ─── Stats Grid (6 cards) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STATS.map((stat) => (
          <div key={stat.title} className="xl:col-span-1 lg:col-span-1 sm:col-span-1">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* ─── حساباتي والمواقع ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="space-y-6"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
              <Globe className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">حساباتي والمواقع</h2>
              <p className="text-xs text-gray-500">إدارة ومتابعة جميع حساباتك الاجتماعية</p>
            </div>
          </div>
          <AddAccountButton />
        </div>

        {/* Platform Quick Icons */}
        <div className="flex items-center gap-3">
          {[
            { name: 'TikTok', icon: Music, color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30', text: 'text-pink-400' },
            { name: 'YouTube', icon: Youtube, color: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/30', text: 'text-red-400' },
            { name: 'Instagram', icon: Instagram, color: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-500/30', text: 'text-purple-400' },
            { name: 'Snapchat', icon: Ghost, color: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400' },
          ].map((platform) => (
            <motion.div
              key={platform.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r border cursor-pointer transition-all',
                platform.color, platform.border
              )}
            >
              <platform.icon className={cn('h-4 w-4', platform.text)} />
              <span className="text-sm font-semibold text-white">{platform.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Social Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialAccounts.map((account, i) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <SocialStatCard account={account} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Charts Row ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyActivityChart />
        <ActivityHeatmap />
      </div>

      {/* ─── Main Content: Platforms + Tasks + Chat ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Platform Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card border border-blue-500/20 p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                أداء المنصات
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">آخر 30 يوم</p>
            </div>
            <Link href="/analytics" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              التفاصيل <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {PLATFORMS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className={cn(
                  'group p-3 rounded-xl bg-gradient-to-r border transition-all duration-300 cursor-pointer hover:scale-[1.02]',
                  p.color, p.border
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-white">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.followers} متابع</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-400">{p.growth}</span>
                </div>
                <div className="h-1.5 rounded-full bg-black/20 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.bar}%` }}
                    transition={{ duration: 1, delay: 0.1 * i + 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm shadow-blue-500/40"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tasks Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card border border-violet-500/20 p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-violet-400" />
                المهام النشطة
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{incompleteTasks.length} مهمة متبقية</p>
            </div>
            <Link href="/tasks" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
              عرض الكل <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {incompleteTasks.length > 0 ? incompleteTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i + 0.4 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-transparent hover:border-violet-500/20 hover:bg-gray-800/50 transition-all group"
              >
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                  task.status === 'DONE' ? 'border-emerald-500 bg-emerald-500' :
                  task.status === 'IN_PROGRESS' ? 'border-amber-500' : 'border-gray-600'
                )}>
                  {task.status === 'DONE' && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <p className={cn(
                  'flex-1 text-sm truncate',
                  task.status === 'DONE' ? 'line-through text-gray-600' : 'text-gray-300'
                )}>
                  {task.title}
                </p>
                <span className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-md font-bold shrink-0',
                  task.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-400' :
                  task.priority === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-gray-700 text-gray-500'
                )}>
                  {task.priority === 'HIGH' ? 'عالية' : task.priority === 'MEDIUM' ? 'متوسطة' : 'منخفضة'}
                </span>
              </motion.div>
            )) : (
              <div className="text-center py-10 text-gray-600">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-500/40" />
                <p className="text-sm font-medium text-emerald-500/60">جميع المهام مكتملة! 🎉</p>
              </div>
            )}
          </div>

          {/* Recent Activity Feed */}
          <div className="pt-4 border-t border-white/5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Activity className="h-3 w-3" />
              النشاط الأخير
            </p>
            <div className="space-y-2">
              {RECENT_ACTIVITY.slice(0, 2).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="text-sm mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-300 truncate">{item.title}</p>
                    <p className="text-[10px] text-gray-600">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card border border-cyan-500/20 p-6 flex flex-col h-[480px]"
        >
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-cyan-400" />
                المساعد الذكي
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                نشط · GPT-4 Turbo
              </p>
            </div>
            <Link href="/chat" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
              توسيع <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
            <AnimatePresence initial={false}>
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={cn('flex', msg.role === 'user' ? 'justify-start' : 'justify-end')}
                >
                  <div className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-500/25 to-cyan-500/15 border border-blue-500/30 text-white rounded-tr-sm'
                      : 'bg-gray-800/70 border border-gray-700/50 text-gray-200 rounded-tl-sm'
                  )}>
                    {msg.content}
                    <p className="text-[10px] text-gray-600 mt-1">{msg.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex justify-end"
                >
                  <div className="bg-gray-800/70 border border-gray-700/50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay }}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 shrink-0">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="اسأل الذكاء الاصطناعي..."
              className="flex-1 bg-gray-800/50 border border-gray-700/40 hover:border-blue-500/30 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleSend}
              disabled={!chatInput.trim()}
              className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-blue-500/30 transition-all"
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ─── Projects Quick View ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-card border border-blue-500/15 p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-blue-400" />
              المشاريع الحالية
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">إدارة ومتابعة جميع المشاريع النشطة</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
            >
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
            </motion.button>
            <Link href="/projects" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors font-medium">
              عرض الكل <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.slice(0, 4).map((project: any, i: number) => {
            const statusColors: Record<string, string> = {
              active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
              completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
              pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
            };
            const progress = Math.floor(Math.random() * 60 + 30);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.6 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group p-4 rounded-xl bg-gray-800/30 border border-transparent hover:border-blue-500/25 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20">
                    <FolderKanban className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className={cn(
                    'text-[10px] px-2 py-0.5 rounded-full border font-semibold',
                    statusColors[project.status?.toLowerCase() || 'active']
                  )}>
                    {project.status === 'completed' ? 'مكتمل' : project.status === 'pending' ? 'انتظار' : 'نشط'}
                  </span>
                </div>

                <h4 className="font-semibold text-white text-sm mb-1 truncate">{project.name}</h4>
                <p className="text-[10px] text-gray-500 mb-3 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {project.last_activity
                    ? new Date(project.last_activity).toLocaleDateString('ar-EG')
                    : 'غير محدد'}
                </p>

                <div>
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>التقدم</span>
                    <span className="text-blue-400 font-semibold">{progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-700/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.08 * i + 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5">
                  {[FileText, Image, Video].map((Icon, j) => (
                    <div key={j} className="h-5 w-5 rounded bg-gray-700/50 flex items-center justify-center">
                      <Icon className="h-2.5 w-2.5 text-gray-500" />
                    </div>
                  ))}
                  <span className="text-[10px] text-gray-600 mr-1">3 ملفات</span>
                </div>
              </motion.div>
            );
          })}

          {projects.length === 0 && (
            <div className="col-span-4 text-center py-12 text-gray-600">
              <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">لا توجد مشاريع بعد</p>
              <Link href="/projects?new=true" className="text-xs text-blue-400 mt-1 inline-flex items-center gap-1 hover:text-blue-300">
                <span>إنشاء مشروعك الأول</span> <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
}
