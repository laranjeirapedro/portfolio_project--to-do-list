"use client";

import { useEffect, useState } from "react";
import BG from "@public/bg.jpg";

type Task = {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  editedAt?: string;
  completedAt?: string;
};

export const TaskApp = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, SetEditingText] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        if (res.ok) {
          setTaskList(data.tasks);
        } else {
          console.error("Failed to fetch tasks:", data.error);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  const getTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const inputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: task,
          completed: false,
          createdAt: new Date(),
        }),
      });

      if (res.ok) {
        const newTask = await res.json();
        setTaskList([...taskList, newTask]);
        setTask("");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTaskList(taskList.filter((task) => task._id !== id));
      } else {
        console.error("Failed to delete task.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const toggleComplete = async (index: number) => {
    const taskToUpdate = taskList[index];
    const updatedCompleted = !taskToUpdate.completed;

    try {
      const response = await fetch(`/api/tasks/${taskToUpdate._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: updatedCompleted,
          editedAt: new Date(),
          completedAt: updatedCompleted ? new Date() : null,
        }),
      });

      if (response.ok) {
        const updatedTask = {
          ...taskToUpdate,
          completed: updatedCompleted,
          editedAt: new Date().toISOString(),
          completedAt: updatedCompleted ? new Date().toISOString() : undefined,
        };
        const updatedList = [...taskList];
        updatedList[index] = updatedTask;
        setTaskList(updatedList);
      } else {
        console.error("Failed to toggle task completion");
      }
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const editTask = (index: number) => {
    setEditingIndex(index);
    SetEditingText(taskList[index].text);
  };

  const saveEditTask = async (index: number) => {
    const taskToUpdate = taskList[index];

    try {
      const response = await fetch(`/api/tasks/${taskToUpdate._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: editingText,
          editedAt: new Date(),
        }),
      });

      if (response.ok) {
        const updatedTask = { ...taskToUpdate, text: editingText };
        const updatedList = [...taskList];
        updatedList[index] = updatedTask;
        setTaskList(updatedList);
        setEditingIndex(null);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const cancelEditTask = () => {
    setEditingIndex(null);
    SetEditingText("");
  };

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
              onClick={() => formatDate(getDate())}
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
                className={`w-10/12 h-18 px-2 flex flex-wrap items-center justify-between mb-2 border-solid border-black border-2 rounded-md ${
                  task.completed ? "bg-green-300" : "bg-white"
                }`}
              >
                <div className="flex flex-col gap-3 text-left">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="w-auto mt-2 px-2 py-1 border border-black rounded-md"
                      value={editingText}
                      onChange={(e) => SetEditingText(e.target.value)}
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
                  {editingIndex === index ? (
                    <>
                      <button
                        className="min-w-[60px] p-1 bg-green-600 text-white border-2 border-black rounded-md"
                        onClick={() => saveEditTask(index)}
                      >
                        Save
                      </button>
                      <button
                        className="min-w-[60px] p-1 bg-gray-400 text-white border-2 border-black rounded-md"
                        onClick={cancelEditTask}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="min-w-[60px] p-1 bg-yellow-400 text-white border-2 border-black rounded-md"
                        onClick={() => editTask(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="min-w-[60px] p-1 bg-green-600 text-white border-2 border-black rounded-md"
                        onClick={() => {
                          toggleComplete(index);
                          formatDate(getDate());
                        }}
                      >
                        {task.completed ? "Undo" : "Done"}
                      </button>
                      <button
                        className="min-w-[60px] p-1 bg-red-600 justify-items-end border-solid border-2 border-black rounded-md"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
