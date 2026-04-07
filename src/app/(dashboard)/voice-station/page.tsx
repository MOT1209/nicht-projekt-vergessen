'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Mic,
  Volume2,
  Download,
  Play,
  Pause,
  Languages,
  User,
  User2,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  AudioWaveform,
} from 'lucide-react';

interface VoiceOption {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
  preview?: string;
}

const VOICE_OPTIONS: VoiceOption[] = [
  { id: 'ar-male-1', name: 'أحمد - 标准阿拉伯语', gender: 'male', accent: 'السعودية', preview: 'مرحباً بك' },
  { id: 'ar-female-1', name: 'فاطمة - 标准阿拉伯语', gender: 'female', accent: 'مصر', preview: 'أهلاً وسهلاً' },
  { id: 'ar-male-2', name: 'محمد - 埃及阿拉伯语', gender: 'male', accent: 'مصر', preview: 'ازيك يا handsome' },
  { id: 'ar-female-2', name: 'نورة - 海湾阿拉伯语', gender: 'female', accent: 'الخليج', preview: 'ما شاء الله' },
  { id: 'en-male-1', name: 'John - US English', gender: 'male', accent: 'USA', preview: 'Hello there!' },
  { id: 'en-female-1', name: 'Emma - UK English', gender: 'female', accent: 'UK', preview: 'Welcome!' },
  { id: 'es-male-1', name: 'Carlos - Spanish', gender: 'male', accent: 'Spain', preview: 'Hola amigos!' },
  { id: 'es-female-1', name: 'Sofia - Latin American', gender: 'female', accent: 'Mexico', preview: 'Bienvenido!' },
];

const SAMPLE_SCRIPT = `مرحباً بك في محطة الصوت الذكية من Alking.

يمكنني تحويل نصك إلى صوت احترافي بعدة لغات ولهجات مختلفة.

جرب الآن واستمتع بأفضل جودة صوتية مع دعم اللهجات العربية`;

export default function VoiceStationPage() {
  const [script, setScript] = useState(SAMPLE_SCRIPT);
  const [selectedVoice, setSelectedVoice] = useState('ar-male-1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentVoice = VOICE_OPTIONS.find(v => v.id === selectedVoice);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedAudio(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedAudio('demo-audio-url');
    }, 3000);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-400 uppercase tracking-widest">
              AI Voice Over
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
            محطة الصوت الذكية 🎙️
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            حوّل نصك إلى صوت احترافي بعدة لغات ولهجات
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-sm font-bold shadow-lg shadow-violet-500/30 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          مساعد الكتابة
        </motion.button>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Script Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card border border-blue-500/15 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <AudioWaveform className="h-5 w-5 text-violet-400" />
              النص البرمجي
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-800/50 text-gray-400 text-xs hover:text-white hover:bg-gray-800/80 transition-all"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              {copied ? 'تم النسخ' : 'نسخ'}
            </button>
          </div>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="أدخل النص الذي تريد تحويله إلى صوت..."
            className="w-full h-64 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-white placeholder-gray-600 text-sm leading-relaxed resize-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">{script.length} حرف</span>
            <button
              onClick={() => setScript('')}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              مسح النص
            </button>
          </div>
        </motion.div>

        {/* Voice Selection & Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Voice Selection */}
          <div className="glass-card border border-blue-500/15 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User2 className="h-5 w-5 text-purple-400" />
              <h3 className="font-bold text-white">اختر الصوت</h3>
            </div>

            {/* Gender Filter */}
            <div className="flex gap-2 mb-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-300 text-sm font-medium">
                <User className="h-4 w-4" />
                ذكور
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 text-sm font-medium hover:bg-gray-800/80 hover:text-white transition-all">
                <User2 className="h-4 w-4" />
                إناث
              </button>
            </div>

            {/* Voice Options */}
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {VOICE_OPTIONS.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={cn(
                    'p-3 rounded-xl border text-right transition-all',
                    selectedVoice === voice.id
                      ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/10 border-violet-500/40'
                      : 'bg-gray-800/30 border-transparent hover:bg-gray-800/50 hover:border-gray-700/50'
                  )}
                >
                  <p className={cn(
                    'text-sm font-semibold',
                    selectedVoice === voice.id ? 'text-white' : 'text-gray-300'
                  )}>
                    {voice.name}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{voice.accent}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Generation Controls */}
          <div className="glass-card border border-blue-500/15 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-cyan-400" />
                المعاينة والتوليد
              </h3>
            </div>

            {/* Current Voice Info */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30">
                {currentVoice?.gender === 'male' ? (
                  <User className="h-5 w-5 text-violet-400" />
                ) : (
                  <User2 className="h-5 w-5 text-purple-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{currentVoice?.name}</p>
                <p className="text-[10px] text-gray-500">{currentVoice?.accent}</p>
              </div>
              <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 text-gray-400 hover:text-white transition-all">
                <Play className="h-4 w-4" />
              </button>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating || !script.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-violet-500/30 transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  توليد الصوت
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Generated Audio Player */}
      {generatedAudio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border border-gradient-to-r from-violet-500/20 to-purple-500/20 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              الصوت المُولَّد
            </h3>
            <span className="text-xs text-emerald-400 font-medium">جاهز للتحميل</span>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </motion.button>

            <div className="flex-1">
              <div className="h-2 rounded-full bg-gray-700/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isPlaying ? '60%' : '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-gray-500">0:00</span>
                <span className="text-[10px] text-gray-500">0:45</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 transition-all"
            >
              <Download className="h-4 w-4" />
              تحميل
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Language Support Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { lang: 'العربية', flag: '🇸🇦', supported: true },
          { lang: 'الإنجليزية', flag: '🇺🇸', supported: true },
          { lang: 'الإسبانية', flag: '🇪🇸', supported: true },
          { lang: 'الفرنسية', flag: '🇫🇷', supported: false },
          {lang: 'الألمانية', flag: '🇩🇪', supported: false },
          {lang: 'التركية', flag: '🇹🇷', supported: false },
        ].map((item) => (
          <div
            key={item.lang}
            className={cn(
              'glass-card border p-4 flex items-center justify-between',
              item.supported ? 'border-emerald-500/20' : 'border-gray-700/30 opacity-60'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{item.flag}</span>
              <span className="text-sm font-medium text-white">{item.lang}</span>
            </div>
            {item.supported ? (
              <span className="text-[10px] text-emerald-400 font-bold">مدعوم</span>
            ) : (
              <span className="text-[10px] text-gray-500">قريباً</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}