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
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

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

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  };
  const [currentDate, setCurrentDate] = useState(getDate());

  const filteredTasks = taskList.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const baseHeight = 250;
  const taskHeight = 65;
  const yellowDivHeight = baseHeight + filteredTasks.length * taskHeight;

  return (
    <div
      className="w-screen h-screen overflow-y-auto bg-contain bg-center flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: `url(${BG.src})` }}
    >
      <h1 className="text-4xl font-bold pb-8">My To-Do-List</h1>
      <div className="relative w-8/12 h-4/5 p-4">
        <div
          className="absolute w-full transition-all duration-500 bg-yellow-200 opacity-50 rounded-lg"
          style={{ height: `${yellowDivHeight}px` }}
        ></div>
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
              onClick={() => getDate()}
            >
              Add Task
            </button>
          </form>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 border rounded-md ${
                filter === "all" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 border rounded-md ${
                filter === "pending" ? "bg-yellow-400 text-white" : "bg-white"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 border rounded-md ${
                filter === "completed" ? "bg-green-500 text-white" : "bg-white"
              }`}
            >
              Completed
            </button>
          </div>
          <ul className="flex flex-wrap flex-col content-center mt-4">
            {filteredTasks.map((task, index) => (
              <li
                key={index}
                className={`w-10/12 h-14 px-2 flex flex-wrap items-center justify-between mb-2 border-solid border-black border-2 rounded-md ${
                  task.completed ? "bg-green-300" : "bg-white"
                }`}
              >
                <div className="flex flex-col gap-3 text-left">
                  <span
                    className={`${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <p className="text-xs text-blue-500">
                    {task.completed
                      ? `Completed on: ${currentDate}`
                      : `Added on: ${currentDate}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-1 bg-green-600 text-white border-2 border-black rounded-md"
                    onClick={() => {
                      toggleComplete(index);
                      getDate();
                    }}
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
