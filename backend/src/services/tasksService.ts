import { format } from 'date-fns';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task';

const dataPath = path.join(__dirname, '../db/tasks.json');

async function readTasks(): Promise<Task[]> {
  const data = await fs.readFile(dataPath, 'utf-8');
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

async function saveTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(tasks, null, 2));
}

export async function getAllTasks(): Promise<Task[]> {
  return await readTasks();
}

export async function createTask(title: string): Promise<Task> {
  if (!title) throw new Error('Título é obrigatório');

  const newTask: Task = {
    id: uuidv4(),
    title,
    status: 'pending',
    createdAt: format(new Date(), "dd/MM/yyyy"),
  };

  const tasks = await readTasks();
  tasks.push(newTask);
  await saveTasks(tasks);

  return newTask;
}

export async function updateTask(id: string,title?: string,status?: "pending" | "completed"): Promise<Task> {
  const tasks = await readTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) throw new Error('Tarefa não encontrada');

  const validStatus = ['pending', 'completed'] as const;
  if (status !== undefined && !validStatus.includes(status)) {
    throw new Error('Status inválido');
  }

  if (title !== undefined) task.title = title;
  if (status !== undefined) task.status = status;

  await saveTasks(tasks);
  return task;
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = await readTasks();
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) throw new Error('Tarefa não encontrada');

  tasks.splice(index, 1);
  await saveTasks(tasks);
}