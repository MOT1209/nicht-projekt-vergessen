'use client'

import { useRef, useEffect } from 'react'
import { Play, Loader2, Copy, Trash2 } from 'lucide-react'

interface Props {
  code: string
  setCode: (c: string) => void
  filename: string
  setFilename: (f: string) => void
  onAnalyze: () => void
  loading: boolean
}

export function CodeEditor({ code, setCode, filename, setFilename, onAnalyze, loading }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const lineCount = code.split('\n').length

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.currentTarget
      const start = el.selectionStart
      const end = el.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)
      setTimeout(() => { el.selectionStart = el.selectionEnd = start + 2 }, 0)
    }
  }

  const syncScroll = () => {
    if (textareaRef.current && lineRef.current) {
      lineRef.current.scrollTop = textareaRef.current.scrollTop
    }
import React, { useState, useEffect } from 'react'
import { FileCode, Play, RotateCcw, Save, ShieldCheck, Loader2 } from 'lucide-react'

export function CodeEditor({ file, onAudit, loading }: { file: any, onAudit: (code: string, name: string) => void, loading: boolean }) {
  const [code, setCode] = useState('')

  useEffect(() => {
    if (file) setCode(file.content)
  }, [file])

  if (!file) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-700 bg-slate-950/40">
        <FileCode size={48} className="mb-4 opacity-10" />
        <p className="text-sm font-mono tracking-widest opacity-40">SELECT A FILE TO INSPECT</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="h-10 shrink-0 bg-slate-900/50 border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-purple-400" />
          <span className="text-xs font-mono text-slate-300">{file.path}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onAudit(code, file.name)}
            disabled={loading}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold transition-all border ${loading ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed' : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'}`}
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <ShieldCheck size={12} />}
            {loading ? 'ANALYZING...' : 'SCAN WITH GEMINI'}
          </button>
          <button className="p-1.5 hover:bg-white/5 text-slate-500 rounded-lg"><Save size={14}/></button>
          <button className="p-1.5 hover:bg-white/5 text-slate-500 rounded-lg"><RotateCcw size={14}/></button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 flex overflow-hidden bg-slate-950 relative">

        {/* Line Numbers */}
        <div
          ref={lineRef}
          className="select-none text-right text-xs font-mono text-slate-700 py-4 pr-3 pl-3 overflow-hidden w-12 shrink-0 border-r border-white/5"
          style={{ lineHeight: '1.625rem' }}
        >
          {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={handleTab}
          onScroll={syncScroll}
          spellCheck={false}
          placeholder="// Paste your code here or select a file from the explorer..."
          className="flex-1 bg-transparent text-slate-300 text-xs font-mono p-4 pl-3 outline-none resize-none leading-[1.625rem] placeholder:text-slate-700"
        />

        {/* Empty State */}
        {!code && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-4xl mb-3 opacity-20">{'</>'}</div>
              <p className="text-slate-600 text-xs font-mono">Paste code or select a file</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-7 border-t border-white/10 bg-slate-900/60 flex items-center px-4 gap-4 text-[10px] font-mono text-slate-600 shrink-0">
        <span>{filename}</span>
        <span>Lines: {lineCount}</span>
        <span>Chars: {code.length}</span>
        <span className={`ml-auto ${langColor[ext || ''] || 'text-slate-500'}`}>{langLabel}</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Gemini Ready
        </span>
      </div>
    </div>
  )
}
