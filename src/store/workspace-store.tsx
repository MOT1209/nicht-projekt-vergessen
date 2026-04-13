'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type WorkspaceType = 'inspector' | 'studio' | 'settings'
type LanguageType = 'ar' | 'en'
type ThemeType = 'dark' | 'light'

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
  
  // Theme & Language
  lang: LanguageType
  setLang: (l: LanguageType) => void
  theme: ThemeType
  setTheme: (t: ThemeType) => void
  t: (key: string) => string

  // Project Specific Files
  files: ProjectFile[]
  setFiles: (files: ProjectFile[]) => void
  addFiles: (newFiles: ProjectFile[]) => void
  clearProject: () => void
  
  // User Profile
  user: any
  setUser: (u: any) => void
}

const WorkspaceContext = createContext<WorkspaceState | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType>('inspector')
  const [activeStudioTab, setActiveStudioTab] = useState('video')
  const [files, setFiles] = useState<ProjectFile[]>([])
  const [lang, setLang] = useState<LanguageType>('ar')
  const [theme, setTheme] = useState<ThemeType>('dark')
  const [user, setUser] = useState<any>(null)

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

  // Translation Dictionary
  const translations: any = {
    ar: {
      inspector: 'فاحص الكود',
      studio: 'استوديو المحتوى',
      settings: 'الإعدادات',
      upload: 'رفع المشروع',
      clear: 'مسح المشروع',
      explorer: 'متصفح الملفات',
      audit: 'فحص أمني',
      agent: 'مساعد الذكاء',
      scan: 'بدأ الفحص',
      terminal: 'الطرفية',
      video: 'محرر الفيديو',
      thumbnail: 'المصمم الاحترافي',
      factory: 'مصنع المحتوى',
      audio: 'مختبر الصوت',
      generate: 'توليد',
      logout: 'خروج',
      dark: 'الوضع الداكن',
      light: 'الوضع الفاتح'
    },
    en: {
      inspector: 'Code Inspector',
      studio: 'Content Studio',
      settings: 'Settings',
      upload: 'Upload Project',
      clear: 'Clear Project',
      explorer: 'Explorer',
      audit: 'Security Audit',
      agent: 'AI Assistant',
      scan: 'Scan Code',
      terminal: 'Terminal',
      video: 'Video Editor',
      thumbnail: 'Thumbnail Pro',
      factory: 'Content Factory',
      audio: 'Audio Lab',
      generate: 'Generate',
      logout: 'Logout',
      dark: 'Dark Mode',
      light: 'Light Mode'
    }
  }

  const t = (key: string) => translations[lang][key] || key

  return (
    <WorkspaceContext.Provider value={{ 
      activeWorkspace, 
      setActiveWorkspace, 
      activeStudioTab, 
      setActiveStudioTab,
      lang,
      setLang,
      theme,
      setTheme,
      t,
      files,
      setFiles,
      addFiles,
      clearProject,
      user,
      setUser
    }}>
      <div 
        dir={lang === 'ar' ? 'rtl' : 'ltr'} 
        className={theme === 'dark' ? 'dark-theme' : 'light-theme'}
      >
        {children}
      </div>
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be inside WorkspaceProvider')
  return ctx
}
