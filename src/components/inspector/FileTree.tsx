'use client'

import { useState, useRef } from 'react'
import {
  FolderOpen, Folder, FileCode, FileJson,
  FileCog, File, Upload, ChevronRight, ChevronDown
} from 'lucide-react'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
  ext?: string
}

const DEMO_TREE: FileNode[] = [
  {
import React from 'react'
import { useWorkspace, ProjectFile } from '@/store/workspace-store'
import { FolderPlus, FileText, FolderOpen, Trash2, Github } from 'lucide-react'

export function FileTree({ onFileSelect, selectedFile }: { onFileSelect: (f: ProjectFile) => void, selectedFile: ProjectFile | null }) {
  const { files, setFiles, clearProject } = useWorkspace()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files
    if (!uploadedFiles) return

    const newFiles: ProjectFile[] = []
    
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i]
      const text = await file.text()
      
      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        path: file.webkitRelativePath || file.name,
        content: text,
        type: 'file'
      })
    }

    setFiles(newFiles)
  }

  return (
    <div className="h-full flex flex-col bg-slate-950/20">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Filesystem</h3>
        <div className="flex gap-1">
           <button 
            onClick={clearProject}
            className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-slate-500 transition-colors rounded-lg"
            title="Clear Project"
          >
            <Trash2 size={13} />
          </button>
        </div>
  activeFile: string
}) {
  const [uploadedFiles, setUploadedFiles] = useState<FileNode[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const content = ev.target?.result as string
        const ext = file.name.split('.').pop()
        setUploadedFiles(prev => [...prev, { name: file.name, type: 'file', content, ext }])
        onFileSelect(file.name, content)
      }
      reader.readAsText(file)
    })
  }

  return (
    <aside className="w-64 border-r border-white/10 bg-slate-900/60 flex flex-col shrink-0">
      <div className="px-3 py-2.5 border-b border-white/10 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase">Explorer</span>
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1 text-[10px] text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Upload size={10} /> Upload
        </button>
        <input ref={inputRef} type="file" multiple accept=".js,.ts,.tsx,.jsx,.py,.json,.css,.html" className="hidden" onChange={handleUpload} />
      </div>

      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
        {[...DEMO_TREE, ...uploadedFiles.map(f => ({ ...f, type: 'file' as const }))].map((node, i) => (
          <TreeNode key={i} node={node} depth={0} onSelect={onFileSelect} activeFile={activeFile} />
        ))}
      </div>

      <div className="px-3 py-2 border-t border-white/10 text-[10px] text-slate-600 font-mono">
        {uploadedFiles.length} uploaded file{uploadedFiles.length !== 1 ? 's' : ''}
      </div>
    </aside>
  )
}
