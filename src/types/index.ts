export type ProjectStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl?: string;
  websiteUrl?: string;
  status: ProjectStatus;
  color: string;
  lastActivity: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  projectId: string;
  content: string;
  createdAt: string;
}

export interface File {
  id: string;
  projectId: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
}

export interface Activity {
  id: string;
  projectId: string;
  action: string;
  entityType: 'task' | 'note' | 'file' | 'project';
  entityId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
