'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Search,
  TrendingUp,
  Youtube,
  Sparkles,
  RefreshCw,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  ExternalLink,
  ArrowUpRight,
  Key,
  Lightbulb,
  Target,
  BarChart2,
  Calendar,
  Clock,
} from 'lucide-react';

interface CompetitorVideo {
  id: string;
  title: string;
  views: string;
  likes: string;
  comments: string;
  uploadDate: string;
  thumbnail: string;
  keywords: string[];
}

interface Competitor {
  id: string;
  name: string;
  url: string;
  subscribers: string;
  videos: CompetitorVideo[];
}

const DEMO_COMPETITOR: Competitor = {
  id: '1',
  name: 'AlKing Competitor',
  url: 'https://youtube.com/@competitor',
  subscribers: '2.5M',
  videos: [
    {
      id: '1',
      title: 'كيف حققت مليون دولار في شهر واحد',
      views: '4.2M',
      likes: '245K',
      comments: '12.5K',
      uploadDate: '2024-03-15',
      thumbnail: '💰',
      keywords: ['ريادة أعمال', 'مال', 'نجاح', 'دورة'],
    },
    {
      id: '2',
      title: 'أسرار النجاح في YouTube 2024',
      views: '3.8M',
      likes: '198K',
      comments: '8.9K',
      uploadDate: '2024-02-28',
      thumbnail: '📈',
      keywords: ['يوتيوب', 'محتوى', 'تسويق', 'نمو'],
    },
    {
      id: '3',
      title: 'أدوات الذكاء الاصطناعي التي ستغير عملك',
      views: '2.9M',
      likes: '156K',
      comments: '6.2K',
      uploadDate: '2024-02-10',
      thumbnail: '🤖',
      keywords: ['AI', 'أدوات', 'تكنولوجيا', 'عمل'],
    },
    {
      id: '4',
      title: 'كيف بدأت من الصفر وأصبحت millionaire',
      views: '5.1M',
      likes: '312K',
      comments: '18.7K',
      uploadDate: '2024-01-20',
      thumbnail: '🚀',
      keywords: ['قصة نجاح', ' мотивация', 'ريادة', 'بداية'],
    },
    {
      id: '5',
      title: 'أكبر أخطاء يجب تجنبها في المحتوى',
      views: '1.8M',
      likes: '89K',
      comments: '4.1K',
      uploadDate: '2024-01-05',
      thumbnail: '⚠️',
      keywords: ['أخطاء', 'نصائح', 'محتوى', 'تعلم'],
    },
  ],
};

const AI_INSIGHTS = [
  { title: 'الكلمات المفتاحية الأكثر نجاحاً', content: '"كيف" و"أسرار" و"أدوات" هي أكثر الكلمات تفاعلاً', type: 'keywords' },
  { title: 'الطول المثالي للفيديو', content: 'الفيديوهات بين 12-18 دقيقة تحقق أعلى نسبة مشاهدات', type: 'duration' },
  { title: 'أفضل وقت للنشر', content: 'الجمعة والسبت بين 6-9 مساءً يحققان أعلى تفاعل', type: 'timing' },
  { title: 'نوع المحتوى المفضل', content: 'المحتوى التعليمي + الشخصية يحقق 3 أضعاف المشاهدات', type: 'format' },
];

export default function CompetitorsPage() {
  const [channelUrl, setChannelUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [competitor, setCompetitor] = useState<Competitor | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (!channelUrl.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCompetitor(DEMO_COMPETITOR);
    }, 3000);
  };

  const handleReset = () => {
    setChannelUrl('');
    setCompetitor(null);
    setSelectedVideo(null);
  };

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
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 uppercase tracking-widest">
              Competitor Spy
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            رادار المنافسين 🎯
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            اكتشف أسرار نجاح قنوات المنافسين وحلل أفضل مقاطعهم
          </p>
        </div>

        {competitor && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600 text-sm font-medium transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            تحليل قناة أخرى
          </motion.button>
        )}
      </motion.div>

      {/* Search Section */}
      {!competitor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card border border-blue-500/15 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-orange-400" />
            <h3 className="font-bold text-white">أدخل رابط القناة</h3>
          </div>
          <div className="flex gap-3">
            <input
              type="url"
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
              placeholder="https://youtube.com/@channel-name"
              className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !channelUrl.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  جاري التحليل...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  تحليل
                </>
              )}
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-3">أدخل رابط قناة YouTube للمنافس لتحليل أفضل مقاطعها</p>
        </motion.div>
      )}

      {/* Competitor Data */}
      {competitor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Channel Info */}
          <div className="glass-card border border-blue-500/15 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30">
                  <Youtube className="h-7 w-7 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{competitor.name}</h3>
                  <p className="text-sm text-gray-400">{competitor.subscribers} مشترك</p>
                </div>
              </div>
              <a
                href={competitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                زيارة
              </a>
            </div>
          </div>

          {/* AI Insights */}
          <div className="glass-card border border-gradient-to-r from-orange-500/20 to-amber-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30">
                <Sparkles className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">رؤى الذكاء الاصطناعي</h3>
                <p className="text-xs text-gray-500">تحليل شامل لأفضل أداء</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AI_INSIGHTS.map((insight, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gray-800/30 border border-orange-500/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === 'keywords' && <Key className="h-4 w-4 text-orange-400" />}
                    {insight.type === 'duration' && <Calendar className="h-4 w-4 text-amber-400" />}
                    {insight.type === 'timing' && <Clock className="h-4 w-4 text-yellow-400" />}
                    {insight.type === 'format' && <Target className="h-4 w-4 text-emerald-400" />}
                    <span className="text-sm font-semibold text-white">{insight.title}</span>
                  </div>
                  <p className="text-xs text-gray-400">{insight.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Videos */}
          <div className="glass-card border border-blue-500/15 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-5 w-5 text-blue-400" />
              <h3 className="font-bold text-white">أفضل 5 مقاطع أداءً</h3>
              <span className="text-xs text-gray-500">آخر شهر</span>
            </div>

            <div className="space-y-3">
              {competitor.videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setSelectedVideo(selectedVideo === video.id ? null : video.id)}
                  className={cn(
                    'p-4 rounded-xl border cursor-pointer transition-all',
                    selectedVideo === video.id
                      ? 'bg-orange-500/10 border-orange-500/40'
                      : 'bg-gray-800/30 border-transparent hover:bg-gray-800/50 hover:border-gray-700/50'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800/50 text-2xl shrink-0">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {video.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {video.comments}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-[10px] text-gray-500">#{i + 1}</span>
                    </div>
                  </div>

                  {/* Keywords & Tips */}
                  {selectedVideo === video.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-700/30"
                    >
                      <div className="mb-3">
                        <p className="text-[10px] text-orange-400 mb-2">الكلمات المفتاحية:</p>
                        <div className="flex flex-wrap gap-1">
                          {video.keywords.map((kw, j) => (
                            <span
                              key={j}
                              className="px-2 py-0.5 rounded bg-gray-800/50 text-xs text-gray-400"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                        <p className="text-xs text-emerald-400 flex items-center gap-1">
                          <Lightbulb className="h-3 w-3" />
                          نصيحة: أنشئ فيديو مشابه مع إضافة قيمة أكبر وتحسين العنوان
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card border border-gradient-to-r from-orange-500/20 to-amber-500/20 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <Target className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">خطة العمل للتفوق</h3>
                <p className="text-xs text-gray-500">خطوات عملية لتجاوز المنافس</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                'استخدم عناوين أكثر إثارة مع كلمات "كيف" و"أسرار"',
                'اجعل مدة الفيديو 15-20 دقيقة مع محتوى قوي',
                'أضف CTA قوي في آخر الفيديو',
                'نشر يوم الجمعة أو السبت بين 6-9 مساءً',
                'استخدم صورة مصغرة بألوان زاهية ونص كبير',
              ].map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Analyzing State */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card border border-orange-500/30 p-8 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 mx-auto mb-4">
            <Sparkles className="h-10 w-10 text-orange-400 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">جاري تحليل القناة</h3>
          <p className="text-sm text-gray-400 mb-4">
            فحص أفضل المقاطع واستخراج الكلمات المفتاحية...
          </p>
          <div className="max-w-xs mx-auto h-2 rounded-full bg-gray-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">60%</p>
        </motion.div>
      )}
    </div>
  );
}