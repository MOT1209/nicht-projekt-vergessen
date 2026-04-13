'use client'

import { useWorkspace } from '@/store/workspace-store'
import { Film, Image, FileText, Mic } from 'lucide-react'

const tabs = [
  { id: 'video',     label: 'Video Editor',      icon: Film,     color: 'cyan'   },
  { id: 'thumbnail', label: 'Thumbnail Designer', icon: Image,    color: 'purple' },
  { id: 'content',   label: 'Content Factory',    icon: FileText, color: 'cyan'   },
  { id: 'audio',     label: 'Audio Lab',          icon: Mic,      color: 'purple' },
] as const

export default function ContentStudio() {
  const { activeStudioTab, setActiveStudioTab } = useWorkspace()

  return (
    <div className="flex flex-col h-full bg-slate-950">

      {/* Studio Sub-Nav */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-white/10 bg-slate-900/50 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon, color }) => {
          const isActive = activeStudioTab === id
          const activeStyle = color === 'cyan'
            ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
            : 'bg-purple-500/15 border-purple-500/50 text-purple-300'
          return (
            <button
              key={id}
              onClick={() => setActiveStudioTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all whitespace-nowrap
                ${isActive ? activeStyle : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Icon size={13} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeStudioTab === 'video'     && <PlaceholderTab title="Video Editor"        color="cyan"   note="Multi-track timeline — Phase 7" />}
        {activeStudioTab === 'thumbnail' && <PlaceholderTab title="Thumbnail Designer"  color="purple" note="Pollinations AI — Phase 4" />}
        {activeStudioTab === 'content'   && <PlaceholderTab title="Content Factory"     color="cyan"   note="Gemini Scripting — Phase 5" />}
        {activeStudioTab === 'audio'     && <PlaceholderTab title="Audio Lab"           color="purple" note="ElevenLabs TTS — Phase 6" />}
      </div>

    </div>
  )
}

function PlaceholderTab({ title, color, note }: { title: string; color: string; note: string }) {
  const accent = color === 'cyan' ? 'text-cyan-400 border-cyan-500/30' : 'text-purple-400 border-purple-500/30'
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <p className={`text-lg font-semibold ${accent.split(' ')[0]}`}>{title}</p>
      <p className="text-xs text-slate-500 font-mono">{note}</p>
      <div className={`mt-2 px-4 py-2 border rounded-lg text-xs font-mono ${accent}`}>
        Coming in next phase...
      </div>
    </div>
  )
}
