'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Scissors,
  Upload,
  Video,
  Play,
  Download,
  Sparkles,
  RefreshCw,
  Film,
  Type,
  Maximize,
  Split,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Eye,
  MessageCircle,
  Share2,
} from 'lucide-react';

interface ClipSuggestion {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  reason: string;
  views: string;
  likes: string;
  thumbnail: string;
}

const DEMO_CLIPS: ClipSuggestion[] = [
  {
    id: '1',
    startTime: 45,
    endTime: 75,
    duration: 30,
    reason: 'لحظة مفاجئة - صرخة الديك',
    thumbnail: '🎬',
    views: '1.2M',
    likes: '89K',
  },
  {
    id: '2',
    startTime: 120,
    endTime: 160,
    duration: 40,
    reason: 'موضوع ترند - قصة طريفة',
    thumbnail: '📖',
    views: '890K',
    likes: '67K',
  },
  {
    id: '3',
    startTime: 200,
    endTime: 230,
    duration: 30,
    reason: 'نهاية مثيرة - CTA قوي',
    thumbnail: '🔥',
    views: '2.1M',
    likes: '156K',
  },
];

const CAPTION_STYLES = [
  { id: 'modern', name: 'عصري', color: '#FF6B6B' },
  { id: 'classic', name: 'كلاسيكي', color: '#4ECDC4' },
  { id: 'bold', name: 'جريء', color: '#FFE66D' },
  { id: 'minimal', name: 'بسيط', color: '#95E1D3' },
];

export default function AutoClipperPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analyzedClips, setAnalyzedClips] = useState<ClipSuggestion[]>([]);
  const [selectedClip, setSelectedClip] = useState<string | null>(null);
  const [captionStyle, setCaptionStyle] = useState('modern');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setAnalyzedClips([]);
      setSelectedClip(null);
    }
  };

  const handleAnalyze = () => {
    if (!videoFile) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzedClips(DEMO_CLIPS);
    }, 3000);
  };

  const handleProcessClip = () => {
    if (!selectedClip) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 4000);
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
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 text-rose-400 uppercase tracking-widest">
              AI Auto Clipper
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            المقص الذكي ✂️
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            ارفع فيديو طويلاً واكتشف أفضل المقاطع القصيرة viral
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-fuchsia-500 text-white text-sm font-bold shadow-lg shadow-rose-500/30 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          تحليل ذكي
        </motion.button>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card border border-blue-500/15 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-rose-400" />
          <h3 className="font-bold text-white">رفع الفيديو</h3>
        </div>

        {!videoFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700/50 rounded-xl p-12 text-center cursor-pointer hover:border-rose-500/50 hover:bg-rose-500/5 transition-all group"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Video className="h-8 w-8 text-rose-400" />
            </div>
            <p className="text-white font-semibold mb-1">اسحب الفيديو هنا أو انقر للاختيار</p>
            <p className="text-xs text-gray-500">MP4, MOV, AVI - حتى 2GB</p>
          </div>
        ) : (
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30">
              <Film className="h-6 w-6 text-rose-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{videoFile.name}</p>
              <p className="text-xs text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <button
              onClick={() => {
                setVideoFile(null);
                setAnalyzedClips([]);
              }}
              className="px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-400 text-sm hover:text-white hover:bg-gray-800/80 transition-all"
            >
              إزالة
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {videoFile && !analyzedClips.length && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                جاري التحليل...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                اكتشاف المقاطع Viral
              </>
            )}
          </motion.button>
        )}
      </motion.div>

      {/* Analysis Results */}
      {analyzedClips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Settings */}
          <div className="glass-card border border-blue-500/15 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-5 w-5 text-blue-400" />
              <h3 className="font-bold text-white">إعدادات المعالجة</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Caption Style */}
              <div>
                <span className="text-xs text-gray-500 mb-2 block">نمط التسميات</span>
                <div className="flex gap-2">
                  {CAPTION_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCaptionStyle(style.id)}
                      className={cn(
                        'flex-1 py-2 rounded-lg text-xs font-medium transition-all',
                        captionStyle === style.id
                          ? 'border-2'
                          : 'bg-gray-800/50 border border-transparent hover:border-gray-700/50'
                      )}
                      style={{
                        backgroundColor: captionStyle === style.id ? `${style.color}20` : undefined,
                        borderColor: captionStyle === style.id ? style.color : undefined,
                        color: captionStyle === style.id ? style.color : undefined,
                      }}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <span className="text-xs text-gray-500 mb-2 block">نسبة العرض</span>
                <div className="flex gap-2">
                  {['9:16', '16:9', '1:1', '4:5'].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={cn(
                        'flex-1 py-2 rounded-lg text-xs font-medium transition-all',
                        aspectRatio === ratio
                          ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                          : 'bg-gray-800/50 border border-transparent hover:border-gray-700/50 text-gray-400 hover:text-white'
                      )}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Clips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analyzedClips.map((clip, i) => (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setSelectedClip(clip.id)}
                className={cn(
                  'glass-card border p-4 cursor-pointer transition-all',
                  selectedClip === clip.id
                    ? 'border-rose-500/50 bg-rose-500/10'
                    : 'border-blue-500/15 hover:border-rose-500/30'
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30">
                    <span className="text-xl">{clip.thumbnail}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">المقطع {i + 1}</p>
                    <p className="text-xs text-gray-600">{clip.duration}s</p>
                  </div>
                  {selectedClip === clip.id && (
                    <CheckCircle2 className="h-5 w-5 text-rose-400 mr-auto" />
                  )}
                </div>

                <p className="text-sm text-white font-medium mb-3">{clip.reason}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {clip.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {clip.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {clip.startTime}s - {clip.endTime}s
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Button */}
          {selectedClip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card border border-gradient-to-r from-rose-500/20 to-pink-500/20 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">معالجة المقطع المحدد</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    إضافة تسميات متحركة + تحويل النسبة
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProcessClip}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-rose-500/30 transition-all"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      <Scissors className="h-4 w-4" />
                      معالجة وإنتاج
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Processing Preview */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card border border-rose-500/30 p-8 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 mx-auto mb-4">
            <Scissors className="h-10 w-10 text-rose-400 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">جاري معالجة الفيديو</h3>
          <p className="text-sm text-gray-400 mb-4">
            إضافة التسميات التوضيحية المتحركة وتحويل النسبة إلى 9:16
          </p>
          <div className="max-w-xs mx-auto h-2 rounded-full bg-gray-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">60%</p>
        </motion.div>
      )}
    </div>
  );
}