'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  MessageCircle,
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  Check,
  X,
  ToggleLeft,
  ToggleRight,
  Heart,
  ThumbsUp,
  Smile,
  MessageSquare,
  Youtube,
  Instagram,
  TrendingUp,
  Zap,
  Filter,
  User,
  Clock,
  Eye,
} from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  platform: 'tiktok' | 'youtube';
  likes: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  suggestedReply?: string;
  isReplied?: boolean;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: 'أحمد محمد',
    avatar: '👨',
    content: 'محتوى رائع جدا! تستحق كل النجاح 🙏',
    timestamp: 'منذ 5 دقائق',
    platform: 'tiktok',
    likes: 234,
    sentiment: 'positive',
    suggestedReply: 'شكراً جزيلاً لك! سعيد جداً أن المحتوى نال إعجابك ❤️',
    isReplied: false,
  },
  {
    id: '2',
    author: 'سارة ',
    avatar: '👩',
    content: 'شكراً على الفيديو، أرجو توضيح المزيد عن نقطة 3:25',
    timestamp: 'منذ 12 دقيقة',
    platform: 'youtube',
    likes: 45,
    sentiment: 'neutral',
    suggestedReply: 'شكراً على ملاحظتك! سأقوم بإعداد فيديو تفصيلي يشرح النقطة بشكل أفضل 💡',
    isReplied: false,
  },
  {
    id: '3',
    author: 'Mohamed Gaming',
    avatar: '🎮',
    content: 'ماشاء الله تبارك الله! الله يوفقك',
    timestamp: 'منذ 25 دقيقة',
    platform: 'tiktok',
    likes: 567,
    sentiment: 'positive',
    suggestedReply: 'أشكرك! الله يوفقك ويبارك فيك أيضاً 🤲',
    isReplied: false,
  },
  {
    id: '4',
    author: 'عمر ',
    avatar: '👦',
    content: 'يعني لو تاخرت في النشر هابي',
    timestamp: 'منذ ساعة',
    platform: 'youtube',
    likes: 12,
    sentiment: 'negative',
    suggestedReply: 'أعتذر عن التأخير! سأحاول الالتزام بمواعيد النشر قدر الإمكان 🙏',
    isReplied: false,
  },
  {
    id: '5',
    author: 'ليلى ',
    avatar: '👧',
    content: 'شكراً على المجهود الرائع، بانتظار جديدك دائماً 💕',
    timestamp: 'منذ ساعة',
    platform: 'tiktok',
    likes: 189,
    sentiment: 'positive',
    suggestedReply: 'شكراً لكِ! سعيد جداً بمتابعتك وانتظارك لكل جديد ❤️',
    isReplied: true,
  },
];

export default function EngagementBotPage() {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSending, setIsSending] = useState<string | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2500);
  };

  const handleSendReply = (commentId: string) => {
    setIsSending(commentId);
    setTimeout(() => {
      setIsSending(null);
      setComments(prev =>
        prev.map(c => (c.id === commentId ? { ...c, isReplied: true } : c))
      );
    }, 1500);
  };

  const handleDismissReply = (commentId: string) => {
    setComments(prev =>
      prev.map(c => (c.id === commentId ? { ...c, suggestedReply: undefined } : c))
    );
    setSelectedComment(null);
  };

  const sentimentConfig = {
    positive: { color: 'emerald', icon: Heart, bg: 'bg-emerald-500/20', border: 'border-emerald-500/30' },
    neutral: { color: 'blue', icon: Smile, bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
    negative: { color: 'rose', icon: ThumbsUp, bg: 'bg-rose-500/20', border: 'border-rose-500/30' },
  };

  const unreadCount = comments.filter(c => !c.isReplied && c.suggestedReply).length;
  const positiveCount = comments.filter(c => c.sentiment === 'positive').length;

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
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 uppercase tracking-widest">
              Smart Engagement
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
            بوت التفاعل الذكي 🤖
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            تحليل_comments وتوليد ردود ذكية بأسلوب AlKing
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Auto Reply Toggle */}
          <div
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all',
              autoReplyEnabled
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-gray-800/50 border-gray-700/50 text-gray-400'
            )}
            onClick={() => setAutoReplyEnabled(!autoReplyEnabled)}
          >
            {autoReplyEnabled ? (
              <ToggleRight className="h-5 w-5" />
            ) : (
              <ToggleLeft className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">
              {autoReplyEnabled ? 'الرد التلقائي نشط' : 'الرد التلقائي معطل'}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white text-sm font-bold shadow-lg shadow-cyan-500/30 transition-all"
          >
            {isAnalyzing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {isAnalyzing ? 'جاري التحليل...' : 'تحليل التعليقات'}
          </motion.button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card border border-blue-500/15 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">إجمالي التعليقات</span>
            <MessageCircle className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{comments.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card border border-blue-500/15 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">غير مُجاب</span>
            <MessageSquare className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white">{unreadCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card border border-blue-500/15 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">إيجابي</span>
            <Heart className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400">{positiveCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card border border-blue-500/15 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">متوسط وقت الرد</span>
            <Clock className="h-4 w-4 text-violet-400" />
          </div>
          <p className="text-2xl font-bold text-white">2.5 د</p>
        </motion.div>
      </div>

      {/* Platform Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card border border-blue-500/15 p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-semibold text-white">تصفية المنصات</span>
        </div>
        <div className="flex gap-2">
          {[
            { name: 'الكل', icon: Zap },
            { name: 'TikTok', icon: TrendingUp },
            { name: 'YouTube', icon: Youtube },
          ].map((platform) => (
            <button
              key={platform.name}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 text-sm hover:text-white hover:border-blue-500/30 transition-all"
            >
              <platform.icon className="h-4 w-4" />
              {platform.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment, i) => {
          const config = sentimentConfig[comment.sentiment];
          const SentimentIcon = config.icon;

          return (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              className={cn(
                'glass-card border p-4 transition-all',
                selectedComment === comment.id
                  ? 'border-cyan-500/40 bg-cyan-500/5'
                  : 'border-blue-500/15'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-800 text-xl shrink-0">
                  {comment.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{comment.author}</span>
                    <span className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1',
                      config.bg, config.border, `text-${config.color}-400`
                    )}>
                      <SentimentIcon className={cn('h-2.5 w-2.5', `text-${config.color}-400`)} />
                      {comment.sentiment === 'positive' ? 'إيجابي' : comment.sentiment === 'neutral' ? 'محايد' : 'سلبي'}
                    </span>
                    <span className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded',
                      comment.platform === 'tiktok'
                        ? 'bg-pink-500/20 text-pink-400'
                        : 'bg-red-500/20 text-red-400'
                    )}>
                      {comment.platform === 'tiktok' ? 'TikTok' : 'YouTube'}
                    </span>
                    {comment.isReplied && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <Check className="h-2.5 w-2.5" />
                        تم الرد
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-300 mb-2">{comment.content}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {comment.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {comment.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      1.2K
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0">
                  {comment.isReplied ? (
                    <div className="flex items-center gap-1 text-emerald-400 text-xs">
                      <Check className="h-4 w-4" />
                      تم الرد
                    </div>
                  ) : comment.suggestedReply ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendReply(comment.id)}
                      disabled={isSending === comment.id}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-medium shadow-lg shadow-cyan-500/20 transition-all"
                    >
                      {isSending === comment.id ? (
                        <RefreshCw className="h-3 w-3 animate-spin" />
                      ) : (
                        <Send className="h-3 w-3" />
                      )}
                      إرسال
                    </motion.button>
                  ) : null}
                </div>
              </div>

              {/* Suggested Reply */}
              {comment.suggestedReply && !comment.isReplied && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-gray-700/30"
                >
                  <div className="flex items-start gap-2">
                    <Bot className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-cyan-400 mb-1">الرد المُقترح:</p>
                      <p className="text-sm text-gray-300">{comment.suggestedReply}</p>
                    </div>
                    <button
                      onClick={() => handleDismissReply(comment.id)}
                      className="p-1 rounded hover:bg-gray-800/50 text-gray-500 hover:text-white transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card border border-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <Sparkles className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">تحليل التفاعل</h3>
            <p className="text-xs text-gray-500">رؤى ذكية لتحسين التفاعل</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gray-800/30 border border-cyan-500/20">
          <p className="text-sm text-gray-300 leading-relaxed">
            بناءً على تحليل التعليقات الأخيرة، لاحظت أن المحتوى يحظى بتفاعل كبير (
            <span className="text-emerald-400 font-semibold">80% إيجابي</span>
            ). أنصح بالرد على التعليقات في خلال 
            <span className="text-cyan-400 font-semibold"> 3 ساعات </span>
            من نشر الفيديو لتحقيق أقصى تفاعل. أيضاً، التعليقات السلبية تحتاج اهتماماً خاصاً لإظهار احترامك للمشاهدين.
          </p>
        </div>
      </motion.div>
    </div>
  );
}