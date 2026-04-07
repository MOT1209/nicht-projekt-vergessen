'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Image,
  Sparkles,
  RefreshCw,
  Download,
  Type,
  Smile,
  Layers,
  Palette,
  Wand2,
  MousePointer,
  Move,
  ZoomIn,
  Trash2,
  Undo,
  Redo,
  Save,
  Share2,
  Eye,
  Zap,
  Star,
  Loader2,
} from 'lucide-react';

interface ThumbnailVariant {
  id: string;
  imageUrl: string;
  style: string;
  isSelected?: boolean;
}

const THUMBNAIL_STYLES = [
  { id: 'gaming', name: 'Gaming', icon: '🎮', color: '#FF4757' },
  { id: 'vlog', name: 'Vlog', icon: '📹', color: '#2ED573' },
  { id: 'edu', name: 'تعليمي', icon: '📚', color: '#5352ED' },
  { id: 'comedy', name: 'كوميديا', icon: '😂', color: '#FFA502' },
  { id: 'tech', name: 'تقنية', icon: '💻', color: '#1E90FF' },
  { id: 'food', name: 'طعام', icon: '🍔', color: '#FF6348' },
];

const TEXT_STYLES = [
  { id: 'bold', name: 'عريض', fontWeight: 'bold' },
  { id: 'outline', name: 'مoutline', stroke: true },
  { id: 'shadow', name: 'مظلّل', shadow: true },
  { id: 'glow', name: 'متوهج', glow: true },
];

export default function ThumbnailStudioPage() {
  const [videoTitle, setVideoTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThumbnails, setGeneratedThumbnails] = useState<ThumbnailVariant[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('gaming');
  const [addedTexts, setAddedTexts] = useState<{ id: string; text: string; x: number; y: number }[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!videoTitle.trim()) return;
    setIsGenerating(true);
    setGeneratedThumbnails([]);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedThumbnails([
        { id: '1', imageUrl: '', style: 'gaming', isSelected: true },
        { id: '2', imageUrl: '', style: 'vlog' },
        { id: '3', imageUrl: '', style: 'edu' },
      ]);
      setSelectedThumbnail('1');
    }, 3000);
  };

  const handleAddText = () => {
    const newText = {
      id: Date.now().toString(),
      text: 'نص جديد',
      x: 50,
      y: 50,
    };
    setAddedTexts([...addedTexts, newText]);
    setSelectedTextId(newText.id);
  };

  const handleDeleteText = (id: string) => {
    setAddedTexts(addedTexts.filter(t => t.id !== id));
    setSelectedTextId(null);
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
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 text-pink-400 uppercase tracking-widest">
              Thumbnail Studio
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-400 via-rose-300 to-red-400 bg-clip-text text-transparent">
            استوديو الصور المصغرة 🖼️
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            أنشئ صور مصغرة عالية الـ CTR بتقنية الذكاء الاصطناعي
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-pink-500/20 text-pink-400 hover:border-pink-400/50 text-sm font-medium transition-all"
          >
            <Zap className="h-4 w-4" />
            تحسين تلقائي
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Settings */}
        <div className="space-y-6">
          {/* Title Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card border border-blue-500/15 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-5 w-5 text-pink-400" />
              <h3 className="font-bold text-white">عنوان الفيديو</h3>
            </div>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="أدخل عنوان الفيديو..."
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">based on the title, we'll generate eye-catching thumbnails</p>
          </motion.div>

          {/* Style Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card border border-blue-500/15 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-rose-400" />
              <h3 className="font-bold text-white">اختر النمط</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {THUMBNAIL_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={cn(
                    'p-3 rounded-xl border text-center transition-all',
                    selectedStyle === style.id
                      ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/10 border-pink-500/40'
                      : 'bg-gray-800/30 border-transparent hover:bg-gray-800/50 hover:border-gray-700/50'
                  )}
                >
                  <span className="text-2xl mb-1 block">{style.icon}</span>
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

          {/* Text Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card border border-blue-500/15 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Type className="h-5 w-5 text-amber-400" />
                أدوات النص
              </h3>
              <button
                onClick={handleAddText}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-400 text-xs hover:bg-pink-500/30 transition-all"
              >
                <Type className="h-3 w-3" />
                إضافة نص
              </button>
            </div>

            <div className="space-y-2">
              {addedTexts.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">
                  أضف نصاً لتحسين الصورة المصغرة
                </p>
              ) : (
                addedTexts.map((text) => (
                  <div
                    key={text.id}
                    onClick={() => setSelectedTextId(text.id)}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all',
                      selectedTextId === text.id
                        ? 'bg-pink-500/10 border-pink-500/40'
                        : 'bg-gray-800/30 border-transparent hover:border-gray-700/50'
                    )}
                  >
                    <span className="text-sm text-white">{text.text}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteText(text.id);
                      }}
                      className="p-1 rounded hover:bg-rose-500/20 text-gray-500 hover:text-rose-400 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {selectedTextId && (
              <div className="mt-4 pt-4 border-t border-gray-700/30">
                <p className="text-[10px] text-pink-400 mb-2">نمط النص</p>
                <div className="flex gap-2">
                  {TEXT_STYLES.map((style) => (
                    <button
                      key={style.id}
                      className="px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-400 text-xs hover:text-white hover:bg-gray-800/80 transition-all"
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating || !videoTitle.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                جاري التوليد...
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                توليد الصور
              </>
            )}
          </motion.button>
        </div>

        {/* Middle: Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Generated Thumbnails */}
          {generatedThumbnails.length > 0 ? (
            <div className="glass-card border border-blue-500/15 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Image className="h-5 w-5 text-pink-400" />
                  الصور المُولَّدة
                </h3>
                <button className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 transition-all">
                  <RefreshCw className="h-3 w-3" />
                  إعادة توليد
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedThumbnails.map((thumb, i) => {
                  const style = THUMBNAIL_STYLES.find(s => s.id === thumb.style);
                  return (
                    <motion.div
                      key={thumb.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      onClick={() => setSelectedThumbnail(thumb.id)}
                      className={cn(
                        'relative aspect-video rounded-xl border-2 cursor-pointer overflow-hidden transition-all',
                        selectedThumbnail === thumb.id
                          ? 'border-pink-500 shadow-lg shadow-pink-500/30'
                          : 'border-transparent hover:border-gray-700/50'
                      )}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${style?.color}40, ${style?.color}20)` }}
                      >
                        <div className="text-center">
                          <span className="text-4xl block mb-2">{style?.icon}</span>
                          <span className="text-sm font-semibold text-white">{style?.name}</span>
                        </div>
                      </div>
                      {selectedThumbnail === thumb.id && (
                        <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white">
                          <Star className="h-3 w-3" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="glass-card border border-blue-500/15 p-6">
              <div className="aspect-video bg-gray-900/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800/50 mx-auto mb-4">
                    <Image className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-sm">أدخل عنوان الفيديو واختر نمطاً لتوليد الصور</p>
                </div>
              </div>
            </div>
          )}

          {/* Editor Preview */}
          {selectedThumbnail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card border border-pink-500/30 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-pink-400" />
                  المحرر
                </h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all">
                    <Undo className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all">
                    <Redo className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4">
                {generatedThumbnails.find(t => t.id === selectedThumbnail) && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${THUMBNAIL_STYLES.find(s => s.id === generatedThumbnails.find(t => t.id === selectedThumbnail)?.style)?.color}40, ${THUMBNAIL_STYLES.find(s => s.id === generatedThumbnails.find(t => t.id === selectedThumbnail)?.style)?.color}20)` }}
                  >
                    <span className="text-6xl">
                      {THUMBNAIL_STYLES.find(s => s.id === generatedThumbnails.find(t => t.id === selectedThumbnail)?.style)?.icon}
                    </span>
                  </div>
                )}

                {/* Text Overlays */}
                {addedTexts.map((text) => (
                  <div
                    key={text.id}
                    className={cn(
                      'absolute px-4 py-2 bg-black/60 rounded-lg cursor-move',
                      selectedTextId === text.id ? 'ring-2 ring-pink-500' : ''
                    )}
                    style={{ left: `${text.x}%`, top: `${text.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <span className="text-white font-bold text-xl drop-shadow-lg">{text.text}</span>
                  </div>
                ))}

                {/* Toolbar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 backdrop-blur-sm">
                  <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all">
                    <MousePointer className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all">
                    <Move className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/80 transition-all">
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 text-sm hover:text-white hover:bg-gray-800/80 transition-all">
                    <Share2 className="h-4 w-4" />
                    مشاركة
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-400 text-sm hover:text-white hover:bg-gray-800/80 transition-all">
                    <Eye className="h-4 w-4" />
                    معاينة
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm font-bold shadow-lg shadow-pink-500/30 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    تحميل
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card border border-blue-500/15 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <Sparkles className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">نصائح للصور المصغرة المميزة</h3>
            <p className="text-xs text-gray-500">كيف تجذب المشاهدين من أول نظرة</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: '🎯', tip: 'استخدم وجهاً expressions كبيرة', color: 'amber' },
            { icon: '📝', tip: 'أضف نصاً كبيراً وقصيراً', color: 'pink' },
            { icon: '🌈', tip: 'استخدم ألوان زاهية ومتباينة', color: 'violet' },
            { icon: '⚡', tip: 'اجعل التصميم نظيفاً ومتوازناً', color: 'emerald' },
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