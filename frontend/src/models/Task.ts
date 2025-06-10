export interface Task {
  id: string;
  title: string;
  createdAt: string;
  status: 'pending' | 'completed';
}
