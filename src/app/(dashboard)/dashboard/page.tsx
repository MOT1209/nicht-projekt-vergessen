'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  FileCode, 
  Zap, 
  Search, 
  Bug,
  Activity,
  Cpu,
  Sparkles,
  Upload,
  Terminal,
  Play,
  Scissors,
  Image as ImageIcon,
  Type,
  FileText,
  Hash,
  Mic2,
  Settings,
  ChevronDown,
  Clock,
  MoreVertical,
  Plus,
  Send,
  Loader2,
  Wand2
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────── Types ─────────────────────────────── */

type DashboardTab = 'code' | 'content';

/* ─────────────────────────────── Utilities ─────────────────────────────── */

const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, '');
};

/* ─────────────────────────────── Mock Data ─────────────────────────────── */

const codeHealthMetrics = [
  { label: 'Security (XSS Protection Active)', status: 'success', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { label: 'Performance (Sitemap & SEO Optimized)', status: 'success', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { label: 'Logical Integrity (Verified)', status: 'success', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
];

const creatorTools = [
  { id: 'thumbnail', label: 'Thumbnail Designer', desc: 'توليد صور احترافية باستخدام Pollinations.', icon: ImageIcon, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { id: 'script', label: 'Script Writer', desc: 'كتابة سيناريوهات ذكية باستخدام Gemini.', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'voice', label: 'Voice Cloning', desc: 'تحويل النص إلى صوت عبر ElevenLabs.', icon: Mic2, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 'title', label: 'Viral Title Generator', desc: 'توليد عناوين جذابة وفريدة.', icon: Type, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { id: 'article', label: 'Article Writer', desc: 'كتابة مقالات متوافقة مع SEO.', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

/* ─────────────────────────────── Component ─────────────────────────────── */

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('code');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState('user_auth_controller.ts');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  // Logic for UI interactions
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const handleOrchestrate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setGeneratedContent(null);
    
    // Simulate multi-stage generation
    setGenerationStep(1); await new Promise(r => setTimeout(r, 1200));
    setGenerationStep(2); await new Promise(r => setTimeout(r, 1500));
    setGenerationStep(3); await new Promise(r => setTimeout(r, 1200));
    setGenerationStep(4); await new Promise(r => setTimeout(r, 800));

    setGeneratedContent({
      title: `كيف تبدأ في ${topic} وتحقق أول 1000 دولار في 30 يوم 🚀`,
      tags: ['الربح_من_الانترنت', topic.replace(/\s/g, '_'), 'نصائح_تقنية', 'فيروسي', 'Gemini_AI'],
      script: `[مقدمة قوية: المشهد يبدأ بإضاءة خافتة وصوت مشوق]\n\nهل سألت نفسك يوماً لماذا ينجح البعض في ${topic} بينما يفشل الآخرون؟ السر ليس في الحظ، بل في الاستراتيجية.\n\n[المرحلة الأولى: التحليل]\nأولاً، يجب عليك فهم السوق. في عام 2026، المحتوى لم يعد مجرد معلومات، بل هو تجربة.\n\n[المرحلة الثانية: التنفيذ]\nابدأ بخطوات بسيطة: حدد جمهورك، استخدم أدوات الذكاء الاصطناعي لتسريع عملك، ولا تخف من الفشل.\n\n[الخاتمة]\nإذا أردت الخطة الكاملة لـ ${topic}، علّق بكلمة "تم" وسأرسل لك الدليل الشامل مجاناً!`
    });
    
    setIsGenerating(false);
    setGenerationStep(0);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0c10] text-right" dir="rtl">
      {/* ─── Top Navigation Tabs ─── */}
      <div className="flex items-center justify-center gap-4 p-4 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-xl sticky top-0 z-20">
        <button
          onClick={() => setActiveTab('code')}
          className={cn(
            "flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all border",
            activeTab === 'code' 
              ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
              : "bg-white/5 border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/10"
          )}
        >
          <FileCode className="h-4 w-4" />
          [ ] Code Inspector
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={cn(
            "flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all border",
            activeTab === 'content' 
              ? "bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]" 
              : "bg-white/5 border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/10"
          )}
        >
          <Play className="h-4 w-4" />
          [ ] Content Studio
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'code' ? (
            <motion.div
              key="code-inspector"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col lg:flex-row p-4 lg:p-6 gap-6 overflow-auto lg:overflow-hidden"
            >
              {/* Center: Code Editor */}
              <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
                      <div className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                      <div className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    </div>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                      <FileCode className="h-3.5 w-3.5 text-blue-400" />
                      <span className="text-xs font-medium text-gray-300">{selectedFile}</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all">
                    <Upload className="h-3.5 w-3.5" />
                    Upload Project
                  </button>
                </div>
                <div className="flex-1 p-6 font-mono text-sm text-gray-400 leading-relaxed overflow-auto custom-scrollbar">
                  <pre className="relative">
                    <div className="absolute -left-2 top-0 text-gray-600 text-right pr-4 border-r border-white/5 select-none text-[10px]">
                      {Array.from({length: 25}).map((_, i) => (
                        <div key={i} className="h-[21px]">{i + 1}</div>
                      ))}
                    </div>
                    <code className="pl-8 block">{`import { User, Response } from '@/services/auth';
import { AuthService } from '@/lib/auth-service';
import { SecurityUtils } from '@/lib/security-utils';
import { AnalyticsService } from '@/services/analytics';

export interface AuthControllerConfig {
  enableLogging: boolean;
  securityMode: 'strict' | 'moderate';
  sessionTimeout: number;
}

export class UserAuthController {
  private authService: AuthService;
  private analytics: AnalyticsService;
  private config: AuthControllerConfig;

  constructor(config: AuthControllerConfig) {
    this.authService = new AuthService();
    this.analytics = new AnalyticsService();
    this.config = config;
  }

  /**
   * Reset user assets and permissions
   */
  public async resetUserAssets(targetUserId: string, apiToken: string): Promise<Response> {
    try {
      // ✅ SECURITY: Sanitize inputs before processing to prevent XSS
      const safeUserId = SecurityUtils.sanitize(targetUserId);
      
      if (!safeUserId || !apiToken) {
        throw new Error('Invalid parameters');
      }

      // Security check
      if (!SecurityUtils.validateToken(apiToken)) {
        throw new Error('Invalid API token');
      }

      // Reset assets - Using verified system methods
      const result = await this.authService.resetAssets(safeUserId);
      
      // Log the action via internal analytics
      if (this.config.enableLogging) {
        this.analytics.logAction('user_assets_reset', { safeUserId });
      }

      return result;
    } catch (error) {
      this.analytics.logError('user_assets_reset_failed', error);
      throw error;
    }
  }

  /**
   * Apply custom authentication settings
   */
  public async applyCustomSettings(projectId: string): Promise<void> {
    try {
      if (!projectId) {
        throw new Error('Project ID is required');
      }

      // Apply settings using the core auth service
      await this.authService.applySettings(projectId);
      
      if (this.config.enableLogging) {
        this.analytics.logAction('custom_settings_applied', { projectId });
      }
    } catch (error) {
      this.analytics.logError('custom_settings_failed', error);
      throw error;
    }
  }

  /**
   * Main authentication controller
   */
  public async authenticateUser(request: any): Promise<User> {
    try {
      if (!request || !request.user) {
        throw new Error('Invalid authentication request');
      }

      const user = await this.authService.authenticate(request.user);
      
      if (this.config.enableLogging) {
        this.analytics.logAction('user_authenticated', { userId: user.id });
      }

      return user;
    } catch (error) {
      this.analytics.logError('user_authentication_failed', error);
      throw error;
    }
  }
}

// Export pre-configured instance
export const userAuthController = new UserAuthController({
  enableLogging: true,
  securityMode: 'strict',
  sessionTimeout: 3600,
});`}</code>
                  </pre>
                </div>
              </div>

              {/* Right: Analysis Terminal */}
              <div className="w-[380px] flex flex-col gap-6">
                <div className="flex-1 rounded-2xl bg-[#0d1117] border border-white/10 p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-blue-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Analysis Terminal</h3>
                    </div>
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="text-xl font-black text-white flex items-center gap-2">
                      Gemini Project Audit
                    </h4>
                    <div className="space-y-2">
                      {codeHealthMetrics.map((metric, i) => (
                        <div key={i} className={cn("px-4 py-3 rounded-xl border text-xs font-bold flex items-center gap-3", metric.color)}>
                          <div className={cn("h-3 w-3 rounded-full", metric.status === 'critical' ? 'bg-rose-500' : metric.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500')} />
                          {metric.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 text-center">Project Summary</h5>
                    <div className="relative h-48 w-48 mx-auto">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="42.4" className="text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-white">85%</span>
                        <span className="text-[8px] font-bold text-gray-500 uppercase">Project Health</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content-studio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col p-6 gap-6 bg-gradient-to-br from-[#0a0c10] via-[#0d1117] to-[#1a1c23]"
            >
              <div className="flex-1 flex gap-6 min-h-0">
                {/* Center: AI Orchestrator Main Panel */}
                <div className="flex-1 flex flex-col rounded-[2.5rem] bg-[#0d1117]/60 backdrop-blur-2xl border border-white/5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
                  {/* Decorative Glow */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

                  <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">AI Orchestrator Engine v4.0</h3>
                    </div>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-gray-500 uppercase">GPU Acceleration: ON</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
                    {/* Input Area */}
                    {!generatedContent ? (
                      <div className="max-w-2xl mx-auto w-full space-y-8 mt-12 text-center">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-4"
                        >
                          <div className="inline-flex p-4 rounded-3xl bg-blue-500/10 border border-blue-500/20 mb-4">
                            <Sparkles className="h-10 w-10 text-blue-400" />
                          </div>
                          <h2 className="text-4xl font-black text-white leading-tight">ما هي فكرة الفيديو القادمة؟</h2>
                          <p className="text-gray-500 text-sm">أدخل تخصصك أو فكرة بسيطة، وسيتولى الذكاء الاصطناعي هندسة المحتوى الفيروسي لك.</p>
                        </motion.div>

                        <div className="relative group">
                          <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                          <div className="relative flex items-center gap-4 p-2 pl-4 rounded-3xl bg-white/5 border border-white/10 focus-within:border-blue-500/50 transition-all">
                            <input 
                              type="text" 
                              placeholder="مثلاً: الربح من الذكاء الاصطناعي في 2026..."
                              value={topic}
                              onChange={(e) => setTopic(e.target.value)}
                              disabled={isGenerating}
                              className="flex-1 bg-transparent border-none outline-none text-white px-4 py-4 font-bold text-lg placeholder:text-gray-700"
                            />
                            <button 
                              onClick={handleOrchestrate}
                              disabled={!topic || isGenerating}
                              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black text-sm uppercase tracking-widest disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
                            >
                              {isGenerating ? (
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span>Gearing Up...</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span>Orchestrate</span>
                                  <Zap className="h-4 w-4 fill-current" />
                                </div>
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                          {['تحليل العملات', 'تكنولوجيا الفضاء', 'الطبخ الذكي', 'ريادة الأعمال'].map(t => (
                            <button 
                              key={t}
                              onClick={() => setTopic(t)}
                              className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                              #{t}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Results View */
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                          <div>
                            <h2 className="text-2xl font-black text-white">النتائج الفيروسية المقترحة ✨</h2>
                            <p className="text-xs text-gray-500 mt-1">الموضوع: <span className="text-blue-400 font-bold">{topic}</span></p>
                          </div>
                          <button 
                            onClick={() => setGeneratedContent(null)}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-all"
                          >
                            <Plus className="h-4 w-4 rotate-45" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                           {/* Title Card */}
                           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 relative group overflow-hidden">
                              <div className="absolute top-0 right-0 p-3 text-[8px] font-black text-blue-500 uppercase tracking-widest">Viral Title</div>
                              <h4 className="text-xl font-black text-white mb-4 leading-relaxed">{generatedContent.title}</h4>
                              <div className="flex gap-2">
                                <button className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-black text-xs hover:bg-blue-400 transition-all">Copy Title</button>
                                <button className="px-4 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white"><Settings className="h-4 w-4" /></button>
                              </div>
                           </motion.div>

                           {/* Tags Card */}
                           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="p-6 rounded-3xl bg-violet-500/5 border border-violet-500/20 relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-3 text-[8px] font-black text-violet-500 uppercase tracking-widest">SEO Keywords</div>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {generatedContent.tags.map(tag => (
                                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[10px] font-bold text-violet-300">#{tag}</span>
                                ))}
                              </div>
                           </motion.div>

                           {/* Script Card */}
                           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative group">
                              <div className="absolute top-0 right-0 p-6 text-[8px] font-black text-emerald-500 uppercase tracking-[0.3em]">Full AI Script (Gemini Engine)</div>
                              <div className="prose prose-invert max-w-none mt-8">
                                <p className="text-gray-400 leading-loose text-lg whitespace-pre-line font-medium">{generatedContent.script}</p>
                              </div>
                              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/5">
                                 <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-black text-sm hover:bg-gray-200 transition-all">
                                    <Send className="h-4 w-4" />
                                    إرسال إلى CapCut
                                 </button>
                                 <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm hover:bg-white/10 transition-all">
                                    <ImageIcon className="h-4 w-4" />
                                    توليد الصور المصغرة
                                 </button>
                              </div>
                           </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Progress Overlay */}
                    {isGenerating && (
                      <div className="absolute inset-0 z-50 bg-[#0a0c10]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 space-y-12">
                        <div className="relative">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="h-48 w-48 rounded-full border border-blue-500/20 border-t-blue-500"
                          />
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-6 rounded-full border border-violet-500/20 border-b-violet-500"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Cpu className="h-12 w-12 text-white animate-pulse" />
                          </div>
                        </div>

                        <div className="max-w-md w-full text-center space-y-8">
                           <div className="space-y-2">
                              <motion.h3 
                                key={generationStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl font-black text-white italic tracking-tighter"
                              >
                                {generationStep === 1 && "🔍 Analyzing Global Trends..."}
                                {generationStep === 2 && "⚡ Synthesizing Viral Hook..."}
                                {generationStep === 3 && "📝 Structuring Script..."}
                                {generationStep === 4 && "🚀 Finalizing Optimization..."}
                              </motion.h3>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-blue-600 to-violet-600"
                                  initial={{ width: "0%" }}
                                  animate={{ width: `${(generationStep / 4) * 100}%` }}
                                />
                              </div>
                           </div>
                           <p className="text-gray-600 text-[10px] uppercase font-bold tracking-[0.5em] animate-pulse">Neural Network Processing...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Creator Toolbox */}
                <div className="w-[380px] flex flex-col gap-6">
                  <div className="flex-1 rounded-3xl bg-[#0d1117]/80 backdrop-blur-xl border border-white/5 p-6 shadow-2xl overflow-y-auto custom-scrollbar relative">
                    <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none" />
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Creator Toolbox</h3>
                      <div className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,1)]" />
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                      {creatorTools.map((tool) => (
                        <button key={tool.id} className="w-full p-5 rounded-[2rem] bg-white/[0.02] border border-white/[0.04] hover:border-blue-500/30 hover:bg-white/[0.06] transition-all group flex items-start gap-4 text-right">
                          <div className={cn("p-3.5 rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-6", tool.bg)}>
                            <tool.icon className={cn("h-5 w-5", tool.color)} />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-xs font-black text-gray-200 group-hover:text-white transition-colors uppercase tracking-tight">{tool.label}</h5>
                            <p className="text-[9px] text-gray-500 leading-tight mt-1 font-medium">{tool.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                       <div className="p-6 rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-white/5 space-y-4">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-400" />
                            <span className="text-[10px] font-black text-white uppercase italic">System Load</span>
                          </div>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[8px] font-bold text-gray-500">
                                <span>AI INFERENCE</span>
                                <span>34%</span>
                             </div>
                             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full w-[34%] bg-blue-500" />
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          )}
        </AnimatePresence>
      </div>

      {/* ─── Bottom Footer Status ─── */}
      <div className="px-6 py-2 border-t border-white/5 bg-[#0d1117] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Online</span>
          </div>
          <span className="text-[10px] text-gray-600 font-medium">Credits Remaining: <span className="text-blue-400">10,000 (ElevenLabs)</span> | Media Files: <span className="text-amber-400">8</span> | Gemini Scripting: <span className="text-emerald-400 font-black uppercase">Unlimited</span></span>
        </div>
        <div className="text-[9px] font-mono text-gray-700">Total Files: 42 | Lines of Code: 12,500 | Gemini AI Context: 1M tokens free tier</div>
      </div>
    </div>
  );
}
