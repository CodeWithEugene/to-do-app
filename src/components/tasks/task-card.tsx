"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import {
  Calendar,
  Clock,
  Flag,
  MoreVertical,
  CheckCircle2,
  Circle,
  Trash2,
  Edit,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Task, Priority } from "@/types/task"
import { EditTaskDialog } from "./edit-task-dialog"

interface TaskCardProps {
  task: Task
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
}

const priorityColors = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
}

const priorityIcons = {
  LOW: <Flag className="h-3 w-3" />,
  MEDIUM: <Flag className="h-3 w-3" />,
  HIGH: <Flag className="h-3 w-3" />,
  URGENT: <AlertCircle className="h-3 w-3" />,
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggleComplete = async () => {
    try {
      setIsUpdating(true)
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : null,
        }),
      })

      if (response.ok) {
        const updatedTask = await response.json()
        onUpdate(updatedTask)
      }
    } catch (error) {
      console.error("Failed to update task:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onDelete(task.id)
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const isOverdue = task.dueDate && new Date() > task.dueDate && !task.completed
  const isDueSoon = task.dueDate && 
    new Date(task.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000) && 
    !task.completed

  return (
    <>
      <Card className={`transition-all duration-200 hover:shadow-md ${
        task.completed ? "opacity-60" : ""
      } ${isOverdue ? "border-red-200 bg-red-50" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
              disabled={isUpdating}
              className="mt-1"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}>
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                          {format(new Date(task.dueDate), "MMM d, yyyy")}
                        </span>
                      </div>
                    )}
                    
                    {task.reminderAt && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {format(new Date(task.reminderAt), "MMM d, h:mm a")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Badge
                      variant="secondary"
                      className={`${priorityColors[task.priority]} text-xs`}
                    >
                      {priorityIcons[task.priority]}
                      <span className="ml-1">{task.priority}</span>
                    </Badge>

                    {task.category && (
                      <Badge variant="outline" className="text-xs">
                        {task.category.name}
                      </Badge>
                    )}

                    {task.project && (
                      <Badge variant="outline" className="text-xs">
                        {task.project.name}
                      </Badge>
                    )}

                    {isOverdue && (
                      <Badge variant="destructive" className="text-xs">
                        Overdue
                      </Badge>
                    )}

                    {isDueSoon && !isOverdue && (
                      <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                        Due Soon
                      </Badge>
                    )}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleDelete}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        task={task}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onUpdate={onUpdate}
      />
    </>
  )
}
