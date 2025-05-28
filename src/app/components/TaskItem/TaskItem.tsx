import { Task } from "@/app/types/types";
import { formatDate } from "@/app/utils/formatDate";

type Props = {
  task: Task;
  index: number;
  isEditing: boolean;
  editingText: string;
  onEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
  onEditTextChange: (text: string) => void;
};

export const TaskItem = ({
  task,
  isEditing,
  editingText,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onComplete,
  onEditTextChange,
}: Props) => {
  return (
    <li
      className={`w-10/12 h-18 px-2 flex flex-wrap items-center justify-between mb-2 border-2 border-black rounded-md ${
        task.completed ? "bg-green-300" : "bg-white"
      }`}
    >
      <div className="flex flex-col gap-3 text-left">
        {isEditing ? (
          <input
            type="text"
            className="w-auto mt-2 px-2 py-1 border border-black rounded-md"
            value={editingText}
            onChange={(e) => onEditTextChange(e.target.value)}
          />
        ) : (
          <span
            className={`${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.text}
          </span>
        )}
        <div className="text-xs text-blue-500 flex flex-col">
          <span>
            {task.editedAt
              ? `Edited on: ${formatDate(task.editedAt)}`
              : `Created on: ${formatDate(task.createdAt)}`}
          </span>
          {task.completed && task.completedAt && (
            <span>Completed on: {formatDate(task.completedAt)}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              className="min-w-[60px] p-1 bg-green-600 text-white border-2 border-black rounded-md"
              onClick={onSaveEdit}
            >
              Save
            </button>
            <button
              className="min-w-[60px] p-1 bg-gray-400 text-white border-2 border-black rounded-md"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="min-w-[60px] p-1 bg-yellow-400 text-white border-2 border-black rounded-md"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="min-w-[60px] p-1 bg-green-600 text-white border-2 border-black rounded-md"
              onClick={onComplete}
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <button
              className="min-w-[60px] p-1 bg-red-600 text-white border-2 border-black rounded-md"
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};