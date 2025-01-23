"use client";

import { useState } from "react";
import Image from "next/image";
import BG from "../../public/bg.jpg";

export const TaskApp = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);

  const getTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const inputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim()) {
      setTaskList([...taskList, task]);
      setTask("");
    }
  };

  const deleteTask = (index: number) => {
    setTaskList(taskList.filter((_, i) => i !== index));
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
          <form onSubmit={inputSubmit} className="">
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
                className="w-10/12 h-12 px-2 bg-white flex flex-wrap items-center justify-between mb-2 border-solid border-black border-2 rounded-md"
              >
                {task}
                <button
                  className="p-1 bg-red-600 justify-items-end border-solid border-2 border-black rounded-md"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
