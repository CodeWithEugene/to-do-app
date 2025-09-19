import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as chrono from "chrono-node";
import { tasksAPI, projectsAPI } from "../lib/api";
import { toast } from "sonner";

interface Project {
  _id: string;
  name: string;
  color: string;
}

export function CreateTaskDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [description, setDescription] = useState("");
  const [dueDateText, setDueDateText] = useState("");
  const [priority, setPriority] = useState(4);
  const [projectId, setProjectId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await projectsAPI.getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    try {
      let dueDate = new Date();
      if (dueDateText) {
        const parsed = chrono.parseDate(dueDateText);
        if (parsed) dueDate = parsed;
      } else {
        // Default to end of today if no date specified
        dueDate.setHours(23, 59, 59, 999);
      }

      await tasksAPI.createTask({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.toISOString(),
        priority,
        projectId: projectId || undefined,
      });

      // Success animation
      const dialog = document.querySelector(".task-dialog");
      if (dialog) {
        dialog.classList.add("success");
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      toast.success("Task created successfully!");
      onClose();
      setTitle("");
      setDescription("");
      setDueDateText("");
      setPriority(4);
      setProjectId("");
      setShowDetails(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task");
    } finally {
      setIsSaving(false);
    }
  };

  const quickDates = [
    { label: "Today", value: "today" },
    { label: "Tomorrow", value: "tomorrow" },
    { label: "Next Week", value: "next week" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="task-dialog paper-card w-full max-w-md m-4 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="p-6 space-y-6">
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full text-xl font-serif px-3 py-2 bg-transparent border-b-2 border-slate-200 focus:border-slate-blue focus:outline-none transition-colors"
                    autoFocus
                  />
                </div>

                <AnimatePresence>
                  {!showDetails && title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-2"
                    >
                      <button
                        type="submit"
                        className="flex-1 bg-slate-blue text-white rounded-lg py-2 hover:bg-slate-blue/90 transition-colors"
                      >
                        Add Task
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDetails(true)}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        Add Details
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Due Date
                        </label>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            {quickDates.map(({ label, value }) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setDueDateText(value)}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  dueDateText === value
                                    ? "bg-slate-blue text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                } transition-colors`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                          <input
                            type="text"
                            value={dueDateText}
                            onChange={(e) => setDueDateText(e.target.value)}
                            placeholder="Or type a date like 'next Thursday'"
                            className="w-full px-3 py-2 bg-slate-50/50 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-slate-blue transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Priority
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setPriority(p)}
                              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                                priority === p
                                  ? `priority-${p} font-medium`
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              P{p}
                            </button>
                          ))}
                        </div>
                      </div>

                      {projects.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Project
                          </label>
                          <select
                            value={projectId}
                            onChange={(e) => setProjectId(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50/50 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-slate-blue transition-all"
                          >
                            <option value="">No project</option>
                            {projects.map((project) => (
                              <option key={project._id} value={project._id}>
                                {project.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Add any additional details..."
                          className="w-full px-3 py-2 bg-slate-50/50 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-slate-blue transition-all min-h-[100px]"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!title.trim() || isSaving}
                          className="px-6 py-2 bg-slate-blue text-white rounded-lg hover:bg-slate-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-l-white"></div>
                              Saving...
                            </>
                          ) : (
                            "Create Task"
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}