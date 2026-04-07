'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Upload,
  Video,
  Languages,
  Globe,
  Play,
  Pause,
  Download,
  Sparkles,
  RefreshCw,
  Volume2,
  Waves,
  Settings,
  CheckCircle2,
  FileAudio,
  FileVideo,
} from 'lucide-react';

interface DubbingOption {
  id: string;
  language: string;
  flag: string;
  voiceType: string;
}

const DUBBING_OPTIONS: DubbingOption[] = [
  { id: 'en-us', language: 'الإنجليزية الأمريكية', flag: '🇺🇸', voiceType: 'Male/Female' },
  { id: 'en-uk', language: 'الإنجليزية البريطانية', flag: '🇬🇧', voiceType: 'Male/Female' },
  { id: 'es', language: 'الإسبانية', flag: '🇪🇸', voiceType: 'Male/Female' },
  { id: 'fr', language: 'الفرنسية', flag: '🇫🇷', voiceType: 'Male/Female' },
  { id: 'de', language: 'الألمانية', flag: '🇩🇪', voiceType: 'Male/Female' },
  { id: 'it', language: 'الإيطالية', flag: '🇮🇹', voiceType: 'Male/Female' },
  { id: 'pt', language: 'البرتغالية', flag: '🇧🇷', voiceType: 'Male/Female' },
  { id: 'ja', language: 'اليابانية', flag: '🇯🇵', voiceType: 'Female' },
  { id: 'ko', language: 'الكورية', flag: '🇰🇷', voiceType: 'Female' },
  { id: 'zh', language: 'الصينية', flag: '🇨🇳', voiceType: 'Female' },
];

const PROCESS_STEPS = [
  { id: 1, name: 'استخراج الصوت', status: 'completed' },
  { id: 2, name: 'نسخ النص', status: 'completed' },
  { id: 3, name: 'ترجمة النص', status: 'in_progress' },
  { id: 4, name: 'توليد الصوت', status: 'pending' },
  { id: 5, name: 'مزامنة الفيديو', status: 'pending' },
];

export default function GlobalDubberPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en-us');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [dubbedVideo, setDubbedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceCloning, setVoiceCloning] = useState(true);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const currentLanguage = DUBBING_OPTIONS.find(l => l.id === selectedLanguage);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setDubbedVideo(null);
    }
  };

  const handleStartDubbing = () => {
    if (!videoFile) return;
    setIsProcessing(true);
    setProcessingStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProcessingStep(step);
      if (step >= 5) {
        clearInterval(interval);
        setIsProcessing(false);
        setDubbedVideo('dubbed-video-url');
      }
    }, 1500);
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
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-teal-400 uppercase tracking-widest">
              Global Dubber
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            المترجم العالمي 🌍
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            ترجم فيديوهاتك للعالمية مع الحفاظ على صوتك الأصلي
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all',
              voiceCloning
                ? 'bg-teal-500/20 border-teal-500/40 text-teal-400'
                : 'bg-gray-800/50 border-gray-700/50 text-gray-400'
            )}
            onClick={() => setVoiceCloning(!voiceCloning)}
          >
            {voiceCloning ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <div className="h-4 w-4 rounded-full border-2 border-gray-500" />
            )}
            <span className="text-sm font-medium">استنساخ صوتي</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upload & Settings */}
        <div className="space-y-6">
          {/* Video Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card border border-blue-500/15 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileVideo className="h-5 w-5 text-teal-400" />
              <h3 className="font-bold text-white">رفع الفيديو</h3>
            </div>

            {!videoFile ? (
              <div
                onClick={() => videoInputRef.current?.click()}
                className="border-2 border-dashed border-gray-700/50 rounded-xl p-12 text-center cursor-pointer hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Video className="h-8 w-8 text-teal-400" />
                </div>
                <p className="text-white font-semibold mb-1">انقر لرفع فيديو عربي</p>
                <p className="text-xs text-gray-500">MP4, MOV - حتى 500MB</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30">
                  <FileVideo className="h-6 w-6 text-teal-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{videoFile.name}</p>
                  <p className="text-xs text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={() => setVideoFile(null)}
                  className="px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-400 text-sm hover:text-white hover:bg-gray-800/80 transition-all"
                >
                  إزالة
                </button>
              </div>
            )}
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              className="hidden"
            />
          </motion.div>

          {/* Language Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card border border-blue-500/15 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Languages className="h-5 w-5 text-cyan-400" />
              <h3 className="font-bold text-white">اختر اللغة الهدف</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {DUBBING_OPTIONS.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={cn(
                    'p-3 rounded-xl border text-right transition-all',
                    selectedLanguage === lang.id
                      ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 border-teal-500/40'
                      : 'bg-gray-800/30 border-transparent hover:bg-gray-800/50 hover:border-gray-700/50'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{lang.flag}</span>
                    <span className={cn(
                      'text-sm font-semibold',
                      selectedLanguage === lang.id ? 'text-white' : 'text-gray-300'
                    )}>
                      {lang.language}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">{lang.voiceType}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Start Button */}
          {videoFile && !isProcessing && !dubbedVideo && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartDubbing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-teal-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              بدء المدبلجة
            </motion.button>
          )}
        </div>

        {/* Right: Preview & Processing */}
        <div className="space-y-6">
          {/* Processing State */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card border border-teal-500/30 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="h-5 w-5 text-teal-400 animate-spin" />
                <h3 className="font-bold text-white">جاري المعالجة</h3>
              </div>

              <div className="space-y-3">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl',
                      processingStep >= step.id
                        ? 'bg-teal-500/10'
                        : 'bg-gray-800/30'
                    )}
                  >
                    <div className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                      processingStep >= step.id
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-700 text-gray-500'
                    )}>
                      {processingStep >= step.id ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className={cn(
                      'text-sm',
                      processingStep >= step.id ? 'text-white' : 'text-gray-500'
                    )}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(processingStep / 5) * 100}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {Math.round((processingStep / 5) * 100)}%
                </p>
              </div>
            </motion.div>
          )}

          {/* Dubbed Video Preview */}
          {dubbedVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card border border-gradient-to-r from-teal-500/20 to-cyan-500/20 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-bold text-white">النتيجة النهائية</h3>
                </div>
                <span className="text-xs text-emerald-400 font-medium">تم بنجاح</span>
              </div>

              <div className="relative aspect-video bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden mb-4">
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 mx-auto mb-3">
                    <FileVideo className="h-8 w-8 text-teal-400" />
                  </div>
                  <p className="text-white font-semibold">فيديو مدبلج</p>
                  <p className="text-xs text-gray-500">{currentLanguage?.language}</p>
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-gray-800/30">
                  <p className="text-[10px] text-gray-500 mb-1">اللغة الأصلية</p>
                  <p className="text-sm font-semibold text-white">العربية 🇸🇦</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-800/30">
                  <p className="text-[10px] text-gray-500 mb-1">اللغة المدبلجة</p>
                  <p className="text-sm font-semibold text-white">{currentLanguage?.flag} {currentLanguage?.language}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                تحميل الفيديو المدبلج
              </motion.button>
            </motion.div>
          )}

          {/* Empty State */}
          {!isProcessing && !dubbedVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card border border-blue-500/15 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-blue-400" />
                <h3 className="font-bold text-white">معاينة</h3>
              </div>
              <div className="aspect-video bg-gray-900/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800/50 mx-auto mb-4">
                    <Video className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-sm">سيظهر الفيديو المدبلج هنا</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Features Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { icon: Volume2, title: 'استنساخ الصوت', desc: 'احتفظ بصوتك الأصلي في جميع اللغات', color: 'teal' },
          { icon: Waves, title: 'مزامنة دقيقة', desc: 'تزامن الصوت مع حركة الشفاه', color: 'cyan' },
          { icon: Languages, title: '10+ لغات', desc: 'دعم واسع للغات العالمية', color: 'blue' },
        ].map((feature, i) => (
          <div key={i} className="glass-card border border-blue-500/15 p-4">
            <feature.icon className={cn('h-6 w-6 mb-2', `text-${feature.color}-400`)} />
            <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
            <p className="text-xs text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}