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
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────── Types ─────────────────────────────── */

type DashboardTab = 'code' | 'content';

/* ─────────────────────────────── Mock Data ─────────────────────────────── */

const codeHealthMetrics = [
  { label: 'Security Vulnerability (XSS)', status: 'critical', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
  { label: 'Performance Optimizations (2 found)', status: 'warning', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { label: 'Logical Corrections (Done)', status: 'success', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
];

const creatorTools = [
  { id: 'thumbnail', label: 'Thumbnail Designer', desc: 'Generate a Pollinations-style image.', icon: ImageIcon, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { id: 'script', label: 'Script Writer', desc: 'Using Gemini to generate scripts.', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'voice', label: 'Voice Cloning', desc: 'Linked to voice Cloning ElevenLabs.', icon: Mic2, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 'title', label: 'Viral Title Generator', desc: 'Generate a Viral Title Generator', icon: Type, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { id: 'article', label: 'Article Writer', desc: 'Generate an Article Writer', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

/* ─────────────────────────────── Component ─────────────────────────────── */

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('code');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState('user_auth_controller.js');

  return (
    <div className="flex flex-col h-full bg-[#0a0c10]">
      {/* ─── Top Navigation Tabs ─── */}
      <div className="flex items-center justify-center gap-4 p-4 border-b border-white/5 bg-[#0d1117]">
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
              className="h-full flex p-6 gap-6"
            >
              {/* Center: Code Editor */}
              <div className="flex-1 flex flex-col rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden shadow-2xl">
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
                    <code className="pl-8 block">{`import { Ruser, Resonuse } from 'service';
import { User.names } from '/access';
import { Bustomoasent } from '/ge/auth/akannts';
import { Keynoitics } from 'agets/user/rconfigs';

export default var user_auth_controller: SetErgect {

  const resset = usetAracets(:target, agi) => {
    sustemt.getDenoates.request()
    return hits;
  });

  @roorit timestruts
  export default customization[ProjectAr, () => {
    if (!request.deitaliedi&compliscablerdate=="user?") => {
      request.log(sselected);
    });
  };

  export user_auth_controller(iobject) => {
    consot.log.consoleReason('ontroller'zed'name, 'user'');
    if (resset.agin.privated(user))
    return user;
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
                {/* Center: Video Editor / Canvas */}
                <div className="flex-1 flex flex-col rounded-2xl bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="text-sm font-black text-white uppercase tracking-tighter italic">AI Content Studio: CapCut Style</h3>
                    <div className="flex gap-2">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-all">
                        <Settings className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-8 flex items-center justify-center">
                    <div className="w-full max-w-2xl aspect-video rounded-3xl bg-black border-4 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-500">
                        <ImageIcon className="h-12 w-12 text-gray-600" />
                      </div>
                      <p className="text-sm font-bold text-gray-500">Drag and drop workspace</p>
                      <span className="text-[10px] text-gray-700 mt-2 uppercase tracking-widest">or</span>
                      <button className="mt-4 px-6 py-2 rounded-full bg-cyan-500 text-black font-black text-[10px] uppercase tracking-tighter hover:bg-cyan-400 transition-all">
                        + Import Media
                      </button>
                    </div>
                  </div>

                  {/* Timeline Placeholder */}
                  <div className="h-48 border-t border-white/10 bg-black/40 p-4">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <div className="flex gap-4">
                        <Scissors className="h-4 w-4 text-gray-500 cursor-pointer hover:text-white" />
                        <Type className="h-4 w-4 text-gray-500 cursor-pointer hover:text-white" />
                        <Mic2 className="h-4 w-4 text-gray-500 cursor-pointer hover:text-white" />
                      </div>
                      <div className="text-[10px] font-mono text-gray-600 tracking-widest">00:00:00 / 00:00:00</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-cyan-500/20 border-r border-cyan-500/50" />
                      </div>
                      <div className="h-10 w-full bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
                        <div className="absolute left-20 top-0 bottom-0 w-48 bg-violet-500/20 border-r border-violet-500/50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Creator Toolbox */}
                <div className="w-[380px] flex flex-col gap-6">
                  <div className="flex-1 rounded-2xl bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl overflow-y-auto custom-scrollbar">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">Creator Toolbox</h3>
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">AI Assistant Tools</h4>
                      {creatorTools.map((tool) => (
                        <button key={tool.id} className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.08] transition-all group flex items-start gap-4 text-right">
                          <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", tool.bg)}>
                            <tool.icon className={cn("h-5 w-5", tool.color)} />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-black text-gray-200 group-hover:text-white transition-colors">{tool.label}</h5>
                            <p className="text-[10px] text-gray-500 leading-tight mt-1">{tool.desc}</p>
                          </div>
                        </button>
                      ))}
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
