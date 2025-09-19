export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: Priority
  dueDate?: Date
  reminderAt?: Date
  recurring?: RecurringType
  recurringInterval?: number
  recurringEndDate?: Date
  projectId?: string
  categoryId?: string
  userId: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  googleEventId?: string
  project?: Project
  category?: Category
  subtasks?: Subtask[]
  attachments?: Attachment[]
}

export interface Subtask {
  id: string
  title: string
  completed: boolean
  taskId: string
  createdAt: Date
  updatedAt: Date
}

export interface Attachment {
  id: string
  filename: string
  url: string
  size: number
  mimeType: string
  taskId: string
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  color?: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  color: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export enum RecurringType {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY"
}

export interface CreateTaskData {
  title: string
  description?: string
  priority?: Priority
  dueDate?: Date
  reminderAt?: Date
  recurring?: RecurringType
  recurringInterval?: number
  recurringEndDate?: Date
  projectId?: string
  categoryId?: string
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  completed?: boolean
}
