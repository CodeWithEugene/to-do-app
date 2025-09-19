import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UpdateTaskData } from "@/types/task"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
        user: {
          email: session.user.email,
        },
      },
      include: {
        project: true,
        category: true,
        subtasks: true,
        attachments: true,
      },
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Failed to fetch task:", error)
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const updateData: UpdateTaskData = body

    // Verify task belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: params.id,
        user: {
          email: session.user.email,
        },
      },
    })

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...updateData,
        dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
        reminderAt: updateData.reminderAt ? new Date(updateData.reminderAt) : undefined,
        recurringEndDate: updateData.recurringEndDate ? new Date(updateData.recurringEndDate) : undefined,
        completedAt: updateData.completed ? new Date() : updateData.completed === false ? null : undefined,
      },
      include: {
        project: true,
        category: true,
        subtasks: true,
        attachments: true,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error("Failed to update task:", error)
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify task belongs to user
    const existingTask = await prisma.task.findFirst({
      where: {
        id: params.id,
        user: {
          email: session.user.email,
        },
      },
    })

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    await prisma.task.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete task:", error)
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    )
  }
}
