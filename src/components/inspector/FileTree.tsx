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
    name: 'my-project', type: 'folder', children: [
      { name: 'next.config.ts', type: 'file', ext: 'ts', content: `import type { NextConfig } from 'next'\nconst nextConfig: NextConfig = { reactStrictMode: true }\nexport default nextConfig` },
      { name: 'package.json', type: 'file', ext: 'json', content: `{\n  "name": "my-project",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build"\n  }\n}` },
      {
        name: 'src', type: 'folder', children: [
          { name: 'auth.js', type: 'file', ext: 'js', content: `// Auth controller\nconst jwt = require('jsonwebtoken')\nconst SECRET = "hardcoded-secret-123"\n\nfunction login(user, pass) {\n  if (user == "admin" && pass == "admin") {\n    const token = jwt.sign({ user }, SECRET)\n    return token\n  }\n  return null\n}\n\nmodule.exports = { login }` },
          { name: 'api.ts', type: 'file', ext: 'ts', content: `// API handler\nexport async function fetchData(url: string) {\n  const res = await fetch(url)\n  const data = res.json()\n  return data\n}` },
        ]
      }
    ]
  }
]

function getFileIcon(ext?: string) {
  switch (ext) {
    case 'ts': case 'tsx': return <FileCode size={13} className="text-blue-400" />
    case 'js': case 'jsx': return <FileCode size={13} className="text-yellow-400" />
    case 'json': return <FileJson size={13} className="text-orange-400" />
    case 'css': return <FileCog size={13} className="text-pink-400" />
    default: return <File size={13} className="text-slate-400" />
  }
}

function TreeNode({ node, depth, onSelect, activeFile }: {
  node: FileNode
  depth: number
  onSelect: (name: string, content: string) => void
  activeFile: string
}) {
  const [open, setOpen] = useState(depth === 0)

  if (node.type === 'folder') {
    return (
      <div>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer hover:bg-white/5 text-slate-300 text-xs font-mono"
          style={{ paddingLeft: `${8 + depth * 12}px` }}
        >
          {open ? <ChevronDown size={10} className="text-slate-500" /> : <ChevronRight size={10} className="text-slate-500" />}
          {open ? <FolderOpen size={13} className="text-yellow-400/80" /> : <Folder size={13} className="text-yellow-400/60" />}
          <span>{node.name}</span>
        </div>
        {open && node.children?.map((child, i) => (
          <TreeNode key={i} node={child} depth={depth + 1} onSelect={onSelect} activeFile={activeFile} />
        ))}
      </div>
    )
  }

  const isActive = node.name === activeFile
  return (
    <div
      onClick={() => onSelect(node.name, node.content || '')}
      className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer text-xs font-mono transition-colors
        ${isActive ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
      style={{ paddingLeft: `${8 + depth * 12}px` }}
    >
      <span className="w-2.5" />
      {getFileIcon(node.ext)}
      <span>{node.name}</span>
    </div>
  )
}

export function FileTree({ onFileSelect, activeFile }: {
  onFileSelect: (name: string, content: string) => void
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
