import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getTasks: async (params?: {
    completed?: boolean;
    projectId?: string;
    dueDate?: string;
  }) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  getTask: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData: {
    title: string;
    description?: string;
    dueDate: string;
    priority: number;
    projectId?: string;
    reminder?: string;
  }) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: string, taskData: {
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: number;
    projectId?: string;
    reminder?: string;
  }) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  toggleTask: async (id: string) => {
    const response = await api.patch(`/tasks/${id}/toggle`);
    return response.data;
  },

  addSubtask: async (taskId: string, title: string) => {
    const response = await api.post(`/tasks/${taskId}/subtasks`, { title });
    return response.data;
  },

  toggleSubtask: async (taskId: string, subtaskId: string) => {
    const response = await api.patch(`/tasks/${taskId}/subtasks/${subtaskId}`);
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

// Projects API
export const projectsAPI = {
  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  getProject: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (projectData: { name: string; color?: string }) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  updateProject: async (id: string, projectData: { name?: string; color?: string }) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  getProjectStats: async (id: string) => {
    const response = await api.get(`/projects/${id}/stats`);
    return response.data;
  },
};

export default api;
