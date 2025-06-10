import { Task } from '@/models/Task';
import { CreateTaskDTO } from '@/models/dtos/createTaskDto';
import { UpdateTaskDTO } from '@/models/dtos/updateTaskDto';
import { api } from './api';

export const taskService = {
  getAll: async (status?: 'pending' | 'completed'): Promise<Task[]> => {
    const response = await api.get('/tasks', {
      params: { status },
    });
    return response.data;
  },

  create: async (dto: CreateTaskDTO): Promise<Task> => {
    const response = await api.post('/tasks', dto);
    return response.data;
  },

  update: async (dto: UpdateTaskDTO): Promise<Task> => {
    const response = await api.put(`/tasks/${dto.id}`, dto);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
