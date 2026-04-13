'use client'

import { useWorkspace } from '@/store/workspace-store'
import { Code2, Clapperboard, Zap } from 'lucide-react'

export function TopNav() {
  const { activeWorkspace, setActiveWorkspace, credits } = useWorkspace()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
      <div className="flex items-center justify-between h-full px-4 max-w-[1800px] mx-auto">

        {/* Logo */}
        <div className="flex items-center gap-2 min-w-[160px]">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10">
            <img src="/logo-alking.png" alt="AlKing Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-sm tracking-widest bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ALKING
          </span>
        </div>

        {/* Workspace Switcher — Center */}
        <div className="flex items-center gap-1 bg-slate-900 border border-white/10 rounded-xl p-1">
          <WorkspaceBtn
            active={activeWorkspace === 'inspector'}
            onClick={() => setActiveWorkspace('inspector')}
            icon={<Code2 size={14} />}
            label="Code Inspector"
            accent="purple"
          />
          <WorkspaceBtn
            active={activeWorkspace === 'studio'}
            onClick={() => setActiveWorkspace('studio')}
            icon={<Clapperboard size={14} />}
            label="Content Studio"
            accent="cyan"
          />
        </div>

        {/* Credits + Avatar */}
        <div className="flex items-center gap-3 min-w-[160px] justify-end">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              EL: {credits.elevenlabs.toLocaleString()}
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              GM: {credits.gemini}
            </span>
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-white border border-white/20">
            A
          </div>
        </div>

      </div>
    </nav>
  )
}

function WorkspaceBtn({
  active, onClick, icon, label, accent
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  accent: 'purple' | 'cyan'
}) {
  const glowColor = accent === 'purple'
    ? 'shadow-purple-500/30 border-purple-500/50 text-purple-300'
    : 'shadow-cyan-500/30 border-cyan-500/50 text-cyan-300'

  const activeBg = accent === 'purple'
    ? 'bg-purple-500/15'
    : 'bg-cyan-500/15'

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium
        transition-all duration-200 border
        ${active
          ? `${activeBg} ${glowColor} shadow-lg`
          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
        }
      `}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
