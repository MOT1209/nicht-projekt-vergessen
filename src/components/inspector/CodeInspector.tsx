'use client'

import { useState, useRef } from 'react'
import { FileTree } from './FileTree'
import { CodeEditor } from './CodeEditor'
import { AnalysisPanel } from './AnalysisPanel'
import type { AuditReport } from '@/types/audit'

export default function CodeInspector() {
  const [code, setCode] = useState('')
  const [filename, setFilename] = useState('untitled.js')
  const [report, setReport] = useState<AuditReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    setReport(null)

    try {
      const res = await fetch('/api/gemini/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, filename })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setReport(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (name: string, content: string) => {
    setFilename(name)
    setCode(content)
    setReport(null)
    setError(null)
  }

  return (
    <div className="flex h-full bg-slate-950 overflow-hidden">
      <FileTree onFileSelect={handleFileSelect} activeFile={filename} />
      <CodeEditor
        code={code}
        setCode={setCode}
        filename={filename}
        setFilename={setFilename}
        onAnalyze={handleAnalyze}
        loading={loading}
      />
      <AnalysisPanel report={report} loading={loading} error={error} />
    </div>
  )
}
