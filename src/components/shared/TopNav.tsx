'use client'

import { useWorkspace } from '@/store/workspace-store'
import { Code2, Clapperboard, Zap, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

export function TopNav() {
  const { activeWorkspace, setActiveWorkspace, credits, lang, setLang, t } = useWorkspace()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar')
  }

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

        {/* Workspace Switcher */}
        <div className="flex items-center bg-slate-900/50 p-1 rounded-xl border border-white/10 shrink-0">
          <WorkspaceBtn 
            active={activeWorkspace === 'inspector'} 
            onClick={() => setActiveWorkspace('inspector')}
            icon={<Code2 size={16} />} 
            label={t('inspector')}
            accent="purple"
          />
          <WorkspaceBtn 
            active={activeWorkspace === 'studio'} 
            onClick={() => setActiveWorkspace('studio')}
            icon={<Clapperboard size={16} />} 
            label={t('studio')}
            accent="cyan"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 min-w-[160px] justify-end">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{t('credits')}</span>
            <span className="text-xs font-mono text-cyan-400">GM:{credits.gemini}</span>
          </div>

          <button 
            onClick={toggleLang}
            className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400 transition-all uppercase tracking-tighter"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>

          <button
            onClick={handleLogout}
            title={t('logout')}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 border border-white/10 transition-all"
          >
            <LogOut size={13} />
          </button>
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
