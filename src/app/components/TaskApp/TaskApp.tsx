'use client';

import { useState } from "react";

export const TaskApp = () => {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);

    const getTask = (e) => {
        setTask(e.target.value);
    }

    const inputSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            setTaskList([...taskList, task]);
            setTask('')
        }
    }

    const deleteTask = (index) => {
        setTaskList(taskList.filter((_, i) => i !== index));
    }

    return (
        <div className="w-full text-center mt-12">
            <div className="">
                <h1 className="text-2xl">Add a Task</h1>
                <form onSubmit={inputSubmit} className="">
                    <input className="p-2 m-4 border-solid border-black border-2 rounded-md" type="text" value={task} onChange={getTask} placeholder="Add your task" />
                    <button className="p-2 m-4 border-solid border-black border-2 rounded-md bg-blue-500" type="submit">Add Task</button>
                </form>
                <ul>
                    {taskList.map((task, index) => (
                        <li key={index}>
                            {task}
                            <button onClick={()=> deleteTask(index)}>Delete Task</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}