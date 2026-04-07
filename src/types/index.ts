export type ProjectStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  email: string;
  updated_at: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  github_url?: string;
  website_url?: string;
  status: ProjectStatus;
  color: string;
  local_path?: string;
  last_activity: string;
  created_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  created_at: string;
}

export interface Note {
  id: string;
  project_id: string;
  content: string;
  created_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_name: string;
  file_path: string;
  file_url?: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface Activity {
  id: string;
  project_id: string;
  action: string;
  entity_type: 'task' | 'note' | 'file' | 'project';
  entity_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}
