"use client";

import { useEffect, useState } from "react";
import { Task } from "@/app/types/types";
import { formatDate } from "@/app/utils/formatDate";
import { TaskForm } from "@/app/components/TaskForm";
import { TaskFilter } from "@/app/components/TaskFilter";
import { TaskList } from "@/app/components/TaskList";
import BG from "@public/bg.jpg";

export const TaskApp = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://portfolioproject-to-do-list-production.up.railway.app";

  
  console.log("BASE_URL:", BASE_URL);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/tasks`);
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

  const inputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
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
      const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTaskList(taskList.filter((task) => task.id !== id));
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
    const updatedCompletedAt = updatedCompleted
      ? new Date().toISOString()
      : null;

    try {
      const response = await fetch(
        `${BASE_URL}/api/tasks/${taskToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: taskToUpdate.text,
            completed: updatedCompleted,
            completedAt: updatedCompletedAt,
            editedAt: taskToUpdate.editedAt ?? null,
          }),
        }
      );

      if (response.ok) {
        const updatedTask = {
          ...taskToUpdate,
          completed: updatedCompleted,
          completedAt: updatedCompletedAt ?? undefined,
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

  const editTask = (index: number) => {
    setEditingIndex(index);
    setEditingText(taskList[index].text);
  };

  const saveEditTask = async (index: number) => {
    const taskToUpdate = taskList[index];
    const editedAt = new Date().toISOString();

    try {
      const response = await fetch(
        `${BASE_URL}/api/tasks/${taskToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: editingText,
            editedAt,
          }),
        }
      );

      if (response.ok) {
        const updatedTask = {
          ...taskToUpdate,
          text: editingText,
          editedAt,
        };
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
    setEditingText("");
  };

  const filteredTasks =
    taskList?.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    }) || [];

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
          <TaskForm
            task={task}
            onChange={(e) => setTask(e.target.value)}
            onSubmit={inputSubmit}
          />
          <TaskFilter filter={filter} setFilter={setFilter} />
          <TaskList
            tasks={filteredTasks}
            editingIndex={editingIndex}
            editingText={editingText}
            onEdit={editTask}
            onSaveEdit={saveEditTask}
            onCancelEdit={cancelEditTask}
            onDelete={deleteTask}
            onComplete={toggleComplete}
            onEditTextChange={setEditingText}
          />
        </div>
      </div>
    </div>
  );
};
