'use client'

import React, { useState } from 'react'
import { 
  Clapperboard, 
  Image as ImageIcon, 
  FileText, 
  Mic2,
  Sparkles,
  Play,
  Download,
  MagicWand,
  Type
} from 'lucide-react'

type StudioTab = 'video' | 'thumbnail' | 'factory' | 'audio'

export default function ContentStudio() {
  const [activeTab, setActiveTab] = useState<StudioTab>('video')

  return (
    <div className="flex h-full bg-slate-950/50 backdrop-blur-sm overflow-hidden">
      {/* Sidebar - Studio Sub-tabs */}
      <div className="w-64 border-r border-white/5 bg-slate-900/30 p-4 flex flex-col gap-2">
        <div className="px-3 mb-4">
          <h2 className="text-xs font-bold tracking-widest text-slate-500 uppercase">Creative Suite</h2>
        </div>
        
        <StudioSidebarItem 
          active={activeTab === 'video'} 
          onClick={() => setActiveTab('video')} 
          icon={<Clapperboard size={18} />} 
          label="Video Editor" 
          description="AI Video Generation"
        />
        <StudioSidebarItem 
          active={activeTab === 'thumbnail'} 
          onClick={() => setActiveTab('thumbnail')} 
          icon={<ImageIcon size={18} />} 
          label="Thumbnail Pro" 
          description="Pollinations Engine"
        />
        <StudioSidebarItem 
          active={activeTab === 'factory'} 
          onClick={() => setActiveTab('factory')} 
          icon={<FileText size={18} />} 
          label="Content Factory" 
          description="Script & Blog AI"
        />
        <StudioSidebarItem 
          active={activeTab === 'audio'} 
          onClick={() => setActiveTab('audio')} 
          icon={<Mic2 size={18} />} 
          label="Audio Lab" 
          description="ElevenLabs Voice"
        />

        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-[10px] font-bold text-slate-300">UPGRADE PRO</span>
          </div>
          <p className="text-[10px] text-slate-500 mb-3">Unlock 4K Export and Custom Voice Training.</p>
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-[10px] font-bold rounded-lg transition-colors border border-white/10">
            VIEW PLANS
          </button>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="flex-1 overflow-auto p-8 relative">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'video' && <VideoEditorView />}
          {activeTab === 'thumbnail' && <ThumbnailView />}
          {activeTab === 'factory' && <FactoryView />}
          {activeTab === 'audio' && <AudioLabView />}
        </div>
      </div>
    </div>
  )
}

function StudioSidebarItem({ active, onClick, icon, label, description }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left
        ${active 
          ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 text-white shadow-lg shadow-purple-500/5' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
        }
      `}
    >
      <div className={`${active ? 'text-cyan-400' : 'text-slate-500'}`}>{icon}</div>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-[10px] opacity-50">{description}</div>
      </div>
    </button>
  )
}

/* --- Sub-Views --- */

function VideoEditorView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-bold mb-2">AI Video Editor</h1>
        <p className="text-slate-400">Generate stunning cinematic videos from text prompts.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 aspect-video rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
          <div className="z-10 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer border border-white/20">
              <Play className="text-white fill-white ml-1" />
            </div>
            <p className="text-slate-500 text-sm font-mono">PREVIEW PLAYER READY</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-md">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              Creative Prompt
            </h3>
            <textarea 
              placeholder="Describe the scene in detail..."
              className="w-full h-32 bg-slate-950/50 border border-white/5 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 resize-none mb-4"
            />
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Duration</p>
                <p className="text-xs">10 Seconds</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Aspect Ratio</p>
                <p className="text-xs">16:9</p>
              </div>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-sm shadow-xl shadow-purple-500/20 hover:opacity-90 transition-opacity">
              GENERATE VIDEO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ThumbnailView() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = () => {
    if (!prompt) return
    setLoading(true)
    const seed = Math.floor(Math.random() * 10000)
    setImageUrl(`https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1280&height=720&seed=${seed}`)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Thumbnail Designer</h1>
        <p className="text-slate-400">Create viral thumbnails using the Pollinations AI Engine.</p>
      </header>

      <div className="bg-slate-900/40 rounded-[2rem] border border-white/10 p-8">
        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic cyberpunk city with neon lights..."
            className="flex-1 bg-slate-950/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-cyan-500/30"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="px-8 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-2xl transition-all flex items-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 animate-spin rounded-full" /> : <MagicWand size={18} />}
            Generate
          </button>
        </div>

        <div className="aspect-video w-full rounded-2xl bg-slate-950 border border-dashed border-white/10 flex items-center justify-center overflow-hidden relative group">
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="Generated" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 border border-white/10">
                  <Download size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <ImageIcon size={48} className="text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500">Your design will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FactoryView() {
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const generateContent = async (type: string) => {
    if (!topic) return
    setLoading(true)
    try {
      const resp = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic, type })
      })
      const data = await resp.json()
      setContent(data.content)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-bold mb-2">Content Factory</h1>
        <p className="text-slate-400">Mass generate scripts, blog posts, and viral hooks.</p>
      </header>

      <div className="space-y-6">
        <div className="flex gap-4">
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your topic (e.g. The future of AI in 2026)..."
            className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FactoryCard 
            title="Video Script"
            icon={<Play />}
            color="from-red-500/20"
            desc="Complete YouTube/TikTok scripts with hooks and CTA."
            onClick={() => generateContent('script')}
            loading={loading}
          />
          <FactoryCard 
            title="SEO Blog"
            icon={<FileText />}
            color="from-blue-500/20"
            desc="Long-form articles optimized for search engines."
            onClick={() => generateContent('blog')}
            loading={loading}
          />
          <FactoryCard 
            title="Viral Ideas"
            icon={<Sparkles />}
            color="from-amber-500/20"
            desc="10 trending topic ideas for your niche."
            onClick={() => generateContent('ideas')}
            loading={loading}
          />
        </div>

        {content && (
          <div className="mt-8 p-8 rounded-3xl bg-slate-900 border border-white/10 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-300">Generated Result</h3>
              <button 
                onClick={() => navigator.clipboard.writeText(content)}
                className="text-xs text-cyan-400 hover:underline"
              >
                Copy to clipboard
              </button>
            </div>
            <div className="prose prose-invert max-w-none text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FactoryCard({ title, icon, color, desc, onClick, loading }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-[2rem] bg-slate-900/50 border border-white/5 hover:border-white/20 transition-all cursor-pointer group bg-gradient-to-br ${color} to-transparent
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-950/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {loading && <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full" />}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  )
}

function AudioLabView() {
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const generateAudio = async () => {
    if (!text) return
    setLoading(true)
    try {
      const resp = await fetch('/api/audio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!resp.ok) throw new Error('Failed')
      const blob = await resp.blob()
      setAudioUrl(URL.createObjectURL(blob))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Audio Lab</h1>
        <p className="text-slate-400">Professional Voiceovers with ElevenLabs technology.</p>
      </header>

      <div className="max-w-3xl space-y-6">
        <div className="p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 backdrop-blur-md">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Voice Talent</label>
              <select className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500">
                <option>Adam (British Professional)</option>
                <option>Rachel (American Narrative)</option>
              </select>
            </div>
            <div className="w-32 space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Stability</label>
              <input type="range" className="w-full accent-purple-500 h-1.5 mt-4" />
            </div>
          </div>

          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to speak..."
            className="w-full h-48 bg-slate-950 border border-white/10 rounded-2xl p-6 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />

          <button 
            onClick={generateAudio}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-4 bg-white text-slate-950 font-extrabold rounded-2xl hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 animate-spin rounded-full" /> : <Mic2 size={18} />}
            {loading ? 'GENERATING...' : 'GENERATE VOICE'}
          </button>

          {audioUrl && (
            <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-white/5 flex items-center gap-4 animate-in slide-in-from-top-4">
              <audio src={audioUrl} controls className="flex-1 h-10 accent-purple-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
