'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
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
  Home
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const COLORS = [
  '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', 
  '#3B82F6', '#EC4899', '#06B6D4', '#84CC16'
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showNewForm = searchParams.get('new') === 'true';
  
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
  const [showForm, setShowForm] = useState(showNewForm);
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

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportError('');
    if (!importPath.trim()) return;

    setImportLoading(true);
    try {
      const res = await fetch('/api/import-local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folderPath: importPath.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الاستيراد');

      addProject({
        ...data.project,
        github_url: '',
        website_url: '',
      });
      setImportPath('');
      setShowForm(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'PAUSED': return 'bg-amber-100 text-amber-700';
      case 'COMPLETED': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">المشاريع</h1>
          <p className="text-gray-500 mt-1">{projects.length} مشروع</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={cn("h-4 w-4 ml-2", loading && "animate-spin")} />
            مزامنة مع الجهاز
          </Button>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 ml-2" />
            مشروع جديد
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="البحث في المشاريع..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* New Project Form */}
      {showForm && (
        <Card className="mb-6 border-violet-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
              <button 
                onClick={() => setFormMode('manual')}
                className={cn("text-sm font-medium pb-4 -mb-[17px] border-b-2 transition-colors", formMode === 'manual' ? 'border-violet-600 text-violet-700' : 'border-transparent text-gray-500 hover:text-gray-700')}
              >
                إنشاء يدوي
              </button>
              <button 
                onClick={() => setFormMode('import')}
                className={cn("text-sm font-medium pb-4 -mb-[17px] border-b-2 transition-colors flex items-center gap-1.5", formMode === 'import' ? 'border-violet-600 text-violet-700' : 'border-transparent text-gray-500 hover:text-gray-700')}
              >
                <FolderDown className="w-4 h-4" />
                استيراد من الجهاز
              </button>
            </div>

            {formMode === 'manual' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">اسم المشروع</label>
                  <Input
                    placeholder="أدخل اسم المشروع"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الحالة</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="ACTIVE">نشط</option>
                    <option value="PAUSED">متوقف</option>
                    <option value="COMPLETED">مكتمل</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الوصف</label>
                <Textarea
                  placeholder="وصف المشروع..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">رابط GitHub</label>
                  <Input
                    placeholder="https://github.com/..."
                    value={newProject.github_url}
                    onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">رابط الموقع</label>
                  <Input
                    placeholder="https://..."
                    value={newProject.website_url}
                    onChange={(e) => setNewProject({ ...newProject, website_url: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">لون المشروع</label>
                <div className="flex gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewProject({ ...newProject, color })}
                      className={cn(
                        "w-8 h-8 rounded-full transition-transform",
                        newProject.color === color && "ring-2 ring-offset-2 ring-gray-400 scale-110"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit">إنشاء المشروع</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                  إلغاء
                </Button>
              </div>
            </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-violet-50 text-violet-800 text-sm p-4 rounded-lg flex items-start gap-3 mb-4 border border-violet-100">
                  <FolderDown className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">استعراض ملفات النظام</p>
                    <p>المسار الحالي: <code className="bg-white px-1 py-0.5 rounded border border-violet-200 text-xs">{browserPath}</code></p>
                  </div>
                </div>

                {importError && (
                  <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100 mb-4">
                    <AlertCircle className="w-4 h-4" />
                    {importError}
                  </div>
                )}

                <div className="border rounded-lg overflow-hidden bg-white max-h-[400px] flex flex-col">
                  <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
                    <Button variant="ghost" size="sm" onClick={() => browseFolders()} title="الرئيسية">
                      <Home className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => browseFolders(browserData.parentPath)} title="للأعلى">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 text-xs truncate text-gray-400 dir-ltr text-left px-2">
                      {browserPath}
                    </div>
                  </div>
                  
                  <div className="overflow-y-auto flex-1 p-1">
                    {importLoading ? (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-sm">جاري التحميل...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-0.5">
                        {browserData.folders.map((folder) => (
                          <div 
                            key={folder.path}
                            className="flex items-center justify-between p-2 hover:bg-violet-50 rounded group transition-colors cursor-pointer"
                            onClick={() => browseFolders(folder.path)}
                          >
                            <div className="flex items-center gap-3">
                              <Folder className="w-4 h-4 text-violet-400" />
                              <span className="text-sm font-medium text-gray-700">{folder.name}</span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="opacity-0 group-hover:opacity-100 h-7 text-xs bg-violet-600 text-white hover:bg-violet-700 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImportSelect(folder);
                              }}
                            >
                              اختيار هذا المجلد
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex pt-4 border-t border-gray-100">
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                    إلغاء
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const projectTasks = tasks.filter(t => t.project_id === project.id);
            const completedTasks = projectTasks.filter(t => t.status === 'DONE').length;
            const totalTasks = projectTasks.length;
            const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

            return (
              <div 
                key={project.id} 
                onClick={() => router.push(`/projects/${project.id}`)}
                className="h-full"
              >
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                      </div>
                      <span className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(project.status))}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                      {project.description || 'لا يوجد وصف'}
                    </p>

                    {/* Progress */}
                    {totalTasks > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>التقدم</span>
                          <span>{completedTasks}/{totalTasks}</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ width: `${progress}%`, backgroundColor: project.color }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>آخر نشاط: {formatRelativeTime(project.last_activity)}</span>
                    </div>

                    {/* Links */}
                    {(project.github_url || project.website_url) && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                        {project.github_url && (
                          <a 
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-gray-500 hover:text-violet-600 flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            GitHub
                          </a>
                        )}
                        {project.website_url && (
                          <a 
                            href={project.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-gray-500 hover:text-violet-600 flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            الموقع
                          </a>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <FolderKanban className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مشاريع</h3>
          <p className="text-gray-500 mb-4">ابدأ بإنشاء مشروع جديد</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 ml-2" />
            مشروع جديد
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
