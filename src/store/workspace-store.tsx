'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type WorkspaceType = 'inspector' | 'studio'

export interface ProjectFile {
  id: string
  name: string
  path: string
  content: string
  type: 'file' | 'folder'
  children?: ProjectFile[]
}

interface WorkspaceState {
  activeWorkspace: WorkspaceType
  setActiveWorkspace: (w: WorkspaceType) => void
  activeStudioTab: string
  setActiveStudioTab: (t: string) => void
  
  // New: Project Specific Files
  files: ProjectFile[]
  setFiles: (files: ProjectFile[]) => void
  addFiles: (newFiles: ProjectFile[]) => void
  clearProject: () => void
  
  credits: {
    elevenlabs: number
    gemini: number
  }
}

const WorkspaceContext = createContext<WorkspaceState | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType>('inspector')
  const [activeStudioTab, setActiveStudioTab] = useState('video')
  const [files, setFiles] = useState<ProjectFile[]>([])

  const credits = {
    elevenlabs: 50000,
    gemini: 350
  }

  const addFiles = (newFiles: ProjectFile[]) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const clearProject = () => {
    setFiles([])
  }

  return (
    <WorkspaceContext.Provider value={{ 
      activeWorkspace, 
      setActiveWorkspace, 
      activeStudioTab, 
      setActiveStudioTab,
      files,
      setFiles,
      addFiles,
      clearProject,
      credits 
    }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be inside WorkspaceProvider')
  return ctx
}
