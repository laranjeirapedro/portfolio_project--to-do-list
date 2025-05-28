type Props = {
  task: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const TaskForm = ({ task, onChange, onSubmit }: Props) => (
  <form onSubmit={onSubmit}>
    <input
      className="w-10/12 p-2 m-4 border border-black rounded-md"
      type="text"
      value={task}
      onChange={onChange}
      placeholder="Add your task"
    />
    <button
      className="p-2 m-4 border border-black rounded-md bg-blue-500"
      type="submit"
    >
      Add Task
    </button>
  </form>
);