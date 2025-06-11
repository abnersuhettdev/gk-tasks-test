import { CreateTaskDTO } from '@/models/dtos/createTaskDto';
import { UpdateTaskDTO } from '@/models/dtos/updateTaskDto';
import { Task } from '@/models/Task';
import React, { useEffect, useState } from 'react';

interface CreateTaskModalProps {
  isOpen: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  task?: Task;
  onClose: () => void;
  onCreate?: (dto: CreateTaskDTO) => void;
  onEdit?: (dto: UpdateTaskDTO) => void;
  onDelete?: (id: string) => void;
}

export const TaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  isEdit,
  isDelete,
  task,
  onCreate,
  onEdit,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');

  useEffect(() => {
    if (isEdit && task) {
      setTitle(task.title);
      setStatus(task.status);
    }
  }, [isEdit, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isDelete && task && onDelete) {
      onDelete(task.id);
    } else if (isEdit && task && onEdit) {
      onEdit({ id: task.id, title, status });
    } else if (!isEdit && onCreate) {
      onCreate({ title });
    }

    setTitle('');
    setStatus('pending');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-[#0a0a0a] rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-white">
          {isDelete
            ? 'Excluir Tarefa'
            : isEdit
            ? 'Editar Tarefa'
            : 'Nova Tarefa'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isDelete ? (
            <>
              <input
                type="text"
                placeholder="Título da tarefa"
                className="border border-gray-300 rounded px-3 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              {isEdit && (
                <div className="flex flex-col gap-2">
                  <span className="text-md font-semibold text-white">
                    Status
                  </span>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-1 text-sm text-white">
                      <input
                        type="radio"
                        name="status"
                        value="pending"
                        checked={status === 'pending'}
                        onChange={() => setStatus('pending')}
                        className="accent-yellow-400"
                      />
                      Pendente
                    </label>
                    <label className="inline-flex items-center gap-1 text-sm text-white">
                      <input
                        type="radio"
                        name="status"
                        value="completed"
                        checked={status === 'completed'}
                        onChange={() => setStatus('completed')}
                        className="accent-green-600"
                      />
                      Concluída
                    </label>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>
              Tem certeza que deseja deletar a tarefa? Essa ação é irreversível
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                setTitle('');
                setStatus('pending');
              }}
              className="px-4 py-2 border-2 border-[#1B2021] rounded text-[#394346] hover:border-white hover:text-white hover:cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white hover:cursor-pointer ${
                isDelete
                  ? 'bg-red-700 hover:bg-red-800'
                  : 'bg-[#1B2021] hover:bg-[#394346]'
              }`}
            >
              {isDelete ? 'Excluir' : isEdit ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
