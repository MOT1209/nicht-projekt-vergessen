'use client';

import { useState, useEffect, Suspense } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatRelativeTime, cn } from '@/lib/utils';
import { 
  Plus, 
  Search,
  MoreVertical,
  Trash2,
  Edit,
  ExternalLink,
  FolderKanban,
  RefreshCw,
  Loader2,
  FolderDown,
  AlertCircle,
  Folder,
  ChevronRight,
  ChevronLeft,
  Home,
  Brain,
  Rocket,
  Activity,
  Github
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', 
  '#EF4444', '#EC4899', '#06B6D4', '#84CC16'
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showNewFormParam = searchParams.get('new') === 'true';
  
  const { projects, tasks, addProject, deleteProject, fetchProjects } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleRefresh = async () => {
    setLoading(true);
    await fetchProjects();
    setLoading(false);
  };
  const [showForm, setShowForm] = useState(showNewFormParam);
  const [formMode, setFormMode] = useState<'manual' | 'import'>('manual');
  const [importPath, setImportPath] = useState('');
  const [importError, setImportError] = useState('');
  const [importLoading, setImportLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [browserPath, setBrowserPath] = useState('');
  const [browserData, setBrowserData] = useState<{currentPath: string, parentPath: string, folders: any[]}>({currentPath: '', parentPath: '', folders: []});
  
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    github_url: '',
    website_url: '',
    status: 'ACTIVE' as const,
    color: COLORS[0],
    local_path: '',
  });

  const browseFolders = async (path?: string) => {
    setImportLoading(true);
    try {
      const res = await fetch('/api/files/browse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPath: path }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBrowserData(data);
      setBrowserPath(data.currentPath);
    } catch (err: any) {
      setImportError(err.message);
    } finally {
      setImportLoading(false);
    }
  };

  useEffect(() => {
    if (showForm && formMode === 'import' && !browserPath) {
      browseFolders();
    }
  }, [showForm, formMode]);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.name.trim()) {
      const id = await addProject(newProject);
      setNewProject({
        name: '',
        description: '',
        github_url: '',
        website_url: '',
        status: 'ACTIVE',
        color: COLORS[0],
        local_path: '',
      });
      setShowForm(false);
      router.push(`/projects/${id}`);
    }
  };

  const handleImportSelect = async (folder: {name: string, path: string}) => {
    setImportLoading(true);
    try {
      const id = await addProject({
        name: folder.name,
        description: `مشروع محلي مستورد من: ${folder.path}`,
        status: 'ACTIVE',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        github_url: '',
        website_url: '',
        local_path: folder.path
      });
      setShowForm(false);
      router.push(`/projects/${id}`);
    } catch (err: any) {
      setImportError(err.message);
    } finally {
      setImportLoading(false);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'نشط';
      case 'PAUSED': return 'متوقف';
      case 'COMPLETED': return 'مكتمل';
      default: return status;
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PAUSED': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'COMPLETED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-white/5 text-gray-400 border-white/10';
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#0a0c10] text-right relative overflow-hidden" dir="rtl">
       {/* Background Decor */}
       <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3"
            >
              <FolderKanban className="h-3 w-3 text-violet-400" />
              <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">مركز إدارة المشاريع</span>
            </motion.div>
            <h1 className="text-4xl font-black text-white tracking-tight">مساحات العمل الخاصة بك</h1>
            <p className="text-gray-500 mt-2 font-medium">أنت تدير حالياً {projects.length} مشروعاً ذكياً</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
                variant="ghost" 
                onClick={handleRefresh} 
                disabled={loading}
                className="bg-white/5 border border-white/10 text-gray-300 hover:text-white rounded-2xl px-6 h-14 transition-all"
            >
              <RefreshCw className={cn("h-4 w-4 ml-2", loading && "animate-spin")} />
              مزامنة السحابة
            </Button>
            <Button 
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black rounded-2xl px-8 h-14 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all"
            >
              <Plus className="h-5 w-5 ml-2" />
              مشروع جديد
            </Button>
          </div>
        </div>

        {/* Search & Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3 relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                    type="text"
                    placeholder="ابحث عن مشروع بالاسم أو الوصف..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-[1.25rem] pr-12 pl-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                />
            </div>
            <div className="glass-card flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase">في الوقت الحقيقي</p>
                        <p className="text-sm font-bold text-white">النظام مستقر</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </div>
        </div>

        {/* New Project Form Overlay/Card */}
        <AnimatePresence>
            {showForm && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-10 overflow-hidden"
                >
                    <div className="glass-card p-8 border-violet-500/30">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-6 border-b border-white/5 w-full">
                                <button 
                                    onClick={() => setFormMode('manual')}
                                    className={cn("text-xs font-black uppercase tracking-widest pb-4 -mb-[1px] border-b-2 transition-all", formMode === 'manual' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-600 hover:text-gray-400')}
                                >
                                    إدخال يدوي فاخر
                                </button>
                                <button 
                                    onClick={() => setFormMode('import')}
                                    className={cn("text-xs font-black uppercase tracking-widest pb-4 -mb-[1px] border-b-2 transition-all flex items-center gap-2", formMode === 'import' ? 'border-violet-500 text-violet-400' : 'border-transparent text-gray-600 hover:text-gray-400')}
                                >
                                    <FolderDown className="w-4 h-4" />
                                    استيراد من مسار محلي
                                </button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="text-gray-500">
                                إغلاق
                            </Button>
                        </div>

                        {formMode === 'manual' ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2">اسم المشروع</label>
                                        <Input
                                            placeholder="أدخل اسماً متميزاً..."
                                            value={newProject.name}
                                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                            className="bg-white/5 border-white/10 rounded-2xl py-6 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2">الحالة الراهنة</label>
                                        <select
                                            value={newProject.status}
                                            onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                                            className="w-full h-[52px] rounded-2xl border border-white/10 bg-white/5 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        >
                                            <option value="ACTIVE text-black">نشط (تحت التطوير)</option>
                                            <option value="PAUSED text-black">متوقف مؤقتاً</option>
                                            <option value="COMPLETED text-black">مكتمل (أرشيف)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2">وصف المشروع والرؤية</label>
                                    <Textarea
                                        placeholder="ما الذي يحاول هذا المشروع تحقيقه؟"
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        className="bg-white/5 border-white/10 rounded-2xl min-h-[120px] text-white p-4"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2 flex items-center gap-1.5"><Github className="h-3 w-3" /> مستودع GitHub</label>
                                        <Input
                                            placeholder="https://github.com/your-username/repo"
                                            value={newProject.github_url}
                                            dir="ltr"
                                            onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                                            className="bg-white/5 border-white/10 rounded-2xl py-6 text-white text-left font-mono text-xs"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2 flex items-center gap-1.5"><ExternalLink className="h-3 w-3" /> الرابط المباشر</label>
                                        <Input
                                            placeholder="https://project-url.com"
                                            value={newProject.website_url}
                                            dir="ltr"
                                            onChange={(e) => setNewProject({ ...newProject, website_url: e.target.value })}
                                            className="bg-white/5 border-white/10 rounded-2xl py-6 text-white text-left font-mono text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex gap-3">
                                        {COLORS.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setNewProject({ ...newProject, color })}
                                                className={cn(
                                                    "w-10 h-10 rounded-2xl transition-all shadow-xl",
                                                    newProject.color === color ? "ring-2 ring-white ring-offset-4 ring-offset-[#0a0c10] scale-110" : "opacity-40 hover:opacity-100 hover:scale-105"
                                                )}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <Button 
                                        type="submit"
                                        className="bg-white text-black font-black rounded-2xl px-12 h-14 hover:bg-gray-200 transition-all shadow-2xl"
                                    >
                                        إطلاق مساحة العمل
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="p-4 rounded-2xl bg-violet-600/10 border border-violet-500/20 text-violet-400 text-sm flex items-center gap-3">
                                    <Folder className="h-5 w-5" />
                                    <span>المسار الحالي: <span className="font-mono text-xs opacity-70 dir-ltr">{browserPath}</span></span>
                                </div>

                                {importError && (
                                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-3">
                                        <AlertCircle className="h-4 w-4" />
                                        {importError}
                                    </div>
                                )}

                                <div className="border border-white/10 rounded-[1.5rem] overflow-hidden bg-black/20 max-h-[400px] flex flex-col">
                                    <div className="flex items-center gap-2 p-3 border-b border-white/5 bg-white/[0.02]">
                                        <Button variant="ghost" size="sm" onClick={() => browseFolders()} className="text-gray-400 hover:bg-white/5">
                                            <Home className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => browseFolders(browserData.parentPath)} className="text-gray-400 hover:bg-white/5">
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <div className="flex-1 text-[10px] font-mono text-gray-500 truncate px-4 text-left dir-ltr">
                                            {browserPath}
                                        </div>
                                    </div>
                                    
                                    <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
                                        {importLoading ? (
                                            <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                                                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                                <span className="text-xs font-black uppercase tracking-widest">تحليل بنية الملفات...</span>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 gap-1">
                                                {browserData.folders.map((folder) => (
                                                    <div 
                                                        key={folder.path}
                                                        className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl group transition-all cursor-pointer"
                                                        onClick={() => browseFolders(folder.path)}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:text-violet-400 transition-colors">
                                                                <Folder className="w-4 h-4" />
                                                            </div>
                                                            <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{folder.name}</span>
                                                        </div>
                                                        <Button 
                                                            size="sm" 
                                                            className="opacity-0 group-hover:opacity-100 h-9 rounded-xl bg-violet-600 text-white font-black text-[10px] px-6"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleImportSelect(folder);
                                                            }}
                                                        >
                                                            استيراد هذا المجلد
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, i) => {
                        const projectTasks = tasks.filter(t => t.project_id === project.id);
                        const completedTasks = projectTasks.filter(t => t.status === 'DONE').length;
                        const totalTasks = projectTasks.length;
                        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                        return (
                            <motion.div 
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group h-full"
                            >
                                <div 
                                    onClick={() => router.push(`/projects/${project.id}`)}
                                    className="h-full glass-card p-6 flex flex-col cursor-pointer transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 relative group overflow-hidden"
                                >
                                    {/* Accent background glow */}
                                    <div 
                                        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity" 
                                        style={{ backgroundColor: project.color }}
                                    />

                                    <div className="flex items-start justify-between mb-6 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div 
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform"
                                                style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}40` }}
                                            >
                                                <Brain className="h-6 w-6" style={{ color: project.color }} />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-white text-lg tracking-tight group-hover:text-blue-400 transition-colors">{project.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border", getStatusColorClass(project.status))}>
                                                        {getStatusLabel(project.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-600 hover:text-white transition-colors">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </div>
                                    
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-8 flex-1 leading-relaxed">
                                        {project.description || 'لا توجد رؤية محددة لهذا المشروع حالياً...'}
                                    </p>

                                    {/* Progress Section */}
                                    <div className="space-y-3 mb-8">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">إنجاز المهام الاستراتيجية</span>
                                            <span className="text-sm font-black text-white">{Math.round(progress)}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}80` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer / Links */}
                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex gap-4">
                                            {project.github_url && (
                                                <a 
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="h-9 w-9 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                                >
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                            {project.website_url && (
                                                <a 
                                                    href={project.website_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="h-9 w-9 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">آخر نشاط</p>
                                            <p className="text-[10px] font-black text-gray-400">{formatRelativeTime(project.last_activity)}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-32 text-center"
                >
                    <div className="h-24 w-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                        <Rocket className="h-10 w-10 text-gray-600 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">مساحة العمل فارغة تماماً</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">ابدأ بإضافة أول مشروع ذكي لك أو استورد مشروعاً موجوداً بالفعل من جهازك للبدء في التحليلات.</p>
                    <Button 
                        onClick={() => setShowForm(true)}
                        className="bg-white text-black font-black rounded-2xl px-12 h-14 hover:bg-gray-200 transition-all shadow-2xl"
                    >
                        + إنشاء المشروع الأول
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0a0c10] space-y-6">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500 animate-spin" />
            <div className="absolute inset-4 rounded-full border-b-2 border-l-2 border-violet-500 animate-spin-reverse" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-black text-white tracking-widest uppercase italic">Project Memory AI</h2>
            <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Loading Workspace Intelligence...</p>
          </div>
        </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
