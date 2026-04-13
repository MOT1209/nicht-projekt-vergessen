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
  }

  const copyCode = () => { navigator.clipboard.writeText(code) }
  const clearCode = () => { setCode(''); setFilename('untitled.js') }

  const ext = filename.split('.').pop()
  const langColor: Record<string, string> = {
    js: 'text-yellow-400', ts: 'text-blue-400', tsx: 'text-blue-300',
    py: 'text-green-400', json: 'text-orange-400', css: 'text-pink-400'
  }
  const langLabel = ext?.toUpperCase() || 'TEXT'

  return (
    <div className="flex-1 flex flex-col min-w-0 border-r border-white/10">

      {/* Editor Toolbar */}
      <div className="h-10 border-b border-white/10 bg-slate-900/40 flex items-center px-4 gap-3 shrink-0">
        <input
          value={filename}
          onChange={e => setFilename(e.target.value)}
          className="bg-transparent text-xs font-mono text-slate-300 outline-none border-b border-transparent focus:border-purple-500/50 transition-colors w-48"
          placeholder="filename.js"
        />
        <span className="ml-auto flex items-center gap-2">
          <button onClick={copyCode} className="p-1.5 rounded hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors">
            <Copy size={12} />
          </button>
          <button onClick={clearCode} className="p-1.5 rounded hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors">
            <Trash2 size={12} />
          </button>
          <button
            onClick={onAnalyze}
            disabled={loading || !code.trim()}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all
              ${loading || !code.trim()
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 active:scale-95'
              }`}
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </span>
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
