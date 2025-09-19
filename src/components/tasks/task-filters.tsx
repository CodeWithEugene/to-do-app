"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Project, Category } from "@/types/task"

interface TaskFiltersProps {
  filters: {
    priority: string
    category: string
    project: string
  }
  onFiltersChange: (filters: {
    priority: string
    category: string
    project: string
  }) => void
}

export function TaskFilters({ filters, onFiltersChange }: TaskFiltersProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchProjectsAndCategories()
  }, [])

  const fetchProjectsAndCategories = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/categories"),
      ])

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData.projects || [])
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData.categories || [])
      }
    } catch (error) {
      console.error("Failed to fetch projects and categories:", error)
    }
  }

  const activeFiltersCount = Object.values(filters).filter(value => value !== "all").length

  const clearAllFilters = () => {
    onFiltersChange({
      priority: "all",
      category: "all",
      project: "all",
    })
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2">
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select
                  className="w-full mt-1 p-2 border rounded-md text-sm"
                  value={filters.priority}
                  onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value })}
                >
                  <option value="all">All Priorities</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full mt-1 p-2 border rounded-md text-sm"
                  value={filters.category}
                  onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Project</label>
                <select
                  className="w-full mt-1 p-2 border rounded-md text-sm"
                  value={filters.project}
                  onChange={(e) => onFiltersChange({ ...filters, project: e.target.value })}
                >
                  <option value="all">All Projects</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="mt-3 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
