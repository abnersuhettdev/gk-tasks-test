import { Request, Response } from 'express';
import * as taskService from '../services/tasksService';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const newTask = await taskService.createTask(title);
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const updatedTask = await taskService.updateTask(id, title, status);
    res.json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    res.json({ message: 'Tarefa removida com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};