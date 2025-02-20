import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  X,
  Edit2,
  Save,
  CheckCircle2,
  Clock,
  ListTodo,
  GripHorizontal,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const TaskBoard = () => {
  // Initial empty columns; tasks from backend will include a status field.
  const [columns, setColumns] = useState({
    "to-do": {
      title: "To Do",
      icon: <ListTodo className="h-5 w-5" />,
      color: "bg-blue-50",
      items: [],
    },
    "in-progress": {
      title: "In Progress",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-purple-50",
      items: [],
    },
    done: {
      title: "Done",
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: "bg-green-50",
      items: [],
    },
  });

  const [editing, setEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedTaskSource, setDraggedTaskSource] = useState(null);

  // Fetch tasks from the backend and distribute them into columns
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/task`);
      const tasks = await res.json();
      setColumns({
        "to-do": {
          ...columns["to-do"],
          items: tasks.filter((task) => task.status === "to-do"),
        },
        "in-progress": {
          ...columns["in-progress"],
          items: tasks.filter((task) => task.status === "in-progress"),
        },
        done: {
          ...columns["done"],
          items: tasks.filter((task) => task.status === "done"),
        },
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Load tasks on initial render
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API call to create a new task; assign status "to-do" by default
  const createTask = async (task) => {
    try {
      await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, status: "to-do" }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // API call to update a task; task should contain its _id
  const updateTask = async (task) => {
    try {
      await fetch(`${API_URL}/task/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // API call to delete a task by its _id
  const removeTask = async (id) => {
    try {
      await fetch(`${API_URL}/task/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Local add-new-task handler that calls the backend
  const addNewTask = () => {
    if (!newTask.title.trim()) return;
    const task = {
      title: newTask.title,
      description: newTask.description,
      timestamp: new Date().toISOString(),
    };
    createTask(task);
    setNewTask({ title: "", description: "" });
    setIsAdding(false);
  };

  // Drag and drop handlers (local state update only)
  const handleDragStart = (e, task, columnId) => {
    setDraggedTask(task);
    setDraggedTaskSource(columnId);
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedTask(null);
    setDraggedTaskSource(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // When dropping, update local state and (optionally) you can call updateTask to persist status change
  const handleDrop = (e, columnId, index) => {
    e.preventDefault();
    if (!draggedTask || draggedTaskSource === null) return;
    const sourceCol = columns[draggedTaskSource];
    const destCol = columns[columnId];

    // Remove from source column
    const sourceItems = sourceCol.items.filter(
      (item) => item.id !== draggedTask.id && item._id !== draggedTask._id
    );

    // Add to destination column at the specific index
    const destItems = [...destCol.items];
    destItems.splice(index, 0, { ...draggedTask, status: columnId });

    // Optionally update the task on the backend with the new status
    updateTask({ ...draggedTask, status: columnId });

    setColumns({
      ...columns,
      [draggedTaskSource]: {
        ...sourceCol,
        items: sourceItems,
      },
      [columnId]: {
        ...destCol,
        items: destItems,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Task Board</h1>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            New Task
          </button>
        </div>

        {/* New Task Form */}
        {isAdding && (
          <div className="mb-8 border-2 border-indigo-200 rounded-lg shadow">
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Task Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter task title..."
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    maxLength={50}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Description
                  </label>
                  <textarea
                    placeholder="Add task details..."
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    maxLength={200}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={addNewTask}
                    className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="flex items-center border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className={`rounded-xl ${column.color} p-4`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnId, column.items.length)}
            >
              <div className="flex items-center gap-2 mb-4">
                {column.icon}
                <h2 className="text-lg font-semibold">{column.title}</h2>
                <span className="ml-auto bg-white/50 px-2 py-1 rounded-full text-sm">
                  {column.items.length}
                </span>
              </div>
              <div className="min-h-[200px] space-y-3">
                {column.items.map((task, index) => (
                  <div
                    key={task.id || task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, columnId)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, columnId, index)}
                    className="bg-white/80 backdrop-blur-sm hover:bg-white transition-colors cursor-move rounded-lg border shadow"
                  >
                    <div className="p-4">
                      {editing === task.id || editing === task._id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={task.title}
                            onChange={(e) => {
                              const newColumns = { ...columns };
                              const taskIndex = column.items.findIndex(
                                (t) => t.id === task.id || t._id === task._id
                              );
                              newColumns[columnId].items[taskIndex].title =
                                e.target.value;
                              setColumns(newColumns);
                            }}
                            maxLength={50}
                            className="w-full p-2 border rounded"
                          />
                          <textarea
                            value={task.description}
                            onChange={(e) => {
                              const newColumns = { ...columns };
                              const taskIndex = column.items.findIndex(
                                (t) => t.id === task.id || t._id === task._id
                              );
                              newColumns[columnId].items[
                                taskIndex
                              ].description = e.target.value;
                              setColumns(newColumns);
                            }}
                            maxLength={200}
                            className="w-full p-2 border rounded"
                          />
                          <button
                            onClick={() => setEditing(null)}
                            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <GripHorizontal className="h-4 w-4 text-slate-400" />
                              <h3 className="font-medium text-slate-800">
                                {task.title}
                              </h3>
                            </div>
                            {task.description && (
                              <p className="text-sm text-slate-600 mt-1 ml-6">
                                {task.description}
                              </p>
                            )}
                            <p className="text-xs text-slate-400 mt-2 ml-6">
                              {new Date(task.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-1 ml-4">
                            <button
                              onClick={() => setEditing(task.id || task._id)}
                              className="flex items-center p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeTask(task._id || task.id)}
                              className="flex items-center p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
