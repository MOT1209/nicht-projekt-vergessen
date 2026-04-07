'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  CreditCard,
  BarChart2,
  PieChart,
  Calendar,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Youtube,
  Music,
  Link2,
  Sparkles,
  Download,
  Filter,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const MONTHLY_REVENUE = [
  { month: 'يناير', youtube: 4200, tiktok: 2800, affiliate: 1500 },
  { month: 'فبراير', youtube: 4800, tiktok: 3200, affiliate: 1800 },
  { month: 'مارس', youtube: 5100, tiktok: 2900, affiliate: 2200 },
  { month: 'أبريل', youtube: 5600, tiktok: 3500, affiliate: 2400 },
  { month: 'مايو', youtube: 6200, tiktok: 4100, affiliate: 2800 },
  { month: 'يونيو', youtube: 5800, tiktok: 3800, affiliate: 3100 },
];

const DAILY_REVENUE = [
  { day: 'الأحد', income: 320 },
  { day: 'الاثنين', income: 450 },
  { day: 'الثلاثاء', income: 380 },
  { day: 'الأربعاء', income: 520 },
  { day: 'الخميس', income: 480 },
  { day: 'الجمعة', income: 650 },
  { day: 'السبت', income: 580 },
];

const REVENUE_SOURCES = [
  { name: 'YouTube AdSense', value: 5800, color: '#FF0000' },
  { name: 'TikTok Creator', value: 3800, color: '#00F2EA' },
  { name: 'روابط affiliated', value: 3100, color: '#22C55E' },
];

const PLATFORM_COMPARISON = [
  { platform: 'YouTube', revenue: '5800', growth: '+12%', icon: Youtube, color: 'red' },
  { platform: 'TikTok', revenue: '3800', growth: '+8%', icon: Music, color: 'pink' },
  { platform: 'Affiliates', revenue: '3100', growth: '+15%', icon: Link2, color: 'emerald' },
];

export default function RevenueDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedSource, setSelectedSource] = useState('all');

  const totalRevenue = MONTHLY_REVENUE.reduce((acc, m) => 
    acc + m.youtube + m.tiktok + m.affiliate, 0
  );
  const totalProfit = totalRevenue * 0.72;
  const avgDaily = totalRevenue / 180;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 uppercase tracking-widest">
              Revenue
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            لوحة الأرباح 💰
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            تتبع أرباحك من جميع المنصات والروابط التابعة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-emerald-500/20 text-emerald-400 hover:border-emerald-400/50 text-sm font-medium transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            تحديث
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 transition-all"
          >
            <Download className="h-4 w-4" />
            تصدير تقرير
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card border border-blue-500/15 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">إجمالي الإيرادات</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white">${totalRevenue.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="h-3 w-3 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">+12.5%</span>
            <span className="text-xs text-gray-500">من الشهر الماضي</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card border border-blue-500/15 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">صافي الربح</span>
            <PiggyBank className="h-4 w-4 text-teal-400" />
          </div>
          <p className="text-3xl font-black text-white">${totalProfit.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-gray-500">نسبة الربح</span>
            <span className="text-xs text-teal-400 font-bold">72%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card border border-blue-500/15 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">متوسط يومي</span>
            <Calendar className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-black text-white">${avgDaily.toFixed(0)}</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="h-3 w-3 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">+8.3%</span>
            <span className="text-xs text-gray-500">أفضل من الأسبوع الماضي</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card border border-blue-500/15 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">معدل التحويل</span>
            <TrendingUp className="h-4 w-4 text-violet-400" />
          </div>
          <p className="text-3xl font-black text-white">4.8%</p>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="h-3 w-3 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">+0.6%</span>
            <span className="text-xs text-gray-500">تحسن طفيف</span>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card border border-blue-500/15 p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-semibold text-white">الفلاتر</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1">
            {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedPeriod === period
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800/80'
                )}
              >
                {period === 'daily' ? 'يومي' : period === 'weekly' ? 'أسبوعي' : period === 'monthly' ? 'شهري' : 'سنوي'}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {['all', 'youtube', 'tiktok', 'affiliate'].map((source) => (
              <button
                key={source}
                onClick={() => setSelectedSource(source)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  selectedSource === source
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800/80'
                )}
              >
                {source === 'all' ? 'الكل' : source === 'youtube' ? 'YouTube' : source === 'tiktok' ? 'TikTok' : 'روابط'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card border border-blue-500/15 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-emerald-400" />
              نمو الإيرادات الشهري
            </h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="colorYoutube" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTiktok" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F2EA" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F2EA" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAffiliate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#FFF' }}
                />
                <Area type="monotone" dataKey="youtube" stackId="1" stroke="#FF0000" fill="url(#colorYoutube)" />
                <Area type="monotone" dataKey="tiktok" stackId="1" stroke="#00F2EA" fill="url(#colorTiktok)" />
                <Area type="monotone" dataKey="affiliate" stackId="1" stroke="#22C55E" fill="url(#colorAffiliate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-xs text-gray-400">YouTube</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-cyan-400" />
              <span className="text-xs text-gray-400">TikTok</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-400">Affiliates</span>
            </div>
          </div>
        </motion.div>

        {/* Revenue Sources Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card border border-blue-500/15 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-violet-400" />
              مصادر الدخل
            </h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={REVENUE_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {REVENUE_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#FFF' }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {REVENUE_SOURCES.map((source) => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-xs text-gray-400">{source.name}</span>
                </div>
                <span className="text-xs font-bold text-white">${source.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Daily Revenue Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card border border-blue-500/15 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            الإيرادات اليومية
          </h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DAILY_REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#FFF' }}
              />
              <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Platform Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card border border-blue-500/15 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Wallet className="h-5 w-5 text-amber-400" />
            مقارنة المنصات
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLATFORM_COMPARISON.map((platform, i) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.8 }}
              className="p-5 rounded-xl bg-gray-800/30 border border-gray-700/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl',
                    platform.color === 'red' ? 'bg-red-500/20' :
                    platform.color === 'pink' ? 'bg-pink-500/20' :
                    'bg-emerald-500/20'
                  )}>
                    <platform.icon className={cn(
                      'h-5 w-5',
                      platform.color === 'red' ? 'text-red-400' :
                      platform.color === 'pink' ? 'text-pink-400' :
                      'text-emerald-400'
                    )} />
                  </div>
                  <span className="font-semibold text-white">{platform.platform}</span>
                </div>
                <span className={cn(
                  'text-xs font-bold px-2 py-1 rounded',
                  platform.growth.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                )}>
                  {platform.growth}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">${platform.revenue}</p>
              <p className="text-xs text-gray-500 mt-1">إيرادات هذا الشهر</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card border border-gradient-to-r from-emerald-500/20 to-teal-500/20 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
            <Sparkles className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">تحليل الأرباح الذكي</h3>
            <p className="text-xs text-gray-500">توصيات لتحسين الدخل</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-800/30 border border-emerald-500/20">
            <p className="text-sm text-emerald-400 font-semibold mb-1">🎯 أفضل أداء</p>
            <p className="text-sm text-gray-300">
              روابط affiliate حققت أعلى نمو (+15%) هذا الشهر. أنصح بزيادة الترويج لها.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gray-800/30 border border-cyan-500/20">
            <p className="text-sm text-cyan-400 font-semibold mb-1">📈 فرصة للنمو</p>
            <p className="text-sm text-gray-300">
              TikTok بدأ في النمو، أنصح بزيادة الإنتاج هناك فهي منصة واعدة.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gray-800/30 border border-amber-500/20">
            <p className="text-sm text-amber-400 font-semibold mb-1">⏰ أفضل وقت للنشر</p>
            <p className="text-sm text-gray-300">
              يوم الجمعة يحقق أعلى إيرادات ($650). ركز على المحتوى الجديد هذا اليوم.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gray-800/30 border border-violet-500/20">
            <p className="text-sm text-violet-400 font-semibold mb-1">💡 نصيحة</p>
            <p className="text-sm text-gray-300">
              تنويع المصادر مهم. حاول زيادة دخل affiliates لتحقيق استقرار أكبر.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}