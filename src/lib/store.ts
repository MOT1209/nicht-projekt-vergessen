import { create } from 'zustand';
import { Project, Task, Note, Activity, File } from '@/types';
import { generateId } from '@/lib/utils';

interface AppState {
  // Data
  projects: Project[];
  tasks: Task[];
  notes: Note[];
  activities: Activity[];
  files: File[];

  // Current selections
  currentProjectId: string | null;

  // Project Actions
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'lastActivity'>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string | null) => void;

  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Note Actions
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  updateNote: (id: string, data: Partial<Note>) => void;
  deleteNote: (id: string) => void;

  // Activity Actions
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;

  // File Actions
  addFile: (file: Omit<File, 'id' | 'createdAt'>) => void;
  deleteFile: (id: string) => void;

  // Getters
  getProjectTasks: (projectId: string) => Task[];
  getProjectNotes: (projectId: string) => Note[];
  getProjectFiles: (projectId: string) => File[];
  getProjectActivities: (projectId: string) => Activity[];
  getTodayTasks: () => Task[];
  getActiveProjects: () => Project[];
  getIncompleteTasks: () => Task[];
}

// Sample data for demo
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'مشروع الذكاء الاصطناعي',
    description: 'تطبيق ذكاء اصطناعي لتحليل النصوص',
    githubUrl: 'https://github.com/user/ai-project',
    status: 'ACTIVE',
    color: '#8B5CF6',
    lastActivity: new Date().toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'متجر إلكتروني',
    description: 'متجر لبيع المنتجات الرقمية',
    status: 'ACTIVE',
    color: '#10B981',
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'تطبيق الإدارة المالية',
    description: 'تطبيق لإدارة الميزانية الشخصية',
    status: 'PAUSED',
    color: '#F59E0B',
    lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const sampleTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'تصميم واجهة المستخدم',
    description: 'إنشاء تصاميم UI/UX للتطبيق',
    status: 'DONE',
    priority: 'HIGH',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    projectId: '1',
    title: 'تنفيذ نموذج اللغة',
    description: 'بناء نموذج معالجة النصوص',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    projectId: '1',
    title: 'اختبار الأداء',
    description: 'اختبار سرعة الاستجابة',
    status: 'TODO',
    priority: 'MEDIUM',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    projectId: '2',
    title: 'ربط الدفع',
    description: 'تكامل مع بوابة الدفع',
    status: 'TODO',
    priority: 'HIGH',
    createdAt: new Date().toISOString(),
  },
];

const sampleNotes: Note[] = [
  {
    id: '1',
    projectId: '1',
    content: 'استخدام مكتبة TensorFlow للـ NLP\nتطبيق نموذج BERT للتحليل',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    projectId: '1',
    content: 'فكرة: إضافة دعم للغات متعددة',
    createdAt: new Date().toISOString(),
  },
];

const sampleActivities: Activity[] = [
  {
    id: '1',
    projectId: '1',
    action: 'created_task',
    entityType: 'task',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    projectId: '1',
    action: 'added_note',
    entityType: 'note',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    projectId: '2',
    action: 'updated_project',
    entityType: 'project',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useStore = create<AppState>((set, get) => ({
  // Initial data
  projects: [],
  tasks: [],
  notes: [],
  activities: [],
  files: [],
  currentProjectId: null,

  // Project Actions
  fetchProjects: async () => {
    try {
      const response = await fetch('/api/scan');
      const data = await response.json();
      if (data.projects) {
        set({ projects: data.projects });
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  },

  addProject: (project) => {
    const newProject: Project = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };
    set((state) => ({ projects: [...state.projects, newProject] }));
    get().addActivity({
      projectId: newProject.id,
      action: 'created_project',
      entityType: 'project',
      entityId: newProject.id,
    });
  },

  updateProject: (id, data) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...data, lastActivity: new Date().toISOString() } : p
      ),
    }));
  },

  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      tasks: state.tasks.filter((t) => t.projectId !== id),
      notes: state.notes.filter((n) => n.projectId !== id),
      activities: state.activities.filter((a) => a.projectId !== id),
    }));
  },

  setCurrentProject: (id) => set({ currentProjectId: id }),

  // Task Actions
  addTask: (task) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
    get().addActivity({
      projectId: task.projectId,
      action: 'created_task',
      entityType: 'task',
      entityId: newTask.id,
    });
    get().updateProject(task.projectId, { lastActivity: new Date().toISOString() });
  },

  updateTask: (id, data) => {
    const task = get().tasks.find((t) => t.id === id);
    if (task) {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t)),
      }));
      get().addActivity({
        projectId: task.projectId,
        action: 'updated_task',
        entityType: 'task',
        entityId: id,
      });
      get().updateProject(task.projectId, { lastActivity: new Date().toISOString() });
    }
  },

  deleteTask: (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (task) {
      set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    }
  },

  // Note Actions
  addNote: (note) => {
    const newNote: Note = {
      ...note,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ notes: [...state.notes, newNote] }));
    get().addActivity({
      projectId: note.projectId,
      action: 'added_note',
      entityType: 'note',
      entityId: newNote.id,
    });
    get().updateProject(note.projectId, { lastActivity: new Date().toISOString() });
  },

  updateNote: (id, data) => {
    const note = get().notes.find((n) => n.id === id);
    if (note) {
      set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? { ...n, ...data } : n)),
      }));
    }
  },

  deleteNote: (id) => {
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
  },

  // Activity Actions
  addActivity: (activity) => {
    const newActivity: Activity = {
      ...activity,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ activities: [newActivity, ...state.activities] }));
  },

  // File Actions
  addFile: (file) => {
    const newFile: File = {
      ...file,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ files: [...state.files, newFile] }));
    get().addActivity({
      projectId: file.projectId,
      action: 'uploaded_file',
      entityType: 'file',
      entityId: newFile.id,
    });
    get().updateProject(file.projectId, { lastActivity: new Date().toISOString() });
  },

  deleteFile: (id) => {
    set((state) => ({ files: state.files.filter((f) => f.id !== id) }));
  },

  // Getters
  getProjectTasks: (projectId) => get().tasks.filter((t) => t.projectId === projectId),
  getProjectNotes: (projectId) => get().notes.filter((n) => n.projectId === projectId),
  getProjectFiles: (projectId) => get().files.filter((f) => f.projectId === projectId),
  getProjectActivities: (projectId) => get().activities.filter((a) => a.projectId === projectId),
  getTodayTasks: () => {
    const today = new Date().toDateString();
    return get().tasks.filter((t) => new Date(t.createdAt).toDateString() === today);
  },
  getActiveProjects: () => get().projects.filter((p) => p.status === 'ACTIVE'),
  getIncompleteTasks: () => get().tasks.filter((t) => t.status !== 'DONE'),
}));
