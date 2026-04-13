'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Workspace = 'inspector' | 'studio'
type StudioTab = 'video' | 'thumbnail' | 'content' | 'audio'

interface WorkspaceContextType {
  activeWorkspace: Workspace
  setActiveWorkspace: (w: Workspace) => void
  activeStudioTab: StudioTab
  setActiveStudioTab: (t: StudioTab) => void
  credits: { elevenlabs: number; gemini: string }
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>('inspector')
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('video')

  return (
    <WorkspaceContext.Provider value={{
      activeWorkspace,
      setActiveWorkspace,
      activeStudioTab,
      setActiveStudioTab,
      credits: { elevenlabs: 10000, gemini: 'Unlimited' }
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
