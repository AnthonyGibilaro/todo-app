"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    const data = await res.json();
    setTasks([
      ...tasks,
      { _id: data.insertedId, title: newTask, completed: false },
    ]);
    setNewTask("");
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    setTasks(
      tasks.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-8">
      <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
          Ma Liste de Tâches
        </h1>
        <form onSubmit={addTask} className="mb-8">
          <div className="flex items-center border-b-2 border-indigo-500 py-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Ajouter une nouvelle tâche"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded transition duration-200"
            >
              Ajouter
            </button>
          </div>
        </form>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <motion.li
              key={task._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center bg-gray-100 p-4 rounded-lg shadow transition duration-200 hover:shadow-md"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id)}
                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span
                className={`ml-3 flex-grow ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task._id)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs transition duration-200"
                aria-label="Supprimer la tâche"
              >
                Supprimer
              </button>
            </motion.li>
          ))}
        </ul>
      </main>
    </div>
  );
}
