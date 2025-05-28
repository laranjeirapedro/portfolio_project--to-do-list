import { Task } from "@/app/types/types";
import { TaskItem } from "../TaskItem";

type Props = {
  tasks: Task[];
  editingIndex: number | null;
  editingText: string;
  onEdit: (index: number) => void;
  onSaveEdit: (index: number) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onComplete: (index: number) => void;
  onEditTextChange: (text: string) => void;
};

export const TaskList = ({
  tasks,
  editingIndex,
  editingText,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onComplete,
  onEditTextChange,
}: Props) => {
  return (
    <ul className="flex flex-wrap flex-col content-center mt-4">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          isEditing={editingIndex === index}
          editingText={editingText}
          onEdit={() => onEdit(index)}
          onSaveEdit={() => onSaveEdit(index)}
          onCancelEdit={onCancelEdit}
          onDelete={() => onDelete(task.id)}
          onComplete={() => onComplete(index)}
          onEditTextChange={(text) => onEditTextChange(text)}
        />
      ))}
    </ul>
  );
};