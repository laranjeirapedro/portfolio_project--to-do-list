"use client";

import { useState } from "react";
import BG from "@public/bg.jpg";

type Task = {
  text: string;
  completed: boolean;
};

export const TaskApp = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const getTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const inputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim()) {
      setTaskList([...taskList, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index: number) => {
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    setTaskList(
      taskList.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div
      className="w-screen h-screen bg-contain bg-center flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: `url(${BG.src})` }}
    >
      <h1 className="text-4xl font-bold pb-8">My To-Do-List</h1>
      <div className="relative w-8/12 h-4/5 p-4">
        <div className="absolute inset-0 bg-yellow-200 opacity-50 rounded-lg"></div>
        <div className="relative z-10">
          <form onSubmit={inputSubmit}>
            <input
              className="w-10/12 p-2 m-4 border-solid border-black border-2 rounded-md"
              type="text"
              value={task}
              onChange={getTask}
              placeholder="Add your task"
            />
            <button
              className="p-2 m-4 border-solid border-black border-2 rounded-md bg-blue-500"
              type="submit"
            >
              Add Task
            </button>
          </form>
          <ul className="flex flex-wrap flex-col content-center mt-4">
            {taskList.map((task, index) => (
              <li
                key={index}
                className={`w-10/12 h-12 px-2 flex flex-wrap items-center justify-between mb-2 border-solid border-black border-2 rounded-md ${
                  task.completed ? "bg-green-300 line-through" : "bg-white"
                }`}
              >
                <span>{task.text}</span>
                <div className="flex gap-2">
                  <button
                    className="p-1 bg-green-600 text-white border-2 border-black rounded-md"
                    onClick={() => toggleComplete(index)}
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    className="p-1 bg-red-600 justify-items-end border-solid border-2 border-black rounded-md"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
