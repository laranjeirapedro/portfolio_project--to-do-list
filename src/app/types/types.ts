export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  editedAt?: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  editedAt?: string;
  completedAt?: string;
};