export interface UpdateTaskDTO {
  id: string;
  title?: string;
  status?: 'pending' | 'completed';
}
