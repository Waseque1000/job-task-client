import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  Edit2,
  Save,
  CheckCircle2,
  Clock,
  ListTodo,
  GripVertical,
  Search,
  LayoutGrid,
  Activity,
  Inbox
} from "lucide-react";

const API_URL = "https://server-wine-iota-61.vercel.app";

const TaskBoard = () => {
  const [columns, setColumns] = useState({
    "to-do": {
      title: "To Do",
      dotColor: "bg-[#3B82F6]",
      items: [],
    },
    "in-progress": {
      title: "In Progress",
      dotColor: "bg-[#EAB308]",
      items: [],
    },
    done: {
      title: "Completed",
      dotColor: "bg-[#22C55E]",
      items: [],
    },
  });

  const [editing, setEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedTaskSource, setDraggedTaskSource] = useState(null);

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

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const updateTask = async (task) => {
    try {
      const { _id, ...updateData } = task;
      await fetch(`${API_URL}/task/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

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

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask(task);
    setDraggedTaskSource(columnId);
    e.dataTransfer.effectAllowed = "move";
    // Short timeout to allow drag image to snapshot correctly before making original transparent
    setTimeout(() => {
      e.target.style.opacity = "0.5";
    }, 0);
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

  const handleDrop = (e, columnId, index) => {
    e.preventDefault();
    if (!draggedTask || draggedTaskSource === null) return;

    const sourceCol = columns[draggedTaskSource];
    const destCol = columns[columnId];

    // Remove from source column
    const sourceItems = sourceCol.items.filter(
      (item) => (item.id || item._id) !== (draggedTask.id || draggedTask._id)
    );

    // Add to destination column at the specific index
    const destItems = [...destCol.items];
    destItems.splice(index, 0, { ...draggedTask, status: columnId });

    // Update the task on the backend with the new status
    updateTask({ ...draggedTask, status: columnId });

    // Update local state
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

  // Calculate totals for stats
  const totalTasks = Object.values(columns).reduce((acc, col) => acc + col.items.length, 0);
  const completedTasks = columns.done.items.length;

  return (
    <div className="min-h-screen bg-[#FCFAF5] font-sans pb-12">
      
      {/* Top Banner Control Section */}
      <div className="border-b border-[#F0EBE3] bg-[#FCFAF5] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Placeholder spacer if logo is in real navbar */}
        <div className="hidden md:block flex-1"></div>
        <div className="flex items-center gap-4 w-full md:w-auto flex-end justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A09B] h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search tasks" 
              className="pl-9 pr-4 py-2 bg-[#F9F7F4] border border-[#F0EBE3] rounded-full text-sm focus:outline-none focus:border-[#DF8D61] focus:ring-1 focus:ring-[#DF8D61]/50 text-[#332D28] placeholder-[#A8A09B] w-full md:w-64 transition-all"
            />
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center whitespace-nowrap bg-[#DF8D61] hover:bg-[#D47D4E] text-white py-2 px-5 rounded-full text-[14px] font-medium transition-colors shadow-sm"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            New Task
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Total Tasks */}
          <div className="bg-white rounded-2xl p-5 border border-[#F0EBE3] shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFF3EB] flex items-center justify-center shrink-0">
              <LayoutGrid className="text-[#DF8D61] h-6 w-6" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#8E8681] mb-1">Total Tasks</p>
              <h3 className="text-2xl font-bold text-[#332D28] leading-none">{totalTasks}</h3>
            </div>
          </div>

          {/* Completed Today */}
          <div className="bg-white rounded-2xl p-5 border border-[#F0EBE3] shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-[#10B981] h-6 w-6" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#8E8681] mb-1">Completed Today</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-[#332D28] leading-none">{completedTasks}</h3>
                <span className="text-xs font-semibold text-[#8E8681]">
                  ({totalTasks > 0 ? Math.round((completedTasks/totalTasks)*100) : 0}%)
                </span>
              </div>
            </div>
          </div>

          {/* Due Today */}
          <div className="bg-white rounded-2xl p-5 border border-[#F0EBE3] shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FEF9C3] flex items-center justify-center shrink-0">
              <Clock className="text-[#EAB308] h-6 w-6" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#8E8681] mb-1">Due Today</p>
              <h3 className="text-2xl font-bold text-[#332D28] leading-none">0</h3>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-2xl p-5 border border-[#F0EBE3] shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] flex items-center justify-center shrink-0">
              <Activity className="text-[#EF4444] h-6 w-6" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#8E8681] mb-1">Overdue</p>
              <h3 className="text-2xl font-bold text-[#332D28] leading-none">0</h3>
            </div>
          </div>
        </div>

        {/* New Task Form Overlay (If active) */}
        {isAdding && (
          <div className="mb-8 bg-white border border-[#F0EBE3] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#332D28] mb-4">Create New Task</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[14px] font-semibold text-[#332D28] mb-2 block">
                    Task Title
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Call client regarding update"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    maxLength={50}
                    className="w-full px-4 py-3 rounded-xl border border-[#F0EBE3] bg-[#FEFDFB] text-[#332D28] placeholder-[#B0A8A3] focus:outline-none focus:ring-2 focus:ring-[#DF8D61]/20 focus:border-[#DF8D61] transition-all text-[15px]"
                  />
                </div>
                <div>
                  <label className="text-[14px] font-semibold text-[#332D28] mb-2 block">
                    Description
                  </label>
                  <textarea
                    placeholder="Add task details..."
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    maxLength={200}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#F0EBE3] bg-[#FEFDFB] text-[#332D28] placeholder-[#B0A8A3] focus:outline-none focus:ring-2 focus:ring-[#DF8D61]/20 focus:border-[#DF8D61] transition-all text-[15px]"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
                  <button
                    onClick={addNewTask}
                    className="flex items-center justify-center bg-[#DF8D61] hover:bg-[#D47D4E] text-white py-2.5 px-6 rounded-xl font-medium shadow-sm transition-colors"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="flex items-center justify-center border border-[#F0EBE3] bg-white text-[#433B36] py-2.5 px-6 rounded-xl font-medium hover:bg-[#F9F7F4] transition-colors"
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
              className="rounded-[20px] bg-[#F9F8F6] border border-[#F0EBE3]/60 flex flex-col p-5"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnId, column.items.length)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-5 px-1">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${column.dotColor}`}></span>
                  <h2 className="text-[15px] font-bold text-[#332D28]">{column.title}</h2>
                  <span className="bg-white border border-[#EBE7E0] px-2 py-0.5 rounded-full text-[12px] font-semibold text-[#8E8681]">
                    {column.items.length}
                  </span>
                </div>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="text-[#A8A09B] hover:text-[#332D28] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Column Content */}
              <div className="flex-1 min-h-[400px] flex flex-col gap-3">
                {column.items.length === 0 ? (
                  /* Empty State */
                  <div className="h-full border-2 border-dashed border-[#EBE7E0] rounded-[16px] flex flex-col items-center justify-center text-center p-8 bg-transparent">
                    <div className="w-12 h-12 bg-[#F0EBE3]/50 rounded-full flex items-center justify-center mb-4">
                      <Inbox className="w-5 h-5 text-[#8E8681]" />
                    </div>
                    <h3 className="text-[#332D28] font-bold text-[15px] mb-1">Nothing here yet</h3>
                    <p className="text-[#8E8681] text-[13px] max-w-[180px]">
                      Drag tasks here or create a new one.
                    </p>
                  </div>
                ) : (
                  /* Task Cards */
                  column.items.map((task, index) => (
                    <div
                      key={task.id || task._id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, columnId)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, columnId, index)}
                      className="bg-white rounded-[16px] border border-[#F0EBE3] shadow-[0_2px_8px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgb(0,0,0,0.05)] transition-all cursor-move group flex flex-col overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 flex-1 relative">
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
                              className="w-full px-3 py-2 border rounded-lg text-sm text-[#332D28] focus:outline-none focus:ring-2 focus:ring-[#DF8D61]/30"
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
                              rows={2}
                              className="w-full px-3 py-2 border rounded-lg text-sm text-[#332D28] focus:outline-none focus:ring-2 focus:ring-[#DF8D61]/30"
                            />
                            <button
                              onClick={() => setEditing(null)}
                              className="flex items-center justify-center bg-[#DF8D61] hover:bg-[#D47D4E] text-white py-2 px-4 rounded-lg w-full text-sm font-medium transition-colors"
                            >
                              <Save className="h-4 w-4 mr-1.5" />
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col h-full w-full">
                            <div className="flex items-start justify-between mb-3 w-full">
                              <span className="bg-[#EBF3FF] text-[#3B82F6] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase">
                                Medium
                              </span>
                              
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => setEditing(task.id || task._id)}
                                  className="p-1.5 text-[#A8A09B] hover:text-[#DF8D61] hover:bg-[#FFF3EB] rounded-md transition-colors"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => removeTask(task._id || task.id)}
                                  className="p-1.5 text-[#A8A09B] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-md transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="group-hover:hidden text-[#C8C2BE] pt-1">
                                <GripVertical className="w-4 h-4" />
                              </div>
                            </div>

                            <h3 className="font-semibold text-[#332D28] text-[15px] leading-snug break-words">
                              {task.title}
                            </h3>
                            
                            {task.description && (
                              <p className="text-[13px] text-[#8E8681] mt-2 line-clamp-2">
                                {task.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
