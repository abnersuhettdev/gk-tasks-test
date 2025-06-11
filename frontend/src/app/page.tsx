'use client';
import { CreateTaskDTO } from '@/models/dtos/createTaskDto';
import { UpdateTaskDTO } from '@/models/dtos/updateTaskDto';
import { Task } from '@/models/Task';
import { taskService } from '@/services/tasksService';
import { useEffect, useState } from 'react';
import { BiTask } from 'react-icons/bi';
import { IoClose, IoMenu } from 'react-icons/io5';
import { TiPlus } from 'react-icons/ti';
import { Card } from './components/card';
import { TaskModal } from './components/modal';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [task, setTask] = useState<Task>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reload, setReload] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    'pending' | 'completed' | undefined
  >(undefined);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const verifyInput = (title: string) => {
    if (title.trim().length === 0) {
      showToast('Titulo não pode estar vazio', 'error');
      return false;
    }

    return true;
  };

  const onCreate = async (dto: CreateTaskDTO) => {
    if (!verifyInput(dto.title)) return;

    try {
      await taskService.create(dto);
      setReload(true);
      showToast('Tarefa criada com sucesso!', 'success');
    } catch {
      showToast('Erro ao criar tarefa', 'error');
    }

    setIsModalOpen(false);
  };

  const onEdit = async (dto: UpdateTaskDTO) => {
    if (dto.title) {
      if (!verifyInput(dto.title)) return;
    }

    try {
      await taskService.update(dto);
      setReload(true);
      showToast('Tarefa atualizada com sucesso!', 'success');
    } catch {
      showToast('Erro ao atualizar tarefa', 'error');
    }

    setIsModalOpen(false);
  };

  const onDelete = async (id: string) => {
    try {
      await taskService.remove(id);
      setReload(true);
      showToast('Tarefa excluída com sucesso!', 'success');
    } catch {
      showToast('Erro ao excluir tarefa', 'error');
    }
  };

  const getAllTasks = async () => {
    const tasks = await taskService.getAll(statusFilter);

    setTasks(tasks);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    getAllTasks();
    setReload(false);
  }, [reload, statusFilter]);

  return (
    <div className="relative">
      <div className="bg-[#1B2021] px-5 py-8 flex justify-between items-center">
        <h1 className="text-white font-bold text-2xl font-mono flex items-center gap-2">
          My Tasks <BiTask size={'34px'} />
        </h1>

        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none hover:cursor-pointer"
        >
          {isMenuOpen ? (
            <IoClose className="w-[30px] h-[30px]" />
          ) : (
            <IoMenu className="w-[30px] h-[30px]" />
          )}
        </button>
      </div>

      <div className="flex justify-center mt-5">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-[#1B2021] border-2 text-white font-bold shadow-md hover:cursor-pointer hover:bg-[#1B2021] transition-colors duration-200"
          onClick={() => {
            setIsModalOpen(true);
            setIsEdit(false);
          }}
        >
          <TiPlus size={20} />
          <span>Nova tarefa</span>
        </button>
      </div>

      <div className="w-full flex flex-col gap-5 px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-6">
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            setIsEdit={setIsEdit}
            setIsModalOpen={setIsModalOpen}
            setIsDelete={setIsDelete}
            setTask={setTask}
          />
        ))}
      </div>

      <div
        className={`absolute top-18 right-5 pt-3 text-black bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <span className="px-2 font-bold">Filtrar por:</span>
        <ul className="py-2">
          <li
            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setStatusFilter(undefined);
              setIsMenuOpen(false);
              setReload(true);
            }}
          >
            Todas as tarefas
          </li>
          <li
            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setStatusFilter('pending');
              setIsMenuOpen(false);
              setReload(true);
            }}
          >
            Tarefas pendentes
          </li>
          <li
            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setStatusFilter('completed');
              setIsMenuOpen(false);
              setReload(true);
            }}
          >
            Tarefas concluídas
          </li>
        </ul>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsDelete(false);
          setIsEdit(false);
          setTask(undefined);
        }}
        onCreate={onCreate}
        onDelete={onDelete}
        onEdit={onEdit}
        isEdit={isEdit}
        isDelete={isDelete}
        task={task}
      />

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-md shadow-lg text-white font-medium transition-all duration-300 ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
