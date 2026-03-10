'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRelativeTime, cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  FolderKanban,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { projects, tasks, fetchProjects } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleRefresh = async () => {
    setLoading(true);
    await fetchProjects();
    setLoading(false);
  };

  // Compute derived values inline to prevent Turbopack issues
  const activeProjects = projects.filter(p => p.status === 'ACTIVE');
  const incompleteTasks = tasks.filter(t => t.status !== 'DONE');
  const todayTasks = tasks.filter(t => {
    if (!t.due_date) return false;
    const today = new Date();
    const due = new Date(t.due_date);
    return due.toDateString() === today.toDateString();
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-500 mt-1">مرحباً! إليك ملخص مشاريعك على هذا الجهاز</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          مزامنة مع الجهاز
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-lg bg-violet-100">
              <FolderKanban className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeProjects.length}</p>
              <p className="text-sm text-gray-500">المشاريع النشطة</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-lg bg-amber-100">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{incompleteTasks.length}</p>
              <p className="text-sm text-gray-500">المهام المتبقية</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{todayTasks.length}</p>
              <p className="text-sm text-gray-500">مهام اليوم</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">المهام الأخيرة</CardTitle>
            <Link href="/projects" className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1">
              عرض الكل <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {incompleteTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                {task.status === 'DONE' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : task.status === 'IN_PROGRESS' ? (
                  <Clock className="h-5 w-5 text-amber-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium truncate",
                    task.status === 'DONE' && 'line-through text-gray-400'
                  )}>
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{task.description}</p>
                </div>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  task.priority === 'HIGH' && 'bg-red-100 text-red-700',
                  task.priority === 'MEDIUM' && 'bg-amber-100 text-amber-700',
                  task.priority === 'LOW' && 'bg-gray-100 text-gray-700'
                )}>
                  {task.priority === 'HIGH' ? 'عالية' : task.priority === 'MEDIUM' ? 'متوسطة' : 'منخفضة'}
                </span>
              </div>
            ))}
            {incompleteTasks.length === 0 && (
              <p className="text-center text-gray-500 py-8">لا توجد مهام متبقية</p>
            )}
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">المشاريع النشطة</CardTitle>
            <Link href="/projects" className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1">
              عرض الكل <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeProjects.slice(0, 5).map((project) => {
              const completedTasks = tasks.filter(t => t.project_id === project.id && t.status === 'DONE').length;
              const totalTasks = tasks.filter(t => t.project_id === project.id).length;
              
              return (
                <Link 
                  key={project.id} 
                  href={`/projects/${project.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="font-semibold">{project.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1 mb-3">{project.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{completedTasks}/{totalTasks} مكتملة</span>
                    <span className="text-gray-400">منذ {formatRelativeTime(project.last_activity)}</span>
                  </div>
                  {totalTasks > 0 && (
                    <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-violet-500 rounded-full transition-all"
                        style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                      />
                    </div>
                  )}
                </Link>
              );
            })}
            {activeProjects.length === 0 && (
              <p className="text-center text-gray-500 py-8">لا توجد مشاريع نشطة</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reminders */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            تذكيرات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeProjects.filter(p => {
              const daysSince = Math.floor(
                (Date.now() - new Date(p.last_activity).getTime()) / (1000 * 60 * 60 * 24)
              );
              return daysSince >= 3;
            }).map((project) => (
              <div 
                key={project.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200"
              >
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div className="flex-1">
                  <p className="font-medium text-amber-900">
                    لم تعمل على &quot;{project.name}&quot; منذ فترة
                  </p>
                  <p className="text-sm text-amber-700">
                    آخر نشاط: {formatRelativeTime(project.last_activity)}
                  </p>
                </div>
                <Link 
                  href={`/projects/${project.id}`}
                  className="px-3 py-1.5 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  فتح المشروع
                </Link>
              </div>
            ))}
            {activeProjects.filter(p => {
              const daysSince = Math.floor(
                (Date.now() - new Date(p.last_activity).getTime()) / (1000 * 60 * 60 * 24)
              );
              return daysSince >= 3;
            }).length === 0 && (
              <p className="text-gray-500">لا توجد تذكيرات حالياً</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
