'use client'

import React, { useState } from 'react'
import { FileTree } from './FileTree'
import { CodeEditor } from './CodeEditor'
import { AnalysisPanel } from './AnalysisPanel'
import { Terminal } from './Terminal'
import { AlKingAssistant } from './AlKingAssistant'
import { ProjectFile } from '@/store/workspace-store'
import { AuditReport } from '@/types/audit'
import { Search, Brain, BarChart3 } from 'lucide-react'

export function CodeInspector() {
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null)
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null)
  const [logs, setLogs] = useState<string[]>(['> Initializing AlKing Security Engine...', '> Awaiting project upload...'])
  const [rightTab, setRightTab] = useState<'audit' | 'agent'>('audit')

  const handleAudit = async (code: string, filename: string) => {
    setLogs(prev => [...prev, `> Starting audit for ${filename}...`, '> Sending payload to Gemini 1.5 Flash...'])
    try {
      const response = await fetch('/api/gemini/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, filename }),
      })
      const data = await response.json()
      setAuditReport(data)
      setLogs(prev => [...prev, `> Audit complete. Score: ${data.score}`, `> Found ${data.security.length} security issues.`])
      setRightTab('audit')
    } catch (err) {
      setLogs(prev => [...prev, 'ERROR: Audit failed. Check API key.'])
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950/20 backdrop-blur-3xl">
      {/* Top Controls Bar */}
      <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-slate-900/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950/50 border border-white/5 rounded-lg px-2 py-1">
            <Search size={14} className="text-slate-600" />
            <input 
              type="text" 
              placeholder="Search in project..." 
              className="bg-transparent border-none outline-none text-[10px] w-40 text-slate-400"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-slate-300 transition-all border border-white/10">
            EXPORT REPORT
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: File Tree */}
        <div className="w-64 border-r border-white/5 flex flex-col">
          <FileTree 
            selectedFile={selectedFile} 
            onFileSelect={setSelectedFile} 
          />
        </div>

        {/* Center: Editor + Terminal */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900/10">
          <div className="flex-1 relative">
            <CodeEditor 
              file={selectedFile} 
              onAudit={handleAudit} 
            />
          </div>
          <Terminal logs={logs} onClear={() => setLogs([])} />
        </div>

        {/* Right: Analysis & Assistant */}
        <div className="w-80 border-l border-white/5 flex flex-col bg-slate-900/40">
          {/* Tabs */}
          <div className="flex border-b border-white/5 bg-slate-950/40 p-1 gap-1">
            <button 
              onClick={() => setRightTab('audit')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all
                ${rightTab === 'audit' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/5' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
              <BarChart3 size={12} />
              AUDIT
            </button>
            <button 
              onClick={() => setRightTab('agent')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all
                ${rightTab === 'agent' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
              <Brain size={12} />
              AI AGENT
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {rightTab === 'audit' ? (
              <AnalysisPanel report={auditReport} />
            ) : (
              <AlKingAssistant />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
