'use client';

import { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Search as SearchIcon, 
  FolderKanban, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Filter,
  Calendar,
  Clock,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import { format, isAfter, subDays, startOfDay } from 'date-fns';
import { ar } from 'date-fns/locale';

const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, '');

export default function SearchPage() {
  const store = useStore();
  const projects = store.projects || [];
  const tasks = store.tasks || [];
  const notes = store.notes || [];
  
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'projects' | 'tasks' | 'notes'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const filteredResults = useMemo(() => {
    if (query.trim().length < 2) return { projects: [], tasks: [], notes: [] };

    const q = query.toLowerCase();
    const now = new Date();
    
    // Date filter helper
    const matchesDate = (dateStr?: string) => {
      if (!dateStr || dateFilter === 'all') return true;
      const date = new Date(dateStr);
      if (dateFilter === 'today') return isAfter(date, startOfDay(now));
      if (dateFilter === 'week') return isAfter(date, subDays(now, 7));
      if (dateFilter === 'month') return isAfter(date, subDays(now, 30));
      return true;
    };

    return {
      projects: (typeFilter === 'all' || typeFilter === 'projects') 
        ? projects.filter(p => 
            (p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)) &&
            matchesDate(p.created_at)
          ) : [],
      tasks: (typeFilter === 'all' || typeFilter === 'tasks')
        ? tasks.filter(t => 
            (t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)) &&
            matchesDate(t.created_at)
          ) : [],
      notes: (typeFilter === 'all' || typeFilter === 'notes')
        ? notes.filter(n =>
            stripHtml(n.content).toLowerCase().includes(q) &&
            matchesDate(n.created_at)
          ) : [],
    };
  }, [query, typeFilter, dateFilter, projects, tasks, notes]);

  const totalResults = filteredResults.projects.length + filteredResults.tasks.length + filteredResults.notes.length;

  const Highlight = ({ text, query }: { text: string; query: string }) => {
    if (!query || !text) return <>{text}</>;
    // Escape regex special characters
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/40 text-inherit px-0.5 rounded">{part}</mark> 
            : part
        )}
      </>
    );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">البحث الشامل</h1>
        <p className="text-muted-foreground mt-2">اعثر على أي شيء في ثوانٍ عبر جميع مشاريعك</p>
      </div>

      {/* Search & Filters Bar */}
      <div className="space-y-4 mb-8">
        <div className="relative group">
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="عن ماذا تبحث اليوم؟ (مثلاً: تطبيق الصالة، موعد التسليم...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-12 h-14 text-lg rounded-2xl border-2 border-border focus:border-primary shadow-sm transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-xl border border-border">
            <Filter className="h-4 w-4 text-muted-foreground mr-2" />
            <button
              onClick={() => setTypeFilter('all')}
              className={cn("px-3 py-1.5 rounded-lg text-sm transition-all", typeFilter === 'all' ? "bg-background shadow-sm text-primary font-medium" : "text-muted-foreground hover:text-foreground")}
            >الكل</button>
            <button
              onClick={() => setTypeFilter('projects')}
              className={cn("px-3 py-1.5 rounded-lg text-sm transition-all", typeFilter === 'projects' ? "bg-background shadow-sm text-primary font-medium" : "text-muted-foreground hover:text-foreground")}
            >المشاريع</button>
            <button
              onClick={() => setTypeFilter('tasks')}
              className={cn("px-3 py-1.5 rounded-lg text-sm transition-all", typeFilter === 'tasks' ? "bg-background shadow-sm text-primary font-medium" : "text-muted-foreground hover:text-foreground")}
            >المهام</button>
            <button
              onClick={() => setTypeFilter('notes')}
              className={cn("px-3 py-1.5 rounded-lg text-sm transition-all", typeFilter === 'notes' ? "bg-background shadow-sm text-primary font-medium" : "text-muted-foreground hover:text-foreground")}
            >الملاحظات</button>
          </div>

          <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-xl border border-border">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <button
              onClick={() => setDateFilter('all')}
              className={cn("px-3 py-1.5 rounded-lg text-sm transition-all", dateFilter === 'all' ? "bg-background shadow-sm text-primary font-medium" : "text-muted-foreground hover:text-foreground")}
            >كل الوقت</button>
            <button
              onClick={() => setDateFilter('today')}
              className={cn("px-3 py-1.5 rounded-lg text-sm transition-all", dateFilter === 'today' ? "bg-background shadow-sm text-primary font-medium" : "text-muted-foreground hover:text-foreground")}
            >اليوم</button>
            <button
              onClick={() => setDateFilter('week')}
              className={cn("px-3 py-1.5 rounded-lg text-sm transition-all", dateFilter === 'week' ? "bg-background shadow-sm text-primary font-medium" : "text-muted-foreground hover:text-foreground")}
            >آخر أسبوع</button>
          </div>
        </div>
      </div>

      {/* Results Container */}
      <div className="space-y-8">
        {query.trim().length >= 2 ? (
          totalResults > 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Projects Section */}
              {filteredResults.projects.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <FolderKanban className="h-5 w-5 text-violet-500" />
                      المشاريع المطابقة
                    </h2>
                    <span className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-2 py-1 rounded-full">{filteredResults.projects.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredResults.projects.map((project) => (
                      <Link key={project.id} href={`/projects/${project.id}`}>
                        <Card className="hover:shadow-md hover:border-violet-500/50 transition-all cursor-pointer group h-full">
                          <CardContent className="p-5 flex flex-col justify-between h-full">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.color }} />
                                <p className="font-bold text-lg"><Highlight text={project.name} query={query} /></p>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2"><Highlight text={project.description || ''} query={query} /></p>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">تم الإنشاء: {format(new Date(project.created_at || ''), 'PP', { locale: ar })}</span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks Section */}
              {filteredResults.tasks.length > 0 && (
                <div className="mb-8">
                   <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      المهام
                    </h2>
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">{filteredResults.tasks.length}</span>
                  </div>
                  <div className="space-y-3">
                    {filteredResults.tasks.map((task) => {
                      const project = projects.find(p => p.id === task.project_id);
                      return (
                        <Link key={task.id} href={`/projects/${task.project_id}`}>
                          <Card className="hover:shadow-md hover:border-green-500/50 transition-all cursor-pointer group">
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                task.status === 'DONE' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' : 'bg-amber-100 dark:bg-amber-900/20 text-amber-600'
                              )}>
                                <CheckCircle2 className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold truncate"><Highlight text={task.title} query={query} /></p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-muted-foreground">{project?.name}</span>
                                  <span className="text-[10px] text-muted-foreground/50">•</span>
                                  <span className="text-xs text-muted-foreground">{format(new Date(task.created_at || ''), 'PP', { locale: ar })}</span>
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors pr-2" />
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes Section */}
              {filteredResults.notes.length > 0 && (
                <div className="mb-8">
                   <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      الملاحظات
                    </h2>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">{filteredResults.notes.length}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredResults.notes.map((note) => {
                      const project = projects.find(p => p.id === note.project_id);
                      return (
                        <Link key={note.id} href={`/projects/${note.project_id}`}>
                          <Card className="hover:shadow-md hover:border-blue-500/50 transition-all cursor-pointer group bg-blue-50/10 dark:bg-blue-900/5">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{project?.name}</span>
                                <span className="text-[10px] text-muted-foreground">{format(new Date(note.created_at || ''), 'PP', { locale: ar })}</span>
                              </div>
                              <p className="text-sm line-clamp-3 leading-relaxed border-l-2 border-blue-200 dark:border-blue-900 pr-3 mr-1"><Highlight text={note.content} query={query} /></p>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
              <div className="bg-background w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">أوه، لم نجد شيئاً!</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">حاول كتابة كلمات مختلفة أو إزالة بعض عوامل التصفية.</p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30 border border-border">
               <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4"><LayoutGrid className="text-violet-600" /></div>
               <h4 className="font-bold mb-1">المشاريع</h4>
               <p className="text-xs text-muted-foreground">ابحث في أسماء وأوصاف المشاريع الخاصة بك</p>
             </div>
             <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30 border border-border">
               <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"><CheckCircle2 className="text-green-600" /></div>
               <h4 className="font-bold mb-1">المهام</h4>
               <p className="text-xs text-muted-foreground">ابحث عن المهام المنجزة أو التي قيد التنفيذ</p>
             </div>
             <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30 border border-border">
               <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4"><FileText className="text-blue-600" /></div>
               <h4 className="font-bold mb-1">الملاحظات</h4>
               <p className="text-xs text-muted-foreground">ابحث في محتوى الملاحظات والأفكار المسجلة</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
