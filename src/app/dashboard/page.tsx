"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/tasks/task-list"
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import { TaskFilters } from "@/components/tasks/task-filters"
import { AIAssistant } from "@/components/ai/ai-assistant"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [filters, setFilters] = useState({
    priority: "all",
    category: "all",
    project: "all",
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks and stay organized
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <TaskFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Tasks Tabs */}
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Tasks</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <TaskList
                status="active"
                searchQuery={searchQuery}
                filters={filters}
              />
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <TaskList
                status="completed"
                searchQuery={searchQuery}
                filters={filters}
              />
            </TabsContent>

            <TabsContent value="overdue" className="space-y-4">
              <TaskList
                status="overdue"
                searchQuery={searchQuery}
                filters={filters}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <AIAssistant onTaskCreate={(task) => {
            // This would create a task via the API
            console.log("AI suggested task:", task)
          }} />
        </div>
      </div>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  )
}
