'use client';

import {
  useState,
  use,
  useEffect
} from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatRelativeTime, formatDate, cn } from '@/lib/utils';
import {
  ArrowLeft,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Paperclip,
  Activity,
  Trash2,
  Edit,
  MoreVertical,
  GitBranch,
  ExternalLink,
  Save,
  X,
  Brain,
  Sparkles,
  Loader2,
  Upload,
  Download,
  File as FileIcon
} from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import Link from 'next/link';
import type { Task, TaskStatus, TaskPriority, Note } from '@/types';

type TabType = 'tasks' | 'notes' | 'files' | 'activity';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    projects,
    tasks,
    notes,
    files,
    activities,
    addTask,
    updateTask,
    deleteTask,
    addNote,
    updateNote,
    deleteNote,
    uploadFile,
    deleteFile,
    loadProjectData,
    loading: storeLoading
  } = useStore();

  useEffect(() => {
    if (id) {
      loadProjectData(id);
    }
  }, [id, loadProjectData]);

  const project = projects.find(p => p.id === id);
  const projectTasks = tasks.filter(t => t.project_id === id);
  const projectNotes = notes.filter(n => n.project_id === id);
  const projectFiles = files.filter(f => f.project_id === id);
  const projectActivities = activities.filter(a => a.project_id === id);

  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'MEDIUM' as TaskPriority });
  const [newNote, setNewNote] = useState('');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleGetAiSummary = async () => {
    setAiLoading(true);
    setAiSummary(null);
    try {
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project,
          tasks: projectTasks,
          notes: projectNotes,
          activities: projectActivities,
        }),
      });
      const data = await response.json();
      if (data.summary) setAiSummary(data.summary);
    } catch (error) {
      console.error('AI Summary failed:', error);
    } finally {
      setAiLoading(false);
    }
  };

  if (!project) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">المشروع غير موجود</h2>
        <Link href="/projects">
          <Button className="mt-4">العودة للمشاريع</Button>
        </Link>
      </div>
    );
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      addTask({
        project_id: id,
        title: newTask.title,
        description: newTask.description,
        status: 'TODO',
        priority: newTask.priority,
      });
      setNewTask({ title: '', description: '', priority: 'MEDIUM' });
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote({
        project_id: id,
        content: newNote,
      });
      setNewNote('');
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'DONE': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'IN_PROGRESS': return <Clock className="h-5 w-5 text-amber-500" />;
      default: return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'TODO': return 'للقيام';
      case 'IN_PROGRESS': return 'قيد التنفيذ';
      case 'DONE': return 'مكتملة';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-700';
      case 'MEDIUM': return 'bg-amber-100 text-amber-700';
      case 'LOW': return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityIcon = (action: string) => {
    if (action.includes('task')) return <CheckCircle2 className="h-4 w-4" />;
    if (action.includes('note')) return <FileText className="h-4 w-4" />;
    if (action.includes('file')) return <Paperclip className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const getActivityText = (action: string) => {
    switch (action) {
      case 'created_task': return 'أضاف مهمة جديدة';
      case 'updated_task': return 'حدّث مهمة';
      case 'created_project': return 'أنشأ المشروع';
      case 'added_note': return 'أضاف ملاحظة';
      case 'uploaded_file': return 'رفع ملف';
      default: return action;
    }
  };

  const tabs = [
    { id: 'tasks', label: 'المهام', icon: CheckCircle2, count: projectTasks.length },
    { id: 'notes', label: 'الملاحظات', icon: FileText, count: projectNotes.length },
    { id: 'files', label: 'الملفات', icon: Paperclip, count: projectFiles.length },
    { id: 'activity', label: 'النشاط', icon: Activity, count: projectActivities.length },
  ] as const;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/projects">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
        </Link>
      </div>

      {/* Project Info */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl"
            style={{ backgroundColor: project.color }}
          />
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-gray-500">{project.description || 'لا يوجد وصف'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <GitBranch className="h-4 w-4 ml-2" />
                GitHub
              </Button>
            </a>
          )}
          {project.website_url && (
            <a href={project.website_url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 ml-2" />
                الموقع
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-violet-600">{projectTasks.filter(t => t.status === 'TODO').length}</p>
            <p className="text-sm text-gray-500">للقيام</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{projectTasks.filter(t => t.status === 'IN_PROGRESS').length}</p>
            <p className="text-sm text-gray-500">قيد التنفيذ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{projectTasks.filter(t => t.status === 'DONE').length}</p>
            <p className="text-sm text-gray-500">مكتملة</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{projectNotes.length}</p>
            <p className="text-sm text-gray-500">ملاحظات</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary Card */}
      <Card className="mb-6 border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-violet-100 rounded-lg">
                <Brain className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="font-semibold text-violet-900">ملخص الذكاء الاصطناعي</h3>
            </div>
            <button
              onClick={handleGetAiSummary}
              disabled={aiLoading}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-60 transition-colors"
            >
              {aiLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {aiLoading ? 'جاري التحليل...' : 'أين توقفت؟'}
            </button>
          </div>
          {aiSummary ? (
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-white/60 rounded-lg p-3 border border-violet-100">
              {aiSummary}
            </div>
          ) : (
            <p className="text-sm text-violet-600/70 italic">
              اضغط على "أين توقفت؟" ليقوم الذكاء الاصطناعي بتحليل مشروعك وتذكيرك بما تبقى.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-violet-500 text-violet-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {/* Add Task Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">إضافة مهمة جديدة</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="عنوان المهمة"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                    className="flex h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="LOW">أولوية منخفضة</option>
                    <option value="MEDIUM">أولوية متوسطة</option>
                    <option value="HIGH">أولوية عالية</option>
                  </select>
                  <Button type="submit">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة
                  </Button>
                </div>
                <Textarea
                  placeholder="وصف المهمة (اختياري)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </form>
            </CardContent>
          </Card>

          {/* Tasks List */}
          <div className="space-y-2">
            {projectTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => updateTask(task.id, {
                        status: task.status === 'TODO' ? 'IN_PROGRESS' :
                          task.status === 'IN_PROGRESS' ? 'DONE' : 'TODO'
                      })}
                      className="mt-0.5"
                    >
                      {getStatusIcon(task.status)}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={cn(
                          "font-medium",
                          task.status === 'DONE' && 'line-through text-gray-400'
                        )}>
                          {task.title}
                        </h4>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full", getPriorityColor(task.priority))}>
                          {task.priority === 'HIGH' ? 'عالية' : task.priority === 'MEDIUM' ? 'متوسطة' : 'منخفضة'}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {getStatusLabel(task.status)} • {formatRelativeTime(task.created_at)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <select
                        value={task.status}
                        onChange={(e) => updateTask(task.id, { status: e.target.value as TaskStatus })}
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="TODO">للقيام</option>
                        <option value="IN_PROGRESS">قيد التنفيذ</option>
                        <option value="DONE">مكتملة</option>
                      </select>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {projectTasks.length === 0 && (
              <p className="text-center text-gray-500 py-8">لا توجد مهام</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-4">
          {/* Add Note */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <RichTextEditor
                  content={newNote}
                  onChange={setNewNote}
                  placeholder="اكتب ملاحظة جديدة هنا..."
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddNote}>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة الملاحظة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes List */}
          <div className="space-y-2">
            {projectNotes.map((note) => (
              <Card key={note.id}>
                <CardContent className="p-4">
                  {editingNote === note.id ? (
                    <div className="space-y-4">
                      <RichTextEditor
                        content={note.content}
                        onChange={(content) => updateNote(note.id, { content })}
                      />
                      <div className="flex justify-end">
                        <Button size="sm" onClick={() => setEditingNote(null)}>
                          <Save className="h-4 w-4 ml-2" />
                          حفظ وإغلاق
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div
                        className="flex-1 prose prose-sm max-w-none rtl text-right"
                        onClick={() => setEditingNote(note.id)}
                        dangerouslySetInnerHTML={{ __html: note.content }}
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {formatRelativeTime(note.created_at)}
                        </span>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {projectNotes.length === 0 && (
              <p className="text-center text-gray-500 py-8">لا توجد ملاحظات</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'files' && (
        <div className="space-y-4">
          {/* Upload Zone */}
          <Card>
            <CardContent className="p-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragging
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={async (e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const droppedFiles = Array.from(e.dataTransfer.files);
                  for (const f of droppedFiles) {
                    setUploadingFile(true);
                    setUploadError(null);
                    try {
                      await uploadFile(id, f);
                    } catch (err: any) {
                      setUploadError(err.message || 'فشل رفع الملف');
                    } finally {
                      setUploadingFile(false);
                    }
                  }
                }}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const selectedFiles = Array.from(e.target.files || []);
                    for (const f of selectedFiles) {
                      setUploadingFile(true);
                      setUploadError(null);
                      try {
                        await uploadFile(id, f);
                      } catch (err: any) {
                        setUploadError(err.message || 'فشل رفع الملف');
                      } finally {
                        setUploadingFile(false);
                      }
                    }
                    e.target.value = '';
                  }}
                />
                {uploadingFile ? (
                  <>
                    <Loader2 className="h-8 w-8 text-purple-500 mx-auto mb-2 animate-spin" />
                    <p className="text-purple-600 font-medium">جاري الرفع...</p>
                  </>
                ) : (
                  <>
                    <Upload className={`h-8 w-8 mx-auto mb-2 ${isDragging ? 'text-purple-500' : 'text-gray-400'}`} />
                    <p className="text-gray-600 dark:text-gray-300 font-medium">اسحب الملفات هنا أو انقر للاختيار</p>
                    <p className="text-xs text-gray-400 mt-1">جميع أنواع الملفات مدعومة</p>
                  </>
                )}
              </div>
              {uploadError && (
                <p className="text-red-500 text-sm mt-2 text-center">{uploadError}</p>
              )}
            </CardContent>
          </Card>

          {/* Files List */}
          {projectFiles.length > 0 ? (
            <div className="space-y-2">
              {projectFiles.map((file) => (
                <Card key={file.id}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                      <FileIcon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.file_name}</p>
                      <p className="text-xs text-gray-400">
                        {file.file_type} • {file.file_size < 1024 * 1024
                          ? `${(file.file_size / 1024).toFixed(1)} KB`
                          : `${(file.file_size / (1024 * 1024)).toFixed(1)} MB`
                        }
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {formatDate(file.created_at)}
                    </span>
                    <div className="flex items-center gap-1">
                      {file.file_url && (
                        <a
                          href={file.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-gray-400 hover:text-purple-500 transition-colors"
                          title="تحميل"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        onClick={() => deleteFile(file.id, file.file_path)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">لا توجد ملفات مرفوعة بعد</p>
          )}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="space-y-2">
          {projectActivities.map((activity) => (
            <Card key={activity.id}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.action)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{getActivityText(activity.action)}</p>
                  <p className="text-xs text-gray-400">
                    {formatRelativeTime(activity.created_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          {projectActivities.length === 0 && (
            <p className="text-center text-gray-500 py-8">لا يوجد نشاط</p>
          )}
        </div>
      )}
    </div>
  );
}
