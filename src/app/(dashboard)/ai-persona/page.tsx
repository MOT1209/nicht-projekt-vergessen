'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  User,
  Upload,
  Play,
  Pause,
  Download,
  Sparkles,
  RefreshCw,
  Video,
  Image,
  AudioWaveform,
  Settings,
  Wand2,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface PersonaStyle {
  id: string;
  name: string;
  preview: string;
}

const PERSONA_STYLES: PersonaStyle[] = [
  { id: 'realistic', name: 'واقعي', preview: '🎭' },
  { id: 'animated', name: 'كرتوني', preview: '🎨' },
  { id: '3d', name: 'ثلاثي الأبعاد', preview: '🎮' },
  { id: 'avatar', name: 'أفاتار', preview: '🤖' },
];

const VOICE_SAMPLES = [
  { id: '1', name: 'تسجيل صوتي 1', duration: '0:30' },
  { id: '2', name: 'تسجيل صوتي 2', duration: '0:45' },
  { id: '3', name: 'تسجيل صوتي 3', duration: '1:00' },
];

export default function AIPersonaPage() {
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setAvatarImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const handleGenerate = () => {
    if (!avatarImage || !audioFile) return;
    setIsGenerating(true);
    setGeneratedVideo(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedVideo('demo-video-url');
    }, 5000);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
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
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 text-indigo-400 uppercase tracking-widest">
              AI Persona
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
            الشخصية الرقمية 🎭
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            أنشئ نسخة رقمية من نفسك تتحدث بناءً على صوتك
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all"
        >
          <Wand2 className="h-4 w-4" />
          إنشاء تلقائي
        </motion.button>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-6">
          {/* Avatar Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card border border-blue-500/15 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Image className="h-5 w-5 text-indigo-400" />
              <h3 className="font-bold text-white">صورة الأفاتار</h3>
            </div>

            {!avatarImage ? (
              <div
                onClick={() => avatarInputRef.current?.click()}
                className="border-2 border-dashed border-gray-700/50 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <User className="h-8 w-8 text-indigo-400" />
                </div>
                <p className="text-white font-semibold mb-1">انقر لرفع صورة</p>
                <p className="text-xs text-gray-500">JPG, PNG - حتى 10MB</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={avatarImage}
                  alt="Avatar"
                  className="w-full aspect-video object-cover rounded-xl"
                />
                <button
                  onClick={() => setAvatarImage(null)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-gray-900/80 text-white hover:bg-gray-900 transition-all"
                >
                  ✕
                </button>
              </div>
            )}
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              className="hidden"
            />
          </motion.div>

          {/* Audio Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card border border-blue-500/15 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AudioWaveform className="h-5 w-5 text-violet-400" />
              <h3 className="font-bold text-white">تسجيل الصوت</h3>
            </div>

            {!audioFile ? (
              <div
                onClick={() => audioInputRef.current?.click()}
                className="border-2 border-dashed border-gray-700/50 rounded-xl p-8 text-center cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <AudioWaveform className="h-6 w-6 text-violet-400" />
                </div>
                <p className="text-white font-semibold mb-1">ارفع ملف صوتي</p>
                <p className="text-xs text-gray-500">MP3, WAV - من 10s إلى 60s</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30">
                  <AudioWaveform className="h-5 w-5 text-violet-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{audioFile.name}</p>
                  <p className="text-xs text-gray-500">{(audioFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={() => setAudioFile(null)}
                  className="px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-400 text-sm hover:text-white hover:bg-gray-800/80 transition-all"
                >
                  إزالة
                </button>
              </div>
            )}
            <input
              ref={audioInputRef}
              type="file"
              accept="audio/*"
              onChange={handleAudioSelect}
              className="hidden"
            />
          </motion.div>

          {/* Style Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card border border-blue-500/15 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-fuchsia-400" />
              <h3 className="font-bold text-white">نمط الشخصية</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PERSONA_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={cn(
                    'p-3 rounded-xl border text-center transition-all',
                    selectedStyle === style.id
                      ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/10 border-indigo-500/40'
                      : 'bg-gray-800/30 border-transparent hover:bg-gray-800/50 hover:border-gray-700/50'
                  )}
                >
                  <span className="text-2xl mb-1 block">{style.preview}</span>
                  <span className={cn(
                    'text-xs font-medium',
                    selectedStyle === style.id ? 'text-white' : 'text-gray-400'
                  )}>
                    {style.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={!avatarImage || !audioFile || isGenerating}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                جاري إنشاء الفيديو...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                إنشاء شخصية رقمية
              </>
            )}
          </motion.button>
        </div>

        {/* Right: Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card border border-blue-500/15 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Video className="h-5 w-5 text-emerald-400" />
            <h3 className="font-bold text-white">معاينة الفيديو</h3>
          </div>

          {!generatedVideo ? (
            <div className="aspect-[9/16] bg-gray-900/50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800/50 mx-auto mb-4">
                  <Video className="h-8 w-8 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm">سيظهر الفيديو هنا بعد الإنشاء</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="aspect-[9/16] bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 mx-auto mb-4">
                    {avatarImage && (
                      <img
                        src={avatarImage}
                        alt="Persona"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <p className="text-white font-semibold">شخصيتك الرقمية</p>
                  <p className="text-xs text-gray-500 mt-1">{audioFile?.name}</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlay}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </motion.button>
              </div>

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/30 transition-all"
              >
                <Download className="h-4 w-4" />
                تحميل
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Processing State */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card border border-indigo-500/30 p-8 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 mx-auto mb-4">
            <Wand2 className="h-10 w-10 text-indigo-400 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">جاري إنشاء شخصيتك الرقمية</h3>
          <p className="text-sm text-gray-400 mb-4">
            قم بمزامنة حركة الشفاه مع الصوت...
          </p>
          <div className="max-w-xs mx-auto h-2 rounded-full bg-gray-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 4, ease: 'easeInOut' }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">70%</p>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card border border-blue-500/15 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <Sparkles className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">نصائح للحصول على أفضل نتيجة</h3>
            <p className="text-xs text-gray-500">كيف تجعل شخصيتك الرقمية أفضل</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📷', tip: 'استخدم صورة عالية الجودة بإضاءة جيدة', color: 'blue' },
            { icon: '🎤', tip: 'تسجيل صوتي واضح بدون ضوضاء خلفية', color: 'violet' },
            { icon: '🗣️', tip: 'تحدث بوضوح وبسرعة طبيعية', color: 'emerald' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30"
            >
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <p className="text-sm text-gray-300">{item.tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}