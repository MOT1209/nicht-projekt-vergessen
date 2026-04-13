'use client'

import React from 'react'
import { useWorkspace, ProjectFile } from '@/store/workspace-store'
import { FolderPlus, FileText, Trash2, FolderOpen } from 'lucide-react'

export function FileTree({ onFileSelect, selectedFile }: {
  onFileSelect: (f: ProjectFile) => void
  selectedFile: ProjectFile | null
}) {
  const { files, setFiles, clearProject } = useWorkspace()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files
    if (!uploaded) return

    const newFiles: ProjectFile[] = []
    for (let i = 0; i < uploaded.length; i++) {
      const file = uploaded[i]
      try {
        const text = await file.text()
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          path: (file as any).webkitRelativePath || file.name,
          content: text,
          type: 'file',
        })
      } catch {
        // skip binary files
      }
    }
    setFiles(newFiles)
    // reset so same files can be re-uploaded
    e.target.value = ''
  }

  return (
    <div className="h-full flex flex-col bg-slate-950/20">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Explorer</h3>
        <button
          onClick={clearProject}
          className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-slate-600 transition-colors rounded-lg"
          title="Clear Project"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Upload button */}
      <div className="p-3 border-b border-white/5 space-y-2">
        <label className="flex items-center justify-center gap-2 w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl text-[10px] font-bold cursor-pointer transition-all tracking-widest">
          <FolderPlus size={14} />
          UPLOAD PROJECT
          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-2">
        {files.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center px-4">
            <FolderOpen size={32} className="text-slate-800 mb-3" />
            <p className="text-[10px] text-slate-700 font-mono leading-relaxed">
              NO PROJECT LOADED.<br />FILES ARE PRIVATE TO YOUR SESSION.
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {files.map(file => (
              <FileItem
                key={file.id}
                file={file}
                active={selectedFile?.id === file.id}
                onClick={onFileSelect}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {files.length > 0 && (
        <div className="px-4 py-2 border-t border-white/5 text-[10px] text-slate-600 font-mono">
          {files.length} file{files.length !== 1 ? 's' : ''} loaded
        </div>
      )}
    </div>
  )
}

function FileItem({ file, active, onClick }: {
  file: ProjectFile
  active: boolean
  onClick: (f: ProjectFile) => void
}) {
  return (
    <div
      onClick={() => onClick(file)}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all group
        ${active
          ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30'
          : 'hover:bg-white/5 text-slate-400 border border-transparent'}
      `}
    >
      <FileText size={13} className={active ? 'text-purple-400' : 'text-slate-600 group-hover:text-slate-400'} />
      <span className="text-xs font-mono truncate">{file.name}</span>
    </div>
  )
}
