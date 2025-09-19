import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    priority: v.number(), // 1 (highest) to 4 (lowest)
    completed: v.boolean(),
    completedAt: v.optional(v.number()),
    projectId: v.optional(v.id("projects")),
    userId: v.id("users"),
    reminder: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_project", ["userId", "projectId"])
    .index("by_user_and_completion", ["userId", "completed"])
    .index("by_user_and_due_date", ["userId", "dueDate"]),

  projects: defineTable({
    name: v.string(),
    userId: v.id("users"),
    color: v.string(),
  }).index("by_user", ["userId"]),

  subtasks: defineTable({
    taskId: v.id("tasks"),
    title: v.string(),
    completed: v.boolean(),
    completedAt: v.optional(v.number()),
  }).index("by_task", ["taskId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
