import { Task } from '@/models/Task';
import { Dispatch, SetStateAction } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { GoClockFill } from 'react-icons/go';
import { MdDelete, MdEdit } from 'react-icons/md';

interface ICard {
  task: Task;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  setTask: Dispatch<SetStateAction<Task | undefined>>;
}

export const Card: React.FC<ICard> = ({
  task,
  setIsDelete,
  setIsEdit,
  setIsModalOpen,
  setTask,
}) => {
  const handleClickEdit = () => {
    setIsModalOpen(true);
    setIsEdit(true);
    setIsDelete(false);
    setTask(task);
  };

  const handleClickDelete = () => {
    setIsModalOpen(true);
    setIsDelete(true);
    setIsEdit(false);
    setTask(task);
  };

  return (
    <div className="rounded-lg bg-[#1B2021] px-4 py-4">
      <div className="flex flex-col gap-4">
        <span className={'break-words lg:truncate font-semibold'}>
          {task.title}
        </span>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {task.status === 'pending' ? (
              <GoClockFill className="text-yellow-400" />
            ) : (
              <FaCheckCircle className="text-green-700" />
            )}
            <span>{task.status === 'pending' ? 'Pendente' : 'Concluída'}</span>
          </div>
          <span>Criado em: {task.createdAt}</span>
        </div>

        <div className="flex gap-2 justify-end">
          <MdEdit className="hover:cursor-pointer" onClick={handleClickEdit} />
          <MdDelete
            className="text-red-700 hover:cursor-pointer"
            onClick={handleClickDelete}
          />
        </div>
      </div>
    </div>
  );
};
