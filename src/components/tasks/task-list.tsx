"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TaskCard } from "./task-card"
import { Task, Priority, RecurringType } from "@/types/task"
import { useSession } from "next-auth/react"

interface TaskListProps {
  status: "active" | "completed" | "overdue"
  searchQuery: string
  filters: {
    priority: string
    category: string
    project: string
  }
}

export function TaskList({ status, searchQuery, filters }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.email) {
      fetchTasks()
    }
  }, [session, status, searchQuery, filters])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        status,
        search: searchQuery,
        ...filters,
      })
      
      const response = await fetch(`/api/tasks?${params}`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data.tasks || [])
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading tasks...</div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground">
          {status === "active" && "No active tasks"}
          {status === "completed" && "No completed tasks"}
          {status === "overdue" && "No overdue tasks"}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
