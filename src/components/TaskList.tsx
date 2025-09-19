import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TaskList({ tab }: { tab: string }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasks = useQuery(api.tasks.list, {
    completed: tab === "completed" ? true : false,
    dueDate: tab === "today" ? today.getTime() : undefined,
  });

  if (!tasks) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-blue"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-slate-600 py-12 paper-card">
        <p className="text-lg">No tasks found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}

function TaskItem({ task }: { task: any }) {
  const [isSubtasksVisible, setIsSubtasksVisible] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");
  const [showUndo, setShowUndo] = useState(false);
  
  const toggleComplete = useMutation(api.tasks.toggleComplete);
  const toggleSubtaskComplete = useMutation(api.tasks.toggleSubtaskComplete);
  const addSubtask = useMutation(api.tasks.addSubtask);
  const subtasks = useQuery(api.tasks.getSubtasks, { taskId: task._id });

  const handleAddSubtask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    
    await addSubtask({
      taskId: task._id,
      title: newSubtask.trim(),
    });
    setNewSubtask("");
  };

  const handleToggleComplete = async () => {
    await toggleComplete({ id: task._id });
    if (!task.completed) {
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 5000);
    }
  };

  const getDueStatus = () => {
    const now = Date.now();
    const dueDate = task.dueDate;
    const daysDiff = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return 'overdue';
    if (daysDiff <= 2) return 'soon';
    return 'future';
  };

  const dueStatus = getDueStatus();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`task-card group ${task.completed ? 'completed' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className={`priority-indicator priority-${task.priority}`} />
        <div className="checkbox-wrapper pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className={`text-lg font-serif transition-all duration-300 ${
              task.completed ? 'line-through text-slate-400' : ''
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {task.description && (
                <span className="text-slate-400 paper-clip-icon" title="Has notes">
                  📎
                </span>
              )}
              <button
                onClick={() => setIsSubtasksVisible(!isSubtasksVisible)}
                className="text-slate-400 hover:text-slate-600 transition-colors w-6 h-6 flex items-center justify-center"
              >
                {isSubtasksVisible ? "▼" : "▶"}
              </button>
            </div>
          </div>
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
              {task.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`due-date-badge due-${dueStatus}`}>
              {dueStatus === 'overdue' && '⚠️ '}
              Due {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showUndo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 right-4 bg-slate-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          >
            Task completed! 
            <button
              onClick={handleToggleComplete}
              className="ml-2 underline hover:no-underline"
            >
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSubtasksVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="subtask-list"
          >
            {subtasks?.map((subtask) => (
              <motion.div
                key={subtask._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => toggleSubtaskComplete({ id: subtask._id })}
                  />
                </div>
                <span className={subtask.completed ? "line-through text-slate-400" : ""}>
                  {subtask.title}
                </span>
              </motion.div>
            ))}
            <form onSubmit={handleAddSubtask} className="flex gap-2 mt-4">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add subtask..."
                className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-blue"
              />
              <button
                type="submit"
                disabled={!newSubtask.trim()}
                className="px-4 py-2 text-sm bg-slate-blue text-white rounded-lg hover:bg-slate-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
