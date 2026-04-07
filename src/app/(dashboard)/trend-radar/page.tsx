'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  Globe,
  Music,
  Video,
  Gamepad2,
  Shirt,
  Coffee,
  Filter,
  RefreshCw,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const NICHE_ICONS: Record<string, any> = {
  'Tech': Video,
  'Gaming': Gamepad2,
  'Lifestyle': Shirt,
  'Food': Coffee,
};

const TRENDING_TOPICS = [
  { id: 1, topic: 'AI Revolution', platform: 'TikTok', growth: 245, country: 'US', niche: 'Tech', hashtag: '#AIRevolution' },
  { id: 2, topic: 'Quiet Luxury', platform: 'YouTube', growth: 189, country: 'UK', niche: 'Lifestyle', hashtag: '#QuietLuxury' },
  { id: 3, topic: 'Gaming Highlights', platform: 'TikTok', growth: 156, country: 'KR', niche: 'Gaming', hashtag: '#GamingHype' },
  { id: 4, topic: 'Street Food Tour', platform: 'YouTube', growth: 134, country: 'JP', niche: 'Food', hashtag: '#StreetFood' },
  { id: 5, topic: 'ASMR Tech Unbox', platform: 'TikTok', growth: 98, country: 'DE', niche: 'Tech', hashtag: '#ASMRTech' },
  { id: 6, topic: 'Cozy Gaming', platform: 'YouTube', growth: 87, country: 'US', niche: 'Gaming', hashtag: '#CozyGaming' },
  { id: 7, topic: 'Minimalist Life', platform: 'TikTok', growth: 76, country: 'BR', niche: 'Lifestyle', hashtag: '#Minimalist' },
  { id: 8, topic: 'Recipe Hack', platform: 'YouTube', growth: 65, country: 'IT', niche: 'Food', hashtag: '#RecipeHack' },
];

const VIRAL_SOUNDS = [
  { id: 1, name: 'EpicCinematic', artist: 'SoundWave', duration: '0:15', uses: '2.3M', trend: 'up' },
  { id: 2, name: 'LoFi Chill', artist: 'BeatMakers', duration: '0:30', uses: '1.8M', trend: 'up' },
  { id: 3, name: 'Trap Beat 808', artist: 'ProducerX', duration: '0:12', uses: '1.2M', trend: 'down' },
  { id: 4, name: 'Nature Ambience', artist: 'AmbientLab', duration: '1:00', uses: '890K', trend: 'up' },
  { id: 5, name: 'Comedy Horn', artist: 'SoundFX', duration: '0:05', uses: '650K', trend: 'up' },
];

const COUNTRIES = ['الكل', 'US', 'UK', 'KR', 'JP', 'DE', 'BR', 'IT'];
const NICHES = ['الكل', 'Tech', 'Gaming', 'Lifestyle', 'Food'];

export default function TrendRadarPage() {
  const [selectedCountry, setSelectedCountry] = useState('الكل');
  const [selectedNiche, setSelectedNiche] = useState('الكل');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const filteredTopics = TRENDING_TOPICS.filter(topic => {
    const countryMatch = selectedCountry === 'الكل' || topic.country === selectedCountry;
    const nicheMatch = selectedNiche === 'الكل' || topic.niche === selectedNiche;
    return countryMatch && nicheMatch;
  });

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
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 uppercase tracking-widest">
              Trend Radar
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
            رادار الترندات 📡
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            اكتشف الترندات قبل صعودها وقف على偏向
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-amber-500/20 text-amber-400 hover:border-amber-400/50 text-sm font-medium transition-all"
          >
            <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
            تحديث البيانات
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-bold shadow-lg shadow-amber-500/30 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            تحليل ذكي
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'ترندات نشطة', value: '156', icon: TrendingUp, color: 'amber' },
          { label: 'صاعدون', value: '89', icon: ArrowUpRight, color: 'emerald' },
          { label: 'هابطون', value: '23', icon: ArrowDownRight, color: 'rose' },
          { label: 'جديد اليوم', value: '12', icon: Sparkles, color: 'blue' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card border border-blue-500/15 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{stat.label}</span>
              <stat.icon className={cn('h-4 w-4', `text-${stat.color}-400`)} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card border border-blue-500/15 p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-semibold text-white">الفلاتر</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 uppercase">الدولة</span>
            <div className="flex gap-1">
              {COUNTRIES.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    selectedCountry === country
                      ? 'bg-blue-500/30 text-blue-300 border border-blue-500/40'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800/80'
                  )}
                >
                  {country === 'الكل' ? 'الكل' : country}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 uppercase">القطاع</span>
            <div className="flex gap-1">
              {NICHES.map((niche) => {
                const Icon = NICHE_ICONS[niche] || Globe;
                return (
                  <button
                    key={niche}
                    onClick={() => setSelectedNiche(niche)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                      selectedNiche === niche
                        ? 'bg-violet-500/30 text-violet-300 border border-violet-500/40'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800/80'
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {niche === 'الكل' ? 'الكل' : niche}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card border border-blue-500/15 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-400" />
              المواضيع الرائجة
            </h3>
            <span className="text-xs text-gray-500">آخر 24 ساعة</span>
          </div>

          <div className="space-y-3">
            {filteredTopics.map((topic, i) => {
              const NicheIcon = NICHE_ICONS[topic.niche] || Globe;
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.4 }}
                  className="group p-4 rounded-xl bg-gray-800/30 border border-transparent hover:border-amber-500/30 hover:bg-gray-800/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                        <NicheIcon className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{topic.topic}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{topic.hashtag}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn(
                            'text-[10px] px-1.5 py-0.5 rounded',
                            topic.platform === 'TikTok' ? 'bg-pink-500/20 text-pink-400' : 'bg-red-500/20 text-red-400'
                          )}>
                            {topic.platform}
                          </span>
                          <span className="text-[10px] text-gray-600">{topic.country}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-emerald-400">+{topic.growth}%</p>
                      <p className="text-[10px] text-gray-500">نمو 24س</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Viral Sounds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card border border-blue-500/15 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Music className="h-5 w-5 text-rose-400" />
              الأصوات الفيروسية
            </h3>
          </div>

          <div className="space-y-3">
            {VIRAL_SOUNDS.map((sound, i) => (
              <motion.div
                key={sound.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.5 }}
                className="group p-3 rounded-xl bg-gray-800/30 border border-transparent hover:border-rose-500/30 hover:bg-gray-800/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30 flex items-center justify-center">
                      <Music className="h-4 w-4 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{sound.name}</p>
                      <p className="text-[10px] text-gray-400">{sound.artist}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">{sound.duration}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{sound.uses} استخدام</span>
                  <div className={cn(
                    'flex items-center gap-1 text-xs',
                    sound.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
                  )}>
                    {sound.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {sound.trend === 'up' ? 'صاعد' : 'هابط'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 text-sm font-medium hover:bg-gray-800/80 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            استكشاف المزيد
          </motion.button>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card border border-gradient-to-r from-amber-500/20 to-orange-500/20 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <Sparkles className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">رؤى الذكاء الاصطناعي</h3>
            <p className="text-xs text-gray-500">تحليل ذكي للفرص المتاحة</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-800/30 border border-amber-500/20">
          <p className="text-sm text-gray-300 leading-relaxed">
            بناءً على تحليل الترندات الحالية، أنصحك بالتركيز على محتوى 
            <span className="text-amber-400 font-semibold"> "AI Revolution" </span> 
            في قطاع التقنية. هذا الترند يحقق نمواً بنسبة 245% وهو في مرحلة الصعود الأولى. 
            أفضل وقت للنشر: <span className="text-emerald-400 font-semibold">6-9 مساءً</span> بتوقيت جرينتش.
          </p>
        </div>
      </motion.div>
    </div>
  );
}