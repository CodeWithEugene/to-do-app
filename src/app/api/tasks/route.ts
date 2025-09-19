import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Session } from "@/types/session"
import { CreateTaskData, Priority } from "@/types/task"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "active"
    const search = searchParams.get("search") || ""
    const priority = searchParams.get("priority") || "all"
    const category = searchParams.get("category") || "all"
    const project = searchParams.get("project") || "all"

    const where: Record<string, unknown> = {
      user: {
        email: session.user.email,
      },
    }

    // Filter by status
    if (status === "active") {
      where.completed = false
    } else if (status === "completed") {
      where.completed = true
    } else if (status === "overdue") {
      where.completed = false
      where.dueDate = {
        lt: new Date(),
      }
    }

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    // Priority filter
    if (priority !== "all") {
      where.priority = priority
    }

    // Category filter
    if (category !== "all") {
      where.categoryId = category
    }

    // Project filter
    if (project !== "all") {
      where.projectId = project
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: true,
        category: true,
        subtasks: true,
        attachments: true,
      },
      orderBy: [
        { priority: "desc" },
        { dueDate: "asc" },
        { createdAt: "desc" },
      ],
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Failed to fetch tasks:", error)
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as Session | null
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      priority = Priority.MEDIUM,
      dueDate,
      reminderAt,
      recurring,
      recurringInterval = 1,
      recurringEndDate,
      projectId,
      categoryId,
    }: CreateTaskData = body

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim(),
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        reminderAt: reminderAt ? new Date(reminderAt) : null,
        recurring,
        recurringInterval,
        recurringEndDate: recurringEndDate ? new Date(recurringEndDate) : null,
        projectId: projectId || null,
        categoryId: categoryId || null,
        userId: user.id,
      },
      include: {
        project: true,
        category: true,
        subtasks: true,
        attachments: true,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("Failed to create task:", error)
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    )
  }
}
