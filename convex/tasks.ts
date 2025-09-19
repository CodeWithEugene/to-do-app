import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    completed: v.optional(v.boolean()),
    projectId: v.optional(v.id("projects")),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    let taskQuery = ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", userId));

    if (args.completed !== undefined) {
      taskQuery = ctx.db
        .query("tasks")
        .withIndex("by_user_and_completion", (q) => 
          q.eq("userId", userId).eq("completed", args.completed as boolean)
        );
    }

    if (args.projectId) {
      taskQuery = ctx.db
        .query("tasks")
        .withIndex("by_user_and_project", (q) => 
          q.eq("userId", userId).eq("projectId", args.projectId)
        );
    }

    if (args.dueDate !== undefined) {
      taskQuery = ctx.db
        .query("tasks")
        .withIndex("by_user_and_due_date", (q) => 
          q.eq("userId", userId).lte("dueDate", args.dueDate as number)
        );
    }

    return await taskQuery.order("asc").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    priority: v.number(),
    projectId: v.optional(v.id("projects")),
    reminder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("tasks", {
      ...args,
      userId,
      completed: false,
    });
  },
});

export const toggleComplete = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== userId) throw new Error("Task not found");

    await ctx.db.patch(args.id, {
      completed: !task.completed,
      completedAt: !task.completed ? Date.now() : undefined,
    });

    // Also complete all subtasks
    const subtasks = await ctx.db
      .query("subtasks")
      .withIndex("by_task", (q) => q.eq("taskId", args.id))
      .collect();

    for (const subtask of subtasks) {
      await ctx.db.patch(subtask._id, {
        completed: !task.completed,
        completedAt: !task.completed ? Date.now() : undefined,
      });
    }
  },
});

export const getSubtasks = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("subtasks")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .collect();
  },
});

export const addSubtask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const task = await ctx.db.get(args.taskId);
    if (!task || task.userId !== userId) throw new Error("Task not found");

    return await ctx.db.insert("subtasks", {
      taskId: args.taskId,
      title: args.title,
      completed: false,
    });
  },
});

export const toggleSubtaskComplete = mutation({
  args: { id: v.id("subtasks") },
  handler: async (ctx, args) => {
    const subtask = await ctx.db.get(args.id);
    if (!subtask) throw new Error("Subtask not found");

    const task = await ctx.db.get(subtask.taskId);
    if (!task) throw new Error("Parent task not found");

    const userId = await getAuthUserId(ctx);
    if (!userId || task.userId !== userId) throw new Error("Not authorized");

    await ctx.db.patch(args.id, {
      completed: !subtask.completed,
      completedAt: !subtask.completed ? Date.now() : undefined,
    });
  },
});
